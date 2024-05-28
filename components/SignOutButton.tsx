'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <Button onClick={()=> signOut()} className='px-0' variant='ghost'>
        Sign Out
    </Button>
  )
}

export default SignOutButton