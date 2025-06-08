import { CustomSelectOption } from "./CustomSelectOption";

export type CustomFieldType = "text" | "number" | "select" | "checkbox" | "date";
export type CustomFieldValue = string | number | boolean | CustomSelectOption | Date;

export interface CustomField {
  id: number;
  projectId: number;
  name: string;
  fieldType: CustomFieldType;
  required: boolean;
  options?: CustomSelectOption[];
  createdAt: string;
}
