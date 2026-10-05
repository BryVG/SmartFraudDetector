

export interface FieldConfig {
  name: string;

  label: string;

  type:
    | "text"
    | "number"
    | "date"
    | "select"
    | "textarea";

  required?: string;

  step?: string;

  grid?: number;

  showInTable?: boolean;

  showInForm?: boolean;

  placeholder?: string;

  endpoint?: string;

  optionLabel?: string;

  optionValue?: string;

  displayField?: string;

  format?: "date" | "currency"| "relation";

  className?: string;

 relation?: string;

  inputClassName?: string;

  tableClassName?: string;
}