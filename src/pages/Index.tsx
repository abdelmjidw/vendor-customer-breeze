import { useState, useEffect, useContext } from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import { LanguageContext } from "@/App";
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

// Categories and colors arrays
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

// Translations for the Home page
const translations = {
  discoverTreasures: {
    fr: "Découvrez des Trésors",
    ar: "اكتشف الكنوز",
    en: "Discover Treasures"
  },
  connectWithArtisans: {
    fr: "Connectez-vous avec des artisans talentueux et des vendeurs à travers le Maroc. Trouvez des produits uniques et commandez directement via WhatsApp.",
    ar: "تواصل مع الحرفيين الموهوبين والبائعين في جميع أنحاء المغرب. ابحث عن منتجات فريدة واطلب مباشرة عبر واتساب.",
    en: "Connect with talented artisans and sellers across Morocco. Find unique products and order directly through WhatsApp."
  },
  searchProducts: {
    fr: "Rechercher des produits...",
    ar: "البحث عن المنتجات...",
    en: "Search products..."
  },
  allCategories: {
    fr: "Toutes les Catégories",
    ar: "جميع الفئات",
    en: "All Categories"
  },
  sortBy: {
    fr: "Trier par: ",
    ar: "ترتيب حسب: ",
    en: "Sort by: "
  },
  newest: {
    fr: "Plus Récent",
    ar: "الأحدث",
    en: "Newest"
  },
  priceLowToHigh: {
    fr: "Prix: Bas à Élevé",
    ar: "السعر: من الأقل إلى الأعلى",
    en: "Price: Low to High"
  },
  priceHighToLow: {
    fr: "Prix: Élevé à Bas",
    ar: "السعر: من الأعلى إلى الأقل",
    en: "Price: High to Low"
  },
  filters: {
    fr: "Filtres",
    ar: "فلاتر",
    en: "Filters"
  },
  priceRange: {
    fr: "Gamme de Prix",
    ar: "نطاق السعر",
    en: "Price Range"
  },
  colors: {
    fr: "Couleurs",
    ar: "الألوان",
    en: "Colors"
  },
  noProductsFound: {
    fr: "Aucun produit trouvé",
    ar: "لم يتم العثور على منتجات",
    en: "No products found"
  },
  tryAdjusting: {
    fr: "Essayez d'ajuster votre recherche ou vos filtres",
    ar: "حاول تعديل البحث أو الفلاتر الخاصة بك",
    en: "Try adjusting your search or filters"
  },
  fashion: {
    fr: "Mode",
    ar: "أزياء",
    en: "Fashion"
  },
  beauty: {
    fr: "Beauté",
    ar: "جمال",
    en: "Beauty"
  },
  electronics: {
    fr: "Électronique",
    ar: "إلكترونيات",
    en: "Electronics"
  },
  home: {
    fr: "Maison",
    ar: "منزل",
    en: "Home"
  },
  jewelry: {
    fr: "Bijoux",
    ar: "مجوهرات",
    en: "Jewelry"
  },
  food: {
    fr: "Alimentation",
    ar: "طعام",
    en: "Food"
  },
  sports: {
    fr: "Sports",
    ar: "رياضة",
    en: "Sports"
  },
  allColors: {
    fr: "Toutes les Couleurs",
    ar: "جميع الألوان",
    en: "All Colors"
  },
  black: {
    fr: "Noir",
    ar: "أسود",
    en: "Black"
  },
  white: {
    fr: "Blanc",
    ar: "أبيض",
    en: "White"
  },
  red: {
    fr: "Rouge",
    ar: "أحمر",
    en: "Red"
  },
  blue: {
    fr: "Bleu",
    ar: "أزرق",
    en: "Blue"
  },
  green: {
    fr: "Vert",
    ar: "أخضر",
    en: "Green"
  },
  yellow: {
    fr: "Jaune",
    ar: "أصفر",
    en: "Yellow"
  },
  brown: {
    fr: "Brun",
    ar: "بني",
    en: "Brown"
  }
};

