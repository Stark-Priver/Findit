import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItems } from '../context/ItemContext';
import { useAuth } from '../context/AuthContext';
import ItemDetailCard from '../components/items/ItemDetailCard';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItemById, claimItem } = useItems();
  const { isAuthenticated } = useAuth();
  const [item, setItem] = useState(id ? getItemById(id) : undefined);
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundItem = getItemById(id);
      setItem(foundItem);
      
      // If item doesn't exist, redirect to items page
      if (!foundItem) {
        navigate('/items');
      }
    }
  }, [id, getItemById, navigate]);

  const handleClaim = async () => {
    if (!id || !isAuthenticated) return;
    
    setLoading(true);
    try {
      const success = await claimItem(id);
      if (success) {
        setClaimSubmitted(true);
        // Refresh item data
        setItem(getItemById(id));
      }
    } catch (error) {
      console.error('Error claiming item:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading item details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="text"
              onClick={() => navigate('/items')}
              icon={<ArrowLeft size={16} />}
            >
              Back to all items
            </Button>
          </div>

          <ItemDetailCard item={item} onClaim={handleClaim} />

          {claimSubmitted && (
            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-green-800 text-lg mb-2">Claim Submitted Successfully</h3>
              <p className="text-green-700">
                Your claim has been submitted. The person who reported this item will be notified, and you'll receive
                further instructions on how to verify ownership and arrange the return.
              </p>
            </div>
          )}

          {/* Similar items section could be added here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetailPage;