import { Router, Request, Response } from 'express';
import { protect } from '../middleware/auth';
import PortfolioItem from '../models/PortfolioItem';

const router = Router();

// Public - get all
router.get('/', async (req: Request, res: Response) => {
  try {
    const items = await PortfolioItem.find().sort({ display_order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Public - get single
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await PortfolioItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create (auth)
router.post('/', protect, async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const item = new PortfolioItem(payload);
    await item.save();
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update (auth)
router.put('/:id', protect, async (req: Request, res: Response) => {
  try {
    const item = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete (auth)
router.delete('/:id', protect, async (req: Request, res: Response) => {
  try {
    const item = await PortfolioItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Reorder - expects { order: ["id1", "id2", ...] }
router.put('/reorder/positions', protect, async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order)) return res.status(400).json({ success: false, message: 'Order array required' });

    const bulkOps = order.map((id: string, idx: number) => ({
      updateOne: {
        filter: { _id: id },
        update: { display_order: idx }
      }
    }));

    if (bulkOps.length) await PortfolioItem.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Reordered' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
