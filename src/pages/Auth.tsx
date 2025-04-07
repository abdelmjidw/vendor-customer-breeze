
import { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/auth/AuthForm";
import { LanguageContext } from "@/App";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  const isSeller = searchParams.get('seller') === 'true';
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      
      if (data?.session) {
        // If seller login was requested, check if the user is a seller
        if (isSeller) {
          const { data: sellerData } = await supabase
            .from('sellers')
            .select('id')
            .eq('id', data.session.user.id)
            .maybeSingle();
          
          if (sellerData) {
            // User is a seller, redirect to seller dashboard
            navigate("/seller/dashboard");
          } else {
            // User exists but is not a seller
            toast.error("This account is not registered as a seller");
          }
        } else {
          // Normal user login, redirect to requested page
          navigate(redirectTo);
        }
      }
      setLoading(false);
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          if (isSeller) {
            // Check if the user is a seller
            const checkSellerStatus = async () => {
              const { data: sellerData } = await supabase
                .from('sellers')
                .select('id')
                .eq('id', session.user.id)
                .maybeSingle();
                
              if (sellerData) {
                navigate("/seller/dashboard");
              } else {
                toast.error("This account is not registered as a seller");
              }
            };
            
            checkSellerStatus();
          } else {
            navigate(redirectTo);
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, redirectTo, isSeller]);
  
  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="fixed top-4 left-4 z-10">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary/90 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
        </button>
      </div>
      
      <main className="flex-1 flex items-center justify-center p-4">
        {loading ? (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        ) : (
          <AuthForm isSeller={isSeller} />
        )}
      </main>
    </div>
  );
};

export default Auth;
