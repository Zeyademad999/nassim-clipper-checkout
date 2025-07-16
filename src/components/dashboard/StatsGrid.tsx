
import React from 'react';
import { DollarSign, Users, TrendingUp, Calendar, Star, Clock } from 'lucide-react';
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
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      change: "+0%",
      trend: "up"
    },
    {
      title: "Total Services",
      value: services.length.toString(),
      icon: Star,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
      change: `${services.length} active`,
      trend: "up"
    },
    {
      title: "Active Barbers",
      value: barbers.length.toString(),
      icon: Users,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
      change: `${barbers.length} available`,
      trend: "up"
    },
    {
      title: "This Month",
      value: "0",
      icon: Calendar,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
      change: "No data yet",
      trend: "neutral"
    },
    {
      title: "Avg. Service Time",
      value: "30min",
      icon: Clock,
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-500/10",
      change: "Estimated",
      trend: "neutral"
    },
    {
      title: "Customer Rating",
      value: "5.0",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-500/10",
      change: "Excellent",
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.title}
            className={`relative overflow-hidden border-border/50 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/80 group animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${stat.bgColor} text-${stat.color.split('-')[1]}-600 font-medium`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;
