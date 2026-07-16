// types/EntityConfig.ts

import { FieldConfig } from "./FieldConfig";

export interface EntityConfig {
  title: string;
  endpoint: string;
  fields: FieldConfig[];
}