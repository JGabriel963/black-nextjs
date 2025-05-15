import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { Entries } from "@/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useState } from "react"
import { toast } from "sonner";

interface AddEntrieFormProps {
    budgetId: string
    refreshData: () => void
}


export default function AddEntrieForm({ refreshData, budgetId }: AddEntrieFormProps) {
    const { user } = useUser()
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false)

    const onCreateEntries = async () => {
        setLoading(true)
        try {
            const result = await db.insert(Entries).values({
                name: name,
                amount: amount,
                budgetId: Number(budgetId),
                createdBy: user?.primaryEmailAddress?.emailAddress!
            })
            .returning()
            toast.success("Entrada adicionada!")
            setName("");
            setAmount("")
            refreshData()
            setLoading(false)
        } catch (error) {
            console.log("Error", error)
            setLoading(false);
            toast.error("Erro ao tentar criar")
        } 
    }

  return (
    <div className='border p-5 rounded-lg w-full'>
        <h2 className='font-bold text-lg'>
            Adicionar Entrada
        </h2>
        <div className="mt-2">
            <h2 className="text-black font-medium my-1">Nome</h2>
            <Input 
                placeholder="Ex.: John"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="mt-2">
            <h2 className="text-black font-medium my-1">Valor</h2>
            <Input
                type="number" 
                placeholder="R$ 500"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
            />
        </div>
        <Button disabled={!(name&&amount)} className="mt-3 w-full" onClick={onCreateEntries}>
            {loading ? (
                <>
                    <LoaderCircle className="animate-spin" /> 
                    Carregando...
                </>
            ): "Adicionar"}
        </Button>
    </div>
  )
}
