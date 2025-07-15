
// Migration utilities to convert localStorage data to SQLite format
// Run these functions when switching from localStorage to SQLite

import type { Service, Barber } from '../pages/Index';
import type { DatabaseService, DatabaseBarber } from '../types/database';

export const migrateLocalStorageToDatabase = async () => {
  console.log('Starting migration from localStorage to SQLite...');
  
  try {
    // Get existing localStorage data
    const existingServices = localStorage.getItem('services');
    const existingBarbers = localStorage.getItem('barbers');
    
    const services: Service[] = existingServices ? JSON.parse(existingServices) : [];
    const barbers: Barber[] = existingBarbers ? JSON.parse(existingBarbers) : [];
    
    console.log(`Found ${services.length} services and ${barbers.length} barbers in localStorage`);
    
    // Convert and migrate services
    const migratedServices: DatabaseService[] = services.map(service => ({
      ...service,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    
    // Convert and migrate barbers
    const migratedBarbers: DatabaseBarber[] = barbers.map(barber => ({
      ...barber,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    
    // TODO: When backend is ready, send these to the database
    // await apiService.migrateServices(migratedServices);
    // await apiService.migrateBarbers(migratedBarbers);
    
    console.log('Migration data prepared:', {
      services: migratedServices,
      barbers: migratedBarbers,
    });
    
    return {
      success: true,
      data: {
        services: migratedServices,
        barbers: migratedBarbers,
      }
    };
    
  } catch (error) {
    console.error('Migration failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Migration failed'
    };
  }
};

export const clearLocalStorageData = () => {
  console.log('Clearing localStorage data after successful migration...');
  localStorage.removeItem('services');
  localStorage.removeItem('barbers');
  localStorage.removeItem('userType');
  console.log('localStorage cleared');
};

export const backupLocalStorageData = () => {
  const backup = {
    services: localStorage.getItem('services'),
    barbers: localStorage.getItem('barbers'),
    userType: localStorage.getItem('userType'),
    timestamp: new Date().toISOString(),
  };
  
  const backupString = JSON.stringify(backup, null, 2);
  const blob = new Blob([backupString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `barbershop-backup-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('localStorage data backed up');
};
