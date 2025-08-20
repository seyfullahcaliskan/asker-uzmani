"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductCategorySlug } from "../../navLinks";
import { useCart } from "../../hooks/useCart";
import products from "./data/products";
import { TbBasketPlus } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai"; // 🔍 Search ikonunu ekledim
import Image from "next/image";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const filteredProducts =
    query.trim().length > 0
      ? products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const imageOf = (item) =>
    item.isSet ? item.mainImage : item.images?.[0] || "/images/no_image.jpg";

  const needsSizeSelection = (item) => {
    if (item.isSet) {
      return item.product?.some((x) => x.product?.sizes?.length > 0);
    }
    return item.sizes?.length > 0;
  };

  const goDetail = (item) => {
    const categorySlug = getProductCategorySlug(item);
    setIsFocused(false);
    router.push(`/${categorySlug}/${item.slug}`);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative ">
        <input
          type="text"
          placeholder="Tüm Ürünleri Arama"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="w-full border border-gray-300 rounded-lg p-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:cursor-pointer focus:scale-110 transition-all duration-200"
        />
        {/* 🔍 Search ikonu */}
        <AiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
      </div>

      {isFocused && query && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => {
              const categorySlug = getProductCategorySlug(item);

              return (
                <div
                  key={item.id}
                  className="p-2 hover:bg-gray-100 hover:cursor-pointer hover:scale-105 transition-all duration-200 grid grid-cols-10"
                >
                  <Link
                    className="col-span-9"
                    href={`/${categorySlug}/${item.slug}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsFocused(false)}
                  >
                    <div className="grid grid-cols-10 justify-center items-center">
                      <div className="col-span-2">
                        <Image
                          src={imageOf(item) || "/images/no_image.jpg"}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <p className="col-span-5 text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="col-span-2 text-md text-gray-600 text-center">
                        {item.cartPrice || item.price}
                        {item.cartPrice && item.cartPrice !== item.price && (
                          <span className="text-[11px] text-gray-400 line-through ml-2">
                            {item.price}
                          </span>
                        )}
                      </p>
                    </div>
                  </Link>
                  <div
                    className="flex justify-center"
                    onClick={() => handleAddToCart(item)}
                  >
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      className="text-4xl text-orange-600 hover:cursor-pointer hover:scale-110 transition-all duration-200"
                    >
                      <TbBasketPlus />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 p-3">Sonuç bulunamadı</p>
          )}
        </div>
      )}
    </div>
  );
}
