import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../types';
import { Calendar, MapPin, Tag } from 'lucide-react';
import Button from '../common/Button';

interface ItemCardProps {
  item: Item;
  onClaim?: (id: string) => void;
  showActions?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClaim, showActions = true }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const statusColors = {
    reported: 'bg-blue-100 text-blue-800',
    claimed: 'bg-yellow-100 text-yellow-800',
    verified: 'bg-green-100 text-green-800',
    returned: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <div className="h-48 overflow-hidden relative">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 mb-1">{item.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{item.location.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(item.date)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {showActions && (
          <div className="flex justify-between items-center mt-2">
            <Link to={`/items/${item.id}`}>
              <Button variant="text" size="sm">
                View Details
              </Button>
            </Link>
            {item.status === 'reported' && onClaim && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onClaim(item.id)}
              >
                Claim This
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;