"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoHeartSharp } from "react-icons/io5";
import { FaShop, FaTruckFast } from "react-icons/fa6";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdOutlineTrendingDown } from "react-icons/md";
import { useCart } from "../../hooks/useCart";

export default function ProductDetailPage({ productData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentSubImageIndex, setCurrentSubImageIndex] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});

  const isSet = productData?.isSet;
  const { addToCart } = useCart();

  // Beden seçimi gerekli mi kontrol et
  const needsSizeSelection = () => {
    if (productData.isSet) {
      return productData.products?.some(
        (item) => item.product?.sizes?.length > 0
      );
    }
    return productData.sizes?.length > 0;
  };

  // Beden seçimi ile sepete ekleme
  const handleAddToCartWithSize = () => {
    if (needsSizeSelection() && !canAddToCart()) {
      alert("Lütfen tüm ürünler için beden seçiniz!");
      return;
    }

    if (productData.isSet) {
      // Set ürün tek parça olarak sepete eklenecek
      // selectedSizes objesi set içindeki ürünlerin bedenlerini tutacak
      const sizesForSet = {};
      productData.products.forEach((item, index) => {
        const key = item.product.name; // veya başka benzersiz bir key
        sizesForSet[key] = selectedSizes[`product_${index}`] || null;
      });

      const productToAdd = {
        ...productData,
        quantity,
        selectedSizes: sizesForSet,
      };

      addToCart(productToAdd, null, quantity);
    } else {
      // Tekil ürün için
      const selectedSize = selectedSizes.single || null;
      addToCart(productData, selectedSize, quantity);
    }
  };

  // Ana sepete ekle butonunun aktif olup olmadığını kontrol eder
  const isAddToCartDisabled = () => {
    return needsSizeSelection() && !canAddToCart();
  };

  // Beden seçimi kontrolü
  const canAddToCart = () => {
    if (!needsSizeSelection()) return true;

    if (productData.isSet) {
      // Set için: beden gerektiren tüm ürünlerin bedeni seçilmiş mi?
      return productData.products.every((item, index) => {
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
    console.log(key, sizes);
    setSelectedSizes((prev) => ({
      ...prev,
      [key]: sizes,
    }));
  };

  // Set ürünleri için beden gerektiren ürünleri al
  const getProductsWithSizes = () => {
    if (!productData.isSet) return [];
    return productData.products.filter(
      (item) => item.product?.sizes?.length > 0
    );
  };

  const getImageStructure = () => {
    if (isSet) {
      return {
        mainImage: productData?.mainImage,
        products: productData?.products?.map((item) => ({
          name: item.product?.name,
          count: item.count,
          images: item.product?.images || [],
        })),
      };
    } else {
      // Set olmayan ürünler için images array'ini oluştur
      const images = productData?.images || [];
      if (productData?.mainImage && !images.includes(productData.mainImage)) {
        images.unshift(productData.mainImage);
      }
      return {
        mainImage: null,
        products: [
          {
            name: productData?.name,
            images: images,
          },
        ],
      };
    }
  };

  const imageStructure = getImageStructure();

  const getCurrentImage = () => {
    if (isSet) {
      if (currentImageIndex === 0) {
        return imageStructure.mainImage;
      } else {
        const currentProduct = imageStructure.products[currentProductIndex];
        return (
          currentProduct?.images[currentSubImageIndex] ||
          currentProduct?.images[0]
        );
      }
    } else {
      const currentProduct = imageStructure.products[0];
      return (
        currentProduct?.images[currentImageIndex] || currentProduct?.images[0]
      );
    }
  };

  const handleMainImageClick = () => {
    if (isSet) {
      setCurrentImageIndex(0);
      setCurrentProductIndex(0);
      setCurrentSubImageIndex(0);
    }
  };

  const handleProductSelect = (productIndex) => {
    if (isSet) {
      setCurrentImageIndex(1);
      setCurrentProductIndex(productIndex);
      setCurrentSubImageIndex(0);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const handleSubImageSelect = (productIndex, imageIndex) => {
    if (isSet) {
      setCurrentImageIndex(1);
      setCurrentProductIndex(productIndex);
      setCurrentSubImageIndex(imageIndex);
    } else {
      setCurrentImageIndex(imageIndex);
    }
  };

  const nextImage = () => {
    if (isSet && currentImageIndex > 0) {
      const currentProduct = imageStructure.products[currentProductIndex];
      setCurrentSubImageIndex(
        (prev) => (prev + 1) % currentProduct.images.length
      );
    } else if (!isSet) {
      const currentProduct = imageStructure.products[0];
      setCurrentImageIndex((prev) => (prev + 1) % currentProduct.images.length);
    }
  };

  const prevImage = () => {
    if (isSet && currentImageIndex > 0) {
      const currentProduct = imageStructure.products[currentProductIndex];
      setCurrentSubImageIndex(
        (prev) =>
          (prev - 1 + currentProduct.images.length) %
          currentProduct.images.length
      );
    } else if (!isSet) {
      const currentProduct = imageStructure.products[0];
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + currentProduct.images.length) %
          currentProduct.images.length
      );
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-yellow-400 ${
          i < rating ? "fas fa-star" : "far fa-star"
        }`}
      ></span>
    ));
  };

  const getProductLabel = (productIndex) => {
    if (!isSet) return null;
    return `${imageStructure.products[productIndex].count}x`;
  };

  const getShippingDate = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => {
      const days = [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
      ];
      const months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];

      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()} ${days[date.getDay()]}`;
    };

    if (currentHour < 14) {
      return `Bugün Kargoda!`;
    }

    if (currentDay === 6 || currentDay === 0) {
      const monday = new Date(today);
      const daysUntilMonday = currentDay === 6 ? 2 : 1;
      monday.setDate(today.getDate() + daysUntilMonday);
      return `${formatDate(monday)} Kargoda!`;
    }

    return `${formatDate(tomorrow)} Kargoda!`;
  };

  const shouldShowImageNavigation = () => {
    if (isSet) {
      return (
        currentImageIndex > 0 &&
        imageStructure.products[currentProductIndex]?.images?.length > 1
      );
    } else {
      return imageStructure.products[0]?.images?.length > 1;
    }
  };

  const getCurrentImageCount = () => {
    if (isSet && currentImageIndex > 0) {
      return imageStructure.products[currentProductIndex]?.images?.length || 0;
    } else if (!isSet) {
      return imageStructure.products[0]?.images?.length || 0;
    }
    return 0;
  };

  const getCurrentImagePosition = () => {
    if (isSet && currentImageIndex > 0) {
      return currentSubImageIndex + 1;
    } else if (!isSet) {
      return currentImageIndex + 1;
    }
    return 1;
  };

  return (
    <>
      <div className="p-6 bg-white">
        <div className="grid grid-cols-14 gap-6">
          <div className="col-span-2">
            <div className="space-y-3">
              {isSet && (
                <div
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden ${
                    currentImageIndex === 0
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={handleMainImageClick}
                >
                  <img
                    src={imageStructure.mainImage}
                    alt="Ana set resmi"
                    className="w-full h-20 object-contain"
                  />
                </div>
              )}
              {imageStructure.products.map((product, productIndex) => (
                <div key={productIndex} className="space-y-1">
                  <div
                    className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
                      (!isSet &&
                        currentImageIndex >= 0 &&
                        productIndex === 0) ||
                      (isSet &&
                        currentImageIndex > 0 &&
                        currentProductIndex === productIndex)
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleProductSelect(productIndex)}
                  >
                    <img
                      src={product.images[0]}
                      alt={`${product.name} thumbnail`}
                      className="w-full h-20 object-contain"
                    />
                    {getProductLabel(productIndex) && (
                      <div className="absolute bottom-1 left-1 text-green-800 text-xs px-1.5 py-0.5 rounded-full font-medium">
                        {getProductLabel(productIndex)}
                      </div>
                    )}
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-1">
                      {product.images.slice(1, 5).map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className={`relative cursor-pointer border rounded overflow-hidden transition-all duration-200 hover:shadow-sm ${
                            (!isSet && currentImageIndex === imageIndex + 1) ||
                            (isSet &&
                              currentImageIndex > 0 &&
                              currentProductIndex === productIndex &&
                              currentSubImageIndex === imageIndex + 1)
                              ? "border-blue-400 shadow-md"
                              : "border-gray-200"
                          }`}
                          onClick={() =>
                            handleSubImageSelect(productIndex, imageIndex + 1)
                          }
                        >
                          <img
                            src={image}
                            alt={`${product.name} resim ${imageIndex + 2}`}
                            className="w-full h-8 object-contain"
                          />
                          {imageIndex === 3 && product.images.length > 5 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                +{product.images.length - 5}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-6">
            <div className="relative bg-transparent rounded-lg overflow-hidden">
              <img
                src={getCurrentImage()}
                alt="Ana ürün resmi"
                className="w-full h-[500px] object-contain"
              />

              {shouldShowImageNavigation() && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {shouldShowImageNavigation() && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-transparent bg-opacity-30 px-3 py-2 rounded-full">
                  {(isSet && currentImageIndex > 0
                    ? imageStructure.products[currentProductIndex].images
                    : imageStructure.products[0].images
                  ).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (isSet && currentImageIndex > 0) {
                          setCurrentSubImageIndex(index);
                        } else {
                          setCurrentImageIndex(index);
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        (isSet && currentImageIndex > 0
                          ? currentSubImageIndex
                          : currentImageIndex) === index
                          ? "bg-green-500 scale-125"
                          : "bg-white bg-opacity-70 hover:bg-opacity-90"
                      }`}
                    />
                  ))}
                </div>
              )}

              {shouldShowImageNavigation() && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-sm">
                  {getCurrentImagePosition()} / {getCurrentImageCount()}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800 border-b-1">
                {productData.name}
              </h1>
              {needsSizeSelection() && (
                <div className="space-y-3">
                  {productData.isSet ? (
                    <div className="space-y-3">
                      {getProductsWithSizes().map((item, index) => {
                        const productIndex = productData.products.findIndex(
                          (p) => p === item
                        );
                        return (
                          <div
                            key={productIndex}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600 flex-1">
                              {item.product.name} ({item.count} adet)
                            </span>
                            <div className="relative ml-3">
                              <select
                                value={
                                  selectedSizes[`product_${productIndex}`] || ""
                                }
                                onChange={(e) =>
                                  handleSizeChange(
                                    `product_${productIndex}`,
                                    e.target.value
                                  )
                                }
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-w-[100px]"
                              >
                                <option value="">Beden</option>
                                {item.product.sizes.map((sizes) => (
                                  <option key={sizes} value={sizes}>
                                    {sizes}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <FiChevronDown className="text-gray-400" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Tekil ürün için beden seçimi
                    <div className="flex justify-end">
                      <div className="relative">
                        <select
                          value={selectedSizes.single || ""}
                          onChange={(e) => {
                            handleSizeChange("single", e.target.value);
                          }}
                          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="">Beden Seçin</option>
                          {productData.sizes.map((sizes) => (
                            <option key={sizes} value={sizes}>
                              {sizes}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <FiChevronDown className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {productData.cartPrice &&
                productData.cartPrice !== productData.price ? (
                  <div className="flex  justify-end items-center gap-5 space-y-2">
                    <div className="flex items-start gap-1">
                      <div className="text-3xl font-bold">
                        {productData.cartPrice}
                      </div>{" "}
                      <div className="flex items-center gap-2 text-red-500 text-lg px-3 rounded-full font-medium">
                        %
                        {Math.round(
                          ((parseFloat(
                            productData.price
                              .replace(/[^\d,]/g, "")
                              .replace(",", ".")
                          ) -
                            parseFloat(
                              productData.cartPrice
                                .replace(/[^\d,]/g, "")
                                .replace(",", ".")
                            )) /
                            parseFloat(
                              productData.price
                                .replace(/[^\d,]/g, "")
                                .replace(",", ".")
                            )) *
                            100
                        )}{" "}
                        <MdOutlineTrendingDown />
                      </div>
                      <div className="text-lg text-gray-500 line-through">
                        {productData.price}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-end text-3xl font-bold">
                    {productData.price}
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center space-x-4">
                <div className="flex border border-white rounded overflow-hidden w-24">
                  <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <span className="text-lg font-medium">{quantity}</span>
                  </div>
                  <div className="flex flex-col border-l border-white">
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 flex items-center justify-center px-2 hover:bg-green-200"
                    >
                      <FiChevronUp />
                    </button>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 flex items-center justify-center px-2 hover:bg-red-200 border-t border-white"
                    >
                      <FiChevronDown />
                    </button>
                  </div>
                </div>
                <button
                  className={`flex items-center gap-2 py-3 px-6 rounded-lg font-medium shadow-md transition-colors ${
                    isAddToCartDisabled()
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                  }`}
                  onClick={handleAddToCartWithSize}
                  disabled={isAddToCartDisabled()}
                >
                  <TbShoppingBagPlus />
                  Sepete Ekle
                </button>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex gap-2 items-center text-green-700">
                  <FaTruckFast />
                  <span className="text-sm">
                    <strong>{getShippingDate()}</strong>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="text-sm flex items-center justify-center border border-black text-black hover:bg-black hover:border-black hover:text-white cursor-pointer rounded-lg py-3 px-6 gap-2 font-bold shadow-md">
                  <FaPhone />
                  Telefon ile Sipariş Ver
                </button>
                <button className="text-sm flex items-center justify-center border border-green-700 text-green-700 hover:bg-green-700 hover:border-green-700 hover:text-white cursor-pointer rounded-lg py-3 px-6 gap-2 font-bold shadow-md">
                  <FaWhatsapp />
                  WhatsApp ile Sipariş Ver
                </button>
              </div>
              {isSet && (
                <div className="border-t pt-4">
                  <h3 className="text-gray-800 mb-3 font-bold">Set İçeriği</h3>
                  <div className="space-y-2">
                    {productData?.products?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{item.product.name}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {item.count} Adet
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-sm mt-2">{productData?.description}</div>
      </div>
    </>
  );
}
