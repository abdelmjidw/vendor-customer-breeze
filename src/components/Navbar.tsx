
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopNav from "./navbar/DesktopNav";
import MobileMenu from "./navbar/MobileMenu";
import { getTranslatedText, SupportedLanguage } from "@/utils/translations";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>("fr");
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
      setLanguage(savedLanguage as SupportedLanguage);
    }
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getTranslatedNavText = (key: string) => {
    return getTranslatedText(key, language);
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

          <DesktopNav 
            isActive={isActive} 
            getTranslatedNavText={getTranslatedNavText} 
          />

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

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        getTranslatedNavText={getTranslatedNavText}
        isActive={isActive}
      />
    </>
  );
};

export default Navbar;
