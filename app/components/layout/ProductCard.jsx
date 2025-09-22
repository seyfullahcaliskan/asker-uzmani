"use client";
import Link from "next/link";
import { useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdOutlineTrendingDown } from "react-icons/md";
import { getProductCategorySlug } from "../../navLinks";
import { useCart } from "../../hooks/useCart";
import Image from "next/image";

export default function ProductCard({ set }) {
  const [isAllHovered, setIsAllHovered] = useState(false);
  const categorySlug = getProductCategorySlug(set);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(set);
  };
  return (
    <>
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-w-[200px] min-h-[300px] mx-auto hover:shadow-lg hover:scale-105 transition-all duration-300 
        md:max-w-sm md:min-w-[200px] md:min-h-[300px]"
        onMouseEnter={() => setIsAllHovered(true)}
        onMouseLeave={() => setIsAllHovered(false)}
      >
        {/* Ürün resmi */}
        <Link href={`/${categorySlug}/${set.slug}`}>
          <div className="relative bg-gray-50 p-3 md:p-4 cursor-pointer">
            <Image
              src={set?.mainImagePath || set?.images?.[0].path || "/images/no_image.jpg"}
              alt={set.name}
              width={500}
              height={300}
              className="w-full h-40 md:h-60 object-cover rounded-lg transition-opacity duration-300"
            />
          </div>
        </Link>

        {/* Ürün adı */}
        <div className="px-3 py-2 space-y-1 md:space-y-2">
          <Link href={`/${categorySlug}/${set.slug}`}>
            <h3 className="text-sm md:text-md font-semibold text-gray-700 leading-tight cursor-pointer">
              {set.name}
            </h3>
          </Link>

          {/* Fiyat */}
          {set.price && (
            <div className="flex justify-between items-center">
              <div className="text-sm md:text-lg font-bold text-gray-900">
                {set.cartPrice && set.cartPrice !== set.price ? (
                  <div className="flex items-center gap-2">
                    <span>{set.cartPrice.toLocaleString("tr-TR")} ₺</span>
                    <span className="line-through text-gray-400 text-xs">
                      {set.price.toLocaleString("tr-TR")} ₺
                    </span>
                    <span className="text-red-500 text-xs flex items-center gap-1">
                      %
                      {Math.round(((set.price - set.cartPrice) / set.price) * 100)}
                      <MdOutlineTrendingDown />
                    </span>
                  </div>
                ) : (
                  <span>{set.price.toLocaleString("tr-TR")} ₺</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Masaüstünde hover ile çıkan buton */}
        <div className="hidden md:flex justify-center items-center px-10 my-2">
          {isAllHovered ? (
            <button
              onClick={handleAddToCart}
              className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium shadow-md cursor-pointer"
            >
              <TbShoppingBagPlus />
              Sepete Ekle
            </button>
          ) : null}
        </div>

        {/* Mobilde sürekli görünen ikonlu buton */}
        <div className="flex md:hidden justify-center items-center py-2">
          <button
            onClick={handleAddToCart}
            className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md"
          >
            <TbShoppingBagPlus size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
