import { Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Check } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isOverdue = task.dueDate ? task.dueDate < new Date() : false;

  return (
    <Card className="w-full bg-white hover:shadow-md transition-shadow duration-200 border-gray-100">
      <CardHeader className="pb-2 px-4 pt-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base font-medium line-clamp-2">{task.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm px-4">
        {task.statusOption && (
          <div className="flex justify-between items-center">
            <div className="font-semibold mb-1">Status:</div>
            <span
              className="inline-block px-2 py-0.5 rounded-full font-semibold text-sm shadow-2xs"
              style={{
                backgroundColor: task.statusOption.color ?? "#ccc",
                color: "#fff",
              }}
            >
              {task.statusOption.name}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <div className="font-semibold">Due:</div>
          <div className={`${isOverdue ? "text-red-600 font-semibold" : ""}`}>
            {task.dueDate?.toLocaleDateString() ?? "未設定"}
          </div>
        </div>

        {Object.entries(task.customFields).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center"
          >
            <div className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</div>
            <div>
              {typeof value === "boolean" ? (
                value ? (
                  <Check className="inline-block w-4 h-4 text-green-600" />
                ) : (
                  "✗"
                )
              ) : value instanceof Date ? (
                value.toLocaleDateString()
              ) : typeof value === "object" && value !== null && "name" in value ? (
                <span
                  className="inline-block px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: value.color ?? "#ccc",
                    color: "#fff",
                  }}
                >
                  {value.name}
                </span>
              ) : (
                value ?? ""
              )}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={onEdit}
          aria-label="Edit Task"
          disabled={!onEdit}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
          aria-label="Delete Task"
          disabled={!onDelete}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
}
