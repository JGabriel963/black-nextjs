"use client";

import { Bug, LoaderCircle, Pencil, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { BudgetType, Budgets } from "@/schema";
import { toast } from "sonner";
import EmojiPicker  from "emoji-picker-react";
import { eq } from "drizzle-orm";

interface EditBudgetProps {
  data: BudgetType | null;
  refreshData: () => void
}

export default function EditBudget({ data, refreshData }: EditBudgetProps) {
  const [emoji, setEmoji] = useState(data?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false)

  const onUpdateBudget = async () => {
    setLoading(true)
    try {
        const result = await db.update(Budgets)
        .set({ name, amount, icon: emoji })
        .where(eq(Budgets.id, data?.id!))
        .returning()

        toast.success("Atualizado com sucesso!")
        setLoading(false)
        refreshData()
    } catch (error) {
      console.log("Error", error)
      setLoading(false)
      toast.error("Erro ao tentar atualizar!")
    }
  };

  useEffect(() => {
    setEmoji(data?.icon);
    setName(data?.name!);
    setAmount(data?.amount!)
    
  }, [data])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} >
            <Pencil /> <p className="hidden sm:block">Editar</p>
          </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Nova Fonte</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            <div className="flex flex-col items-start mt-5">
              <Button variant="outline" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emoji}</Button>
            </div>
            <div className="absolute z-40">
              <EmojiPicker 
                open={openEmojiPicker}
                onEmojiClick={(emoji) => {
                  setEmoji(emoji.emoji);
                  setOpenEmojiPicker(false);
                }}
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="font-bold my-2">Nome</h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Cortes de cabelo"
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="font-bold my-2">Meta</h2>
              <Input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100,00"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <Button disabled={!(name&&amount)} onClick={onUpdateBudget}>{loading ? (
                <>
                    <LoaderCircle className="animate-spin" /> 
                    Carregando...
                </>
            ): "Concluir"}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