// Translate categories and colors
const getTranslatedCategories = (language: string) => {
  return categories.map(category => {
    if (category === "All Categories") {
      return translations.allCategories[language as keyof typeof translations.allCategories];
    }
    const key = category.toLowerCase() as keyof typeof translations;
    return translations[key]?.[language as keyof (typeof translations)[keyof typeof translations]] || category;
  });
};

const getTranslatedColors = (language: string) => {
  return colors.map(color => {
    if (color === "All Colors") {
      return translations.allColors[language as keyof typeof translations.allColors];
    }
    const key = color.toLowerCase() as keyof typeof translations;
    return translations[key]?.[language as keyof (typeof translations)[keyof typeof translations]] || color;
  });
};

const Index = () => {
  const { language } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(translations.allCategories[language as keyof typeof translations.allCategories]);
  const [selectedColor, setSelectedColor] = useState(translations.allColors[language as keyof typeof translations.allColors]);
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [products, setProducts] = useState<ProductProps[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(mockProducts);
  const [sortBy, setSortBy] = useState("newest");
  const [translatedCategories, setTranslatedCategories] = useState<string[]>(getTranslatedCategories(language));
  const [translatedColors, setTranslatedColors] = useState<string[]>(getTranslatedColors(language));

  // Update translations when language changes
  useEffect(() => {
    setTranslatedCategories(getTranslatedCategories(language));
    setTranslatedColors(getTranslatedColors(language));
    setSelectedCategory(translations.allCategories[language as keyof typeof translations.allCategories]);
    setSelectedColor(translations.allColors[language as keyof typeof translations.allColors]);
  }, [language]);

  // Function to get translation
  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][language as keyof (typeof translations)[keyof typeof translations]] || translations[key].en;
  };

  // Get sort by text
  const getSortByText = () => {
    if (sortBy === "newest") {
      return getTranslation("newest");
    } else if (sortBy === "price-low") {
      return getTranslation("priceLowToHigh");
    } else {
      return getTranslation("priceHighToLow");
    }
  };

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
    
    // Category filter (handle translated category)
    if (selectedCategory !== translations.allCategories[language as keyof typeof translations.allCategories]) {
      // Find the original category from the translated one
      const originalCategoryIndex = translatedCategories.findIndex(cat => cat === selectedCategory);
      const originalCategory = categories[originalCategoryIndex];
      
      result = result.filter(
        (product) => product.category === originalCategory
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
  }, [searchTerm, selectedCategory, selectedColor, priceRange, sortBy, products, language, translatedCategories]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gradient">{getTranslation("discoverTreasures")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {getTranslation("connectWithArtisans")}
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder={getTranslation("searchProducts")}
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
                {translatedCategories.map((category, index) => (
                  <DropdownMenuItem
                    key={index}
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
                  <span className="hidden md:inline">{getTranslation("sortBy")}</span>
                  {getSortByText()}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  {getTranslation("newest")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                  {getTranslation("priceLowToHigh")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                  {getTranslation("priceHighToLow")}
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
                  <SheetTitle>{getTranslation("filters")}</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">{getTranslation("priceRange")}</h3>
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
                    <h3 className="font-medium mb-3">{getTranslation("colors")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {translatedColors.map((color, index) => (
                        <Button
                          key={index}
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
            <h3 className="font-medium mb-4">{getTranslation("priceRange")}</h3>
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
            <h3 className="font-medium mb-4">{getTranslation("colors")}</h3>
            <div className="flex flex-wrap gap-2">
              {translatedColors.map((color, index) => (
                <Button
                  key={index}
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
              <p className="text-xl font-medium">{getTranslation("noProductsFound")}</p>
              <p className="text-muted-foreground mt-2">{getTranslation("tryAdjusting")}</p>
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
