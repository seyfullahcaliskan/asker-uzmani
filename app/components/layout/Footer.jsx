"use client";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";

const footerSections = [
  {
    title: "MODELLER",
    items: [
      "TOURING",
      "SCOOTER",
      "CUB",
      "KLASİK",
      "CHOPPER",
      "CROSS",
      "TİCARİ",
      "OFF ROAD",
      "T1 / T3",
      "E-SCOOTER",
      "E-TECHNOLOGY",
      "E-CAR",
    ],
  },
  {
    title: "BAYİ & SERVİS",
    items: ["BAYİ&SERVİS AĞI", "BAYİ & SERVİS POLİTİKAMIZ"],
  },
  {
    title: "HAKKIMIZDA",
    items: [
      "HAKKIMIZDA",
      "MİSYONUMUZ & VİZYONUMUZ & İLKELERİMİZ",
      "DEĞERLERİMİZ",
      "KALİTE & ÇEVRE POLİTİKAMIZ",
      "K.V.K.K. BİLGİLENDİRME METNİ",
    ],
  },
  {
    title: "MEDYA",
    items: ["HABERLER", "DUYURULAR"],
  },
  {
    title: "BAĞLANTILAR",
    items: ["SERVİS", "E-TİCARET"],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <footer className="bg-white text-black pt-12 border-t border-black cabin">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* {footerSections.map((section, index) => (
          <div key={index}>
            <h3
              className="font-bold mb-2 teko text-2xl cursor-pointer md:cursor-default flex items-center justify-between md:block"
              onClick={() => toggle(index)}
            >
              {section.title}
              <span className="md:hidden text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </h3>

            <ul
              className={`space-y-1 text-gray-700 transition-all duration-300 ease-in-out ${
                openIndex === index ? "block" : "hidden"
              } md:block`}
            >
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
      <div className="flex justify-center gap-5 text-md text-gray-600">
        {/* <a
                    //href="https://www.instagram.com/umermotors.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaFacebook className="text-3xl" />
                </a> */}
        {/* <a
          href="https://www.instagram.com/umermotors.tr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-3xl" />
        </a> */}
        <a
          href="https://wa.me/905386820112"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
        <a href="tel:+905386820112">
          <FaPhone className="text-2xl" />
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <hr className="border-t border-black mt-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 mt-4 pb-6 gap-2">
          {/* <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start">
            <a href="#" className="hover:underline">
              Fiyat Listesi
            </a>
            <a href="#" className="hover:underline">
              İletişim
            </a>
            <a href="#" className="hover:underline">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:underline">
              Çerezler
            </a>
            <a href="#" className="hover:underline">
              Web Sitesi Hüküm ve Koşulları
            </a>
          </div> */}
          <p>© 2025 Özhan Asker Malzemeleri </p>
        </div>

        <div className="flex justify-center md:text-md text-gray-600 pb-6">
          <p>
            Bu web sitesi{" "}
            <a
              href="https://wa.me/905325999867"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold hover:underline"
            >
              SPRTech
            </a>{" "}
            tarafından hazırlanmaktadır.
          </p>
        </div>
      </div>
    </footer>
  );
}
