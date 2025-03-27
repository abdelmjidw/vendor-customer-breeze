
import { MapPin } from "lucide-react";
import { ProductProps } from "@/components/ProductCard";

interface ProductInfoProps {
  product: ProductProps;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary mb-2">
          {product.category}
        </span>
        <h1 className="text-3xl font-bold">{product.title}</h1>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold">
          {product.currency} {product.price.toLocaleString()}
        </p>
      </div>
      
      <div className="mt-2 flex items-center text-muted-foreground text-sm">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{product.location}</span>
      </div>
      
      <div className="border-t border-border mt-6 pt-6">
        <h2 className="font-medium mb-2">Product Details</h2>
        <p className="text-muted-foreground">
          This beautiful handcrafted product showcases the exceptional skill of Moroccan artisans. 
          Each piece is unique and made with traditional techniques passed down through generations.
        </p>
      </div>
      
      <div className="border-t border-border mt-6 pt-6">
        <h2 className="font-medium mb-2">Seller Information</h2>
        <p className="text-muted-foreground">
          {product.seller.name} • Based in {product.location}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
