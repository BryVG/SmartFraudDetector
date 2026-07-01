"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DynamicField from "./DynamicField";
import { DynamicFormProps } from "@/types/dynamicform";
import { api } from "@/app/services/api"; // ajuste o caminho conforme seu projeto

export default function DynamicForm({
  config,
  type,
  data,
  onSubmit,
}: DynamicFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data ?? {},
  });

  const [relatedData, setRelatedData] = useState<
    Record<string, any[]>
  >({});

  useEffect(() => {

    async function loadRelations() {

      const selects = config.fields.filter(
        field => field.type === "select"
      );

      const result: Record<string, any[]> = {};

      for (const field of selects) {

        if (!field.endpoint) continue;

        try {

          const response = await api.get(field.endpoint);

          result[field.endpoint] = response.data;

        } catch (error) {

          console.error(
            `Erro ao carregar ${field.endpoint}`,
            error
          );

        }

      }

      setRelatedData(result);

    }

    loadRelations();

  }, [config]);

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <h2>

        {type === "create"
          ? `Cadastrar ${config.title}`
          : `Editar ${config.title}`}

      </h2>

      <div className="form-grid">

        {config.fields
          .filter(field => field.showInForm !== false)
          .map(field => (

            <DynamicField
              key={field.name}
              field={field}
              register={register}
              errors={errors}
              relatedData={relatedData}
            />

          ))}

      </div>

      <button type="submit">

        {type === "create"
          ? "Cadastrar"
          : "Atualizar"}

      </button>

    </form>

  );

}