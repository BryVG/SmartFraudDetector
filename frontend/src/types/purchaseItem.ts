export interface PurchaseItem {
  id: number;
  quantity: number;
  unit: string;
  Measure: string;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;

  purchaseOrderId?: {
    id: number;
    orderNumber: string;
    createdAt: string;
    totalAmount: number;
  };

  productId?: {
    id: number;
    name: string;
  };
}