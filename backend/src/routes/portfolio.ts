import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { protect } from '../middleware/auth';
import { DatabaseService } from '../services/database';
import { PortfolioRequest, ReorderRequest } from '../types';

const router = Router();

// Public - get all portfolio items
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Fetching portfolio items...');
    const items = await DatabaseService.getAllPortfolioItems();
    console.log(`Found ${items.length} portfolio items`);
    res.json({ success: true, data: items });
  } catch (err: any) {
    console.error('Get portfolio items error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to fetch portfolio items',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Public - get single portfolio item
router.get('/:id', [
  param('id').isMongoId().withMessage('Valid MongoDB ID is required')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const id = req.params.id;
    const item = await DatabaseService.getPortfolioItemById(id);
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    
    res.json({ success: true, data: item });
  } catch (err: any) {
    console.error('Get portfolio item error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create portfolio item (auth required)
router.post('/', protect, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
  body('thumbnail_url').isURL().withMessage('Valid thumbnail URL is required'),
  body('video_url').isURL().withMessage('Valid video URL is required'),
  body('client').optional().trim(),
  body('description').optional().trim(),
  body('featured').optional().isBoolean(),
  body('display_order').optional().isInt({ min: 0 })
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const portfolioData: PortfolioRequest = req.body;
    const item = await DatabaseService.createPortfolioItem(portfolioData);
    
    res.status(201).json({ success: true, data: item });
  } catch (err: any) {
    console.error('Create portfolio item error:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update portfolio item (auth required)
router.put('/:id', protect, [
  param('id').isMongoId().withMessage('Valid MongoDB ID is required'),
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('category').optional().trim().isLength({ min: 1 }).withMessage('Category cannot be empty'),
  body('thumbnail_url').optional().isURL().withMessage('Valid thumbnail URL is required'),
  body('video_url').optional().isURL().withMessage('Valid video URL is required'),
  body('client').optional().trim(),
  body('description').optional().trim(),
  body('featured').optional().isBoolean(),
  body('display_order').optional().isInt({ min: 0 })
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const id = req.params.id;
    const updateData = req.body;
    
    const item = await DatabaseService.updatePortfolioItem(id, updateData);
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    
    res.json({ success: true, data: item });
  } catch (err: any) {
    console.error('Update portfolio item error:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete portfolio item (auth required)
router.delete('/:id', protect, [
  param('id').isMongoId().withMessage('Valid MongoDB ID is required')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const id = req.params.id;
    const deleted = await DatabaseService.deletePortfolioItem(id);
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    
    res.json({ success: true, message: 'Portfolio item deleted successfully' });
  } catch (err: any) {
    console.error('Delete portfolio item error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Reorder portfolio items (auth required)
router.put('/reorder/positions', protect, [
  body('order').isArray({ min: 1 }).withMessage('Order array is required'),
  body('order.*').isMongoId().withMessage('All order items must be valid MongoDB IDs')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { order }: ReorderRequest = req.body;
    await DatabaseService.reorderPortfolioItems(order);
    
    res.json({ success: true, message: 'Portfolio items reordered successfully' });
  } catch (err: any) {
    console.error('Reorder portfolio items error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
