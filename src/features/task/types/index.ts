export type Task = {
  id: number;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  dueDate: Date | null;
  customFields: Record<string, string | number | boolean | null>;
};

export type CustomFieldDefinition = {
  id: number;
  name: string;
  fieldType: "text" | "number" | "select" | "checkbox" | "date";
  options?: string[]; // select の場合のみ
  required: boolean;
};
