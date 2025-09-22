"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useCart } from "../hooks/useCart";
import BankTransferCheckout from "../components/layout/BankTransferCheckout";
import OnlinePaymentCheckout from "../components/layout/OnlinePaymentCheckout";
import { getGeneralSettings } from "../utils/axiosInstance";

export default function CheckoutPage() {
  const [generalData, setGeneralData] = useState(null);
  const { cartItems, getTotalPrice, getTotalWithCargo, getCargoFee, freeCargoPrice } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    orderNotes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const general = await getGeneralSettings();
        setGeneralData(general);
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Ad zorunludur";
    if (!formData.lastName) newErrors.lastName = "Soyad zorunludur";
    if (!formData.email) newErrors.email = "E-posta zorunludur";
    if (!formData.phone) newErrors.phone = "Telefon zorunludur";
    if (!formData.address) newErrors.address = "Adres zorunludur";
    if (!formData.city) newErrors.city = "Şehir zorunludur";
    if (!formData.district) newErrors.district = "İlçe zorunludur";
    if (!formData.postalCode) newErrors.postalCode = "Posta kodu zorunludur";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPrice = (price) => {
    if (typeof price === "string") return price;
    return `${price.toLocaleString("tr-TR")}₺`;
  };

  if (!generalData) return <div className="text-center py-12">Yükleniyor...</div>;
  if (cartItems.length === 0)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <RiShoppingBasketLine className="text-6xl text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Sepetiniz Boş</h1>
        <p className="text-gray-600 mb-8">
          Ödeme yapabilmek için sepetinizde ürün bulunmalıdır.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#7F7B59] text-white px-6 py-3 rounded-lg hover:bg-[#6d6849] transition-colors"
        >
          <BiArrowBack /> Alışverişe Devam Et
        </Link>
      </div>
    );
  // Order objesi PayTR için hazırlanıyor
  const order = {
    merchantOid: Date.now().toString(), // backend üretmeli aslında!
    amount: getTotalWithCargo(),
    customerEmail: formData.email,
    customerName: `${formData.firstName} ${formData.lastName}`,
    customerPhone: formData.phone,
    customerAddress: `${formData.address}, ${formData.city}/${formData.district} ${formData.postalCode}`,
    items: cartItems.flatMap((item) => {
      if (item.isSet?.id === 1) {
        return {
          name: `${item.name}`,
          price: item.cartPrice || item.price,
          quantity: item.quantity,
          size: item.selectedSizes || "-",
        };
      } else {
        return {
          name: item.name,
          price: item.cartPrice || item.price,
          quantity: item.quantity,
          size: item?.selectedSize || "-",
        };
      }
    }),
  };
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-start gap-4 mb-8">
        <Link href="/sepet" className="flex items-center gap-2 text-[#7F7B59] hover:text-[#6d6849]">
          <BiArrowBack className="text-xl" /> Sepete Dön
        </Link>
        <h1 className="text-3xl font-bold">Ödeme</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-bold mb-4">Kişisel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["firstName", "lastName", "email", "phone"].map((field, idx) => (
              <div key={idx}>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={
                    field === "firstName" ? "Ad *" :
                      field === "lastName" ? "Soyad *" :
                        field === "email" ? "E-posta *" : "Telefon *"
                  }
                  className={`w-full p-3 border rounded-lg ${errors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4 mt-6">Teslimat Adresi</h2>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            placeholder="Adresinizi giriniz..."
            className={`w-full p-3 border rounded-lg ${errors.address ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {["city", "district", "postalCode"].map((field, idx) => (
              <input
                key={idx}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={
                  field === "city" ? "Şehir *" :
                    field === "district" ? "İlçe *" : "Posta Kodu *"
                }
                className={`w-full p-3 border rounded-lg ${errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Sipariş Özeti & Ödeme */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Sipariş Özeti
            </h2>

            {/* Ürünler */}
            {/* Ürünler */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
              {cartItems.map((item) => (
                <div key={item.cartId} className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-[#7F7B59]">
                      {formatPrice(item.cartPrice || item.price)}
                    </span>
                  </div>

                  {/* Eğer set ürünü ise alt ürünleri listele */}
                  {item.isSet?.id === 1 && (
                    <div className="ml-4 text-xs text-gray-600 space-y-1">
                      {Object.entries(item.selectedSizes || []).map(([subName, size]) => (
                        <div key={subName}>
                          {subName} - Beden: {size}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Normal ürün ise beden göster */}
                  {item.isSet?.id === 0 && item.selectedSize && (
                    <div className="ml-4 text-xs text-gray-600">
                      Beden: {item.selectedSize}
                    </div>
                  )}
                </div>
              ))}
            </div>


            <hr className="my-2 sm:my-3" />

            {/* Fiyat Detayları */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Ürün Toplamı:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo:</span>
                <span
                  className={getCargoFee() === 0 ? "text-green-600" : "text-red-600"}
                >
                  {getCargoFee() === 0 ? "Ücretsiz" : formatPrice(getCargoFee())}
                </span>
              </div>

              {/* Kargo ücretsiz bilgilendirme */}
              {getCargoFee() > 0 && (
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  {formatPrice(freeCargoPrice - getTotalPrice())} daha alışveriş
                  yaparsanız kargo ücretsiz!
                </p>
              )}

              <hr />
              <div className="flex justify-between font-bold text-base sm:text-lg">
                <span>Toplam:</span>
                <span className="text-[#7F7B59]">
                  {formatPrice(getTotalWithCargo())}
                </span>
              </div>
            </div>

            {/* Dinamik Ödeme Yöntemi */}
            <div className="mt-6">
              {generalData?.onlinePayment?.id === 1 ? (
                <OnlinePaymentCheckout order={order} formData={formData} />
              ) : (
                <BankTransferCheckout formData={formData} cartItems={cartItems} />
              )}
            </div>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                <span>🔒</span>
                <span>Güvenli Ödeme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
