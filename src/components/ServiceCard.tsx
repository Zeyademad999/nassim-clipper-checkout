
import React from 'react';
import { Service } from '../pages/Index';
import LucideIcon from './LucideIcon';

interface ServiceCardProps {
  service: Service;
  onAdd: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAdd }) => {
  return (
    <div
      onClick={() => onAdd(service)}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:scale-95"
    >
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300">
          <LucideIcon name={service.icon} className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
          {service.name}
        </h3>
        <div className="text-2xl font-bold text-green-600 mb-3">
          ${service.price.toFixed(2)}
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
      <div className="px-6 pb-6">
        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform group-hover:shadow-lg">
          Add to Bill
        </button>
      </div>
    </div>
  );
};
