'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

const TempPage = () => {
  const [count, setCount] = React.useState(0)

  const handleClick = () => {
    setCount((prev) => prev + 1)
  }
  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
      <div>{count}</div>
    </div>
  )
}

export default TempPage