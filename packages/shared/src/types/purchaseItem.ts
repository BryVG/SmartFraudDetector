
// foram removidos os productId e PurchaseOrderId, devido a semântica correta. deve ser usado apenas para criação/edição.

export interface PurchaseItem {
  id: number;
  quantity: number;
  unit: string;
  Measure: string;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;

  purchaseOrder?: {
    id: number;
    orderNumber: string;
    createdAt: string;
    totalAmount: number;
  };

  product?: {
    id: number;
    name: string;
  };
}