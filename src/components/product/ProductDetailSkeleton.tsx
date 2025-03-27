
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <Skeleton className="w-full h-64 rounded-xl" />
      <Skeleton className="w-3/4 h-8 mt-4 rounded-xl" />
      <Skeleton className="w-1/2 h-6 mt-2 rounded-xl" />
    </div>
  );
};

export default ProductDetailSkeleton;
