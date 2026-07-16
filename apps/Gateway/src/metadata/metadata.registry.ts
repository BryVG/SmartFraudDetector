import { purchaseItemMetadata } from "./configs/purchaseItem.metadata"; 

export const metadataRegistry = {
  purchaseitems: purchaseItemMetadata,
};

export type EntityName = keyof typeof metadataRegistry;