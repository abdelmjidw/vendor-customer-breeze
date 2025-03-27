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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

// Define subcategories for each main category
const subcategories = {
  Fashion: ["Men", "Women", "Kids", "Accessories"],
  Beauty: ["Makeup", "Skincare", "Haircare", "Fragrances"],
  Electronics: ["Phones", "Computers", "TVs", "Accessories"],
  Home: ["Furniture", "Decoration", "Kitchen", "Bathroom"],
  Jewelry: ["Rings", "Necklaces", "Earrings", "Bracelets"],
  Food: ["Snacks", "Beverages", "Desserts", "Organic"],
  Sports: ["Clothing", "Equipment", "Shoes", "Accessories"],
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [customSubcategories, setCustomSubcategories] = useState<Record<string, string[]>>({});
  const [newCategory, setNewCategory] = useState<string>("");
  const [newSubcategory, setNewSubcategory] = useState<string>("");
  
  // States for available options
  const [sizes, setSizes] = useState<string[]>(["Small", "Medium", "Large"]);
  const [colors, setColors] = useState<{name: string, hex: string}[]>([
    {name: "Red", hex: "#f44336"},
    {name: "Blue", hex: "#2196f3"},
    {name: "Green", hex: "#4caf50"}
  ]);
  const [newSize, setNewSize] = useState<string>("");
  const [newColor, setNewColor] = useState<{name: string, hex: string}>({name: "", hex: "#000000"});
  const [isOpenSizeDialog, setIsOpenSizeDialog] = useState(false);
  const [isOpenColorDialog, setIsOpenColorDialog] = useState(false);
  
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
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    
    if ([...categories, ...customCategories].includes(newCategory)) {
      toast.error("This category already exists");
      return;
    }
    
    setCustomCategories([...customCategories, newCategory]);
    setCustomSubcategories({
      ...customSubcategories,
      [newCategory]: []
    });
    setSelectedCategory(newCategory);
    setNewCategory("");
    toast.success("Category added successfully");
  };
  
  const handleAddSubcategory = () => {
    if (!selectedCategory) {
      toast.error("Please select a category first");
      return;
    }
    
    if (!newSubcategory.trim()) {
      toast.error("Please enter a subcategory name");
      return;
    }
    
    const existingSubcats = customSubcategories[selectedCategory] || [];
    const defaultSubcats = subcategories[selectedCategory as keyof typeof subcategories] || [];
    
    if ([...defaultSubcats, ...existingSubcats].includes(newSubcategory)) {
      toast.error("This subcategory already exists");
      return;
    }
    
    setCustomSubcategories({
      ...customSubcategories,
      [selectedCategory]: [...existingSubcats, newSubcategory]
    });
    
    setNewSubcategory("");
    toast.success("Subcategory added successfully");
  };
  
  // Size management
  const handleAddSize = () => {
    if (!newSize.trim()) {
      toast.error("Please enter a size");
      return;
    }
    
    if (sizes.includes(newSize)) {
      toast.error("This size already exists");
      return;
    }
    
    setSizes([...sizes, newSize]);
    setNewSize("");
    setIsOpenSizeDialog(false);
    toast.success("Size added successfully");
  };
  
  const handleRemoveSize = (sizeToRemove: string) => {
    setSizes(sizes.filter(size => size !== sizeToRemove));
  };
  
  // Color management
  const handleAddColor = () => {
    if (!newColor.name.trim()) {
      toast.error("Please enter a color name");
      return;
    }
    
    if (colors.some(color => color.name === newColor.name)) {
      toast.error("This color already exists");
      return;
    }
    
    setColors([...colors, newColor]);
    setNewColor({name: "", hex: "#000000"});
    setIsOpenColorDialog(false);
    toast.success("Color added successfully");
  };
  
  const handleRemoveColor = (colorName: string) => {
    setColors(colors.filter(color => color.name !== colorName));
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
  
  // Get all subcategories for the selected category
  const getSubcategories = () => {
    if (!selectedCategory) return [];
    
    const defaultSubcats = subcategories[selectedCategory as keyof typeof subcategories] || [];
    const customSubcats = customSubcategories[selectedCategory] || [];
    
    return [...defaultSubcats, ...customSubcats];
  };
  
  // Handle API-based product creation
  const handleApiImport = () => {
    // This would typically fetch product data from an external API
    // For now, we'll just simulate it with a success message
    toast.success("Products imported from API successfully");
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
                      <div className="flex items-center gap-2">
                        <Select 
                          value={selectedCategory}
                          onValueChange={handleCategoryChange}
                          required
                        >
                          <SelectTrigger id="category" className="flex-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                            {customCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              className="h-10 px-3"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Category</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="new-category">Category Name</Label>
                                <Input 
                                  id="new-category" 
                                  placeholder="E.g., Handmade"
                                  value={newCategory}
                                  onChange={(e) => setNewCategory(e.target.value)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                type="button" 
                                onClick={handleAddCategory}
                              >
                                Add Category
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                  
                  {selectedCategory && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="subcategory">
                          Subcategory
                        </Label>
                        <div className="flex items-center gap-2">
                          <Select>
                            <SelectTrigger id="subcategory" className="flex-1">
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                            <SelectContent>
                              {getSubcategories().map((subcategory) => (
                                <SelectItem key={subcategory} value={subcategory}>
                                  {subcategory}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                className="h-10 px-3"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add New Subcategory</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="category-display">Category</Label>
                                  <Input 
                                    id="category-display" 
                                    value={selectedCategory}
                                    disabled 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="new-subcategory">Subcategory Name</Label>
                                  <Input 
                                    id="new-subcategory" 
                                    placeholder="E.g., Vintage"
                                    value={newSubcategory}
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button 
                                  type="button" 
                                  onClick={handleAddSubcategory}
                                >
                                  Add Subcategory
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                  {/* Sizes */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Available Sizes</Label>
                      <Dialog open={isOpenSizeDialog} onOpenChange={setIsOpenSizeDialog}>
                        <DialogTrigger asChild>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Size
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Size</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-size">Size Name</Label>
                              <Input 
                                id="new-size" 
                                placeholder="E.g., XL, XXL, 42, 44..."
                                value={newSize}
                                onChange={(e) => setNewSize(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              type="button" 
                              onClick={handleAddSize}
                            >
                              Add Size
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <div key={size} className="flex items-center border rounded-full px-3 py-1">
                          <span className="text-sm">{size}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSize(size)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {sizes.length === 0 && (
                        <p className="text-sm text-muted-foreground">No sizes added yet</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Available Colors</Label>
                      <Dialog open={isOpenColorDialog} onOpenChange={setIsOpenColorDialog}>
                        <DialogTrigger asChild>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="h-8"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Color
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Color</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-color-name">Color Name</Label>
                              <Input 
                                id="new-color-name" 
                                placeholder="E.g., Navy Blue"
                                value={newColor.name}
                                onChange={(e) => setNewColor({...newColor, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-color-hex">Color Code</Label>
                              <div className="flex gap-2 items-center">
                                <div 
                                  className="w-8 h-8 rounded border" 
                                  style={{ backgroundColor: newColor.hex }}
                                />
                                <Input 
                                  id="new-color-hex" 
                                  type="color"
                                  value={newColor.hex}
                                  onChange={(e) => setNewColor({...newColor, hex: e.target.value})}
                                  className="w-full h-10"
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              type="button" 
                              onClick={handleAddColor}
                            >
                              Add Color
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <div key={color.name} className="flex items-center border rounded-full px-3 py-1">
                          <span 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: color.hex }}
                          ></span>
                          <span className="text-sm">{color.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(color.name)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {colors.length === 0 && (
                        <p className="text-sm text-muted-foreground">No colors added yet</p>
                      )}
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
