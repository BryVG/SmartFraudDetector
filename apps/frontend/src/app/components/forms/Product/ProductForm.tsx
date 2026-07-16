"use client";

import { useForm } from "react-hook-form";

type ProductFormProps = {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formData: any) => Promise<void>;
};

type ProductFormData = {
  name: string;
  StandardUnit: string;
  StandardMeasure: String;
};

export default function ProductForm({
  type,
  data,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: data?.name || "",
      StandardUnit: data?.StandardUnit || "",
      StandardMeasure: data?.StandardMeasure || "",
    },
  });

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit((data) => {
    console.log(data);
    return onSubmit(data);
  })}
    >
      <h2>
        {type === "create"
          ? "Cadastrar Produto"
          : "Editar Produto"}
      </h2>

      <div className="field">
        <label>Nome</label>

        <input
          {...register("name", {
            required: "Nome obrigatório",
          })}
        />

        {errors.name && (
          <span>{errors.name.message}</span>
        )}
      </div>

      <div className="field">
        <label>Descrição</label>

        <input
          {...register("StandardUnit")}
        />
      </div>

      <div className="field">
        <label>Preço</label>

        <input
          type="text"
          //step="0.01"
          {...register("StandardMeasure", {
            required: "Preço obrigatório",
            //valueAsNumber: true,
          })}
        />

        {errors.StandardMeasure && (
          <span>{errors.StandardMeasure.message}</span>
        )}
      </div>

      <button type="submit">
        {type === "create"
          ? "Cadastrar"
          : "Atualizar"}
      </button>
    </form>
  );
}