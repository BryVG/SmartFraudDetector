import { EntityConfig } from "@bryvg/shared";

export const buyerMetadata = {
  title: "Buyer",
  endpoint: "/buyers",

  fields: [
    {
      name: "buyer",
      label: "Comprador",
      type: "text",

      required: "Nome Comprador obrigatório",

      showInTable: true,

      grid: 6,
    },

  ],
} satisfies EntityConfig;