export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'reported' | 'claimed' | 'verified' | 'returned';
  location: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  date: string;
  reportedBy: string;
  claimedBy?: string;
  images: string[];
  tags: string[];
  color?: string;
  brand?: string;
  model?: string;
  identifyingFeatures?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
  type: 'info' | 'success' | 'warning' | 'error';
  itemId?: string;
}