
import { useState, useEffect } from "react";
import { sendVerificationCode, verifyCode } from "@/services/whatsappService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WhatsAppAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  phoneNumber: string;
  verificationCode: string;
  showVerification: boolean;
  storedCode: string | null;
  user: any | null;
}

export const useWhatsAppAuth = () => {
  const [state, setState] = useState<WhatsAppAuthState>({
    isAuthenticated: false,
    isLoading: false,
    phoneNumber: "",
    verificationCode: "",
    showVerification: false,
    storedCode: null,
    user: null
  });

  // Check if user was previously authenticated with Supabase
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data?.session?.user) {
        setState(prev => ({ 
          ...prev, 
          isAuthenticated: true, 
          user: data.session.user,
          phoneNumber: data.session.user.phone || ""
        }));
      } else {
        // Check local WhatsApp auth as fallback
        const storedAuth = localStorage.getItem("whatsapp_auth");
        if (storedAuth) {
          try {
            const { phoneNumber, isAuthenticated } = JSON.parse(storedAuth);
            if (phoneNumber && isAuthenticated) {
              setState(prev => ({ 
                ...prev, 
                phoneNumber, 
                isAuthenticated 
              }));
            }
          } catch (error) {
            console.error("Failed to parse stored auth:", error);
            localStorage.removeItem("whatsapp_auth");
          }
        }
      }
    };
    
    checkAuthStatus();
    
    // Setup Supabase auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setState(prev => ({ 
            ...prev, 
            isAuthenticated: true,
            user: session.user,
            phoneNumber: session.user.phone || prev.phoneNumber
          }));
        } else if (event === 'SIGNED_OUT') {
          setState(prev => ({ 
            ...prev, 
            isAuthenticated: false,
            user: null
          }));
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle phone number input
  const setPhoneNumber = (phoneNumber: string) => {
    setState(prev => ({ ...prev, phoneNumber }));
  };

  // Handle verification code input
  const setVerificationCode = (verificationCode: string) => {
    setState(prev => ({ ...prev, verificationCode }));
  };

  // Send verification code
  const handleSendCode = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // First try with Supabase phone auth
      const formattedPhone = state.phoneNumber.startsWith('+') ? state.phoneNumber : `+${state.phoneNumber}`;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone
      });
      
      if (error) {
        console.error("Supabase phone auth error:", error);
        // Fall back to the legacy WhatsApp verification code system
        const code = await sendVerificationCode(state.phoneNumber);
        
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          showVerification: !!code,
          storedCode: code
        }));
        
        return !!code;
      }
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        showVerification: true
      }));
      
      return true;
    } catch (error) {
      console.error("Send verification code error:", error);
      toast.error("Failed to send verification code");
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false
      }));
      
      return false;
    }
  };

  // Verify code and authenticate user
  const handleVerifyCode = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // First try with Supabase phone auth verification
      const formattedPhone = state.phoneNumber.startsWith('+') ? state.phoneNumber : `+${state.phoneNumber}`;
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: state.verificationCode,
        type: 'sms',
      });
      
      if (error) {
        console.error("Supabase OTP verification error:", error);
        
        // Fall back to the legacy verification system
        const isValid = state.storedCode && 
                      verifyCode(state.verificationCode, state.storedCode);
        
        if (isValid) {
          // Store auth in localStorage for persistence
          localStorage.setItem("whatsapp_auth", JSON.stringify({
            phoneNumber: state.phoneNumber,
            isAuthenticated: true
          }));
        }
        
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          isAuthenticated: !!isValid
        }));
        
        return !!isValid;
      }
      
      // If Supabase verification succeeded
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        isAuthenticated: !!data.session,
        user: data.session?.user || null
      }));
      
      return !!data.session;
    } catch (error) {
      console.error("Verify code error:", error);
      toast.error("Failed to verify code");
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false
      }));
      
      return false;
    }
  };

  // Logout
  const handleLogout = async () => {
    // First try to sign out from Supabase
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out from Supabase:", error);
    }
    
    // Clean up local storage
    localStorage.removeItem("whatsapp_auth");
    
    setState({
      isAuthenticated: false,
      isLoading: false,
      phoneNumber: "",
      verificationCode: "",
      showVerification: false,
      storedCode: null,
      user: null
    });
  };

  return {
    ...state,
    setPhoneNumber,
    setVerificationCode,
    handleSendCode,
    handleVerifyCode,
    handleLogout,
  };
};
