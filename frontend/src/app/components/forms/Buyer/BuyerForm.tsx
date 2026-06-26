"use client";

import { useForm } from "react-hook-form";

type Buyerprops = {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formData: any) => Promise<void>;
};

type BuyerFormData = {
  name: string;
};

export default function BuyerForm({
  type,
  data,
  onSubmit,
  relatedData
}: Buyerprops) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerFormData>({
    defaultValues: {
      name: data?.name || ""
    },
  });

 return (
    <form
      className="buyer-form"
      onSubmit={handleSubmit((formData) => {
        console.log("DADOS DO FORM:");
        console.log(formData);

        return onSubmit(formData);
      })}
    >
      <h2>
        {type === "create"
          ? "Cadastrar Comprador"
          : "Editar Comprador"}
      </h2>

      <div className="field">
        <label>Nome do Comprador</label>

        <input 
          {...register("name", {
            required: "Número obrigatório",
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





