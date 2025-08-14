import { Router, Request, Response } from 'express';
import { protect } from '../middleware/auth';
import { uploadImage, uploadVideo } from '../middleware/upload';

const router = Router();

// Upload image (auth)
router.post('/image', protect, (req: Request, res: Response) => {
  uploadImage(req, res, function (err: any) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const url = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
    res.json({ success: true, url });
  });
});

// Upload video (auth)
router.post('/video', protect, (req: Request, res: Response) => {
  uploadVideo(req, res, function (err: any) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const url = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
    res.json({ success: true, url });
  });
});

export default router;
