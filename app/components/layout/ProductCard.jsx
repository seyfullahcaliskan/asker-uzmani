"use client";
import Link from "next/link";
import { useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdOutlineTrendingDown } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { getProductCategorySlug } from "../../navLinks";
import { useCart } from "../../hooks/useCart";

export default function ProductCard({ set }) {
  const [isAllHovered, setIsAllHovered] = useState(false);
  const [isDetailHovered, setIsDetailHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});

  const categorySlug = getProductCategorySlug(set);
  const { addToCart } = useCart();

  // Beden seçimi gerekli mi kontrol et
  const needsSizeSelection = () => {
    if (set.isSet) {
      return set.products?.some((item) => item.product?.sizes?.length > 0);
    }
    return set.sizes?.length > 0;
  };

  // Beden seçimi ile sepete ekleme
  const handleAddToCartWithSize = () => {
    addToCart(set);
  };

  // Beden seçimi tamamlandığında sepete ekleme
  const handleSizeSelectionComplete = () => {
    const productWithSizes = { ...set };

    if (set.isSet) {
      // Set ürünleri için beden bilgilerini ekle
      productWithSizes.products = set.products.map((item, index) => {
        if (item.product?.sizes?.length > 0) {
          return {
            ...item,
            selectedSize: selectedSizes[`product_${index}`],
          };
        }
        return item;
      });
    } else {
      // Tekil ürün için beden bilgisini ekle
      productWithSizes.selectedSize = selectedSizes.single;
    }

    addToCart(productWithSizes);
    setShowSizeModal(false);
    setSelectedSizes({});
  };

  // Beden seçimi kontrolü
  const canAddToCart = () => {
    if (!needsSizeSelection()) return true;

    if (set.isSet) {
      // Set için: beden gerektiren tüm ürünlerin bedeni seçilmiş mi?
      return set.products.every((item, index) => {
        if (item.product?.sizes?.length > 0) {
          return selectedSizes[`product_${index}`];
        }
        return true;
      });
    } else {
      // Tekil ürün için: beden seçilmiş mi?
      return selectedSizes.single;
    }
  };

  // Beden seçimi değiştirme
  const handleSizeChange = (key, sizes) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [key]: sizes,
    }));
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300"
        onMouseEnter={() => setIsAllHovered(true)}
        onMouseLeave={() => setIsAllHovered(false)}
      >
        <div
          className="relative bg-gray-50 p-4"
          onMouseEnter={() => setIsDetailHovered(true)}
          onMouseLeave={() => setIsDetailHovered(false)}
        >
          <img
            src={set.mainImage || set.images[0] || `/images/no_image.jpg`}
            alt={set.name}
            className="w-full h-100 object-cover rounded-lg transition-opacity duration-300"
            style={{
              opacity: isDetailHovered ? 0.7 : 1,
            }}
          />

          {isDetailHovered && (
            <Link href={`/${categorySlug}/${set.slug}`}>
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] flex flex-col justify-center items-center space-y-3 transition-all duration-300 z-10 rounded-lg">
                <p className="text-white px-4 py-2 rounded font-medium">
                  Detaylı İncele
                </p>
              </div>
            </Link>
          )}
        </div>
        <div className="px-4 py-2 space-y-2">
          <h3 className="text-md font-semibold text-gray-700 leading-tight">
            {set.name}
          </h3>
          {set.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(set.rating)
                        ? "text-orange-400 fill-current"
                        : "text-gray-300 fill-current"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {set.reviewCount && (
                <span className="text-xs text-gray-500">{set.reviewCount}</span>
              )}
            </div>
          )}
          {set.price && (
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                {set.cartPrice && set.cartPrice !== set.price ? (
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">
                          {set.cartPrice}
                        </div>
                      </div>
                      <div className="flex items-center text-red-400 text-md px-2 py-1 font-medium">
                        %
                        {Math.round(
                          ((parseFloat(
                            set.price.replace(/[^\d,]/g, "").replace(",", ".")
                          ) -
                            parseFloat(
                              set.cartPrice
                                .replace(/[^\d,]/g, "")
                                .replace(",", ".")
                            )) /
                            parseFloat(
                              set.price.replace(/[^\d,]/g, "").replace(",", ".")
                            )) *
                            100
                        )}
                        <MdOutlineTrendingDown />
                      </div>
                      <div className="text-md text-gray-500 line-through">
                        {set.price}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-lg font-bold text-gray-900">
                    {set.price}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setIsLiked(!isLiked)}>
                  {/* <FaRegHeart /> */}
                  {/* <FaHeart className="text-red-700" /> favorilerde ise bu gelecek*/}
                </button>
                {/* <TbShoppingBagPlus /> */}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center px-10 my-2">
          {isAllHovered ? (
            <button
              onClick={handleAddToCartWithSize}
              className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium shadow-md cursor-pointer"
            >
              <TbShoppingBagPlus />
              Sepete Ekle
            </button>
          ) : null}
        </div>
      </div>

      {/* Beden Seçimi Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Beden Seçimi</h3>
              <button
                onClick={() => {
                  setShowSizeModal(false);
                  setSelectedSizes({});
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX sizes={24} />
              </button>
            </div>

            <div className="space-y-4">
              {set.isSet
                ? // Set ürünleri için beden seçimi
                  set.products.map((item, index) => {
                    if (item.product?.sizes?.length > 0) {
                      return (
                        <div key={index} className="border-b pb-4">
                          <h4 className="font-medium mb-2">
                            {item.product.name} ({item.count} adet)
                          </h4>
                          <div className="grid grid-cols-4 gap-2">
                            {item.product.sizes.map((sizes) => (
                              <button
                                key={sizes}
                                onClick={() =>
                                  handleSizeChange(`product_${index}`, sizes)
                                }
                                className={`py-2 px-3 border rounded text-sm font-medium transition-colors ${
                                  selectedSizes[`product_${index}`] === sizes
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
                                }`}
                              >
                                {sizes}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                : // Tekil ürün için beden seçimi
                  set.sizes?.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Beden Seçiniz</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {set.sizes.map((sizes) => (
                          <button
                            key={sizes}
                            onClick={() => handleSizeChange("single", sizes)}
                            className={`py-2 px-3 border rounded text-sm font-medium transition-colors ${
                              selectedSizes.single === sizes
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-700 border-gray-300 hover:border-orange-500"
                            }`}
                          >
                            {sizes}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowSizeModal(false);
                  setSelectedSizes({});
                }}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSizeSelectionComplete}
                disabled={!canAddToCart()}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  canAddToCart()
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
