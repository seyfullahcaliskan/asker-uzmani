"use client";

import { useState } from "react";
import Link from "next/link";
import { RiDeleteBin6Line, RiShoppingBasketLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useCart } from "../hooks/useCart";
import Image from "next/image";
import { getProductCategorySlug } from "../navLinks";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateSize,
    updateItemSizes,
    getTotalPrice,
    getTotalItems,
    getItemsNeedingSize,
    clearCart,
  } = useCart();

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return price;
    }
    return `${price.toLocaleString("tr-TR")}₺`;
  };

  const handleSizeChange = (cartId, size) => {
    updateSize(cartId, size);
  };

  const handleSetItemSizeChange = (
    cartId,
    productName,
    size,
    selectedSizes
  ) => {
    const newSizes = {
      ...selectedSizes,
      [productName]: size,
    };
    updateItemSizes(cartId, newSizes);
  };

  const canProceedToCheckout = () => {
    return getItemsNeedingSize().length === 0 && cartItems.length > 0;
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <RiShoppingBasketLine className="text-6xl text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Sepetiniz Boş
          </h1>
          <p className="text-gray-600 mb-8">
            Henüz sepetinize ürün eklemediniz.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#7F7B59] text-white px-6 py-3 rounded-lg hover:bg-[#6d6849] hover:scale-110 transition-all duration-200"
          >
            <BiArrowBack />
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#7F7B59] hover:text-[#6d6849] hover:scale-110 transition-all duration-200 text-sm sm:text-base"
        >
          <BiArrowBack className="text-lg sm:text-xl" />
          Alışverişe Devam Et
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Sepetim ({getTotalItems()} ürün)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Sepet Ürünleri */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold">
                  Sepetinizdeki Ürünler
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 text-sm sm:text-md hover:text-red-700 hover:scale-110 transition-all duration-200"
                >
                  Sepeti Temizle
                </button>
              </div>

              {/* Beden seçimi uyarısı */}
              {getItemsNeedingSize().length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ Bazı ürünler için beden seçimi yapmanız gerekiyor.
                  </p>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    {/* Ürün görseli + detay */}
                    <div className="flex items-center gap-3 flex-1">
                      <Link
                        href={`/${getProductCategorySlug(item)}/${item.slug}`}
                        className="flex-shrink-0"
                      >
                        <Image
                          src={
                            item.mainImage ||
                            item.images?.[0] ||
                            "/images/no_image.jpg"
                          }
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded w-20 h-20 sm:w-24 sm:h-24 hover:scale-110 transition-all duration-200"
                        />
                      </Link>
                      <div className="flex flex-col">
                        <Link
                          href={`/${getProductCategorySlug(item)}/${item.slug}`}
                        >
                          <h3 className="font-bold text-base sm:text-lg mb-1 hover:text-blue-700 transition-all duration-200">
                            {item.name}
                          </h3>
                        </Link>

                        {/* Beden seçimi */}
                        {item.isSet ? (
                          <div className="space-y-2">
                            {item.products?.map((p, idx) => {
                              const productName = p.product.name;
                              const currentSize =
                                item.selectedSizes?.[productName] || "";
                              return (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-xs sm:text-sm"
                                >
                                  <span className="text-gray-600 min-w-[80px] sm:min-w-[100px]">
                                    {productName}:
                                  </span>
                                  <select
                                    value={currentSize}
                                    onChange={(e) =>
                                      handleSetItemSizeChange(
                                        item.cartId,
                                        productName,
                                        e.target.value,
                                        item.selectedSizes
                                      )
                                    }
                                    className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
                                  >
                                    <option value="">Beden Seçin</option>
                                    {p.product.sizes.map((size) => (
                                      <option key={size} value={size}>
                                        {size}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              );
                            })}
                          </div>
                        ) : item.sizes && item.sizes.length > 0 ? (
                          <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
                            <span className="text-gray-600">Beden:</span>
                            <select
                              value={item.selectedSize || ""}
                              onChange={(e) =>
                                handleSizeChange(item.cartId, e.target.value)
                              }
                              className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
                            >
                              <option value="">Beden Seçin</option>
                              {item.sizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Adet - Fiyat - Sil */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-2 flex-wrap">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-red-200 transition-all duration-200"
                          disabled={item.quantity <= 1}
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-green-200 transition-all duration-200"
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>

                      {/* Fiyat & Sil */}
                      <div className="flex items-center gap-2 sm:gap-4">
                        <span className="font-bold text-sm sm:text-lg text-[#7F7B59]">
                          {formatPrice(item.cartPrice || item.price)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 hover:text-red-700 p-2 transition-all duration-200"
                        >
                          <RiDeleteBin6Line className="text-lg sm:text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Sipariş Özeti
            </h2>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Ürün Toplamı:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo:</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-base sm:text-lg">
                <span>Toplam:</span>
                <span className="text-[#7F7B59]">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>

            <Link
              href={canProceedToCheckout() ? "/odeme" : "#"}
              className={`w-full py-3 rounded-lg text-center font-bold transition-colors block hover:scale-105 duration-400 text-sm sm:text-base ${canProceedToCheckout()
                  ? "bg-[#7F7B59] text-white hover:bg-[#6d6849]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              onClick={(e) => {
                if (!canProceedToCheckout()) {
                  e.preventDefault();
                }
              }}
            >
              {canProceedToCheckout() ? "Ödemeye Geç" : "Beden Seçimi Yapın"}
            </Link>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                <span>🔒</span>
                <span>Güvenli Ödeme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
