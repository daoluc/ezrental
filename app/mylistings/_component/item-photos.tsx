'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function ItemPhotos({
    onNext,
    onPrev,
}: {
    onNext?: () => void,
    onPrev: () => void,
}) {

    return (
        <div className="grid w-full gap-1.5">
            <h2 className='text-xl sm:text-2xl py-4 font-semibold'>Pricing</h2>

            <div className='flex justify-between items-center py-4'>
                <Button type='button' variant='ghost' onClick={onPrev}>Prev</Button>
            </div>
        </div >
    )
}

export default ItemPhotos