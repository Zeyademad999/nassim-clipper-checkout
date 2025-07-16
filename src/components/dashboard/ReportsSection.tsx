
import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ReportsSection: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  const reportTypes = [
    {
      title: "Daily Sales Report",
      description: "Today's revenue and transaction summary",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Service Performance",
      description: "Most popular services and trends",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Barber Statistics",
      description: "Individual barber performance metrics",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Monthly Overview",
      description: "Complete monthly business summary",
      icon: BarChart3,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10"
    }
  ];

  const quickActions = [
    { label: "Today's Receipts", icon: FileText, color: "blue" },
    { label: "Weekly Summary", icon: Calendar, color: "green" },
    { label: "Export Data", icon: Download, color: "purple" },
    { label: "Analytics Dashboard", icon: PieChart, color: "orange" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Date Range Selection */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Generate Custom Report</span>
          </CardTitle>
          <CardDescription>Select date range to generate detailed reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-date">From Date</Label>
              <Input
                id="from-date"
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-date">To Date</Label>
              <Input
                id="to-date"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transform hover:scale-105 transition-all duration-300">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card 
              key={report.title}
              className="hover:shadow-xl transition-all duration-500 hover:scale-105 border-border/50 group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${report.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {report.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 hover:bg-primary hover:text-primary-foreground transform hover:scale-105 transition-all duration-200"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-xl border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Frequently used report actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className={`h-20 flex-col space-y-2 hover:bg-${action.color}-50 hover:text-${action.color}-600 hover:border-${action.color}-300 transform hover:scale-105 transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Preview */}
      <Card className="bg-gradient-to-r from-card via-card to-card/80 border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-primary" />
            <span>Analytics Preview</span>
          </CardTitle>
          <CardDescription>Quick insights into your business performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary mb-2">$0</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-green-600 mb-2">0</div>
              <div className="text-sm text-muted-foreground">Transactions</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-sm text-muted-foreground">Customers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
