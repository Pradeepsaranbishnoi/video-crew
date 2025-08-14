import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for PortfolioItem
export interface IPortfolioItem extends Document {
  title: string;
  category: string;
  client: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  featured: boolean;
  display_order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const PortfolioItemSchema: Schema<IPortfolioItem> = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: 'General' },
    client: { type: String, default: '' },
    description: { type: String, default: '' },
    thumbnail_url: { type: String, default: '' },
    video_url: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    display_order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Model
const PortfolioItem: Model<IPortfolioItem> = mongoose.model<IPortfolioItem>(
  'PortfolioItem',
  PortfolioItemSchema
);

export default PortfolioItem;
