
import { Link } from "react-router-dom";

const NotFoundMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <p className="text-xl mb-4">Product not found</p>
      <Link to="/" className="text-primary hover:underline">
        Return to home
      </Link>
    </div>
  );
};

export default NotFoundMessage;
