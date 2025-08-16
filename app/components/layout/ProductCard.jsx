"use client";
import Link from "next/link";
import { useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdOutlineTrendingDown } from "react-icons/md";

export default function ProductCard({ set }) {
  const [isAllHovered, setIsAllHovered] = useState(false);
  const [isDetailHovered, setIsDetailHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
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
          <Link href={`/askerlik-setleri/${set.slug}`}>
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
                  className={`w-3 h-3 ${i < Math.floor(set.rating)
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
                      <div className="text-2xl font-bold">{set.cartPrice}</div>
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
          <button className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium shadow-md cursor-pointer">
            <TbShoppingBagPlus />
            Sepete Ekle
          </button>
        ) : null}
      </div>
    </div>
  );
}
