
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Plus, Minus, ArrowLeft, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { LanguageContext } from "@/App";
import { getTranslatedText } from "@/utils/translations";
import { sendCartOrder } from "@/services/whatsappService";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { language } = useContext(LanguageContext);

  // Group cart items by seller
  const groupedItems = cartItems.reduce((acc, item) => {
    const sellerId = item.seller.id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        seller: item.seller,
        items: []
      };
    }
    acc[sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { seller: { id: string, name: string, whatsapp: string }, items: typeof cartItems }>);

  const handleSendOrderToSeller = async (sellerWhatsApp: string, products: typeof cartItems) => {
    await sendCartOrder(sellerWhatsApp, products, language);
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
            {getTranslatedText("home", language)}
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">{getTranslatedText("cart", language)}</h1>
          {totalItems > 0 && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
              {totalItems}
            </span>
          )}
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">{getTranslatedText("emptyCart", language)}</h2>
            <p className="text-muted-foreground mb-6">{getTranslatedText("continueShopping", language)}</p>
            <Link to="/">
              <Button>{getTranslatedText("continueShopping", language)}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              {Object.entries(groupedItems).map(([sellerId, { seller, items }]) => (
                <div key={sellerId} className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">{seller.name}</h2>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendOrderToSeller(seller.whatsapp, items)}
                      className="text-sm bg-[#25D366] hover:bg-[#128C7E] text-white border-0 shadow-sm font-medium"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      {getTranslatedText("sendByWhatsapp", language)}
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden shadow-sm">
                    {items.map((item, index) => (
                      <div 
                        key={item.id} 
                        className={`p-4 flex items-center gap-4 ${index < items.length - 1 ? 'border-b' : ''}`}
                      >
                        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                            {item.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.currency} {item.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-2 min-w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right font-medium min-w-24">
                          {item.currency} {(item.price * item.quantity).toLocaleString()}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="col-span-1">
              <div className="border rounded-lg p-6 sticky top-24 shadow-sm">
                <h2 className="text-lg font-medium mb-4">
                  {getTranslatedText("orderSummary", language)}
                </h2>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {getTranslatedText("quantity", language)}
                    </span>
                    <span>{totalItems}</span>
                  </div>
                  
                  <div className="border-t pt-3 flex justify-between text-base font-medium">
                    <span>{getTranslatedText("total", language)}</span>
                    <span>
                      {cartItems[0]?.currency || "MAD"} {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {Object.entries(groupedItems).length > 1 && (
                  <p className="text-xs text-muted-foreground mb-4">
                    * {language === "fr" ? "Les produits proviennent de différents vendeurs" : 
                       language === "ar" ? "المنتجات من بائعين مختلفين" : 
                       "Products are from different sellers"}
                  </p>
                )}
                
                {Object.entries(groupedItems).map(([sellerId, { seller, items }]) => (
                  <Button 
                    key={sellerId}
                    className="w-full mb-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium shadow-sm"
                    onClick={() => handleSendOrderToSeller(seller.whatsapp, items)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {language === "fr" ? `Commander chez ${seller.name}` : 
                     language === "ar" ? `الطلب من ${seller.name}` : 
                     `Order from ${seller.name}`}
                  </Button>
                ))}
                
                <Link to="/">
                  <Button variant="outline" className="w-full mt-2 shadow-sm font-medium">
                    {getTranslatedText("continueShopping", language)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
