"use client";
import Link from "next/link";
import { MdOutlineTrendingDown } from "react-icons/md";
import { getProductCategorySlug } from "../../navLinks";
import { useCart } from "../../hooks/useCart";
import Image from "next/image";

export default function ProductCard({ set }) {
  const categorySlug = getProductCategorySlug(set);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(set);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-w-[180px] md:min-w-[300px] min-h-[full] mx-auto hover:shadow-lg hover:scale-105 transition-all duration-300">
      {/* Ürün resmi */}
      <Link href={`/${categorySlug}/${set.slug}`}>
        <div className="relative bg-gray-50 cursor-pointer">
          <div className="relative min-w-[100px] md:min-w-[300px] aspect-[4/5]">
            <Image
              src={set?.mainImagePath || set?.images?.[0].path || "/images/no_image.jpg"}
              alt={set.name}
              fill
              className="object-cover rounded-lg transition-opacity duration-300"
            />
          </div>
        </div>
      </Link>

      {/* Ürün adı */}
      <div className="px-1 md:px-3 py-2 space-y-1 md:space-y-2">
        <Link href={`/${categorySlug}/${set.slug}`}>
          <h3 className="text-[9px] md:text-md font-semibold text-gray-700 leading-tight cursor-pointer">
            {set.name}
          </h3>
        </Link>
        {set.price && (
          <div className="w-full justify-center items-center text-center gap-2 text-sm md:text-lg font-bold text-gray-900">
            {set.cartPrice && set.cartPrice !== set.price ? (
              <div className="grid grid-cols-3 items-center w-full">
                <div>
                  <span className="text-sm line-through text-gray-400">
                    {set.price.toLocaleString("tr-TR")}₺
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    %
                    {Math.round(((set.price - set.cartPrice) / set.price) * 100)}
                    <MdOutlineTrendingDown />
                  </span>
                </div>
                <div>
                  <span className="text-sm">{set.cartPrice.toLocaleString("tr-TR")}₺</span>
                </div>
              </div>
            ) : (
              <span>{set.price.toLocaleString("tr-TR")}₺</span>
            )}
          </div>
        )}
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-sm shadow-md flex items-center justify-center gap-4 py-2 font-bold"
      >
        <span>SEPETE EKLE</span>
      </button>
    </div>

  );
}
