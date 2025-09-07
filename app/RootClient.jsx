"use client";

import { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsappButton from "./components/layout/WhatsappButton";
import { CartProvider } from "./hooks/useCart";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import { AppDataProvider, useAppData } from "./contexts/AppDataContext";
import axiosInstance from "./utils/axiosInstance";
import GlobalLoader from "./components/layout/ui/GlobalLoader";

function AppContent({ children }) {
  const { isLoading, setIsLoading, setError } = useLoading();
  const { setGeneralSettings, setNavLinks, setBanks, setBankAccounts } = useAppData();

  const loadData = async () => {
    try {
      setIsLoading(true);

      const [generalRes, navRes, banksRes, accountsRes] = await Promise.all([
        axiosInstance.get("/api/general-settings"),
        axiosInstance.get("/api/navlinks"),
        axiosInstance.get("/api/banks"),
        axiosInstance.get("/api/bank-accounts"),
      ]);

      setGeneralSettings(generalRes.data[0]);
      setNavLinks(navRes.data);
      setBanks(banksRes.data);
      setBankAccounts(accountsRes.data);

      setError(null);
    } catch (e) {
      setError("Veriler alınırken hata oluştu.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <CartProvider>
      <Header />
      <WhatsappButton />
      <main className="min-h-screen container mx-auto py-4 md:py-12">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}

export default function RootClient({ children }) {
  return (
    <LoadingProvider>
      <AppDataProvider>
        <AppContent>{children}</AppContent>
      </AppDataProvider>
    </LoadingProvider>
  );
}