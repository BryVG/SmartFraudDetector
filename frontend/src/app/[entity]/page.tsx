"use client";

import { useParams } from "next/navigation";
import { useEntity } from "../hooks/useEntity";
import DynamicTable from "../DynamicTable/DynamicTable";
import FormModal from "../components/FormModal/FormModal";

export default function EntityPage() {
  const { entity } = useParams<{
    entity: string;
  }>();

  const {metadata, rows, isLoading,error,} = useEntity(entity);

if (isLoading) return <div>Carregando...</div>;

if (error) return <div>Erro...</div>;

return (
  <>
    <FormModal entity={entity} type="create" metadata={metadata}/>

    <DynamicTable
      entity={entity}
      metadata={metadata}
      data={rows ?? []}
    />
  </>
  );
}