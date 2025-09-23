"use client";

import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { axiosInstance } from "../../utils/axiosInstance";
import MesafeliSatisSozlesmesi from "../../mesafeli-satis-sozlesmesi/page";

export default function OnlinePaymentCheckout({ order, formData }) {
    const [loading, setLoading] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [error, setError] = useState(null);

    const [agreementChecked, setAgreementChecked] = useState(false);
    const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);

    const handlePay = async () => {
        try {
            setLoading(true);
            setError(null);

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

            const tokenRes = await axiosInstance.post("/api/orders/paytr/token", {
                merchantOid,
                amount: order.amount * 100,
            });

            if (!tokenRes.data.token) {
                throw new Error("PayTR token alınamadı!");
            }

            setIframeUrl(`https://www.paytr.com/odeme/guvenli/${tokenRes.data.token}`);

        } catch (err) {
            console.error("Online ödeme hatası:", err);
            setError("Ödeme başlatılırken bir sorun oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6 space-y-4 max-w-xl mx-auto px-4">
            {error && (
                <div className="mb-3 text-red-700 bg-red-100 border border-red-300 px-4 py-3 rounded-lg text-sm shadow-sm">
                    {error}
                </div>
            )}

            {/* Checkbox */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="agreementCheckbox"
                    checked={agreementChecked}
                    onChange={() => setIsAgreementModalOpen(true)}
                    className="w-5 h-5 text-blue-600 accent-blue-600 rounded"
                />
                <label htmlFor="agreementCheckbox" className="select-none text-gray-700 font-medium">
                    Mesafeli satış sözleşmesini okudum ve onaylıyorum
                </label>
            </div>

            {/* Ödeme butonu */}
            <Button
                label="Ödeme Yap"
                onClick={handlePay}
                className={`w-full py-3 font-semibold text-lg rounded-lg transition ${
                    agreementChecked
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!agreementChecked || loading}
                loading={loading}
            />

            {/* Sözleşme Modal */}
            <Dialog
                visible={isAgreementModalOpen}
                style={{ width: '95%', maxWidth: '650px', zIndex:999 }}
                modal
                onHide={() => setIsAgreementModalOpen(false)}
                draggable={false}
                resizable={false}
                className="rounded-lg"
            >
                <div className="p-4 text-sm leading-relaxed max-h-[70vh] overflow-y-auto">
                    <MesafeliSatisSozlesmesi />
                </div>

                <div className="flex justify-end mt-4 p-4">
                    <Button
                        label="Onaylıyorum"
                        onClick={() => {
                            setAgreementChecked(true);
                            setIsAgreementModalOpen(false);
                        }}
                        className={`w-full py-3 font-semibold text-lg rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white`}
                    />
                </div>
            </Dialog>

            {/* Ödeme iframe modal */}
            {iframeUrl && (
                <Dialog
                    visible={!!iframeUrl}
                    style={{ width: '95%', maxWidth: '1000px', zIndex:999  }}
                    modal
                    onHide={() => setIframeUrl(null)}
                    draggable={false}
                    resizable={false}
                    className="rounded-lg"
                >
                    <iframe
                        src={iframeUrl}
                        frameBorder="0"
                        scrolling="auto"
                        className="w-full h-[70vh] rounded-md"
                    ></iframe>
                </Dialog>
            )}
        </div>
    );
}
