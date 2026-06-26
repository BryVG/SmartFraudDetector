"use client";

import { useForm } from "react-hook-form";

type PurchaseItemProps = {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formData: any) => Promise<void>;
};

type PurchaseItemFormData = {
  unit: string;
  Measure: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  productId: number;
  purchaseOrderId: number;
  createdAt: string;
};

export default function PurchaseItemForm({
  type,
  data,
  onSubmit,
  relatedData,
}: PurchaseItemProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseItemFormData>({
    defaultValues: {
      unit: data?.unit || "",
      Measure: data?.Measure || "",
      unitPrice: data?.unitPrice ?? 0,
      totalPrice: data?.totalPrice ?? 0,
      quantity: data?.quantity ?? 0,
      productId: data?.productId ?? 0,
      purchaseOrderId: data?.purchaseOrderId ?? 0,
      createdAt: data?.createdAt
        ? data.createdAt.substring(0, 10)
        : "",
    },
  });

  return (
    <form
      className="purchaseitem-form"
      onSubmit={handleSubmit((formData) => {
        console.log(formData);
        return onSubmit(formData);
      })}
    >
      <h2>
        {type === "create"
          ? "Cadastrar Purchase Item"
          : "Editar Purchase Item"}
      </h2>

      {/* Unidade */}
      <div className="field">
        <label>Unidade</label>

        <input
          {...register("unit", {
            required: "Unidade obrigatória",
          })}
        />

        {errors.unit && <span>{errors.unit.message}</span>}
      </div>

      {/* Medida */}
      <div className="field">
        <label>Medida</label>

        <input
          {...register("Measure", {
            required: "Medida obrigatória",
          })}
        />

        {errors.Measure && <span>{errors.Measure.message}</span>}
      </div>

      {/* Quantidade */}
      <div className="field">
        <label>Quantidade</label>

        <input
          type="number"
          {...register("quantity", {
            required: "Quantidade obrigatória",
            valueAsNumber: true,
          })}
        />

        {errors.quantity && <span>{errors.quantity.message}</span>}
      </div>

      {/* Valor Unitário */}
      <div className="field">
        <label>Valor Unitário</label>

        <input
          type="number"
          step="0.01"
          {...register("unitPrice", {
            required: "Valor obrigatório",
            valueAsNumber: true,
          })}
        />

        {errors.unitPrice && <span>{errors.unitPrice.message}</span>}
      </div>

      {/* Valor Total */}
      <div className="field">
        <label>Valor Total</label>

        <input
          type="number"
          step="0.01"
          {...register("totalPrice", {
            required: "Valor obrigatório",
            valueAsNumber: true,
          })}
        />

        {errors.totalPrice && <span>{errors.totalPrice.message}</span>}
      </div>

      {/* Produto */}
      <div className="field">
        <label>Produto</label>

        <select
          {...register("productId", {
            required: "Produto obrigatório",
            valueAsNumber: true,
          })}
        >
          <option value="">Selecione um produto</option>

          {relatedData?.products?.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {errors.productId && <span>{errors.productId.message}</span>}
      </div>

      {/* Purchase Order */}
      <div className="field">
        <label>Purchase Order</label>

        <select
          {...register("purchaseOrderId", {
            required: "Pedido obrigatório",
            valueAsNumber: true,
          })}
        >
          <option value="">Selecione um pedido</option>

          {relatedData?.purchaseOrders?.map((order: any) => (
            <option key={order.id} value={order.id}>
              {order.orderNumber}
            </option>
          ))}
        </select>

        {errors.purchaseOrderId && (
          <span>{errors.purchaseOrderId.message}</span>
        )}
      </div>

      {/* Data */}
      <div className="field">
        <label>Data</label>

        <input
          type="date"
          {...register("createdAt", {
            required: "Data obrigatória",
          })}
        />

        {errors.createdAt && <span>{errors.createdAt.message}</span>}
      </div>

      <button type="submit">
        {type === "create" ? "Cadastrar" : "Atualizar"}
      </button>
    </form>
  );
}