"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Transactions, TransactionType } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { eq } from "drizzle-orm";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface ColumnsProps {
    fetchData: () => void
}

export function Columns({ fetchData }: ColumnsProps): ColumnDef<TransactionType>[] {
    return [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const data = format(new Date(row.getValue("date")), "d  LLL, yyyy", {
        locale: ptBR,
      });

      return <div className="text-left capitalize">{data}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      const isExpense = amount > 0;

      return (
        <div className="text-left font-medium">
          <span
            className={cn(
              "bg-emerald-500/40 text-emerald-700 py-1 px-2 rounded-full",
              !isExpense && "bg-rose-500/40 text-rose-700"
            )}
          >
            {formatted}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original.id;
      const router = useRouter();

      const onDeleteTransaction = async () => {
        try {
          const transactionId = row.original.id;

          const transaction = await db
            .delete(Transactions)
            .where(eq(Transactions.id, transactionId));
            fetchData()
        } catch (error) {
            console.log("Error", error)
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-rose-400 hover:text-rose-500 focus:text-rose-500 cursor-pointer"
              onClick={onDeleteTransaction}
            >
              <Trash />
              Deletar transação
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
}
