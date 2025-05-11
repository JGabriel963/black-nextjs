import { cn } from "@/lib/utils";
import { Budget } from "@/schema";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grid, Grip } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BudgetItemProps {
  data: Budget;
}

export default function BudgetItem({ data }: BudgetItemProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: "Card",
      card: data,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "px-5 py-10 border-2 rounded-lg hover:shadow-md cursor-pointer bg-white opacity-60 border-primary/40 touch-none",
        )}
      >
        <div className="flex gap-2 items-center opacity-0">
          <Grip
            className={cn(
              "text-slate-400 cursor-grab outline-none",
              isDragging && "cursor-grabbing outline-none"
            )}
            {...listeners}
            {...attributes}
          />
          <Link
            href={`/fontes/${data.id}`}
            className="flex gap-2 items-center w-full"
          >
            <h2 className="text-2xl p-3 bg-slate-100 rounded-full">
              {data.icon}
            </h2>
            <div>
              <h2 className="font-bold"> {data.name} </h2>
              <p className="text-slate-500 text-sm"> {data.amount} </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        "px-5 py-10 border rounded-lg hover:shadow-md cursor-pointer bg-white touch-none"
      }
    >
      <div className="flex gap-2 items-center">
        <Grip
          className={cn(
            "text-slate-400 cursor-grab outline-none touch-manipulation",
            isDragging && "cursor-grabbing outline-none"
          )}
          {...listeners}
          {...attributes}
        />
        <Link
          href={`/fontes/${data.id}`}
          className="flex gap-2 items-center w-full"
        >
          <h2 className="text-2xl p-3 bg-slate-100 rounded-full">
            {data.icon}
          </h2>
          <div>
            <h2 className="font-bold"> {data.name} </h2>
            <p className="text-slate-500 text-sm"> {data.amount} </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
