
import React, { useState } from 'react';
import { BarChart3, Settings, Users, FileText } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import StatsGrid from './dashboard/StatsGrid';
import ServicesSection from './dashboard/ServicesSection';
import BarbersSection from './dashboard/BarbersSection';
import ReportsSection from './dashboard/ReportsSection';

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
  services,
  barbers,
  onUpdateServices,
  onUpdateBarbers,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'barbers' | 'reports'>('overview');

  const navItems = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'services', label: 'Services', icon: Settings },
    { key: 'barbers', label: 'Barbers', icon: Users },
    { key: 'reports', label: 'Reports', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Nassim Select Barber
                </h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Online
              </Badge>
              <Button 
                onClick={onLogout}
                variant="outline"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation */}
        <Card className="mb-6">
          <CardContent className="p-1">
            <nav className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as any)}
                    variant={activeTab === item.key ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <StatsGrid services={services} barbers={barbers} />
              
              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      onClick={() => setActiveTab('services')}
                      variant="outline"
                      className="h-16 flex-col space-y-1"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Manage Services</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('barbers')}
                      variant="outline"
                      className="h-16 flex-col space-y-1"
                    >
                      <Users className="h-5 w-5" />
                      <span>Manage Barbers</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('reports')}
                      variant="outline"
                      className="h-16 flex-col space-y-1"
                    >
                      <FileText className="h-5 w-5" />
                      <span>View Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'services' && (
            <ServicesSection 
              services={services} 
              onUpdateServices={onUpdateServices} 
            />
          )}

          {activeTab === 'barbers' && (
            <BarbersSection 
              barbers={barbers} 
              onUpdateBarbers={onUpdateBarbers} 
            />
          )}

          {activeTab === 'reports' && <ReportsSection />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
