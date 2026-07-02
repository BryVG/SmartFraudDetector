//import styles from "./DynamicTable.module.css";

import DynamicHeader from "./DynamicHeader";
import DynamicRow from "./DynamicRow";

import { EntityConfig } from "../../types/EntityConfig";

type Props<T> = {
  entity: string;
  config: EntityConfig;
  data: T[];
};

export default function DynamicTable<T>({
  entity,
  config,
  data,
}: Props<T>) {
  return (
    <table>
      <DynamicHeader config={config} />

      <tbody>
        {data.map((item: any) => (
          <DynamicRow
            key={item.id}
            entity={entity}
            item={item}
            config={config}
          />
        ))}
      </tbody>
    </table>
  );
}