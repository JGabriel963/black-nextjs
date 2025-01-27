"use client"

import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";



export default function OrganizationIdPage() {
    const { execute } = useAction(createBoard, {
        onSucess: (data) => {
            console.log(data, "Sucess")
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title });
    }

    return (
        <div className="flex flex-col space-y-4">
            <form action={onSubmit}>
                <input 
                    type="text" 
                    name="title"
                    required
                    placeholder="Enter a board title"
                    className="border-black border p-1"
                />
                <Button type="submit">
                    Submit
                </Button>
            </form>

            {/* <div className="space-y-2">
                {boards.map((board) => (
                    <div key={board.id}>
                        Board title: {board.title}
                    </div>
                ))}
            </div> */}
        </div>
    )
}