"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RiShoppingBasketLine, RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCart } from "../../../hooks/useCart";
import Image from "next/image";

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    getCargoFee,
    getTotalWithCargo,
    freeCargoPrice,
  } = useCart();

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
    if (typeof price === "string") return price;
    return `${price.toLocaleString("tr-TR")}₺`;
  };

  const productTotal = getTotalPrice();
  const cargoFee = getCargoFee();
  const totalWithCargo = getTotalWithCargo();

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:scale-110 transition-all duration-200"
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
        <Link
          href="/sepet"
          className="text-[10px]"
          onClick={() => setIsOpen(false)}
        >
          Sepetim
        </Link>
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
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-red-200 hover:scale-110 transition-all"
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
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-green-200 hover:scale-110 transition-all"
                        >
                          <AiOutlinePlus className="text-xs" />
                        </button>
                      </div>
                      <Image
                        src={
                          item.mainImage ||
                          item.images?.[0] ||
                          "/images/no_image.jpg"
                        }
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.name}
                        </h4>
                        {item.isSet && item?.selectedSizes && (
                          <div className="text-xs text-gray-500">
                            {Object.entries(item.selectedSizes).map(
                              ([key, value], index) => (
                                <p key={index}>
                                  {key}: {value}
                                </p>
                              )
                            )}
                          </div>
                        )}
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500">
                            Beden: {item?.selectedSize}
                          </p>
                        )}
                        <div className="flex items-center justify-end gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#7F7B59]">
                              {formatPrice(item.cartPrice || item.price)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-red-500 hover:text-red-700 transition-all"
                            >
                              <RiDeleteBin6Line className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sipariş Özeti */}
                <div className="border-t border-gray-200 pt-4 mt-4 text-sm">
                  <div className="flex justify-between mb-1">
                    <span>Ürün Toplamı:</span>
                    <span>{formatPrice(productTotal)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Kargo:</span>
                    <span
                      className={
                        cargoFee === 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {cargoFee === 0 ? "Ücretsiz" : formatPrice(cargoFee)}
                    </span>
                  </div>

                  {cargoFee > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatPrice(freeCargoPrice - productTotal)} daha
                      alışveriş yaparsanız kargo ücretsiz!
                    </p>
                  )}

                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span>Toplam:</span>
                    <span className="text-[#7F7B59]">
                      {formatPrice(totalWithCargo)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Link
                    onClick={() => setIsOpen(false)}
                    href="/sepet"
                    className="border border-[#7F7B59] text-[#7F7B59] px-4 py-2 rounded-lg hover:bg-[#7F7B59] hover:text-white transition-all"
                  >
                    Sepeti Görüntüle
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
