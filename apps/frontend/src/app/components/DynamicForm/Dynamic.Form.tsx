"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DynamicField from "./DynamicField";
import { DynamicFormProps } from "@shared";
import { useRelations } from "../../hooks/useRelation";

export default function DynamicForm({
  metadata,
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

  const { data: relatedData = {}, isLoading } = useRelations(metadata);

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <h2>

        {type === "create"
          ? `Cadastrar ${metadata.title}`
          : `Editar ${metadata.title}`}

      </h2>

      <div className="form-grid">

        {metadata.fields
          .filter((field: any) => field.showInForm !== false)
          .map((field: any) => (

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