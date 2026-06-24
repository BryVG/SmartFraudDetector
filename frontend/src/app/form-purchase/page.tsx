"use client";

import { useEffect, useState } from "react";
import FormModal from "../components/FormModal/FormModal";
import { purchaseOrderService } from "../services/purchaseOrder.service";
import { styles } from "./page.module.css"

export default const LaboratorioPage = async ({searchParams,}: {searchParams: { [key: string]: string | undefined}
}) => {

  const columns = [
  {
    header: "Order",
    accessor: "order",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    
  },
  {
    header: "Grade",
    accessor: "grade",
    
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    
  }
];

const renderRow = (item: purchaseOrder) => (
  <tr
    key={item.id}
    className={styles.tableRow}
  >
    <td className={styles.nameCell}>{item.name}</td>
    <td className={styles.hiddenMobile}>{item.capacity}</td>
    <td className={styles.hiddenMobile}>{item.name[0]}</td>
    <td className={styles.hiddenMobile}>
      {item.supervisor.name + " " + item.supervisor.surname}
    </td>
    <td>
      <div className={styles.actions}>
        
          <>
            <FormContainer table="class" type="update" data={item} />
            <FormContainer table="class" type="delete" id={item.id} />
          </>
        
      </div>
    </td>
  </tr>
);
  
  
  
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Laboratório CRUD Purchase Order</h1>

      <div style={{ marginBottom: "20px" }}>
        <FormModal
          table="purchaseorder"
          type="create"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número Pedido</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {purchaseOrders.map((purchaseOrder) => (
            <tr key={purchaseOrder.id}>
              <td>{purchaseOrder.id}</td>
              <td>{purchaseOrder.orderNumber}</td>
              <td>{purchaseOrder.totalAmount}</td>

              <td>
                <FormModal
                  table="purchaseorder"
                  type="update"
                  id={purchaseOrder.id}
                  data={purchaseOrder}
                />

                <FormModal
                  table="purchaseorder"
                  type="delete"
                  id={purchaseOrder.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
