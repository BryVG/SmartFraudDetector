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
      <button type="submit">
        {type === "create" ? "Cadastrar" : "Atualizar"}
      </button>
    </form>
  );
}