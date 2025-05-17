"use client"
import { db } from "@/lib/db";
import { AddNewTransition } from "./_components/AddNewTransition";
import { Transactions, TransactionType } from "@/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import TransactionTable from "./_components/TransactionTable";
import { Columns } from "./_components/Columns";

export default async function ExpensePage() {
  const { user } = useUser()
  const [transactionList, setTransactionsList] = useState<TransactionType[]>([])

  const getTransactionList = async () => {
    const transactions = await db.select({...getTableColumns(Transactions)}).from(Transactions).where(eq(Transactions.createdBy, user?.primaryEmailAddress?.emailAddress!))
    .orderBy(desc(Transactions.date))

    setTransactionsList(transactions)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTransactionList();
      } catch (error) {
        console.log("Error", error)
      } finally {}
    }

    fetchData()
  }, [user])

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-slate-900">Nova Fonte</h2>
        <AddNewTransition fetchData={getTransactionList} />
      </div>
      <div className="mt-6">
        <TransactionTable columns={Columns({ fetchData: getTransactionList })} transactions={transactionList} />
      </div>
    </div>
  );
}
