"use client";

import { useEffect, useState, useRef } from "react";
import { getNavLinks, getProducts } from "./utils/axiosInstance";
import ProductCard from "./components/layout/ProductCard";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaMoneyCheck, FaWhatsapp } from "react-icons/fa";
import { CiGift } from "react-icons/ci";
import { GoPackage } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { TbClick } from "react-icons/tb";

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

  const Slider = ({ items }) => {
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    const scroll = (direction) => {
      if (!sliderRef.current) return;
      const { clientWidth, scrollLeft, scrollWidth } = sliderRef.current;

      const step = clientWidth * 0.5; // 2 ürün atlamak için (yaklaşık yarım ekran)
      if (direction === "right") {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
        }
      } else {
        if (scrollLeft <= 0) {
          sliderRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
        }
      }
    };

    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      const setRandomInterval = () => {
        const randomDelay = Math.floor(Math.random() * 2000) + 4000; // 3000-6000 ms arası
        intervalRef.current = setTimeout(() => {
          scroll("right");
          setRandomInterval(); // tekrar kur
        }, randomDelay);
      };

      setRandomInterval();
    };

    useEffect(() => {
      if (!sliderRef.current) return;
      const isMobile = window.innerWidth < 768;
      const limit = isMobile ? 2 : 4;
      if (items.length <= limit) return;

      startAutoScroll();

      return () => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    }, [items]);

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
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
        >

          {items.map((product) => (
            <div key={product.slug} className="snap-start">
              <ProductCard set={product} disableHoverEffect />
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
    <div className="mx-auto space-y-4 md:space-y-8 px-4 md:px-8">
      {/* Üst Tablar */}
      <div className="grid grid-cols-2 md:grid-cols-4 text-white gap-2 space-y-4">
        <Link
          href="https://wa.me/905409951216"
          className="grid grid-cols-4 bg-green-500 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 h-full"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geç"
          target="_blank" // WhatsApp linkini yeni sekmede açmak için
        >
          <div className="col-span-1 text-3xl md:text-5xl flex justify-center items-center">
            <FaWhatsapp />
          </div>
          <div className="col-span-3 flex flex-col justify-center items-center text-center">
            <div className="flex f gap-1">
              <span className="font-bold">WHATSAPP </span>
              <TbClick className="text-xl" />
            </div>
            <span className="text-xs md:text-md">Kolay Sipariş İçin Tıklayınız</span>
          </div>
        </Link>
        <div className="grid grid-cols-4 bg-orange-500 p-2 rounded-lg shadow-lg h-full">
          <div className="col-span-1 text-3xl md:text-5xl flex justify-center items-center">
            <CiGift />
          </div>
          <div className="col-span-3 flex flex-col justify-center items-center text-center">
            <span className="font-bold">Ücretsiz Kargo</span>
            <span className="text-xs md:text-md">
              3000₺ ve Üzeri Alışverişlerde
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4 bg-blue-500 p-2 rounded-lg shadow-lg h-full">
          <div className="col-span-1 text-3xl md:text-5xl flex justify-center items-center">
            <FaMoneyCheck />
          </div>
          <div className="col-span-3 flex flex-col justify-center items-center text-center">
            <span className="font-bold">Kolay Ödeme</span>
            <span className="text-xs md:text-md">
              Kredi kartı ile 12 AY TAKSİT İmkanı !
            </span>
          </div>
        </div>
        <Link
          href="/kendi-setini-hazirla"
          className="grid grid-cols-4 bg-red-500 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 h-full"
          rel="noopener noreferrer"
          aria-label="Kendi Setinizi Hazırlayın !"
        >
          <div className="col-span-1 text-3xl md:text-5xl flex justify-center items-center">
            <GoPackage />
          </div>
          <div className="col-span-3 flex flex-col justify-center items-center text-center">
            <div className="flex f gap-1">
              <span className="font-bold">Sen Seç </span>
              <TbClick className="text-xl" />
            </div>
            <span className="text-xs md:text-md">
              Avantajlı fiyatlarla setini oluştur !
            </span>
          </div>
        </Link>
      </div>

      {/* Kategori Kutuları */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
        {[
          { title: "Askerlik Setleri", href: 'askerlik-setleri', image: "/images/kendi-setin.png" },
          { title: "Tekstil", href: 'tekstil', image: "https://www.askerigiyim.com/wp-content/uploads/2022/11/asker-malzemeleri-ana-sayfa-banner.jpg" },
          { title: "Çanta", href: 'canta', image: "https://cdn.qukasoft.com/f/599098/b3NDVUoyVTArYkI4Tmk4Z1RvTTZKYms9/i/6561be4e6f410-20182597-sw427sh427.webp" },
          { title: "Yardımcı Ürünler", href: 'yardimci-urunler', image: "https://st2.depositphotos.com/3423429/11947/v/450/depositphotos_119479396-stock-illustration-personal-care-set.jpg" },
        ].map((item, index) => (
          <Link
            key={index}
            className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer min-h-[100px] md:min-h-[200px] hover:scale-105 transition-transform duration-200"
            href={item.href}
            rel="noopener noreferrer"
            aria-label={item.title}
          >
            {/* Arka plan görseli */}
            <div className="absolute inset-0 z-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Alt bilgi barı */}
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-80 z-10 flex justify-between items-center px-4 py-2 " style={{ backgroundImage: "url('/images/kamuflaj-desen.jpg')" }}>
              <span className="text-[10px] md:text-sm font-bold">{item.title}</span>
              <span className="text-[8px] md:text-xs underline font-bold">Ürünleri İncele</span>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="flex flex-col justify-center items-center font-bold text-base md:text-2xl py-2 md:py-3 bg-center text-white text-center"
      //style={{ backgroundImage: "url('/images/kamuflaj_desen.png')" }}
      >
        <div className="max-w-7xl mx-auto p-2 flex flex-col items-center justify-center text-center">
          <Link
            href="/kendi-setini-hazirla"
            className="flex items-center justify-center gap-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 animate-blink-white px-12 py-4 rounded-xl text-xs md:text-2xl font-bold shadow-lg shadow-orange-300 hover:shadow-orange-500 hover:scale-105 transition-all duration-300"
          >
            <span>Avantajlı Fiyatlarla Kendi Setini Hazırla !</span>
            <TbClick className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Setler */}
      {setCategory && products.some((p) => p.isSet?.id === 1) && (
        <div className="px-2 border-b-1 border-gray-300">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold">{setCategory.name}</h2>
          </div>
          <p className="text-center text-2xl uppercase text-gray-700 font-bold border-b-1 border-gray-300 my-4">
            ___ {setCategory.label} ___
          </p>
          <Slider items={products.filter((p) => p.isSet?.id === 1)} />
        </div>
      )}

      {/* Normal kategoriler */}
      {normalCategories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category === category.category
        );

        if (!categoryProducts.length) return null;

        return (
          <div key={category.slug} className="px-2">
            <p className="text-center text-2xl uppercase text-gray-700 font-bold border-b-1 border-gray-300 mb-4">
              ___ {category.label} ___
            </p>
            <Slider items={categoryProducts} />
          </div>
        );
      })}
    </div>
  );
}
