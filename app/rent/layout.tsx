import Header from '@/components/Header'
import MaxWContainer from '@/components/MaxWContainer'
import React from 'react'

const RentItemLayout = (
    {children}:{children: React.ReactNode}
) => {
  return (
    <>
        <Header />
        <MaxWContainer classes='py-32'>
            {children}
        </MaxWContainer>
    </>
  )
}

export default RentItemLayout