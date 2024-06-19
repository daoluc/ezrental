import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { itemCategories } from '@/data'
import { connectToDB } from '@/lib/mongodb'
import { ItemModel } from '@/schemas/item'
import { connect } from 'http2'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import React from 'react'

const RentCategoryPage = async (
    {params}:{params: {category: string}}
) => {
  const session = await getServerSession(authOptions)
  await connectToDB()

  const items = await ItemModel.aggregate([
    {
      $match: {
        category: params.category
      }
    }, 
    { // numbr of bookings
      $lookup: {
        from: 'users',
        localField: 'hostid',
        foreignField: '_id',
        as: 'host'
      }
    },
    {
      $unwind: '$host'
    },
    {
      $match: { 'host._id': {$ne: new ObjectId(session?.user.id)} }
    },
    {
      $project: {
        name: 1,
        hostName: 1,
        price: 1,
        photos: 1,
      }
    }
  ])

  console.log(items)

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl py-8 font-bold">
        Rent {itemCategories.find(cat => cat.name === params.category)?.dislay}
      </h1>
    </div>
  )
}

export default RentCategoryPage