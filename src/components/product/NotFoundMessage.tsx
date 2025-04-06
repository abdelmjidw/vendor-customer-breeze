
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";

const NotFoundMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 p-8 glass rounded-xl">
      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <PackageSearch className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-medium mb-2">Product not found</h2>
      <p className="text-muted-foreground mb-6 text-center">
        The product you're looking for doesn't exist or may have been removed.
      </p>
      <Button asChild>
        <Link to="/">
          Return to home
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundMessage;
