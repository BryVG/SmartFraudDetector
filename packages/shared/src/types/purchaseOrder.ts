
export interface PurchaseOrder {
  id: number;
  orderNumber: string;
  totalAmount: number;

  buyer?: {
    id: number;
    name: string;
  };

  supplier?: {
    id: number;
    name: string;
  };
}