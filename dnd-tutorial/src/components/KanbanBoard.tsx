import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import type { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  )

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-y-hidden overflow-x-auto px-[40px]">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="mx-auto flex gap-4">
          <div className="flex gap-2">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer column={col} key={col.id} deleteColumn={deleteColumn} />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColor();
            }}
            className="h-[60px] w-[350px] cursor-pointer rounded-lg bg-main-background-color border-2 border-column-background-color p-4 ring-rose-500 hover:ring-2 flex gap-2"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(<DragOverlay>
          {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} />}
        </DragOverlay>, document.body)}
      </DndContext>
    </div>
  );

  function createNewColor() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const fileredColumns = columns.filter((col) => col.id !== id);
    setColumns(fileredColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column"){
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    let items

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      items = arrayMove(columns, activeColumnIndex, overColumnIndex)


      return items
    })

    console.log(items)


  }
}


function generateId() {
  return Math.floor(Math.random() * 10001)
}
