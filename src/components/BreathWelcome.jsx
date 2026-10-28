import { useEffect, useRef, useState } from 'react'
import SwanVector from './SwanVector'
import { landscapeImage } from '../content/media'

const durationSeconds = 60

export default function BreathWelcome({ onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)
  const skipButton = useRef(null)
  const elapsedSeconds = durationSeconds - secondsLeft
  const breathingIn = Math.floor(elapsedSeconds / 4) % 2 === 0
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    skipButton.current?.focus()

    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, durationSeconds - Math.floor((Date.now() - startedAt) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) {
        window.clearInterval(timer)
        onComplete()
      }
    }, 250)

    return () => {
      window.clearInterval(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [onComplete])

  const skipMeditation = () => {
    onComplete()
  }

  return (
    <div className="breath-welcome" role="dialog" aria-modal="true" aria-labelledby="breath-title" onKeyDown={(event) => { if (event.key === 'Escape') skipMeditation() }}>
      <img className="breath-sky-image" src={landscapeImage} alt="" aria-hidden="true" />
      <div className="breath-sky-wash" aria-hidden="true" />
      <div className="swans-in-flight" aria-hidden="true">
        <SwanVector className="swan-vector swan-large" />
        <SwanVector className="swan-vector swan-medium" />
        <SwanVector className="swan-vector swan-small" />
      </div>
      <button ref={skipButton} type="button" className="breath-skip" onClick={skipMeditation}>Skip meditation <span aria-hidden="true">→</span></button>
      <div className="breath-welcome-content">
        <p className="breath-kicker">A minute for yourself</p>
        <h1 id="breath-title">Arrive in this moment.</h1>
        <p className="breath-instruction">Let your shoulders soften. Follow the circle, and breathe without forcing it.</p>
        <p className="breath-entry-note">The site opens after one minute. You can skip anytime.</p>
        <div className={`breath-orbit${breathingIn ? ' inhale' : ' exhale'}`} aria-hidden="true">
          <span className="breath-orbit-inner" />
        </div>
        <p className="breath-cue" aria-live="polite">Breathe {breathingIn ? 'in' : 'out'} gently</p>
        <p className="breath-timer" aria-label={`${minutes} minutes ${seconds} seconds remaining`}>{minutes}:{seconds}</p>
        <div className="breath-progress" role="progressbar" aria-label="Meditation progress" aria-valuemin="0" aria-valuemax="60" aria-valuenow={elapsedSeconds}>
          <span style={{ width: `${(elapsedSeconds / durationSeconds) * 100}%` }} />
        </div>
      </div>
      <p className="breath-footer">No special way to do this. Just notice one breath at a time.</p>
    </div>
  )
}
