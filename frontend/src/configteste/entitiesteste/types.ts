export type FieldType =
  | "text"
  | "number"
  | "select"
  | "date"
  | "textarea";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;

  required?: string;

  showInTable?: boolean;

  grid?: number;

  step?: string;

  options?: string;

  optionLabel?: string;

  optionValue?: string;

  format?: (value: any) => React.ReactNode;
}

