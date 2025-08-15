import 'dotenv/config';
import { connectDB, initDatabase } from '../config/db';
import { DatabaseService } from '../services/database';

const testConnection = async () => {
  try {
    console.log('🧪 Testing MongoDB connection...');
    
    // Connect to database
    await connectDB();
    await initDatabase();
    
    console.log('✅ MongoDB connection successful');
    
    // Test admin user creation
    console.log('🧪 Testing admin user creation...');
    
    const testAdmin = {
      email: 'test@example.com',
      password: 'testpassword',
      name: 'Test User'
    };
    
    const createdAdmin = await DatabaseService.createAdminUser(testAdmin);
    console.log('✅ Admin user created:', createdAdmin.email);
    
    // Test finding admin user
    const foundAdmin = await DatabaseService.findAdminByEmail('test@example.com');
    console.log('✅ Admin user found:', foundAdmin?.email);
    
    // Test portfolio item creation
    console.log('🧪 Testing portfolio item creation...');
    
    const testPortfolio = {
      title: 'Test Video',
      category: 'Test Category',
      client: 'Test Client',
      description: 'Test description',
      thumbnail_url: 'https://example.com/thumbnail.jpg',
      video_url: 'https://example.com/video.mp4',
      featured: false,
      display_order: 0,
      metadata: {
        duration: '2:30',
        resolution: '4K',
        tags: ['test', 'sample']
      }
    };
    
    const createdPortfolio = await DatabaseService.createPortfolioItem(testPortfolio);
    console.log('✅ Portfolio item created:', createdPortfolio.title);
    
    // Test contact inquiry creation
    console.log('🧪 Testing contact inquiry creation...');
    
    const testContact = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message'
    };
    
    const createdContact = await DatabaseService.createContactInquiry(testContact);
    console.log('✅ Contact inquiry created:', createdContact.name);
    
    console.log('🎉 All tests passed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
};

// Run the test
testConnection();
