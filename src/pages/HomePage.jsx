import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, Check, MessageCircle, Waves } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { homepageCopy } from '../content/homepageCopy'
import { landscapeImage } from '../content/media'
import { waLink } from '../lib/whatsapp'
import './HomePage.css'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function HomePage() {
  const { soundEnabled, toggleAmbient } = useOutletContext()
  const [locale, setLocale] = useState(() => {
    try {
      return window.localStorage.getItem('rol.home-locale') === 'mr' ? 'mr' : 'en'
    } catch {
      return 'en'
    }
  })
  const copy = homepageCopy[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      window.localStorage.setItem('rol.home-locale', locale)
    } catch {
      // The selected language still applies for this visit.
    }
  }, [locale])

  return (
    <div className={`home-surface home-locale-${locale}`} lang={locale}>
      <section className="home-hero">
        <motion.figure className="home-hero-image" {...reveal()}>
          <img src={landscapeImage} alt="Quiet mountain lake surrounded by green hills" />
          <figcaption><span>RHYTHM OF LIFE</span><span>{copy.hero.imageCaption}</span></figcaption>
        </motion.figure>
        <motion.div className="home-hero-copy" {...reveal(0.12)}>
          <div className="home-language-switch" role="group" aria-label={copy.switchLabel}>
            <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')} aria-pressed={locale === 'en'}>EN</button>
            <button type="button" className={locale === 'mr' ? 'active' : ''} onClick={() => setLocale('mr')} aria-pressed={locale === 'mr'}>मराठी</button>
          </div>
          <span className="home-eyebrow"><Waves size={17} /> {copy.hero.eyebrow}</span>
          <h1>{copy.hero.lead} <em>{copy.hero.emphasis}</em></h1>
          <p>{copy.hero.description}</p>
          <div className="home-hero-actions">
            <a className="home-button" href={waLink(copy.whatsappMessage)} target="_blank" rel="noreferrer"><MessageCircle size={18} />{copy.hero.contact}</a>
            <Link className="home-text-link" to="/find-your-rhythm">{copy.hero.checkIn} <ArrowRight size={17} /></Link>
          </div>
          <p className="home-note">{copy.hero.note}</p>
        </motion.div>
        <button type="button" className="home-scroll" onClick={() => document.getElementById('home-intro')?.scrollIntoView({ behavior: 'smooth' })} aria-label={copy.scrollLabel}><span /> {copy.hero.continueLabel} <ArrowDown size={16} /></button>
      </section>

      <section className="home-manifesto" id="home-intro">
        <div className="home-manifesto-inner">
          <p className="home-index">{copy.manifesto.index}</p>
          <h2>{copy.manifesto.title}<br /><em>{copy.manifesto.emphasis}</em></h2>
          <p>{copy.manifesto.body}</p>
        </div>
        <div className="home-manifesto-mark" aria-hidden="true"><Waves size={76} strokeWidth={0.8} /></div>
      </section>

      <motion.section className="home-section home-pattern-section" {...reveal()}>
        <div className="home-container">
          <SectionHeading eyebrow={copy.pattern.eyebrow} title={copy.pattern.title} description={copy.pattern.description} />
          <div className="home-pattern-grid">
            {copy.pattern.items.map((line, index) => (
              <motion.article key={line} className="home-pattern-item" {...reveal(index * 0.08)}>
                <span>0{index + 1}</span><p>{line}</p>
              </motion.article>
            ))}
          </div>
          <Link className="home-text-link" to="/approach">{copy.pattern.link} <ArrowRight size={17} /></Link>
        </div>
      </motion.section>

      <motion.section className="home-section home-offerings" id="offerings" {...reveal()}>
        <div className="home-container">
          <SectionHeading eyebrow={copy.offerings.eyebrow} title={copy.offerings.title} description={copy.offerings.description} />
          <div className="home-offering-grid">
            {copy.offerings.items.map((service, index) => (
              <motion.article className="home-offering" key={service.title} {...reveal(index * 0.06)}>
                <span className="home-offering-number">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a className="home-offering-link" href={waLink(`${copy.offerings.whatsappPrefix} ${service.title}.`)} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} />{copy.offerings.contact}
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="home-method-band">
        <div className="home-container home-method-grid">
          <motion.div className="home-method-copy" {...reveal()}>
            <p className="home-index">{copy.method.index}</p>
            <h2>{copy.method.title[0]}<br />{copy.method.title[1]}<br /><em>{copy.method.title[2]}</em></h2>
            <p>{copy.method.description}</p>
            <Link className="home-text-link" to="/approach">{copy.method.link} <ArrowRight size={17} /></Link>
          </motion.div>
          <div className="home-method-steps">
            {copy.method.steps.map((step, index) => (
              <motion.article className="home-method-step" key={step.title} {...reveal(index * 0.08)}>
                <span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><Waves size={20} strokeWidth={1} aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="home-section home-fit-section" {...reveal()}>
        <div className="home-container home-fit-grid">
          <div>
            <SectionHeading eyebrow={copy.fit.eyebrow} title={copy.fit.title} />
            <p className="home-fit-intro">{copy.fit.introduction}</p>
          </div>
          <div>
            <ul className="home-fit-list">{copy.fit.items.map((item) => <li key={item}><Check size={18} />{item}</li>)}</ul>
            <p className="home-boundary">{copy.fit.boundary}</p>
          </div>
        </div>
      </motion.section>

      <section className="home-daily-band">
        <div className="home-container">
          <SectionHeading eyebrow={copy.daily.eyebrow} title={copy.daily.title} />
          <div className="home-daily-grid">
            {copy.daily.moments.map((moment, index) => (
              <motion.article className="home-daily-item" key={moment.time} {...reveal(index * 0.08)}>
                <span>{moment.time}</span><h3>{moment.title}</h3><p>{moment.text}</p><blockquote>{moment.prompt}</blockquote>
              </motion.article>
            ))}
          </div>
          <Link className="home-text-link" to="/practice">{copy.daily.link} <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="home-next-step">
        <div className="home-container home-next-grid">
          <div><p className="home-index">{copy.next.index}</p><h2>{copy.next.title}</h2><p>{copy.next.body}</p></div>
          <div className="home-next-actions">
            <a className="home-button home-button-light" href={waLink(copy.whatsappMessage)} target="_blank" rel="noreferrer"><MessageCircle size={18} />{copy.next.contact}</a>
            <Link className="home-text-link" to="/find-your-rhythm">{copy.next.checkIn} <ArrowRight size={17} /></Link>
            <button type="button" className="home-sound" onClick={toggleAmbient}>{soundEnabled ? copy.next.soundOff : copy.next.soundOn}</button>
          </div>
        </div>
      </section>

      <section className="home-section home-faq-section">
        <div className="home-container">
          <div className="home-faq-heading"><SectionHeading eyebrow={copy.faq.eyebrow} title={copy.faq.title} /><Link className="home-text-link" to="/faq">{copy.faq.all} <ArrowRight size={17} /></Link></div>
          <div className="home-faq-grid">{copy.faq.items.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div>
        </div>
      </section>
    </div>
  )
}
