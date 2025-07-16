
import React, { useState, useEffect } from 'react';
import Login from './Login';
import AdminDashboard from '../components/AdminDashboard';
import POSSystem from '../components/POSSystem';

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface Barber {
  id: string;
  name: string;
}

export interface BillItem extends Service {
  quantity: number;
}

const Index = () => {
  const [userType, setUserType] = useState<'admin' | 'pos' | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUserType = localStorage.getItem('userType') as 'admin' | 'pos' | null;
    const savedServices = localStorage.getItem('services');
    const savedBarbers = localStorage.getItem('barbers');

    if (savedUserType) {
      setUserType(savedUserType);
    }

    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Default services if none exist
      const defaultServices = [
        { id: '1', name: 'Hair Cutting', price: 25.00 },
        { id: '2', name: 'Hair Washing', price: 15.00 },
        { id: '3', name: 'Body Massage', price: 45.00 },
        { id: '4', name: 'Body & Spa', price: 65.00 },
        { id: '5', name: 'Hair Color', price: 55.00 },
        { id: '6', name: 'Stylist Shaving', price: 20.00 },
      ];
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));
    }

    if (savedBarbers) {
      setBarbers(JSON.parse(savedBarbers));
    } else {
      // Default barbers if none exist
      const defaultBarbers = [
        { id: '1', name: 'Ahmed' },
        { id: '2', name: 'Hassan' },
        { id: '3', name: 'Omar' },
      ];
      setBarbers(defaultBarbers);
      localStorage.setItem('barbers', JSON.stringify(defaultBarbers));
    }
  }, []);

  const handleLogin = (type: 'admin' | 'pos') => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const handleLogout = () => {
    setUserType(null);
    localStorage.removeItem('userType');
  };

  const handleUpdateServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem('services', JSON.stringify(newServices));
    // Trigger storage event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'services',
      newValue: JSON.stringify(newServices)
    }));
  };

  const handleUpdateBarbers = (newBarbers: Barber[]) => {
    setBarbers(newBarbers);
    localStorage.setItem('barbers', JSON.stringify(newBarbers));
    // Trigger storage event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'barbers',
      newValue: JSON.stringify(newBarbers)
    }));
  };

  // Listen for localStorage changes (for cross-tab communication)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'services' && e.newValue) {
        setServices(JSON.parse(e.newValue));
      } else if (e.key === 'barbers' && e.newValue) {
        setBarbers(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!userType) {
    return <Login onLogin={handleLogin} />;
  }

  if (userType === 'admin') {
    return (
      <AdminDashboard
        services={services}
        barbers={barbers}
        onUpdateServices={handleUpdateServices}
        onUpdateBarbers={handleUpdateBarbers}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <POSSystem
      services={services}
      barbers={barbers}
      onLogout={handleLogout}
    />
  );
};

export default Index;
