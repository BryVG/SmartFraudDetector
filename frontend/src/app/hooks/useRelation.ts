import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useRelations(metadata: any) {

  return useQuery({

    queryKey: [
      "relations",
      metadata?.title
    ],

    enabled: !!metadata,

    queryFn: async () => {

      const selects = metadata.fields.filter(
        (field: any) => field.type === "select"
      );

      const result: Record<string, any[]> = {};

      await Promise.all(

        selects.map(async (field: any) => {

          if (!field.endpoint) return;

          const { data } = await api.get(field.endpoint);

          result[field.name] = data;

        })

      );

      return result;

    },

  });

}