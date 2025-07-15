
import React from 'react';
import { BillItem } from '../pages/Index';
import { Plus, Minus, Trash2, ShoppingCart, CreditCard, X } from 'lucide-react';

interface BillSummaryProps {
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveService: (id: string) => void;
  onCheckout: () => void;
  onClear: () => void;
  customerName: string;
  barberName: string;
}

export const BillSummary: React.FC<BillSummaryProps> = ({
  items,
  subtotal,
  tax,
  total,
  onUpdateQuantity,
  onRemoveService,
  onCheckout,
  onClear,
  customerName,
  barberName,
}) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6" />
            <h2 className="text-xl font-bold">Current Bill</h2>
          </div>
          {items.length > 0 && (
            <button
              onClick={onClear}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Clear all items"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        {(customerName || barberName) && (
          <div className="mt-3 text-sm text-blue-100 space-y-1">
            {customerName && <p>Customer: {customerName}</p>}
            {barberName && <p>Barber: {barberName}</p>}
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No services added</p>
            <p className="text-slate-400 text-sm mt-2">Tap on service cards to add them</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{item.name}</h4>
                    <p className="text-green-600 font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => onRemoveService(item.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {items.length > 0 && (
        <div className="border-t border-slate-200 p-6 bg-white">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-800 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <CreditCard className="h-5 w-5" />
            <span>Checkout - ${total.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
};
