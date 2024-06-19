import React from 'react'
import SectionHeadline from './SectionHeadline'
import { itemCategories } from '@/data'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

function BrowseItems() {
    return (
        <section className='py-2 sm:py-16 px-5'>
            <SectionHeadline title='Looking to rent? Browse items' />
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                {
                    itemCategories.map(cat => (
                        <Card key={`${cat.name}`} className='flex flex-col items-center hover:shadow-md'>
                            <CardHeader>
                                <CardTitle>{cat.dislay}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Image alt={`${cat.dislay}`} src={`/rent-${cat.name}.jpg`} width={200} height={100} />
                            </CardContent>
                            <CardFooter>
                                <Link href={`/rent/${cat.name}`}>Browse &rarr;</Link>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}

export default BrowseItems