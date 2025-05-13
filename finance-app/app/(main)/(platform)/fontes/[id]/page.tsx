"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { CornerDownLeft, CornerUpLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditBudget from "./_components/EditBudget";
import { db } from "@/lib/db";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { BudgetType, Budgets, EntrieType, Entries } from "@/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../_components/BudgetItem";
import BudgetInfo from "./_components/BudgetInfo";
import { DeleteBudgetButton } from "./_components/DeleteBudgetButton";
import AddEntrieForm from "./_components/AddEntrieForm";
import EntriesList from "./_components/EntriesList";

interface SourcePageProps {
  params: {
    id: string;
  };
}

export interface BudgetItem extends BudgetType {
  totalSpend: number
  totalItem: number
}


export default function SourcePage({ params }: SourcePageProps) {
  const router = useRouter()
  const { user } = useUser()
  const [budgetItem, setBudgtedItem] = useState<BudgetItem | null>(null)
  const [entriesList, setEntriesList] = useState<EntrieType[]>([])

  const getBudgetItem = async () => {
    const gudget = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Entries.amount}::numeric)`.mapWith(Number),
      totalItem: sql`count(${Entries.id})`.mapWith(Number)
    })
    .from(Budgets)
    .leftJoin(Entries, eq(Budgets.id,Entries.budgetId))
    .where(and(
      eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!),
      eq(Budgets.id, Number(params.id))
    ))
    .groupBy(Budgets.id)

    console.log(gudget)
    
    setBudgtedItem(gudget[0]);
    getEntriesList()
 
  }

  const getEntriesList = async () => {
    const entries = await db.select({
      ...getTableColumns(Entries)
    }).from(Entries)
    .where(eq(Entries.budgetId, Number(params.id)))
    .orderBy(desc(Entries.id))

    setEntriesList(entries);
  }

  useEffect(() => {
    getBudgetItem()
  }, [user])

  return (
    <div className="p-4 sm:p-8 h-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4 items-center">
          <CornerDownLeft className="cursor-pointer text-slate-900 hover:text-slate-900/80" onClick={() => router.back()} />
          <h2 className="text-2xl font-bold text-slate-900">Minhas receitas</h2>
        </div>
        <div className="flex gap-4 items-center">
          <EditBudget data={budgetItem} refreshData={getBudgetItem} />
          <DeleteBudgetButton data={budgetItem}/>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between gap-4 mt-4">
        {budgetItem && <BudgetInfo data={budgetItem} />}
        <AddEntrieForm refreshData={getBudgetItem} budgetId={params.id} />
      </div>
      <div className="mt-7">
        <h2 className="font-bold">Entradas</h2>
        <EntriesList entries={entriesList} refreshData={getBudgetItem} />
      </div>
    </div>
  );
}
