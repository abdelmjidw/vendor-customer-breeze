
import { toast } from "sonner";

// WhatsApp Cloud API Configuration
// Replace these with your actual credentials from Meta Developer Dashboard
const WHATSAPP_API_VERSION = "v18.0";
const WHATSAPP_PHONE_NUMBER_ID = "your_phone_number_id"; // Get from Meta Dashboard
const WHATSAPP_ACCESS_TOKEN = "your_access_token"; // Get from Meta Dashboard
const WHATSAPP_API_BASE_URL = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}`;

// Function to send verification code via WhatsApp
export const sendVerificationCode = async (phoneNumber: string): Promise<string | null> => {
  try {
    // For development/demo, generate a random code
    // In production, you would store this securely in your backend
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Format phone number (remove '+' if present)
    const formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber.substring(1) 
      : phoneNumber;
    
    // Message template for verification
    const message = `Your verification code is: ${verificationCode}`;
    
    // In a real implementation, this would call the WhatsApp API
    // For now, we'll simulate the API call
    console.log(`[WhatsApp API] Sending code ${verificationCode} to ${formattedPhone}`);
    
    /* 
    // This would be the actual API call in production:
    const response = await fetch(`${WHATSAPP_API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone,
        type: "text",
        text: {
          body: message
        }
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }
    
    const data = await response.json();
    console.log('WhatsApp API response:', data);
    */
    
    // Return the code so it can be verified later
    // In production, this would be stored in your database
    return verificationCode;
  } catch (error) {
    console.error("Error sending WhatsApp verification:", error);
    toast.error("Failed to send verification code. Please try again.");
    return null;
  }
};

// Function to verify the code entered by user
export const verifyCode = (enteredCode: string, expectedCode: string): boolean => {
  return enteredCode === expectedCode;
};

// Function to send a WhatsApp message to a seller
export const sendWhatsAppMessage = async (
  phone: string, 
  message: string
): Promise<boolean> => {
  try {
    // Format phone number (remove '+' if present)
    const formattedPhone = phone.startsWith('+') 
      ? phone.substring(1) 
      : phone;
    
    // For now, we'll use the direct link approach 
    // as it doesn't require API credentials
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
    
    /* 
    // This would be the actual API call in production:
    const response = await fetch(`${WHATSAPP_API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone,
        type: "text",
        text: {
          body: message
        }
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }
    
    const data = await response.json();
    console.log('WhatsApp API response:', data);
    */
    
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    toast.error("Failed to send message. Please try again.");
    return false;
  }
};
