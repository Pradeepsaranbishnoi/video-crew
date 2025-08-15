import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { protect } from '../middleware/auth';
import { DatabaseService } from '../services/database';
import { ContactRequest, ContactUpdateRequest } from '../types';

const router = Router();

// Submit contact form (public)
router.post('/', [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 1 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 1 }).withMessage('Message is required')
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

    const contactData: ContactRequest = req.body;
    const inquiry = await DatabaseService.createContactInquiry(contactData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Contact inquiry submitted successfully',
      data: inquiry 
    });
  } catch (err: any) {
    console.error('Submit contact inquiry error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all contact inquiries (auth required)
router.get('/', protect, async (req: Request, res: Response) => {
  try {
    const inquiries = await DatabaseService.getAllContactInquiries();
    res.json({ success: true, data: inquiries });
  } catch (err: any) {
    console.error('Get contact inquiries error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single contact inquiry (auth required)
router.get('/:id', protect, [
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
    const inquiry = await DatabaseService.getContactInquiryById(id);
    
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
    }
    
    res.json({ success: true, data: inquiry });
  } catch (err: any) {
    console.error('Get contact inquiry error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update contact inquiry status (auth required)
router.put('/:id', protect, [
  param('id').isMongoId().withMessage('Valid MongoDB ID is required'),
  body('status').optional().isIn(['new', 'processing', 'completed']).withMessage('Invalid status'),
  body('admin_notes').optional().trim()
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
    const updateData: ContactUpdateRequest = req.body;
    
    const inquiry = await DatabaseService.updateContactInquiry(id, updateData);
    
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Contact inquiry updated successfully',
      data: inquiry 
    });
  } catch (err: any) {
    console.error('Update contact inquiry error:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
