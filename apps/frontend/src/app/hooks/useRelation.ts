import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { EntityConfig } from "@/types/EntityConfigtesteee";
import { FieldConfig } from "../../types/FieldConfigtesteee";

export function useRelations(metadata: EntityConfig) {

  return useQuery({

    queryKey: [
      "relations",
      metadata?.title
    ],

    enabled: !!metadata,

    queryFn: async () => {

      const selects = metadata.fields.filter(
        (field: FieldConfig) => field.type === "select"
      );

      const result: Record<string, any[]> = {};

      await Promise.all(

        selects.map(async (field: FieldConfig) => {

          if (!field.endpoint) return;

          const { data } = await api.get(field.endpoint);

          result[field.name] = data;

        })

      );

      return result;

    },

  });

}