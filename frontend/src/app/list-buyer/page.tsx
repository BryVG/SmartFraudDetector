"use client";

import { useEffect, useState } from "react";
import FormModal from "../components/FormModal/FormModal";
import { buyerService } from "../services/buyer.service";
import styles from "./page.module.css";
import { Buyer } from "../../types/buyer";
import Table from "../components/Table/Table";

export default function BuyerPage() {
  const [buyer, setbuyers] = useState<Buyer[]>([]);

  const columns = [
    {
      header: "Nome Comprador",
      accessor: "name",
    },
    {
      header: "Actions",
      accessor: "actions",
    }
  ];

  const loadBuyers = async () => {
    try {
      const data = await buyerService.getAll();

      console.log("buyers:", data);

      setbuyers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBuyers();
  }, []);

  const renderRow = (item: Buyer) => (
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
            table="buyer"
            type="update"
            id={item.id}
            data={item}
          />

          <FormModal
            table="buyer"
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
          table="buyer"
          type="create"
        />
      </div>

<Table
  columns={columns}
  data={buyer}
  renderRow={renderRow}
/>
    </div>
  );
}