import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCrudService } from "../services/crudService";
import { EntityConfig } from "@/types/EntityConfigtesteee";

type MutationType = 
    | "create"
    | "update"
    | "delete";


interface UseEntityMutationProps {

    entity: string;

    type: MutationType;

    id?: number | string;

    metadata?: EntityConfig;

}

export function useEntityMutation({

    entity,
    type,
    id,
    metadata,

}: UseEntityMutationProps) {

    const queryClient = useQueryClient();

    const service = createCrudService(entity);

    return useMutation({

        mutationFn: async (formData?: any) => {

          switch (type) {

    case "create":
        return service.create(formData);

    case "update":

        if (!id)
            throw new Error("Id is required");

        return service.update(id, formData);

    case "delete":

        if (!id)
            throw new Error("Id is required");

        return service.remove(id);

    default:
        throw new Error("Invalid mutation type");

}        },


        onSuccess: () => {


            toast.success(

                `${metadata?.title ?? entity} ${
                    type === "create"
                    ? "created"
                    : type === "update"
                    ? "updated"
                    : "deleted"
                } successfully`
            );
            queryClient.invalidateQueries({

                queryKey:[
                    "rows",
                    entity
                ]

            });


        },


        onError: () => {


            toast.error(
                "Something went wrong"
            );


        }


    });

}