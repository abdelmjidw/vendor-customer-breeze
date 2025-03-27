
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface MobileNavLinkProps {
  to: string;
  icon: ReactNode;
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const MobileNavLink = ({ 
  to, 
  icon, 
  children, 
  isActive,
  onClick 
}: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default MobileNavLink;
