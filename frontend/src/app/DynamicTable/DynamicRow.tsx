import DynamicCell from "./DynamicCell";
import { EntityConfig } from "@/types/EntityConfig";

type Props = {
  item: any;
  config: EntityConfig;
  actions?: (item: any) => React.ReactNode;
};

export default function DynamicRow({
  item,
  config,
  actions,
}: Props) {

  return (

    <tr>

      {config.fields
        .filter(f => f.showInTable)
        .map(field => (

          <DynamicCell
            key={field.name}
            field={field}
            value={item[field.name]}
          />

        ))}

      <td>

        {actions?.(item)}

      </td>

    </tr>

  );

}