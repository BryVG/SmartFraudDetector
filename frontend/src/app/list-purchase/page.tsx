"use client";

import { useEffect, useState } from "react";
import FormModal from "../components/FormModal/FormModal";
import { purchaseOrderService } from "../services/purchaseOrder.service";
import styles from "./page.module.css";
import { PurchaseOrder } from "../../types/purchaseOrder";
import Table from "../components/Table/Table";

export default function PurchaseOrderPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  const columns = [
    {
      header: "Order Number",
      accessor: "orderNumber",
    },
    {
      header: "Total Amount",
      accessor: "totalAmount",
    },
    {
      header: "Buyer",
      accessor: "buyer",
    },
    {
      header: "Supplier",
      accessor: "supplier",
    },
    {
      header: "Actions",
      accessor: "actions",
    },
  ];

  const loadPurchaseOrders = async () => {
    try {
      const data = await purchaseOrderService.getAll();

      console.log("Purchase Orders:", data);

      setPurchaseOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPurchaseOrders();
  }, []);

  const renderRow = (item: PurchaseOrder) => (
    <tr
      key={item.id}
      className={styles.tableRow}
    >
      <td className={styles.nameCell}>
        {item.orderNumber}
      </td>

      <td>
        {item.totalAmount}
      </td>

      <td className={styles.hiddenMobile}>
        {item.buyer?.name ?? "-"}
      </td>

      <td className={styles.hiddenMobile}>
        {item.supplier?.name ?? "-"}
      </td>

      <td>
        <div className={styles.actions}>
          <FormModal
            table="purchaseorder"
            type="update"
            id={item.id}
            data={item}
          />

          <FormModal
            table="purchaseorder"
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
        <h1>Purchase Orders</h1>

        <FormModal
          table="purchaseorder"
          type="create"
        />
      </div>

<Table
  columns={columns}
  data={purchaseOrders}
  renderRow={renderRow}
/>
    </div>
  );
}