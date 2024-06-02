'use client'

import { itemcategory } from '@/app/mylistings/_component/item-category'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Item, ItemStatus } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { it } from 'node:test'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Switch } from "@/components/ui/switch"
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
    status: z.boolean(),
    itemname: z.string().min(4, {
        message: 'Item name must be at least 4 characters.'
    }),
    itemcategory: z.string().min(1, {
        message: 'Item category is required.'
    }),
    itemdescription: z.string().min(4, {
        message: 'Item description must be at least 4 characters.'
    }),
    hourly: z.coerce
        .number({ invalid_type_error: 'Amount must be a number' })
        .positive({ message: 'Amount must be positive' })
        .finite({ message: 'Must be a valid amount' }),
    daily: z.coerce
        .number({ invalid_type_error: 'Amount must be a number' })
        .positive({ message: 'Amount must be positive' })
        .finite({ message: 'Must be a valid amount' }),
    photos: z.array(z.string())
})

type FormInput = z.infer<typeof FormSchema>

const ItemEditForm = ({ item }: { item: Item }) => {
    const form = useForm<FormInput>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            status: item.status === ItemStatus.LISTED,
            itemname: item.name,
            itemcategory: item.category,
            itemdescription: item.description,
            hourly: item.price?.hourly,
            daily: item.price?.daily,
            photos: item.photos,
        }
    })

    async function onSubmit(formInput: FormInput) {
        console.log(formInput)
    }

    console.log(form);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    {/* status */}
                    <div className="bg-slate-100 p-2 rounded-md">
                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem className='flex items-center justify-between font-bold'>
                                    <FormLabel className={`${field.value ? 'text-green-500' : 'text-black'} font-bold`}>
                                        {field.value ? 'Listed' : 'Unlisted'}
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* item name */}
                    <div className="bg-slate-100 p-2 rounded-md">
                        <FormField
                            control={form.control}
                            name='itemname'
                            render={({ field }) => (
                                <FormItem className='flex items-center justify-between font-bold'>
                                    <FormLabel className={`${field.value ? 'text-green-500' : 'text-black'} font-bold`}>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='e.g. Macbook pro'
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ItemEditForm