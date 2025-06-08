"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragOverEvent,
} from "@dnd-kit/core";
import type { DropAnimation } from "@dnd-kit/core";

import { Task } from "@/types";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";

export function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
  };

  const initialColumns: Record<string, Task[]> = tasks.reduce((acc, task) => {
    const columnId = task.statusOption?.id || "default";
    if (!acc[columnId]) {
      acc[columnId] = [];
    }
    acc[columnId].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const [columns, setColumns] = useState(initialColumns);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8ピクセル以上動かさないとドラッグ開始しない
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    // アクティブなタスクを見つける
    for (const tasks of Object.values(columns)) {
      const task = tasks.find((t) => t.id.toString() === active.id);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId((over?.id as string) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("Drag Ended:", event);
    setActiveId(null);
    setOverId(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) {
      console.log("No drop target found");
      return;
    }

    let activeColumnId: string | null = null;
    // アクティブなタスクを含むカラムを探す
    for (const [columnId, tasks] of Object.entries(columns)) {
      if (tasks.find((task) => task.id.toString() === active.id)) {
        activeColumnId = columnId;
        break;
      }
    }

    if (!activeColumnId) {
      console.log("No active column found");
      return;
    }

    const activeTasks = [...columns[activeColumnId]];
    const activeIndex = activeTasks.findIndex((task) => task.id.toString() === active.id);
    const activeTask = activeTasks[activeIndex];

    // ドロップ先の列を特定
    let targetColumnId = over.id as string;
    if (!Object.keys(columns).includes(targetColumnId)) {
      // タスク上にドロップされた場合、そのタスクのカラムを探す
      for (const [columnId, tasks] of Object.entries(columns)) {
        if (tasks.find((task) => task.id.toString() === over.id)) {
          targetColumnId = columnId;
          break;
        }
      }
    }

    if (activeColumnId === targetColumnId) {
      // 同じカラム内での移動
      const tasks = [...columns[activeColumnId]];
      const oldIndex = activeIndex;
      let newIndex;

      if (Object.keys(columns).includes(over.id as string)) {
        // カラム自体にドロップされた場合
        newIndex = tasks.length;
        // マウス位置に基づいて挿入位置を計算
        for (let i = 0; i < tasks.length; i++) {
          const taskElement = document.getElementById(tasks[i].id.toString());
          if (taskElement) {
            const rect = taskElement.getBoundingClientRect();
            const taskMiddle = rect.top + rect.height / 2;
            if (event.over?.rect.top && event.over.rect.top < taskMiddle) {
              newIndex = i;
              break;
            }
          }
        }
      } else {
        // タスク上にドロップされた場合
        newIndex = tasks.findIndex((task) => task.id.toString() === over.id);
      }

      tasks.splice(oldIndex, 1);
      tasks.splice(newIndex, 0, activeTask);

      setColumns({
        ...columns,
        [activeColumnId]: tasks,
      });
    } else {
      // 異なるカラムへの移動
      const sourceColumn = [...columns[activeColumnId]];
      const targetColumn = [...columns[targetColumnId]];

      sourceColumn.splice(activeIndex, 1);

      if (Object.keys(columns).includes(over.id as string)) {
        // カラム自体にドロップされた場合
        let insertIndex = targetColumn.length;
        // マウス位置に基づいて挿入位置を計算
        for (let i = 0; i < targetColumn.length; i++) {
          const taskElement = document.getElementById(targetColumn[i].id.toString());
          if (taskElement) {
            const rect = taskElement.getBoundingClientRect();
            const taskMiddle = rect.top + rect.height / 2;
            if (event.over?.rect.top && event.over.rect.top < taskMiddle) {
              insertIndex = i;
              break;
            }
          }
        }
        targetColumn.splice(insertIndex, 0, activeTask);
      } else {
        // タスク上にドロップされた場合
        const overIndex = targetColumn.findIndex((task) => task.id.toString() === over.id);
        targetColumn.splice(overIndex, 0, activeTask);
      }

      setColumns({
        ...columns,
        [activeColumnId]: sourceColumn,
        [targetColumnId]: targetColumn,
      });
    }
  };

  // TODO: ここからAPIを呼び出して、タスクの移動をサーバーに反映させる
  // useEffectでcolumnの変更を監視してAPIを呼び出せばOK

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 p-6 overflow-x-auto min-h-[calc(100vh-2rem)] bg-gray-50/30">
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Column
            key={columnId}
            tasks={tasks}
            title={columnId === "default" ? "未分類" : columnId}
            activeId={activeId}
            overId={overId}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? (
          <div className="transform rotate-3 scale-105">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
