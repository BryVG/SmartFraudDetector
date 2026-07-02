import { FieldConfig } from "../../types/FieldConfig";

type Props = {
  field: FieldConfig;
  item: any;
};

const formatters = {
  currency: (value: any) =>
    Number(value ?? 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),

  date: (value: any) =>
    value
      ? new Date(value).toLocaleDateString("pt-BR")
      : "-",

  relation: (value: any, field: FieldConfig) =>
    value?.[field.displayField ?? "name"] ?? "-",
};

export default function DynamicCell({
  field,
  item,
}: Props) {

  const value = field.relation
    ? item[field.relation]
    : item[field.name];

  const formatter =
    field.format &&
    formatters[field.format];

  return (
    <td className={field.tableClassName}>
      {formatter
        ? formatter(value, field)
        : String(value ?? "-")}
    </td>
  );
}