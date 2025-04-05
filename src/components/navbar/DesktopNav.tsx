
import { Home, Heart, Settings, ShoppingBag, ShoppingCart } from "lucide-react";
import NavLink from "./NavLink";
import { useCart } from "@/contexts/CartContext";

interface DesktopNavProps {
  isActive: (path: string) => boolean;
  getTranslatedNavText: (key: string) => string;
}

const DesktopNav = ({ isActive, getTranslatedNavText }: DesktopNavProps) => {
  const { totalItems } = useCart();
  
  return (
    <nav className="hidden md:flex items-center space-x-1">
      <NavLink to="/" isActive={isActive("/")}>
        <Home className="h-5 w-5" />
        <span>{getTranslatedNavText("home")}</span>
      </NavLink>
      <NavLink to="/cart" isActive={isActive("/cart")} badge={totalItems}>
        <ShoppingCart className="h-5 w-5" />
        <span>{getTranslatedNavText("cart")}</span>
      </NavLink>
      <NavLink to="/favorites" isActive={isActive("/favorites")}>
        <Heart className="h-5 w-5" />
        <span>{getTranslatedNavText("favorites")}</span>
      </NavLink>
      <NavLink to="/settings" isActive={isActive("/settings")}>
        <Settings className="h-5 w-5" />
        <span>{getTranslatedNavText("settings")}</span>
      </NavLink>
      <NavLink to="/seller/dashboard" isActive={isActive("/seller/dashboard")}>
        <ShoppingBag className="h-5 w-5" />
        <span>{getTranslatedNavText("sell")}</span>
      </NavLink>
    </nav>
  );
};

export default DesktopNav;
