
// API service layer for SQLite database operations
// This will be used to replace localStorage operations

import type { 
  DatabaseService, 
  DatabaseBarber, 
  DatabaseUser, 
  DatabaseTransaction, 
  DatabaseTransactionItem,
  ApiResponse,
  PaginatedResponse 
} from '../types/database';

// Base API configuration
const API_BASE_URL = 'http://localhost:3001/api'; // Backend server URL

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'Request failed' };
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  // Authentication
  async login(username: string, password: string): Promise<ApiResponse<DatabaseUser>> {
    return this.request<DatabaseUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  // Services CRUD
  async getServices(): Promise<ApiResponse<DatabaseService[]>> {
    return this.request<DatabaseService[]>('/services');
  }

  async createService(service: Omit<DatabaseService, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<DatabaseService>> {
    return this.request<DatabaseService>('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  }

  async updateService(id: string, service: Partial<DatabaseService>): Promise<ApiResponse<DatabaseService>> {
    return this.request<DatabaseService>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  }

  async deleteService(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Barbers CRUD
  async getBarbers(): Promise<ApiResponse<DatabaseBarber[]>> {
    return this.request<DatabaseBarber[]>('/barbers');
  }

  async createBarber(barber: Omit<DatabaseBarber, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<DatabaseBarber>> {
    return this.request<DatabaseBarber>('/barbers', {
      method: 'POST',
      body: JSON.stringify(barber),
    });
  }

  async updateBarber(id: string, barber: Partial<DatabaseBarber>): Promise<ApiResponse<DatabaseBarber>> {
    return this.request<DatabaseBarber>(`/barbers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(barber),
    });
  }

  async deleteBarber(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/barbers/${id}`, {
      method: 'DELETE',
    });
  }

  // Transactions
  async createTransaction(
    transaction: Omit<DatabaseTransaction, 'id' | 'created_at'>,
    items: Omit<DatabaseTransactionItem, 'id' | 'transaction_id'>[]
  ): Promise<ApiResponse<DatabaseTransaction>> {
    return this.request<DatabaseTransaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify({ transaction, items }),
    });
  }

  async getTransactions(
    page: number = 1,
    limit: number = 50,
    startDate?: string,
    endDate?: string
  ): Promise<ApiResponse<PaginatedResponse<DatabaseTransaction>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(startDate && { start_date: startDate }),
      ...(endDate && { end_date: endDate }),
    });

    return this.request<PaginatedResponse<DatabaseTransaction>>(`/transactions?${params}`);
  }

  async getTransactionById(id: string): Promise<ApiResponse<DatabaseTransaction & { items: DatabaseTransactionItem[] }>> {
    return this.request<DatabaseTransaction & { items: DatabaseTransactionItem[] }>(`/transactions/${id}`);
  }

  // Reports
  async getDailyReport(date: string): Promise<ApiResponse<{
    total_revenue: number;
    total_transactions: number;
    services_sold: { service_name: string; quantity: number; revenue: number }[];
    barber_performance: { barber_name: string; transactions: number; revenue: number }[];
  }>> {
    return this.request(`/reports/daily?date=${date}`);
  }

  async getDateRangeReport(startDate: string, endDate: string): Promise<ApiResponse<{
    total_revenue: number;
    total_transactions: number;
    daily_breakdown: { date: string; revenue: number; transactions: number }[];
    top_services: { service_name: string; quantity: number; revenue: number }[];
    barber_performance: { barber_name: string; transactions: number; revenue: number }[];
  }>> {
    return this.request(`/reports/range?start_date=${startDate}&end_date=${endDate}`);
  }
}

export const apiService = new ApiService();
export default apiService;
