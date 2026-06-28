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

    showInTable?: boolean;

    grid?: number;

    options?: string;

    optionLabel?: string;

    optionValue?: string;

    format?: (value:any)=>React.ReactNode;
}