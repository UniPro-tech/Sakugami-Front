"use client";

import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/types";
import { SortableTask } from "./SortableTask";
import { TaskCard } from "./TaskCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface ColumnProps {
  title: string;
  tasks: Task[];
  activeId: string | null;
  overId: string | null;
}

export function Column({ title, tasks, activeId, overId }: ColumnProps) {
  const items = tasks.map((task) => task.id.toString());
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-80 bg-white rounded-xl shadow-sm flex flex-col max-h-[calc(100vh-4rem)] ${
        isOver ? "ring-2 ring-blue-500 ring-inset" : ""
      }`}
    >
      <div className="p-4 border-b bg-gray-50/50">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          <span>{title}</span>
          <span className="text-sm font-normal text-gray-500 bg-white px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </h2>
      </div>
      <div className="p-3 flex flex-col gap-3 overflow-y-auto">
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              id={task.id.toString()}
              activeId={activeId}
              overId={overId}
            >
              <TaskCard task={task} />
            </SortableTask>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
