import { div } from 'motion/react-client'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
   <div className='h-screen flex flex-col w-full'>
    {children}
   </div>
  )
}
