import { UserProfile } from '@clerk/nextjs'
import React from 'react'

export default function AccountPage() {
  return (
    <div className='h-full flex w-full p-10'>
        <UserProfile />
    </div>
  )
}
