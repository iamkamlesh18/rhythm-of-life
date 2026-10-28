import { motion } from 'motion/react'
import { ArrowDownRight, ArrowRight, Check, MessageCircle, Volume2, VolumeX } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { audience, dailyRhythm, faqs, howItWorks, mirrorLines } from '../content/site'
import { landscapeImage } from '../content/media'
import { waLink } from '../lib/whatsapp'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function HomePage() {
  const { soundEnabled, setSoundEnabled } = useOutletContext()

  return (
    <div className="home-page">
      <section className="hero home-hero container section-spacing">
        <motion.div className="hero-copy" {...reveal()}>
          <span className="eyebrow"><span className="eyebrow-mark" />Personal emotional-wellbeing support</span>
          <h1>Find a steadier rhythm <em>within yourself.</em></h1>
          <p className="lead">Rhythm of Life offers a personal, reflective space to understand repeating patterns, make room for what you feel, and choose a gentler next step.</p>
          <div className="action-row">
            <a className="primary-button" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />Ask about getting started
            </a>
            <Link className="text-link hero-quiz-link" to="/find-your-rhythm">Try the three-question check-in <ArrowRight size={17} /></Link>
          </div>
          <p className="hero-note"><span>01</span>Start with a conversation. Ask about the process and pricing before deciding.</p>
        </motion.div>
        <motion.figure className="hero-visual" {...reveal(0.12)}>
          <img src={landscapeImage} alt="Quiet mountain lake surrounded by green hills" />
          <figcaption><span className="image-index">A MOMENT TO PAUSE</span><span>Find a softer pace.</span></figcaption>
          <span className="image-stamp" aria-hidden="true">pause<br />·<br />notice<br />·<br />return</span>
          <span className="image-edge-label" aria-hidden="true">A LITTLE SPACE TO BEGIN AGAIN</span>
        </motion.figure>
        <button type="button" className="scroll-cue" onClick={() => document.getElementById('start-here')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to learn how Rhythm of Life works"><span /> A little more about the work <ArrowDownRight size={14} /></button>
      </section>

      <section className="promise-band" aria-label="What Rhythm of Life offers">
        <div className="container promise-grid">
          <p><span>01</span> Guided reflection</p>
          <p><span>02</span> Gentle, practical steps</p>
          <p><span>03</span> Support without promises of a quick fix</p>
        </div>
      </section>

      <motion.section id="start-here" className="container section-spacing home-recognition" {...reveal()}>
        <SectionHeading eyebrow="Does this sound familiar?" title="You can be capable and still feel caught in a loop." description="Sometimes the first step is simply seeing the pattern clearly, without turning it into another thing to blame yourself for." />
        <div className="recognition-grid">
          {mirrorLines.slice(0, 3).map((line, index) => (
            <motion.article key={line} className="recognition-item" {...reveal(index * 0.08)}>
              <span className="recognition-number">0{index + 1}</span>
              <p>{line}</p>
            </motion.article>
          ))}
        </div>
        <Link className="text-link" to="/approach">Understand the approach <ArrowRight size={17} /></Link>
      </motion.section>

      <section className="home-method-band">
        <div className="container home-method-layout">
          <motion.div className="home-method-copy" {...reveal()}>
            <span className="eyebrow">What the work looks like</span>
            <h2>A little less pressure. A little more room to hear yourself.</h2>
            <p>This is guided wellbeing support for reflection and everyday practice. It is not a clinical service, and it does not promise a particular outcome. We begin with what is happening for you now.</p>
            <Link className="text-link" to="/approach">Explore the full approach <ArrowRight size={17} /></Link>
          </motion.div>
          <div className="home-steps">
            {howItWorks.map((step, index) => (
              <motion.article key={step.title} className="home-step" {...reveal(index * 0.08)}>
                <span className="home-step-number">0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="container section-spacing home-fit" {...reveal()}>
        <div className="home-fit-heading">
          <SectionHeading eyebrow="A good place to begin if" title="You want support that meets you where you are." />
          <p>There is no need to have the perfect words. You can start with one thing that has been feeling hard lately.</p>
        </div>
        <ul className="fit-list">
          {audience.forYou.map((item) => <li key={item}><Check size={17} />{item}</li>)}
        </ul>
        <p className="boundary-note">This work supports reflection and grounding. It is not a replacement for medical or psychological care.</p>
      </motion.section>

      <motion.section className="daily-preview" {...reveal()}>
        <div className="container">
          <SectionHeading eyebrow="A taste of the practice" title="Small pauses that fit inside a real day." />
          <div className="daily-rhythm-grid">
            {dailyRhythm.map((moment, index) => (
              <motion.article key={moment.time} className="daily-rhythm-card" {...reveal(index * 0.08)}>
                <span className="mini-label">{moment.time}</span>
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
                <blockquote>{moment.prompt}</blockquote>
              </motion.article>
            ))}
          </div>
          <Link className="text-link" to="/practice">See the daily practice <ArrowRight size={17} /></Link>
        </div>
      </motion.section>

      <section className="home-next-step">
        <div className="container home-next-layout">
          <div>
            <span className="eyebrow">Your next step</span>
            <h2>Curious? Start with the question you already have.</h2>
            <p>You can message directly, or take a short check-in first. There is no need to commit before you understand what support could look like.</p>
          </div>
          <div className="home-next-actions">
            <a className="primary-button" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer"><MessageCircle size={18} />Ask on WhatsApp</a>
            <Link className="secondary-button" to="/find-your-rhythm">Take the check-in <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="container section-spacing home-faq">
        <div className="home-faq-heading">
          <SectionHeading eyebrow="Before you reach out" title="A few useful things to know." />
          <Link className="text-link" to="/faq">Read all FAQs <ArrowRight size={17} /></Link>
        </div>
        <div className="faq-list">
          {faqs.slice(0, 2).map((faq) => <article key={faq.question} className="faq-card"><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}
        </div>
      </section>

      <section className="home-final-cta">
        <div className="container home-final-inner">
          <p className="eyebrow">No perfect words needed</p>
          <h2>Your next step can be a simple hello.</h2>
          <p>Ask what the process involves and what it costs. Decide what feels right for you, in your own time.</p>
          <a className="primary-button" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer"><MessageCircle size={18} />Start a WhatsApp conversation</a>
          <button type="button" className="home-sound-link" onClick={() => setSoundEnabled((enabled) => !enabled)}>
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            {soundEnabled ? 'Turn ambience off' : 'Turn ambience on'}
          </button>
        </div>
      </section>
    </div>
  )
}
