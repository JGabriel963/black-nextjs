"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { LoaderCircle, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import createRollete from "@/app/actions/create-rollete";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campo não pode ser vazio!",
  }),
  description: z.string().optional(),
});

export default function AddButton() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
        const rollete = await createRollete({
            title: values.name,
            description: values.description
        })

        setLoading(false)
        setOpen(false)
        router.refresh()
        toast.success("Roleta criada com sucesso!")
    } catch (error) {
        console.log("Error: ", error)
        setLoading(false)
        toast.error("Erro ao criar roleta!")
    }
  }

  return (
    <>
          <button onClick={() => setOpen(!open)} className="flex items-center justify-center gap-3 border-dashed border-gray-1 bg-gray-100 w-full max-w-sm h-16 shadow rounded-md px-4 border-4 hover:bg-gray-200/60">
            <PlusIcon className="text-gray-400" />
            <span className="font-semibold text-gray-400">Adicionar</span>
          </button>

      <Dialog open={open} onOpenChange={setOpen}>
       
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Roleta</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título *</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite aqui..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {loading ? <LoaderCircle className="animate-spin" /> : "Criar"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
