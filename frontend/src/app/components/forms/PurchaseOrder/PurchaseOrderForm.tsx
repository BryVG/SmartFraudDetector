"use client";

import { useForm } from "react-hook-form";

type PurchaseOrderprops = {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formData: any) => Promise<void>;
};

type PurchaseOrderFormData = {
  orderNumber: string;
  totalAmount: string;
  buyerId: string;
  supplierId: string
};

export default function PurchaseOrderForm({
  type,
  data,
  onSubmit,
  relatedData
}: PurchaseOrderprops) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseOrderFormData>({
    defaultValues: {
      orderNumber: data?.orderNumber || "",
      totalAmount: data?.totalAmount || "",
      buyerId: data?.buyerId || "",
      supplierId: data?.supplierId || "",
    },
  });

 return (
    <form
      className="product-form"
      onSubmit={handleSubmit((formData) => {
        console.log("DADOS DO FORM:");
        console.log(formData);

        return onSubmit(formData);
      })}
    >
      <h2>
        {type === "create"
          ? "Cadastrar Purchase Order"
          : "Editar Purchase Order"}
      </h2>

      <div className="field">
        <label>Número do Pedido</label>

        <input
          {...register("orderNumber", {
            required: "Número obrigatório",
          })}
        />

        {errors.orderNumber && (
          <span>{errors.orderNumber.message}</span>
        )}
      </div>

      <div className="field">
        <label>Valor Total</label>

        <input
          {...register("totalAmount", {
            required: "Valor obrigatório",
          })}
        />

        {errors.totalAmount && (
          <span>{errors.totalAmount.message}</span>
        )}
      </div>

      <div className="field">
        <label>Comprador</label>

        <select
          {...register("buyerId", {
            required: "Comprador obrigatório",
          })}
        >
          <option value="">
            Selecione um comprador
          </option>

          {relatedData?.buyers?.map((buyer: any) => (
            <option
              key={buyer.id}
              value={buyer.id}
            >
              {buyer.name}
            </option>
          ))}
        </select>

        {errors.buyerId && (
          <span>{errors.buyerId.message}</span>
        )}
      </div>

      <div className="field">
        <label>Fornecedor</label>

        <select
          {...register("supplierId", {
            required: "Fornecedor obrigatório",
          })}
        >
          <option value="">
            Selecione um fornecedor
          </option>

          {relatedData?.suppliers?.map((supplier: any) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.name}
            </option>
          ))}
        </select>

        {errors.supplierId && (
          <span>{errors.supplierId.message}</span>
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





