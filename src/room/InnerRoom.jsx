import { useEffect } from 'react'

export default function InnerRoom() {
  useEffect(() => {
    window.history.pushState({ secretRoom: true }, '', '#inner-room')
  }, [])

  return (
    <div className="inner-room-shell">
      <h2>Inner Room</h2>
      <p>Quiet notes, deeper reflections, and the rhythm work that sits beneath the public page.</p>
    </div>
  )
}
