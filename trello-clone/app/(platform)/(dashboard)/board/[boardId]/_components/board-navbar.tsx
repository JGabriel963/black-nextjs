import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title";
import { BoardOption } from "./board-options";

interface BoardNavbarProps {
    data: Board;
}

export async function BoardNavbar({
    data
}: BoardNavbarProps) {

    return (
       <div
        className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white"
       >
        <BoardTitleForm data={data} />
        <div className="ml-auto">
            <BoardOption id={data.id} />
        </div>
       </div> 
    )
}