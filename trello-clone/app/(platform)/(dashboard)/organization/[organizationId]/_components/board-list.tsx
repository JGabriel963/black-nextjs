import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";

export default function BoardList() {
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="size-6 mr-2" />
                Your boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    role="button"
                    className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                >
                    <p className="text-sm">Create new board</p>
                    <span className="text-sm">
                        5 reaming
                    </span>
                    <Hint
                        side="bottom"
                        sideOffset={40}
                        description={
                            "Free Workspaces can have up to 5 open boards. For unlimited board upgrade this worksplace."
                        }
                    >
                        <HelpCircle
                            className="absolute bottom-2 right-2 size-[14px]"
                        />
                    </Hint>
                </div>
            </div>
        </div>
    )
}