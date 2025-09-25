import { cn } from "@/utils/function";

const Button = ({ label, onClick, className }) => {
  return (
    <button
      className={cn(
        "px-4 h-9 rounded-xl",
        " bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500",
        " text-white font-bold",
        " shadow-lg",
        " hover:scale-105 hover:shadow-xl transition-all duration-300 ",
        " cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
