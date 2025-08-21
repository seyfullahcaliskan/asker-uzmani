"use client";
import { useState } from "react";

export default function PriceFilter({
  priceRanges,
  onFilterChange,
  selectedRange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRangeSelect = (range) => {
    onFilterChange(range);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6 w-full">
      {/* Seçim Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 rounded px-4 py-2 flex items-center justify-between w-full lg:min-w-[200px] hover:border-gray-400 transition"
      >
        <span className="truncate text-sm md:text-base">
          {selectedRange ? selectedRange.label : "Fiyat Aralığı Seçin"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Seçim Listesi */}
      {isOpen && (
        <div
          className={`
            absolute lg:top-full lg:left-0 mt-1 
            bg-white border border-gray-300 rounded shadow-lg z-20
            w-full lg:min-w-[200px]
          `}
        >
          <button
            onClick={() => handleRangeSelect(null)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm md:text-base"
          >
            Tümü
          </button>
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handleRangeSelect(range)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition border-t border-gray-100 text-sm md:text-base"
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
