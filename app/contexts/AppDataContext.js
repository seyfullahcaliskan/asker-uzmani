"use client";
import { createContext, useContext, useState } from "react";

const AppDataContext = createContext();

export const useAppData = () => useContext(AppDataContext);

export const AppDataProvider = ({ children }) => {
  const [generalSettings, setGeneralSettings] = useState(null);
  const [navLinks, setNavLinks] = useState([]);
  const [banks, setBanks] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);

  return (
    <AppDataContext.Provider
      value={{
        generalSettings, setGeneralSettings,
        navLinks, setNavLinks,
        banks, setBanks,
        bankAccounts, setBankAccounts,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};