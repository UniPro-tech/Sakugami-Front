import { mockTasks } from "../mockData";
import { DataTable } from "@/components/ui/DataTable";
import { columns, Task } from "./column";

export function TaskTable() {
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={mockTasks}
      />
    </div>
  );
}
