'use client'
import React from "react";

export default function ContactUs() {
  const googleMapsQuery = encodeURIComponent(
    "Özhan Ticaret, Eti, Celal Bayar Blv. No:57 D:8, 06570 Çankaya/Ankara"
  );
  const embedSrc = `https://www.google.com/maps?q=${googleMapsQuery}&output=embed`;
  
  // Koordinat-based universal link:
  const mapsLink = "geo:39.925533,32.866287?q=Özhan Asker Malzemeleri";

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Contact Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">ÖZHAN ASKER MALZEMELERİ</h1>
          <p className="text-sm text-gray-600">(Talip HAN - Halil HAN)</p>

          <div className="pt-2">
            <h2 className="font-medium">Adres</h2>
            <p className="text-gray-700 text-sm">Eti Mah. Celal Bayar Blv. 57 Dk:11-12<br/>Çankaya, Ankara</p>
          </div>

          <div>
            <h2 className="font-medium">Telefon</h2>
            <p className="text-sm">
              <a href="tel:+903122323905" className="underline">Tel: 0312 232 39 05</a>
            </p>
            <p className="text-sm">
              <a href="tel:+905386820112" className="underline">Halil HAN: 0 538 682 01 12</a>
            </p>
          </div>

          <div>
            <h2 className="font-medium">GPS / Harita</h2>
            <p className="text-sm text-gray-700">Haritayı açmak için butona tıklayın veya aşağıdaki gömülü haritaya bakın.</p>
            <div className="mt-3 flex gap-2">
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 rounded-xl border border-gray-200 hover:shadow-sm text-sm"
              >
                Harita Uygulamasında Aç
              </a>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="rounded-lg overflow-hidden border border-gray-100">
          <iframe
            title="Özhan Asker Malzemeleri - Harita"
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ minHeight: 360, border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
