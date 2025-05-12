"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { CornerDownLeft, CornerUpLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditBudget from "./_components/EditBudget";
import { db } from "@/lib/db";
import { and, eq, getTableColumns } from "drizzle-orm";
import { Budget, Budgets } from "@/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../_components/BudgetItem";
import BudgetInfo from "./_components/BudgetInfo";
import { DeleteBudgetButton } from "./_components/DeleteBudgetButton";

interface SourcePageProps {
  params: {
    id: string;
  };
}

export default function SourcePage({ params }: SourcePageProps) {
  const router = useRouter()
  const { user } = useUser()
  const [budgetItem, setBudgtedItem] = useState<Budget | null>(null)

  const getBudgetItem = async () => {
    const gudget = await db.select({
      ...getTableColumns(Budgets)
    })
    .from(Budgets)
    .where(and(
      eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!),
      eq(Budgets.id, Number(params.id))
    ))
    .groupBy(Budgets.id)
    
    setBudgtedItem(gudget[0])
 
  }

  useEffect(() => {
    getBudgetItem()
  }, [user])

  return (
    <div className="p-10 h-full">
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

      <div className="w-full flex justify-between gap-4 mt-4">
        {budgetItem && <BudgetInfo data={budgetItem} />}
      </div>
    </div>
  );
}
