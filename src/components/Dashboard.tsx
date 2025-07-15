
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, DollarSign, Scissors, TrendingUp, Users, Clock } from 'lucide-react';

interface SalesData {
  date: string;
  revenue: number;
  services: number;
}

interface ServiceStats {
  name: string;
  count: number;
  revenue: number;
  color: string;
}

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  // Mock data - in a real app, this would come from your backend
  const dailyData: SalesData[] = [
    { date: 'Mon', revenue: 320, services: 12 },
    { date: 'Tue', revenue: 280, services: 10 },
    { date: 'Wed', revenue: 450, services: 16 },
    { date: 'Thu', revenue: 380, services: 14 },
    { date: 'Fri', revenue: 520, services: 18 },
    { date: 'Sat', revenue: 680, services: 24 },
    { date: 'Sun', revenue: 420, services: 15 },
  ];

  const weeklyData: SalesData[] = [
    { date: 'Week 1', revenue: 2100, services: 78 },
    { date: 'Week 2', revenue: 2450, services: 89 },
    { date: 'Week 3', revenue: 2200, services: 82 },
    { date: 'Week 4', revenue: 2680, services: 95 },
  ];

  const monthlyData: SalesData[] = [
    { date: 'Jan', revenue: 8500, services: 320 },
    { date: 'Feb', revenue: 9200, services: 365 },
    { date: 'Mar', revenue: 8800, services: 342 },
    { date: 'Apr', revenue: 9800, services: 390 },
    { date: 'May', revenue: 10200, services: 410 },
    { date: 'Jun', revenue: 9600, services: 385 },
  ];

  const serviceStats: ServiceStats[] = [
    { name: 'Hair Cutting', count: 145, revenue: 3625, color: '#3B82F6' },
    { name: 'Hair Washing', count: 89, revenue: 1335, color: '#10B981' },
    { name: 'Body Massage', count: 42, revenue: 1890, color: '#F59E0B' },
    { name: 'Body & Spa', count: 28, revenue: 1820, color: '#EF4444' },
    { name: 'Hair Color', count: 35, revenue: 1925, color: '#8B5CF6' },
    { name: 'Stylist Shaving', count: 78, revenue: 1560, color: '#06B6D4' },
  ];

  const getCurrentData = () => {
    switch (timeRange) {
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      default: return dailyData;
    }
  };

  const getTotalRevenue = () => {
    return getCurrentData().reduce((sum, item) => sum + item.revenue, 0);
  };

  const getTotalServices = () => {
    return getCurrentData().reduce((sum, item) => sum + item.services, 0);
  };

  const getAverageRevenue = () => {
    const data = getCurrentData();
    return data.length > 0 ? getTotalRevenue() / data.length : 0;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600">Business analytics and insights</p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {(['daily', 'weekly', 'monthly'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">${getTotalRevenue().toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Services</p>
              <p className="text-2xl font-bold text-slate-800">{getTotalServices()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Scissors className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Average Revenue</p>
              <p className="text-2xl font-bold text-slate-800">${getAverageRevenue().toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Avg per Service</p>
              <p className="text-2xl font-bold text-slate-800">
                ${getTotalServices() > 0 ? (getTotalRevenue() / getTotalServices()).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Services Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Services Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="services" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Popularity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Stats Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Service Popularity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {serviceStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Services List */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Services</h3>
          <div className="space-y-4">
            {serviceStats
              .sort((a, b) => b.revenue - a.revenue)
              .map((service, index) => (
                <div key={service.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-slate-200 rounded-full text-sm font-bold text-slate-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{service.name}</p>
                      <p className="text-sm text-slate-600">{service.count} services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">${service.revenue.toFixed(2)}</p>
                    <p className="text-sm text-slate-600">revenue</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
