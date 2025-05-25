import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileCheck, 
  UserCog, 
  Bell, 
  History,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <Package size={20} />,
      label: 'My Reports',
      path: '/dashboard/reports',
    },
    {
      icon: <FileCheck size={20} />,
      label: 'My Claims',
      path: '/dashboard/claims',
    },
    {
      icon: <Bell size={20} />,
      label: 'Notifications',
      path: '/dashboard/notifications',
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      icon: <History size={20} />,
      label: 'Activity History',
      path: '/dashboard/history',
    },
    {
      icon: <UserCog size={20} />,
      label: 'Account Settings',
      path: '/dashboard/settings',
    },
    {
      icon: <HelpCircle size={20} />,
      label: 'Help & Support',
      path: '/dashboard/support',
    },
  ];

  return (
    <div className="h-full bg-white shadow-sm border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              {user?.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(item.path) 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <div className="flex items-center">
                <span className={`mr-3 ${isActive(item.path) ? 'text-blue-500' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;