import { cn } from "@/utils/function";

const Button = ({ label, onClick, className }) => {
  const hasCustomBg = className?.split(" ").some((c) => c.startsWith("bg-"));

  return (
    <button
      className={cn(
        "block mx-auto w-40 h-10 rounded-xl font-bold shadow-lg",
        "hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer",
        "md:w-full md:h-12 text-sm md:text-base",
        !hasCustomBg &&
          "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
