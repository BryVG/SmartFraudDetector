
import styles from "./Table.module.css"

type Column = {
    header: string;
    accessor: string;
    className?: string;
}

type Tableprops<T> = {
    columns: Column[];
    data: T[];
    renderRow: (item: T) => React.ReactNode; 
}

export default function Table<T>({
    columns,
    data,
    renderRow
} : Tableprops<T>) {
    return(
        <table className={styles.table}>
            <thead>
                <tr>
                   {columns.map((column) =>( 
                    <th key={column.accessor}
                    className={column.className}>
                        {column.header}
                    </th>))}
                </tr>
            </thead>

<tbody>{data.map((item) => renderRow(item))}</tbody>
        </table>
    )
} 