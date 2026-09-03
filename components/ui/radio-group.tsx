"use client";

import * as React from "react";
import { ChoiceOption } from "./types";

export interface RadioGroupProps {
  /** Unique name for the radio group (used as the HTML name attribute) */
  name: string;
  /** Visible label rendered as a fieldset legend */
  label?: string;
  /** Currently selected value */
  value: string | undefined;
  /** Available options */
  options: ChoiceOption[];
  /** Called when the user selects an option */
  onValueChange: (value: string) => void;
  /** Disable the entire group */
  disabled?: boolean;
  /** Mark the group as required */
  required?: boolean;
  /** Error message to display below the group */
  error?: string;
  /** Optional description text */
  description?: string;
}

export function RadioGroup({
  name,
  label,
  value,
  options,
  onValueChange,
  disabled = false,
  required = false,
  error,
  description,
}: RadioGroupProps) {
  const errorId = error ? `${name}-error` : undefined;
  const descriptionId = description ? `${name}-description` : undefined;

  return (
    <fieldset
      disabled={disabled}
      aria-describedby={
        [errorId, descriptionId].filter(Boolean).join(" ") || undefined
      }
    >
      {label && (
        <legend className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </legend>
      )}

      {description && (
        <p id={descriptionId} className="text-sm text-slate-500 mb-2">
          {description}
        </p>
      )}

      <div className="space-y-2">
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                isDisabled
                  ? "opacity-70 cursor-not-allowed bg-slate-50"
                  : isSelected
                    ? "border-blue-600 bg-blue-50/50"
                    : "border-slate-300 hover:border-slate-400"
              } ${error && !isDisabled ? "border-red-500" : ""}`}
            >
              <input
                type="radio"
                id={inputId}
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                required={required}
                onChange={() => onValueChange(option.value)}
                className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-2 focus:ring-blue-600/20"

              />
              <span className="text-slate-900">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error && (
        <p id={errorId} className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </fieldset>
  );
}
