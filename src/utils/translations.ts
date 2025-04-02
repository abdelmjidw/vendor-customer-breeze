
export type SupportedLanguage = "fr" | "ar" | "en";

const translations: Record<string, Record<SupportedLanguage, string>> = {
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
  },
  login: {
    fr: "Se connecter",
    ar: "تسجيل الدخول",
    en: "Login"
  },
  authentication: {
    fr: "Authentification",
    ar: "المصادقة",
    en: "Authentication"
  },
  logout: {
    fr: "Déconnexion",
    ar: "تسجيل الخروج",
    en: "Logout"
  },
  myAccount: {
    fr: "Mon compte",
    ar: "حسابي",
    en: "My account"
  }
};

export const getTranslatedText = (key: string, language: SupportedLanguage): string => {
  return translations[key]?.[language] || translations[key]?.en || key;
};
