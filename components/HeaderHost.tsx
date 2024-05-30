import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'

const HeaderHost = async () => {

    const session = await getServerSession(authOptions);

    return (
        <header className='fixed w-full z-50'>
            <nav className="bg-primary flex items-center justify-between p-4 lg:px-8">
                {/*logo*/}
                <div className="flex lg:flex-1">
                    <Link href="/">
                        <span className="sr-only">Logo</span>
                        <Image src="/logo.png" alt="Logo" width={40} height={40}
                            className='w-auto h-auto'
                        />
                    </Link>
                </div>

                {/* quick menu */}
                <div className="flex lg:flex-1 space-x-4">
                    <Link href="/bookeditems" className='hidden md:flex md:font-bold'>
                        Booked Items
                    </Link>
                    <Link href="/mylistings" className='hidden md:flex md:font-bold'>
                        My Listings
                    </Link>
                </div>

                <div className="flex items-center">
                    <Link href="/" className={cn(buttonVariants({variant: 'outline'}), "shadow hidden md:flex md:mr-2")}>
                        Switch to guest
                    </Link>
                     {/* drop down menu */}
                     <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex text-slate-500">
                                <Menu />
                                {
                                    session?.user &&
                                    <p>{session.user.name}</p>
                                }
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {
                                session &&
                                <>
                                    <DropdownMenuItem className='md:hidden'>
                                        <Link className='flex md:hidden text-primary font-bold'
                                            href={`${session? '/': 'api/auth/signin'}`}>Switch to guest</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className='md:hidden'/>
                                    <DropdownMenuItem className='md:hidden'>
                                        <Link
                                            href={`${session? '/mylistings': 'api/auth/signin'}`}>My Listings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='md:hidden'>
                                        <Link
                                            href={`${session? '/bookeditems': 'api/auth/signin'}`}>Booked items</Link>
                                    </DropdownMenuItem>
                                </>
                            }
                            <DropdownMenuSeparator className='md:hidden'/>
                            <DropdownMenuItem className='flex text-left py-0'>
                                {session ? <SignOutButton /> : <SignInButton />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='flex text-left py-0'>
                                How it works?
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    )
}

export default HeaderHost