import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('gamestore_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error al recuperar el carrito desde localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gamestore_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const currentQty = updatedCart[existingItemIndex].quantity || 1;
        const maxStock = product.stock ?? Infinity;
        
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: Math.min(currentQty + quantity, maxStock)
        };
        return updatedCart;
      } else {
        const initialQty = Math.min(quantity, product.stock ?? quantity);
        return [...prevCart, { ...product, quantity: initialQty }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const maxStock = item.stock ?? Infinity;
          return {
            ...item,
            quantity: Math.min(quantity, maxStock)
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => {
      let unitPrice = item.price || 0;

      if (item.isOffer && item.offerPrice !== undefined && item.offerPrice !== null) {
        unitPrice = item.offerPrice;
      } else if (item.onSale && item.discountPrice !== undefined && item.discountPrice !== null) {
        unitPrice = item.discountPrice;
      }

      const qty = item.quantity || 1;
      return acc + (unitPrice * qty);
    }, 0);
  };

  const getItemCount = () => {
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;