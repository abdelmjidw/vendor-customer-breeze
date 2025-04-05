
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendWhatsAppMessage } from "@/services/whatsappService";
import { LanguageContext } from "@/App";
import { useCart } from "@/contexts/CartContext";
import { getTranslatedText } from "@/utils/translations";

export interface ProductProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  location: string;
  seller: {
    id: string;
    name: string;
    whatsapp: string;
  };
}

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { language } = useContext(LanguageContext);
  const { addToCart } = useCart();
  
  // Get the seller's stored phone number if available
  const getSellerWhatsApp = () => {
    // If the current user is the seller of this product, use their stored phone
    const storePhone = localStorage.getItem("store_phone");
    if (product.seller.id === "seller1" && storePhone) {
      return storePhone;
    }
    return product.seller.whatsapp;
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast.success("Added to favorites");
    } else {
      toast.info("Removed from favorites");
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleWhatsAppOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const message = `Hello, I'm interested in your product: ${product.title}`;
    await sendWhatsAppMessage(getSellerWhatsApp(), message);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="relative rounded-xl overflow-hidden card-hover h-full bg-card">
        <div className="relative aspect-square overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse"></div>
          )}
          <img
            src={product.images[0]}
            alt={product.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full glass transition-transform duration-200 hover:scale-110"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </button>
          
          {/* Add quick action buttons directly on the image */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={handleWhatsAppOrder}
              className="p-2 rounded-full bg-[#25D366] text-white shadow-sm hover:bg-[#128C7E] transition-colors"
              aria-label={getTranslatedText("sendByWhatsapp", language)}
            >
              <Send className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              aria-label={getTranslatedText("addToCart", language)}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium line-clamp-1">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            <p className="font-semibold">
              {product.currency} {product.price.toLocaleString()}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">{product.location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
