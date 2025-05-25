import React from 'react';
import { Item } from '../../types';
import { Calendar, MapPin, Tag, Info, User, Package } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { fetchUserById } from '../../utils/mockData';

interface ItemDetailCardProps {
  item: Item;
  onClaim: () => void;
}

const ItemDetailCard: React.FC<ItemDetailCardProps> = ({ item, onClaim }) => {
  const { user, isAuthenticated } = useAuth();
  const reporter = fetchUserById(item.reportedBy);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const statusColors = {
    reported: 'bg-blue-100 text-blue-800',
    claimed: 'bg-yellow-100 text-yellow-800',
    verified: 'bg-green-100 text-green-800',
    returned: 'bg-purple-100 text-purple-800',
  };

  const canClaim = isAuthenticated && 
                  item.status === 'reported' && 
                  user?.id !== item.reportedBy;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-72 md:h-full">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar size={16} className="mr-2 text-blue-500" />
            <span>Found on {formatDate(item.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin size={16} className="mr-2 text-blue-500" />
            <span>{item.location.name}</span>
          </div>
          
          <div className="flex items-start text-sm text-gray-600 mb-4">
            <User size={16} className="mr-2 mt-1 text-blue-500" />
            <div>
              <span>Reported by {reporter?.name}</span>
              {reporter?.avatar && (
                <img 
                  src={reporter.avatar} 
                  alt={reporter.name}
                  className="w-6 h-6 rounded-full inline-block ml-2"
                />
              )}
            </div>
          </div>
          
          <div className="flex items-start text-sm text-gray-600 mb-4">
            <Package size={16} className="mr-2 mt-1 text-blue-500" />
            <span>Category: {item.category}</span>
          </div>
          
          <h3 className="font-medium text-gray-900 mt-6 mb-2">Description</h3>
          <p className="text-gray-700 mb-4">{item.description}</p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {(item.brand || item.color || item.model || item.identifyingFeatures) && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Additional Details</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {item.brand && (
                  <div className="flex items-start">
                    <Info size={14} className="mr-2 mt-1 text-gray-500" />
                    <span><strong>Brand:</strong> {item.brand}</span>
                  </div>
                )}
                {item.color && (
                  <div className="flex items-start">
                    <Info size={14} className="mr-2 mt-1 text-gray-500" />
                    <span><strong>Color:</strong> {item.color}</span>
                  </div>
                )}
                {item.model && (
                  <div className="flex items-start">
                    <Info size={14} className="mr-2 mt-1 text-gray-500" />
                    <span><strong>Model:</strong> {item.model}</span>
                  </div>
                )}
                {item.identifyingFeatures && (
                  <div className="flex items-start">
                    <Info size={14} className="mr-2 mt-1 text-gray-500" />
                    <span><strong>Identifying Features:</strong> {item.identifyingFeatures}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {canClaim && (
            <div className="mt-6">
              <Button variant="primary" size="lg" onClick={onClaim}>
                Claim This Item
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                By claiming this item, you'll need to provide proof of ownership.
              </p>
            </div>
          )}
          
          {!isAuthenticated && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                You need to sign in to claim this item.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailCard;