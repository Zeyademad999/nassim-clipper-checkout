
// Custom hooks for database operations
// These hooks will replace localStorage operations when SQLite backend is ready

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { DatabaseService, DatabaseBarber, DatabaseTransaction } from '../types/database';

// Hook for services management
export const useServices = () => {
  const [services, setServices] = useState<DatabaseService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    
    const response = await apiService.getServices();
    
    if (response.success && response.data) {
      setServices(response.data);
    } else {
      setError(response.error || 'Failed to fetch services');
    }
    
    setLoading(false);
  };

  const createService = async (service: Omit<DatabaseService, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await apiService.createService(service);
    
    if (response.success && response.data) {
      setServices(prev => [...prev, response.data!]);
      return { success: true, data: response.data };
    } else {
      setError(response.error || 'Failed to create service');
      return { success: false, error: response.error };
    }
  };

  const updateService = async (id: string, service: Partial<DatabaseService>) => {
    const response = await apiService.updateService(id, service);
    
    if (response.success && response.data) {
      setServices(prev => prev.map(s => s.id === id ? response.data! : s));
      return { success: true, data: response.data };
    } else {
      setError(response.error || 'Failed to update service');
      return { success: false, error: response.error };
    }
  };

  const deleteService = async (id: string) => {
    const response = await apiService.deleteService(id);
    
    if (response.success) {
      setServices(prev => prev.filter(s => s.id !== id));
      return { success: true };
    } else {
      setError(response.error || 'Failed to delete service');
      return { success: false, error: response.error };
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices,
  };
};

// Hook for barbers management
export const useBarbers = () => {
  const [barbers, setBarbers] = useState<DatabaseBarber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBarbers = async () => {
    setLoading(true);
    setError(null);
    
    const response = await apiService.getBarbers();
    
    if (response.success && response.data) {
      setBarbers(response.data);
    } else {
      setError(response.error || 'Failed to fetch barbers');
    }
    
    setLoading(false);
  };

  const createBarber = async (barber: Omit<DatabaseBarber, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await apiService.createBarber(barber);
    
    if (response.success && response.data) {
      setBarbers(prev => [...prev, response.data!]);
      return { success: true, data: response.data };
    } else {
      setError(response.error || 'Failed to create barber');
      return { success: false, error: response.error };
    }
  };

  const updateBarber = async (id: string, barber: Partial<DatabaseBarber>) => {
    const response = await apiService.updateBarber(id, barber);
    
    if (response.success && response.data) {
      setBarbers(prev => prev.map(b => b.id === id ? response.data! : b));
      return { success: true, data: response.data };
    } else {
      setError(response.error || 'Failed to update barber');
      return { success: false, error: response.error };
    }
  };

  const deleteBarber = async (id: string) => {
    const response = await apiService.deleteBarber(id);
    
    if (response.success) {
      setBarbers(prev => prev.filter(b => b.id !== id));
      return { success: true };
    } else {
      setError(response.error || 'Failed to delete barber');
      return { success: false, error: response.error };
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return {
    barbers,
    loading,
    error,
    createBarber,
    updateBarber,
    deleteBarber,
    refetch: fetchBarbers,
  };
};

// Hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState<DatabaseService | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setLoading(true);
    const response = await apiService.login(username, password);
    
    if (response.success && response.data) {
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: response.error };
    }
  };

  const logout = async () => {
    await apiService.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
};
