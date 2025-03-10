import { useState } from 'react'
import { Button } from '@workspace/ui/components/ui/button';

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <Button
      onClick={() => setCount(count + 1)}
    >
      Clicks: {count}
    </Button>
  )
}
