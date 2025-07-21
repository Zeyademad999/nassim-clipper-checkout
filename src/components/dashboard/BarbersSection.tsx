
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Users, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const BarbersSection = ({ barbers, onUpdateBarbers }) => {
  const [editingBarber, setEditingBarber] = useState(null);
  const [newBarber, setNewBarber] = useState({ name: '' });

  const addBarber = () => {
    if (newBarber.name) {
      const barber = {
        id: Date.now().toString(),
        name: newBarber.name,
      };
      onUpdateBarbers([...barbers, barber]);
      setNewBarber({ name: '' });
    }
  };

  const updateBarber = (id, updatedBarber) => {
    const updated = barbers.map((barber) =>
      barber.id === id ? { ...barber, ...updatedBarber } : barber
    );
    onUpdateBarbers(updated);
    setEditingBarber(null);
  };

  const deleteBarber = (id) => {
    onUpdateBarbers(barbers.filter((barber) => barber.id !== id));
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Add Barber Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
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
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addBarber}>
                <Plus className="h-4 w-4 mr-2" />
                Add Barber
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbers.map((barber) => (
          <Card key={barber.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-semibold">
                  {getInitials(barber.name)}
                </div>
                <div className="flex-1">
                  {editingBarber?.id === barber.id ? (
                    <Input
                      type="text"
                      value={editingBarber.name}
                      onChange={(e) =>
                        setEditingBarber({
                          ...editingBarber,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <div>
                      <h3 className="font-semibold">{barber.name}</h3>
                      <p className="text-sm text-muted-foreground">Professional Barber</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {editingBarber?.id === barber.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateBarber(barber.id, editingBarber)}
                      className="flex-1"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingBarber(null)}
                      className="flex-1"
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
                      className="flex-1"
                    >
                      <Edit2 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteBarber(barber.id)}
                      className="flex-1"
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
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Team Summary</h3>
                <p className="text-sm text-muted-foreground">Total active barbers</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{barbers.length}</div>
              <div className="text-sm text-muted-foreground">Active Barbers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarbersSection;
