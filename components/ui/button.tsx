import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export function buttonClasses({ variant = "primary", fullWidth, className = "" }: { variant?: "primary" | "secondary", fullWidth?: boolean, className?: string } = {}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50",
  }
  const widthClass = fullWidth ? "w-full" : ""
  
  return `${baseStyles} ${variants[variant]} ${widthClass} ${className}`.trim();
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonClasses({ variant, fullWidth, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
