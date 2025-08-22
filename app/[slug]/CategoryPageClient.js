"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import PriceFilter from "../components/layout/PriceFilter";
import ProductCard from "../components/layout/ProductCard";
import products from "../components/layout/data/products";
import { getCategoryBySlug } from "../navLinks";

export default function CategoryPageClient({ slug }) {
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const categoryInfo = getCategoryBySlug(slug);

  const priceRanges = [
    { label: "0₺ - 500₺", min: 0, max: 500 },
    { label: "500₺ - 1000₺", min: 500, max: 1000 },
    { label: "1000₺ - 2000₺", min: 1000, max: 2000 },
    { label: "2000₺ ve üzeri", min: 2000, max: Infinity },
  ];

  const parsePrice = (priceString) =>
    parseInt(priceString.replace(/[₺,]/g, ""));

  if (!categoryInfo) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Kategori bulunamadı
          </h1>
          <p className="text-gray-600">Aradığınız kategori mevcut değil.</p>
        </div>
      </div>
    );
  }

  const categoryProducts = useMemo(() => {
    if (categoryInfo.filterBy === "isSet") {
      return products.filter((p) => p.isSet);
    } else if (categoryInfo.filterBy === "category") {
      return products.filter(
        (p) => p.category === categoryInfo.category && !p.isSet
      );
    }
    return [];
  }, [categoryInfo]);

  const filteredProducts = useMemo(() => {
    if (!selectedPriceRange) return categoryProducts;
    return categoryProducts.filter((product) => {
      const price = parsePrice(product.price);
      return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
    });
  }, [selectedPriceRange, categoryProducts]);

  return (
    <div className="px-4 lg:px-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
        {categoryInfo.label}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Filtreler</h3>
            <PriceFilter
              priceRanges={priceRanges}
              onFilterChange={setSelectedPriceRange}
              selectedRange={selectedPriceRange}
            />
            <p className="text-gray-600 mt-2 text-right">
              {filteredProducts.length} ürün bulundu
            </p>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} set={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Bu kategoride ürün bulunamadı.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
