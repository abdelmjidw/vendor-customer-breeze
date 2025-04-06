
import { useState, useEffect } from "react";
import { Heart, Share2, ShoppingCart, MessageCircle, Facebook, Instagram, Send, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Language } from "@/App";
import { useCart } from "@/contexts/CartContext";
import { ProductProps } from "@/components/ProductCard";
import { getTranslatedText } from "@/utils/translations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProductActionsProps {
  productId: string;
  sellerWhatsApp: string;
  productTitle: string;
  language: Language;
  product?: ProductProps;
}

const ProductActions = ({ productId, sellerWhatsApp, productTitle, language, product }: ProductActionsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const { addToCart } = useCart();

  // Set current page URL for sharing
  useEffect(() => {
    setShareUrl(window.location.href);
  }, [productId]);

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

  const handleShareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${productTitle} - ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareViaFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleShareViaInstagram = () => {
    // Instagram doesn't have a direct sharing API like Facebook or WhatsApp
    // As a fallback, we'll copy link to clipboard with instructions
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied! You can now paste it in Instagram");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };

  // Native share API (for mobile devices)
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productTitle || 'Product',
        text: `Check out this product: ${productTitle}`,
        url: shareUrl,
      }).catch(err => {
        console.error('Could not share', err);
      });
    } else {
      // Fallback
      handleCopyLink();
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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                onClick={handleShareViaWhatsApp}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                onClick={handleShareViaFacebook}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90 text-white"
                onClick={handleShareViaInstagram}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
              {navigator.share && (
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={handleNativeShare}
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex gap-4">
        <Button 
          className="flex-1 h-12 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium shadow-sm rounded-full"
          onClick={handleWhatsAppOrder}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {getTranslatedText("sendByWhatsapp", language)}
        </Button>
        <Button 
          className="flex-1 h-12 font-medium shadow-sm rounded-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {getTranslatedText("addToCart", language)}
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
