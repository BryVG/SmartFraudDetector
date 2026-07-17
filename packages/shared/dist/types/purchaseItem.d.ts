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
//# sourceMappingURL=purchaseItem.d.ts.map