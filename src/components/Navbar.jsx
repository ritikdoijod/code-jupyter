import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children, className }) => {
    return <nav className={twMerge(`px-3 py-6 text-theme-900 dark:text-theme-50 ${className}`)}>{children}</nav>;
};

const Item = ({ children, className, onClick }) => {
    return (
        <div
            className={twMerge(`cursor-pointer hover:text-accent-500 dark:hover:text-accent-400 ${className}`)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const Brand = ({ children, className }) => {
    const navigate = useNavigate();

    return (
        <h1
            className={twMerge(
                `font-Kaushan_Script font-bold text-2xl cursor-pointer hover:text-accent-500 dark:hover:text-accent-400 ${className}`
            )}
            onClick={() => navigate("/")}
        >
            {children}
        </h1>
    );
};

Navbar.Item = Item;
Navbar.Brand = Brand;

export default Navbar;
