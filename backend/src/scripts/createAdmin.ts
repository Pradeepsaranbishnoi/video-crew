import 'dotenv/config';
import { connectDB, initDatabase } from '../config/db';
import { DatabaseService } from '../services/database';

const createDefaultAdmin = async () => {
  try {
    console.log('🔧 Creating default admin user...');
    
    // Connect to database
    await connectDB();
    await initDatabase();
    
    // Check if admin already exists
    const existingAdmin = await DatabaseService.findAdminByEmail('admin@videocrew.com');
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      return;
    }
    
    // Create default admin user
    const adminUser = {
      email: 'admin@videocrew.com',
      password: 'Test@123',
      name: 'Admin User'
    };
    
    const createdAdmin = await DatabaseService.createAdminUser(adminUser);
    
    console.log('✅ Default admin user created successfully');
    console.log('📧 Email:', createdAdmin.email);
    console.log('👤 Name:', createdAdmin.name);
    console.log('�� ID:', createdAdmin._id);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

// Run the script
createDefaultAdmin();
