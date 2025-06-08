import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

const claimSchema = z.object({
  purchaseDate: z.string().optional(),
  purchaseLocation: z.string().optional(),
  serialNumber: z.string().optional(),
  identifyingFeatures: z.string().min(10, 'Please provide at least 10 characters describing identifying features'),
  additionalDetails: z.string().optional(),
});

type ClaimFormData = z.infer<typeof claimSchema>;

export const ClaimItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema),
  });

  const onSubmit = async (data: ClaimFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post(`http://localhost:5000/api/items/claim/${id}`, {
        verificationDetails: data
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit claim');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Claim Item - Ownership Verification</h2>
        
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          <p className="font-semibold">Important:</p>
          <p>To claim this item, you must provide verification details that prove your ownership. 
             An admin will review your claim before approval.</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date (if applicable)
                </label>
                <input
                  {...register('purchaseDate')}
                  type="date"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1670d3]"
                />
                {errors.purchaseDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.purchaseDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Location (if applicable)
                </label>
                <input
                  {...register('purchaseLocation')}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1670d3]"
                  placeholder="e.g., Amazon, Local store, etc."
                />
                {errors.purchaseLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.purchaseLocation.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number / Model Number (if applicable)
                </label>
                <input
                  {...register('serialNumber')}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1670d3]"
                  placeholder="Enter serial or model number"
                />
                {errors.serialNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.serialNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identifying Features *
                </label>
                <textarea
                  {...register('identifyingFeatures')}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1670d3]"
                  placeholder="Describe unique features, scratches, stickers, contents, or any other identifying characteristics..."
                />
                {errors.identifyingFeatures && (
                  <p className="text-red-500 text-sm mt-1">{errors.identifyingFeatures.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <textarea
                  {...register('additionalDetails')}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1670d3]"
                  placeholder="Any other information that can help verify your ownership..."
                />
                {errors.additionalDetails && (
                  <p className="text-red-500 text-sm mt-1">{errors.additionalDetails.message}</p>
                )}
              </div>

              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <p className="text-sm">
                  Your claim will be reviewed by an administrator. You will be notified once a decision is made.
                  Please ensure all information provided is accurate.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#1670d3]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Claim...' : 'Submit Claim'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};