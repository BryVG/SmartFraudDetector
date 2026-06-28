
"use client";

import { useEffect, useState } from "react";
import FormModal from "../components/FormModal/FormModal";
import Table from "../components/Table/Table";
import styles from "./page.module.css";

import { purchaseItemService } from "../services/purchaseitem.service";
import { PurchaseItem } from "../../types/purchaseItem";
import { purchaseItemConfig } from "../config/entities/purchaseItem.config";

export default function PurchaseItemPage() {
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);

 const columns = [
  ...purchaseItemConfig.fields
    .filter(field => field.showInTable)
    .map(field => ({
      header: field.label,
      accessor: field.name,
    })),

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
<tr key={item.id}
    className={styles.tableRow}>
  {purchaseItemConfig.fields
    .filter(field => field.showInTable)
    .map(field => (
      <td key={field.name}>
        {field.format
          ? field.format(item[field.name as keyof PurchaseItem])
          : item[field.name as keyof PurchaseItem]}
      </td>
    ))}

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