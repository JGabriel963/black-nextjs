import { Budget } from '@/schema'
import Link from 'next/link'
import React from 'react'

interface BudgetItemProps {
    data: Budget
}

export default function BudgetItem({ data }: BudgetItemProps) {
  return (
    <Link href={`/fontes/${data.id}`}>
        <div className='px-5 py-10 border rounded-lg hover:shadow-md cursor-pointer'>
        <div className='flex gap-2 items-center'>
            <div className='flex gap-2 items-center'>
                <h2 className='text-2xl p-3 bg-slate-100 rounded-full'>
                    {data.icon}
                </h2>
                <div>
                    <h2 className='font-bold'> {data.name} </h2>
                    <p className='text-slate-500 text-sm'> {data.amount} </p>
                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}
