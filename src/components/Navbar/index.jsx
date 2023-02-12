import { twMerge } from "tailwind-merge";

const Navbar = ({children, className}) => {
    return <nav className={twMerge(`px-3 py-6 ${className}`)}>{children}</nav>;
};

export default Navbar;
