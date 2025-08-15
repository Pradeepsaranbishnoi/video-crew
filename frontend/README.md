# 🎨 Video Crew Frontend

[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.0-purple.svg)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-pink.svg)](https://www.framer.com/motion/)

A modern, responsive React frontend for the Video Crew portfolio website with dynamic content management, media upload capabilities, and beautiful animations.

## ✨ Features

### 🎨 Design & UX
- **Dark Theme** - Professional dark design with blue accents
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Elements** - Hover effects and micro-interactions
- **Loading States** - Beautiful loading animations
- **Error Handling** - User-friendly error messages

### 📱 Pages & Components
- **Home Page** - Hero section with video background
- **Portfolio Page** - Dynamic portfolio with real-time categories
- **Contact Page** - Professional contact form with validation
- **Admin Panel** - Complete content management system
- **Media Management** - Upload, preview, and manage files
- **Toast Notifications** - Beautiful animated notifications

### 🔧 Technical Features
- **TypeScript** - Full type safety
- **React Router** - Client-side routing
- **API Integration** - Real-time data from backend
- **File Upload** - Drag & drop file uploads
- **Video Player** - HTML5 video with controls
- **Image Gallery** - Lazy loading image galleries
- **Form Validation** - Real-time form validation
- **State Management** - React hooks for state

### 👨‍💼 Admin Features
- **Dashboard** - Real-time statistics and overview
- **Portfolio Management** - CRUD operations for portfolio items
- **Media Library** - Upload, preview, and manage media files
- **Contact Management** - View and manage contact submissions
- **Dynamic Categories** - Real-time category management
- **Bulk Operations** - Multiple file management
- **Search & Filter** - Advanced search and filtering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend API running

### Installation
```bash
cd frontend
npm install
cp env.example .env
# Edit .env with your API URL
npm run dev
```

### Environment Variables
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Video Crew
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Common UI components
│   │   ├── portfolio/      # Portfolio components
│   │   ├── contact/        # Contact form components
│   │   ├── admin/          # Admin panel components
│   │   └── auth/           # Authentication components
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Home page
│   │   ├── Portfolio.tsx   # Portfolio page
│   │   ├── Contact.tsx     # Contact page
│   │   └── admin/          # Admin pages
│   ├── services/           # API services
│   │   └── api.ts          # API service class
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## 🎬 Portfolio Features

### Dynamic Categories
- **Real-time Categories** - Fetched from backend API
- **Korean Translations** - Professional Korean category names
- **Filter System** - Filter portfolio by category
- **Responsive Grid** - Adaptive grid layout

### Video Player
- **HTML5 Video** - Native browser video controls
- **Custom Controls** - Enhanced video player UI
- **Fullscreen Support** - Fullscreen video playback
- **Mobile Optimized** - Touch-friendly controls

### Image Gallery
- **Lazy Loading** - Performance optimized image loading
- **Lightbox Preview** - Full-screen image preview
- **Responsive Images** - Adaptive image sizing
- **Loading States** - Beautiful loading animations

## 👨‍💼 Admin Panel

### Dashboard
- **Real-time Stats** - Live statistics from backend
- **Quick Actions** - Fast access to common tasks
- **Recent Activity** - Latest portfolio and contact updates
- **Storage Usage** - Media storage monitoring

### Portfolio Management
- **CRUD Operations** - Create, read, update, delete
- **Drag & Drop** - Reorder portfolio items
- **Bulk Operations** - Multiple item management
- **Search & Filter** - Advanced filtering options

### Media Management
- **File Upload** - Drag & drop file uploads
- **Preview System** - Image and video previews
- **Bulk Delete** - Multiple file deletion
- **Storage Monitoring** - File storage tracking

### Contact Management
- **Inquiry Dashboard** - View all contact submissions
- **Status Management** - Update inquiry status
- **Search & Filter** - Find specific inquiries
- **Export Options** - Export contact data

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Quality
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **React Hooks** - Modern React patterns

### Performance
- **Code Splitting** - Route-based code splitting
- **Lazy Loading** - Component and image lazy loading
- **Bundle Optimization** - Optimized bundle size
- **Caching** - Static asset caching

## 🎨 Animation System

### Framer Motion
- **Page Transitions** - Smooth page transitions
- **Component Animations** - Micro-interactions
- **Loading States** - Animated loading indicators
- **Hover Effects** - Interactive hover animations

### Animation Examples
```tsx
// Fade in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Stagger animation
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      variants={itemVariants}
      custom={index}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 🔌 API Integration

### API Service
```typescript
// Example API usage
const apiService = new ApiService();

// Get portfolio items
const portfolio = await apiService.getPortfolioItems();

// Upload media file
const result = await apiService.uploadImage(file);

// Submit contact form
await apiService.submitContactInquiry(data);
```

### Error Handling
- **Network Errors** - Graceful error handling
- **Validation Errors** - Form validation feedback
- **Loading States** - User feedback during operations
- **Retry Logic** - Automatic retry for failed requests

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting
- **AWS S3** - Scalable hosting

### Environment Setup
```bash
# Production environment
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=Video Crew
```

## 📊 Performance Metrics

- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

- **Input Validation** - Client-side validation
- **XSS Protection** - Content sanitization
- **CORS Handling** - Proper CORS configuration
- **Environment Variables** - Secure configuration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for professional video production**
