"use client";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center px-6 text-center gap-6">
      <h1 className="text-lg md:text-3xl font-bold">
        Sipariş Süreci Hakkında Bilgilendirme
      </h1>

      <p className="md:text-lg max-w-3xl ">
        Sipariş vermek için öncelikle istediğiniz ürünleri{" "}
        <strong>beden seçerek sepetinize ekleyin.</strong>
      </p>

      <p className="md:text-lg max-w-3xl">
        Ardından <strong>sepetinize gidin</strong> ve{" "}
        <strong>“Ödemeye Geç”</strong> butonuna tıklayın.
      </p>

      <p className="md:text-lg max-w-3xl">
        Açılan ekranda <strong>kişisel bilgilerinizi ve adresinizi</strong>{" "}
        doldurmanız gerekmektedir.
      </p>

      <p className="md:text-lg max-w-3xl">
        Sonrasında sizlerle{" "}
        <strong>ödeme yapabileceğiniz IBAN bilgileri</strong> paylaşılacaktır.{" "}
        <br />
        Sepet tutarınız kadar ödemeyi ilgili IBAN’a göndermelisiniz.
      </p>

      <p className="md:text-lg max-w-3xl">
        Ödeme sonrasında <strong>“WhatsApp’tan Gönder”</strong> butonuna
        tıklayarak hazır sipariş mesajınızı bize iletebilirsiniz. <br />
        Eğer WhatsApp otomatik açılmazsa, <strong>“Mesajı Kopyala”</strong>{" "}
        seçeneğini kullanarak sipariş mesajınızı manuel olarak
        gönderebilirsiniz.
      </p>

      <p className="md:text-lg max-w-3xl">
        Son olarak, <strong>dekontunuzu WhatsApp üzerinden paylaşmayı</strong>{" "}
        unutmayın. Ödemeniz onaylandığında siparişiniz{" "}
        <strong>hazırlanıp en kısa sürede adresinize gönderilecektir.</strong>
      </p>

      <strong>Saygılarımızla...</strong>
      <strong>Özhan Asker Malzemeleri</strong>
    </main>
  );
}
