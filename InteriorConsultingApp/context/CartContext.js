import React, { createContext, useState, useMemo } from 'react';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, type) => {
    setCartItems(prev => {
      const item = prev.find(item => item.id === id);
      if (!item) return prev;

      if (type === 'dec' && item.quantity === 1) {
        return prev.filter(item => item.id !== id);
      } else {
        return prev.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
              }
            : item
        );
      }
    });
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0),
    [cartItems]
  );
  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeItem,
        totalPrice,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
