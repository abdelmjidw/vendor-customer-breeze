
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Key, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LanguageContext, Language } from "@/App";

// Authentication form component
export default function AuthForm() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  // Translation function
  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      emailLogin: {
        fr: "Email",
        ar: "البريد الإلكتروني",
        en: "Email"
      },
      phoneLogin: {
        fr: "Téléphone",
        ar: "الهاتف",
        en: "Phone"
      },
      emailAddress: {
        fr: "Adresse email",
        ar: "عنوان البريد الإلكتروني",
        en: "Email address"
      },
      password: {
        fr: "Mot de passe",
        ar: "كلمة المرور",
        en: "Password"
      },
      login: {
        fr: "Se connecter",
        ar: "تسجيل الدخول",
        en: "Login"
      },
      signup: {
        fr: "S'inscrire",
        ar: "التسجيل",
        en: "Sign up"
      },
      loading: {
        fr: "Chargement...",
        ar: "جار التحميل...",
        en: "Loading..."
      },
      orContinueWith: {
        fr: "Ou continuer avec",
        ar: "أو المتابعة باستخدام",
        en: "Or continue with"
      },
      googleSignIn: {
        fr: "Continuer avec Google",
        ar: "المتابعة باستخدام Google",
        en: "Continue with Google"
      },
      appleSignIn: {
        fr: "Continuer avec Apple",
        ar: "المتابعة باستخدام Apple",
        en: "Continue with Apple"
      },
      phoneNumber: {
        fr: "Numéro de téléphone",
        ar: "رقم الهاتف",
        en: "Phone number"
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
      verificationCode: {
        fr: "Code de vérification",
        ar: "رمز التحقق",
        en: "Verification code"
      },
      verify: {
        fr: "Vérifier",
        ar: "تحقق",
        en: "Verify"
      },
      verifying: {
        fr: "Vérification...",
        ar: "جاري التحقق...",
        en: "Verifying..."
      },
      changeNumber: {
        fr: "Changer le numéro",
        ar: "تغيير الرقم",
        en: "Change number"
      },
      resendCode: {
        fr: "Renvoyer le code",
        ar: "إعادة إرسال الرمز",
        en: "Resend code"
      },
      authTitle: {
        fr: "Authentification",
        ar: "المصادقة",
        en: "Authentication"
      },
      authDescription: {
        fr: "Connectez-vous ou créez un compte pour continuer",
        ar: "تسجيل الدخول أو إنشاء حساب للمتابعة",
        en: "Sign in or create an account to continue"
      },
      errors: {
        emptyFields: {
          fr: "Veuillez remplir tous les champs",
          ar: "يرجى ملء جميع الحقول",
          en: "Please fill in all fields"
        },
        invalidPhone: {
          fr: "Numéro de téléphone invalide",
          ar: "رقم هاتف غير صالح",
          en: "Invalid phone number"
        },
        invalidEmail: {
          fr: "Adresse email invalide",
          ar: "عنوان بريد إلكتروني غير صالح",
          en: "Invalid email address"
        },
        authError: {
          fr: "Erreur d'authentification",
          ar: "خطأ في المصادقة",
          en: "Authentication error"
        }
      }
    };

    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Handle email login/signup
  const handleEmailAuth = async (type: 'login' | 'signup') => {
    try {
      setIsLoading(true);

      if (!email || !password) {
        toast.error(getTranslatedText("errors.emptyFields"));
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error(getTranslatedText("errors.invalidEmail"));
        return;
      }

      if (type === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success("Connexion réussie");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          }
        });

        if (error) throw error;
        
        toast.success("Inscription réussie, veuillez vérifier votre email");
      }
    } catch (error) {
      console.error("Email auth error:", error);
      toast.error(error.message || getTranslatedText("errors.authError"));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle phone authentication - send code
  const handleSendPhoneCode = async () => {
    try {
      setIsLoading(true);

      if (!phoneNumber) {
        toast.error(getTranslatedText("errors.emptyFields"));
        return;
      }

      // Validate and format phone number
      let formattedPhone = phoneNumber;
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;
      
      setShowVerification(true);
      toast.success("Code envoyé avec succès");
    } catch (error) {
      console.error("Phone auth error:", error);
      toast.error(error.message || getTranslatedText("errors.authError"));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle phone verification
  const handleVerifyPhoneCode = async () => {
    try {
      setIsLoading(true);

      if (!verificationCode) {
        toast.error(getTranslatedText("errors.emptyFields"));
        return;
      }

      let formattedPhone = phoneNumber;
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone;
      }

      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: verificationCode,
        type: 'sms',
      });

      if (error) throw error;

      toast.success("Vérification réussie");
      navigate("/");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.message || getTranslatedText("errors.authError"));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social logins
  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: provider === 'google' ? {
            prompt: 'select_account', // Force Google to show account selection
          } : undefined,
        }
      });

      if (error) throw error;
      
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(error.message || getTranslatedText("errors.authError"));
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{getTranslatedText("authTitle")}</CardTitle>
        <CardDescription>{getTranslatedText("authDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="email">{getTranslatedText("emailLogin")}</TabsTrigger>
            <TabsTrigger value="phone">{getTranslatedText("phoneLogin")}</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {getTranslatedText("emailAddress")}
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {getTranslatedText("password")}
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1"
                onClick={() => handleEmailAuth('login')}
                disabled={isLoading}
              >
                {isLoading ? getTranslatedText("loading") : getTranslatedText("login")}
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => handleEmailAuth('signup')}
                disabled={isLoading}
              >
                {isLoading ? getTranslatedText("loading") : getTranslatedText("signup")}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
            {!showVerification ? (
              <div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    {getTranslatedText("phoneNumber")}
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="212XXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-8"
                      required
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      +
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={handleSendPhoneCode}
                  disabled={isLoading}
                >
                  {isLoading ? getTranslatedText("sendingCode") : getTranslatedText("sendCode")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="verification-code" className="text-sm font-medium">
                    {getTranslatedText("verificationCode")}
                  </label>
                  <InputOTP
                    value={verificationCode}
                    onChange={setVerificationCode}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1"
                    onClick={handleVerifyPhoneCode}
                    disabled={isLoading}
                  >
                    {isLoading ? getTranslatedText("verifying") : getTranslatedText("verify")}
                  </Button>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <button
                    type="button"
                    className="hover:text-foreground"
                    onClick={() => setShowVerification(false)}
                  >
                    {getTranslatedText("changeNumber")}
                  </button>
                  <button
                    type="button"
                    className="hover:text-foreground"
                    onClick={handleSendPhoneCode}
                    disabled={isLoading}
                  >
                    {getTranslatedText("resendCode")}
                  </button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {getTranslatedText("orContinueWith")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="mr-2">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="mr-2">
              <path d="M16.03 10.4c.02 2.65 2.33 3.53 2.35 3.54-.02.06-.35 1.2-1.15 2.38-.7.02-1.7 1.35-2.8 1.35-1.08 0-1.42-.64-2.65-.64-1.22 0-1.6.62-2.62.66-1.03.04-1.82-1.02-2.53-2.03-1.38-1.98-2.44-5.6-1.02-8.04.7-1.2 1.96-1.96 3.32-1.98 1.04-.02 2.02.7 2.65.7s1.8-.86 3.04-.74c.52.02 1.98.2 2.92 1.56-.07.05-1.74 1.02-1.72 3.02M14.92 3.1c.55-.66.94-1.6.84-2.52-.8.04-1.8.54-2.38 1.2-.5.6-.96 1.56-.84 2.48.9.08 1.82-.4 2.38-1.16"></path>
            </svg>
            Apple
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
