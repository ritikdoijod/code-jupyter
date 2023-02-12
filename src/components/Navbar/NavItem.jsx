import { twMerge } from "tailwind-merge";

const NavItem = ({ children, className, onClick }) => {
    return <div className={twMerge(`cursor-pointer hover:text-accent ${className}`)} onClick={onClick}>{children}</div>;
};

export default NavItem;
