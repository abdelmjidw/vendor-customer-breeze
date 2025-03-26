
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendWhatsAppMessage } from "@/services/whatsappService";
import { LanguageContext } from "@/App";

export interface ProductProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  location: string;
  size?: string[];
  colors?: string[];
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
    await sendWhatsAppMessage(product.seller.whatsapp, message);
  };

  const getWhatsAppButtonText = () => {
    switch (language) {
      case "fr":
        return "Commander sur WhatsApp";
      case "ar":
        return "اطلب عبر واتساب";
      default:
        return "Order on WhatsApp";
    }
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
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium line-clamp-1">{product.title}</h3>
              <p className="text-sm text-muted-foreground">
                {product.category}
                {product.subcategory && ` › ${product.subcategory}`}
              </p>
            </div>
            <p className="font-semibold">
              {product.currency} {product.price.toLocaleString()}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">{product.location}</p>
            {(product.size?.length > 0 || product.colors?.length > 0) && (
              <div className="mt-2 flex flex-wrap gap-1">
                {product.size?.map((size, index) => (
                  <span key={`size-${index}`} className="text-xs px-2 py-1 bg-muted rounded-full">
                    {size}
                  </span>
                ))}
                {product.colors?.map((color, index) => (
                  <span 
                    key={`color-${index}`} 
                    className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: color === "white" ? "#f8fafc" : color }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                    {color}
                  </span>
                ))}
              </div>
            )}
          </div>
          <Button 
            className="mt-4 w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
            onClick={handleWhatsAppOrder}
          >
            {getWhatsAppButtonText()}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
