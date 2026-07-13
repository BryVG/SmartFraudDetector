//import styles from "./DynamicTable.module.css";

import DynamicHeader from "./DynamicHeader";
import DynamicRow from "./DynamicRow";

import { EntityConfig } from "../../types/EntityConfig";

type Props<T> = {
  entity: string;
  metadata: EntityConfig;
  data: T[];
};

export default function DynamicTable<T>({
  entity,
  metadata,
  data,
}: Props<T>) {
  return (
    <table>
      <DynamicHeader metadata={metadata} />

      <tbody>
        {data.map((item: any) => (
          <DynamicRow
            key={item.id}
            entity={entity}
            item={item}
            metadata={metadata}
          />
        ))}
      </tbody>
    </table>
  );
}