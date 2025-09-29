import { cn } from "@/utils/function";
import { useId } from "react";

const TextField = ({ label, value, onChange, placeholder, className }) => {
  const id = useId();
  return (
    <div className="relative">
      <input
        type="text"
        name="name"
        placeholder={placeholder || `Enter your ${label}`}
        value={value}
        onChange={onChange}
        className={cn(
          "peer w-full px-5 py-3",
          "rounded-xl border border-gray-400  placeholder-transparent",
          "focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none focus:text-purple-500 text-gray-500",
          "transition duration-300",
          "text-sm md:text-base md:px-5 md:py-3"
        )}
        required
        id={id}
      />
      {label && (
        <label
          htmlFor={id}
          className="absolute left-5 -top-2.5 text-gray-500 focus:text-purple-600 text-sm font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm bg-white px-1"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default TextField;
