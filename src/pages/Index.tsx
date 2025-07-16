
import React, { useState } from 'react';
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
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Hair Cutting', price: 25.00 },
    { id: '2', name: 'Hair Washing', price: 15.00 },
    { id: '3', name: 'Body Massage', price: 45.00 },
    { id: '4', name: 'Body & Spa', price: 65.00 },
    { id: '5', name: 'Hair Color', price: 55.00 },
    { id: '6', name: 'Stylist Shaving', price: 20.00 },
  ]);

  const [barbers, setBarbers] = useState<Barber[]>([
    { id: '1', name: 'Ahmed' },
    { id: '2', name: 'Hassan' },
    { id: '3', name: 'Omar' },
  ]);

  const handleLogin = (type: 'admin' | 'pos') => {
    setUserType(type);
  };

  const handleLogout = () => {
    setUserType(null);
  };

  if (!userType) {
    return <Login onLogin={handleLogin} />;
  }

  if (userType === 'admin') {
    return (
      <AdminDashboard
        services={services}
        barbers={barbers}
        onUpdateServices={setServices}
        onUpdateBarbers={setBarbers}
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
