
import styles from "./Table.module.css"
import { EntityConfig } from "@/types/EntityConfig"; 

type TableProps<T> = {
    config: EntityConfig;
    data: T[];
};

export default function Table<T>({
    config,
    data,
}: TableProps<T>) {
    return (
        <table className={styles.table}>

            <thead>

                <tr>

                    {config.fields
                        .filter(field => field.showInTable)
                        .map(field => (

                            <th key={field.name}>
                                {field.label}
                            </th>

                        ))}

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {data.map(item => (

                    <tr key={(item as any).id}>

                        {config.fields
                            .filter(field => field.showInTable)
                            .map(field => (

                                <DynamicCell
                                    key={field.name}
                                    field={field}
                                    value={(item as any)[field.name]}
                                />

                            ))}

                        <td>
                            {/* depois colocamos FormModal */}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}