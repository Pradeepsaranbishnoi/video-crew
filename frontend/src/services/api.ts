const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

interface PortfolioItem {
  _id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Portfolio APIs
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    const response = await this.request<PortfolioItem[]>('/api/portfolio');
    return response.data || [];
  }

  async getPortfolioItem(id: string): Promise<PortfolioItem> {
    const response = await this.request<PortfolioItem>(`/api/portfolio/${id}`);
    return response.data!;
  }

  // Contact APIs
  async submitContactInquiry(inquiry: ContactInquiry): Promise<void> {
    await this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(inquiry),
    });
  }

  // Auth APIs
  async login(credentials: LoginCredentials): Promise<ApiResponse> {
    const response = await this.request<ApiResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token if login successful
    if (response.success && response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_role', 'admin');
    }
    
    return response;
  }

  // Admin APIs (require authentication)
  async getContactInquiries(): Promise<any[]> {
    const response = await this.request<any[]>('/api/contact');
    return response.data || [];
  }

  async updateContactInquiry(id: string, update: any): Promise<any> {
    const response = await this.request<any>(`/api/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(update),
    });
    return response.data;
  }

  async createPortfolioItem(item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const response = await this.request<PortfolioItem>('/api/portfolio', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return response.data!;
  }

  async updatePortfolioItem(id: string, item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const response = await this.request<PortfolioItem>(`/api/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
    return response.data!;
  }

  async deletePortfolioItem(id: string): Promise<void> {
    await this.request(`/api/portfolio/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderPortfolioItems(order: string[]): Promise<void> {
    await this.request('/api/portfolio/reorder/positions', {
      method: 'PUT',
      body: JSON.stringify({ order }),
    });
  }

  // Upload APIs
  async uploadImage(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await this.request<{ url: string; filename: string }>('/api/upload/image', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
    
    return response.data!;
  }

  async uploadVideo(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('video', file);

    const response = await this.request<{ url: string; filename: string }>('/api/upload/video', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
    
    return response.data!;
  }

  // Media APIs
  async getMediaFiles(): Promise<any[]> {
    const response = await this.request<any[]>('/api/upload');
    return response.data || [];
  }

  async deleteMediaFile(id: string): Promise<void> {
    await this.request(`/api/upload/${id}`, {
      method: 'DELETE',
    });
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}

export const apiService = new ApiService();
export type { PortfolioItem, ContactInquiry, LoginCredentials, ApiResponse };
