import { useEffect, useState } from 'react'
import PageIntro from '../components/PageIntro'
import SectionHeading from '../components/SectionHeading'
import { affirmations, dailyRhythm, resetPractice } from '../content/site'

export default function PracticePage() {
  const [activeAffirmation, setActiveAffirmation] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAffirmation((current) => (current + 1) % affirmations.length)
    }, 6000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <>
      <PageIntro eyebrow="Daily practice" title="Make a little room for your own rhythm." description="Small moments of attention can help you return to yourself, without adding one more thing to get right." />
      <section className="container section-spacing practice-section">
        <SectionHeading eyebrow="A small return" title="A gentle reset for wherever you are." description="Take what is useful and leave the rest. There is no wrong way to begin." />
        <div className="practice-grid">
          {resetPractice.map((step) => <article key={step.number} className="practice-step"><span className="practice-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
      </section>
      <section className="container section-spacing">
        <SectionHeading eyebrow="Through the day" title="A few ways to pause and check in." />
        <div className="daily-rhythm-grid">
          {dailyRhythm.map((moment) => <article key={moment.time} className="daily-rhythm-card"><span className="mini-label">{moment.time}</span><h3>{moment.title}</h3><p>{moment.text}</p><blockquote>{moment.prompt}</blockquote></article>)}
        </div>
      </section>
      <section className="affirmation-strip affirmation-page" aria-live="polite">
        {affirmations.map((affirmation, index) => <p key={affirmation} className={`affirmation-word${index === activeAffirmation ? ' active' : ''}`}>{affirmation}</p>)}
      </section>
    </>
  )
}