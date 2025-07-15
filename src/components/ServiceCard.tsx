
import React from 'react';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceCardProps {
  service: Service;
  onAdd: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAdd }) => {
  return (
    <div
      onClick={() => onAdd(service)}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-black transition-all duration-300 cursor-pointer transform hover:-translate-y-1 active:scale-95"
    >
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-gray-700 transition-colors">
          {service.name}
        </h3>
        <div className="text-2xl font-bold text-black mb-4">
          ${service.price.toFixed(2)}
        </div>
        <div className="w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
      <div className="px-6 pb-6">
        <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300">
          Add to Bill
        </button>
      </div>
    </div>
  );
};
