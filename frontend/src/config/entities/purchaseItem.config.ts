

import { EntityConfig } from "./types";

export const purchaseItemConfig = {
  title: "Purchase Item",

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
      grid: 4,
    },

    {
      name: "totalPrice",
      label: "Valor Total",
      type: "number",
      required: "Valor Total obrigatório",
      step: "0.01",
      showInTable: true,
      grid: 4,
    },

    {
      name: "productId",
      label: "Produto",
      type: "select",
      required: "Produto obrigatório",
      format: (value) => value?.name ?? "-",  
      options: "products",
      optionLabel: "name",
      optionValue: "id",

      grid: 6,
    },

    {
      name: "purchaseOrderId",
      label: "Purchase Order",
      type: "select",
      format: (value: any) => value?.orderNumber ?? "-",  
      
      required: "Pedido obrigatório",

      options: "purchaseOrders",
      optionLabel: "orderNumber",
      optionValue: "id",

      grid: 6,
    },

    {
      name: "createdAt",
      label: "Data",
      type: "date",
      format: (value) => new Date(value).toLocaleDateString(),
      required: "Data obrigatória",

      showInTable: true,

      grid: 6,
    },
  ],
}satisfies EntityConfig;