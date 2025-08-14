import { Router, Request, Response } from 'express';
import { protect } from '../middleware/auth';
import ContactInquiry, { IContactInquiry } from '../models/ContactInquiry';

const router = Router();

// Submit contact (public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const inquiry = new ContactInquiry({ name, email, subject, message });
    await inquiry.save();

    res.json({ success: true, message: 'Submitted' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all inquiries (auth)
router.get('/', protect, async (_req: Request, res: Response) => {
  try {
    const inquiries: IContactInquiry[] = await ContactInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update inquiry status or admin_notes (auth)
router.put('/:id', protect, async (req: Request, res: Response) => {
  try {
    const update: Partial<IContactInquiry> = {};
    if (req.body.status) update.status = req.body.status;
    if (req.body.admin_notes !== undefined) update.admin_notes = req.body.admin_notes;

    const updated = await ContactInquiry.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found' });

    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
