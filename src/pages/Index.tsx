
import React, { useState } from 'react';
import Login from './Login';
import AdminDashboard from '../components/AdminDashboard';
import POSSystem from '../components/POSSystem';
import { useServices, useBarbers, useAuth } from '../hooks/useDatabase';
import { useToast } from '../hooks/use-toast';

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
  const { toast } = useToast();
  const { user, login, logout } = useAuth();
  const { 
    services, 
    loading: servicesLoading, 
    createService, 
    updateService, 
    deleteService, 
    refetch: refetchServices 
  } = useServices();
  const { 
    barbers, 
    loading: barbersLoading, 
    createBarber, 
    updateBarber, 
    deleteBarber, 
    refetch: refetchBarbers 
  } = useBarbers();

  const handleLogin = async (username: string, password: string) => {
    const result = await login(username, password);
    if (!result.success) {
      toast({
        title: "Login Failed",
        description: result.error || "Invalid credentials",
        variant: "destructive",
      });
      return false;
    }
    toast({
      title: "Login Successful",
      description: `Welcome ${username}!`,
    });
    return true;
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleUpdateServices = async (newServices: Service[]) => {
    // This is handled automatically by the database hooks
    // The components will call createService, updateService, deleteService directly
    refetchServices();
  };

  const handleUpdateBarbers = async (newBarbers: Barber[]) => {
    // This is handled automatically by the database hooks
    // The components will call createBarber, updateBarber, deleteBarber directly
    refetchBarbers();
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (servicesLoading || barbersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user.user_type === 'admin') {
    return (
      <AdminDashboard
        services={services}
        barbers={barbers}
        onUpdateServices={handleUpdateServices}
        onUpdateBarbers={handleUpdateBarbers}
        onLogout={handleLogout}
        // Pass database operation functions
        createService={createService}
        updateService={updateService}
        deleteService={deleteService}
        createBarber={createBarber}
        updateBarber={updateBarber}
        deleteBarber={deleteBarber}
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
