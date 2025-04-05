
import { toast } from "sonner";
import { ProductProps } from "@/components/ProductCard";

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

// Function to send cart order via WhatsApp
export const sendCartOrder = async (
  phone: string,
  products: Array<ProductProps & { quantity: number }>,
  language: string = 'fr'
): Promise<boolean> => {
  try {
    // Format phone number
    const formattedPhone = phone.startsWith('+') 
      ? phone.substring(1) 
      : phone;
    
    // Create order message
    let message: string;
    
    switch (language) {
      case 'ar':
        message = "طلب جديد:\n\n";
        break;
      case 'fr':
        message = "Nouvelle commande:\n\n";
        break;
      default:
        message = "New order:\n\n";
    }
    
    let totalAmount = 0;
    
    // Add each product to the message
    products.forEach((product, index) => {
      const productTotal = product.price * product.quantity;
      totalAmount += productTotal;
      
      message += `${index + 1}. ${product.title} x ${product.quantity}\n`;
      message += `   ${product.price} ${product.currency} x ${product.quantity} = ${productTotal} ${product.currency}\n\n`;
    });
    
    // Add total
    switch (language) {
      case 'ar':
        message += `المجموع: ${totalAmount} ${products[0]?.currency || 'MAD'}`;
        break;
      case 'fr':
        message += `Total: ${totalAmount} ${products[0]?.currency || 'MAD'}`;
        break;
      default:
        message += `Total: ${totalAmount} ${products[0]?.currency || 'MAD'}`;
    }
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
    
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp order:", error);
    toast.error("Failed to send order. Please try again.");
    return false;
  }
};
