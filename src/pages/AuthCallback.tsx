
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      const { hash, search } = window.location;
      
      if (!hash && !search) {
        return navigate("/auth");
      }
      
      // Process the callback
      const { error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("Auth callback error:", error);
        return navigate("/auth");
      }
      
      // Redirect to the home page
      navigate("/");
    };
    
    handleAuthCallback();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg">Redirection en cours...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
