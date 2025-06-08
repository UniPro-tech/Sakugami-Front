import { CustomFieldValue } from "./CustomField";
import { CustomSelectOption } from "./CustomSelectOption";

export interface Task {
  id: number;
  title: string;
  statusOption?: CustomSelectOption; // status は select オプションで持たせる
  startDate?: Date;
  dueDate?: Date;
  columnId: number;
  projectId: number;
  assigneeId?: number;
  milestoneId?: number;
  createdAt: Date;
  customFields: Record<string, CustomFieldValue>; // 他のカスタムフィールド
}
