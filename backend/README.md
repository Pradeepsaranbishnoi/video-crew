# 🔧 Video Crew Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-black.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green.svg)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-9.0.2-yellow.svg)](https://jwt.io/)

A robust Node.js/Express backend API for the Video Crew portfolio website with MongoDB integration, media upload capabilities, and comprehensive content management.

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Protected Routes** - Middleware for route protection
- **CORS Support** - Cross-origin resource sharing
- **Input Validation** - Express-validator for request validation
- **Security Headers** - Helmet.js for security headers

### 📊 Database & Models
- **MongoDB Integration** - NoSQL database with Mongoose ODM
- **Schema Validation** - Mongoose schema validation
- **Data Models** - Portfolio, Contact, Media, Admin models
- **Indexing** - Optimized database queries
- **Connection Pooling** - Efficient database connections

### 📁 File Management
- **Media Upload** - Image and video file uploads
- **File Validation** - Type and size validation
- **Static File Serving** - Optimized file delivery
- **Metadata Storage** - File information in database
- **Bulk Operations** - Multiple file management

### 🔌 API Endpoints
- **RESTful Design** - Standard REST API patterns
- **CRUD Operations** - Complete CRUD for all resources
- **Error Handling** - Comprehensive error management
- **Response Formatting** - Consistent API responses
- **Rate Limiting** - Request rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### Installation
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

### Environment Variables
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/videocrew_db

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key

# CORS
FRONTEND_URL=http://localhost:5173

# API Configuration (for generating full URLs for uploaded files)
API_URL=http://localhost:5000
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   └── db.ts           # Database connection
│   ├── models/              # Mongoose models
│   │   ├── AdminUser.ts    # Admin user model
│   │   ├── PortfolioItem.ts # Portfolio model
│   │   ├── ContactInquiry.ts # Contact model
│   │   └── MediaFile.ts    # Media file model
│   ├── routes/              # API routes
│   │   ├── auth.ts         # Authentication routes
│   │   ├── portfolio.ts    # Portfolio routes
│   │   ├── contact.ts      # Contact routes
│   │   └── upload.ts       # Upload routes
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts         # JWT authentication
│   │   └── upload.ts       # File upload middleware
│   ├── services/            # Business logic
│   │   └── database.ts     # Database operations
│   ├── scripts/             # Utility scripts
│   │   ├── createAdmin.ts  # Create admin user
│   │   ├── testConnection.ts # Test database
│   │   ├── addSamplePortfolio.ts # Add sample data
│   │   └── testMediaUpload.ts # Test media upload
│   ├── types/               # TypeScript types
│   │   └── index.ts        # Type definitions
│   └── server.ts            # Main server file
├── uploads/                 # File storage directory
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── .eslintrc.js            # ESLint configuration
└── .prettierrc             # Prettier configuration
```

## 🔌 API Endpoints

### Authentication
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@videocrew.com",
  "password": "Test@123"
}
```

### Portfolio Management
```http
GET    /api/portfolio              # Get all portfolio items
GET    /api/portfolio/:id          # Get single portfolio item
POST   /api/portfolio              # Create portfolio item (auth)
PUT    /api/portfolio/:id          # Update portfolio item (auth)
DELETE /api/portfolio/:id          # Delete portfolio item (auth)
PUT    /api/portfolio/reorder/positions # Reorder items (auth)
```

### Contact Management
```http
POST /api/contact                  # Submit contact form
GET  /api/contact                  # Get all inquiries (auth)
PUT  /api/contact/:id              # Update inquiry status (auth)
```

### Media Upload
```http
POST   /api/upload/image           # Upload image (auth)
POST   /api/upload/video           # Upload video (auth)
GET    /api/upload                 # Get all media files (auth)
DELETE /api/upload/:id             # Delete media file (auth)
```

## 📊 Database Models

### AdminUser
```typescript
interface AdminUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### PortfolioItem
```typescript
interface PortfolioItem {
  _id: string;
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
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### ContactInquiry
```typescript
interface ContactInquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'processing' | 'completed';
  admin_notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### MediaFile
```typescript
interface MediaFile {
  _id: string;
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
```

## 🔧 Development Scripts

```bash
npm run dev                    # Start development server
npm run build                  # Build for production
npm run start                  # Start production server
npm run create-admin           # Create admin user
npm run test-db                # Test database connection
npm run add-sample-portfolio   # Add sample portfolio data
npm run test-media             # Test media upload functionality
npm run lint                   # Run ESLint
npm run format                 # Format code with Prettier
```

## 🛠 Tech Stack

### Core
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - Object Document Mapper

### Authentication & Security
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin support

### File Handling
- **Multer** - File upload middleware
- **Express Validator** - Input validation
- **Morgan** - HTTP request logging

### Development
- **ts-node-dev** - Development server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🔒 Security Features

### Authentication
- JWT token-based authentication
- Secure password hashing with bcryptjs
- Token expiration and refresh
- Protected route middleware

### Input Validation
- Request body validation
- File type and size validation
- SQL injection prevention
- XSS protection

### File Upload Security
- File type validation
- File size limits
- Secure file naming
- Virus scanning (optional)

### CORS Configuration
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## 📁 File Upload System

### Supported Formats
- **Images**: PNG, JPG, JPEG, GIF, WebP
- **Videos**: MP4, AVI, MOV, WMV, FLV

### Upload Configuration
```typescript
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    // File type validation
  }
});
```

**Important**: Set the `API_URL` environment variable to ensure uploaded files have correct full URLs. This is crucial for the frontend to properly display uploaded media files.

### File Storage
- Files stored in `uploads/` directory
- Metadata stored in MongoDB
- Static file serving via Express
- Automatic file cleanup

## 🔍 Error Handling

### Global Error Handler
```typescript
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation error',
      errors: err.errors 
    });
  }
  
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Internal server error' 
  });
});
```

### API Response Format
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  token?: string;
  user?: {
    _id: string;
    email: string;
    name: string;
  };
}
```

## 📊 Performance Optimization

### Database
- Connection pooling
- Indexed queries
- Efficient schemas
- Query optimization

### File Serving
- Static file caching
- Compression
- CDN ready
- Optimized delivery

### API
- Response caching
- Rate limiting
- Request validation
- Error handling

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms
- **Heroku** - Easy deployment
- **Railway** - Modern platform
- **DigitalOcean** - VPS hosting
- **AWS** - Scalable hosting

## 🧪 Testing

### Database Testing
```bash
npm run test-db
```

### Media Upload Testing
```bash
npm run test-media
```

### Manual Testing
- Use Postman or similar tool
- Test all endpoints
- Verify file uploads
- Check authentication

## 📈 Monitoring

### Logging
- HTTP request logging with Morgan
- Error logging
- File upload logging
- Database connection logging

### Health Check
```http
GET /health
```

Response:
```json
{
  "success": true,
  "message": "Video Crew API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 Configuration

### Database Configuration
```typescript
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
```

### CORS Configuration
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### File Upload Configuration
```typescript
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@videocrew.com or create an issue.

---

**Built with ❤️ for professional video production**
