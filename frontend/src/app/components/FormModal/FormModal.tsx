"use client";

import "./FormModal.module.css";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from './FormModal.module.css';
import DynamicForm from "../DynamicForm/Dynamic.Form";
import { productService } from "../../services/product.service";
import { supplierService } from "../../services/supplier.service";
import { buyerService } from "../../services/buyer.service";
import { purchaseOrderService } from "../../services/purchaseOrder.service";
import { purchaseItemService } from "../../services/purchaseitem.service";
//import { fraudAnalysisService } from "../../services/fraudanalysis.service";
//import { productConfig } from "./product.config";
//import { supplierConfig } from "./supplier.config";
//import { buyerConfig } from "./buyer.config";
//import { purchaseOrderConfig } from "../../../config/entities/purchaseOrder.config";
import { entityConfigs } from "../../../config/entities";

export type FormContainerProps = {
    table: "purchaseitem";//"product" | "purchaseorder" | "buyer" | "supplier" | ; //| "fraudanalysis";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
}
type RelatedData = {
  [key: string]: any[];
};

const serviceMap = {
  product: productService,
  supplier: supplierService,
  buyer: buyerService,
  purchaseorder: purchaseOrderService,
  purchaseitem: purchaseItemService,
  //fraudanalysis: fraudAnalysisService
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

 const config = entityConfigs[table];
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
              <DynamicForm
                 config={config}
                 type={type}
                 data={data}
                 relatedData={relatedData}
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