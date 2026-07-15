"use client";

import "./FormModal.module.css";
import { EntityConfig } from "../../../types/EntityConfigtesteee";
// import { FieldConfig } from "../../../types/FieldConfigtesteee";
import Image from "next/image";
import { useState } from "react";
import styles from "./FormModal.module.css";
import DynamicForm from "../DynamicForm/Dynamic.Form";
import { useEntityMutation } from "../../hooks/useEntityMutation";


export type FormContainerProps = {
  entity: string; // depois voltamos product | buyer | ...
  type: "create" | "update" | "delete";
  data?: any; // Substituir por FieldConfig quando disponível
  id?: number | string;
  metadata: EntityConfig; // Adicionando a propriedade metadata
};

export default function FormModal({
  entity,
  type,
  data,
  id,
  metadata,
}: FormContainerProps) {

  const [open, setOpen] = useState(false);
  
 const mutation = useEntityMutation({
    entity,
    type,
    id,
    metadata,
});
const handleSubmit = async (formData: any) => {
    await mutation.mutateAsync(formData);
    setOpen(false);
};
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
                  Tem certeza que deseja excluir este {metadata.title ?? entity}?
                </span>

                <button
                  className={styles.deleteConfirmButton}
                  onClick={handleSubmit}
                >
                  Excluir
                </button>

              </div>

            ) : (

    <DynamicForm
        metadata={metadata}
        type={type}
        data={data}
        onSubmit={handleSubmit}
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
  );}