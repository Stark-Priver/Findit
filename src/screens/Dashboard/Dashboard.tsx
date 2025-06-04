import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Lost Items</h2>
            <p className="text-3xl font-bold text-[#1670d3]">
              {dashboardData.stats.lostItems}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Found Items</h2>
            <p className="text-3xl font-bold text-[#1670d3]">
              {dashboardData.stats.foundItems}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Lost Items</h2>
          {dashboardData.recentLostItems.map((item: any) => (
            <Card key={item._id} className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.location}</p>
                <p className="text-gray-500 text-sm">
                  Status: <span className="capitalize">{item.status}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Found Items</h2>
          {dashboardData.recentFoundItems.map((item: any) => (
            <Card key={item._id} className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.location}</p>
                <p className="text-gray-500 text-sm">
                  Status: <span className="capitalize">{item.status}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};