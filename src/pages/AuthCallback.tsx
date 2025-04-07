
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      const { hash, search } = window.location;
      
      if (!hash && !search) {
        return navigate("/auth");
      }
      
      try {
        // Process the callback
        const { data, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          console.error("Auth callback error:", authError);
          setError(authError.message);
          toast.error("Authentication failed. Please try again.");
          return navigate("/auth");
        }
        
        if (data?.session?.user) {
          // Check if this is a seller account
          const { data: sellerData } = await supabase
            .from('sellers')
            .select('id')
            .eq('id', data.session.user.id)
            .maybeSingle();
            
          // Redirect based on whether this is a seller account
          if (sellerData) {
            toast.success("Successfully logged in as seller");
            navigate("/seller/dashboard");
          } else {
            toast.success("Successfully logged in");
            navigate("/");
          }
        } else {
          // If no session, redirect to auth page
          navigate("/auth");
        }
      } catch (err) {
        console.error("Error processing auth callback:", err);
        setError("An unexpected error occurred");
        navigate("/auth");
      }
    };
    
    handleAuthCallback();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="text-red-500">
            <p className="text-lg">Authentication error</p>
            <p className="mt-2">{error}</p>
          </div>
        ) : (
          <>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg">Redirection en cours...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
