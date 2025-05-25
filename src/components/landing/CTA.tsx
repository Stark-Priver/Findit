import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBhNiA2IDAgMTAtMTIgMCA2IDYgMCAwMDEyIDB6TTI0IDQ4YTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6TTQ4IDQ4YTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6TTEyIDMwYTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6TTQ4IDEyYTYgNiAwIDEwMC0xMiA2IDYgMCAwMDAgMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to find your lost belongings?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              Join thousands of people who've successfully recovered their lost items through our platform. It's quick, easy, and secure.
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end space-x-4">
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/items">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
              >
                Browse Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;