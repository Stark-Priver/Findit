import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';

interface ClaimRequest {
  _id: string;
  item: {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
  };
  claimant: {
    _id: string;
    name: string;
    email: string;
  };
  verificationDetails: {
    purchaseDate?: string;
    purchaseLocation?: string;
    serialNumber?: string;
    additionalDetails?: string;
    identifyingFeatures?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [claimRequests, setClaimRequests] = useState<ClaimRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaimRequests();
  }, []);

  const fetchClaimRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/claim-requests');
      setClaimRequests(response.data);
    } catch (error) {
      console.error('Error fetching claim requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimAction = async (claimId: string, action: 'approve' | 'reject') => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/claim-requests/${claimId}`, {
        status: action === 'approve' ? 'approved' : 'rejected'
      });
      fetchClaimRequests();
    } catch (error) {
      console.error('Error updating claim request:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Claim Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {claimRequests.filter(req => req.status === 'pending').length === 0 ? (
              <p className="text-gray-500">No pending claim requests</p>
            ) : (
              <div className="space-y-4">
                {claimRequests
                  .filter(req => req.status === 'pending')
                  .map((request) => (
                    <Card key={request._id} className="border-l-4 border-l-yellow-500">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{request.item.title}</h3>
                            <p className="text-gray-600 mb-2">{request.item.description}</p>
                            <p className="text-sm text-gray-500">
                              Category: {request.item.category}
                            </p>
                            <p className="text-sm text-gray-500">
                              Location: {request.item.location}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Claimant Information</h4>
                            <p className="text-sm">Name: {request.claimant.name}</p>
                            <p className="text-sm">Email: {request.claimant.email}</p>

                            <h4 className="font-semibold mt-4 mb-2">Verification Details</h4>
                            {request.verificationDetails.purchaseDate && (
                              <p className="text-sm">Purchase Date: {request.verificationDetails.purchaseDate}</p>
                            )}
                            {request.verificationDetails.purchaseLocation && (
                              <p className="text-sm">Purchase Location: {request.verificationDetails.purchaseLocation}</p>
                            )}
                            {request.verificationDetails.serialNumber && (
                              <p className="text-sm">Serial Number: {request.verificationDetails.serialNumber}</p>
                            )}
                            {request.verificationDetails.identifyingFeatures && (
                              <p className="text-sm">Identifying Features: {request.verificationDetails.identifyingFeatures}</p>
                            )}
                            {request.verificationDetails.additionalDetails && (
                              <p className="text-sm">Additional Details: {request.verificationDetails.additionalDetails}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleClaimAction(request._id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleClaimAction(request._id, 'reject')}
                            variant="destructive"
                          >
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Claim Decisions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {claimRequests
                .filter(req => req.status !== 'pending')
                .slice(0, 10)
                .map((request) => (
                  <div key={request._id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <span className="font-medium">{request.item.title}</span>
                      <span className="text-gray-500 ml-2">- {request.claimant.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      request.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};