"use client";
import { db } from "@/lib/db";
import { AddNewTransition } from "./_components/AddNewTransition";
import { Transactions, TransactionType } from "@/schema";
import { and, desc, eq, getTableColumns, gte, lte } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import TransactionTable from "./_components/TransactionTable";
import { Columns } from "./_components/Columns";
import { useSearchParams } from "next/navigation";
import DateFilter from "../dashboard/_components/DateFilter";
import { subDays } from "date-fns";

export default async function ExpensePage() {
  const { user } = useUser();
  const [transactionList, setTransactionsList] = useState<TransactionType[]>(
    []
  );
  const searchParams = useSearchParams();
  const dateTo = searchParams.get("to");
  const dateFrom = searchParams.get("from");

  const getTransactionList = async () => {
    const dateStart = dateFrom ? new Date(dateFrom) : subDays(new Date(), 30)
    const dateEnd = dateTo ? new Date(dateTo) : new Date()

    const transactions = await db
      .select({ ...getTableColumns(Transactions) })
      .from(Transactions)
      .where(
        and(
          eq(Transactions.createdBy, user?.primaryEmailAddress?.emailAddress!),
          gte(Transactions.date, dateStart),
          lte(Transactions.date, dateEnd)
        )
      )
      .orderBy(desc(Transactions.date));

    setTransactionsList(transactions);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTransactionList();
      } catch (error) {
        console.log("Error", error);
      } finally {
      }
    };

    fetchData();
  }, [user, searchParams]);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-slate-900">Nova Fonte</h2>
        <div className="flex items-center gap-2">
          <DateFilter />
          <AddNewTransition fetchData={getTransactionList} />
        </div>
      </div>
      <div className="mt-6">
        <TransactionTable
          columns={Columns({ fetchData: getTransactionList })}
          transactions={transactionList}
        />
      </div>
    </div>
  );
}
