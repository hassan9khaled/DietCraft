/* eslint-disable react/prop-types */
import SpinnerMini from "./SpinnerMini";
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  onClick,
  borderColor = "white",
  disabled = false,
  isPending = false,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-md inline-flex items-center justify-center transition-colors focus:outline-none";

  const variantStyles = {
    primary:
      "bg-dietcraft-500 text-white hover:bg-dietcraft-600 border border-transparent",
    secondary:
      "bg-dietcraft-50 text-dietcraft-700 hover:bg-dietcraft-100 border border-transparent",
    outline:
      "bg-transparent text-dietcraft-700 hover:bg-dietcraft-50 border border-dietcraft-300",
    ghost:
      "bg-transparent text-dietcraft-700 hover:bg-dietcraft-50 border border-transparent",
    link: "bg-transparent text-dietcraft-700 hover:underline p-0 h-auto border-none shadow-none",
    outlineForWater:
      "bg-transparent text-blue-700 hover:bg-blue-50 border border-blue-300",
    water: "bg-blue-600 text-white hover:bg-blue-700",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  // Combine classes manually
  const finalClassName = `${baseStyles} ${variantStyles[variant] || ""} ${
    sizeStyles[size] || ""
  } ${className}`.trim();

  function ChildrenButton() {
    return (
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>
    );
  }
  return (
    <button
      className={finalClassName + " " + disabledStyles}
      {...props}
      onClick={onClick}
      disabled={disabled || isPending}
    >
      {isPending ? (
        <SpinnerMini borderColor={borderColor} />
      ) : (
        <ChildrenButton />
      )}
    </button>
  );
};

export default Button;
