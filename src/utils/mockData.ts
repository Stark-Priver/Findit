import { User, Item, Notification } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Mock Items
export const items: Item[] = [
  {
    id: '1',
    title: 'Black Leather Wallet',
    description: 'Found a black leather wallet with some cash and ID cards.',
    category: 'Wallet',
    status: 'reported',
    location: {
      name: 'Sokoine Stadium, Mbeya',
      coordinates: {
        lat: -8.9110,
        lng: 33.4564,
      },
    },
    date: '2023-05-15T10:30:00',
    reportedBy: '2',
    images: [
      'https://images.pexels.com/photos/5737267/pexels-photo-5737267.jpeg?auto=compress&cs=tinysrgb&w=500',
    ],
    tags: ['wallet', 'leather', 'black'],
    brand: 'Gucci',
    identifyingFeatures: 'Monogram pattern on the outside',
  },
  {
    id: '2',
    title: 'iPhone 13 Pro',
    description: 'Found an iPhone 13 Pro with a blue case.',
    category: 'Electronics',
    status: 'claimed',
    location: {
      name: 'Mbeya Bus Terminal',
      coordinates: {
        lat: -8.9146,
        lng: 33.4463,
      },
    },
    date: '2023-05-14T15:45:00',
    reportedBy: '1',
    claimedBy: '2',
    images: [
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=500',
    ],
    tags: ['phone', 'iphone', 'electronics'],
    color: 'Sierra Blue',
    brand: 'Apple',
    model: 'iPhone 13 Pro',
  },
  {
    id: '3',
    title: 'House Keys',
    description: 'Found a set of house keys with a red keychain.',
    category: 'Keys',
    status: 'reported',
    location: {
      name: 'Forest Hill Mall, Mbeya',
      coordinates: {
        lat: -8.9196,
        lng: 33.4378,
      },
    },
    date: '2023-05-16T09:15:00',
    reportedBy: '2',
    images: [
      'https://images.pexels.com/photos/5615/key-lock-hole-metal-5615.jpg?auto=compress&cs=tinysrgb&w=500',
    ],
    tags: ['keys', 'keychain', 'red'],
  },
  {
    id: '4',
    title: 'Blue Backpack',
    description: 'Found a blue backpack with some books and a water bottle inside.',
    category: 'Bag',
    status: 'verified',
    location: {
      name: 'Mbeya University of Science and Technology',
      coordinates: {
        lat: -8.9393,
        lng: 33.4231,
      },
    },
    date: '2023-05-13T14:20:00',
    reportedBy: '1',
    claimedBy: '2',
    images: [
      'https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&w=500',
    ],
    tags: ['backpack', 'blue', 'bag'],
    color: 'Navy Blue',
    brand: 'North Face',
  },
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Item Claimed',
    message: 'Someone has claimed your reported iPhone 13 Pro.',
    read: false,
    date: '2023-05-15T11:30:00',
    type: 'info',
    itemId: '2',
  },
  {
    id: '2',
    userId: '2',
    title: 'Claim Verified',
    message: 'Your claim for the Blue Backpack has been verified.',
    read: true,
    date: '2023-05-14T16:45:00',
    type: 'success',
    itemId: '4',
  },
];

// Mock Categories
export const categories = [
  'Electronics', 
  'Wallet', 
  'Keys', 
  'Bag', 
  'Clothing', 
  'Jewelry', 
  'ID Card', 
  'Other'
];

// Function to simulate fetching data
export const fetchUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const fetchItemById = (id: string): Item | undefined => {
  return items.find(item => item.id === id);
};

export const fetchItemsByUser = (userId: string, type: 'reported' | 'claimed'): Item[] => {
  if (type === 'reported') {
    return items.filter(item => item.reportedBy === userId);
  } else {
    return items.filter(item => item.claimedBy === userId);
  }
};

export const fetchNotificationsByUser = (userId: string): Notification[] => {
  return notifications.filter(notification => notification.userId === userId);
};
