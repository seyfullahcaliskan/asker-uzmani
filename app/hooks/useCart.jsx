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

  // LocalStorage'dan sepeti yükle
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

  // Sepet değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  // Sepete ürün ekle
  const addToCart = (product, selectedSize = null, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.isSet === product.isSet
      );

      if (existingItemIndex > -1) {
        // Ürün zaten sepette varsa miktarını artır
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Yeni ürün ekle
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

  // Sepetten ürün çıkar
  const removeFromCart = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };

  // Ürün miktarını güncelle
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

  // Ürün bedenini güncelle
  const updateSize = (cartId, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, selectedSize: newSize } : item
      )
    );
  };

  // Sepeti temizle
  const clearCart = () => {
    setCartItems([]);
  };

  // Toplam fiyat hesapla
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

  // Toplam ürün sayısı
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Beden seçimi gereken ürünleri kontrol et
  const getItemsNeedingSize = () => {
    return cartItems.filter((item) => {
      if (item.isSet) {
        // Set ürün için: her alt ürünün bedeni seçilmiş mi?
        return item.products?.some(
          (p) =>
            p.product?.sizes?.length > 0 &&
            !item.selectedSizes?.[p.product.name]
        );
      } else {
        // Tekil ürün için
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
    updateItemSizes, // <-- buraya ekle
    clearCart,
    getTotalPrice,
    getTotalItems,
    getItemsNeedingSize,
    isLoading,
  };
  console.log(value);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
