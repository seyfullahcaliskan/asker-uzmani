"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductCategorySlug } from "../../navLinks";
import { useCart } from "../../hooks/useCart";
import { TbBasketPlus } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import { getProducts } from "../../utils/axiosInstance";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res));

    // Ekran genişliğini dinle
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredProducts =
    query.trim().length > 0
      ? (products?.data || products || []).filter((p) =>
          p.name?.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // Gösterilecek ürün sayısı (mobile=2, desktop=4)
  const itemsPerPage = isMobile ? 2 : 4;

  // Gösterilecek ürünler (sayfalama)
  const paginatedProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const imageOf = (item) => {
    return item.isSet?.id === 1
      ? item.mainImagePath
      : item.images?.[0]?.path || "/images/no_image.jpg";
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setIsFocused(false);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
  };

  const prevPage = () => {
    setCurrentPage((prev) =>
      prev - 1 >= 0 ? prev - 1 : totalPages - 1
    );
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Arama kutusu */}
      <div className="relative flex items-center border border-[#7F7B59] rounded-3xl overflow-hidden">
        <input
          type="text"
          placeholder="Arama"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(0); // arama değişince başa dön
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
        />
        <button
          type="button"
          className="bg-[#7F7B59] text-white p-1 rounded-full mr-2 hover:bg-[#505034] transition-colors"
        >
          <AiOutlineSearch className="text-lg" />
        </button>
      </div>

      {/* Arama Sonuçları */}
      {isFocused && query && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {paginatedProducts.length > 0 ? (
            <>
              {paginatedProducts.map((item) => {
                const categorySlug = getProductCategorySlug(item);
                return (
                  <div
                    key={item.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer transition-all duration-150 grid grid-cols-10 border-t border-gray-200"
                  >
                    <Link
                      className="col-span-9"
                      href={`/${categorySlug}/${item.slug}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setIsFocused(false)}
                    >
                      <div className="grid grid-cols-10 items-center gap-2">
                        {/* Sabit boyutlu resim container */}
                        <div className="col-span-2">
                          <div className="relative w-16 h-16">
                            <Image
                              src={imageOf(item) || "/images/no_image.jpg"}
                              alt={item.name}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                        </div>

                        {/* Ürün adı */}
                        <p className="col-span-5 text-xs md:text-sm font-medium truncate">
                          {item.name}
                        </p>

                        {/* Fiyat */}
                        <p className="col-span-2 text-xs md:text-md text-gray-600 text-center font-bold">
                          {item.cartPrice && item.cartPrice !== item.price ? (
                            <>
                              {item.cartPrice}₺
                              <span className="block text-[10px] text-gray-400 line-through">
                                {item.price}₺
                              </span>
                            </>
                          ) : (
                            <>{item.price}₺</>
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
                        className="text-3xl md:text-4xl text-orange-600 hover:scale-105 transition-all duration-150"
                      >
                        <TbBasketPlus />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Sayfalama butonları */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center p-2 text-xs">
                  <button
                    onClick={prevPage}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Önceki
                  </button>
                  <span>
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Sonraki
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500 p-3">Sonuç bulunamadı</p>
          )}
        </div>
      )}
    </div>
  );
}
