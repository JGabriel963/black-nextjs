import { Options } from '@prisma/client'
import React from 'react'


interface ItemsPrizeProps {
  prizer: Options
}

export default function ItemsPrize({ prizer }: ItemsPrizeProps) {
  return (
    <div>
      {prizer.name}
    </div>
  )
}
