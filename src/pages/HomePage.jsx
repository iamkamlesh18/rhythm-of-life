import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, Check, Flower2, MessageCircle } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import BreathWelcome from '../components/BreathWelcome'
import SectionHeading from '../components/SectionHeading'
import { audience, dailyRhythm, faqs, howItWorks, mirrorLines } from '../content/site'
import { krishnaKamalImage } from '../content/media'
import { waLink } from '../lib/whatsapp'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function HomePage() {
  const { soundEnabled, setSoundEnabled } = useOutletContext()
  const [showBreathWelcome, setShowBreathWelcome] = useState(true)
  const finishBreathWelcome = useCallback(() => setShowBreathWelcome(false), [])

  return (
    <div className="lotus-home">
      {showBreathWelcome && <BreathWelcome onComplete={finishBreathWelcome} />}

      <section className="lotus-hero">
        <motion.figure className="lotus-hero-image" {...reveal()}>
          <img src={krishnaKamalImage} alt="Two Krishna-kamal passionflowers in full bloom" />
          <figcaption><span>KRISHNA KAMAL</span><span>Passiflora caerulea</span></figcaption>
        </motion.figure>
        <motion.div className="lotus-hero-copy" {...reveal(0.12)}>
          <span className="lotus-kicker"><Flower2 size={17} /> A gentle practice of return</span>
          <h1>Find your way back to <em>your own rhythm.</em></h1>
          <p>Personal reflective support for understanding repeating patterns, making room for what you feel, and choosing a gentler next step.</p>
          <div className="lotus-hero-actions">
            <a className="lotus-button" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer"><MessageCircle size={18} />Ask about getting started</a>
            <Link className="lotus-text-link" to="/find-your-rhythm">Try a three-question check-in <ArrowRight size={17} /></Link>
          </div>
          <p className="lotus-note">A quiet place to pause, reflect, and begin again. No quick-fix promises.</p>
        </motion.div>
        <button type="button" className="lotus-scroll" onClick={() => document.getElementById('lotus-intro')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Continue to learn about Rhythm of Life"><span /> Continue <ArrowDown size={16} /></button>
      </section>

      <section className="lotus-intro" id="lotus-intro">
        <div className="lotus-intro-inner">
          <p className="lotus-index">01 / THE PRACTICE</p>
          <h2>Not a new version of you.<br /><em>A closer one.</em></h2>
          <p>Rhythm of Life is a space for emotional wellbeing and self-reflection. We start with what is happening in your life now, and move at a pace that feels supportive.</p>
        </div>
        <div className="lotus-ornament" aria-hidden="true"><Flower2 size={82} strokeWidth={0.8} /></div>
      </section>

      <motion.section className="lotus-recognition" {...reveal()}>
        <div className="lotus-section-wrap">
          <SectionHeading eyebrow="A familiar pattern" title="You can be capable and still feel caught in a loop." description="Noticing the pattern is a beginning, not another reason to blame yourself." />
          <div className="lotus-patterns">
            {mirrorLines.slice(0, 3).map((line, index) => (
              <motion.article key={line} className="lotus-pattern" {...reveal(index * 0.08)}>
                <span>0{index + 1}</span><p>{line}</p>
              </motion.article>
            ))}
          </div>
          <Link className="lotus-text-link" to="/approach">Explore the approach <ArrowRight size={17} /></Link>
        </div>
      </motion.section>

      <section className="lotus-method">
        <div className="lotus-method-inner">
          <motion.div className="lotus-method-heading" {...reveal()}>
            <p className="lotus-index">02 / HOW IT WORKS</p>
            <h2>Listen.<br />Release.<br /><em>Anchor.</em></h2>
            <p>A simple rhythm for meeting yourself with more care.</p>
          </motion.div>
          <div className="lotus-steps">
            {howItWorks.map((step, index) => (
              <motion.article className="lotus-step" key={step.title} {...reveal(index * 0.08)}>
                <span className="lotus-step-number">0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <Flower2 size={22} strokeWidth={1} aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="lotus-ways lotus-section-wrap">
        <SectionHeading eyebrow="Choose your next step" title="Begin in the way that feels right for you." />
        <div className="lotus-way-list">
          <Link to="/find-your-rhythm" className="lotus-way"><span>01</span><span><strong>Check in with yourself</strong><small>Three questions to help you notice what is present today.</small></span><ArrowRight size={19} /></Link>
          <Link to="/practice" className="lotus-way"><span>02</span><span><strong>Try a small daily practice</strong><small>Gentle pauses for morning, midday, and evening.</small></span><ArrowRight size={19} /></Link>
          <Link to="/challenge" className="lotus-way"><span>03</span><span><strong>Build a rhythm over time</strong><small>A flexible 90-day practice with progress saved on your device.</small></span><ArrowRight size={19} /></Link>
        </div>
      </section>

      <section className="lotus-daily">
        <div className="lotus-section-wrap">
          <SectionHeading eyebrow="A moment in the day" title="A pause can be small and still be yours." />
          <div className="lotus-daily-grid">
            {dailyRhythm.map((moment, index) => (
              <motion.article className="lotus-daily-item" key={moment.time} {...reveal(index * 0.08)}>
                <span>{moment.time}</span><h3>{moment.title}</h3><p>{moment.text}</p><blockquote>{moment.prompt}</blockquote>
              </motion.article>
            ))}
          </div>
          <Link className="lotus-text-link" to="/practice">Visit the practice page <ArrowRight size={17} /></Link>
        </div>
      </section>

      <motion.section className="lotus-fit lotus-section-wrap" {...reveal()}>
        <div className="lotus-fit-copy">
          <span className="lotus-kicker"><Flower2 size={17} /> A supportive place to begin</span>
          <h2>For the season you are in.</h2>
          <p>If something keeps repeating, or you feel stretched or disconnected from your own ease, you can start with one honest conversation.</p>
          <p className="lotus-boundary">This supports reflection and grounding. It is not a replacement for medical or psychological care.</p>
        </div>
        <ul className="lotus-fit-list">{audience.forYou.map((item) => <li key={item}><Check size={18} />{item}</li>)}</ul>
      </motion.section>

      <section className="lotus-faq lotus-section-wrap">
        <div className="lotus-faq-heading"><SectionHeading eyebrow="Before you reach out" title="A few clear answers." /><Link className="lotus-text-link" to="/faq">All questions <ArrowRight size={17} /></Link></div>
        <div className="lotus-faq-list">{faqs.slice(0, 2).map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div>
      </section>

      <section className="lotus-contact">
        <div className="lotus-contact-inner">
          <p className="lotus-index">03 / WHEN YOU ARE READY</p>
          <h2>Start with a simple hello.</h2>
          <p>Ask what the process involves and what it costs. You can decide what feels right in your own time.</p>
          <a className="lotus-button lotus-button-light" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer"><MessageCircle size={18} />Begin a conversation</a>
          <button type="button" className="lotus-sound" onClick={() => setSoundEnabled((enabled) => !enabled)}>{soundEnabled ? 'Turn ambience off' : 'Turn ambience on'}</button>
        </div>
      </section>
    </div>
  )
}
