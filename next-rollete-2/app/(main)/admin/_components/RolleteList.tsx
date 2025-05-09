import { Rollete } from '@prisma/client'
import { div } from 'motion/react-client'
import React from 'react'
import RolleteItem from './RolleteItem'

interface RolleteListProps {
    data: Rollete[]
}

export default function RolleteList({ data }: RolleteListProps) {
  return (
    <div className='mt-2 w-full max-w-4xl px-4 gap-3 grid grid-cols-1 sm:grid-cols-3 md:grid-flow-col-4 '>
        {data.map((item, index) => (
            <RolleteItem key={index} rollete={item} />
        ))}
    </div>
  )
}
