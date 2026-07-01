//import styles from "./DynamicTable.module.css";
import DynamicHeader from "./DynamicHeader";
import DynamicRow from "./DynamicRow";
import { EntityConfig } from "../../types/EntityConfig";

type Props<T> = {
  config: EntityConfig;
  data: T[];
  actions?: (item: T) => React.ReactNode;
};

export default function DynamicTable<T>({
  config,
  data,
  actions,
}: Props<T>) {
  return (
    <table
     //className={styles.table}
     >
      <DynamicHeader config={config} />

      <tbody>
        {data.map((item: any) => (
          <DynamicRow
            key={item.id}
            item={item}
            config={config}
            actions={actions}
          />
        ))}
      </tbody>
    </table>
  );
}