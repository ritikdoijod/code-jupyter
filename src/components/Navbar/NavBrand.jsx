import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const NavBrand = ({ children, className }) => {
    const navigate = useNavigate();
    
    return (
        <h1
            className={twMerge(
                `font-Kaushan_Script font-bold text-2xl text-theme-900 cursor-pointer hover:text-accent ${className}`
            )}
            onClick={() => navigate("/")}
        >
            {children}
        </h1>
    );
};

export default NavBrand;
