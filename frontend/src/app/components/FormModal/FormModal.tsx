"use client";

import "./FormModal.module.css";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import styles from "./FormModal.module.css";

import DynamicForm from "../DynamicForm/Dynamic.Form";

import { entityConfigs } from "../../../config/entities";

import { productService } from "../../services/product.service";
import { supplierService } from "../../services/supplier.service";
import { buyerService } from "../../services/buyer.service";
import { purchaseOrderService } from "../../services/purchaseOrder.service";
import { purchaseItemService } from "../../services/purchaseitem.service";

export type FormContainerProps = {
  table: "purchaseitem"; // depois voltamos product | buyer | ...
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const serviceMap = {
  product: productService,
  supplier: supplierService,
  buyer: buyerService,
  purchaseorder: purchaseOrderService,
  purchaseitem: purchaseItemService,
};

export default function FormModal({
  table,
  type,
  data,
  id,
}: FormContainerProps) {

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const config = entityConfigs[table];

  const service = serviceMap[table];

  async function handleAction(formData?: any) {

    try {

      switch (type) {

        case "create":
          await service.create(formData);
          break;

        case "update":

          if (!id)
            throw new Error("Id is required");

          await service.update(id, formData);
          break;

        case "delete":

          if (!id)
            throw new Error("Id is required");

          await service.remove(id);
          break;
      }

      toast.success(
        `${config.title} ${
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

  }

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
                  Todos os dados serão perdidos.
                  Tem certeza que deseja excluir este {config.title}?
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