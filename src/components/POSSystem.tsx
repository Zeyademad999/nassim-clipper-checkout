
import React, { useState, useEffect } from 'react';
import { ServiceCard } from './ServiceCard';
import { BillSummary } from './BillSummary';
import { CheckoutModal } from './CheckoutModal';
import { Menu } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface Barber {
  id: string;
  name: string;
}

interface BillItem extends Service {
  quantity: number;
}

interface POSSystemProps {
  services: Service[];
  barbers: Barber[];
  onLogout: () => void;
}

const POSSystem: React.FC<POSSystemProps> = ({ services: initialServices, barbers: initialBarbers, onLogout }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Update local state when props change
  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

  useEffect(() => {
    setBarbers(initialBarbers);
  }, [initialBarbers]);

  // Listen for localStorage changes for real-time updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'services' && e.newValue) {
        setServices(JSON.parse(e.newValue));
        // Update billItems if a service was modified
        setBillItems(prevItems => {
          const updatedServices = JSON.parse(e.newValue);
          return prevItems.map(item => {
            const updatedService = updatedServices.find((s: Service) => s.id === item.id);
            return updatedService ? { ...updatedService, quantity: item.quantity } : item;
          }).filter(item => updatedServices.some((s: Service) => s.id === item.id));
        });
      } else if (e.key === 'barbers' && e.newValue) {
        setBarbers(JSON.parse(e.newValue));
        // Reset selected barber if it was deleted
        const updatedBarbers = JSON.parse(e.newValue);
        if (selectedBarber && !updatedBarbers.some((b: Barber) => b.name === selectedBarber)) {
          setSelectedBarber('');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [selectedBarber]);

  const addService = (service: Service) => {
    setBillItems(prev => {
      const existingItem = prev.find(item => item.id === service.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === service.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setBillItems(prev => prev.filter(item => item.id !== id));
    } else {
      setBillItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeService = (id: string) => {
    setBillItems(prev => prev.filter(item => item.id !== id));
  };

  const clearBill = () => {
    setBillItems([]);
    setCustomerName('');
    setSelectedBarber('');
    setServiceDate(new Date().toISOString().split('T')[0]);
  };

  const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-white hover:bg-gray-800 transition-colors lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Nassim Select Barber</h1>
                <p className="text-sm text-gray-300">Point of Sale System</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Customer, Barber, and Date Info */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Customer Name (Optional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Barber
                </label>
                <select
                  value={selectedBarber}
                  onChange={(e) => setSelectedBarber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                >
                  <option value="">Select Barber</option>
                  {barbers.map((barber) => (
                    <option key={barber.id} value={barber.name}>
                      {barber.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Service Date
                </label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onAdd={addService}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Bill Summary Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
          <BillSummary
            items={billItems}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onUpdateQuantity={updateQuantity}
            onRemoveService={removeService}
            onCheckout={() => setShowCheckout(true)}
            onClear={clearBill}
            customerName={customerName}
            barberName={selectedBarber}
          />
        </aside>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          items={billItems}
          subtotal={subtotal}
          tax={tax}
          total={total}
          customerName={customerName}
          barberName={selectedBarber}
          serviceDate={serviceDate}
          onClose={() => setShowCheckout(false)}
          onComplete={clearBill}
        />
      )}
    </div>
  );
};

export default POSSystem;
