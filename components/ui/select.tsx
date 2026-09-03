"use client";

import * as React from "react";
import { ChoiceOption } from "./types";

export interface SelectProps {
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** Currently selected value */
  value: string | undefined;
  /** Available options */
  options: ChoiceOption[];
  /** Text shown when no value is selected */
  placeholder?: string;
  /** Called when the user selects an option */
  onValueChange: (value: string) => void;
  /** Disable the control */
  disabled?: boolean;
  /** Mark the control as required */
  required?: boolean;
  /** Show error styling */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** HTML autocomplete attribute */
  autoComplete?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      value,
      options,
      placeholder,
      onValueChange,
      disabled = false,
      required = false,
      error = false,
      className = "",
      autoComplete,
    },
    ref,
  ) => {
    return (
      <select
        ref={ref}
        id={id}
        name={name}
        value={value ?? ""}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        className={`w-full rounded-md border px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-slate-300"
        } ${className}`}
      >
        {placeholder !== undefined && (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);
Select.displayName = "Select";
