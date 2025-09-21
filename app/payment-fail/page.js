"use client";

import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentFailPage() {
    return (
        <div className="flex items-start justify-center min-h-screen p-4">
            <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 text-center">
                <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Ödemeniz Başarısız ❌</h1>
                <p className="text-gray-600 mb-6">
                    Ödemeniz alınamadı. Lütfen tekrar deneyin veya farklı bir kart ile deneyebilirsiniz !
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/sepet"
                        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Sepete Git
                    </Link>

                    <Link
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Ana Sayfaya Dön
                    </Link>

                    <Link
                        href="/odeme"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Tekrar Dene
                    </Link>
                </div>
            </div>
        </div>
    );
}
