import { Task } from "@/types";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "ログイン画面を作る",
    statusOption: {
      id: 1,
      fieldId: 100,
      name: "In Progress",
      color: "#facc15", // 黄色系
      createdAt: new Date(),
    },
    dueDate: new Date("2025-06-10"),
    columnId: 1,
    projectId: 1,
    createdAt: new Date(),
    customFields: {
      priority: "High",
      estimate: "2 hours",
    },
  },
  {
    id: 2,
    title: "ユーザー登録機能を実装する",
    statusOption: {
      id: 1,
      fieldId: 100,
      name: "In Progress",
      color: "#facc15",
      createdAt: new Date(),
    },
    dueDate: new Date("2025-06-11"),
    columnId: 1,
    projectId: 1,
    createdAt: new Date(),
    customFields: {
      priority: "Medium",
      estimate: "1 hour",
    },
  },
  {
    id: 3,
    title: "スタイルを整える",
    statusOption: {
      id: 2,
      fieldId: 100,
      name: "Done",
      color: "#4ade80", // 緑
      createdAt: new Date(),
    },
    dueDate: new Date("2025-06-10"),
    columnId: 1,
    projectId: 1,
    createdAt: new Date(),
    customFields: {
      priority: "Low",
      estimate: "2 hours",
    },
  },
];
