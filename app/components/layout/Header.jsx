"use client";
import Link from "next/link";

import { RiWhatsappFill } from "react-icons/ri";
import { PiPackageFill } from "react-icons/pi";
import { AiTwotoneBank } from "react-icons/ai";
import { LiaLifeRingSolid } from "react-icons/lia";
import { RiUser6Line } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import { RiShoppingBasketLine } from "react-icons/ri";
import { navLinks } from "../../navLinks";
import CartDropdown from "./cart/CartDropdown";
import ProductSearch from "./ProductSearch";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white-400 shadow bg-white">
      {/* Üst bilgi satırı */}
      <div
        className="flex justify-center items-center font-bold text-4xl py-5 bg-center"
        style={{ backgroundImage: "url('/images/kamuflaj_desen.png')" }}
      >
        <span className="animate-blink-white">
          AÇILIŞA ÖZEL KAMPANYALI FİYATLAR
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 ">
        {/* Alt-Üst bilgi satırı */}
        <div className="flex justify-between py-2">
          <div className="flex gap-2">
            <a
              href="https://wa.me/905386820112"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2">
                <RiWhatsappFill className="text-2xl text-green-600" />
                <span className="text-md text-green-600 font-bold">
                  0 538 682 01 12
                </span>
              </div>
            </a>

            <div>|</div>
            <div className="flex items-center gap-2 text-md">
              <span>Özhan Askeri Malzemeleri - Halil HAN</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <PiPackageFill className="text-2xl" />
              <span className="text-md">Sipariş Takip</span>
            </div>
            <div>|</div>
            <div className="flex items-center gap-2">
              <AiTwotoneBank className="text-2xl" />

              <span className="text-md">Banka Hesaplarımız</span>
            </div>
            <div>|</div>
            <div className="flex items-center gap-2">
              <LiaLifeRingSolid className="text-2xl" />
              <span className="text-md">Bize Ulaşın</span>
            </div>
          </div>
        </div>

        {/*Alt-Orta satır */}
        <div className="grid grid-cols-3 py-2 items-center">
          <div className="flex justify-start">Özhan Askeri Malzemeleri</div>
          <div className="flex justify-center">
            <ProductSearch />
          </div>
          <div className="flex justify-end gap-2 items-center">
            <div className="flex items-center gap-2">
              <RiUser6Line className="text-2xl" />
              <span className="text-md">Giriş Yap</span>
            </div>
            <div>|</div>
            <div className="flex items-center gap-2">
              <MdOutlineFavorite className="text-2xl" />
              <span className="text-md">Favorilerim</span>
            </div>
            <div>|</div>
            <CartDropdown />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 py-2 mt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className=" p-4 font-bold text-lg hover:text-2xl hover:font-extrabold hover:text-[#7F7B59] transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
