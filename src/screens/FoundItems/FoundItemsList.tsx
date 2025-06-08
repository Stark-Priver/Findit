import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { SearchIcon } from "lucide-react";
import axios from 'axios';

interface FoundItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  dateFound: string;
  status: string;
  finder: {
    name: string;
    email: string;
  };
}

export const FoundItemsList = () => {
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items/found');
      setFoundItems(response.data);
    } catch (error) {
      console.error('Error fetching found items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = foundItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Found Items</h2>

        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search found items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1670d3]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <Card key={item._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-gray-600 text-sm mb-2">Location: {item.location}</p>
                <p className="text-gray-500 text-sm mb-2">Category: {item.category}</p>
                <p className="text-gray-500 text-sm mb-4">
                  Found on: {new Date(item.dateFound).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Link to={`/found-items/${item._id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  {item.status === 'available' && (
                    <Link to={`/claim-item/${item._id}`}>
                      <Button size="sm" className="bg-[#1670d3]">
                        Claim Item
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No found items match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};