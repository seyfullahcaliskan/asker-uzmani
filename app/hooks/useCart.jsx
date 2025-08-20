"use client";

import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Sepet verisi yüklenirken hata:", error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (product, selectedSize = null, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.isSet === product.isSet
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            selectedSize,
            quantity,
            cartId: `${product.id}-${selectedSize || "no-sizes"}-${Date.now()}`,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateSize = (cartId, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, selectedSize: newSize } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(
        item.cartPrice?.replace(/[₺,]/g, "") ||
          item.price?.replace(/[₺,]/g, "") ||
          0
      );
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemsNeedingSize = () => {
    return cartItems.filter((item) => {
      if (item.isSet) {
        return item.products?.some(
          (p) =>
            p.product?.sizes?.length > 0 &&
            !item.selectedSizes?.[p.product.name]
        );
      } else {
        return item.sizes?.length > 0 && !item.selectedSize;
      }
    });
  };

  const updateItemSizes = (cartId, newSelectedSizes) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId
          ? { ...item, selectedSizes: newSelectedSizes }
          : item
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateSize,
    updateItemSizes,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getItemsNeedingSize,
    isLoading,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
