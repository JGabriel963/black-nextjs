import React from 'react'
import AddButton from './_components/AddButton'
import prisma from '@/lib/db'
import RolleteList from './_components/RolleteList'

export default async function AdminPage() {
    
    const rolleteList = await prisma.rollete.findMany()

  return (
   <div className='h-full flex flex-col justify-center items-center px-4'>
        <AddButton />
        <RolleteList data={rolleteList} />
   </div>
  )
}
