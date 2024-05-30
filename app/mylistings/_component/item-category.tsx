'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'


export const itemcategory = [
    {
        dislay: 'Camera gear',
        name: 'camera-gear'
    },
    {
        dislay: 'Power tools',
        name: 'power-tools'
    },
    {
        dislay: 'House tools',
        name: 'house-tools'
    },
]
const FormSchema = z.object({
    itemcategory: z.string().min(1, {
        message: 'Item category is required'
    }),
})

type ItemCategoryInput = z.infer<typeof FormSchema>

function ItemCategory({
    onNext,
    onPrev,
}: {
    onNext: () => void,
    onPrev: () => void,
}) {
    const form = useForm<ItemCategoryInput>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            itemcategory: '',
        }
    })

    function onSubmit(data: ItemCategoryInput) {
        onNext()
    }

    return (
        <div className="grid w-full gap-1.5">
            <h2 className='text-xl sm:text-2xl py-4 font-semibold'>Item name</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='itemcategory'
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange}>
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
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between items-center py-4'>
                        <Button type='button' variant='ghost' onClick={onPrev}>Prev</Button>
                        <Button type='submit' variant='ghost'>Next</Button>
                    </div>
                </form>
            </Form>
        </div >
    )
}

export default ItemCategory