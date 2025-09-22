"use client";

import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

export default function OnlinePaymentCheckout({ order, formData }) {
    const [loading, setLoading] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const handlePay = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Siparişi oluştur
            const orderRes = await axiosInstance.post("/api/orders/create", {
                customerName: order.customerName,
                customerEmail: order.customerEmail,
                customerPhone: order.customerPhone,
                customerAddress: order.customerAddress,
                orderNotes: formData.orderNotes,
                testMode: 0,
                amount: order.amount,
                items: order.items
            });

            const { merchantOid } = orderRes.data;

            // 2. PayTR token al
            const tokenRes = await axiosInstance.post("/api/orders/paytr/token", {
                merchantOid,
                amount: order.amount * 100,
            });

            if (!tokenRes.data.token) {
                throw new Error("PayTR token alınamadı!");
            }

            // 3. Iframe URL hazırla
            const iframe = `https://www.paytr.com/odeme/guvenli/${tokenRes.data.token}`;
            setIframeUrl(iframe);
            setIsModalOpen(true);

        } catch (err) {
            console.error("Online ödeme hatası:", err);
            setError("Ödeme başlatılırken bir sorun oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-5">
            {/* Hata mesajı */}
            {error && (
                <div className="mb-3 text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Ödeme butonu */}
            <button
                onClick={handlePay}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-70 transition flex items-center justify-center"
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Yükleniyor...
                    </span>
                ) : (
                    "Ödeme Yap"
                )}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-5xl mx-4 bg-white rounded-xl shadow-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 py-3 border-b">
                            <h2 className="text-lg font-semibold">Güvenli Ödeme</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-black text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Iframe */}
                        <div className="max-h-[85vh] overflow-y-auto">
                            <iframe
                                src={iframeUrl}
                                id="paytriframe"
                                frameBorder="0"
                                scrolling="auto"
                                className="w-full h-[80vh] md:h-[700px]"
                            ></iframe>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end px-4 py-3 border-t bg-gray-50">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
