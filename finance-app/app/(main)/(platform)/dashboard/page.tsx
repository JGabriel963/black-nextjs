"use client";
import { db } from "@/lib/db";
import { Budgets, BudgetType, Entries, EntrieType } from "@/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { BarChartDahsboard } from "./_components/BarChart";
import BudgetItemDahsboard from "./_components/BudgetItemDahsboard";
import EntriesList from "../fontes/[id]/_components/EntriesList";
import DateFilter from "./_components/DateFilter";

export interface BudgetItem extends BudgetType {
  totalSpend: number;
  totalItem: number;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [totalSpend, setTotalSpend] = useState(0);
  const [budgetList, setBudgetList] = useState<BudgetItem[]>([]);
  const [entriesList, setEntriesList] = useState<EntrieType[]>([]);

  const getBudgetItem = async () => {
    const gudget = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Entries.amount}::numeric)`.mapWith(Number),
        totalItem: sql`count(${Entries.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Entries, eq(Budgets.id, Entries.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!))
      .groupBy(Budgets.id);

    let totalSpend = 0;

    gudget.forEach((item) => {
      totalSpend += Number(item.totalSpend);
    });

    setTotalSpend(totalSpend);
    setBudgetList(gudget);
    getEntriesList()
  };

  const getEntriesList = async () => {
      const entries = await db.select({
        ...getTableColumns(Entries)
      }).from(Entries)
      .where(eq(Entries.createdBy, user?.primaryEmailAddress?.emailAddress!))
      .groupBy(Entries.id)
      
      setEntriesList(entries)
      
    }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getBudgetItem();
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.primaryEmailAddress?.emailAddress) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="p-4 sm:p-8">
      <h2 className="font-bold text-3xl">Olá, {user?.fullName}</h2>
      <p className="text-gray-500">
        Aqui está o que você está gerando de resultados ✌️
      </p>
      <div className="mt-4">
        <DateFilter />
      </div>

      <div className="w-full border rounded-lg h-[150px] mt-4 flex items-center justify-between px-5 py-10">
        <div className="flex flex-col">
          <h2 className="font-medium">Total</h2>
          <p className="text-xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalSpend)}
          </p>
        </div>
        <Coins className="size-10 p-2 bg-primary text-white rounded-full" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChartDahsboard data={budgetList} />
          
          <div className="mt-7">
            <h2 className="font-bold">Entradas</h2>
            <EntriesList entries={entriesList} refreshData={getBudgetItem} />
          </div>
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Últimas transições</h2>
          {budgetList.map((budget, index) => (
            <BudgetItemDahsboard key={index} data={budget} />
          ))}
        </div>
      </div>
    </div>
  );
}
