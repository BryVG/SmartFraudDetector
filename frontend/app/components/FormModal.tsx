"use client";

const ProductForm = dynamic(() => import("./forms/ProductForm"));
const SupplierForm = dynamic(() => import("./forms/SupplierForm"));
const BuyerForm = dynamic(() => import("./forms/BuyerForm"));
const PurchaseOrderForm = dynamic(() => import("./forms/PurchaseOrderForm"));
const PurchaseItemForm = dynamic(() => import("./forms/PurchaseItemForm"));
const FraudAnalysisForm = dynamic(() => import("./forms/FraudAnalysisForm"));

type RelatedData = {
  buyers?: Buyer[];
  suppliers?: Supplier[];
  products?: Product[];
  purchaseOrders?: PurchaseOrder[];
};
type FormComponentProps = {
  type: "create" | "update";
  data?: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  relatedData?: any;
};

type FormComponent = React.ComponentType<FormComponentProps>;

relatedData?: RelatedData;

const forms: Record<string, FormComponent> = {
  product: ProductForm,
  supplier: SupplierForm,
  buyer: BuyerForm,
  purchaseorder: PurchaseOrderForm,
};

const SelectedForm = forms[table];
