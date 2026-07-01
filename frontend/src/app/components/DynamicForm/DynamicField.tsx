import { FieldConfig } from "../../../types/FieldConfig";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type DynamicFieldProps = {
  field: FieldConfig;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  relatedData: Record<string, any[]>;
};

export default function DynamicField({
  field,
  register,
  errors,
  relatedData,
}: DynamicFieldProps) {
  const validation = {
    required: field.required,
    valueAsNumber:
      field.type === "number" || field.type === "select",
  };

  const renderers = {
    text: () => (
      <div className="field">
        <label>{field.label}</label>

        <input
          placeholder={field.placeholder}
          className={field.inputClassName}
          {...register(field.name, validation)}
        />

        {errors[field.name] && (
          <span>{String(errors[field.name]?.message)}</span>
        )}
      </div>
    ),

    number: () => (
      <div className="field">
        <label>{field.label}</label>

        <input
          type="number"
          step={field.step}
          placeholder={field.placeholder}
          className={field.inputClassName}
          {...register(field.name, validation)}
        />

        {errors[field.name] && (
          <span>{String(errors[field.name]?.message)}</span>
        )}
      </div>
    ),

    date: () => (
      <div className="field">
        <label>{field.label}</label>

        <input
          type="date"
          className={field.inputClassName}
          {...register(field.name, validation)}
        />

        {errors[field.name] && (
          <span>{String(errors[field.name]?.message)}</span>
        )}
      </div>
    ),

    textarea: () => (
      <div className="field">
        <label>{field.label}</label>

        <textarea
          placeholder={field.placeholder}
          className={field.inputClassName}
          {...register(field.name, validation)}
        />

        {errors[field.name] && (
          <span>{String(errors[field.name]?.message)}</span>
        )}
      </div>
    ),

select: () => {
  const options =
    relatedData?.[field.endpoint ?? ""] ?? [];

  return (
    <div className="field">
      <label>{field.label}</label>

      <select
        className={field.inputClassName}
        {...register(field.name, validation)}
      >
        <option value="">
          Selecione...
        </option>

        {options.map((option: any) => (
          <option
            key={option[field.optionValue!]}
            value={option[field.optionValue!]}
          >
            {option[field.optionLabel!]}
          </option>
        ))}
      </select>

      {errors[field.name] && (
        <span>{String(errors[field.name]?.message)}</span>
      )}
    </div>
  );
},
  };

  const render =
    renderers[field.type as keyof typeof renderers];

  return render ? render() : null;
}