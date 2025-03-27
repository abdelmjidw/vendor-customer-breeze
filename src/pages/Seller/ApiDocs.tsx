
import { useContext } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/App";
import { ArrowLeft, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ApiDocs = () => {
  const { language } = useContext(LanguageContext);
  const apiKey = localStorage.getItem("seller_api_key") || "YOUR_API_KEY";

  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      apiDocumentation: {
        fr: "Documentation de l'API",
        ar: "وثائق واجهة برمجة التطبيقات",
        en: "API Documentation"
      },
      apiDocumentationDesc: {
        fr: "Utilisez ces points de terminaison pour intégrer votre boutique avec d'autres services",
        ar: "استخدم نقاط النهاية هذه لدمج متجرك مع الخدمات الأخرى",
        en: "Use these endpoints to integrate your store with other services"
      },
      backToDashboard: {
        fr: "Retour au tableau de bord",
        ar: "العودة إلى لوحة التحكم",
        en: "Back to Dashboard"
      },
      authentication: {
        fr: "Authentification",
        ar: "المصادقة",
        en: "Authentication"
      },
      authenticationDesc: {
        fr: "Toutes les requêtes API doivent inclure votre clé API dans l'en-tête d'autorisation.",
        ar: "يجب أن تتضمن جميع طلبات API مفتاح API الخاص بك في رأس التفويض.",
        en: "All API requests must include your API key in the authorization header."
      },
      example: {
        fr: "Exemple",
        ar: "مثال",
        en: "Example"
      },
      endpoints: {
        fr: "Points de Terminaison",
        ar: "نقاط النهاية",
        en: "Endpoints"
      },
      addProduct: {
        fr: "Ajouter un produit",
        ar: "إضافة منتج",
        en: "Add Product"
      },
      getProducts: {
        fr: "Obtenir les produits",
        ar: "الحصول على المنتجات",
        en: "Get Products"
      },
      copied: {
        fr: "Copié!",
        ar: "تم النسخ!",
        en: "Copied!"
      },
      requestFormat: {
        fr: "Format de la Requête",
        ar: "تنسيق الطلب",
        en: "Request Format"
      },
      responseFormat: {
        fr: "Format de la Réponse",
        ar: "تنسيق الاستجابة",
        en: "Response Format"
      },
      required: {
        fr: "(requis)",
        ar: "(مطلوب)",
        en: "(required)"
      },
      optional: {
        fr: "(optionnel)",
        ar: "(اختياري)",
        en: "(optional)"
      },
    };

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(getTranslatedText("copied"));
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : ''}`}>
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <Button 
          variant="outline" 
          className="mb-6" 
          asChild
        >
          <Link to="/seller/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {getTranslatedText("backToDashboard")}
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">{getTranslatedText("apiDocumentation")}</h1>
          <p className="text-muted-foreground mb-8">
            {getTranslatedText("apiDocumentationDesc")}
          </p>
        </div>

        <div className="glass rounded-xl p-6 space-y-8 mb-8">
          <div>
            <h2 className="text-xl font-medium mb-3">{getTranslatedText("authentication")}</h2>
            <p className="mb-4">{getTranslatedText("authenticationDesc")}</p>

            <div className="bg-muted p-4 rounded-md relative">
              <pre className="text-sm font-mono overflow-x-auto">
                {`Authorization: Bearer ${apiKey}`}
              </pre>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2"
                onClick={() => handleCopy(`Authorization: Bearer ${apiKey}`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-xl font-medium">{getTranslatedText("endpoints")}</h2>

          {/* Add Product API */}
          <div className="glass rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">POST /api/products</h3>
                <p className="text-muted-foreground">{getTranslatedText("addProduct")}</p>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleCopy('POST https://api.example.com/api/products')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{getTranslatedText("requestFormat")}</h4>
                <div className="bg-muted p-4 rounded-md relative">
                  <pre className="text-sm font-mono overflow-x-auto">
{`{
  "title": "String" ${getTranslatedText("required")},
  "price": Number ${getTranslatedText("required")},
  "currency": "String" ${getTranslatedText("required")},
  "images": ["String"] ${getTranslatedText("required")}, 
  "category": "String" ${getTranslatedText("required")},
  "location": "String" ${getTranslatedText("required")},
  "description": "String" ${getTranslatedText("optional")},
  "options": {
    "colors": ["String"] ${getTranslatedText("optional")},
    "sizes": ["String"] ${getTranslatedText("optional")}
  }
}`}
                  </pre>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(`{
  "title": "Moroccan Ceramic Plate",
  "price": 350,
  "currency": "MAD",
  "images": ["http://example.com/image1.jpg"],
  "category": "Home Decor",
  "location": "Fes",
  "description": "Traditional handcrafted plate",
  "options": {
    "colors": ["Blue", "Green", "White"],
    "sizes": ["Small", "Medium", "Large"]
  }
}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">{getTranslatedText("responseFormat")}</h4>
                <div className="bg-muted p-4 rounded-md relative">
                  <pre className="text-sm font-mono overflow-x-auto">
{`{
  "success": true,
  "productId": "string",
  "message": "Product added successfully"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Get Products API */}
          <div className="glass rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">GET /api/products</h3>
                <p className="text-muted-foreground">{getTranslatedText("getProducts")}</p>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleCopy('GET https://api.example.com/api/products')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{getTranslatedText("responseFormat")}</h4>
                <div className="bg-muted p-4 rounded-md relative">
                  <pre className="text-sm font-mono overflow-x-auto">
{`{
  "products": [
    {
      "id": "string",
      "title": "string",
      "price": number,
      "currency": "string",
      "images": ["string"],
      "category": "string",
      "location": "string",
      "description": "string",
      "options": {
        "colors": ["string"],
        "sizes": ["string"]
      },
      "createdAt": "string"
    }
  ],
  "total": number
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiDocs;
