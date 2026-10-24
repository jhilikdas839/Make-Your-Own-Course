const VARIANTS = {
  dark: "bg-[#10131d] text-white hover:bg-primary",
  primary: "bg-primary text-white hover:bg-primary/90",
  outline: "border border-gray-200 bg-white text-[#10131d] hover:bg-gray-50",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-[#10131d]",
};

const SIZES = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-sm",
};

function Button({ variant = "dark", size = "md", icon, className = "", children, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {icon && <i className={icon}></i>}
      {children}
    </button>
  );
}

export default Button;
