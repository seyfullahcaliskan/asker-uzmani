"use client";
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
      {children}
    </LoadingContext.Provider>
  );
};