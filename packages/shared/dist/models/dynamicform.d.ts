import { EntityConfig } from "./EntityConfigtesteee";
export interface DynamicFormProps<T = any> {
    metadata: EntityConfig;
    type: "create" | "update";
    data?: Partial<T>;
    onSubmit: (data: T) => Promise<void>;
}
//# sourceMappingURL=dynamicform.d.ts.map