
import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart3, PieChart, DollarSign, Users } from 'lucide-react';
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
      icon: DollarSign
    },
    {
      title: "Service Performance",
      description: "Most popular services and trends",
      icon: BarChart3
    },
    {
      title: "Barber Statistics",
      description: "Individual barber performance metrics",
      icon: Users
    },
    {
      title: "Monthly Overview",
      description: "Complete monthly business summary",
      icon: PieChart
    }
  ];

  const quickActions = [
    { label: "Today's Receipts", icon: FileText },
    { label: "Weekly Summary", icon: Calendar },
    { label: "Export Data", icon: Download },
    { label: "Analytics Dashboard", icon: PieChart }
  ];

  return (
    <div className="space-y-6">
      {/* Date Range Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-date">To Date</Label>
              <Input
                id="to-date"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {report.description}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
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
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used report actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-20 flex-col space-y-2"
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
      <Card>
        <CardHeader>
          <CardTitle>Analytics Preview</CardTitle>
          <CardDescription>Quick insights into your business performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold mb-2">$0</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold mb-2">0</div>
              <div className="text-sm text-muted-foreground">Transactions</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold mb-2">0</div>
              <div className="text-sm text-muted-foreground">Customers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
