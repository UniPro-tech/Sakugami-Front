import { mockTasks } from "../mockData";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./column";

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
