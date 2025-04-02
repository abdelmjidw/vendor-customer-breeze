
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/auth/AuthForm";
import { LanguageContext } from "@/App";

const Auth = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/");
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
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
        <AuthForm />
      </main>
    </div>
  );
};

export default Auth;
