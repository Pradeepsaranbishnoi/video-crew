import AdminUser, { IAdminUser } from '../models/AdminUser';
import PortfolioItem, { IPortfolioItem } from '../models/PortfolioItem';
import ContactInquiry, { IContactInquiry } from '../models/ContactInquiry';
import bcrypt from 'bcryptjs';

export class DatabaseService {
  // Admin User operations
  static async createAdminUser(user: { email: string; password: string; name: string }): Promise<IAdminUser> {
    const adminUser = new AdminUser(user);
    return await adminUser.save();
  }

  static async findAdminByEmail(email: string): Promise<IAdminUser | null> {
    return await AdminUser.findOne({ email: email.toLowerCase() });
  }

  static async findAdminById(id: string): Promise<IAdminUser | null> {
    return await AdminUser.findById(id);
  }

  // Portfolio operations
  static async getAllPortfolioItems(): Promise<IPortfolioItem[]> {
    return await PortfolioItem.find().sort({ display_order: 1, createdAt: -1 });
  }

  static async getPortfolioItemById(id: string): Promise<IPortfolioItem | null> {
    return await PortfolioItem.findById(id);
  }

  static async createPortfolioItem(item: Partial<IPortfolioItem>): Promise<IPortfolioItem> {
    const portfolioItem = new PortfolioItem(item);
    return await portfolioItem.save();
  }

  static async updatePortfolioItem(id: string, item: Partial<IPortfolioItem>): Promise<IPortfolioItem | null> {
    return await PortfolioItem.findByIdAndUpdate(id, item, { new: true });
  }

  static async deletePortfolioItem(id: string): Promise<boolean> {
    const result = await PortfolioItem.findByIdAndDelete(id);
    return result !== null;
  }

  static async reorderPortfolioItems(order: string[]): Promise<void> {
    const bulkOps = order.map((id: string, idx: number) => ({
      updateOne: {
        filter: { _id: id },
        update: { display_order: idx }
      }
    }));

    if (bulkOps.length) {
      await PortfolioItem.bulkWrite(bulkOps);
    }
  }

  // Contact operations
  static async createContactInquiry(inquiry: { name: string; email: string; subject: string; message: string }): Promise<IContactInquiry> {
    const contactInquiry = new ContactInquiry(inquiry);
    return await contactInquiry.save();
  }

  static async getAllContactInquiries(): Promise<IContactInquiry[]> {
    return await ContactInquiry.find().sort({ createdAt: -1 });
  }

  static async getContactInquiryById(id: string): Promise<IContactInquiry | null> {
    return await ContactInquiry.findById(id);
  }

  static async updateContactInquiry(id: string, update: Partial<IContactInquiry>): Promise<IContactInquiry | null> {
    return await ContactInquiry.findByIdAndUpdate(id, update, { new: true });
  }

  // Utility methods
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
