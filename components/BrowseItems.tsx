import React from 'react'
import SectionHeadline from './SectionHeadline'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

function BrowseItems() {
    return (
        <section className='py-2 sm:py-16 px-5'>
            <SectionHeadline title='Looking to rent? Browse items' />
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Card className='flex flex-col items-center hover:shadow-md'>
                    <CardHeader>
                        <CardTitle>Camera gear</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image alt='camera gear' src='/rent-camera-gear.jpg' width={200} height={100} />
                    </CardContent>
                    <CardFooter>
                        <Link href="/rent/camera-gear">Browse &rarr;</Link>
                    </CardFooter>
                </Card>

                <Card className='flex flex-col items-center hover:shadow-md'>
                    <CardHeader>
                        <CardTitle>Power tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image alt='power tools' src='/rent-power-tools.jpg' width={200} height={100} />
                    </CardContent>
                    <CardFooter>
                        <Link href="/rent/camera-gear">Browse &rarr;</Link>
                    </CardFooter>
                </Card>

                <Card className='flex flex-col items-center hover:shadow-md'>
                    <CardHeader>
                        <CardTitle>House tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image alt='house tools' src='/rent-house-tools.jpg' width={200} height={100} />
                    </CardContent>
                    <CardFooter>
                        <Link href="/rent/camera-gear">Browse &rarr;</Link>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}

export default BrowseItems