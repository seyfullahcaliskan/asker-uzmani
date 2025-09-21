"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import { axiosInstance } from "../../utils/axiosInstance";

export default function PaymentSuccessClient({ id }) {
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/api/orders/${id}`)
        .then((r) => {
          setOrder(r.data);
          localStorage.removeItem("cart");
        })
        .catch((err) => console.error("Order fetch error:", err));
    }
  }, [id]);


  const copyToClipboard = () => {
    if (order?.orderNo) {
      navigator.clipboard.writeText(order.orderNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Ödemeniz Başarılı 🎉</h1>
        <p className="text-gray-600 mb-6">
          Ödemeniz başarıyla alınmıştır. Siparişinizi takip edebilmek için
          aşağıdaki numarayı kullanabilirsiniz.
        </p>

        {order ? (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-6">
            <span className="font-mono text-lg font-semibold text-gray-800">
              {order.orderNo}
            </span>
            <button
              onClick={copyToClipboard}
              className="ml-3 text-blue-600 hover:text-blue-800"
            >
              <FaRegCopy size={20} />
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Sipariş numarası yükleniyor...</p>
        )}

        {copied && (
          <p className="text-green-500 text-sm mb-4">Kopyalandı ✅</p>
        )}

        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
