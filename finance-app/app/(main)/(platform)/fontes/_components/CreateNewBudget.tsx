"use client";

import { Plus } from "lucide-react";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Budgets } from "@/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import EmojiPicker  from "emoji-picker-react";
import { useRouter } from "next/navigation";

interface CreateNewBudgetProps {
  refreshList: () => void;
}

export default function CreateNewBudget({ refreshList }: CreateNewBudgetProps) {
  const [emoji, setEmoji] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const onCreateBudget = async () => {
    try {
      const budget = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: amount,
          icon: emoji,
          createdBy: user?.primaryEmailAddress?.emailAddress!,
        })
        .returning({ name: Budgets.name });
      toast.success("Lançamento criado com sucesso!");
      setName("");
      setAmount("");
      refreshList();
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Erro ao criar lançamento. Tente novamente.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed p-10 bg-slate-100 hover:shadow-md cursor-pointer font-semibold text-slate-600">
          <Plus />
          Nova Fonte
        </div>
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
                onChange={(e) => setName(e.target.value)}
                placeholder="Cortes de cabelo"
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="font-bold my-2">Valor</h2>
              <Input
                type="number"
                min={0}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100,00"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <Button disabled={!(name&&amount)} onClick={onCreateBudget}>Concluir</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
