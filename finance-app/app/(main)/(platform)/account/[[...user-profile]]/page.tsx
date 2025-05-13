import { UserProfile } from '@clerk/nextjs'
import React from 'react'

export default function AccountPage() {
  return (
    <div className='h-full flex items-center justify-center sm:justify-start w-full p-10'>
        <UserProfile />
    </div>
  )
}
