import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React from 'react'
import ListYourItemComponent from './_component/list-your-item-component'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { ItemModel } from '@/schemas/item'
import SingleListing from './_component/single-listing'

async function MyListingsPage() {
  const session = await getServerSession(authOptions)

  const myListings = await ItemModel.find({ hostid: session?.user.id })

  return (
    <>
      <h1 className="text-2xl sm:text-4xl py-8 font-bold">
        {myListings.length} Listings
      </h1>

      {/* dialog for adding items */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline"><Plus className='mr-2 h-5 w-5 font-bold' />Add item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new listing</DialogTitle>
          </DialogHeader>
          <ListYourItemComponent />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-8">
        {
          myListings.length > 0 ?
            <SingleListing listings={myListings} />          
            :
            <p className='text-xl font-light p-4'></p>
        }
      </div>
    </>
  )
}

export default MyListingsPage