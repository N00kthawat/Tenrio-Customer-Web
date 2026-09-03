"use client";

import * as React from "react";
import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { ComboboxOption as ComboboxOptionType } from "./types";

export interface ComboboxProps {
  /** HTML id attribute for the input */
  id?: string;
  /** HTML name attribute for form submission */
  name?: string;
  /** Currently selected value (option.value) */
  value: string | undefined;
  /** Available options */
  options: ComboboxOptionType[];
  /** Placeholder text when no value is selected and input is empty */
  placeholder?: string;
  /** Placeholder inside the search input (when different from main placeholder) */
  searchPlaceholder?: string;
  /** Message shown when filtering produces no matching options */
  emptyMessage?: string;
  /** Called when the user explicitly selects or clears a value */
  onValueChange: (value: string | undefined) => void;
  /** Disable the control */
  disabled?: boolean;
  /** Mark the control as required */
  required?: boolean;
  /** Show error styling */
  error?: boolean;
  /** Show a loading indicator in the dropdown */
  loading?: boolean;
  /** Show a clear button when a value is selected */
  allowClear?: boolean;
  /** Additional CSS classes on the outer wrapper */
  className?: string;
}

/** Client-side substring/includes filter across label and keywords */
function filterOptions(
  options: ComboboxOptionType[],
  query: string,
): ComboboxOptionType[] {
  if (!query) return options;
  const q = query.toLowerCase();
  return options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(q) ||
      opt.keywords?.some((kw) => kw.toLowerCase().includes(q)),
  );
}

export function Combobox({
  id,
  name,
  value,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage = "No results found",
  onValueChange,
  disabled = false,
  required = false,
  error = false,
  loading = false,
  allowClear = false,
  className = "",
}: ComboboxProps) {
  const [query, setQuery] = React.useState("");
  const filtered = React.useMemo(() => filterOptions(options, query), [options, query]);

  // Find the currently selected option to display its label
  const selectedOption = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  const handleChange = React.useCallback(
    (selected: ComboboxOptionType | null) => {
      onValueChange(selected?.value ?? undefined);
      setQuery("");
    },
    [onValueChange],
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onValueChange(undefined);
      setQuery("");
    },
    [onValueChange],
  );

  const borderClass = error
    ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
    : "border-slate-300 focus-within:border-blue-600 focus-within:ring-blue-600/20";

  return (
    <HeadlessCombobox
      value={selectedOption ?? null}
      onChange={handleChange}
      disabled={disabled}
      by="value"
    >
      <div className={`relative ${className}`}>
        <div
          className={`flex items-center w-full rounded-md border text-sm transition-colors focus-within:outline-none focus-within:ring-2 ${borderClass} ${
            disabled ? "opacity-70 cursor-not-allowed bg-slate-50" : "bg-white"
          }`}
        >
          <ComboboxInput
            id={id}
            name={name}
            className="w-full border-none bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed"
            placeholder={searchPlaceholder ?? placeholder}
            displayValue={(opt: ComboboxOptionType | null) => opt?.label ?? ""}
            onChange={(e) => setQuery(e.target.value)}
            required={required}
            aria-invalid={error ? "true" : undefined}
          />

          {allowClear && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 p-1.5 mr-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-600 rounded"
              aria-label="Clear selection"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <ComboboxButton className="flex-shrink-0 px-2 text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </ComboboxButton>
        </div>

        <ComboboxOptions className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-slate-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
          {loading && (
            <div className="px-3 py-2 text-slate-500 animate-pulse">
              Loading…
            </div>
          )}

          {!loading && filtered.length === 0 && query !== "" && (
            <div className="px-3 py-2 text-slate-500">{emptyMessage}</div>
          )}

          {!loading &&
            filtered.map((option) => (
              <ComboboxOption
                key={option.value}
                value={option}
                disabled={option.disabled}
                className="group relative cursor-pointer select-none px-3 py-2 text-slate-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {option.label}
                </span>

                {/* Selected check mark */}
                <span className="absolute inset-y-0 right-3 hidden items-center group-data-[selected]:flex">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
              </ComboboxOption>
            ))}
        </ComboboxOptions>
      </div>
    </HeadlessCombobox>
  );
}
