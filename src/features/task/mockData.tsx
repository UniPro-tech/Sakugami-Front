import { Task } from "./components/column";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "ログイン画面を作る",
    status: "In Progress",
    dueDate: new Date("2025-06-10"),
    customFields: {
      priority: "High",
      estimate: "2 hours",
    },
  },
  {
    id: 2,
    title: "ユーザー登録機能を実装する",
    status: "In Progress",
    dueDate: new Date("2025-06-11"),
    customFields: {
      priority: "Medium",
      estimate: "1 hour",
    },
  },
  {
    id: 3,
    title: "スタイルを整える",
    status: "In Progress",
    dueDate: new Date("2025-06-10"),
    customFields: {
      priority: "Low",
      estimate: "2 hours",
    },
  },
];
