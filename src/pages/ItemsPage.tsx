import React, { useState, useEffect } from 'react';
import { useItems } from '../context/ItemContext';
import ItemCard from '../components/items/ItemCard';
import { Item } from '../types';
import { categories } from '../utils/mockData';
import { Search, Filter, X } from 'lucide-react';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const ItemsPage: React.FC = () => {
  const { items, claimItem, loading } = useItems();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    let result = items;
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.description.toLowerCase().includes(lowerSearchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Apply status filter
    if (selectedStatus) {
      result = result.filter(item => item.status === selectedStatus);
    }
    
    setFilteredItems(result);
  }, [items, searchTerm, selectedCategory, selectedStatus]);

  const handleClaim = async (id: string) => {
    const success = await claimItem(id);
    if (success) {
      navigate(`/items/${id}`);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Lost & Found Items</h1>
              <p className="text-gray-600">Browse through items that have been reported found</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="primary"
                onClick={() => navigate('/report')}
              >
                Report a Found Item
              </Button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="md:flex md:items-center md:space-x-4">
              <div className="relative flex-grow mb-4 md:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, description, or tags"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 md:flex md:items-center gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="reported">Reported</option>
                  <option value="claimed">Claimed</option>
                  <option value="verified">Verified</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center mt-4 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500 mr-3 flex items-center">
                  <Filter size={14} className="mr-1" /> Active Filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <div className="flex items-center bg-blue-50 text-blue-700 text-sm rounded-full px-3 py-1">
                      Search: {searchTerm}
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="ml-1 p-0.5 rounded-full hover:bg-blue-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {selectedCategory && (
                    <div className="flex items-center bg-blue-50 text-blue-700 text-sm rounded-full px-3 py-1">
                      Category: {selectedCategory}
                      <button 
                        onClick={() => setSelectedCategory('')}
                        className="ml-1 p-0.5 rounded-full hover:bg-blue-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {selectedStatus && (
                    <div className="flex items-center bg-blue-50 text-blue-700 text-sm rounded-full px-3 py-1">
                      Status: {selectedStatus}
                      <button 
                        onClick={() => setSelectedStatus('')}
                        className="ml-1 p-0.5 rounded-full hover:bg-blue-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 ml-2"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading items...</p>
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <div className="mx-auto h-24 w-24 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No items found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                  <div className="mt-6">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <ItemCard 
                      key={item.id} 
                      item={item} 
                      onClaim={handleClaim}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemsPage;