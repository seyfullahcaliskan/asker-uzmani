"use client";

import { useState, useMemo } from "react";
import products from "../components/layout/data/products";
import ProductCard from "../components/layout/ProductCard";
import PriceFilter from "../components/layout/PriceFilter";

export default function Products() {
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

    // Statik fiyat aralıkları
    const priceRanges = [
        { label: "0₺ - 500₺", min: 0, max: 500 },
        { label: "500₺ - 1000₺", min: 500, max: 1000 },
        { label: "1000₺ - 2000₺", min: 1000, max: 2000 },
        { label: "2000₺ ve üzeri", min: 2000, max: Infinity },
    ];

    // Fiyat parse etme fonksiyonu
    const parsePrice = (priceString) => {
        return parseInt(priceString.replace(/[₺,]/g, ""));
    };

    // İlk önce sadece isSet = 1 olan ürünleri alıyoruz
    const sets = useMemo(() => {
        return products.filter((p) => p.category === "Tekstil");
    }, []);

    // Filtrelenmiş ürünler
    const filteredSets = useMemo(() => {
        if (!selectedPriceRange) return sets;

        return sets.filter((set) => {
            const price = parsePrice(set.price);
            return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
        });
    }, [selectedPriceRange, sets]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Tekstil</h1>

            <div className="grid grid-cols-4 gap-8">
                {/* Sol Taraf - Filtre Alanı */}
                <div className="col-span-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-lg mb-4">Filtreler</h3>

                        <PriceFilter
                            priceRanges={priceRanges}
                            onFilterChange={setSelectedPriceRange}
                            selectedRange={selectedPriceRange}
                        />
                        <p className="text-gray-600 mb-4 text-end">
                            {filteredSets.length} ürün bulundu
                        </p>
                    </div>
                </div>

                {/* Sağ Taraf - Ürün Alanı */}
                <div className="col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSets.map((set) => (
                            <ProductCard key={set.slug} set={set} />
                        ))}
                    </div>

                    {filteredSets.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Bu fiyat aralığında ürün bulunamadı.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
