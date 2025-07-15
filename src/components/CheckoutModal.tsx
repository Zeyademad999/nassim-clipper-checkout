
import React from 'react';
import { X, Download, FileText, FileSpreadsheet } from 'lucide-react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutModalProps {
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerName: string;
  barberName: string;
  serviceDate: string;
  onClose: () => void;
  onComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  subtotal,
  tax,
  total,
  customerName,
  barberName,
  serviceDate,
  onClose,
  onComplete,
}) => {
  const currentDate = new Date();
  const receiptNumber = `NB-${Date.now()}`;

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Nassim Select Barber', 20, 30);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Receipt', 20, 45);
    doc.text(`Receipt #: ${receiptNumber}`, 20, 55);
    doc.text(`Date: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`, 20, 65);
    doc.text(`Service Date: ${serviceDate}`, 20, 75);
    
    let yPos = 85;
    if (customerName) {
      doc.text(`Customer: ${customerName}`, 20, yPos);
      yPos += 10;
    }
    if (barberName) {
      doc.text(`Barber: ${barberName}`, 20, yPos);
      yPos += 10;
    }
    
    // Services
    yPos += 10;
    doc.setFont(undefined, 'bold');
    doc.text('Services:', 20, yPos);
    
    yPos += 10;
    doc.setFont(undefined, 'normal');
    
    items.forEach((item) => {
      doc.text(`${item.name} x${item.quantity}`, 20, yPos);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 150, yPos);
      yPos += 10;
    });
    
    // Totals
    yPos += 10;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, yPos);
    yPos += 10;
    doc.text(`Tax (8%): $${tax.toFixed(2)}`, 20, yPos);
    yPos += 10;
    doc.setFont(undefined, 'bold');
    doc.text(`Total: $${total.toFixed(2)}`, 20, yPos);
    
    doc.save(`receipt-${receiptNumber}.pdf`);
  };

  const exportToExcel = () => {
    const worksheetData = [
      ['Nassim Select Barber - Receipt'],
      [''],
      [`Receipt #: ${receiptNumber}`],
      [`Date: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`],
      [`Service Date: ${serviceDate}`],
      ...(customerName ? [[`Customer: ${customerName}`]] : []),
      ...(barberName ? [[`Barber: ${barberName}`]] : []),
      [''],
      ['Service', 'Quantity', 'Unit Price', 'Total'],
      ...items.map(item => [
        item.name,
        item.quantity,
        item.price,
        item.price * item.quantity
      ]),
      [''],
      ['Subtotal', '', '', subtotal],
      ['Tax (8%)', '', '', tax],
      ['Total', '', '', total]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Receipt');
    
    XLSX.writeFile(workbook, `receipt-${receiptNumber}.xlsx`);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-black text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Checkout Complete!</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Receipt Details */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Receipt #{receiptNumber}</h3>
            <p className="text-gray-600">{currentDate.toLocaleDateString()} at {currentDate.toLocaleTimeString()}</p>
            <p className="text-gray-600">Service Date: {serviceDate}</p>
          </div>

          {(customerName || barberName) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              {customerName && <p className="text-black"><strong>Customer:</strong> {customerName}</p>}
              {barberName && <p className="text-black"><strong>Barber:</strong> {barberName}</p>}
            </div>
          )}

          {/* Services List */}
          <div className="mb-6">
            <h4 className="font-semibold text-black mb-3">Services</h4>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-black pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={exportToPDF}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Download PDF Receipt</span>
            </button>
            <button
              onClick={exportToExcel}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="h-5 w-5" />
              <span>Download Excel Receipt</span>
            </button>
          </div>

          {/* Complete Button */}
          <button
            onClick={handleComplete}
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg transition-colors"
          >
            Complete & Start New Bill
          </button>
        </div>
      </div>
    </div>
  );
};
