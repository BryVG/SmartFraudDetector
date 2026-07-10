import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

type UseEntityOptions = {
  loadMetadata?: boolean;
  loadRows?: boolean;
};

export function useEntity(entity: string,
  options: UseEntityOptions = {}) {
  
    const metadataQuery = useQuery({
    queryKey: ["metadata", entity],
    queryFn: async () => {
      const response = await api.get(`/metadata/${entity}`);
      return response.data;
    },
    enabled: !!entity && options.loadMetadata !== false,
  });

  const rowsQuery = useQuery({
    queryKey: ["rows", entity],
    queryFn: async () => {
      const response = await api.get(`/${entity}`);
      return response.data;
    },
    enabled: !!entity && options.loadRows !== false,
  });

  return {
    
    metadata: metadataQuery.data,
    rows: rowsQuery.data,
    isLoading:
      metadataQuery.isLoading || rowsQuery.isLoading,
    error:
      metadataQuery.error || rowsQuery.error,
  };
}