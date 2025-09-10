"use client";

import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { bankAccounts } from "../../config";
import { FiCopy } from "react-icons/fi";

export default function BankTransferCheckout() {
  const {
    cartItems,
    getTotalPrice,
    getCargoFee,
    getTotalWithCargo,
    freeCargoPrice,
  } = useCart();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    tc: "",
    address: "",
  });
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const isInfoComplete = () =>
    Object.values(userInfo).every((val) => val.trim() !== "");

  const formatPrice = (price) => `${price.toLocaleString("tr-TR")}₺`;

  const productTotal = getTotalPrice();
  const cargoFee = getCargoFee();
  const totalWithCargo = getTotalWithCargo();

  // 📝 Mesaj formatlama
  const formatMessage = () => {
    let msg = `📝 Sipariş Bilgilerim:\n`;
    msg += `Ad Soyad: ${userInfo.firstName} ${userInfo.lastName}\n`;
    msg += `Telefon: ${userInfo.phone}\n`;
    msg += `TC: ${userInfo.tc}\n`;
    msg += `Adres: ${userInfo.address}\n`;
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

  const whatsappLink = `https://wa.me/905386820112?text=${encodeURIComponent(
    formatMessage()
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formatMessage());
  };


  return (
    <div className="container mx-auto px-4 py-8">
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Kişisel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Ad"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              placeholder="Soyad"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              placeholder="Telefon"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              placeholder="TC"
              name="tc"
              value={userInfo.tc}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <textarea
            placeholder="Adres"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-4"
          />
          <button
            onClick={() => isInfoComplete() && setStep(2)}
            className={`mt-4 px-6 py-3 rounded text-white ${isInfoComplete()
                ? "bg-[#7F7B59]"
                : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Devam Et
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <h2 className="text-xl font-bold">Sipariş Özeti</h2>

          {/* Kullanıcı Bilgileri */}
          <div className="bg-gray-50 border p-4 rounded text-sm space-y-1">
            <p>
              <strong>Ad Soyad:</strong> {userInfo.firstName}{" "}
              {userInfo.lastName}
            </p>
            <p>
              <strong>Telefon:</strong> {userInfo.phone}
            </p>
            <p>
              <strong>TC:</strong> {userInfo.tc}
            </p>
            <p>
              <strong>Adres:</strong> {userInfo.address}
            </p>
          </div>

          {/* Sepet Bilgileri */}
          <h3 className="font-bold">Ürünler</h3>
          <ul className="space-y-2 font-mono text-sm">
            {cartItems.map((item) => (
              <li key={item.cartId}>
                {item.isSet.id === 1 ? (
                  <>
                    <span>
                      - {item.name} x{item.quantity}
                    </span>
                    <div className="ml-4">
                      {Object.entries(item.selectedSizes || {}).map(
                        ([p, s]) => (
                          <div key={p}>
                            ({p}: {s})
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <span>
                    - {item.name} ({item.selectedSize || "-"}) x{item.quantity}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Ödeme Özeti */}
          <div className="space-y-1 text-right text-sm border-t pt-4">
            <p>Ürün Toplamı: {formatPrice(productTotal)}</p>
            <p>
              Kargo:{" "}
              <span
                className={cargoFee === 0 ? "text-green-600" : "text-red-600"}
              >
                {cargoFee === 0 ? "Ücretsiz" : formatPrice(cargoFee)}
              </span>
            </p>
            {cargoFee > 0 && (
              <p className="text-xs text-gray-500">
                {formatPrice(freeCargoPrice - productTotal)} daha alışveriş
                yaparsanız kargo ücretsiz!
              </p>
            )}
            <p className="text-xl font-extrabold text-red-600">
              Ödemeniz Gereken Tutar: {formatPrice(totalWithCargo)}
            </p>
          </div>

          {/* IBAN Bilgileri */}
          <div className="bg-yellow-50 border p-4 rounded space-y-4">
            <h3 className="font-bold text-lg">
              Ödeme Yapabileceğiniz Hesaplar
            </h3>
            {bankAccounts.map((acc, idx) => (
              <div key={idx} className="space-y-1 border-b last:border-0 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{acc.displayIban}</span>
                  <FiCopy
                    onClick={() => handleCopy(acc.iban)}
                    className="text-gray-600 hover:text-black cursor-pointer"
                    title="IBAN kopyala"
                  />
                </div>
                <div className="flex items-start justify-between text-sm text-black font-mono">
                  <span>{acc.holder}</span>
                  <FiCopy
                    onClick={() => handleCopy(acc.holder)}
                    className="text-gray-600 hover:text-black cursor-pointer"
                    title="İsim kopyala"
                  />
                </div>
                <span className="text-sm text-gray-600">{acc.bank}</span>
              </div>
            ))}
          </div>

          {/* WhatsApp ve Manuel Mesaj */}
          <div className="space-y-2">
            <p className="text-xs text-red-500 text-center">
              Lütfen WhatsApp’tan siparişinizi iletmeden önce ödemenizi
              tamamlayın!
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center px-6 py-3 bg-green-600 text-white rounded-lg font-bold"
            >
              WhatsApp’tan Gönder
            </a>
            <p className="text-xs text-gray-500 text-center">
              Eğer WhatsApp otomatik açılmazsa, aşağıdaki butonla mesajı manuel
              kopyalayabilirsiniz.
            </p>
            <button
              onClick={handleCopy}
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg"
            >
              Mesajı Kopyala
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
