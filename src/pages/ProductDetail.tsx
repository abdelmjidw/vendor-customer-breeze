import { useState, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MapPin, ArrowLeft, ChevronLeft, ChevronRight, Share2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProductProps } from "@/components/ProductCard";
import { LanguageContext } from "@/App";

// Mock data for demonstration
const mockProducts: { [key: string]: ProductProps } = {
  "1": {
    id: "1",
    title: "Handmade Moroccan Leather Babouches",
    price: 249,
    currency: "MAD",
    images: [
      "https://images.unsplash.com/photo-1608731267464-c0c889c2ff92?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591841669836-b09db1a1e251?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1597226067578-a54e176bad19?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531139580228-4f88e1d5dfcc?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Fashion",
    location: "Marrakech",
    seller: {
      id: "seller1",
      name: "Moroccan Crafts",
      whatsapp: "212600000000",
    },
  },
  "2": {
    id: "2",
    title: "Argan Oil - 100% Pure & Organic",
    price: 120,
    currency: "MAD",
    images: [
      "https://images.unsplash.com/photo-1608571423902-abb9368e17ee?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423931-04c25fffaed7?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Beauty",
    location: "Essaouira",
    seller: {
      id: "seller2",
      name: "Argan Cooperative",
      whatsapp: "212600000001",
    },
  },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { language } = useContext(LanguageContext);

  // In a real app, fetch product data from API
  const product = mockProducts[id || "1"];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Product not found</p>
        <Link to="/" className="text-primary hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newImagesLoaded = [...prev];
      newImagesLoaded[index] = true;
      return newImagesLoaded;
    });
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast.success("Added to favorites");
    } else {
      toast.info("Removed from favorites");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this product: ${product.title}`,
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
      `https://wa.me/${product.seller.whatsapp}?text=Hello, I'm interested in your product: ${product.title}`,
      '_blank'
    );
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl aspect-square bg-secondary">
              {!imagesLoaded[currentImageIndex] && (
                <div className="absolute inset-0 bg-secondary animate-pulse"></div>
              )}
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imagesLoaded[currentImageIndex] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(currentImageIndex)}
              />
              
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full glass"
                    onClick={goToPreviousImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full glass"
                    onClick={goToNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div 
                className="flex space-x-2 overflow-x-auto py-2" 
                ref={sliderRef}
              >
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                      currentImageIndex === index
                        ? "ring-2 ring-primary"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold">{product.title}</h1>
                </div>
                <div className="flex space-x-2">
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
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-2xl font-bold">
                  {product.currency} {product.price.toLocaleString()}
                </p>
              </div>
              
              <div className="mt-2 flex items-center text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{product.location}</span>
              </div>
              
              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-medium mb-2">Product Details</h2>
                <p className="text-muted-foreground">
                  This beautiful handcrafted product showcases the exceptional skill of Moroccan artisans. 
                  Each piece is unique and made with traditional techniques passed down through generations.
                </p>
              </div>
              
              <div className="border-t border-border mt-6 pt-6">
                <h2 className="font-medium mb-2">Seller Information</h2>
                <p className="text-muted-foreground">
                  {product.seller.name} • Based in {product.location}
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                className="w-full h-12 btn-whatsapp"
                onClick={handleWhatsAppOrder}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {getWhatsAppButtonText()}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
