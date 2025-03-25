
import { useState, useEffect, useContext } from "react";
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
import { useWhatsAppAuth } from "@/hooks/useWhatsAppAuth";
import { LanguageContext, Language } from "@/App";

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
  const { language } = useContext(LanguageContext);
  const { 
    isAuthenticated, 
    isLoading, 
    phoneNumber, 
    verificationCode,
    showVerification,
    setPhoneNumber,
    setVerificationCode,
    handleSendCode,
    handleVerifyCode,
    handleLogout
  } = useWhatsAppAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating loading products after authentication
    if (isAuthenticated) {
      setProducts(mockSellerProducts);
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSendCode();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleVerifyCode();
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    toast.success(getTranslatedText("productDeletedSuccess"));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Translation function
  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      sellerLogin: {
        fr: "Connexion Vendeur",
        ar: "تسجيل دخول البائع",
        en: "Seller Login"
      },
      connectWhatsApp: {
        fr: "Connectez-vous avec votre compte WhatsApp",
        ar: "تواصل مع حساب الواتساب الخاص بك",
        en: "Connect with your WhatsApp account"
      },
      whatsAppNumber: {
        fr: "Numéro WhatsApp",
        ar: "رقم الواتساب",
        en: "WhatsApp Number"
      },
      sendCode: {
        fr: "Envoyer le Code",
        ar: "إرسال الرمز",
        en: "Send Code"
      },
      sendingCode: {
        fr: "Envoi du code...",
        ar: "جاري إرسال الرمز...",
        en: "Sending code..."
      },
      verificationCode: {
        fr: "Code de Vérification",
        ar: "رمز التحقق",
        en: "Verification Code"
      },
      enterCode: {
        fr: "Entrez le code à 6 chiffres",
        ar: "أدخل الرمز المكون من 6 أرقام",
        en: "Enter the 6-digit code"
      },
      codeInfo: {
        fr: "Entrez le code envoyé à +",
        ar: "أدخل الرمز المرسل إلى +",
        en: "Enter the code sent to +"
      },
      changeNumber: {
        fr: "Changer de numéro",
        ar: "تغيير الرقم",
        en: "Change number"
      },
      resendCode: {
        fr: "Renvoyer le code",
        ar: "إعادة إرسال الرمز",
        en: "Resend code"
      },
      verifying: {
        fr: "Vérification...",
        ar: "جاري التحقق...",
        en: "Verifying..."
      },
      login: {
        fr: "Se Connecter",
        ar: "تسجيل الدخول",
        en: "Login"
      },
      sellerDashboard: {
        fr: "Tableau de Bord Vendeur",
        ar: "لوحة تحكم البائع",
        en: "Seller Dashboard"
      },
      manageProducts: {
        fr: "Gérez vos produits et votre boutique",
        ar: "إدارة منتجاتك ومتجرك",
        en: "Manage your products and store"
      },
      logout: {
        fr: "Déconnexion",
        ar: "تسجيل الخروج",
        en: "Logout"
      },
      addProduct: {
        fr: "Ajouter un Produit",
        ar: "إضافة منتج",
        en: "Add Product"
      },
      products: {
        fr: "Produits",
        ar: "المنتجات",
        en: "Products"
      },
      profile: {
        fr: "Profil",
        ar: "الملف الشخصي",
        en: "Profile"
      },
      searchProducts: {
        fr: "Rechercher des produits...",
        ar: "البحث عن المنتجات...",
        en: "Search products..."
      },
      noProductsFound: {
        fr: "Aucun produit trouvé",
        ar: "لم يتم العثور على منتجات",
        en: "No products found"
      },
      tryDifferentSearch: {
        fr: "Essayez un terme de recherche différent",
        ar: "جرب مصطلح بحث مختلف",
        en: "Try a different search term"
      },
      startAddingProducts: {
        fr: "Commencez à ajouter des produits à votre boutique",
        ar: "ابدأ بإضافة منتجات إلى متجرك",
        en: "Start adding products to your store"
      },
      addFirstProduct: {
        fr: "Ajoutez Votre Premier Produit",
        ar: "أضف منتجك الأول",
        en: "Add Your First Product"
      },
      product: {
        fr: "Produit",
        ar: "المنتج",
        en: "Product"
      },
      category: {
        fr: "Catégorie",
        ar: "الفئة",
        en: "Category"
      },
      price: {
        fr: "Prix",
        ar: "السعر",
        en: "Price"
      },
      actions: {
        fr: "Actions",
        ar: "الإجراءات",
        en: "Actions"
      },
      storeInfo: {
        fr: "Informations sur la Boutique",
        ar: "معلومات المتجر",
        en: "Store Information"
      },
      storeName: {
        fr: "Nom de la Boutique",
        ar: "اسم المتجر",
        en: "Store Name"
      },
      location: {
        fr: "Emplacement",
        ar: "الموقع",
        en: "Location"
      },
      saveChanges: {
        fr: "Enregistrer les Modifications",
        ar: "حفظ التغييرات",
        en: "Save Changes"
      },
      deleteProduct: {
        fr: "Supprimer le Produit",
        ar: "حذف المنتج",
        en: "Delete Product"
      },
      deleteConfirmation: {
        fr: "Êtes-vous sûr de vouloir supprimer ce produit ? Cette action ne peut pas être annulée.",
        ar: "هل أنت متأكد من أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
        en: "Are you sure you want to delete this product? This action cannot be undone."
      },
      cancel: {
        fr: "Annuler",
        ar: "إلغاء",
        en: "Cancel"
      },
      delete: {
        fr: "Supprimer",
        ar: "حذف",
        en: "Delete"
      },
      productDeletedSuccess: {
        fr: "Produit supprimé avec succès",
        ar: "تم حذف المنتج بنجاح",
        en: "Product deleted successfully"
      },
      profileUpdated: {
        fr: "Profil mis à jour",
        ar: "تم تحديث الملف الشخصي",
        en: "Profile updated"
      },
      newCodeSent: {
        fr: "Nouveau code envoyé",
        ar: "تم إرسال رمز جديد",
        en: "New code sent"
      }
    };

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        
        <main className={`container-custom pt-24 pb-16 animate-enter ${language === 'ar' ? 'rtl' : ''}`}>
          <div className="max-w-md mx-auto glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gradient">{getTranslatedText("sellerLogin")}</h1>
              <p className="text-muted-foreground">
                {getTranslatedText("connectWhatsApp")}
              </p>
            </div>
            
            {!showVerification ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    {getTranslatedText("whatsAppNumber")}
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="212 6XX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-12"
                      required
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      +
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'سنرسل لك رمز تحقق على واتساب' :
                     language === 'fr' ? 'Nous vous enverrons un code de vérification sur WhatsApp' :
                     "We'll send you a verification code on WhatsApp"}
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-whatsapp"
                  disabled={isLoading}
                >
                  {isLoading ? getTranslatedText("sendingCode") : getTranslatedText("sendCode")}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="code" className="block text-sm font-medium">
                    {getTranslatedText("verificationCode")}
                  </label>
                  <div className="relative">
                    <Input
                      id="code"
                      type={showPassword ? "text" : "password"}
                      placeholder={getTranslatedText("enterCode")}
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
                    {getTranslatedText("codeInfo")}{phoneNumber}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setPhoneNumber("")}
                  >
                    {getTranslatedText("changeNumber")}
                  </button>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={async () => {
                      await handleSendCode();
                      setVerificationCode("");
                      toast.info(getTranslatedText("newCodeSent"));
                    }}
                  >
                    {getTranslatedText("resendCode")}
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? getTranslatedText("verifying") : getTranslatedText("login")}
                </Button>
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : ''}`}>
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">{getTranslatedText("sellerDashboard")}</h1>
            <p className="text-muted-foreground">
              {getTranslatedText("manageProducts")}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={handleLogout}
            >
              {getTranslatedText("logout")}
            </Button>
            <Button asChild>
              <Link to="/seller/add-product">
                <Plus className="h-5 w-5 mr-2" />
                {getTranslatedText("addProduct")}
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>{getTranslatedText("products")}</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              {getTranslatedText("profile")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder={getTranslatedText("searchProducts")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button asChild>
                <Link to="/seller/add-product">
                  <Plus className="h-5 w-5 mr-2" />
                  {getTranslatedText("addProduct")}
                </Link>
              </Button>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="glass rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">{getTranslatedText("noProductsFound")}</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? getTranslatedText("tryDifferentSearch") : getTranslatedText("startAddingProducts")}
                </p>
                {!searchTerm && (
                  <Button asChild>
                    <Link to="/seller/add-product">
                      <Plus className="h-5 w-5 mr-2" />
                      {getTranslatedText("addFirstProduct")}
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden border glass">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{getTranslatedText("product")}</TableHead>
                      <TableHead className="hidden md:table-cell">{getTranslatedText("category")}</TableHead>
                      <TableHead className="text-right">{getTranslatedText("price")}</TableHead>
                      <TableHead className="text-right">{getTranslatedText("actions")}</TableHead>
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
                                  <DialogTitle>{getTranslatedText("deleteProduct")}</DialogTitle>
                                  <DialogDescription>
                                    {getTranslatedText("deleteConfirmation")}
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button
                                    variant="ghost"
                                    onClick={() => {}}
                                  >
                                    {getTranslatedText("cancel")}
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    {getTranslatedText("delete")}
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
                <h2 className="text-xl font-medium mb-4">{getTranslatedText("storeInfo")}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="store-name" className="block text-sm font-medium">
                      {getTranslatedText("storeName")}
                    </label>
                    <Input
                      id="store-name"
                      defaultValue="Moroccan Crafts"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium">
                      {getTranslatedText("location")}
                    </label>
                    <Input
                      id="location"
                      defaultValue="Marrakech"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="block text-sm font-medium">
                      {getTranslatedText("whatsAppNumber")}
                    </label>
                    <div className="relative">
                      <Input
                        id="whatsapp"
                        defaultValue={phoneNumber}
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
                <Button onClick={() => toast.success(getTranslatedText("profileUpdated"))}>
                  {getTranslatedText("saveChanges")}
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
