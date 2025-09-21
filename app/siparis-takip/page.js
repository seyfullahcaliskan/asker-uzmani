"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../utils/axiosInstance";

export default function OrderTrackingPage() {
    const [orderNo, setOrderNo] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const maskText = (text) => {
        if (!text) return "";
        return text
            .split(" ")
            .map((part) =>
                part.length > 3 ? part.slice(0, 3) + "***" : part + "***"
            )
            .join(" ");
    };

    const maskPhone = (phone) => {
        if (!phone) return "";
        const last4 = phone.slice(-4);
        return "******" + last4;
    };

    const fetchOrder = async () => {
        if (!orderNo) {
            setError("Lütfen sipariş numarasını girin.");
            return;
        }
        setError("");
        setLoading(true);
        setOrder(null);
        try {
            const res = await axiosInstance.get(`/api/orders/get-one-by-order-no/${orderNo}`);
            setOrder(res.data);
        } catch (err) {
            setError("Sipariş bulunamadı.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-start justify-center min-h-screen p-4">
            <div className="bg-white shadow-2xl rounded-2xl max-w-lg w-full p-8">
                <h1 className="text-2xl font-bold mb-4 text-center">Sipariş Takip</h1>
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={orderNo}
                        onChange={(e) => setOrderNo(e.target.value)}
                        placeholder="Sipariş Numaranızı Girin"
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchOrder}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                    >
                        <FaSearch />
                    </button>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {order && (
                    <div className="text-gray-800 space-y-3">
                        <p>
                            <span className="font-semibold">Sipariş No:</span>{" "}
                            {order.orderNo}
                        </p>
                        <p>
                            <span className="font-semibold">Sipariş Tarihi:</span>{" "}
                            {new Date(order.dateOfRecorded).toLocaleString("tr-TR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                        <p>
                            <span className="font-semibold">Durum:</span>{" "}
                            {order.status?.value}
                        </p>
                        <p>
                            <span className="font-semibold">Ödeme Durumu:</span>{" "}
                            {order.payStatus?.value}
                        </p>
                        <p>
                            <span className="font-semibold">Ödeme Tarihi:</span>{" "}
                            {new Date(order.dateOfPay).toLocaleString("tr-TR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                        <p>
                            <span className="font-semibold">Müşteri:</span>{" "}
                            {maskText(order.customerName)}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {maskText(order.customerEmail)}
                        </p>
                        <p>
                            <span className="font-semibold">Telefon:</span>{" "}
                            {maskPhone(order.customerPhone)}
                        </p>
                        <p>
                            <span className="font-semibold">Adres:</span>{" "}
                            {maskText(order.customerAddress)}
                        </p>
                        <div className="mt-4">
                            <h2 className="font-bold">Ürünler</h2>
                            <ul className="space-y-1">
                                {order.items?.map((item, i) => (
                                    <li key={i}>
                                        <div>
                                            <span className="font-semibold">{item.name}</span> -{" "}
                                            {item.quantity} adet - {item.price}₺
                                        </div>

                                        {/* Eğer set ürünse */}
                                        {item.size && typeof item.size === "object" ? (
                                            <ul className="ml-4 list-disc text-sm text-gray-700">
                                                {Object.entries(item.size).map(([subName, subSize], idx) => (
                                                    <li key={idx}>
                                                        {subName} → Beden: <span className="font-medium">{subSize}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            // Normal ürün
                                            item.size && (
                                                <div className="ml-4 text-sm text-gray-700">
                                                    Beden: <span className="font-medium">{item.size}</span>
                                                </div>
                                            )
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p>
                            <span className="font-semibold">Kargo Durumu:</span>{" "}
                            {(order.cargoStatus.value)}
                        </p>
                        {order.cargoCompany ? <p>
                            <span className="font-semibold">Kargo Firması:</span>{" "}
                            {(order.cargoCompany)}
                        </p> : null}
                        {order.cargoCode ? <p>
                            <span className="font-semibold">Kargo Takip Numarası:</span>{" "}
                            {(order.cargoCode)}
                        </p> : null}

                        <p className="mt-2 font-bold">
                            Toplam Tutar: {order.amount}₺
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
