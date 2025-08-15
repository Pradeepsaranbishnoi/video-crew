// Database model interfaces for MongoDB
export interface AdminUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PortfolioItem {
  _id?: string;
  title: string;
  category: string;
  client?: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  featured?: boolean;
  display_order?: number;
  metadata?: {
    duration?: string;
    resolution?: string;
    tags?: string[];
    file_size?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactInquiry {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'new' | 'processing' | 'completed';
  admin_notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response interfaces
export interface ApiResponse<T = any> {
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

// JWT Payload interface
export interface JWTPayload {
  _id: string;
  email: string;
  name: string;
}

// Request interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioRequest {
  title: string;
  category: string;
  client?: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  featured?: boolean;
  display_order?: number;
  metadata?: {
    duration?: string;
    resolution?: string;
    tags?: string[];
    file_size?: number;
  };
}

export interface ContactUpdateRequest {
  status?: 'new' | 'processing' | 'completed';
  admin_notes?: string;
}

export interface ReorderRequest {
  order: string[];
}
