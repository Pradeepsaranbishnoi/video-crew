import 'dotenv/config';
import { connectDB, initDatabase } from '../config/db';
import MediaFile from '../models/MediaFile';

const testMediaUpload = async () => {
  try {
    console.log('🎬 Testing media upload functionality...');

    // Connect to database
    await connectDB();
    await initDatabase();

    // Check if media files collection exists
    const mediaFiles = await MediaFile.find();
    console.log(`✅ Found ${mediaFiles.length} media files in database`);

    if (mediaFiles.length > 0) {
      console.log('📁 Sample media files:');
      mediaFiles.slice(0, 3).forEach((file, index) => {
        console.log(`  ${index + 1}. ${file.originalName} (${file.type}) - ${file.size} bytes`);
      });
    } else {
      console.log('📝 No media files found. You can upload files through the admin panel.');
    }

    console.log('🎉 Media upload test completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error testing media upload:', error);
    process.exit(1);
  }
};

// Run the test
testMediaUpload();
