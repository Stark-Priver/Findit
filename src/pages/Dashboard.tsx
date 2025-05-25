import React from 'react';
import { useItems } from '../context/ItemContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import ItemCard from '../components/items/ItemCard';
import Button from '../components/common/Button';
import { Package, Bell, PlusCircle, Search, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { userItems, loading } = useItems();
  const { notifications, unreadCount } = useNotifications();

  const recentReportedItems = userItems.reported.slice(0, 3);
  const recentClaimedItems = userItems.claimed.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-64 flex-shrink-0 mb-6 md:mb-0">
              <DashboardSidebar />
            </div>
            <div className="flex-grow md:ml-8">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600 mb-6">
                  Here's an overview of your lost and found activities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                      <Package size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Reported Items</p>
                      <p className="text-2xl font-bold text-gray-900">{userItems.reported.length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-lg p-4 flex items-center">
                    <div className="p-3 bg-emerald-100 rounded-full mr-4">
                      <Search size={24} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700">Claimed Items</p>
                      <p className="text-2xl font-bold text-gray-900">{userItems.claimed.length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 flex items-center">
                    <div className="p-3 bg-amber-100 rounded-full mr-4">
                      <Bell size={24} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-amber-700">Unread Notifications</p>
                      <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Reported Items */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recently Reported Items</h2>
                  <Link to="/dashboard/reports" className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                    View all <ChevronRight size={16} />
                  </Link>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading items...</p>
                  </div>
                ) : (
                  <>
                    {recentReportedItems.length === 0 ? (
                      <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
                        <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                          <Package size={64} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No reported items yet</h3>
                        <p className="text-gray-500 mb-4">When you report a found item, it will appear here.</p>
                        <Link to="/report">
                          <Button
                            variant="primary"
                            icon={<PlusCircle size={16} />}
                          >
                            Report a Found Item
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentReportedItems.map((item) => (
                          <ItemCard key={item.id} item={item} showActions={false} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Recent Claimed Items */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recently Claimed Items</h2>
                  <Link to="/dashboard/claims" className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                    View all <ChevronRight size={16} />
                  </Link>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading items...</p>
                  </div>
                ) : (
                  <>
                    {recentClaimedItems.length === 0 ? (
                      <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
                        <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                          <Search size={64} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No claimed items yet</h3>
                        <p className="text-gray-500 mb-4">Items you claim will appear here.</p>
                        <Link to="/items">
                          <Button
                            variant="primary"
                            icon={<Search size={16} />}
                          >
                            Browse Lost & Found
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentClaimedItems.map((item) => (
                          <ItemCard key={item.id} item={item} showActions={false} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Recent Notifications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recent Notifications</h2>
                  <Link to="/dashboard/notifications" className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                    View all <ChevronRight size={16} />
                  </Link>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading notifications...</p>
                  </div>
                ) : (
                  <>
                    {recentNotifications.length === 0 ? (
                      <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-200">
                        <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                          <Bell size={64} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications yet</h3>
                        <p className="text-gray-500">
                          When there are updates about your items, you'll see notifications here.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
                        {recentNotifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start">
                              <div className={`p-2 rounded-full mr-3 
                                ${notification.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                                ${notification.type === 'success' ? 'bg-green-100 text-green-600' : ''}
                                ${notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
                                ${notification.type === 'error' ? 'bg-red-100 text-red-600' : ''}
                              `}>
                                <Bell size={16} />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(notification.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;