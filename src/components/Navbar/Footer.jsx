import { twMerge } from "tailwind-merge";


const Footer = ({children, className}) => {
    return (
        <div className={twMerge(`mb-12 flex justify-center items-center text-theme-400 ${className}`)}>
            {children}
        </div>
    );
};

export default Footer;
