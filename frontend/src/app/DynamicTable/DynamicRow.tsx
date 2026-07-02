import DynamicCell from "./DynamicCell";
import FormModal from "../components/FormModal/FormModal";
import { EntityConfig } from "@/types/EntityConfig";

type Props = {
  entity: string;
  item: any;
  config: EntityConfig;
};

export default function DynamicRow({
  entity,
  item,
  config,
}: Props) {

  console.log("ITEM:", item);

  return (
    <tr>

      {config.fields
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
          table={entity as any}
          type="update"
          id={item.id}
          data={item}
        />

        <FormModal
          table={entity as any}
          type="delete"
          id={item.id}
        />

      </td>

    </tr>
  );
}