import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Entries } from "@/schema";
import { useUser } from "@clerk/nextjs";
import { addDays, format } from "date-fns";
import { da, ptBR } from "date-fns/locale";
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
    const [date, setDate] = useState<Date>()

    const onCreateEntries = async () => {
        setLoading(true)
        try {
            const result = await db.insert(Entries).values({
                name: name,
                amount: amount,
                budgetId: Number(budgetId),
                createdBy: user?.primaryEmailAddress?.emailAddress!,
                createdAt: addDays(date!, 1)
            })
            .returning()
            toast.success("Entrada adicionada!")
            setName("");
            setAmount("")
            refreshData()
            setDate(undefined)
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
            <h2 className="text-black font-medium my-1">Data</h2>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal text-black text-base px-3 md:text-sm",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
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
