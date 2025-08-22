"use client";
import { useState } from "react";
import Link from "next/link";
import {
  RiWhatsappFill,
  RiUser6Line,
  RiShoppingBasketLine,
} from "react-icons/ri";
import { PiPackageFill } from "react-icons/pi";
import { AiTwotoneBank } from "react-icons/ai";
import { LiaLifeRingSolid } from "react-icons/lia";
import { MdOutlineFavorite } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { generalData, navLinks } from "../../navLinks";
import CartDropdown from "./cart/CartDropdown";
import ProductSearch from "./ProductSearch";
import { useCart } from "../../hooks/useCart";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { getTotalItems } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      {/* Kampanya Bandı */}
      <div
        className="flex flex-col justify-center items-center font-bold text-base md:text-2xl py-2 md:py-3 bg-center text-white text-center"
        style={{ backgroundImage: "url('/images/kamuflaj_desen.png')" }}
      >
        <span className="animate-blink-white text-sm md:text-lg">
          Açılışa Özel Kampanyalı Fiyatlar
        </span>
        <span className="animate-blink-white text-sm md:text-lg mt-1 md:mt-2">
          {generalData?.freeCargoPrice}₺ ve Üzeri Alışverişlerde{" "}
          <span className="underline">KARGO ÜCRETSİZ</span>
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto px-4">
        {/* Üst Bar */}
        <div className="flex justify-between py-2 text-[10px]">
          {/* Sol - Telefon & Firma */}
          <div className="flex flex-col sm:flex-row sm:gap-2 items-start sm:items-center">
            <a
              href="https://wa.me/905386820112"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <RiWhatsappFill className="text-xl text-green-600" />
              <span className="text-xs text-green-600 font-bold">
                0 538 682 01 12
              </span>
            </a>
            <span className="hidden sm:block text-gray-400 text-lg">|</span>
            <div className="text-[10px] sm:text-xs">
              Özhan Asker Malzemeleri - Halil HAN
            </div>
          </div>

          {/* Sağ - Masaüstü Menü */}
          <div className="hidden md:flex gap-4 items-center">
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:scale-110 transition-all duration-200">
              <PiPackageFill className="text-xl" />
              <span className="text-[10px]">Sipariş Takip</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:scale-110 transition-all duration-200">
              <AiTwotoneBank className="text-xl" />
              <span className="text-[10px]">Banka Hesaplarımız</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:scale-110 transition-all duration-200">
              <LiaLifeRingSolid className="text-xl" />
              <span className="text-[10px]">Bize Ulaşın</span>
            </div>
          </div>

          {/* Sağ - Mobil Hamburger */}
          <div className="md:hidden flex flex-row gap-4 items-center">
            <Link
              onClick={() => setMenuOpen(false)}
              href="/sepet"
              className="relative p-2 rounded-md shadow-sm inline-block"
            >
              <RiShoppingBasketLine className="text-2xl" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md shadow-sm"
            >
              {menuOpen ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        {/* Mobil Menü */}
        {menuOpen && (
          <div className="md:hidden flex flex-col border-t bg-gray-100 shadow-md divide-y divide-gray-300">
            {navLinks.map((link) => (
              <Link
                onClick={() => setMenuOpen(!menuOpen)}
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[#7F7B59] hover:bg-gray-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Orta Bar */}
        <div className=" md:grid md:grid-cols-3 md:py-2 md:items-center md:gap-2">
          <div className="hidden md:flex font-bold text-base sm:text-lg">
            Özhan Asker Malzemeleri
          </div>
          <div className="col-span-2 md:col-span-1 order-3 md:order-none flex justify-center w-full">
            <ProductSearch />
          </div>
          <div className="hidden md:flex justify-end gap-4 items-center">
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:scale-110 transition-all duration-200">
              <RiUser6Line className="text-xl" />
              <span className="text-[10px]">Giriş Yap</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:scale-110 transition-all duration-200">
              <MdOutlineFavorite className="text-xl" />
              <span className="text-[10px]">Favorilerim</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <CartDropdown />
          </div>
        </div>

        {/* Alt Menü (Desktop) */}
        <div className="hidden md:flex justify-center items-center gap-0 py-2 mt-2">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex gap-2 items-center">
              <Link
                href={link.href}
                className="relative px-4 font-semibold text-lg text-gray-800 transition-all duration-300 hover:text-[#7F7B59] hover:scale-110"
              >
                {link.label}
              </Link>
              {index !== navLinks.length - 1 && (
                <span className="text-gray-400 text-lg">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
