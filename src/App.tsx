
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import SellerDashboard from "./pages/Seller/Dashboard";
import AddProduct from "./pages/Seller/AddProduct";
import ApiDocs from "./pages/Seller/ApiDocs";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

// Create language context
export type Language = "fr" | "ar" | "en";
export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
}>({
  language: "fr",
  setLanguage: () => {},
});

function App() {
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem("app_language") as Language) || "fr"
  );

  // Initialize language settings
  const initializeLanguage = () => {
    if (language === "ar") {
      document.documentElement.classList.add("rtl");
      document.body.dir = "rtl";
    } else {
      document.documentElement.classList.remove("rtl");
      document.body.dir = "ltr";
    }
  };

  useEffect(() => {
    initializeLanguage();
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app_language", lang);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/seller/add-product" element={<AddProduct />} />
                <Route path="/seller/api-docs" element={<ApiDocs />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
