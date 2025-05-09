import { LoaderIcon } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='flex flex-1 justify-center items-center w-full'>
        <LoaderIcon className='animate-spin' />
    </div>
  )
}
