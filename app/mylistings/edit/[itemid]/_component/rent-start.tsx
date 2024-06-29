import { FormSchema } from '@/app/rent/item/[itemid]/_component/rental-form'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import * as z from 'zod'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Span } from 'next/dist/trace'
import { format, setDayOfYear, sub } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'


const RentStart = ({
    form, bookedDays
}: {
    form: UseFormReturn<z.infer<typeof FormSchema>>,
    bookedDays: string[]
}) => {
    const [footerMessage, setFooterMessage] = React.useState<string | null>(null)

    return (
        <FormField
            control={form.control}
            name='rentalStart'
            render={({ field }) => (
                <FormItem className='flex flex-col bg-slate-100 p-4 rounded-sm'>
                    <FormLabel>Rent start</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button variant='outline'>
                                    {
                                        field.value ? format(field.value, "PPP")
                                            : <span>Pick a date</span>
                                    }
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={(day, _, modifier) => {
                                    if (modifier.booked) {
                                        setFooterMessage('This day is already booked')
                                    } else {
                                        setFooterMessage(format(day as Date, 'PPP'))
                                        field.onChange(day)
                                    }
                                }}
                                modifiersStyles={{booked: {
                                    color: 'lightgray',
                                    disabled: true
                                }}}
                                modifiers={{
                                    booked: bookedDays.map(d => new Date(d))
                                }}
                                disabled={(date: Date) => date < sub(new Date(), { days: 1 })}
                                footer={footerMessage &&
                                    <p className='p-1 font-light bg-teal-200'>{footerMessage}</p>
                                }
                            />
                        </PopoverContent>
                    </Popover>
                </FormItem>
            )}
        />
    )
}

export default RentStart