import { twMerge } from "tailwind-merge";

const Form = ({children, className, onSubmit}) => {
    return <form onSubmit={onSubmit} className={twMerge(`px-3 py-2 bg-theme-50 rounded-lg ${className}`)}>{children}</form>;
};

export default Form;
