"use client";
import { useState, useEffect } from "react";
import GeneralSettings from "../components/admin/GeneralSettings";
import { getGeneralSettings, getNavLinks, getBanks, getAccounts, getProducts, getOrders } from "../utils/axiosInstance";
import ProductManager from "../components/admin/ProductManager";
import OrderManager from "../components/admin/OrderManager";

const initialProducts = await getProducts();

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("orders");

  const [products, setProducts] = useState(initialProducts);
  const [generalData, setGeneralData] = useState(null);
  const [navLinks, setNavLinks] = useState([]);
  const [orders, setOrders] = useState([]);

  const [onlinePaymentState, setOnlinePayment] = useState(generalData?.onlinePayment);

  const [banks, setBanks] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const general = await getGeneralSettings();
        const nav = await getNavLinks();
        const banksData = await getBanks();
        const accountsData = await getAccounts();
        const orders = await getOrders();
        setGeneralData(general);
        setNavLinks(nav);
        setBanks(banksData);
        setBankAccounts(accountsData);
        setOrders(orders)
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
      }
    }

    fetchData();
  }, []);

  if (!generalData) return <div>Yükleniyor...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-6 border-b border-gray-300">
        <button
          className={`mr-4 pb-2 ${activeTab === "orders" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setActiveTab("orders")}
          type="button"
        >
          Siparişler
        </button>
        <button
          className={`mr-4 pb-2 ${activeTab === "settings" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setActiveTab("settings")}
          type="button"
        >
          Genel Ayarlar
        </button>
        <button
          className={`pb-2 ${activeTab === "products" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setActiveTab("products")}
          type="button"
        >
          Ürünler
        </button>
      </div>

      {activeTab === "orders" && (
        <OrderManager
          allOrders={orders}
        />
      )}

      {activeTab === "products" && (
        <ProductManager
          initialProducts={initialProducts}
        />
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
