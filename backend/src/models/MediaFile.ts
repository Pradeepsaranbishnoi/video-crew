import mongoose, { Document, Schema } from 'mongoose';

export interface IMediaFile extends Document {
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  mimeType: string;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaFileSchema = new Schema<IMediaFile>({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  originalName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  dimensions: {
    width: Number,
    height: Number
  },
  uploadedBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

export default mongoose.model<IMediaFile>('MediaFile', MediaFileSchema);
