import { EntityConfig } from "@/types/EntityConfig";

type Props = {
  config: EntityConfig;
};

export default function DynamicHeader({
  config,
}: Props) {
  return (
    <thead>
      <tr>

        {config.fields
          .filter(f => f.showInTable)
          .map(field => (

            <th key={field.name}>
              {field.label}
            </th>

          ))}

        <th>Actions</th>

      </tr>
    </thead>
  );
}