
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'

const Header = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
    console.log("I am here 234234");
    return (
        <header className='fixed w-full z-50'>
            <nav className="bg-primary flex item-center justify-between p-4 lg:px-8">
                {/*logo*/}
                <div className="flex lg:flex-1">
                    <Link href="/">
                        <span className="sr-only">Logo</span>
                        <Image src="/logo.png" alt="Logo" width={40} height={40}
                            className='w-auto h-auto'
                        />
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link href="#"
                        className={cn(buttonVariants({ variant: 'outline' }), "shadow hidden md:flex md:mr-2")}>
                        Switch to host
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
                                        <Link className='flex md:hidden'
                                            href="{`$(session ? '/my-listings': 'api/auth/signin')`}">Switch to host</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='font-bold'>
                                        <Link
                                            href="{`$(session ? '/my-rented-items': 'api/auth/signin')`}">Rented items</Link>
                                    </DropdownMenuItem>
                                </>
                            }
                            <DropdownMenuSeparator />
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

export default Header