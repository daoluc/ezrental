import HeaderHost from '@/components/HeaderHost'
import MaxWContainer from '@/components/MaxWContainer'
import React from 'react'

function MyListingsLayout({children}:{children: React.ReactNode}) {
    return (
        <>
            <HeaderHost />
            <MaxWContainer classes='py-32'>
                {children}
            </MaxWContainer>
        </>
    )
}

export default MyListingsLayout