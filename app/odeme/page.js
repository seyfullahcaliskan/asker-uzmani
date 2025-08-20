"use client";

import { useState } from "react";
import Link from "next/link";
import { BiArrowBack, BiCheck } from "react-icons/bi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useCart } from "../hooks/useCart";

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Adres Bilgileri
    address: "",
    city: "",
    district: "",
    postalCode: "",

    // Ödeme Bilgileri
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",

    // Fatura Bilgileri
    billingSame: true,
    billingAddress: "",
    billingCity: "",
    billingDistrict: "",
    billingPostalCode: "",

    // Notlar
    orderNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return price;
    }
    return `${price.toLocaleString("tr-TR")}₺`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Hata mesajını temizle
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "Ad zorunludur";
      if (!formData.lastName) newErrors.lastName = "Soyad zorunludur";
      if (!formData.email) newErrors.email = "E-posta zorunludur";
      if (!formData.phone) newErrors.phone = "Telefon zorunludur";
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = "Adres zorunludur";
      if (!formData.city) newErrors.city = "Şehir zorunludur";
      if (!formData.district) newErrors.district = "İlçe zorunludur";
      if (!formData.postalCode) newErrors.postalCode = "Posta kodu zorunludur";
    }

    if (step === 3 && formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber)
        newErrors.cardNumber = "Kart numarası zorunludur";
      if (!formData.cardName)
        newErrors.cardName = "Kart üzerindeki isim zorunludur";
      if (!formData.expiryDate)
        newErrors.expiryDate = "Son kullanma tarihi zorunludur";
      if (!formData.cvv) newErrors.cvv = "CVV zorunludur";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsProcessing(true);

    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
      alert("Siparişiniz başarıyla alındı! Teşekkür ederiz.");
      clearCart();
      setIsProcessing(false);
      // Başarı sayfasına yönlendir
      window.location.href = "/siparis-basarili";
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <RiShoppingBasketLine className="text-6xl text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Sepetiniz Boş
          </h1>
          <p className="text-gray-600 mb-8">
            Ödeme yapabilmek için sepetinizde ürün bulunmalıdır.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#7F7B59] text-white px-6 py-3 rounded-lg hover:bg-[#6d6849] transition-colors"
          >
            <BiArrowBack />
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Kişisel Bilgiler", completed: currentStep > 1 },
    { number: 2, title: "Adres Bilgileri", completed: currentStep > 2 },
    { number: 3, title: "Ödeme", completed: currentStep > 3 },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-start gap-4 mb-8">
        <Link
          href="/sepet"
          className="flex items-center gap-2 text-[#7F7B59] hover:text-[#6d6849] transition-colors"
        >
          <BiArrowBack className="text-xl" />
          Sepete Dön
        </Link>
        <h1 className="text-3xl font-bold">Ödeme</h1>
      </div>

      {/* Adım Göstergesi */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : currentStep === step.number
                  ? "bg-[#7F7B59] border-[#7F7B59] text-white"
                  : "border-gray-300 text-gray-300"
              }`}
            >
              {step.completed ? <BiCheck /> : step.number}
            </div>
            <span
              className={`ml-2 ${
                currentStep === step.number
                  ? "font-bold text-[#7F7B59]"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  step.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            {/* Adım 1: Kişisel Bilgiler */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Kişisel Bilgiler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ad *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Soyad *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Adım 2: Adres Bilgileri */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Teslimat Adresi</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Adres *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full p-3 border rounded-lg ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Şehir *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        İlçe *
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${
                          errors.district ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.district && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.district}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Posta Kodu *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${
                          errors.postalCode
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Adım 3: Ödeme */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Ödeme Bilgileri</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-4">
                    Ödeme Yöntemi
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === "credit-card"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Kredi Kartı
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={formData.paymentMethod === "bank-transfer"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Banka Havalesi
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash-on-delivery"
                        checked={formData.paymentMethod === "cash-on-delivery"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Kapıda Ödeme
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Kart Numarası *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full p-3 border rounded-lg ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Kart Üzerindeki İsim *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg ${
                          errors.cardName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Son Kullanma Tarihi *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={`w-full p-3 border rounded-lg ${
                            errors.expiryDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`w-full p-3 border rounded-lg ${
                            errors.cvv ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">
                    Sipariş Notları (Opsiyonel)
                  </label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Siparişinizle ilgili özel notlarınız..."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Butonlar */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Geri
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-[#7F7B59] text-white rounded-lg hover:bg-[#6d6849] transition-colors"
                >
                  İleri
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "İşleniyor..." : "Siparişi Tamamla"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Sipariş Özeti</h2>

            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex justify-between text-sm">
                  <span>
                    {item.name} {item.selectedSize && `(${item.selectedSize})`}{" "}
                    x{item.quantity}
                  </span>
                  <span>{formatPrice(item.cartPrice || item.price)}</span>
                </div>
              ))}
            </div>

            <hr className="mb-4" />

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Ara Toplam:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo:</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Toplam:</span>
                <span className="text-[#7F7B59]">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span>🔒</span>
                <span>256-bit SSL ile güvenli ödeme</span>
              </div>
              <p>Kişisel bilgileriniz güvende</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
