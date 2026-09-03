/** Shared option type for Select and RadioGroup */
export interface ChoiceOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/** Extended option type for Combobox with cross-language keyword search */
export interface ComboboxOption extends ChoiceOption {
  keywords?: string[];
}
