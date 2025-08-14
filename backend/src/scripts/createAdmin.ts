import 'dotenv/config';
import connectDB from '../config/db';
import AdminUser from '../models/AdminUser';

const run = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
      process.exit(1);
    }

    const exists = await AdminUser.findOne({ email: email.toLowerCase() });
    if (exists) {
      console.log('Admin already exists:', exists.email);
      process.exit(0);
    }

    const admin = new AdminUser({ email, password, name: 'Admin User' });
    await admin.save();
    console.log('Admin created:', admin.email);
    process.exit(0);
  } catch (err: any) {
    console.error(err.message || err);
    process.exit(1);
  }
};

run();
