"use client";
import React, { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { getAccounts, getBanks } from "../utils/axiosInstance";

export default function BankAccounts() {
    const [banks, setBanks] = useState([]);
    const [bankAccounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const banksData = await getBanks();
                const accountsData = await getAccounts();
                setBanks(banksData || []);
                setBankAccounts(accountsData || []);
            } catch (error) {
                console.error("Banka bilgileri alınamadı:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Kopyalandı: ${text}`);
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
                Yükleniyor...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Banka Hesap Bilgilerimiz</h1>
            <div className="space-y-4">
                {bankAccounts.map((acc, index) => {
                    const bank = banks.find((b) => b.id === acc.bankId);

                    return (
                        <div
                            key={index}
                            className="border rounded-2xl p-4 shadow-sm bg-white"
                        >
                            {/* Banka adı + logo */}
                            <div className="flex items-center gap-3 mb-3">
                                {bank?.logoUrl && (
                                    <img
                                        src={bank.logoUrl}
                                        alt={bank?.name || "Banka"}
                                        className="w-14 h-14 object-contain"
                                    />
                                )}
                                <p className="font-semibold text-lg">{bank?.name}</p>
                            </div>

                            {/* Hesap Sahibi */}
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">{acc.holder}</span>
                                <FiCopy
                                    className="text-gray-500 hover:text-blue-600 cursor-pointer"
                                    size={18}
                                    onClick={() => handleCopy(acc.holder)}
                                />
                            </div>

                            {/* IBAN */}
                            <div className="flex items-center justify-between">
                                <span className="font-mono">{acc.displayIban}</span>
                                <FiCopy
                                    className="text-gray-500 hover:text-green-600 cursor-pointer"
                                    size={18}
                                    onClick={() => handleCopy(acc.iban)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
