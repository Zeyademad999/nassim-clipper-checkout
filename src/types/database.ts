
// Database type definitions for SQLite integration
export interface DatabaseService {
  id: string;
  name: string;
  price: number;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseBarber {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseUser {
  id: string;
  username: string;
  password_hash: string;
  user_type: 'admin' | 'pos';
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseTransaction {
  id: string;
  receipt_number: string;
  customer_name?: string;
  barber_id?: string;
  service_date: string;
  subtotal: number;
  tax: number;
  total: number;
  created_at?: string;
  user_id?: string;
}

export interface DatabaseTransactionItem {
  id: string;
  transaction_id: string;
  service_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
