
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, DollarSign, TrendingUp, FileText, BarChart3, Calendar, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Nassim Select Barber
                </h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Online
              </Badge>
              <Button 
                onClick={onLogout}
                variant="outline"
                className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Navigation */}
        <Card className="mb-8 overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-2">
            <nav className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as any)}
                    variant={activeTab === item.key ? "default" : "ghost"}
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      activeTab === item.key 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                        : 'hover:bg-muted/50 hover:scale-105'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Animated Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <StatsGrid services={services} barbers={barbers} />
              
              {/* Quick Actions */}
              <Card className="bg-gradient-to-r from-card via-card to-card/80 border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>Manage your barbershop efficiently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      onClick={() => setActiveTab('services')}
                      className="h-20 flex-col space-y-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                    >
                      <Settings className="h-6 w-6" />
                      <span>Manage Services</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('barbers')}
                      className="h-20 flex-col space-y-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
                    >
                      <Users className="h-6 w-6" />
                      <span>Manage Barbers</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('reports')}
                      className="h-20 flex-col space-y-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                    >
                      <FileText className="h-6 w-6" />
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
