
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import SellerDashboard from "./pages/Seller/Dashboard";
import AddProduct from "./pages/Seller/AddProduct";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize language settings
const initializeLanguage = () => {
  const savedLanguage = localStorage.getItem("app_language");
  
  if (savedLanguage === "ar") {
    document.documentElement.classList.add("rtl");
    document.body.dir = "rtl";
  }
};

function App() {
  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/add-product" element={<AddProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
