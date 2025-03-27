
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newImagesLoaded = [...prev];
      newImagesLoaded[index] = true;
      return newImagesLoaded;
    });
  };

  const goToNextImage = () => {
    if (!images.length) return;
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPreviousImage = () => {
    if (!images.length) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl aspect-square bg-secondary">
        {!imagesLoaded[currentImageIndex] && (
          <div className="absolute inset-0 bg-secondary animate-pulse"></div>
        )}
        <img
          src={images[currentImageIndex]}
          alt={`Product image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imagesLoaded[currentImageIndex] ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => handleImageLoad(currentImageIndex)}
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full glass"
              onClick={goToPreviousImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full glass"
              onClick={goToNextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div 
          className="flex space-x-2 overflow-x-auto py-2" 
          ref={sliderRef}
        >
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                currentImageIndex === index
                  ? "ring-2 ring-primary"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => selectImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
