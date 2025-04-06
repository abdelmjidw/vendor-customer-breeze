
import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { ProductProps } from "@/components/ProductCard";
import { LanguageContext } from "@/App";
import { supabase } from "@/integrations/supabase/client";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import ProductDetailSkeleton from "@/components/product/ProductDetailSkeleton";
import NotFoundMessage from "@/components/product/NotFoundMessage";
import { getTranslatedText } from "@/utils/translations";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        // For demo purposes, we'll use mock data
        // In a real app, this would be a call to Supabase or another backend
        const mockProducts = [
          {
            id: "1",
            title: "Handmade Moroccan Leather Babouches",
            price: 249,
            currency: "MAD",
            images: ["https://images.unsplash.com/photo-1608731267464-c0c889c2ff92?q=80&w=500&auto=format&fit=crop"],
            category: "Fashion",
            location: "Marrakech",
            seller: {
              id: "seller1",
              name: "Moroccan Crafts",
              whatsapp: "212600000000",
            },
          },
          {
            id: "2",
            title: "Argan Oil - 100% Pure & Organic",
            price: 120,
            currency: "MAD",
            images: ["https://images.unsplash.com/photo-1608571423902-abb9368e17ee?q=80&w=500&auto=format&fit=crop"],
            category: "Beauty",
            location: "Essaouira",
            seller: {
              id: "seller2",
              name: "Argan Cooperative",
              whatsapp: "212600000001",
            },
          }
        ];
        
        // Find product by ID
        const foundProduct = mockProducts.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Product not found with ID:", id);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);

  const getBackToProductsText = () => {
    return getTranslatedText("home", language);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {getBackToProductsText()}
          </Link>
        </div>
        
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : !product ? (
          <NotFoundMessage />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <ProductImageGallery images={product.images} />
            
            {/* Product Details */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start">
                <ProductInfo product={product} />
              </div>
              
              <div className="mt-8">
                <ProductActions 
                  productId={product.id}
                  sellerWhatsApp={product.seller.whatsapp}
                  productTitle={product.title}
                  language={language}
                  product={product}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
