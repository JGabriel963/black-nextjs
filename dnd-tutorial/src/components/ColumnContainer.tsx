import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon"
import type { Column, Id } from "../types"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "../lib/utils";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
}

export default function ColumnContainer({ column, deleteColumn }: Props) {

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
      style={style}
      className="bg-column-background-color opacity-60 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      >

      </div>
    )
  }




  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("bg-column-background-color w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col")}
    >
        {/* Column title */}
        <div {...attributes} {...listeners}  className={cn('bg-main-background-color text-base h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-column-background-color border-4 flex items-center justify-between', isDragging && "cursor-grabbing")}>
          <div className="flex gap-2">
            <div
            className="flex
            justify-center
            items-center
            bg-column-background-color
            px-2py-1
            text-sm rounded-full"
          >0</div>
          {column.title}
          </div>
          <button onClick={() => {
            deleteColumn(column.id)
          }} className="stroke-gray-500 hover:stroke-white hover:bg-column-background-color rounded px-1 py-2 cursor-pointer">
              <TrashIcon />
          </button>
        </div>

        {/* Column task container */}
        <div className="flex flex-grow">Content</div>

        {/* Column footer */}
        <div>
          Footer
        </div>
    </div>
  )
}
