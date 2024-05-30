import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React from 'react'
import ListYourItemComponent from './_component/list-your-item-component'

function MyListingsPage() {
  const myListings = []
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
        {myListings.length > 0 ?
          <div>Listings</div>
          :
          <p className="text-xl font-light p-4">No listings</p>
        }
      </div>
    </>
  )
}

export default MyListingsPage