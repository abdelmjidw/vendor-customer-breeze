
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  AlertCircle, 
  Eye,
  EyeOff
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductProps } from "@/components/ProductCard";
import { toast } from "sonner";

// Mock data for demonstration
const mockSellerProducts: ProductProps[] = [
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
];

const SellerDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating loading products after authentication
    if (isAuthenticated) {
      setProducts(mockSellerProducts);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for sending verification code
    setTimeout(() => {
      setIsLoading(false);
      setShowVerification(true);
      toast.success("Verification code sent to your WhatsApp");
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for verifying code
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      toast.success("Login successful");
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowVerification(false);
    setPhone("");
    setVerificationCode("");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        
        <main className="container-custom pt-24 pb-16 animate-enter">
          <div className="max-w-md mx-auto glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gradient">Seller Login</h1>
              <p className="text-muted-foreground">
                Connect with your WhatsApp account
              </p>
            </div>
            
            {!showVerification ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="212 6XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-12"
                      required
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      +
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send you a verification code on WhatsApp
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-whatsapp"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending code..." : "Send Code"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="code" className="block text-sm font-medium">
                    Verification Code
                  </label>
                  <div className="relative">
                    <Input
                      id="code"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter the 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the code sent to +{phone}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setShowVerification(false)}
                  >
                    Change number
                  </button>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      toast.info("New code sent");
                      setVerificationCode("");
                    }}
                  >
                    Resend code
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Login"}
                </Button>
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your products and store
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button asChild>
              <Link to="/seller/add-product">
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              Profile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button asChild>
                <Link to="/seller/add-product">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Product
                </Link>
              </Button>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="glass rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? "Try a different search term" : "Start adding products to your store"}
                </p>
                {!searchTerm && (
                  <Button asChild>
                    <Link to="/seller/add-product">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Your First Product
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden border glass">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{product.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-right">
                          {product.currency} {product.price}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/product/${product.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/seller/edit-product/${product.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Product</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this product? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button
                                    variant="ghost"
                                    onClick={() => {}}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="profile">
            <div className="glass rounded-xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Store Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="store-name" className="block text-sm font-medium">
                      Store Name
                    </label>
                    <Input
                      id="store-name"
                      defaultValue="Moroccan Crafts"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium">
                      Location
                    </label>
                    <Input
                      id="location"
                      defaultValue="Marrakech"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="block text-sm font-medium">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Input
                        id="whatsapp"
                        defaultValue="212600000000"
                        className="pl-8"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button onClick={() => toast.success("Profile updated")}>
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SellerDashboard;
