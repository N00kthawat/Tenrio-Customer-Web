import * as React from "react"

export const FormError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", id, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <p ref={ref} id={id} className={`text-sm text-red-600 mt-1 ${className}`} {...props}>
        {children}
      </p>
    )
  }
)
FormError.displayName = "FormError"
