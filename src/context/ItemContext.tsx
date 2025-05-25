import React, { createContext, useState, useContext, useEffect } from 'react';
import { Item } from '../types';
import { items as mockItems, fetchItemsByUser } from '../utils/mockData';
import { useAuth } from './AuthContext';

interface ItemContextType {
  items: Item[];
  userItems: {
    reported: Item[];
    claimed: Item[];
  };
  getItemById: (id: string) => Item | undefined;
  reportItem: (item: Omit<Item, 'id' | 'reportedBy' | 'date' | 'status'>) => Promise<Item>;
  claimItem: (itemId: string) => Promise<boolean>;
  loading: boolean;
}

const ItemContext = createContext<ItemContextType>({
  items: [],
  userItems: {
    reported: [],
    claimed: [],
  },
  getItemById: () => undefined,
  reportItem: async () => ({} as Item),
  claimItem: async () => false,
  loading: false,
});

export const useItems = () => useContext(ItemContext);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [userItems, setUserItems] = useState<{ reported: Item[]; claimed: Item[] }>({
    reported: [],
    claimed: [],
  });

  useEffect(() => {
    // Simulate loading items from API
    setLoading(true);
    
    // Set a timeout to simulate API call
    const timeout = setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (user) {
      const reported = fetchItemsByUser(user.id, 'reported');
      const claimed = fetchItemsByUser(user.id, 'claimed');
      
      setUserItems({
        reported,
        claimed,
      });
    } else {
      setUserItems({
        reported: [],
        claimed: [],
      });
    }
  }, [user, items]);

  const getItemById = (id: string): Item | undefined => {
    return items.find(item => item.id === id);
  };

  const reportItem = async (
    newItem: Omit<Item, 'id' | 'reportedBy' | 'date' | 'status'>
  ): Promise<Item> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!user) {
      throw new Error('User must be logged in to report an item');
    }
    
    const item: Item = {
      ...newItem,
      id: `${items.length + 1}`,
      reportedBy: user.id,
      date: new Date().toISOString(),
      status: 'reported',
    };
    
    setItems(prevItems => [...prevItems, item]);
    setLoading(false);
    
    return item;
  };

  const claimItem = async (itemId: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!user) {
      throw new Error('User must be logged in to claim an item');
    }
    
    const itemIndex = items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      setLoading(false);
      return false;
    }
    
    const updatedItems = [...items];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      status: 'claimed',
      claimedBy: user.id,
    };
    
    setItems(updatedItems);
    setLoading(false);
    
    return true;
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        userItems,
        getItemById,
        reportItem,
        claimItem,
        loading,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};