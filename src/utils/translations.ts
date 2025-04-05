
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
  },
  // Authentication translations
  signIn: {
    fr: "Se connecter",
    ar: "تسجيل الدخول",
    en: "Sign In"
  },
  signUp: {
    fr: "S'inscrire",
    ar: "إنشاء حساب",
    en: "Sign Up"
  },
  signingIn: {
    fr: "Connexion...",
    ar: "جاري تسجيل الدخول...",
    en: "Signing in..."
  },
  signingUp: {
    fr: "Inscription...",
    ar: "جاري إنشاء الحساب...",
    en: "Signing up..."
  },
  password: {
    fr: "Mot de passe",
    ar: "كلمة المرور",
    en: "Password"
  },
  phone: {
    fr: "Téléphone",
    ar: "الهاتف",
    en: "Phone"
  },
  phoneNumber: {
    fr: "Numéro de téléphone",
    ar: "رقم الهاتف",
    en: "Phone number"
  },
  social: {
    fr: "Social",
    ar: "تواصل اجتماعي",
    en: "Social"
  },
  sendCode: {
    fr: "Envoyer le code",
    ar: "إرسال الرمز",
    en: "Send code"
  },
  sendingCode: {
    fr: "Envoi du code...",
    ar: "جاري إرسال الرمز...",
    en: "Sending code..."
  },
  checkEmail: {
    fr: "Vérifiez votre email pour confirmer votre compte",
    ar: "تحقق من بريدك الإلكتروني لتأكيد حسابك",
    en: "Check your email to confirm your account"
  },
  codeBySMS: {
    fr: "Nous vous enverrons un code de vérification par SMS",
    ar: "سنرسل لك رمز التحقق عبر الرسائل القصيرة",
    en: "We will send you a verification code by SMS"
  },
  verifyPhone: {
    fr: "Vérifiez votre téléphone",
    ar: "تحقق من هاتفك",
    en: "Verify your phone"
  },
  verificationCode: {
    fr: "Code de vérification",
    ar: "رمز التحقق",
    en: "Verification code"
  },
  enterCode: {
    fr: "Entrez le code",
    ar: "أدخل الرمز",
    en: "Enter code"
  },
  codeInfo: {
    fr: "Code envoyé à",
    ar: "تم إرسال الرمز إلى",
    en: "Code sent to"
  },
  changePhone: {
    fr: "Changer le numéro",
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
  verify: {
    fr: "Vérifier",
    ar: "تحقق",
    en: "Verify"
  },
  // New minimal UI translations
  addToCartShort: {
    fr: "Ajouter",
    ar: "أضف",
    en: "Add"
  },
  sendShort: {
    fr: "Envoyer",
    ar: "إرسال",
    en: "Send"
  }
};

export const getTranslatedText = (key: string, language: SupportedLanguage): string => {
  return translations[key]?.[language] || translations[key]?.en || key;
};
