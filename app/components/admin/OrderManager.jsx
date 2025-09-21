"use client";

import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function OrderManager({ allOrders }) {
    const [orders, setOrders] = useState(allOrders || []);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [cargoDialog, setCargoDialog] = useState(false);
    const [cargoData, setCargoData] = useState({ company: "", code: "" });

    const cargoCompanies = [
        "Yurtiçi Kargo",
        "Aras Kargo",
        "MNG Kargo",
        "Sürat Kargo",
        "PTT Kargo",
    ];

    const completeOrder = async (orderId) => {
        if (!window.confirm("Siparişi tamamlamak istiyor musunuz?")) return;

        try {
            await axiosInstance.post(`/api/orders/complete-order/${orderId}`);
            alert("Sipariş başarıyla tamamlandı.");
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId ? { ...o, status: { value: "Tamamlandı" } } : o
                )
            );
        } catch (err) {
            console.error(err);
            alert("Siparişi tamamlarken bir hata oluştu.");
        }
    };

    const cancelOrder = async (orderId) => {
        if (!window.confirm("Siparişi iptal etmek istiyor musunuz? Bu işlem alınan ödemenin iadesini sağlar !")) return;

        try {
            await axiosInstance.post(`/api/orders/cancel-order/${orderId}`);
            alert("Sipariş başarıyla iptal edildi.");
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId ? { ...o, status: { value: "İptal Edildi" } } : o
                )
            );
        } catch (err) {
            console.error(err);
            alert("Siparişi iptal ederken bir hata oluştu.");
        }
    };

    const saveCargo = async () => {
        if (!window.confirm("Kargo bilgilerini kaydetmek istiyor musunuz?")) return;

        try {
            await axiosInstance.post("/api/orders/set-cargo", {
                orderId: selectedOrder.id,
                cargoCompany: cargoData.company,
                cargoCode: cargoData.code,
            });
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === selectedOrder.id ? { ...o, cargo: { ...cargoData } } : o
                )
            );
            alert("Kargo bilgisi kaydedildi.");
            setCargoDialog(false);
            setCargoData({ company: "", code: "" });
        } catch (err) {
            console.error(err);
            alert("Kargo bilgisi kaydedilirken bir hata oluştu.");
        }
    };

    const downloadOrderSummary = async (order) => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Sipariş No: ${order.orderNo}`, bold: true }),
                            ],
                        }),
                        new Paragraph(`Müşteri: ${order.customerName}`),
                        new Paragraph(`Telefon: ${order.customerPhone}`),
                        new Paragraph(`Adres: ${order.customerAddress}`),
                        new Paragraph(""),
                        ...order.items.map(
                            (i) =>
                                new Paragraph(
                                    `${i.name} x${i.quantity} (${i.price}₺) = ${i.quantity * i.price
                                    }₺`
                                )
                        ),
                        new Paragraph(""),
                        new Paragraph({
                            children: [new TextRun({ text: `Toplam: ${order.amount}₺`, bold: true })],
                        }),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `siparis_${order.orderNo}.docx`);
    };

    return (
        <div className="p-4">
            {/* Tablo */}
            <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">Sipariş No</th>
                        <th className="p-2 border">Kayıt Tarihi</th>
                        <th className="p-2 border">Müşteri</th>
                        <th className="p-2 border">Telefon</th>
                        <th className="p-2 border">Adres</th>
                        <th className="p-2 border">Durum</th>
                        <th className="p-2 border">Kargo Durumu</th>
                        <th className="p-2 border">Kargo Firması</th>
                        <th className="p-2 border">Kargo Kodu</th>
                        <th className="p-2 border">Ürünler</th>
                        <th className="p-2 border">Tutar</th>
                        <th className="p-2 border">Ödeme Durumu</th>
                        <th className="p-2 border">Ödeme Tarihi</th>
                        <th className="p-2 border">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50">
                            <td className="p-2 border">{o.orderNo}</td>
                            <td className="p-2 border">
                                {o.dateOfRecorded
                                    ? new Date(o.dateOfRecorded).toLocaleDateString("tr-TR")
                                    : "-"}
                            </td>
                            <td className="p-2 border">{o.customerName}</td>
                            <td className="p-2 border">{o.customerPhone}</td>
                            <td className="p-2 border">{o.customerAddress}</td>
                            <td className="p-2 border">{o.status.value}</td>
                            <td className="p-2 border">{o.cargoStatus?.value || "-"}</td>
                            <td className="p-2 border">{o.cargoCompany || "-"}</td>
                            <td className="p-2 border">{o.cargoCode || "-"}</td>
                            <td className="p-2 border">
                                {o.items.map((i) => (
                                    <div key={i.name}>
                                        {i.name} x{i.quantity} ({i.price}₺)
                                    </div>
                                ))}
                            </td>
                            <td className="p-2 border">{o.amount}₺</td>
                            <td className="p-2 border">{o.payStatus.value}</td>
                            <td className="p-2 border">
                                {o.dateOfPay
                                    ? new Date(o.dateOfPay).toLocaleString("tr-TR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    : "-"}
                            </td>
                            <td className="p-2 border">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    {/* Kargo */}
                                    <button
                                        title="Kargo Bilgisi"
                                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                        onClick={() => {
                                            setSelectedOrder(o);
                                            setCargoDialog(true);
                                        }}
                                    >
                                        📦
                                    </button>
                                    {/* Tamamla */}
                                    <button
                                        title="Tamamla"
                                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                        onClick={() => completeOrder(o.id)}
                                    >
                                        ✅
                                    </button>
                                    {/* İptal */}
                                    <button
                                        title="İptal Et"
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                        onClick={() => cancelOrder(o.id)}
                                    >
                                        ❌
                                    </button>
                                    {/* Özet */}
                                    <button
                                        title="Özet"
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                        onClick={() => downloadOrderSummary(o)}
                                    >
                                        📄
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Kargo Dialog */}
            {cargoDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Kargo Bilgisi</h3>

                        <select
                            value={cargoData.company}
                            onChange={(e) =>
                                setCargoData({ ...cargoData, company: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded mb-3"
                        >
                            <option value="">Kargo Firması Seç</option>
                            {cargoCompanies.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={cargoData.code}
                            onChange={(e) =>
                                setCargoData({ ...cargoData, code: e.target.value })
                            }
                            placeholder="Kargo Takip Kodu"
                            className="w-full border px-3 py-2 rounded mb-3"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                                onClick={() => setCargoDialog(false)}
                            >
                                Kapat
                            </button>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={saveCargo}
                            >
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
