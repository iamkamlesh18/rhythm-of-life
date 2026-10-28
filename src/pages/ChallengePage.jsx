import { useMemo, useState } from 'react'
import PageIntro from '../components/PageIntro'
import SectionHeading from '../components/SectionHeading'
import { challengeEntries } from '../content/challenge'
import { readStorage, writeStorage } from '../lib/storage'

export default function ChallengePage() {
  const [savedChallenge] = useState(() => readStorage('rol.challenge.v1', { startedOn: new Date().toISOString().slice(0, 10), done: [] }))
  const [challengeDone, setChallengeDone] = useState(savedChallenge.done || [])
  const [challengeOpen, setChallengeOpen] = useState(false)
  const progress = useMemo(() => Math.round((challengeDone.length / 90) * 100), [challengeDone])
  const currentDay = challengeDone.length + 1
  const challengeToday = challengeEntries.find((entry) => entry.day === currentDay) || challengeEntries[0]

  const toggleDay = (day) => {
    const next = challengeDone.includes(day)
      ? challengeDone.filter((item) => item !== day)
      : [...challengeDone, day].sort((a, b) => a - b)
    setChallengeDone(next)
    writeStorage('rol.challenge.v1', { startedOn: new Date().toISOString().slice(0, 10), done: next })
  }

  return (
    <>
      <PageIntro eyebrow="90-day rhythm challenge" title="A small practice, one day at a time." description="Build a kinder rhythm through short daily reflections. Skip a day, return when you are ready, and keep your progress here." />
      <section className="container section-spacing challenge-page">
        <SectionHeading eyebrow="Your progress" title="Steady, not perfect." />
        <div className="challenge-panel">
          <div className="challenge-progress">
            <div className="ring" style={{ '--progress': `${progress}%` }}><span>{progress}%</span></div>
            <div className="challenge-summary">
              <p className="mini-label">Your practice, at your pace</p>
              <h3>{challengeDone.length}<span> / 90 days</span></h3>
              <button type="button" className="secondary-button" onClick={() => setChallengeOpen((open) => !open)} aria-expanded={challengeOpen}>{challengeOpen ? 'Close day tracker' : 'Open day tracker'}</button>
            </div>
          </div>
          {challengeOpen && <div className="challenge-grid">{challengeEntries.map((entry) => <button key={entry.day} type="button" className={`day-dot${challengeDone.includes(entry.day) ? ' done' : ''}`} onClick={() => toggleDay(entry.day)} aria-pressed={challengeDone.includes(entry.day)} aria-label={`Day ${entry.day}${challengeDone.includes(entry.day) ? ', completed' : ''}`}>{entry.day}</button>)}</div>}
          <article className="today-card">
            <div><span className="mini-label">Today · {challengeToday.phase}</span><h3>Day {challengeToday.day}</h3></div>
            <p><strong>Theme:</strong> {challengeToday.theme}</p>
            <p><strong>Affirmation:</strong> {challengeToday.affirmation}</p>
            <p><strong>Action:</strong> {challengeToday.action}</p>
            <p><strong>Gratitude:</strong> {challengeToday.gratitude}</p>
            <button type="button" className="primary-button compact" onClick={() => toggleDay(challengeToday.day)}>{challengeDone.includes(challengeToday.day) ? 'Mark undone' : 'Mark done'}</button>
          </article>
        </div>
      </section>
    </>
  )
}