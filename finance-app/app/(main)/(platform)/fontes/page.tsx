import React from 'react'
import BudgetsList from './_components/BudgetsList'

export default function BudgetsPage() {
  return (
    <div className='flex flex-1 flex-col p-4 sm:p-8'>
        <h2 className='text-2xl font-bold text-slate-900'>
            Nova Fonte
        </h2>
        <p className='text-slate-500'>
            Insira os dados do seus fontes
        </p>

        <BudgetsList />

    </div>
  )
}
