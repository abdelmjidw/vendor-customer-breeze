
import { useState, useEffect } from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

// Mock data for demonstration
const mockProducts: ProductProps[] = [
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
  {
    id: "4",
    title: "Handwoven Berber Carpet",
    price: 1200,
    currency: "MAD",
    images: ["https://images.unsplash.com/photo-1600607285795-b382036508ec?q=80&w=500&auto=format&fit=crop"],
    category: "Home",
    location: "Atlas Mountains",
    seller: {
      id: "seller4",
      name: "Amazigh Textiles",
      whatsapp: "212600000003",
    },
  },
  {
    id: "5",
    title: "Refurbished iPhone 12 Pro",
    price: 5999,
    currency: "MAD",
    images: ["https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?q=80&w=500&auto=format&fit=crop"],
    category: "Electronics",
    location: "Casablanca",
    seller: {
      id: "seller5",
      name: "Tech House",
      whatsapp: "212600000004",
    },
  },
  {
    id: "6",
    title: "Traditional Moroccan Tea Set",
    price: 450,
    currency: "MAD",
    images: ["https://images.unsplash.com/photo-1587293005013-4f9b507cbc37?q=80&w=500&auto=format&fit=crop"],
    category: "Home",
    location: "Tangier",
    seller: {
      id: "seller6",
      name: "Moroccan Heritage",
      whatsapp: "212600000005",
    },
  },
  {
    id: "7",
    title: "Handmade Moroccan Lantern",
    price: 320,
    currency: "MAD",
    images: ["https://images.unsplash.com/photo-1609178816113-390d991a8e45?q=80&w=500&auto=format&fit=crop"],
    category: "Home",
    location: "Marrakech",
    seller: {
      id: "seller7",
      name: "Metalwork Artisans",
      whatsapp: "212600000006",
    },
  },
  {
    id: "8",
    title: "Moroccan Caftan Dress",
    price: 1500,
    currency: "MAD",
    images: ["https://images.unsplash.com/photo-1602473812169-a141f4973385?q=80&w=500&auto=format&fit=crop"],
    category: "Fashion",
    location: "Rabat",
    seller: {
      id: "seller8",
      name: "Traditional Attire",
      whatsapp: "212600000007",
    },
  },
];

const categories = [
  "All Categories",
  "Fashion",
  "Beauty",
  "Electronics",
  "Home",
  "Jewelry",
  "Food",
  "Sports",
];

const colors = [
  "All Colors",
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Brown",
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [products, setProducts] = useState<ProductProps[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(mockProducts);
  const [sortBy, setSortBy] = useState("newest");

  // Apply filters when they change
  useEffect(() => {
    let result = [...products];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }
    
    // Price range filter
    result = result.filter(
      (product) => 
        product.price >= priceRange[0] && 
        product.price <= priceRange[1]
    );
    
    // Sort products
    if (sortBy === "newest") {
      // For mock data, we'll just use the reverse of the array to simulate newest
      result = [...result].reverse();
    } else if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, selectedColor, priceRange, sortBy, products]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Discover Treasures</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with talented artisans and sellers across Morocco. Find unique products and order directly through WhatsApp.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-full glass"
            />
          </div>
          
          <div className="flex gap-2">
            {/* Categories dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-full whitespace-nowrap glass">
                  {selectedCategory}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-secondary" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-full glass md:w-auto">
                  <span className="hidden md:inline">Sort by: </span>
                  {sortBy === "newest" && "Newest"}
                  {sortBy === "price-low" && "Price: Low to High"}
                  {sortBy === "price-high" && "Price: High to Low"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Filters sheet for mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 rounded-full glass md:hidden">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <Slider
                      defaultValue={[0, 6000]}
                      max={6000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>MAD {priceRange[0]}</span>
                      <span>MAD {priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Colors</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {colors.map((color) => (
                        <Button
                          key={color}
                          variant={selectedColor === color ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Desktop Filters */}
        <div className="hidden md:flex gap-8 mb-8">
          <div className="w-64">
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider
              defaultValue={[0, 6000]}
              max={6000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span>MAD {priceRange[0]}</span>
              <span>MAD {priceRange[1]}</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                  className="text-sm"
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="pb-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-medium">No products found</p>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="animate-scale-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
