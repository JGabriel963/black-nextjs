import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { BudgetType, Budgets } from "@/schema";
import { eq } from "drizzle-orm";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteBudgetProps {
  data: BudgetType | null;
}

export function DeleteBudgetButton({ data }: DeleteBudgetProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onDeleteBudget = async () => {
        setLoading(true)
        try {
            const result = await db.delete(Budgets).where(eq(Budgets.id, data?.id!))
            toast.success("Excluido com sucesso!")
            router.back()
            setLoading(false)
        } catch (error) {
            console.log("Error", error)
            toast.error("Erro ao tentar excluir!")
            setLoading(false)
        }
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash2 /> <p className="hidden sm:block">Deletar</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente esses
            dados de sua conta e dos dados de nossos servidores
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteBudget}>
            {loading ? (
                <>
                    <LoaderCircle className="animate-spin" /> 
                    Carregando...
                </>
            ): "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
