"use client";

import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center gap-6">
      <h1 className="text-3xl font-bold">
        Çok Yakında Tam Anlamıyla Hizmetinizdeyiz!
      </h1>

      <p className="text-lg max-w-3xl">
        Sipariş vermek için öncelikle istediğiniz ürünleri <strong>beden seçerek
          sepetinize ekleyin.</strong> Sepetinizi açtığınızda sizlere kolayca
        kopyalayabileceğiniz <strong>IBAN bilgisi</strong> paylaşılacaktır.
      </p>

      <p className="text-lg max-w-3xl">
        Sepet tutarı kadar ödemeyi ilgili IBAN’a gönderdikten sonra{" "}
        <strong>“Ödemeyi yaptım”</strong> seçeneğini işaretleyin. Ardından{" "}
        <strong>kişisel bilgileriniz ve adres bilgilerinizi</strong> doldurun.
      </p>

      <p className="text-lg max-w-3xl">
        <strong>Siparişi tamamla</strong> dediğiniz anda, hazır sipariş mesajınız
        WhatsApp üzerinden bize iletilebilecek hale gelecektir. Siparişinizi onaylamak için mesajı göndermeniz ve
        dekontunuzu WhatsApp üzerinden paylaşmayı unutmayın.
      </p>

      <h2 className="text-2xl font-bold mt-4">
        <a
          href="https://wa.me/905386820112"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-semibold hover:underline"
        >
          SPRTech Yazılım ve Bilişim Sistemleri
        </a>
      </h2>
    </main>
  );
}
