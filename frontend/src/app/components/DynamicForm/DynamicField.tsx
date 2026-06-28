type DynamicFieldProps = {
  field: any;
  register: any;
  errors: any;
  relatedData: any;
};

export default function DynamicField({
  field,
  register,
  errors,
  relatedData,
}: DynamicFieldProps) {
  const validation = {
    required: field.required,
    valueAsNumber: field.type === "number" || field.type === "select",
  };

  const renderers = {
    text: () => (
      <div className="field">
        <label>{field.label}</label>

        <input {...register(field.name, validation)} />

        {errors[field.name] && (
          <span>{errors[field.name]?.message}</span>
        )}
      </div>
    ),

    number: () => (
      <div className="field">
        <label>{field.label}</label>

        <input
          type="number"
          step={field.step}
          {...register(field.name, validation)}
        />

        {errors[field.name] && (
          <span>{errors[field.name]?.message}</span>
        )}
      </div>
    ),

    date: () => (
      <div className="field">
        <label>{field.label}</label>

        <input
          type="date"
          {...register(field.name, validation)}
        />

        {errors[field.name] && (
          <span>{errors[field.name]?.message}</span>
        )}
      </div>
    ),

    select: () => (
      <div className="field">
        <label>{field.label}</label>

        <select {...register(field.name, validation)}>
          <option value="">
            Selecione...
          </option>

          {relatedData?.[field.options]?.map((option: any) => (
            <option
              key={option[field.optionValue]}
              value={option[field.optionValue]}
            >
              {option[field.optionLabel]}
            </option>
          ))}
        </select>

        {errors[field.name] && (
          <span>{errors[field.name]?.message}</span>
        )}
      </div>
    ),

    textarea: () => (
      <div className="field">
        <label>{field.label}</label>

        <textarea
          {...register(field.name, validation)}
        />

        {errors[field.name] && (
          <span>{errors[field.name]?.message}</span>
        )}
      </div>
    ),
  };

  const render = renderers[field.type as keyof typeof renderers];

  return render ? render() : null;
}