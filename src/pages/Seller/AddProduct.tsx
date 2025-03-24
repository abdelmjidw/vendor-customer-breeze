
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeft, Plus, X, Upload, Image } from "lucide-react";
import { toast } from "sonner";

const currencies = ["MAD", "USD", "EUR"];
const categories = [
  "Fashion",
  "Beauty",
  "Electronics",
  "Home",
  "Jewelry",
  "Food",
  "Sports",
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Simulated image upload function
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || images.length >= 5) return;
    
    setIsUploading(true);
    
    // Simulate uploading delay
    setTimeout(() => {
      const newImages = [...images];
      
      for (let i = 0; i < files.length; i++) {
        if (newImages.length >= 5) break;
        
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      }
      
      setImages(newImages);
      setIsUploading(false);
    }, 1500);
  };
  
  // Simulated video upload function
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate uploading delay
    setTimeout(() => {
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
      setIsUploading(false);
    }, 1500);
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const removeVideo = () => {
    setVideo(null);
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (images.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }
    
    // Simulate form submission
    toast.success("Product added successfully");
    navigate("/seller/dashboard");
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom pt-24 pb-16 animate-enter">
        <div className="mb-6">
          <button
            onClick={() => navigate("/seller/dashboard")}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </button>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gradient">Add New Product</h1>
            <p className="text-muted-foreground">
              Fill in the details to list your product
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Media */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Product Media</h2>
                
                <div className="space-y-6">
                  {/* Images Upload */}
                  <div>
                    <Label className="mb-2 block">
                      Images (Up to 5) <span className="text-muted-foreground text-sm">• Required</span>
                    </Label>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border bg-secondary group">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      
                      {images.length < 5 && (
                        <label className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                          <div className="flex flex-col items-center justify-center p-4">
                            <Image className="h-8 w-8 mb-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground text-center">
                              {images.length === 0 ? "Add images" : "Add more"}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </label>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PNG, JPG, JPEG. Max 5 images.
                    </p>
                  </div>
                  
                  {/* Video Upload */}
                  <div>
                    <Label className="mb-2 block">
                      Video (Optional) <span className="text-muted-foreground text-sm">• Max 2 minutes</span>
                    </Label>
                    
                    {video ? (
                      <div className="relative aspect-video rounded-md overflow-hidden border bg-secondary mb-4">
                        <video
                          src={video}
                          controls
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-40 rounded-md border border-dashed bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer mb-4">
                        <div className="flex flex-col items-center justify-center p-4">
                          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground text-center">
                            Upload a product video
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleVideoUpload}
                          disabled={isUploading}
                        />
                      </label>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Supported format: MP4. Max 2 minutes duration.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Product Details */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Product Details</h2>
                
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Title <span className="text-muted-foreground text-sm">• Required</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter product title"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-muted-foreground text-sm">• Required</span>
                      </Label>
                      <Select required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product..."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Pricing and Inventory */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Pricing & Inventory</h2>
                
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Price <span className="text-muted-foreground text-sm">• Required</span>
                      </Label>
                      <div className="flex">
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="rounded-r-none"
                          required
                        />
                        <Select defaultValue="MAD" required>
                          <SelectTrigger className="w-24 rounded-l-none border-l-0">
                            <SelectValue placeholder="MAD" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quantity">
                        Quantity <span className="text-muted-foreground text-sm">• Required</span>
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        placeholder="1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU / Product Code</Label>
                      <Input
                        id="sku"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Available Options */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-medium mb-4">Available Options</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Available Sizes</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-8"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Size
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <span className="text-sm">Small</span>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <span className="text-sm">Medium</span>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <span className="text-sm">Large</span>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Available Colors</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="h-8"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Color
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-sm">Red</span>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-sm">Blue</span>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-sm">Green</span>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate("/seller/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit">
                Publish Product
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
