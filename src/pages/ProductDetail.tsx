
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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  // Fetch product data from Supabase
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        // Fetch product details
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select(`
            id,
            title,
            price,
            currency,
            description,
            location,
            category_id,
            seller_id,
            sellers:seller_id (
              id,
              name,
              whatsapp
            )
          `)
          .eq('id', id)
          .single();
          
        if (productError) throw productError;
        
        // Fetch product images
        const { data: imageData, error: imageError } = await supabase
          .from('product_images')
          .select('image_url')
          .eq('product_id', id)
          .order('sort_order', { ascending: true });
          
        if (imageError) throw imageError;
        
        // Construct complete product object
        const formattedProduct: ProductProps = {
          id: productData.id,
          title: productData.title,
          price: productData.price,
          currency: productData.currency || 'MAD',
          images: imageData?.length ? imageData.map(img => img.image_url) : ['/placeholder.svg'],
          category: productData.category_id || 'Uncategorized',
          location: productData.location || '',
          seller: {
            id: productData.sellers.id,
            name: productData.sellers.name,
            whatsapp: productData.sellers.whatsapp || '',
          }
        };
        
        setProduct(formattedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);

  const getBackToProductsText = () => {
    switch (language) {
      case "fr":
        return "Retour aux produits";
      case "ar":
        return "العودة إلى المنتجات";
      default:
        return "Back to products";
    }
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
