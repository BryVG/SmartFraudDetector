
import { EntityConfig } from "./EntityConfigtesteee"


export interface DynamicFormProps<T = any> {
  metadata: EntityConfig;
  type: "create" | "update";
  data?: Partial<T>;
 // relatedData?: Record<string, any>;
  onSubmit: (data: T) => Promise<void>;
}

