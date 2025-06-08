import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
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
    phone: string;
  };
  images: string[];
}

export const FoundItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<FoundItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/found/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
          <Link to="/found-items">
            <Button className="bg-[#1670d3]">Back to Found Items</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/found-items" className="text-[#1670d3] hover:underline mb-6 block">
          ← Back to Found Items
        </Link>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            
            {item.images && item.images.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${item.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Description</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Category</h3>
                <p className="text-gray-600 capitalize">{item.category}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Location Found</h3>
                <p className="text-gray-600">{item.location}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Date Found</h3>
                <p className="text-gray-600">{new Date(item.dateFound).toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Found By</h3>
                <p className="text-gray-600">{item.finder.name}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Contact Information</h3>
                <p className="text-gray-600">Email: {item.finder.email}</p>
                <p className="text-gray-600">Phone: {item.finder.phone}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Status</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  item.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </div>

              {item.status === 'available' && (
                <Link to={`/claim-item/${item._id}`}>
                  <Button className="w-full bg-[#1670d3]">
                    Claim This Item
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};