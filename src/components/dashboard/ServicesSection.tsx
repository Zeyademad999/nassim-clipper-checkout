
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, DollarSign, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServicesSectionProps {
  services: Service[];
  onUpdateServices: (services: Service[]) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onUpdateServices }) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({ name: '', price: 0 });

  const addService = () => {
    if (newService.name && newService.price > 0) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        price: newService.price,
      };
      onUpdateServices([...services, service]);
      setNewService({ name: '', price: 0 });
    }
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    const updated = services.map(service => 
      service.id === id ? { ...service, ...updatedService } : service
    );
    onUpdateServices(updated);
    setEditingService(null);
  };

  const deleteService = (id: string) => {
    onUpdateServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Add Service Card */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-primary" />
            <span>Add New Service</span>
          </CardTitle>
          <CardDescription>Create a new service for your barbershop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                type="text"
                placeholder="e.g., Hair Cut"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-price">Price ($)</Label>
              <Input
                id="service-price"
                type="number"
                placeholder="25.00"
                value={newService.price || ''}
                onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addService}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card className="shadow-xl border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span>Services Management</span>
          </CardTitle>
          <CardDescription>Manage your barbershop services and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50">
                <TableHead className="font-semibold">Service Name</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, index) => (
                <TableRow 
                  key={service.id} 
                  className="hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    {editingService?.id === service.id ? (
                      <Input
                        type="text"
                        value={editingService.name}
                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                        className="min-w-0"
                      />
                    ) : (
                      <span className="font-medium">{service.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingService?.id === service.id ? (
                      <div className="flex items-center space-x-1">
                        <span className="text-muted-foreground">$</span>
                        <Input
                          type="number"
                          value={editingService.price}
                          onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) })}
                          className="w-20"
                        />
                      </div>
                    ) : (
                      <span className="font-semibold text-green-600">${service.price.toFixed(2)}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingService?.id === service.id ? (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updateService(service.id, editingService)}
                          className="bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingService(null)}
                          className="hover:bg-muted transform hover:scale-105 transition-all duration-200"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingService(service)}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transform hover:scale-105 transition-all duration-200"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteService(service.id)}
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transform hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesSection;
