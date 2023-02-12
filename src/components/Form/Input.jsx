import { twMerge } from "tailwind-merge";

const Input = ({ type, placeholder, value, id, name, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            id={id}
            name={name}
            onChange={onChange}
            className={twMerge(`bg-transparent rounded-lg`)}
        />
    );
};

export default Input;
