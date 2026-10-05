import { EntityConfig } from "@bryvg/shared";

type Props = {
  entity: EntityConfig;
};

export default function DynamicHeader({
  entity,
}: Props) {
  console.log(entity.fields);
console.table(
  entity.fields.map(f => ({
    name: f.name,
    showInTable: f.showInTable,
  }))
);
  return (
    <thead>
      <tr>

        {entity.fields
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