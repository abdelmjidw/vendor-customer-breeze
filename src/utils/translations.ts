
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
  },
  cart: {
    fr: "Panier",
    ar: "سلة التسوق",
    en: "Cart"
  },
  addToCart: {
    fr: "Ajouter au panier",
    ar: "أضف إلى السلة",
    en: "Add to cart"
  },
  viewCart: {
    fr: "Voir le panier",
    ar: "عرض السلة",
    en: "View cart"
  },
  orderSummary: {
    fr: "Résumé de la commande",
    ar: "ملخص الطلب",
    en: "Order summary"
  },
  sendOrder: {
    fr: "Envoyer la commande",
    ar: "إرسال الطلب",
    en: "Send order"
  },
  sendByWhatsapp: {
    fr: "Envoyer par WhatsApp",
    ar: "إرسال عبر واتساب",
    en: "Send by WhatsApp"
  },
  removeFromCart: {
    fr: "Retirer du panier",
    ar: "إزالة من السلة",
    en: "Remove from cart"
  },
  total: {
    fr: "Total",
    ar: "المجموع",
    en: "Total"
  },
  quantity: {
    fr: "Quantité",
    ar: "الكمية",
    en: "Quantity"
  },
  emptyCart: {
    fr: "Votre panier est vide",
    ar: "سلة التسوق فارغة",
    en: "Your cart is empty"
  },
  continueShopping: {
    fr: "Continuer vos achats",
    ar: "مواصلة التسوق",
    en: "Continue shopping"
  }
};

export const getTranslatedText = (key: string, language: SupportedLanguage): string => {
  return translations[key]?.[language] || translations[key]?.en || key;
};
