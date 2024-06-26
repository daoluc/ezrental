'use client'

import { Item, ItemStatus } from '@/types'
import React, { Key, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'

const SingleListing = ({ listings }: { listings: Item[] }) => {

    const [itemToAction, setItemToAction] = useState<Item | null>(null)
    const [dialog, setDialog] = useState(false)
    const router = useRouter()

    const handleItemRemove = (item: Item) => {
        setItemToAction(item)
        setDialog(true)
    }

    const handleConfirm = async () => {
        const result = await fetch(`api/item/${itemToAction?._id}`, {
            method: 'DELETE'
        })

        if (result.ok) {
            toast.success('Item removed')
            setDialog(false)
            router.refresh()
        }
    }

    return (
        <>
            {
                listings.map((item) => (
                    <div key={item._id as Key} className='flex gap-4 py-1 pb-1 shadow-md'>

                        {/* photo */}
                        <div>
                            {
                                item.photos.length > 0 ?
                                <Image className='rounded-md' width={100} height={100}
                                alt={item.name} src={`${item.photos.at(0)}`} />
                                : 
                                <ImageIcon width={100} height={100} className='text-slate-100 w-32 h-32'/>
                            }
                        </div>

                        <div className="flex flex-col justify-center space-y-1">
                            <p className="text-2xl sm:text-xl font-bold capitalize">{item.name}</p>
                            <Badge className={`${item.status === ItemStatus.LISTED ? 'bg-green-500' : 'bg-red-500'} text-white uppercase flex justify-center w-24`}>
                                {item.status}
                            </Badge>

                            <div className='flex gap-4'>
                                <Link href={`mylistings/edit/${item._id}`}
                                    className={cn(buttonVariants({ variant: 'ghost' }), 'text-blue-500 px-1')}>
                                    Edit
                                </Link>
                                <Button variant="link" onClick={() => handleItemRemove(item)}
                                    className={cn(buttonVariants({ variant: 'ghost' }), 'text-red-500 px-1')}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <AlertDialog open={dialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanetly remove the item from your listing.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialog(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleConfirm()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default SingleListing