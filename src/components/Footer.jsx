import { twMerge } from "tailwind-merge";

const Footer = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                `mt-4 mb-12 flex justify-center items-center text-theme-300 dark:text-theme-600 ${className}`
            )}
        >
            {children}
        </div>
    );
};

export default Footer;
