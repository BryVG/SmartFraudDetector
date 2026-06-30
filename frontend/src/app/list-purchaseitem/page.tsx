"use client";

import { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable/DynamicTable";
import FormModal from "../components/FormModal/FormModal";
import styles from "./page.module.css";
import { purchaseItemService } from "../services/purchaseitem.service";
import { PurchaseItem } from "../../types/purchaseItem";
import { purchaseItemConfig } from "../config/entities/purchaseItem.config";

export default function PurchaseItemPage() {
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);

  const loadPurchaseItems = async () => {
    try {
      const data = await purchaseItemService.getAll();
      setPurchaseItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPurchaseItems();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{purchaseItemConfig.title}</h1>

        <FormModal
          table="purchaseitem"
          type="create"
        />
      </div>

      <DynamicTable
        config={purchaseItemConfig}
        data={purchaseItems}
        actions={(item: any) => (
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
        )}
      />
    </div>
  );
}