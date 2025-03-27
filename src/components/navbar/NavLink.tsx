
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  isActive: boolean;
}

const NavLink = ({ to, children, isActive }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
