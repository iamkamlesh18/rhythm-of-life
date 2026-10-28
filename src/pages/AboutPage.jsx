import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import { storyPoints } from '../content/site'
import { morningImage } from '../content/media'

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About Rhythm of Life" title="Helping people return to the rhythm that already belongs to them." description="Emotional wellbeing is not about fixing yourself. It is about creating more room to feel, breathe, and begin again." />
      <section className="container section-spacing about-wrap">
        <div className="about-photo"><img className="photo-frame" src={morningImage} alt="Soft morning light over a quiet field" /></div>
        <div className="about-copy">
          <span className="eyebrow">A gentler way forward</span>
          <h2>Less force. More space to listen.</h2>
          <p>I work with people who are tired of forcing themselves to feel calm and want a gentler, more intuitive path back to alignment.</p>
          <p>Rhythm of Life began as a reminder that emotional wellbeing is not about fixing yourself. It is about creating more room to feel, breathe and begin again.</p>
          <Link className="text-link" to="/approach">Explore the approach <ArrowRight size={17} /></Link>
        </div>
      </section>
      <section className="container section-spacing">
        <div className="section-heading"><span className="eyebrow">What change can feel like</span><h2>Gentle shifts, noticed in everyday moments.</h2></div>
        <div className="story-grid">{storyPoints.map((story) => <blockquote key={story.title} className="story-card"><span className="mini-label">{story.title}</span><p>{story.text}</p></blockquote>)}</div>
      </section>
    </>
  )
}