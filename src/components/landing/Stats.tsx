import React from 'react';
import { Users, Package, Map, CheckCircle } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      icon: <Package size={24} className="text-blue-600" />,
      number: "5,000+",
      label: "Items Returned"
    },
    {
      icon: <Users size={24} className="text-blue-600" />,
      number: "12,000+",
      label: "Happy Users"
    },
    {
      icon: <Map size={24} className="text-blue-600" />,
      number: "150+",
      label: "Cities Covered"
    },
    {
      icon: <CheckCircle size={24} className="text-blue-600" />,
      number: "95%",
      label: "Success Rate"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;