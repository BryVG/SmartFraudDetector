"use client";

import "./FormModal.module.css";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from './FormModal.module.css';
import { Product } from "../../../types/product";

import { productService } from "../../services/product.service";
import { supplierService } from "../../services/supplier.service";
import { buyerService } from "../../services/buyer.service";
import { purchaseOrderService } from "../../services/purchaseOrder.service";
//import { purchaseItemService } from "../services/purchaseitem.service";
//import { fraudAnalysisService } from "../services/fraudanalysis.service";

const ProductForm = dynamic(() => import("../forms/Product/ProductForm"));
const PurchaseOrderForm = dynamic(() => import("../forms/PurchaseOrder/PurchaseOrderForm"))
const BuyerForm = dynamic(() => import("../forms/Buyer/BuyerForm"))
const SupplierForm = dynamic(() => import("../forms/Supplier/SupplierForm"))

export type FormContainerProps = {
    table: "product" | "purchaseorder" | "buyer" | "supplier"; //| "purchaseitem" | "fraudanalysis";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
}
type RelatedData = {
  [key: string]: any[];
};

type TableName = FormContainerProps["table"];

type FormComponentProps = {
  type: "create" | "update";
  data?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  relatedData?: RelatedData;
  onSubmit?: (formData: any) => Promise<void>;
};

type FormComponent = React.ComponentType<FormComponentProps>;

const forms: Record<TableName, FormComponent> = {
  product: ProductForm as FormComponent,
  supplier: SupplierForm as FormComponent,
  buyer: BuyerForm as FormComponent,
  purchaseorder: PurchaseOrderForm as FormComponent
  //purchaseitem: PurchaseItemForm as FormComponent,
  //fraudanalysis: FraudAnalysisForm as FormComponent,
};

const serviceMap = {
  product: productService,
  supplier: supplierService,
  buyer: buyerService,
  purchaseorder: purchaseOrderService,
//  purchaseitem: purchaseItemService,
//  fraudanalysis: fraudAnalysisService,
};


export default function FormModal({
  table,
  type,
  data,
  id,
}: FormContainerProps )
 {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [relatedData, setRelatedData] = useState<RelatedData>({});

  useEffect(() => {
  const loadRelatedData = async () => {
    switch (table) {
      case "purchaseorder":
        const [buyers, suppliers] =
          await Promise.all([
            buyerService.getAll(),
            supplierService.getAll(),
          ]);

        setRelatedData({
          buyers,
          suppliers,
        });

        break;
    }
  };

  loadRelatedData();
}, [table]);

  const SelectedForm = forms[table];
  const service = serviceMap[table];

  const handleAction = async (formData?: any) => {
    try {
      if (type === "create") {
        await service.create(formData);
      }

      if (type === "update") {
        if (!id) throw new Error("Id is required");

        await service.update(id, formData);
      }

      if (type === "delete") {
        if (!id) throw new Error("Id is required");

        await service.remove(id);
      }

      toast.success(
        `${table} ${
          type === "create"
            ? "created"
            : type === "update"
            ? "updated"
            : "deleted"
        } successfully`
      );

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    }
  };

  const buttonClass =
    type === "create"
      ? "button-create"
      : type === "update"
      ? "button-update"
      : "button-delete";

  return (
    <>
      <button
        className={`modal-button ${styles.buttonClass}`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type}.png`}
          alt={type}
          width={16}
          height={16}
        />
      </button>

      {open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>

            {type === "delete" ? (
              <div className={styles.deleteContainer}>
                <span className={styles.deleteMessage}>
                  Todos os dados serão perdidos. Tem certeza que deseja excluir
                  este {table}?
                </span>

                <button
                  className={styles.deleteConfirmButton}
                  onClick={() => handleAction()}
                >
                  Excluir
                </button>
              </div>
            ) : (
              <SelectedForm
                type={type}
                data={data}
                relatedData={relatedData}
                setOpen={setOpen}
                onSubmit={handleAction}
              />
            )}

            <button
              className={styles.closeButton}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

          </div>
        </div>
      )}
    </>
  );
}