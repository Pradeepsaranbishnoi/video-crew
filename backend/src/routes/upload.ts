import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect } from '../middleware/auth';
import MediaFile from '../models/MediaFile';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check file type
  if (file.fieldname === 'image') {
    // Allow images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  } else if (file.fieldname === 'video') {
    // Allow videos
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv'];
    if (allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only video files (mp4, avi, mov, wmv, flv) are allowed'));
    }
  } else {
    cb(new Error('Invalid field name'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  }
});

// Upload image endpoint (auth required)
router.post('/image', protect, upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image file uploaded' 
      });
    }

    // Generate full URL for the uploaded file
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    // Save media file info to database
    const mediaFile = new MediaFile({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      type: 'image',
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: (req as any).user?._id || 'admin'
    });

    await mediaFile.save();
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error: any) {
    console.error('Image upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Image upload failed' 
    });
  }
});

// Upload video endpoint (auth required)
router.post('/video', protect, upload.single('video'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No video file uploaded' 
      });
    }

    // Generate full URL for the uploaded file
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    // Save media file info to database
    const mediaFile = new MediaFile({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      type: 'video',
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: (req as any).user?._id || 'admin'
    });

    await mediaFile.save();
    
    res.json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error: any) {
    console.error('Video upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Video upload failed' 
    });
  }
});

// Error handling middleware for multer
router.use((error: any, req: Request, res: Response, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'File too large. Maximum size is 100MB' 
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
  
  if (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
  
  next();
});

// Get all media files (auth required)
router.get('/', protect, async (req: Request, res: Response) => {
  try {
    const mediaFiles = await MediaFile.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: mediaFiles
    });
  } catch (error: any) {
    console.error('Get media files error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to get media files' 
    });
  }
});

// Delete media file (auth required)
router.delete('/:id', protect, async (req: Request, res: Response) => {
  try {
    const mediaFile = await MediaFile.findById(req.params.id);
    
    if (!mediaFile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Media file not found' 
      });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', 'uploads', mediaFile.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await MediaFile.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Media file deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete media file error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to delete media file' 
    });
  }
});

export default router;
