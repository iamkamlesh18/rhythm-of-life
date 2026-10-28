import { useRef } from 'react'

export function useSecretTap(onUnlock, taps = 5, windowMs = 2500) {
  const count = useRef(0)
  const timer = useRef(null)

  return (event) => {
    count.current += 1
    clearTimeout(timer.current)

    if (count.current === 3) {
      import('../room/InnerRoom')
    }

    if (count.current >= taps) {
      count.current = 0
      onUnlock(event)
      return
    }

    timer.current = setTimeout(() => {
      count.current = 0
    }, windowMs)
  }
}
