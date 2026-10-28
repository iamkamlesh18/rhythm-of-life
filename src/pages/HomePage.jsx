import { ArrowRight, Heart, MessageCircle, Volume2, VolumeX } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { howItWorks, shiftPoints } from '../content/site'
import { landscapeImage } from '../content/media'
import { waLink } from '../lib/whatsapp'

export default function HomePage() {
  const { soundEnabled, setSoundEnabled } = useOutletContext()

  return (
    <>
      <section className="hero container section-spacing">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-mark" />A practice in coming back to yourself</span>
          <h1>There is a rhythm beneath <em>all the noise.</em></h1>
          <p className="lead">A quieter way to meet old patterns, make room for what you feel, and find your own pace again.</p>
          <div className="action-row">
            <a className="primary-button" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />Begin a conversation
            </a>
            <button type="button" className="sound-chip" onClick={() => setSoundEnabled((enabled) => !enabled)}>
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {soundEnabled ? 'Ambience on' : 'Ambience off'}
            </button>
          </div>
          <p className="hero-note"><span>01</span>You don&apos;t need fixing. You need room to listen.</p>
        </div>
        <figure className="hero-visual">
          <img src={landscapeImage} alt="Quiet mountain lake surrounded by green hills" />
          <figcaption><span className="image-index">FIELD NOTE 01</span><span>Find a softer pace.</span></figcaption>
          <span className="image-stamp" aria-hidden="true">pause<br />·<br />notice<br />·<br />return</span>
          <span className="image-edge-label" aria-hidden="true">A LITTLE SPACE TO BEGIN AGAIN</span>
        </figure>
      </section>

      <section className="manifesto-band" aria-label="A note on the work">
        <p>Not a new version of you. <em>A closer one.</em></p>
      </section>

      <section className="container section-spacing">
        <SectionHeading eyebrow="A different pace" title="Small shifts can change the way a whole day feels." />
        <div className="shift-grid">
          {shiftPoints.map((point, index) => (
            <article key={point} className="shift-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-spacing home-approach">
        <SectionHeading eyebrow="How it works" title="Three gentle steps back toward ease." />
        <div className="three-col">
          {howItWorks.map((step) => (
            <article key={step.title} className="info-card">
              <span className="step-badge">{step.title}</span>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" to="/approach">Explore the approach <ArrowRight size={17} /></Link>
      </section>

      <section className="home-invitation">
        <div className="container home-invitation-inner">
          <Heart size={20} />
          <p>Begin where you are. There is no perfect moment to start.</p>
          <Link className="primary-button" to="/find-your-rhythm">Find your rhythm <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}