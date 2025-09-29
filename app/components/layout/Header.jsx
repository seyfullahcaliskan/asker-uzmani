"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiWhatsappFill,
  RiShoppingBasketLine,
} from "react-icons/ri";
import { PiPackageFill } from "react-icons/pi";
import { AiTwotoneBank } from "react-icons/ai";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import CartDropdown from "./cart/CartDropdown";
import ProductSearch from "./ProductSearch";
import { useCart } from "../../hooks/useCart";
import { getGeneralSettings, getNavLinks } from "../../utils/axiosInstance";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { TbClick } from "react-icons/tb";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const [navLinks, setNavLinks] = useState([]);
  const [generalData, setGeneralData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [links, general] = await Promise.all([
          getNavLinks(),
          getGeneralSettings(),
        ]);
        setNavLinks(Array.isArray(links) ? links : []);
        setGeneralData(general || {});
      } catch (err) {
        console.error("Header data fetch error:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      {/* <div
        className="flex flex-col justify-center items-center font-bold text-base md:text-2xl py-2 md:py-3 bg-center text-white text-center"
        style={{ backgroundImage: "url('/images/kamuflaj_desen.png')" }}
      >
        <div className="max-w-7xl mx-auto p-2 flex flex-col items-center justify-center text-center">
          <Link
            href="/kendi-setini-hazirla"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 animate-blink-white px-8 py-3 rounded-2xl text-xs md:text-md font-bold shadow-lg shadow-orange-300 hover:shadow-orange-500 hover:scale-105 transition-all duration-300"
          >
            <span>AVANTAJLI FİYATLARLA KENDİ SETİNİ HAZIRLA!</span>
            <TbClick className="text-xl" />
          </Link>
        </div>
      </div> */}
      {/* Kampanya Bandı */}
      <div className="hidden md:flex flex-col">
        <div
          className="flex flex-col justify-center items-center font-bold text-base md:text-2xl py-2 md:py-3 bg-center text-white text-center"
          style={{ backgroundImage: "url('/images/kamuflaj-desen.jpg')" }}
        >
          <span className="animate-blink-white text-sm md:text-lg">
            Açılışa Özel Kampanyalı Fiyatlar
          </span>
          {generalData?.freeCargoPrice && (
            <span className="animate-blink-white text-sm md:text-lg mt-1 md:mt-2">
              {generalData.freeCargoPrice}₺ ve Üzeri Alışverişlerde{" "}
              <span className="underline">KARGO ÜCRETSİZ</span>
            </span>
          )}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-2 md:px-4">
        {/* Üst Bar */}
        <div className="flex justify-between text-[10px] h-[50px]">
          {/* Sol */}
          <div className="hidden md:flex md:flex-row md:justify-start md:items-center gap-2">
            <a
              href="https://wa.me/905409951216"
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
              Whatsapp Destek Hattı
            </div> 
          </div>

          {/* Sağ - Masaüstü Menü */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/siparis-takip">
              <div className="flex items-center gap-2 cursor-pointer hover:text-green-800 hover:scale-110 transition-all duration-200">
                <PiPackageFill className="text-xl" />
                <span className="text-[10px]">Sipariş Takip</span>
              </div>
            </Link>
            <div className="text-gray-400 text-lg">|</div>
            <Link href="/banka-hesaplarimiz">
              <div className="flex items-center gap-2 cursor-pointer hover:text-green-800 hover:scale-110 transition-all duration-200">
                <AiTwotoneBank className="text-xl" />
                <span className="text-[10px]">Banka Hesaplarımız</span>
              </div>
            </Link>
            <div className="text-gray-400 text-lg">|</div>
            <Link href="/bize-ulasin">
              <div className="flex items-center gap-2 cursor-pointer hover:text-green-800 hover:scale-110 transition-all duration-200">
                <AiTwotoneBank className="text-xl" />
                <span className="text-[10px]">Bize Ulaşın</span>
              </div>
            </Link>
          </div>

          {/* Mobil Hamburger */}
          <div className="w-full md:hidden flex justify-between gap-4 items-center py-2">
            <button
              onClick={() => setMenuOpen(true)}
            >
              <HiOutlineMenu className="text-2xl" />
            </button>

            <Image src="/images/logo.png" alt="logo" width={45} height={15} />

            <Link
              onClick={() => setMenuOpen(false)}
              href="/sepet"
              className="relative p-2 inline-block"
            >
              <RiShoppingBasketLine className="text-2xl" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Masaüstü Arama & Sepet */}
        <div className=" md:grid md:grid-cols-3 md:items-center md:gap-2 h-[50px]">
          <div className="hidden md:flex font-bold text-base sm:text-lg justify-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={250}
              height={50}
              className="w-[250px] h-[50px] object-contain"
            />
          </div>
          <div className="col-span-2 md:col-span-1 order-3 md:order-none flex justify-center w-full">
            <ProductSearch />
          </div>
          <div className="hidden md:flex justify-end gap-4 items-center">
            <CartDropdown />
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center gap-0 py-2 mt-2">
          {Array.isArray(navLinks) &&
            navLinks.map((link, index) => (
              <div key={link.href} className="flex gap-2 items-center">
                <Link
                  href={link.href}
                  className="relative px-4 font-bold text-lg text-gray-800 transition-all duration-300 hover:text-green-800 hover:scale-110 uppercase"
                >
                  {link.label}
                </Link>
                {index !== navLinks.length - 1 && (
                  <span className="text-gray-400 text-lg">|</span>
                )}
              </div>
            ))}
        </div>


        {/* ----- SLIDE MENU ----- */}
        <div
          className={`fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          onClick={() => setMenuOpen(false)}
        ></div>

        <div
          className={`fixed top-0 left-0 h-full w-full bg-white shadow-xl z-[1000] transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center p-4 border-b text-white bg-green-800">
            <div className="flex gap-2 items-center">
              <HiOutlineMenu className="text-3xl" />
              <h2 className="ml-4 text-2xl font-bold">Menü</h2>
            </div>
            <button onClick={() => setMenuOpen(false)}>
              <HiOutlineX className="text-2xl" />
            </button>
          </div>
          <nav className="flex flex-col">
            {Array.isArray(navLinks) &&
              navLinks.map((link) => (
                <div key={link.href} className="flex justify-between items-center border-b border-gray-200 px-4 py-2 mt-2">
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-md hover:text-green-800"
                  >
                    {link.label}
                  </Link>
                  <FaChevronRight className="text-gray-400 text-lg" />
                </div>
              ))}
            <div key="banka-hesaplarimiz" className="flex justify-between items-center border-b border-gray-200 px-4 py-2 mt-2">
              <Link
                onClick={() => setMenuOpen(!menuOpen)}
                key="/banka-hesaplarimiz"
                href="/banka-hesaplarimiz"
                className="text-md hover:text-green-800"              >
                Banka Hesaplarımız
              </Link>
              <FaChevronRight className="text-gray-400 text-lg" />
            </div>
            <div key="siparis-takip" className="flex justify-between items-center border-b border-gray-200 px-4 py-2 mt-2">
              <Link
                onClick={() => setMenuOpen(!menuOpen)}
                key="/siparis-takip"
                href="/siparis-takip"
                className="text-md hover:text-green-800"            >
                Sipariş Takip
              </Link>
              <FaChevronRight className="text-gray-400 text-lg" />
            </div>
            <div key="bize-ulasin" className="flex justify-between items-center border-b border-gray-200 px-4 py-2 mt-2">
              <Link
                onClick={() => setMenuOpen(!menuOpen)}
                key="/bize-ulasin"
                href="/bize-ulasin"
                className="text-md hover:text-green-800"            >
                Bize Ulaşın
              </Link>
              <FaChevronRight className="text-gray-400 text-lg" />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
