import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, Shield } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBhNiA2IDAgMTAtMTIgMCA2IDYgMCAwMDEyIDB6TTI0IDQ4YTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6TTQ4IDQ4YTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6TTEyIDMwYTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6TTQ4IDEyYTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="md:flex items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Reunite with Your <span className="text-blue-200">Lost Items</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-lg">
              Our platform connects people who've lost items with those who've found them. Simple, secure, and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/items">
                <Button 
                  variant="secondary" 
                  size="lg"
                  icon={<Search size={20} />}
                >
                  Find Lost Items
                </Button>
              </Link>
              <Link to="/report">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
                >
                  Report Found Item
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <Shield size={20} className="text-blue-200" />
                </div>
                <span className="text-blue-100">Secure Process</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <Map size={20} className="text-blue-200" />
                </div>
                <span className="text-blue-100">Location Tracking</span>
              </div>
              <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <Search size={20} className="text-blue-200" />
                </div>
                <span className="text-blue-100">Smart Search</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400 to-emerald-400 opacity-30 blur-lg"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Lost and Found Items" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="mb-2 flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white text-sm">
                    "I lost my wallet in Central Park and someone found it through FindIt! All my cards and cash were intact."
                  </p>
                  <div className="mt-3 flex items-center">
                    <img 
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150" 
                      alt="User" 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-white text-sm font-medium">John D.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;