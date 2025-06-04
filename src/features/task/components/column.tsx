"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "dueDate",
    accessorFn: (row) => row.dueDate?.toLocaleDateString() || "未設定",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
  },
  {
    id: "customFields.priority",
    accessorKey: "customFields.priority",
    header: "Priority",
  },
  {
    id: "customFields.estimate",
    accessorKey: "customFields.estimate",
    header: "Estimate",
  },
];
