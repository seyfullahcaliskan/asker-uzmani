"use client";
import { useState, useEffect } from "react";
import ProductManager from "../components/admin/ProductManager";
import GeneralSettings from "../components/admin/GeneralSettings";
import products from "../components/layout/data/products";
import { onlinePayment } from "../config";
import { getGeneralSettings, getNavLinks, getBanks, getAccounts } from "../utils/axiosInstance";

const initialProducts = products;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");

  const [products, setProducts] = useState(initialProducts);
  const [generalData, setGeneralData] = useState(null);
  const [navLinks, setNavLinks] = useState([]);
  const [onlinePaymentState, setOnlinePayment] = useState(onlinePayment);

  const [banks, setBanks] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const general = await getGeneralSettings();
      const nav = await getNavLinks();
      const banksData = await getBanks();
      const accountsData = await getAccounts();

      setGeneralData(general);
      setNavLinks(nav);
      setBanks(banksData);
      setBankAccounts(accountsData);
    }

    fetchData();
  }, []);

  if (!generalData) return <div>Yükleniyor...</div>; // veri gelene kadar loading

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-6 border-b border-gray-300">
        <button
          className={`mr-4 pb-2 ${activeTab === "products" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setActiveTab("products")}
          type="button"
        >
          Ürünler
        </button>
        <button
          className={`pb-2 ${activeTab === "settings" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
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
          onlinePayment={onlinePaymentState}
          setOnlinePayment={setOnlinePayment}
          banks={banks}
          bankAccounts={bankAccounts}
          setBankAccounts={setBankAccounts}
        />
      )}
    </div>
  );
}
