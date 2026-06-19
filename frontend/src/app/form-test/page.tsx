"use client";

import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import { productService } from "../services/product.service";

export default function LaboratorioPage() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Laboratório CRUD Produto</h1>

      <div style={{ marginBottom: "20px" }}>
        <FormModal
          table="product"
          type="create"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Unidade</th>
            <th>Medida</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.StandardUnit}</td>
              <td>{product.StandardMeasure}</td>

              <td>
                <FormModal
                  table="product"
                  type="update"
                  id={product.id}
                  data={product}
                />

                <FormModal
                  table="product"
                  type="delete"
                  id={product.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}