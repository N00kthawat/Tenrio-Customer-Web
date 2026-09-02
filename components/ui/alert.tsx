import * as React from "react"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "error" | "info" | "success";
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "info", children, ...props }, ref) => {
    const variants = {
      error: "text-red-700 bg-red-50 border-red-200",
      info: "text-blue-700 bg-blue-50 border-blue-200",
      success: "text-green-700 bg-green-50 border-green-200",
    }
    
    return (
      <div
        ref={ref}
        className={`p-3 text-sm border rounded-md ${variants[variant]} ${className}`}
        role="alert"
        {...props}
      >
        {children}
      </div>
    )
  }
)
Alert.displayName = "Alert"
