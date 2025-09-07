"use client";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsappButton from "./components/layout/WhatsappButton";
import { CartProvider } from "./hooks/useCart";
import { LoadingProvider } from "./contexts/LoadingContext";
import { AppDataProvider } from "./contexts/AppDataContext";

function AppContent({ children }) {

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