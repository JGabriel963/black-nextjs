import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';
import React, { ComponentRef, useRef } from 'react'
import { toast } from 'sonner';

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}

function ListOptions({
    data,
    onAddCard
}: ListOptionsProps) {
    const closeRef = useRef<ComponentRef<"button">>(null);

    const { execute: executeDelete } = useAction(deleteList, {
        onSucess: (data) => {
            toast.success(`List "${data.title}" deleted`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSucess: (data) => {
            toast.success(`List "${data.title}" copied`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeDelete({ id, boardId })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeCopy({ id, boardId })
    }



  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button className='h-auto w-auto p-2' variant="ghost">
                <MoreHorizontal className='size-4' />
            </Button>
        </PopoverTrigger>
        <PopoverContent className='px-0 pt-3 pb-3'>
            <div className="text-sm font-medium text-center text-neutral-600">
                List actions
            </div>
            <PopoverClose ref={closeRef} asChild className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'>
                <Button variant="ghost">
                    <X className='size-4' />
                </Button>
            </PopoverClose>
            <Button
                onClick={onAddCard}
                className='rounded-none w-full h-auto p-2 px-5 justify-start'
                variant="ghost"
            >
                Add card...
            </Button>
            <form action={onCopy}>
                <input hidden name='id' id='id' value={data.id} />
                <input hidden name='boardId' id='boardId' value={data.boardId} />
                <FormSubmit
                    variant='ghost'
                    className='rounded-none w-full h-auto p-2 px-5 justify-start'
                >
                    Copy list...
                </FormSubmit>
            </form>
            <Separator />
            <form action={onDelete}>
                <input hidden name='id' id='id' value={data.id} />
                <input hidden name='boardId' id='boardId' value={data.boardId} />
                <FormSubmit
                    variant='ghost'
                    className='rounded-none w-full h-auto p-2 px-5 justify-start'
                >
                    Delete this list
                </FormSubmit>
            </form>
        </PopoverContent>
    </Popover>
  )
}

export default ListOptions