"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dynamic from "next/dynamic";

interface SortableTaskProps {
  id: string;
  children: React.ReactNode;
  activeId: string | null;
  overId: string | null;
}

function SortableTaskComponent({ id, children, activeId, overId }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const isOver = overId === id;
  const isActive = activeId === id;

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    position: "relative" as const,
  };

  return (
    <div className="relative py-1">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
      {isOver && !isActive && (
        <div className="absolute left-0 right-0 h-0.5 bg-blue-500 transition-all duration-200 transform">
          <div className="absolute inset-0 animate-pulse bg-blue-400 rounded-full" />
        </div>
      )}
    </div>
  );
}

export const SortableTask = dynamic(() => Promise.resolve(SortableTaskComponent), {
  ssr: false,
}) as typeof SortableTaskComponent;
