import { useQuery } from "@tanstack/react-query";
import { createCrudService } from "../services/crudService";
import { useMemo } from "react";
import { metadataService } from "../services/metadata.service";

type UseEntityOptions = {
  loadMetadata?: boolean;
  loadRows?: boolean;
  enabled?: boolean;
};

export function useEntity(entity: string,
  options: UseEntityOptions = {}) {
  
    const service = useMemo(
  () => createCrudService(entity),
  [entity]
);

const metadataQuery = useQuery({
  queryKey: ["metadata", entity],
  queryFn: () => metadataService.get(entity),
  enabled: !!entity && !!entity && options.loadMetadata !== false,
});

const rowsQuery = useQuery({
  queryKey: ["rows", entity],
  queryFn: service.getAll,
  enabled: !!entity && !!entity && options.loadRows !== false,
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