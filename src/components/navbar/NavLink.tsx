
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  isActive: boolean;
  className?: string;
  badge?: number;
}

const NavLink = ({ to, children, isActive, className = "", badge }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      } ${className} relative`}
    >
      {children}
      
      {/* Badge for cart items count */}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
};

export default NavLink;
