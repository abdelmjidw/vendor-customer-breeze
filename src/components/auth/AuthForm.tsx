
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "@/App";
import { getTranslatedText, SupportedLanguage } from "@/utils/translations";
import { Separator } from "@/components/ui/separator";

const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set up listener for OTP verification process
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success(getTranslatedText("checkEmail", language as SupportedLanguage));
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      
      if (error) throw error;
      
      setShowVerification(true);
      toast.success(getTranslatedText("codeSent", language as SupportedLanguage));
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: verificationCode,
        type: 'sms',
      });
      
      if (error) throw error;
      
      navigate('/');
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'apple') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.error_description || error.message);
      setLoading(false);
    }
  };
  
  if (showVerification) {
    return (
      <div className="glass rounded-2xl p-8 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {getTranslatedText("verifyPhone", language as SupportedLanguage)}
        </h2>
        
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {getTranslatedText("verificationCode", language as SupportedLanguage)}
            </label>
            <Input
              type="text" 
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder={getTranslatedText("enterCode", language as SupportedLanguage)}
              required
            />
            <p className="text-xs text-muted-foreground">
              {getTranslatedText("codeInfo", language as SupportedLanguage)} {phoneNumber}
            </p>
          </div>
          
          <div className="flex justify-between">
            <button 
              type="button"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => setShowVerification(false)}
            >
              {getTranslatedText("changePhone", language as SupportedLanguage)}
            </button>
            
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={() => handlePhoneSignIn(new Event('click') as any)}
            >
              {getTranslatedText("resendCode", language as SupportedLanguage)}
            </button>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? getTranslatedText("verifying", language as SupportedLanguage) : getTranslatedText("verify", language as SupportedLanguage)}
          </Button>
        </form>
      </div>
    );
  }
  
  return (
    <div className="glass rounded-2xl p-8 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gradient">
        {getTranslatedText("authentication", language as SupportedLanguage)}
      </h1>
      
      <Tabs defaultValue="email">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">{getTranslatedText("phone", language as SupportedLanguage)}</TabsTrigger>
          <TabsTrigger value="oauth">{getTranslatedText("social", language as SupportedLanguage)}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className={language === 'ar' ? 'order-last' : ''}
                onClick={() => document.getElementById('signin-form')?.classList.remove('hidden')}
              >
                {getTranslatedText("signIn", language as SupportedLanguage)}
              </Button>
              <Button
                onClick={() => document.getElementById('signup-form')?.classList.remove('hidden')}
              >
                {getTranslatedText("signUp", language as SupportedLanguage)}
              </Button>
            </div>
            
            <form id="signin-form" onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{getTranslatedText("password", language as SupportedLanguage)}</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
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
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? getTranslatedText("signingIn", language as SupportedLanguage) : getTranslatedText("signIn", language as SupportedLanguage)}
              </Button>
            </form>
            
            <form id="signup-form" onSubmit={handleEmailSignUp} className="space-y-4 hidden">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{getTranslatedText("password", language as SupportedLanguage)}</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
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
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? getTranslatedText("signingUp", language as SupportedLanguage) : getTranslatedText("signUp", language as SupportedLanguage)}
              </Button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="phone">
          <form onSubmit={handlePhoneSignIn} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {getTranslatedText("phoneNumber", language as SupportedLanguage)}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">+</span>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-8"
                  placeholder="212601010101"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {getTranslatedText("codeBySMS", language as SupportedLanguage)}
              </p>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? getTranslatedText("sendingCode", language as SupportedLanguage) : getTranslatedText("sendCode", language as SupportedLanguage)}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="oauth">
          <div className="grid gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6,20H24v8h11.3c-1.1,5.2-5.5,8-11.3,8c-6.6,0-12-5.4-12-12s5.4-12,12-12c3,0,5.8,1.1,7.9,3l6-6 C33.7,5.9,29,4,24,4C13,4,4,13,4,24s9,20,20,20s19-9,19-20C43,22.7,42.9,21.3,43.6,20z"/>
                <path fill="#FF3D00" d="M6.3,14.7l7,5.4c1.8-5.1,6.7-8.1,12.8-8.1c3,0,5.8,1.1,7.9,3l6-6C33.7,5.9,29,4,24,4 C16.8,4,10.4,8.3,6.3,14.7z"/>
                <path fill="#4CAF50" d="M24,44c4.9,0,9.5-1.8,12.9-4.9l-6.6-5.2c-1.8,1.2-4.3,2.1-6.3,2.1c-5.8,0-10.2-3.9-11.3-9.1l-6.8,5.2 C9.1,39.3,16.1,44,24,44z"/>
                <path fill="#1976D2" d="M43.6,20H24v8h11.3c-0.5,2.6-2.1,4.8-4.2,6.3l0,0l6.6,5.2c-0.4,0.3,6.7-4.9,6.7-15.5 C43,22.7,42.9,21.3,43.6,20z"/>
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn('apple')}
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              Apple
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
