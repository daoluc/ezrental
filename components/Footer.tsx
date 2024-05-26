import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className="bg-gray-200 pt-4 mt-8">
        <div className="mx-auto py-16 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center sm:gap-x-32">
                <div className="mb-4">
                    <Image alt='logo' src='/logo.png' width={40} height={40} />
                    <div className="flex flex-col gap-1 py-4">
                        <Link className='text-sm' href='/about'>About</Link>
                        <Link className='text-sm' href='/about'>Tools</Link>
                        <Link className='text-sm' href='/about'>Policies</Link>
                    </div>
                    <Link href='https://daoluc.com' className='text-sm'>&copy;2024 EZ Rental</Link>
                </div>
                <div className="mb-4">
                    <p className="font-bold">Renting</p>
                    <div className="flex flex-col gap-1 py-4">
                        <Link className='text-sm' href='/about'>Listing your item</Link>
                        <Link className='text-sm' href='/about'>Tools</Link>
                        <Link className='text-sm' href='/about'>Insurance &amp; Protection</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
