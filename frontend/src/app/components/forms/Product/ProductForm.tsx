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
  description: string;
  price: number;
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
      description: data?.description || "",
      price: data?.price || 0,
    },
  });

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit(onSubmit)}
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
          {...register("description")}
        />
      </div>

      <div className="field">
        <label>Preço</label>

        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Preço obrigatório",
            valueAsNumber: true,
          })}
        />

        {errors.price && (
          <span>{errors.price.message}</span>
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