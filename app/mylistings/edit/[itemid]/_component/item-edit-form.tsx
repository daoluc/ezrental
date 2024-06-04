'use client'

import { itemcategory } from '@/app/mylistings/_component/item-category'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Item, ItemStatus } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Switch } from "@/components/ui/switch"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

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
    const router = useRouter()
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
        const data = {
            ...formInput,
        }

        const result = await fetch(`/api/item/${item._id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        if (result.ok) {
            toast.success('Item updated successfully')
            router.refresh()
        } else {
            console.log(result)
            toast.error('Failed to update item')
        }
    }

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
                                            onCheckedChange={field.onChange}
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
                                <FormItem>
                                    <FormLabel className={`${field.value ? 'text-green-500' : 'text-black'} font-bold`}>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='e.g. Macbook pro'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* item description */}
                    <div className="bg-slate-100 p-2 rounded-md">
                        <FormField
                            control={form.control}
                            name='itemdescription'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`${field.value ? 'text-green-500' : 'text-black'} font-bold`}>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea {...field}
                                            maxLength={200}
                                            placeholder='Provide detail description and any rules' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* item category */}
                    <div className="bg-slate-100 p-2 rounded-md">
                        <FormField
                            control={form.control}
                            name='itemcategory'
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}
                                        defaultValue={item.category}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="select an item category">{field.value}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                itemcategory.map(cat => (
                                                    <SelectItem key={cat.name} value={cat.name}>{cat.dislay}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* item pricing */}
                    <div className="bg-slate-100 p-2 rounded-md">
                    <FormField
                        control={form.control}
                        name='hourly'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hourly rate</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    placeholder='e.g. 30'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='daily'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Daily rate</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    placeholder='e.g. 30'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>

                    {/* submit */}
                    <div className="py-4">
                        <Button disabled={!form.formState.isDirty}
                        type='submit'
                        className='w-full'>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ItemEditForm