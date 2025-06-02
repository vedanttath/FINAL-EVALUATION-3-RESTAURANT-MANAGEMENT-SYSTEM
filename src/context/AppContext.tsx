import React, { createContext, useContext, useState, ReactNode } from 'react';
import { chefs as initialChefs, tables as initialTables } from '../data/mockData';

// Types
export interface Chef {
  id: string;
  name: string;
  ordersTaken: number;
}

export interface Table {
  id: string;
  name: string;
  chairs: number;
  status: 'Available' | 'Reserved';
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export type OrderStatus = 'Processing' | 'Done' | 'Served' | 'Not Picked Up';
export type OrderType = 'Dine In' | 'Take Away';

export interface Order {
  id: string;
  tableId: string;
  timestamp: string;
  items: CartItem[];
  status: OrderStatus;
  type: OrderType;
  duration: number;
  chefId: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  cookingInstructions?: string;
}

interface AppContextType {
  // State
  chefs: Chef[];
  tables: Table[];
  cart: CartItem[];
  orders: Order[];
  orderType: OrderType;
  
  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Order actions
  createOrder: (tableId: string, orderType: OrderType) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignChef: (orderId: string, chefId: string) => void;
  
  // Table actions
  updateTableStatus: (tableId: string, status: Table['status']) => void;
  
  // Order type
  setOrderType: (type: OrderType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chefs] = useState<Chef[]>(initialChefs);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('Dine In');

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (tableId: string, orderType: OrderType) => {
    const newOrder: Order = {
      id: `#${Math.floor(Math.random() * 1000)}`,
      tableId,
      timestamp: new Date().toLocaleTimeString(),
      items: [...cart],
      status: 'Processing',
      type: orderType,
      duration: 0,
      chefId: '',
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    
    if (orderType === 'Dine In') {
      updateTableStatus(tableId, 'Reserved');
    }
    
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    // If order is completed, update table status
    if (status === 'Served' || status === 'Done') {
      const order = orders.find((o) => o.id === orderId);
      if (order && order.type === 'Dine In') {
        updateTableStatus(order.tableId, 'Available');
      }
    }
  };

  const assignChef = (orderId: string, chefId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, chefId } : order
      )
    );
  };

  const updateTableStatus = (tableId: string, status: Table['status']) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      )
    );
  };

  const value = {
    chefs,
    tables,
    cart,
    orders,
    orderType,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    createOrder,
    updateOrderStatus,
    assignChef,
    updateTableStatus,
    setOrderType,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};