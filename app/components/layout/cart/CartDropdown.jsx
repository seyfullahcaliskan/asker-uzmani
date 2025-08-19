"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RiShoppingBasketLine, RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { useCart } from "../../../hooks/useCart";

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateItemSize,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  console.log(cartItems);
  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return price;
    }
    return `${price.toLocaleString("tr-TR")}₺`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] transition-colors"
        onMouseEnter={() => setIsOpen(true)}
      >
        <div className="relative">
          <RiShoppingBasketLine className="text-2xl" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </div>
        <span className="text-sm">Sepetim</span>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4">
            <h3 className="font-bold text-lg mb-4">
              Sepetim ({getTotalItems()} ürün)
            </h3>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <RiShoppingBasketLine className="text-4xl text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Sepetiniz boş</p>
              </div>
            ) : (
              <>
                <div className="max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={item.mainImage || item.images?.[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.name}
                        </h4>
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500">
                            Beden: {item?.selectedSize}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            >
                              <AiOutlineMinus className="text-xs" />
                            </button>
                            <span className="text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            >
                              <AiOutlinePlus className="text-xs" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#7F7B59]">
                              {formatPrice(item.cartPrice || item.price)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <RiDeleteBin6Line className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Toplam:</span>
                    <span className="font-bold text-lg text-[#7F7B59]">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href="/sepet"
                      className="flex-1 bg-gray-100 text-center py-2 rounded hover:bg-gray-200 transition-colors text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Sepeti Görüntüle
                    </Link>
                    <Link
                      href="/odeme"
                      className="flex-1 bg-[#7F7B59] text-white text-center py-2 rounded hover:bg-[#6d6849] transition-colors text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Ödemeye Geç
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
