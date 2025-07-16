
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Users, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar } from '../ui/avatar';

interface Barber {
  id: string;
  name: string;
}

interface BarbersSectionProps {
  barbers: Barber[];
  onUpdateBarbers: (barbers: Barber[]) => void;
}

const BarbersSection: React.FC<BarbersSectionProps> = ({ barbers, onUpdateBarbers }) => {
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [newBarber, setNewBarber] = useState({ name: '' });

  const addBarber = () => {
    if (newBarber.name) {
      const barber: Barber = {
        id: Date.now().toString(),
        name: newBarber.name,
      };
      onUpdateBarbers([...barbers, barber]);
      setNewBarber({ name: '' });
    }
  };

  const updateBarber = (id: string, updatedBarber: Partial<Barber>) => {
    const updated = barbers.map(barber => 
      barber.id === id ? { ...barber, ...updatedBarber } : barber
    );
    onUpdateBarbers(updated);
    setEditingBarber(null);
  };

  const deleteBarber = (id: string) => {
    onUpdateBarbers(barbers.filter(barber => barber.id !== id));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Add Barber Card */}
      <Card className="bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5 border-blue-500/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span>Add New Barber</span>
          </CardTitle>
          <CardDescription>Add a new barber to your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="barber-name">Barber Name</Label>
              <Input
                id="barber-name"
                type="text"
                placeholder="e.g., Ahmed Hassan"
                value={newBarber.name}
                onChange={(e) => setNewBarber({ name: e.target.value })}
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addBarber}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Barber
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((barber, index) => (
          <Card 
            key={barber.id} 
            className="shadow-lg hover:shadow-xl border-border/50 transition-all duration-300 hover:scale-105 animate-fade-in group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {getInitials(barber.name)}
                </div>
                <div className="flex-1">
                  {editingBarber?.id === barber.id ? (
                    <Input
                      type="text"
                      value={editingBarber.name}
                      onChange={(e) => setEditingBarber({ ...editingBarber, name: e.target.value })}
                      className="font-medium"
                    />
                  ) : (
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {barber.name}
                    </h3>
                  )}
                  <p className="text-sm text-muted-foreground">Professional Barber</p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                {editingBarber?.id === barber.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateBarber(barber.id, editingBarber)}
                      className="flex-1 bg-green-500 hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingBarber(null)}
                      className="flex-1 hover:bg-muted transform hover:scale-105 transition-all duration-200"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingBarber(barber)}
                      className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transform hover:scale-105 transition-all duration-200"
                    >
                      <Edit2 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteBarber(barber.id)}
                      className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transform hover:scale-105 transition-all duration-200"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Team Summary</h3>
                <p className="text-sm text-muted-foreground">Total active barbers</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">{barbers.length}</div>
              <div className="text-sm text-muted-foreground">Active Barbers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarbersSection;
