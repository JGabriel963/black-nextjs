"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { useParams, useRouter } from 'next/navigation'
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
  color: z.string(),
  isPrize: z.boolean(),
  repeat: z.boolean(),
  quantity: z.number(),
});

interface AddItemFormProps {
  params: string
}

export default function AddItemForm({ params }: AddItemFormProps) {
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    "use server"

    let prize

    try {
      prize = await createPrize({
        name: values.title,
        color: values.color,
        isPrize: values.isPrize,
        quantity: values.quantity,
        repeat: values.repeat,
        rolleteId: params
      })
      toast.success("Prêmio adicionado com sucesso!")
      
    } catch (error) {
      console.log(error)
      toast.error("Erro ao adicionar prêmio!")
    }

    return prize
  }



  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Digite aqui..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4 items-center">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="isPrize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prêmio</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repeat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetir</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
          <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel>Quantidade:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel>Cor:</FormLabel>
                  <FormControl>
                    <Input placeholder="#FFFFFF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>
        <Button type="submit">Concluir</Button>
        </form>
      </Form>
    </div>
  )
}
