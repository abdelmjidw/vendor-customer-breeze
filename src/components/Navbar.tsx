
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home, Search, Settings, ShoppingBag, User, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"fr" | "ar" | "en">("fr");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get stored language on component mount
    const savedLanguage = localStorage.getItem("app_language");
    if (savedLanguage && ["fr", "ar", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage as "fr" | "ar" | "en");
    }
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getTranslatedNavText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      home: {
        fr: "Accueil",
        ar: "الرئيسية",
        en: "Home"
      },
      favorites: {
        fr: "Favoris",
        ar: "المفضلة",
        en: "Favorites"
      },
      settings: {
        fr: "Paramètres",
        ar: "الإعدادات",
        en: "Settings"
      },
      sell: {
        fr: "Vendre",
        ar: "بيع",
        en: "Sell"
      },
      menu: {
        fr: "Menu",
        ar: "القائمة",
        en: "Menu"
      }
    };

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold text-gradient"
          >
            Souk Connect
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={isActive("/")}>
              <Home className="h-5 w-5" />
              <span>{getTranslatedNavText("home")}</span>
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

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm glass shadow-lg animate-slide-in">
            <div className="flex flex-col h-full">
              <div className="p-4 flex justify-between items-center border-b border-border">
                <span className="text-lg font-medium">{getTranslatedNavText("menu")}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getTranslatedNavText("home")}
                  </MobileNavLink>
                  <MobileNavLink 
                    to="/favorites" 
                    icon={<Heart className="h-5 w-5" />}
                    isActive={isActive("/favorites")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getTranslatedNavText("favorites")}
                  </MobileNavLink>
                  <MobileNavLink 
                    to="/settings" 
                    icon={<Settings className="h-5 w-5" />}
                    isActive={isActive("/settings")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getTranslatedNavText("settings")}
                  </MobileNavLink>
                  <MobileNavLink 
                    to="/seller/dashboard" 
                    icon={<ShoppingBag className="h-5 w-5" />}
                    isActive={isActive("/seller/dashboard")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getTranslatedNavText("sell")}
                  </MobileNavLink>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavLink = ({ 
  to, 
  children, 
  isActive 
}: { 
  to: string; 
  children: React.ReactNode; 
  isActive: boolean 
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ 
  to, 
  icon, 
  children, 
  isActive,
  onClick 
}: { 
  to: string; 
  icon: React.ReactNode;
  children: React.ReactNode; 
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;
