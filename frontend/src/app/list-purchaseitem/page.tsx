
"use client";

import { useEffect, useState } from "react";
import FormModal from "../components/FormModal/FormModal";
import Table from "../components/Table/Table";
import styles from "./page.module.css";

import { purchaseItemService } from "../services/purchaseItem.service";
import { PurchaseItem } from "../../types/purchaseItem";

export default function PurchaseItemPage() {
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);

  const columns = [
    {
      header: "Produto",
      accessor: "product",
    },
    {
      header: "Purchase Order",
      accessor: "purchaseOrder",
    },
    {
      header: "Quantidade",
      accessor: "quantity",
    },
    {
      header: "Valor Unitário",
      accessor: "unitPrice",
    },
    {
      header: "Valor Total",
      accessor: "totalPrice",
    },
    {
      header: "Actions",
      accessor: "actions",
    },
  ];

  const loadPurchaseItems = async () => {
    try {
      const data = await purchaseItemService.getAll();

      console.log("Purchase Items:", data);

      setPurchaseItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPurchaseItems();
  }, []);

  const renderRow = (item: PurchaseItem) => (
    <tr
      key={item.id}
      className={styles.tableRow}
    >
      <td className={styles.nameCell}>
        {item.product?.name ?? "-"}
      </td>

      <td>
        {item.purchaseOrder?.orderNumber ?? "-"}
      </td>

      <td>
        {item.quantity}
      </td>

      <td>
        {item.unitPrice}
      </td>

      <td>
        {item.totalPrice}
      </td>

      <td>
        <div className={styles.actions}>
          <FormModal
            table="purchaseitem"
            type="update"
            id={item.id}
            data={item}
          />

          <FormModal
            table="purchaseitem"
            type="delete"
            id={item.id}
          />
        </div>
      </td>
    </tr>
  );

  return (
    <div className={styles.container}>
      {/* TOP */}
      <div className={styles.header}>
        <h1>Purchase Items</h1>

        <FormModal
          table="purchaseitem"
          type="create"
        />
      </div>

      <Table
        columns={columns}
        data={purchaseItems}
        renderRow={renderRow}
      />
    </div>
  );
}