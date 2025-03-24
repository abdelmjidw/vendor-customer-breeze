
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Globe, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

type Language = "fr" | "ar" | "en";

const Settings = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    toast.success(`Language changed to ${getLanguageName(value)}`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      toast.success("Light mode activated");
    } else {
      document.documentElement.classList.add("dark");
      toast.success("Dark mode activated");
    }
  };

  const getLanguageName = (code: Language) => {
    switch (code) {
      case "fr": return "Français";
      case "ar": return "العربية";
      case "en": return "English";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-gradient">Settings</h1>
            <p className="text-muted-foreground">
              Customize your experience and preferences
            </p>
          </div>
          
          <div className="space-y-10">
            {/* Language Settings */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-secondary">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-medium">Language</h2>
                  <p className="text-muted-foreground">
                    Select your preferred language
                  </p>
                </div>
              </div>
              
              <RadioGroup
                value={language}
                onValueChange={(value) => handleLanguageChange(value as Language)}
                className="gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fr" id="fr" />
                  <Label htmlFor="fr" className="flex items-center">
                    <span className="ml-2">Français</span>
                    <span className="ml-2 text-muted-foreground">🇫🇷</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ar" id="ar" />
                  <Label htmlFor="ar" className="flex items-center">
                    <span className="ml-2">العربية</span>
                    <span className="ml-2 text-muted-foreground">🇲🇦</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en" className="flex items-center">
                    <span className="ml-2">English</span>
                    <span className="ml-2 text-muted-foreground">🇬🇧</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Theme Settings */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-secondary">
                  {isDarkMode ? (
                    <Moon className="h-6 w-6" />
                  ) : (
                    <Sun className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-medium">Appearance</h2>
                  <p className="text-muted-foreground">
                    Toggle between light and dark mode
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </Label>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </div>
            
            {/* Account Settings (Placeholder for future implementation) */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-medium mb-4">Account Preferences</h2>
              <p className="text-muted-foreground mb-4">
                Manage your account settings and preferences
              </p>
              <Button variant="outline" onClick={() => toast.info("This feature is coming soon")}>
                Manage Account
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
