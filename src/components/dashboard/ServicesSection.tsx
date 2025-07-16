
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Tag } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Add Service Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="h-5 w-5" />
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
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addService} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>Services Management</CardTitle>
          <CardDescription>Manage your barbershop services and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {editingService?.id === service.id ? (
                      <Input
                        type="text"
                        value={editingService.name}
                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
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
                      <span className="font-semibold">${service.price.toFixed(2)}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingService?.id === service.id ? (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updateService(service.id, editingService)}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingService(null)}
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
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteService(service.id)}
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
