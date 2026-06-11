import { buyerService } from "../services/buyer.service";

export type FormContainerProps = {
    table: "product" | "buyer" | "purchaseorder" | "supplier" | "purchaseorderitem" | "fraudanalysis";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
}
export const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
    let relatedData = {};
        switch (table) {
      case "purchaseorder":
        const purchaseorderbuyers = await buyerService.getAll();
        const purchaseordersuppliers = await supplierService.getAll(); 

        relatedData = { buyers: purchaseorderbuyers };
        break;
          
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":

    return (
      <>
        <FormModal 
        table={table} 
        type={type} 
        data={data} 
        id={id} 
        relatedData={relatedData} />
      </>
    );
}