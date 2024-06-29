import { connectToDB } from '@/lib/mongodb'
import { ItemModel } from '@/schemas/item'
import { UserModel } from '@/schemas/user'
import { Item, ItemStatus, User } from '@/types'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import RentalForm from './_component/rental-form'


const RentItemPage = async ({
  params
}: { params: { itemid: string } }) => {
  await connectToDB()

  const item = await ItemModel.findById<Item>(params.itemid)
    .populate({ path: 'hostid', model: UserModel })
  return (
    <div className='flex flex-col justify-center item-center'>
      {/* images */}
      <Carousel className='w-full max-w-sm sm:max-w-xl'>
        <CarouselContent>
          {
            item?.photos.map(photo => {
              return (
                <CarouselItem key={photo}>
                  <Image
                    width={600}
                    height={400}
                    src={photo}
                    alt='item photo'
                  />
                </CarouselItem>
              );
            })
          }
        </CarouselContent>

      </Carousel>

      <div className='w-full justify-between flex flex-col sm:flex-row'>
        <div className="space-y-8 sm:space-y-4">
          <h1 className='text-2xl sm:text-4xl capitalize py-8 font-bold'>{item?.name}</h1>
          <div className="flex">Hosted by: {" "}
            <p className='capitalize font-bold ml-2'>
              {((item?.hostid as unknown) as User).name}
            </p>
          </div>

          <div className='flex flex-col space-y-2'>
            <p className='font-bold'>Description</p>
            <p>PLEASE READ THE ENTIRE DESCRIPTION</p>
            <p>{item?.description}</p>
          </div>
        </div>

        <div className="items-start space-y-4 pt-8">
          <p className='font-bold'>Rent details</p>
          <RentalForm itemProps={JSON.stringify(item)} bookedDates=''/>
        </div>

      </div>
    </div>

  )
}

export default RentItemPage