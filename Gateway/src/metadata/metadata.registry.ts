import { purchaseItemMetadata } from "./configs/purchaseItem.metadata"; 

export const metadataRegistry = {
  purchaseitem: purchaseItemMetadata,
};

export type EntityName = keyof typeof metadataRegistry;