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
export const getProducts = () => axiosInstance.get("/api/products").then(r => r.data);
export const getProduct = (id) => axiosInstance.get(`/api/products/${id}`).then(r => r.data);
export const getProductsByCategory = (category) => axiosInstance.get(`/api/products?category=${category}`).then(r => r.data);

export const fetchInitialDataServer = async () => {
  try {
    const [generalRes, navRes, banksRes, accountsRes, productsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/general-settings`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/navlinks`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/banks`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bank-accounts`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products`)
    ]);

    const [general, navlinks, banks, accounts, products] = await Promise.all([
      generalRes.json(),
      navRes.json(),
      banksRes.json(),
      accountsRes.json(),
      productsRes.json()
    ]);

    return {
      general: general[0],
      navlinks,
      banks,
      accounts,
      products
    };
  } catch (error) {
    console.error('Server data fetch error:', error);
    throw error;
  }
};

export const fetchInitialData = async () => {
  const [generalRes, navRes, banksRes, accountsRes, productsRes] = await Promise.all([
    axiosInstance.get("/api/general-settings"),
    axiosInstance.get("/api/navlinks"),
    axiosInstance.get("/api/banks"),
    axiosInstance.get("/api/bank-accounts"),
    axiosInstance.get("/api/products")
  ]);

  return {
    general: generalRes.data[0],
    navlinks: navRes.data,
    banks: banksRes.data,
    accounts: accountsRes.data,
    products: productsRes.data
  };
};

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