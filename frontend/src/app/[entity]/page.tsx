"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "../services/api";

import DynamicTable from "../DynamicTable/DynamicTable";
import FormModal from "../components/FormModal/FormModal";

export default function EntityPage() {

  const { entity } = useParams<{
    entity: string;
  }>();

  const [metadata, setMetadata] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {

    if (!entity) return;

    async function load() {

      try {

        const [meta, rows] = await Promise.all([

          api.get(`/metadata/${entity}`),

          api.get(`/${entity}`),

        ]);

        setMetadata(meta.data);
        setData(rows.data);

      } catch (err) {
        console.error(err);
      }

    }

    load();

  }, [entity]);

  if (!metadata) {
    return <div>Carregando...</div>;
  }

  return (

    <div>

      <FormModal
        table={entity as any}
        type="create"
      />

<DynamicTable
    entity={entity}
    config={metadata}
    data={data}
/>

    </div>

  );

}