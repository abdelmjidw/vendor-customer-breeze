
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// Mock favorite products for demonstration
const mockFavorites: ProductProps[] = [
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
    id: "3",
    title: "Moroccan Ceramic Tajine Pot",
    price: 350,
    currency: "MAD",
    images: ["https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?q=80&w=500&auto=format&fit=crop"],
    category: "Home",
    location: "Fes",
    seller: {
      id: "seller3",
      name: "Traditional Pottery",
      whatsapp: "212600000002",
    },
  },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading favorites
    const timer = setTimeout(() => {
      setFavorites(mockFavorites);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Your Favorites</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your saved items and quickly access products you love.
          </p>
        </div>
        
        {isLoading ? (
          <div className="product-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-secondary"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-secondary rounded w-3/4"></div>
                  <div className="h-4 bg-secondary rounded w-1/2"></div>
                  <div className="h-10 bg-secondary rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-medium mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and add items to your favorites
            </p>
            <Button asChild>
              <a href="/">Discover Products</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {favorites.length} saved {favorites.length === 1 ? "item" : "items"}
              </p>
              <Button 
                variant="outline"
                onClick={() => setFavorites([])}
              >
                Clear All
              </Button>
            </div>
            
            <div className="product-grid">
              {favorites.map((product) => (
                <div key={product.id} className="animate-scale-in relative group">
                  <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => removeFromFavorites(product.id)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Favorites;
