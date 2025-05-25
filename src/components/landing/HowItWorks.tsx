import React from 'react';
import { Camera, Search, UserCheck, Map, Package } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Camera size={32} className="text-white" />,
      iconBg: "bg-blue-600",
      title: "Report a Found Item",
      description: "Take photos and provide detailed information about the item you found, including location and date."
    },
    {
      icon: <Search size={32} className="text-white" />,
      iconBg: "bg-emerald-600",
      title: "Search for Lost Items",
      description: "Browse through reported items or create a listing about what you've lost to help others find you."
    },
    {
      icon: <UserCheck size={32} className="text-white" />,
      iconBg: "bg-blue-600",
      title: "Verify Ownership",
      description: "Provide proof of ownership through specific details or documentation to claim your item."
    },
    {
      icon: <Package size={32} className="text-white" />,
      iconBg: "bg-emerald-600",
      title: "Retrieve Your Item",
      description: "Arrange a safe meeting or delivery to get your item back once ownership is verified."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes it easy to report found items and reconnect with your lost belongings.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-0.5 bg-gray-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                <div className={`${step.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10`}>
                  {step.icon}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-30 blur-lg"></div>
                </div>
                <div className="bg-white px-4 py-2 relative z-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Step number */}
                <div className="absolute top-0 right-0 md:relative md:-top-4 md:-right-4 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 font-semibold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-20 bg-gray-50 rounded-xl p-8 lg:p-12">
          <div className="lg:flex items-center">
            <div className="lg:w-1/3 mb-6 lg:mb-0">
              <div className="aspect-w-3 aspect-h-4 relative">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-400 to-emerald-400 opacity-20 blur-lg"></div>
                <img 
                  src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Happy customer" 
                  className="rounded-lg object-cover w-full h-64 lg:h-auto relative"
                />
              </div>
            </div>
            <div className="lg:w-2/3 lg:pl-12">
              <svg className="h-12 w-12 text-blue-500 mb-6" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-xl text-gray-600 mb-6">
                I thought I'd never see my laptop again after leaving it on the subway. Thanks to FindIt, someone reported finding it and I got it back within 48 hours. The verification process made me feel secure throughout.
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-500 text-sm">New York, NY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;