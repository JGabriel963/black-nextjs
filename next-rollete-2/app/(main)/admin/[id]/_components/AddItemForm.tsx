"use client"

import { Input } from '@/components/ui/input'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Block from '@uiw/react-color-block'
import { Button } from '@/components/ui/button'
import createPrize from '@/app/actions/create-prize'
import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Campo não pode ser vazio!",
  }),
  color: z.string().optional(),
  isPrize: z.boolean().optional(),
  repeat: z.boolean().optional(),
  quantity: z.number().optional(),
});

export default function AddItemForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      color: "#000000",
      isPrize: false,
      repeat: false,
      quantity: 1
    }

  })


  const params = useParams<{ id: string }>()
  const [blockOpen, setBlockOpen] = useState(false)
  const router = useRouter()

   async function handleSubmit() {
    try {
      const prize = await createPrize({
        name: title,
        rolleteId: params.id,
        color: color,
        isPrize: isPrize,
        repeat: repeat,
        quantity: quantity

      })
      toast.success("Prêmio adicionado com sucesso!")
      router.refresh()
    } catch (error) {
      console.log("Error: ", error)
      toast.error("Erro ao adicionar prêmio!")
    }
  }



  return (
    <div className="flex flex-col w-full">
        <div className='flex items-center gap-3 relative'>
        <Input />

        <div onClick={() => setBlockOpen(!blockOpen)}  className={`size-9 border-[1px] cursor-pointer rounded-sm`} style={{ backgroundColor: color }} />

          {blockOpen ? (
            <Block
            color={color}
            onChange={(color) => {
              setColor(color.hex)
              setBlockOpen(false)
            }}
            style={{
              position: 'absolute',
              zIndex: 2,
              top: 50,
              right: -70,
            }}
          />
          ): null}
            
      </div>
      <div className='flex items-center justify-between gap-3 mt-4'>
        <div className='flex items-center gap-3'>
          <label className='flex items-center gap-2'>
            <input type="checkbox" checked={isPrize} onChange={() => setIsPrize(!isPrize)} className='w-4 h-4' />
            <span>É um prêmio?</span>
          </label>
          <label className='flex items-center gap-2'>
            <input type="checkbox" checked={repeat} onChange={() => setRepeat(!repeat)} className='w-4 h-4' />
            <span>Repetir?</span>
          </label>
        </div>
        <div>
          <label className='flex items-center gap-2'>
            <span>Quantidade:</span>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className='w-16 h-8 border border-gray-300 rounded-md px-2' />
          </label>
        </div>
      </div>
      <div>
        <Button className='w-full mt-4' onClick={handleSubmit}>
          Adicionar
        </Button>
      </div>
    </div>
  )
}
