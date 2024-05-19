import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem('orderItems')) || [];
  const [cart, setCart] = useState(initialCart);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item => {
          if (item.id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        localStorage.setItem('orderItems', JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(prevCart => {
      localStorage.setItem('orderItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('orderItems', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
