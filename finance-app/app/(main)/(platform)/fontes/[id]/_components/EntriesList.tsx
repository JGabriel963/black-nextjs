import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/lib/db"
import { Entries, EntrieType } from "@/schema"
import { format } from 'date-fns'
import { eq } from "drizzle-orm"
import { LoaderCircle, Trash } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface EntriesListProps {
  refreshData: () => void
  entries: EntrieType[]
}

export default function EntriesList({ entries, refreshData }: EntriesListProps) {
  const [loading, setLoading] = useState(false)
  const onDeleteEntrie = async (entrie: EntrieType) => {
    setLoading(true)
    try {
      const result = await db.delete(Entries)
      .where(eq(Entries.id, entrie.id))
      .returning();

      refreshData()
      toast.success("Entrada excluida!")
      setLoading(false)
    } catch (error) {
      console.log("Error", error);
      toast.error("Erro ao tentar excluir")
      setLoading(false)
    }


  }

  return (
    <Table>
      <TableCaption className="hidden">Um lista de entradas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entrie, key) => (
          <TableRow key={key}>
            <TableCell> {entrie.name} </TableCell>
            <TableCell> {entrie.amount} </TableCell>
            <TableCell> {format(entrie.createdAt!, "MM/dd/yyyy")} </TableCell>
            <TableCell> {loading ? <LoaderCircle className="text-red-600 cursor-pointer animate-spin" /> : <Trash className="text-red-600 cursor-pointer" onClick={() => onDeleteEntrie(entrie)}/>}  </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
