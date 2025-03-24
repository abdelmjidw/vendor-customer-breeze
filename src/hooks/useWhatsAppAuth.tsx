
import { useState, useEffect } from "react";
import { sendVerificationCode, verifyCode } from "@/services/whatsappService";

interface WhatsAppAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  phoneNumber: string;
  verificationCode: string;
  showVerification: boolean;
  storedCode: string | null;
}

export const useWhatsAppAuth = () => {
  const [state, setState] = useState<WhatsAppAuthState>({
    isAuthenticated: false,
    isLoading: false,
    phoneNumber: "",
    verificationCode: "",
    showVerification: false,
    storedCode: null,
  });

  // Check if user was previously authenticated
  useEffect(() => {
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
    
    const code = await sendVerificationCode(state.phoneNumber);
    
    setState(prev => ({ 
      ...prev, 
      isLoading: false,
      showVerification: !!code,
      storedCode: code
    }));
    
    return !!code;
  };

  // Verify code and authenticate user
  const handleVerifyCode = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
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
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("whatsapp_auth");
    setState({
      isAuthenticated: false,
      isLoading: false,
      phoneNumber: "",
      verificationCode: "",
      showVerification: false,
      storedCode: null,
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
