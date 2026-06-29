
import { EntityConfig } from "../types/EntityConfig"


export interface DynamicFormProps<T = any> {
  config: EntityConfig;
  type: "create" | "update";
  data?: Partial<T>;
  relatedData?: Record<string, any>;
  onSubmit: (data: T) => Promise<void>;
}