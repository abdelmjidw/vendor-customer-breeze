
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface MobileNavLinkProps {
  to: string;
  icon: ReactNode;
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}

const MobileNavLink = ({ 
  to, 
  icon, 
  children, 
  isActive,
  onClick,
  badge
}: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      } relative`}
      onClick={onClick}
    >
      <span className="relative">
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </span>
      <span>{children}</span>
    </Link>
  );
};

export default MobileNavLink;
