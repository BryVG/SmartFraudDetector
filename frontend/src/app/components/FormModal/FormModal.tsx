"use client";

import "./FormModal.module.css";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./FormModal.module.css";
import DynamicForm from "../DynamicForm/Dynamic.Form";
import { createCrudService } from "../../services/crudService";

export type FormContainerProps = {
  table: string; // depois voltamos product | buyer | ...
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  metadata: any; // Adicionando a propriedade metadata
};

export default function FormModal({
  table,
  type,
  data,
  id,
  metadata,
}: FormContainerProps) {

  const [open, setOpen] = useState(false);
  
  const router = useRouter();

  const service = createCrudService(table);

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
        `${metadata?.title ?? table} ${
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
                  Tem certeza que deseja excluir este {metadata?.title ?? table}?
                </span>

                <button
                  className={styles.deleteConfirmButton}
                  onClick={() => handleAction()}
                >
                  Excluir
                </button>

              </div>

            ) : !metadata ? (

    <p>Carregando...</p>

) : (

    <DynamicForm
        metadata={metadata}
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