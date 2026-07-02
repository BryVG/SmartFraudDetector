import { EntityConfig } from "../EntityConfig";

export const purchaseItemMetadata = {
  title: "Purchase Item",
  endpoint: "/purchaseitems",

  fields: [
    {
      name: "unit",
      label: "Unidade",
      type: "text",

      required: "Unidade obrigatória",

      showInTable: true,

      grid: 6,
    },

    {
      name: "Measure",
      label: "Medida",
      type: "text",

      required: "Medida obrigatória",

      showInTable: true,

      grid: 6,
    },

    {
      name: "quantity",
      label: "Quantidade",
      type: "number",

      required: "Quantidade obrigatória",

      showInTable: true,

      grid: 4,
    },

    {
      name: "unitPrice",
      label: "Valor Unitário",
      type: "number",

      required: "Valor Unitário obrigatório",

      step: "0.01",

      showInTable: true,

      format: "currency",

      grid: 4,
    },

    {
      name: "totalPrice",
      label: "Valor Total",
      type: "number",

      required: "Valor Total obrigatório",

      step: "0.01",

      showInTable: true,

      format: "currency",

      grid: 4,
    },

    {
      name: "productId",
      label: "Produto",
      type: "select",
      relation: "product",
      

      required: "Produto obrigatório",

      endpoint: "/products",

      optionValue: "id",
      optionLabel: "name",
      showInTable: true,  
      displayField: "name",
       format: "relation",
      grid: 6,
    },

    {
      name: "purchaseOrderId",
      label: "Purchase Order",
      type: "select",
      relation: "purchaseOrder",
      required: "Pedido obrigatório",

      endpoint: "/purchaseOrders",

      optionValue: "id",
      optionLabel: "orderNumber",
      format: "relation",
      showInTable: true,  
      displayField: "orderNumber",

      grid: 6,
    },

    {
      name: "createdAt",
      label: "Data",
      type: "date",

      required: "Data obrigatória",

      showInTable: true,

      format: "date",

      grid: 6,
    },
  ],
} satisfies EntityConfig;