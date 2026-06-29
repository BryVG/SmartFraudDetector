import { FieldConfig } from "../../types/FieldConfig";

type Props = {
  field: FieldConfig;
  value: any;
};

export default function DynamicCell({
  field,
  value,
}: Props) {

  return (

    <td>

      {field.format
        ? field.format(value)
        : String(value ?? "-")}

    </td>

  );

}