import { EntityConfig } from "@bryvg/shared";

export const productMetadata = {
  title: "Product",
  endpoint: "/products",

  fields: [
    {
      name: "product",
      label: "Nome Produto",
      type: "text",

      required: "Nome Produto obrigatório",

      showInTable: true,

      grid: 6,
    },

    {
      name: "StandardMeasure",
      label: "Medida",
      type: "text",

      required: "Medida obrigatória",

      showInTable: true,

      grid: 6,
    },

    {
      name: "StandardUnit",
      label: "Unidade Padrão",
      type: "number",

      required: "Unidade Padrão obrigatória",

      step: "0.01",

      showInTable: true,

      format: "currency",

      grid: 4,
    },

  ],
} satisfies EntityConfig;