
import React, { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { BillSummary } from '../components/BillSummary';
import { CheckoutModal } from '../components/CheckoutModal';
import { Dashboard } from '../components/Dashboard';
import { Scissors, Menu } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface BillItem extends Service {
  quantity: number;
}

const services: Service[] = [
  { id: '1', name: 'Hair Cutting', price: 25.00, icon: 'Scissors' },
  { id: '2', name: 'Hair Washing', price: 15.00, icon: 'Droplets' },
  { id: '3', name: 'Body Massage', price: 45.00, icon: 'Hand' },
  { id: '4', name: 'Body & Spa', price: 65.00, icon: 'Sparkles' },
  { id: '5', name: 'Hair Color', price: 55.00, icon: 'Palette' },
  { id: '6', name: 'Stylist Shaving', price: 20.00, icon: 'Zap' },
];

const Index = () => {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [barberName, setBarberName] = useState('');
  const [activeTab, setActiveTab] = useState<'pos' | 'dashboard'>('pos');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    setBarberName('');
  };

  const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Nassim Select Barber</h1>
                  <p className="text-sm text-slate-600">Point of Sale System</p>
                </div>
              </div>
            </div>
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('pos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'pos'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                POS
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </button>
            </nav>
          </div>
        </div>
      </header>

      {activeTab === 'pos' ? (
        <div className="flex flex-1">
          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* Customer and Barber Info */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Customer Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Barber Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={barberName}
                    onChange={(e) => setBarberName(e.target.value)}
                    placeholder="Enter barber name"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          } fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
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
              barberName={barberName}
            />
          </aside>
        </div>
      ) : (
        <Dashboard />
      )}

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
          barberName={barberName}
          onClose={() => setShowCheckout(false)}
          onComplete={clearBill}
        />
      )}
    </div>
  );
};

export default Index;
