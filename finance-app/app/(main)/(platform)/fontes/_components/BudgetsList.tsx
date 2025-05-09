"use client"

import React, { useEffect, useState } from 'react'
import CreateNewBudget from './CreateNewBudget'
import { db } from '@/lib/db'
import { Budget, Budgets } from '@/schema'
import { eq, getTableColumns } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
import { Skeleton } from '@/components/ui/skeleton'

export default function BudgetsList() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true)
  const [budgerList, setBudgerList] = useState<Budget[]>([])

  useEffect(() => {
    getBudgerList()
    setLoading(false)
  }, [user])


  const getBudgerList = async () => {
    const budgets = await db.select({
      ...getTableColumns(Budgets)
    }).from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!))

    setBudgerList(budgets)

  }

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CreateNewBudget refreshList={() => getBudgerList()} /> 
          {!loading ? budgerList.map((buget, index) => (
          <BudgetItem data={buget} key={index} />
        )) : 
          [1,2.3,4,5].map((item, index) => (
            <Skeleton className='w-full rounded-lg h-[150px] bg-slate-200' />
          ))
        }  

        </div>
    </div>
  )
}
