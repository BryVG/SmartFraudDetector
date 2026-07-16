"use client";

import { useForm } from "react-hook-form";

type Supplierprops = {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formData: any) => Promise<void>;
};

type SupplierFormData = {
  name: string;
};

export default function BuyerForm({
  type,
  data,
  onSubmit,
  relatedData
}: Supplierprops) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>({
    defaultValues: {
      name: data?.name || ""
    },
  });

 return (
    <form
      className="supplier-form"
      onSubmit={handleSubmit((formData) => {
        console.log("DADOS DO FORM:");
        console.log(formData);

        return onSubmit(formData);
      })}
    >
      <h2>
        {type === "create"
          ? "Cadastrar Fornecedor"
          : "Editar Fornecedor"}
      </h2>

      <div className="field">
        <label>Nome do Fornecedor</label>

        <input 
          {...register("name", {
            required: "Nome obrigatório",
          })}
        />

        {errors.name && (
          <span>{errors.name.message}</span>
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





