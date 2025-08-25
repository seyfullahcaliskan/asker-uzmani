"use client";
import { useState } from "react";
import ProductManager from "../components/admin/ProductManager";
import GeneralSettings from "../components/admin/GeneralSettings";
import products from "../components/layout/data/products";
import { generalData, navLinks } from "../navLinks";
import { bankAccounts, bankLogo, onlinePayment } from "../config";

const initialProducts = products;

const initialGeneralData = generalData;

const initialNavLinks = navLinks;

const initialOnlinePayment = onlinePayment;

const initialBankAccounts = bankAccounts;

const initialBankLogo = bankLogo;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState(initialProducts);
  const [generalData, setGeneralData] = useState(initialGeneralData);
  const [navLinks, setNavLinks] = useState(initialNavLinks);
  const [onlinePayment, setOnlinePayment] = useState(initialOnlinePayment);
  const [bankAccounts, setBankAccounts] = useState(initialBankAccounts);
  const [bankLogo, setBankLogo] = useState(initialBankLogo);

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-6 border-b border-gray-300">
        <button
          className={`mr-4 pb-2 ${
            activeTab === "products"
              ? "border-b-2 border-blue-600 font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("products")}
          type="button"
        >
          Ürünler
        </button>
        <button
          className={`pb-2 ${
            activeTab === "settings"
              ? "border-b-2 border-blue-600 font-semibold"
              : ""
          }`}
          onClick={() => setActiveTab("settings")}
          type="button"
        >
          Genel Ayarlar
        </button>
      </div>

      {activeTab === "products" && (
        <ProductManager products={products} setProducts={setProducts} />
      )}

      {activeTab === "settings" && (
        <GeneralSettings
          generalData={generalData}
          setGeneralData={setGeneralData}
          navLinks={navLinks}
          setNavLinks={setNavLinks}
          onlinePayment={onlinePayment}
          setOnlinePayment={setOnlinePayment}
          bankAccounts={bankAccounts}
          setBankAccounts={setBankAccounts}
          bankLogo={bankLogo}
          setBankLogo={setBankLogo}
        />
      )}
    </div>
  );
}
