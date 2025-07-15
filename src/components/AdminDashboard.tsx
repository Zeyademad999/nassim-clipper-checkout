
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, DollarSign, TrendingUp, FileText } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface Barber {
  id: string;
  name: string;
}

interface AdminDashboardProps {
  services: Service[];
  barbers: Barber[];
  onUpdateServices: (services: Service[]) => void;
  onUpdateBarbers: (barbers: Barber[]) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  services: initialServices,
  barbers: initialBarbers,
  onUpdateServices,
  onUpdateBarbers,
  onLogout
}) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'barbers' | 'reports'>('overview');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [newService, setNewService] = useState({ name: '', price: 0 });
  const [newBarber, setNewBarber] = useState({ name: '' });

  // Update local state when props change
  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

  useEffect(() => {
    setBarbers(initialBarbers);
  }, [initialBarbers]);

  const addService = () => {
    if (newService.name && newService.price > 0) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        price: newService.price,
      };
      const updatedServices = [...services, service];
      setServices(updatedServices);
      onUpdateServices(updatedServices);
      setNewService({ name: '', price: 0 });
    }
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    const updated = services.map(service => 
      service.id === id ? { ...service, ...updatedService } : service
    );
    setServices(updated);
    onUpdateServices(updated);
    setEditingService(null);
  };

  const deleteService = (id: string) => {
    const updated = services.filter(service => service.id !== id);
    setServices(updated);
    onUpdateServices(updated);
  };

  const addBarber = () => {
    if (newBarber.name) {
      const barber: Barber = {
        id: Date.now().toString(),
        name: newBarber.name,
      };
      const updatedBarbers = [...barbers, barber];
      setBarbers(updatedBarbers);
      onUpdateBarbers(updatedBarbers);
      setNewBarber({ name: '' });
    }
  };

  const updateBarber = (id: string, updatedBarber: Partial<Barber>) => {
    const updated = barbers.map(barber => 
      barber.id === id ? { ...barber, ...updatedBarber } : barber
    );
    setBarbers(updated);
    onUpdateBarbers(updated);
    setEditingBarber(null);
  };

  const deleteBarber = (id: string) => {
    const updated = barbers.filter(barber => barber.id !== id);
    setBarbers(updated);
    onUpdateBarbers(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-black">Admin Dashboard - Nassim Select Barber</h1>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'services', label: 'Services' },
              { key: 'barbers', label: 'Barbers' },
              { key: 'reports', label: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                    <p className="text-2xl font-bold text-black">$0.00</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Services</p>
                    <p className="text-2xl font-bold text-black">{services.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Barbers</p>
                    <p className="text-2xl font-bold text-black">{barbers.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="bg-white rounded-lg shadow border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-black">Manage Services</h2>
                <div className="mt-4 flex gap-4">
                  <input
                    type="text"
                    placeholder="Service name"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newService.price || ''}
                    onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={addService}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Service
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {editingService?.id === service.id ? (
                            <input
                              type="text"
                              value={editingService.name}
                              onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                              className="px-2 py-1 border border-gray-300 rounded"
                            />
                          ) : (
                            service.name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {editingService?.id === service.id ? (
                            <input
                              type="number"
                              value={editingService.price}
                              onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) })}
                              className="px-2 py-1 border border-gray-300 rounded w-20"
                            />
                          ) : (
                            `$${service.price.toFixed(2)}`
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingService?.id === service.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateService(service.id, editingService)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingService(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingService(service)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteService(service.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Barbers Tab */}
        {activeTab === 'barbers' && (
          <div>
            <div className="bg-white rounded-lg shadow border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-black">Manage Barbers</h2>
                <div className="mt-4 flex gap-4">
                  <input
                    type="text"
                    placeholder="Barber name"
                    value={newBarber.name}
                    onChange={(e) => setNewBarber({ name: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={addBarber}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Barber
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Barber Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {barbers.map((barber) => (
                      <tr key={barber.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {editingBarber?.id === barber.id ? (
                            <input
                              type="text"
                              value={editingBarber.name}
                              onChange={(e) => setEditingBarber({ ...editingBarber, name: e.target.value })}
                              className="px-2 py-1 border border-gray-300 rounded"
                            />
                          ) : (
                            barber.name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingBarber?.id === barber.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateBarber(barber.id, editingBarber)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingBarber(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingBarber(barber)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteBarber(barber.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div className="bg-white rounded-lg shadow border p-6">
              <h2 className="text-lg font-medium text-black mb-4">Reports & Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-black mb-2">Date Range Selection</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">From Date</label>
                      <input type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">To Date</label>
                      <input type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <button className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                      Generate Report
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-black mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Today's Receipts
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Print Daily Summary
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Service Performance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
