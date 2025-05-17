"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import CurrencyInput from "react-currency-input-field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, LoaderCircle, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { Transactions } from "@/schema";
import { useUser } from "@clerk/nextjs";

const category = [
  "🏠 Moradia",
  "🛒 Alimentação",
  "🚗 Transporte",
  "💡 Serviços e Utilidades",
  "🏥 Saúde",
  "📚 Educação",
  "👨‍👩‍👧‍👦 Despesas com Filhos",
  "👕 Vestuário",
  "💅 Cuidado pessoal",
  "🎉 Lazer e Entretenimento",
  "🧾 Outras Despesas",
];

interface AddNewTransitionProps {
  fetchData: () => void
}

export function AddNewTransition({ fetchData }: AddNewTransitionProps) {
  const { user } = useUser()
  const [name, setName] = useState("");
  const [categoryItem, setCategoryItem] = useState("");
  const [date, setDate] = useState<Date>();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isIncome, setIsIncome] = useState(false);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false) 

  const onReverseValue = () => {
    if (!value) return;

    const newValue = parseFloat(value) * -1;
    setIsIncome(!isIncome);
    setValue(newValue.toString());
  };

  const onCreateTransaction = async () => {
    setLoading(true)
    try {
      const transaction = await db.insert(Transactions)
      .values({
        name: name!,
        category: categoryItem!,
        date: date,
        amount: value,
        createdBy: user?.primaryEmailAddress?.emailAddress!,
        description: description,
        type: isIncome ? "expense" : "income",
      })
      setOpen(false)
      setName("")
      setDescription("")
      setDate(undefined)
      setCategoryItem("")
      setValue("")
      setLoading(false)
      setIsIncome(false)
      toast.success("Criado com sucesso!")
      fetchData()
    } catch (error) {
      console.log("Error", error);
      setLoading(false)
      toast.error("Erro ao criar transação");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Adicionar
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicione transação</SheetTitle>
          <SheetDescription>Adicione uma nova transação</SheetDescription>
        </SheetHeader>
        <div className="mt-3 flex flex-col gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? (
                  format(date, "PPP", { locale: ptBR })
                ) : (
                  <span>Escolha uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          <div>
            <h2 className="my-1 text-sm text-black font-medium">Nome</h2>
            <Input
              placeholder="Eduardo..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <h2 className="my-1 text-sm text-black font-medium">Categoria</h2>
            <Select value={categoryItem} onValueChange={setCategoryItem}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {category.map((item) => (
                    <SelectItem value={item}> {item} </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h2 className="my-1 text-sm text-black font-medium">Valor</h2>
            <div className="flex gap-3 items-center relative">
              <button
                onClick={onReverseValue}
                className={cn(
                  "bg-emerald-500 hover:bg-emerald-500/80 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                  isIncome && "bg-rose-500 hover:bg-rose-500/80"
                )}
              >
                <PlusCircle className="size-3 text-white" />
              </button>
              <CurrencyInput
                prefix="R$"
                placeholder="R$ 0,00"
                decimalSeparator=","
                groupSeparator="."
                value={value}
                onValueChange={(value) => setValue(value!)}
                className="pl-10 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
            <span
              className={cn(
                "text-sm text-emerald-500",
                isIncome && "text-rose-500"
              )}
            >
              {isIncome ? "Valor de saída" : "Valor de entrada"}
            </span>
          </div>
          <div>
            <h2 className="my-1 text-sm text-black font-medium">Descrição</h2>
            <Textarea
              placeholder="Diga mais sobre esta transação..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button disabled={!(name&&date&&value&&categoryItem)} onClick={onCreateTransaction}>
            {loading ? (
                <>
                    <LoaderCircle className="animate-spin" /> 
                    Carregando...
                </>
            ): "Adicionar"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
