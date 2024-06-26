import React from 'react'
import List, { ListItem } from './List'
import SectionHeadline from './SectionHeadline'

const HowItWorks = () => {
  return (
    <section className="py-2 sm:py-16">
        <SectionHeadline styles='py-4 sm:py-16' title='How renting your items works?'/>
        <List>
            <ListItem count={1} 
                primary='List your items for free' 
                secondary='Yes, that&apos; right! There is no fee to list your item.'
            />
            <ListItem count={2} 
                primary='List your items for free' 
                secondary='You are in complete control of the pricing'
            />
            <ListItem count={3} 
                primary='List your items for free' 
                secondary='Earn while you sit on a beach or go on a vacation'
            />
        </List>        
    </section>
  )
}

export default HowItWorks