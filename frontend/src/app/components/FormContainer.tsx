import { buyerService } from "../services/buyer.service";
import { supplierService } from "../services/supplier.service";
import { purchaseItemService } from "../services/purchaseitem.service";
import { productService } from "../services/product.service";
import { FormModal } from "./FormModal";
import { purchaseOrderService } from "../services/purchaseOrder.service";}
export type FormContainerProps = {
    table: "product" | "buyer" | "purchaseorder" | "supplier" | "purchaseitem" | "fraudanalysis";
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
        relatedData = { buyers: purchaseorderbuyers, suppliers: purchaseordersuppliers };
        break;
      case "fraudanalysis":
        const fraudAnalysisItems = await purchaseItemService.getAll();
        relatedData = { purchaseorderitems: fraudAnalysisItems };
        break;
      case "purchaseitem":
        const purchaseItemsProducts = await productService.getAll();
        const purchaseItemsPurchaseOrders = await purchaseOrderService.getAll();
        relatedData = { products: purchaseItemsProducts, purchaseorders: purchaseItemsPurchaseOrders };
        }
          

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