// File: frontend/src/services/authService.ts

import api from './api';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'alumni' | 'faculty';
  collegeName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: any;
    token: string;
  };
}

class AuthService {
  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  }

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', data);
      
      if (response.data.success && response.data.data) {
        // Store token and user data
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      
      if (response.data.success && response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch user data' };
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get stored user data
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Forgot password
  async forgotPassword(email: string) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Request failed' };
    }
  }

  // Reset password
  async resetPassword(token: string, password: string) {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  }
}

export default new AuthService();