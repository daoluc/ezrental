import { connectToDB } from '@/lib/mongodb'
import { ItemModel } from '@/schemas/item'
import { connect } from 'http2'
import React from 'react'
import ItemEditForm from './_component/item-edit-form'
import Loader from '@/components/Loader'

const ItemEditPage = async ({ params }: { params: { itemid: string } }) => {
    await connectToDB()

    const item = await ItemModel.findById(params.itemid)
    return (
        <div>
            <h1 className='text-2xl sm:text-4xl py-8 font-bold capitalize'>Edit {item?.name}</h1>
            {
                item ? <ItemEditForm item={item} /> : <Loader />
            }
        </div>
    )
}

export default ItemEditPage