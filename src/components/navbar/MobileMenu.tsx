
import { X, Home, Heart, Settings, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNavLink from "./MobileNavLink";
import { useCart } from "@/contexts/CartContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  getTranslatedNavText: (key: string) => string;
  isActive: (path: string) => boolean;
}

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  getTranslatedNavText, 
  isActive 
}: MobileMenuProps) => {
  const { totalItems } = useCart();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm glass shadow-lg animate-slide-in">
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b border-border">
            <span className="text-lg font-medium">{getTranslatedNavText("menu")}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 p-4 overflow-auto">
            <div className="space-y-1">
              <MobileNavLink 
                to="/" 
                icon={<Home className="h-5 w-5" />}
                isActive={isActive("/")}
                onClick={onClose}
              >
                {getTranslatedNavText("home")}
              </MobileNavLink>
              <MobileNavLink 
                to="/cart" 
                icon={<ShoppingCart className="h-5 w-5" />}
                isActive={isActive("/cart")}
                onClick={onClose}
                badge={totalItems}
              >
                {getTranslatedNavText("cart")}
              </MobileNavLink>
              <MobileNavLink 
                to="/favorites" 
                icon={<Heart className="h-5 w-5" />}
                isActive={isActive("/favorites")}
                onClick={onClose}
              >
                {getTranslatedNavText("favorites")}
              </MobileNavLink>
              <MobileNavLink 
                to="/settings" 
                icon={<Settings className="h-5 w-5" />}
                isActive={isActive("/settings")}
                onClick={onClose}
              >
                {getTranslatedNavText("settings")}
              </MobileNavLink>
              <MobileNavLink 
                to="/seller/dashboard" 
                icon={<ShoppingBag className="h-5 w-5" />}
                isActive={isActive("/seller/dashboard")}
                onClick={onClose}
              >
                {getTranslatedNavText("sell")}
              </MobileNavLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
