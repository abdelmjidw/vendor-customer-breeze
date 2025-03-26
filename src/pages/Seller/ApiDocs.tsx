
import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/App";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Copy, Key } from "lucide-react";
import { toast } from "sonner";

const ApiDocs: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Get API key from local storage
    const savedApiKey = localStorage.getItem("seller_api_key");
    setApiKey(savedApiKey);
  }, []);

  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      apiDocumentation: {
        fr: "Documentation de l'API",
        ar: "توثيق واجهة برمجة التطبيقات",
        en: "API Documentation",
      },
      apiDescription: {
        fr: "Utilisez notre API pour gérer vos produits programmatiquement",
        ar: "استخدم واجهة برمجة التطبيقات لدينا لإدارة منتجاتك برمجيًا",
        en: "Use our API to manage your products programmatically",
      },
      noApiKey: {
        fr: "Vous n'avez pas encore de clé API",
        ar: "ليس لديك مفتاح API حتى الآن",
        en: "You don't have an API key yet",
      },
      generateApiKey: {
        fr: "Générer une clé API",
        ar: "إنشاء مفتاح API",
        en: "Generate API Key",
      },
      authentication: {
        fr: "Authentification",
        ar: "المصادقة",
        en: "Authentication",
      },
      authDescription: {
        fr: "Incluez votre clé API dans l'en-tête Authorization de toutes les requêtes",
        ar: "قم بتضمين مفتاح API الخاص بك في رأس التفويض لجميع الطلبات",
        en: "Include your API key in the Authorization header of all requests",
      },
      endpoint: {
        fr: "Point de terminaison",
        ar: "نقطة النهاية",
        en: "Endpoint",
      },
      headers: {
        fr: "En-têtes",
        ar: "الرؤوس",
        en: "Headers",
      },
      requestBody: {
        fr: "Corps de la requête",
        ar: "هيكل الطلب",
        en: "Request Body",
      },
      response: {
        fr: "Réponse",
        ar: "الاستجابة",
        en: "Response",
      },
      uploadProduct: {
        fr: "Télécharger un produit",
        ar: "تحميل منتج",
        en: "Upload Product",
      },
      copy: {
        fr: "Copier",
        ar: "نسخ",
        en: "Copy",
      },
      copied: {
        fr: "Copié",
        ar: "تم النسخ",
        en: "Copied",
      },
    };

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(getTranslatedText("copied"));
  };

  const createEndpoint = "https://api.yourdomain.com/v1/products";
  const authHeaderExample = `Authorization: Bearer ${apiKey || "YOUR_API_KEY"}`;
  
  const requestBodyExample = JSON.stringify({
    title: "Product Name",
    price: 299,
    currency: "MAD",
    images: ["https://example.com/image1.jpg"],
    category: "Category",
    subcategory: "Subcategory",
    location: "City",
    size: ["S", "M", "L"],
    colors: ["Red", "Blue", "Green"],
  }, null, 2);

  const responseExample = JSON.stringify({
    id: "prod_123456",
    title: "Product Name",
    price: 299,
    currency: "MAD",
    images: ["https://example.com/image1.jpg"],
    category: "Category",
    subcategory: "Subcategory",
    location: "City",
    size: ["S", "M", "L"],
    colors: ["Red", "Blue", "Green"],
    created_at: "2023-08-15T10:00:00Z"
  }, null, 2);

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : ''}`}>
      <Navbar />
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              {getTranslatedText("apiDocumentation")}
            </h1>
            <p className="text-muted-foreground">
              {getTranslatedText("apiDescription")}
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/seller/dashboard">
                {language === "ar" ? "العودة إلى لوحة التحكم" : 
                 language === "fr" ? "Retour au tableau de bord" : 
                 "Back to Dashboard"}
              </Link>
            </Button>
          </div>
        </div>

        {!apiKey ? (
          <div className="glass rounded-xl p-8 text-center my-8">
            <div className="mb-4">
              <Key className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {getTranslatedText("noApiKey")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === "ar" 
                ? "قم بإنشاء مفتاح API من لوحة التحكم الخاصة بك لاستخدام واجهة برمجة التطبيقات"
                : language === "fr"
                ? "Créez une clé API depuis votre tableau de bord pour utiliser l'API"
                : "Create an API key from your dashboard to use the API"}
            </p>
            <Button asChild>
              <Link to="/seller/dashboard?tab=api">
                {getTranslatedText("generateApiKey")}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="glass rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                {getTranslatedText("authentication")}
              </h2>
              <p className="text-muted-foreground">
                {getTranslatedText("authDescription")}
              </p>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <code className="text-sm font-mono">{getTranslatedText("headers")}</code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(authHeaderExample)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {getTranslatedText("copy")}
                  </Button>
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                  {authHeaderExample}
                </pre>
              </div>
            </section>

            <section className="glass rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                {getTranslatedText("uploadProduct")}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-medium mb-2">
                    {getTranslatedText("endpoint")}
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <code className="text-sm font-mono">POST</code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(createEndpoint)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {getTranslatedText("copy")}
                      </Button>
                    </div>
                    <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                      {createEndpoint}
                    </pre>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">
                    {getTranslatedText("requestBody")}
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <code className="text-sm font-mono">JSON</code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(requestBodyExample)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {getTranslatedText("copy")}
                      </Button>
                    </div>
                    <pre className="text-xs font-mono text-xs whitespace-pre-wrap overflow-x-auto">
                      {requestBodyExample}
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">
                  {getTranslatedText("response")}
                </p>
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <code className="text-sm font-mono">200 OK</code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(responseExample)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {getTranslatedText("copy")}
                    </Button>
                  </div>
                  <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                    {responseExample}
                  </pre>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApiDocs;
