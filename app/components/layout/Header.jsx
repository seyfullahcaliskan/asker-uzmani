"use client";
import Link from "next/link";

import { RiWhatsappFill } from "react-icons/ri";
import { PiPackageFill } from "react-icons/pi";
import { AiTwotoneBank } from "react-icons/ai";
import { LiaLifeRingSolid } from "react-icons/lia";
import { RiUser6Line } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import { navLinks } from "../../navLinks";
import CartDropdown from "./cart/CartDropdown";
import ProductSearch from "./ProductSearch";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div
        className="flex justify-center items-center font-bold text-2xl py-3 bg-center"
        style={{ backgroundImage: "url('/images/kamuflaj_desen.png')" }}
      >
        <span className="animate-blink-white">
          Açılışa Özel Kampanyalı Fiyatlar
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className="flex justify-between py-2 text-[10px]">
          <div className="flex gap-2 items-center hover:cursor-pointer hover:scale-110 transition-all duration-200">
            <a
              href="https://wa.me/905386820112"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2">
                <RiWhatsappFill className="text-2xl text-green-600" />
                <span className="text-[10px] text-green-600 font-bold">
                  0 538 682 01 12
                </span>
              </div>
            </a>

            <div className="text-gray-400 text-lg">|</div>
            <div className="flex items-center gap-2 text-[10px] ">
              <span>Özhan Askeri Malzemeleri - Halil HAN</span>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:cursor-pointer hover:scale-110 transition-all duration-200">
              <PiPackageFill className="text-2xl" />
              <span className="text-[10px]">Sipariş Takip</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:cursor-pointer hover:scale-110 transition-all duration-200">
              <AiTwotoneBank className="text-2xl" />
              <span className="text-[10px]">Banka Hesaplarımız</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:cursor-pointer hover:scale-110 transition-all duration-200">
              <LiaLifeRingSolid className="text-2xl" />
              <span className="text-[10px]">Bize Ulaşın</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 py-2 items-center">
          <div className="flex justify-start font-bold text-lg">
            Özhan Askeri Malzemeleri
          </div>
          <div className="flex justify-center">
            <ProductSearch />
          </div>
          <div className="flex justify-end gap-4 items-center">
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:cursor-pointer hover:scale-110 transition-all duration-200">
              <RiUser6Line className="text-2xl" />
              <span className="text-[10px]">Giriş Yap</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#7F7B59] hover:cursor-pointer hover:scale-110 transition-all duration-200">
              <MdOutlineFavorite className="text-2xl" />
              <span className="text-[10px]">Favorilerim</span>
            </div>
            <div className="text-gray-400 text-lg">|</div>
            <CartDropdown />
          </div>
        </div>

        <div className="flex justify-center items-center gap-0 py-2 mt-2">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex gap-2 items-center">
              <Link
                href={link.href}
                className="relative px-4 font-semibold text-xl text-gray-800 transition-all duration-300 
                           hover:text-[#7F7B59] hover:scale-110"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#7F7B59] transition-all duration-300 group-hover:w-full"></span>
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
