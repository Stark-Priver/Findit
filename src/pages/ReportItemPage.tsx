import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../context/ItemContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../utils/mockData';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Camera, MapPin, Plus, Trash2, Info } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  category: string;
  location: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  tags: string[];
  color?: string;
  brand?: string;
  model?: string;
  identifyingFeatures?: string;
}

const ReportItemPage: React.FC = () => {
  const { reportItem } = useItems();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const initialFormData: FormData = {
    title: '',
    description: '',
    category: '',
    location: {
      name: '',
    },
    images: [],
    tags: [],
    color: '',
    brand: '',
    model: '',
    identifyingFeatures: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentTag, setCurrentTag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // For demo purposes only - simulates image upload
  const demoImages = [
    'https://images.pexels.com/photos/5737267/pexels-photo-5737267.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/5615/key-lock-hole-metal-5615.jpg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&w=500',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormData],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleAddImage = () => {
    // In a real app, this would open a file picker and upload the image
    // For demo purposes, we'll add a random image from our demo list
    const unusedImages = demoImages.filter(img => !formData.images.includes(img));
    
    if (unusedImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * unusedImages.length);
      const randomImage = unusedImages[randomIndex];
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, randomImage],
      }));
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/report' } });
      return;
    }
    
    // Validate form
    if (!formData.title.trim()) {
      setError('Please provide a title for the item');
      return;
    }
    
    if (!formData.category) {
      setError('Please select a category');
      return;
    }
    
    if (!formData.location.name.trim()) {
      setError('Please provide the location where the item was found');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const newItem = await reportItem(formData);
      navigate(`/items/${newItem.id}`);
    } catch (err) {
      setError('An error occurred while submitting your report');
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow bg-gray-50 pt-24 pb-16 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-blue-600 mb-4">
              <Info size={48} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in required</h2>
            <p className="text-gray-600 mb-6">
              You need to sign in to report a found item. This helps us keep track of who reported what.
            </p>
            <div className="flex space-x-4 justify-center">
              <Button
                variant="primary"
                onClick={() => navigate('/login', { state: { from: '/report' } })}
              >
                Sign in
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/register')}
              >
                Create account
              </Button>
            </div>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Report a Found Item</h1>
            <p className="text-gray-600">
              Please provide as much detail as possible to help the owner identify their lost item.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="Item Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Black Leather Wallet"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="px-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Input
                      label="Location Found"
                      name="location.name"
                      value={formData.location.name}
                      onChange={handleChange}
                      placeholder="e.g., Central Park, New York"
                      icon={<MapPin size={18} />}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Provide a detailed description of the item..."
                      className="px-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Images
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Item preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {formData.images.length < 4 && (
                        <button
                          type="button"
                          onClick={handleAddImage}
                          className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                        >
                          <Camera size={24} className="mb-1" />
                          <span className="text-sm">Add Image</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Add up to 4 images of the item. Clear photos help the owner identify their belongings.
                    </p>
                  </div>

                  {/* Tags Section */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="e.g., leather, black, branded"
                        className="px-4 py-2.5 flex-grow rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1.5 text-blue-500 hover:text-blue-700"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Details (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Brand"
                        name="brand"
                        value={formData.brand || ''}
                        onChange={handleChange}
                        placeholder="e.g., Apple, Nike, Sony"
                      />
                      <Input
                        label="Color"
                        name="color"
                        value={formData.color || ''}
                        onChange={handleChange}
                        placeholder="e.g., Black, Red, Blue"
                      />
                      <Input
                        label="Model"
                        name="model"
                        value={formData.model || ''}
                        onChange={handleChange}
                        placeholder="e.g., iPhone 13, Air Force 1"
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Identifying Features"
                          name="identifyingFeatures"
                          value={formData.identifyingFeatures || ''}
                          onChange={handleChange}
                          placeholder="e.g., Scratches on the back, engraving, special marks"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submitting}
                    className="w-full md:w-auto"
                  >
                    {submitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportItemPage;