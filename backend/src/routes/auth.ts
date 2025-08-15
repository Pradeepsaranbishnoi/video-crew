import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseService } from '../services/database';
import { generateToken } from '../middleware/auth';
import { LoginRequest } from '../types';

const router = Router();

// Login route
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 1 }).withMessage('Password is required')
], async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password }: LoginRequest = req.body;

    // Find user by email
    const user = await DatabaseService.findAdminByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await DatabaseService.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const payload = { 
      _id: user._id!.toString(), 
      email: user.email, 
      name: user.name 
    };
    const token = generateToken(payload);

    res.json({
      success: true,
      token,
      user: { 
        _id: user._id, 
        email: user.email, 
        name: user.name 
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

export default router;
