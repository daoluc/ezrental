'use client'

import RentStart from '@/app/mylistings/edit/[itemid]/_component/rent-start'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Item } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, addHours, format, formatISO } from 'date-fns'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const FormSchema = z.object({
    rentalStart: z.date({
        required_error: 'Start date is required'
    }),
    durationType: z.enum(['hourly', 'daily'], {
        required_error: 'Duration type is required'
    }),
    days: z.coerce
        .number({ invalid_type_error: 'Days must be a number' })
        .positive({ message: 'Days must be positive' })
        .finite({ message: 'Must be a valid amount' }),
    hours: z.coerce
        .number({ invalid_type_error: 'Hours must be a number' })
        .positive({ message: 'Hours must be positive' })
        .finite({ message: 'Must be a valid amount' }),
})

const RentalForm = ({
    itemProps, bookedDates
}: {
    itemProps: string,
    bookedDates: string
}) => {
    const user = useSession()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            rentalStart: new Date(),
            durationType: 'daily',
            days: 1,
            hours: 1,
        }
    })

    const [rentDetails, setRentDetails] = React.useState<{
        duration: string,
        price: number,
        unit: string,
        cost: number,
        end: Date,
    }>({
        duration: '',
        price: 0,
        unit: '',
        cost: 0,
        end: form.getValues('rentalStart')
    })

    useEffect(() => {
        const item = JSON.parse(itemProps) as Item

        const start = form.getValues('rentalStart')
        const type = form.getValues('durationType')
        const days = form.getValues('days')
        const forHours = form.getValues('hours') > 0 ? form.getValues('hours') : 1
        const price = type === 'hourly' ? item.price.hourly : item.price.daily

        if (start && type) {
            if (type === 'daily') {
                setRentDetails({
                    duration: `${days} days`,
                    price: price,
                    unit: type,
                    cost: price * days,
                    end: addDays(start, Number.parseInt(days.toString()) || 1)
                })
            } else if (type === 'hourly') {
                setRentDetails({
                    duration: `${forHours} hours`,
                    price: price,
                    unit: type,
                    cost: price * forHours,
                    end: addHours(start, Number.parseInt(forHours.toString()) || 1)
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('rentalStart'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('durationType'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('days'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form.watch('hours'),
    ])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const item = JSON.parse(itemProps) as Item
        const formData = new FormData()
        formData.set('amount', `${rentDetails.price}`)
        formData.set('item', `${item.name.toUpperCase()}`)
        formData.set('itemid', item._id)
        formData.set('guestid', user.data?.user.id as string)
        formData.set('rentstart', formatISO(data.rentalStart))
        formData.set('rentend', formatISO(rentDetails.end))
        formData.set('durationType', data.durationType)
        formData.set('duration',
            data.durationType === 'hourly' ? data.hours.toString() : data.days.toString()
        )

        // call stripe checkout action
    }

    return (
        <Form {...form}>
            {/* summary */}
            {
                rentDetails.price > 0 &&
                <div className='bg-slate-100 p-4 rounded-sm'>
                    <p className='text-xl font-bold pb-2'>Summary</p>
                    <p className='text-xl'>
                        {`$ ${rentDetails.price}`}
                        {`/${rentDetails.unit}`}
                        {" x "}
                        {rentDetails.duration}{" = "}
                        <span className='font-bold'>{`$${rentDetails.cost}`}</span>
                    </p>
                </div>
            }

            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name="durationType"
                    render={({ field }) => (
                        <FormItem className='space-y-2 bg-slate-100 p-4 rounded-sm'>
                            <FormLabel>I would like to rent</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='flex flex-col space-y-1'
                                >
                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='hourly'></RadioGroupItem>
                                        </FormControl>
                                        <FormLabel className='font-normal'>Hourly</FormLabel>
                                    </FormItem>

                                    <FormItem className='flex items-center space-x-3 space-y-0'>
                                        <FormControl>
                                            <RadioGroupItem value='daily'></RadioGroupItem>
                                        </FormControl>
                                        <FormLabel className='font-normal'>Daily</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* rental start */}
                <RentStart form={form} bookedDays={[]}/>
                {
                    rentDetails.unit &&
                    <p className='bg-slate-100 p-4 rounded-sm font-bold'>
                        {`Returning on: ${format(rentDetails.end, 'PPP')}`}
                    </p>
                }

                {/* hourly */}
                {
                    form.getValues('durationType') === 'hourly' &&
                    <FormField
                        control={form.control}
                        name='hours'
                        render={({ field }) => (
                            <FormItem className='bg-slate-100 p-4 rounded-sm'>
                                <FormLabel>
                                    Hours renting for 
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='e.g. 4' {...field} />
                                </FormControl>
                                <FormDescription>Min of 1 hour</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }

                {/* daily */}
                {
                    form.getValues('durationType') === 'daily' &&
                    <FormField
                        control={form.control}
                        name='days'
                        render={({ field }) => (
                            <FormItem className='bg-slate-100 p-4 rounded-sm'>
                                <FormLabel>
                                    Days renting for 
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='e.g. 4' {...field} />
                                </FormControl>
                                <FormDescription>Min of 1 day</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }

                <Button className='w-full' type='submit'>Process to Payment</Button>
            </form>

        </Form>
    )
}

export default RentalForm