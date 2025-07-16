
import React from 'react';
import { DollarSign, Users, Star, Calendar, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface Barber {
  id: string;
  name: string;
}

interface StatsGridProps {
  services: Service[];
  barbers: Barber[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ services, barbers }) => {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$0.00",
      icon: DollarSign
    },
    {
      title: "Total Services",
      value: services.length.toString(),
      icon: Star
    },
    {
      title: "Active Barbers",
      value: barbers.length.toString(),
      icon: Users
    },
    {
      title: "This Month",
      value: "0",
      icon: Calendar
    },
    {
      title: "Avg. Service Time",
      value: "30min",
      icon: Clock
    },
    {
      title: "Customer Rating",
      value: "5.0",
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;
