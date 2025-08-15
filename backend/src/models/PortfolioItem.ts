import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for PortfolioItem
export interface IPortfolioItem extends Document {
  title: string;
  category: string;
  client?: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  featured: boolean;
  display_order: number;
  metadata?: {
    duration?: string;
    resolution?: string;
    tags?: string[];
    file_size?: number;
  };
}

// Schema
const PortfolioItemSchema: Schema<IPortfolioItem> = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    client: { type: String, default: '' },
    description: { type: String, default: '' },
    thumbnail_url: { type: String, required: true },
    video_url: { type: String, required: true },
    featured: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
    metadata: {
      duration: { type: String },
      resolution: { type: String },
      tags: [{ type: String }],
      file_size: { type: Number },
    },
  },
  { timestamps: true }
);

// Index for better query performance
PortfolioItemSchema.index({ display_order: 1, createdAt: -1 });
PortfolioItemSchema.index({ category: 1 });
PortfolioItemSchema.index({ featured: 1 });

// Model
const PortfolioItem: Model<IPortfolioItem> = mongoose.model<IPortfolioItem>(
  'PortfolioItem',
  PortfolioItemSchema
);

export default PortfolioItem;
