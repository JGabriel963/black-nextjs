"use client"

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { ComponentRef, useRef } from "react";
import { FormPicker } from "./form-picker";

interface FormInputProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    align,
    side,
    sideOffset
}: FormInputProps) => {
    const router = useRouter()
    const closeRef = useRef<ComponentRef<"button">>(null)

    const { execute, fieldErrors } = useAction(createBoard, {
        onSucess: (data) => {
            console.log({ data })
            toast.success("Board created!");
            closeRef.current?.click()
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toast.error(error)
        }
    })


    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;
        
        execute({ title, image })
    }



    return (
        <Popover>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="size-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker
                            id="image"
                            errors={fieldErrors}
                        />
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit
                        className="w-full"
                    >
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}