import { Task } from "../../../types"; // Task型
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const statusColor =
    {
      Todo: "bg-gray-200 text-gray-800",
      "In Progress": "bg-yellow-200 text-yellow-800",
      Done: "bg-green-200 text-green-800",
    }[task.status] || "bg-gray-100 text-gray-700";

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>
            {task.status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <div className="flex justify-between">
          <div className="font-semibold">Due:</div>
          <div>{task.dueDate?.toLocaleDateString() ?? "未設定"}</div>
        </div>

        {Object.entries(task.customFields).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between"
          >
            <div className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</div>
            <div>{value}</div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {/* TODO: Add edit and delete functionality */}
        <Button
          size="icon"
          variant="ghost"
          onClick={onEdit}
          aria-label="Edit Task"
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
          aria-label="Delete Task"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
}
