"use client";

import { useEffect, useState, useRef } from "react";
import { getNavLinks, getProducts } from "./utils/axiosInstance";
import ProductCard from "./components/layout/ProductCard";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Home() {
  const [navLinks, setNavLinks] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const navData = await getNavLinks();
        const productData = await getProducts();
        setNavLinks(navData);
        setProducts(productData);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p className="text-center py-10">Yükleniyor...</p>;

  const setCategory = navLinks.find(
    (link) => link.filterBy === "isSet" && link.isHomePage?.id !== 1
  );
  const normalCategories = navLinks.filter(
    (link) => link.filterBy === "category" && link.isHomePage?.id !== 1
  );

  // Reusable slider
  const Slider = ({ items }) => {
    const sliderRef = useRef(null);

    const scroll = (direction) => {
      if (!sliderRef.current) return;
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    };

    return (
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex items-center justify-center absolute -left-[60px] top-1/2 -translate-y-1/2 z-20 bg-transparent hover:shadow-md p-2 rounded-full hover:bg-gray-100"
        >
          <BiChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
        >
          {items.map((product) => (
            <div key={product.slug} className="snap-start">
              <ProductCard set={product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex items-center justify-center absolute -right-[60px] top-1/2 -translate-y-1/2 z-20 bg-transparent hover:shadow-md p-2 rounded-full hover:bg-gray-100"
        >
          <BiChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-16 px-4 md:px-8">
      {/* Setler */}
      {setCategory && products.some((p) => p.isSet?.id === 1) && (
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{setCategory.name}</h2>
            {setCategory.label && (
              <p className="text-lg text-gray-500">{setCategory.label}</p>
            )}
          </div>
          <Slider items={products.filter((p) => p.isSet?.id === 1)} />
        </div>
      )}

      {/* Normal kategoriler */}
      {normalCategories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category.category
        );

        if (!categoryProducts.length) return null; // ürün yoksa render etme

        return (
          <div key={category.slug}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              {category.label && (
                <p className="text-lg text-gray-500">{category.label}</p>
              )}
            </div>
            <Slider items={categoryProducts} />
          </div>
        );
      })}
    </div>
  );
}
