import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface DashboardData {
  user: any;
  stats: {
    lostItems: number;
    foundItems: number;
    claimsSubmitted: number;
    claimsApproved: number;
  };
  recentLostItems: any[];
  recentFoundItems: any[];
  recentClaims: any[];
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!dashboardData) {
    return <div className="container mx-auto px-4 py-8">Error loading dashboard</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        {user?.role === 'admin' && (
          <Link to="/admin">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Admin Panel
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Lost Items Reported</h2>
            <p className="text-3xl font-bold text-[#1670d3]">
              {dashboardData.stats.lostItems}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Found Items Reported</h2>
            <p className="text-3xl font-bold text-[#1670d3]">
              {dashboardData.stats.foundItems}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Claims Submitted</h2>
            <p className="text-3xl font-bold text-[#1670d3]">
              {dashboardData.stats.claimsSubmitted}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Claims Approved</h2>
            <p className="text-3xl font-bold text-green-600">
              {dashboardData.stats.claimsApproved}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Lost Items</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.recentLostItems.length === 0 ? (
                <p className="text-gray-500">No lost items reported</p>
              ) : (
                dashboardData.recentLostItems.map((item: any) => (
                  <Card key={item._id} className="mb-4">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.location}</p>
                      <p className="text-gray-500 text-sm">
                        Status: <span className="capitalize">{item.status}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Found Items</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.recentFoundItems.length === 0 ? (
                <p className="text-gray-500">No found items reported</p>
              ) : (
                dashboardData.recentFoundItems.map((item: any) => (
                  <Card key={item._id} className="mb-4">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.location}</p>
                      <p className="text-gray-500 text-sm">
                        Status: <span className="capitalize">{item.status}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.recentClaims?.length === 0 ? (
                <p className="text-gray-500">No claims submitted</p>
              ) : (
                dashboardData.recentClaims?.map((claim: any) => (
                  <Card key={claim._id} className="mb-4">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{claim.item?.title}</h3>
                      <p className="text-gray-600 text-sm">
                        Submitted: {new Date(claim.createdAt).toLocaleDateString()}
                      </p>
                      <span className={`px-2 py-1 rounded text-sm ${
                        claim.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : claim.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {claim.status}
                      </span>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link to="/report-lost-item">
          <Button className="bg-[#1670d3]">Report Lost Item</Button>
        </Link>
        <Link to="/report-found-item">
          <Button className="bg-green-600 hover:bg-green-700">Report Found Item</Button>
        </Link>
        <Link to="/found-items">
          <Button variant="outline">Browse Found Items</Button>
        </Link>
      </div>
    </div>
  );
};