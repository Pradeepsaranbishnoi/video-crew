import 'dotenv/config';
import { connectDB, initDatabase } from '../config/db';
import { DatabaseService } from '../services/database';

const samplePortfolioItems = [
  {
    title: "Logistics Promo",
    category: "video",
    client: "Logistics Corp",
    description: "대규모 물류 시설의 역동적인 모습을 담은 홍보 영상",
    thumbnail_url: "/portfolio/2.webp",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: true,
    display_order: 1,
    metadata: {
      duration: "2:30",
      resolution: "4K",
      tags: ["logistics", "promo", "corporate"]
    }
  },
  {
    title: "Chanel Promotion",
    category: "video",
    client: "Chanel",
    description: "기업의 비전과 가치를 표현한 아이덴티티 영상",
    thumbnail_url: "/portfolio/3.webp",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    featured: true,
    display_order: 2,
    metadata: {
      duration: "1:45",
      resolution: "4K",
      tags: ["fashion", "promotion", "luxury"]
    }
  },
  {
    title: "Pizza Company",
    category: "video",
    client: "Pizza Co",
    description: "럭셔리 패션 브랜드의 감각적인 캠페인 영상",
    thumbnail_url: "/portfolio/4.webp",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    featured: false,
    display_order: 3,
    metadata: {
      duration: "3:15",
      resolution: "4K",
      tags: ["food", "commercial", "restaurant"]
    }
  },
  {
    title: "Nutella Recipe",
    category: "other",
    client: "Nutella",
    description: "고급 레스토랑의 분위기를 담은 홍보 영상",
    thumbnail_url: "/portfolio/5.webp",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    featured: false,
    display_order: 4,
    metadata: {
      duration: "2:00",
      resolution: "4K",
      tags: ["recipe", "food", "tutorial"]
    }
  },
  {
    title: "Hublot Watch",
    category: "other",
    client: "Hublot",
    description: "혁신적인 기술을 소개하는 다큐멘터리 영상",
    thumbnail_url: "/portfolio/1.webp",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    featured: true,
    display_order: 5,
    metadata: {
      duration: "4:30",
      resolution: "4K",
      tags: ["luxury", "watch", "documentary"]
    }
  }
];

const addSamplePortfolio = async () => {
  try {
    console.log('🎬 Adding sample portfolio items...');

    // Connect to database
    await connectDB();
    await initDatabase();

    // Add each portfolio item
    for (const item of samplePortfolioItems) {
      const createdItem = await DatabaseService.createPortfolioItem(item);
      console.log(`✅ Created portfolio item: ${createdItem.title} (ID: ${createdItem._id})`);
    }

    console.log('🎉 All sample portfolio items added successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error adding sample portfolio items:', error);
    process.exit(1);
  }
};

// Run the script
addSamplePortfolio();
