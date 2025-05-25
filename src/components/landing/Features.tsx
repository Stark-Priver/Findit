import React from 'react';
import { Search, Map, Shield, Bell, UserCheck, Clock } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Search size={24} className="text-blue-600" />,
      title: 'Smart Search',
      description: 'Our advanced search algorithm helps you find your lost items quickly by matching descriptions, locations, and other details.'
    },
    {
      icon: <Map size={24} className="text-blue-600" />,
      title: 'Location Tracking',
      description: 'Precisely record where items were found or lost with our integrated map system to increase the chances of recovery.'
    },
    {
      icon: <Shield size={24} className="text-emerald-600" />,
      title: 'Secure Process',
      description: 'Our verification system ensures that items are returned to their rightful owners through a secure and trustworthy process.'
    },
    {
      icon: <Bell size={24} className="text-emerald-600" />,
      title: 'Instant Notifications',
      description: 'Receive real-time alerts when potential matches are found or when there are updates on your reported items.'
    },
    {
      icon: <UserCheck size={24} className="text-blue-600" />,
      title: 'Identity Verification',
      description: 'We ensure the security of the process by verifying the identity of both the finder and the claimer.'
    },
    {
      icon: <Clock size={24} className="text-emerald-600" />,
      title: 'Item History',
      description: 'Track the full timeline of your item from when it was reported to when it was claimed and returned.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FindIt?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform is designed to make the process of finding and claiming lost items as simple and secure as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="p-3 bg-gray-50 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;