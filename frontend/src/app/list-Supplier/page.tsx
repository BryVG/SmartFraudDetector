"use client";

import { useEffect, useState } from "react";
import FormModal from "../components/FormModal/FormModal";
import { supplierService } from "../services/supplier.service";
import styles from "./page.module.css";
import { Supplier } from "../../types/supplier";
import Table from "../components/Table/Table";

export default function SupplerPage() {
  const [supplier, setsupplier] = useState<Supplier[]>([]);

  const columns = [
    {
      header: "Nome Fornecedor",
      accessor: "name",
    },
    {
      header: "Actions",
      accessor: "actions",
    }
  ];

  const loadBuyers = async () => {
    try {
      const data = await supplierService.getAll();

      console.log("suppliers:", data);

      setsupplier(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBuyers();
  }, []);

  const renderRow = (item: Supplier) => (
    <tr
      key={item.name}
      className={styles.tableRow}
    >
      <td className={styles.nameCell}>
        {item.name}
      </td>

      <td>
        <div className={styles.actions}>
          <FormModal
            table="supplier"
            type="update"
            id={item.id}
            data={item}
          />

          <FormModal
            table="supplier"
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
          table="supplier"
          type="create"
        />
      </div>

<Table
  columns={columns}
  data={supplier}
  renderRow={renderRow}
/>
    </div>
  );
}