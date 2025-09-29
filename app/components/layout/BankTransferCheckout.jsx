"use client";

import { useCart } from "../../hooks/useCart";
import { bankAccounts } from "../../config";
import { FiCopy } from "react-icons/fi";

export default function BankTransferCheckout({ formData, setFormData }) {
  const { cartItems, getTotalPrice, getCargoFee, getTotalWithCargo, freeCargoPrice } = useCart();

  const formatPrice = (price) => `${price.toLocaleString("tr-TR")}₺`;
  const productTotal = getTotalPrice();
  const cargoFee = getCargoFee();
  const totalWithCargo = getTotalWithCargo();

  const formatMessage = () => {
    let msg = `📝 Sipariş Bilgilerim:\n`;
    msg += `Ad Soyad: ${formData.firstName} ${formData.lastName}\n`;
    msg += `Telefon: ${formData.phone}\n`;
    msg += `Adres: ${formData.address}\n`;
    msg += `--------------------\nÜrünler:\n`;

    cartItems.forEach((item) => {
      if (item.isSet.id === 1) {
        msg += `- ${item.name} x${item.quantity}\n`;
        Object.entries(item.selectedSizes || {}).forEach(([p, s]) => {
          msg += `   (${p}: ${s})\n`;
        });
      } else {
        msg += `- ${item.name} (${item.selectedSize || "-"}) x${item.quantity}\n`;
      }
    });

    msg += `--------------------\n`;
    msg += `Ürün Toplamı: ${formatPrice(productTotal)}\n`;
    msg += `Kargo: ${cargoFee === 0 ? "Ücretsiz" : formatPrice(cargoFee)}\n`;
    msg += `Toplam: ${formatPrice(totalWithCargo)}`;
    return msg;
  };

  const whatsappLink = `https://wa.me/905409951216?text=${encodeURIComponent(formatMessage())}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formatMessage());
  };

  // Form alanlarını CheckoutPage’den aldığımız formData ile kullanıyoruz
  const isInfoComplete = () =>
    formData.firstName && formData.lastName && formData.phone && formData.address;

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-bold mb-4">Banka Havalesi ile Ödeme</h2>

      {!isInfoComplete() && (
        <p className="text-red-500 text-sm mb-4">
          Lütfen kişisel bilgilerinizi formu doldurarak tamamlayın.
        </p>
      )}

      {/* Ödeme Özeti */}
      <div className="space-y-1 text-sm border-t pt-4">
        <p>Ürün Toplamı: {formatPrice(productTotal)}</p>
        <p>
          Kargo:{" "}
          <span className={cargoFee === 0 ? "text-green-600" : "text-red-600"}>
            {cargoFee === 0 ? "Ücretsiz" : formatPrice(cargoFee)}
          </span>
        </p>
        {cargoFee > 0 && (
          <p className="text-xs text-gray-500">
            {formatPrice(freeCargoPrice - productTotal)} daha alışveriş yaparsanız kargo ücretsiz!
          </p>
        )}
        <p className="text-xl font-extrabold text-red-600">
          Ödemeniz Gereken Tutar: {formatPrice(totalWithCargo)}
        </p>
      </div>

      {/* IBAN Bilgileri */}
      <div className="bg-yellow-50 border p-4 rounded space-y-4">
        <h3 className="font-bold text-lg">Ödeme Yapabileceğiniz Hesaplar</h3>
        {bankAccounts.map((acc, idx) => (
          <div key={idx} className="space-y-1 border-b last:border-0 py-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{acc.displayIban}</span>
              <FiCopy onClick={handleCopy} className="text-gray-600 hover:text-black cursor-pointer" title="IBAN kopyala" />
            </div>
            <div className="flex items-start justify-between text-sm text-black font-mono">
              <span>{acc.holder}</span>
              <FiCopy onClick={handleCopy} className="text-gray-600 hover:text-black cursor-pointer" title="İsim kopyala" />
            </div>
            <span className="text-sm text-gray-600">{acc.bank}</span>
          </div>
        ))}
      </div>

      {/* WhatsApp ve Manuel Mesaj */}
      <div className="space-y-2">
        <p className="text-xs text-red-500 text-center">
          Lütfen WhatsApp’tan siparişinizi iletmeden önce ödemenizi tamamlayın!
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full block text-center px-6 py-3 rounded-lg font-bold ${isInfoComplete() ? "bg-green-600 text-white" : "bg-gray-400 cursor-not-allowed"}`}
        >
          WhatsApp’tan Gönder
        </a>
        <p className="text-xs text-gray-500 text-center">
          Eğer WhatsApp otomatik açılmazsa, aşağıdaki butonla mesajı manuel kopyalayabilirsiniz.
        </p>
        <button
          onClick={handleCopy}
          className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg"
        >
          Mesajı Kopyala
        </button>
      </div>
    </div>
  );
}
