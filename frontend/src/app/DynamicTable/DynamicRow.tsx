import DynamicCell from "./DynamicCell";
import FormModal from "../components/FormModal/FormModal";
import { EntityConfig } from "@/types/EntityConfigtesteee";

type Props = {
  entity: string;
  item: any;
  metadata: EntityConfig;
};

export default function DynamicRow({
  entity,
  item,
  metadata,
}: Props) {

console.table(
  metadata.fields.map(f => ({
    name: f.name,
    showInTable: f.showInTable,
    relation: f.relation,
  }))
);
  return (
    <tr>

      {metadata.fields
        .filter(f => f.showInTable)
        .map(field => {

          console.log("Campo:", field.name);
          console.log("Relation:", field.relation);
          console.log("Valor:", item[field.name]);
          console.log(
            "Objeto:",
            field.relation ? item[field.relation] : undefined
          );

          return (
            <DynamicCell
              key={field.name}
              field={field}
              item={item}
            />
          );
        })}

      <td>

        <FormModal
          entity={entity as any}
          type="update"
          id={item.id}
          data={item}
          metadata={metadata}
        />

        <FormModal
          entity={entity as any}
          type="delete"
          id={item.id}
          metadata={metadata}
        />
      </td>

    </tr>
  );
}