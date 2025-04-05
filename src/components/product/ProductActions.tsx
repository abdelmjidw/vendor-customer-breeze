
import { useState, useEffect } from "react";
import { Heart, Share2, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/App";
import { useCart } from "@/contexts/CartContext";
import { ProductProps } from "@/components/ProductCard";
import { getTranslatedText } from "@/utils/translations";

interface ProductActionsProps {
  productId: string;
  sellerWhatsApp: string;
  productTitle: string;
  language: Language;
  product?: ProductProps;
}

const ProductActions = ({ productId, sellerWhatsApp, productTitle, language, product }: ProductActionsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  // Check if product is in favorites when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user?.user) {
        const { data: favoriteData } = await supabase
          .from('favorites')
          .select('id')
          .eq('product_id', productId)
          .eq('user_id', user.user.id)
          .maybeSingle();
          
        setIsFavorite(!!favoriteData);
      }
    };
    
    checkFavoriteStatus();
  }, [productId]);

  const toggleFavorite = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) {
        toast.error("Please log in to save favorites");
        return;
      }
      
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('favorites')
          .delete()
          .eq('product_id', productId)
          .eq('user_id', user.user.id);
          
        setIsFavorite(false);
        toast.info("Removed from favorites");
      } else {
        // Add to favorites
        await supabase
          .from('favorites')
          .insert({
            product_id: productId,
            user_id: user.user.id
          });
          
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Failed to update favorites");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productTitle || 'Product',
        text: `Check out this product: ${productTitle}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Could not share', err);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleWhatsAppOrder = () => {
    window.open(
      `https://wa.me/${sellerWhatsApp}?text=Hello, I'm interested in your product: ${productTitle}`,
      '_blank'
    );
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const getWhatsAppButtonText = () => {
    return getTranslatedText("sendByWhatsapp", language);
  };

  const getAddToCartButtonText = () => {
    return getTranslatedText("addToCart", language);
  };

  return (
    <div>
      <div className="flex space-x-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white"
          onClick={handleWhatsAppOrder}
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          {getWhatsAppButtonText()}
        </Button>
        <Button 
          className="w-full h-12"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {getAddToCartButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
