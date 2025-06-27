import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import axios from "axios";

interface LostItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  dateLost: string;
  status?: string;
  images?: string[];
  reporter?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export const LostItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<LostItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/lost/${id}`);
      setItem(response.data);
    } catch (error) {
      setItem(null);
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
          <h2 className="text-2xl font-bold mb-4">Lost Item Not Found</h2>
          <Link to="/">
            <Button className="bg-[#1670d3]">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="text-[#1670d3] hover:underline mb-6 block">
          ← Back to Home
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
                <h3 className="font-semibold text-gray-700">Last Seen Location</h3>
                <p className="text-gray-600">{item.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Date Lost</h3>
                <p className="text-gray-600">{new Date(item.dateLost).toLocaleDateString()}</p>
              </div>
              {item.reporter && (
                <div>
                  <h3 className="font-semibold text-gray-700">Reported By</h3>
                  <p className="text-gray-600">{item.reporter.name}</p>
                  <p className="text-gray-600">Email: {item.reporter.email}</p>
                  <p className="text-gray-600">Phone: {item.reporter.phone}</p>
                </div>
              )}
              <div>
                <Button className="w-full bg-[#1670d3]">
                  I Found This Item
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
