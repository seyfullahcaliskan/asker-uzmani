"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../hooks/useCart";
import { getProductCategorySlug } from "../navLinks";
import { RiDeleteBin6Line, RiShoppingBasketLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateSize,
    updateItemSizes,
    getTotalPrice,
    getCargoFee,
    getTotalWithCargo,
    getTotalItems,
    getItemsNeedingSize,
    clearCart,
    freeCargoPrice,
  } = useCart();

  const productTotal = getTotalPrice();
  const cargoFee = getCargoFee();
  const totalPriceWithCargo = getTotalWithCargo();

  const formatPrice = (price) =>
    typeof price === "string"
      ? price
      : `${price.toLocaleString("tr-TR")}₺`;

  const canProceedToCheckout =
    getItemsNeedingSize().length === 0 && cartItems.length > 0;

  const handleSizeChange = (cartId, size) => {
    updateSize(cartId, size);
  };

  const handleSetItemSizeChange = (cartId, productName, size, selectedSizes) => {
    updateItemSizes(cartId, {
      ...selectedSizes,
      [productName]: size,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <RiShoppingBasketLine className="text-6xl text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Sepetiniz Boş
        </h1>
        <p className="text-gray-600 mb-8">
          Henüz sepetinize ürün eklemediniz.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-[#6d6849] hover:scale-110 transition-all duration-200"
        >
          <BiArrowBack />
          Alışverişe Devam Et
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 pb-12">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-green-800 hover:text-[#6d6849] hover:scale-110 transition-all duration-200 text-sm sm:text-base"
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
                  className="text-red-500 text-sm hover:text-red-700 hover:scale-110 transition-all duration-200"
                >
                  Sepeti Temizle
                </button>
              </div>

              {/* Beden uyarısı */}
              {getItemsNeedingSize().length > 0 && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4 text-sm">
                  ⚠️ Bazı ürünler için beden seçimi yapmanız gerekiyor.
                </div>
              )}

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
                  >
                    {/* Ürün görseli + detay */}
                    <div className="flex items-center gap-3 flex-1">
                      <Image
                        src={
                          item.mainImagePath ||
                          item.images?.[0] ||
                          "/images/no_image.jpg"
                        }
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover rounded w-20 h-20 sm:w-24 sm:h-24"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-bold text-base sm:text-lg">
                          {item.name}
                        </h3>

                        {/* Custom set veya set ürünleri */}
                        {item.isSet?.id === 1 && item.subProducts?.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {item.subProducts
                              .filter(sp => sp?.product?.sizes?.length > 0) // sadece beden seçimi olanlar
                              .map((sp, idx) => {
                                const productName = sp.product.name;
                                const currentSize = item.selectedSizes?.[productName] || "";

                                return (
                                  <div key={idx} className="flex items-center justify-between text-xs">
                                    <span>{productName}</span>
                                    <select
                                      value={currentSize}
                                      onChange={(e) =>
                                        handleSetItemSizeChange(
                                          item.cartId,
                                          productName,
                                          e.target.value,
                                          item.selectedSizes || {}
                                        )
                                      }
                                      className="border border-gray-300 rounded px-2 py-1"
                                    >
                                      <option value="">Beden Seç</option>
                                      {sp.product.sizes.map((s) => (
                                        <option key={s.id} value={s.value}>
                                          {s.value}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                );
                              })}
                          </div>
                        )}

                        {/* Tekil ürün beden seçimi */}
                        {item.isSet?.id === 0 && item.sizes?.length > 0 && (
                          <div className="mt-1 text-xs">
                            <select
                              value={item.selectedSize || ""}
                              onChange={(e) =>
                                handleSizeChange(item.cartId, e.target.value)
                              }
                              className="border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="">Beden Seç</option>
                              {item.sizes.map((s) => (
                                <option key={s.id} value={s.value}>
                                  {s.value}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Adet - Fiyat - Sil */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                      {/* Adet butonları */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-red-200 transition"
                          disabled={item.quantity <= 1}
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-green-200 transition"
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>

                      {/* Fiyat ve Sil */}
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-green-800">
                          {formatPrice(item.cartPrice || item.price)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <RiDeleteBin6Line className="text-lg" />
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
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Sipariş Özeti</h2>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span>Ürün Toplamı:</span>
                <span>{formatPrice(productTotal)}</span>
              </div>
              <div className="flex justify-between">
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
                <p className="text-xs text-gray-600">
                  {formatPrice(freeCargoPrice - productTotal)} daha alışveriş
                  yaparsanız kargo ücretsiz!
                </p>
              )}
              <hr />
              <div className="flex justify-between font-bold text-base">
                <span>Toplam:</span>
                <span className="text-green-800">
                  {formatPrice(totalPriceWithCargo)}
                </span>
              </div>
            </div>

            <Link
              href={canProceedToCheckout ? "/odeme" : "#"}
              onClick={(e) => !canProceedToCheckout && e.preventDefault()}
              className={`block w-full text-center py-3 rounded-lg font-bold transition-all ${canProceedToCheckout
                  ? "bg-green-800 text-white hover:bg-[#6d6849]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {canProceedToCheckout
                ? "Ödemeye Geç"
                : "Beden Seçimi Yapın"}
            </Link>

            <p className="mt-4 text-xs text-center text-gray-600">
              🔒 Güvenli Ödeme
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
