"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Task = {
  id: number;
  title: string;
  status: "TODO" | "In Progress" | "Done";
  dueDate: Date | null;
  customFields?: {
    priority?: "Low" | "Medium" | "High";
    estimate?: string;
  };
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorFn: (row) => row.dueDate?.toLocaleDateString() || "未設定",
    header: "Due Date",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "customFields.priority",
    header: "Priority",
  },
  {
    accessorKey: "customFields.estimate",
    header: "Estimate",
  },
];
