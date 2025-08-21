"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTruckFast } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight, FaWhatsapp } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdOutlineTrendingDown } from "react-icons/md";
import { useCart } from "../../hooks/useCart";
import Image from "next/image";

export default function ProductDetailPage({ productData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentSubImageIndex, setCurrentSubImageIndex] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});

  const isSet = productData?.isSet;
  const { addToCart } = useCart();

  const needsSizeSelection = () => {
    if (productData.isSet) {
      return productData.products?.some(
        (item) => item.product?.sizes?.length > 0
      );
    }
    return productData.sizes?.length > 0;
  };

  const handleAddToCartWithSize = () => {
    if (needsSizeSelection() && !canAddToCart()) {
      alert("Lütfen tüm ürünler için beden seçiniz!");
      return;
    }

    if (productData.isSet) {
      const sizesForSet = {};
      productData.products.forEach((item, index) => {
        const key = item.product.name;
        sizesForSet[key] = selectedSizes[`product_${index}`] || null;
      });

      const productToAdd = {
        ...productData,
        quantity,
        selectedSizes: sizesForSet,
      };

      addToCart(productToAdd, null, quantity);
    } else {
      const selectedSize = selectedSizes.single || null;
      addToCart(productData, selectedSize, quantity);
    }
  };

  const isAddToCartDisabled = () => {
    return needsSizeSelection() && !canAddToCart();
  };

  const canAddToCart = () => {
    if (!needsSizeSelection()) return true;

    if (productData.isSet) {
      return productData.products.every((item, index) => {
        if (item.product?.sizes?.length > 0) {
          return selectedSizes[`product_${index}`];
        }
        return true;
      });
    } else {
      return selectedSizes.single;
    }
  };

  const handleSizeChange = (key, sizes) => {
    console.log(key, sizes);
    setSelectedSizes((prev) => ({
      ...prev,
      [key]: sizes,
    }));
  };

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
    <div className="p-4 sm:p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-14 gap-6">
        {/* Sol Thumbnail Alanı */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {isSet && (
              <div
                className={`relative flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${
                  currentImageIndex === 0
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={handleMainImageClick}
              >
                <Image
                  src={imageStructure.mainImage || "/images/no_image.jpg"}
                  alt="Ana set resmi"
                  width={100}
                  height={100}
                  className="object-contain w-20 h-20 lg:w-auto lg:h-auto"
                />
              </div>
            )}
            {imageStructure.products.map((product, productIndex) => (
              <div key={productIndex} className="flex-shrink-0 space-y-1">
                <div
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
                    (!isSet && currentImageIndex >= 0 && productIndex === 0) ||
                    (isSet &&
                      currentImageIndex > 0 &&
                      currentProductIndex === productIndex)
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleProductSelect(productIndex)}
                >
                  <Image
                    src={product.images?.[0] || "/images/no_image.jpg"}
                    alt={`${product.name} thumbnail`}
                    width={100}
                    height={100}
                    className="object-contain w-20 h-20 lg:w-auto lg:h-auto"
                  />
                  {getProductLabel(productIndex) && (
                    <div className="absolute bottom-1 left-1 text-green-800 text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {getProductLabel(productIndex)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orta Ana Görsel */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative bg-transparent rounded-lg overflow-hidden">
            <div className="flex justify-center items-center">
              <Image
                src={getCurrentImage() || "/images/no_image.jpg"}
                alt="Ana ürün resmi"
                width={400}
                height={400}
                className="w-full max-h-[400px] object-contain"
              />
            </div>
            {shouldShowImageNavigation() && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sağ Ürün Detayları */}
        <div className="lg:col-span-6 order-3">
          <div className="space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 border-b pb-2">
              {productData.name}
            </h1>

            {/* Beden Seçimi */}
            {needsSizeSelection() && (
              <div className="space-y-3">
                {/* burada mevcut kodun senin select yapısını bozmadan bırakabilirsin */}
              </div>
            )}

            {/* Fiyat */}
            <div className="text-end text-2xl sm:text-3xl font-bold">
              {productData.price}
            </div>

            {/* Sepete ekle ve adet seçimi */}
            <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-4">
              <div className="flex border rounded overflow-hidden w-full sm:w-24">
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <span className="text-lg font-medium">{quantity}</span>
                </div>
                <div className="flex flex-col border-l">
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 flex items-center justify-center px-2 hover:bg-green-200"
                  >
                    <FiChevronUp />
                  </button>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 flex items-center justify-center px-2 hover:bg-red-200 border-t"
                  >
                    <FiChevronDown />
                  </button>
                </div>
              </div>
              <button
                className={`w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium shadow-md ${
                  isAddToCartDisabled()
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
                onClick={handleAddToCartWithSize}
                disabled={isAddToCartDisabled()}
              >
                <TbShoppingBagPlus />
                Sepete Ekle
              </button>
            </div>

            {/* Kargo bilgisi */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex gap-2 items-center text-green-700">
                <FaTruckFast />
                <span className="text-sm font-medium">{getShippingDate()}</span>
              </div>
            </div>

            {/* Whatsapp */}
            <button className="w-full sm:w-auto text-sm flex items-center justify-center border border-green-700 text-green-700 hover:bg-green-700 hover:text-white rounded-lg py-3 px-6 gap-2 font-bold shadow-md">
              <FaWhatsapp />
              WhatsApp ile Sipariş Ver
            </button>
          </div>
        </div>
      </div>

      <div className="text-sm mt-4">{productData?.description}</div>
    </div>
  );
}
