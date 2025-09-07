// lib/api.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Tekil API çağrıları
export const getGeneralSettings = () => axiosInstance.get("/api/general-settings").then(r => r.data[0]);
export const getNavLinks = () => axiosInstance.get("/api/navlinks").then(r => r.data);
export const getBanks = () => axiosInstance.get("/api/banks").then(r => r.data);
export const getAccounts = () => axiosInstance.get("/api/bank-accounts").then(r => r.data);

// Toplu veri çekme fonksiyonu (senin loadData mantığın)
export const fetchInitialData = async () => {
  const [generalRes, navRes, banksRes, accountsRes] = await Promise.all([
    axiosInstance.get("/api/general-settings"),
    axiosInstance.get("/api/navlinks"),
    axiosInstance.get("/api/banks"),
    axiosInstance.get("/api/bank-accounts"),
  ]);

  return {
    general: generalRes.data[0],
    navlinks: navRes.data,
    banks: banksRes.data,
    accounts: accountsRes.data,
  };
};

// Error handling ile birlikte toplu veri çekme
export const loadDataWithErrorHandling = async (setIsLoading, setError) => {
  try {
    setIsLoading(true);
    const data = await fetchInitialData();
    setError(null);
    return data;
  } catch (e) {
    setError("Veriler alınırken hata oluştu.");
    console.error(e);
    throw e;
  } finally {
    setIsLoading(false);
  }
};