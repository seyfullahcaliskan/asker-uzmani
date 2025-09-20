"use client";

import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

export default function OnlinePaymentCheckout() {
    const [loading, setLoading] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePay = async () => {
        try {
            setLoading(true);

            // 1. Siparişi oluştur
            const orderRes = await axiosInstance.post("/api/orders/create", {
                customerName: "Test Kullanıcı",
                customerEmail: "caliskan.seyfullah.98@gmail.com",
                customerPhone: "5377952988",
                customerAddress: "İstanbul",
                testMode: 1,
                amount: 10000, // kuruş cinsinden (örnek: 100.00 TL → 10000)
                items: [
                    { name: "Ürün 1", price: 5000, quantity: 1 },
                    { name: "Ürün 2", price: 5000, quantity: 1 },
                ],
            });

            const { merchantOid } = orderRes.data;

            // 2. PayTR token al
            const tokenRes = await axiosInstance.post("/api/orders/paytr/token", {
                merchantOid,
                amount: 10000,
            });

            if (!tokenRes.data.token) {
                alert("PayTR token alınamadı!");
                return;
            }

            // 3. Iframe URL hazırla ve modal aç
            const iframe = `https://www.paytr.com/odeme/guvenli/${tokenRes.data.token}`;
            setIframeUrl(iframe);
            setIsModalOpen(true);

        } catch (err) {
            console.error("Online ödeme hatası:", err);
            alert("Online ödeme sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5">
            <button
                onClick={handlePay}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
            >
                {loading ? "Yükleniyor..." : "Ödeme Yap"}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-white bg-opacity-10 flex items-center justify-center z-50">
                    <iframe
                        src={iframeUrl}
                        id="paytriframe"
                        frameBorder="0"
                        scrolling="no"
                        style={{ width: "100%", height: "700px" }}
                        className="rounded-b-lg"
                    ></iframe>
                </div>
            )}
        </div>
    );
}
