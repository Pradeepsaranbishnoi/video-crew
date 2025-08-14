import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for ContactInquiry
export interface IContactInquiry extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'processing' | 'completed';
  admin_notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const ContactInquirySchema: Schema<IContactInquiry> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'processing', 'completed'], default: 'new' },
    admin_notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Model
const ContactInquiry: Model<IContactInquiry> = mongoose.model<IContactInquiry>(
  'ContactInquiry',
  ContactInquirySchema
);

export default ContactInquiry;
