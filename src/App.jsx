import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle2, Heart, MessageCircle, Sparkles, Volume2, VolumeX, Waves } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { waLink } from './lib/whatsapp'
import { mirrorLines, shiftPoints, howItWorks, resetPractice, dailyRhythm, methods, audience, affirmations, faqs, finalCta, footerLinks } from './content/site'
import { challengeEntries } from './content/challenge'
import { quizQuestions, quizResults } from './content/quiz'
import { readStorage, writeStorage } from './lib/storage'
import { stopTrack, tracks } from './lib/audio'
import { useSecretTap } from './hooks/useSecretTap'
import './App.css'

function App() {
  const [savedSound] = useState(() => readStorage('rol.sound.v1', { enabled: false, track: 'rain' }))
  const [soundEnabled, setSoundEnabled] = useState(() => Boolean(savedSound.enabled))
  const [selectedTrack, setSelectedTrack] = useState(() => savedSound.track || 'rain')
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [challengeOpen, setChallengeOpen] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [activeAffirmation, setActiveAffirmation] = useState(0)

  const savedChallenge = useMemo(
    () => readStorage('rol.challenge.v1', { startedOn: new Date().toISOString().slice(0, 10), done: [] }),
    [],
  )

  const [challengeDone, setChallengeDone] = useState(savedChallenge.done || [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAffirmation((current) => (current + 1) % affirmations.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    writeStorage('rol.sound.v1', { enabled: soundEnabled, track: selectedTrack })
    if (!soundEnabled) {
      Object.entries(tracks).forEach(([id, track]) => {
        if (track && track.playing()) stopTrack(id)
      })
      return
    }

    Object.entries(tracks).forEach(([id, track]) => {
      if (!track) return
      if (id === selectedTrack) {
        if (!track.playing()) track.play()
        track.fade(track.volume() || 0, 0.35, 1500)
      } else if (track.playing()) {
        stopTrack(id)
      }
    })
  }, [soundEnabled, selectedTrack])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        Object.entries(tracks).forEach(([id, track]) => {
          if (track && track.playing()) stopTrack(id)
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  useEffect(() => {
    if (secretOpen) {
      window.history.pushState({ secretRoom: true }, '', '#inner-room')
    } else if (window.location.hash === '#inner-room') {
      window.history.back()
    }
  }, [secretOpen])

  useEffect(() => {
    const onPopState = () => {
      if (window.location.hash !== '#inner-room') setSecretOpen(false)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const progress = useMemo(
    () => Math.round((challengeDone.length / 90) * 100),
    [challengeDone],
  )

  const currentDay = challengeDone.length + 1
  const challengeToday = challengeEntries.find((entry) => entry.day === currentDay) || challengeEntries[0]

  const handleChallengeToggle = (day) => {
    const next = challengeDone.includes(day)
      ? challengeDone.filter((item) => item !== day)
      : [...challengeDone, day].sort((a, b) => a - b)

    setChallengeDone(next)
    writeStorage('rol.challenge.v1', { startedOn: new Date().toISOString().slice(0, 10), done: next })
  }

  const handleAnswer = (outcome) => {
    const nextAnswers = [...answers, outcome]
    setAnswers(nextAnswers)

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep((prev) => prev + 1)
      return
    }

    const tally = { Scattered: 0, Heavy: 0, Stuck: 0, Flowing: 0 }
    nextAnswers.forEach((entry) => {
      tally[entry] += 1
    })

    let best = 'Flowing'
    let topCount = -1
    Object.entries(tally).forEach(([key, value]) => {
      if (value > topCount) {
        topCount = value
        best = key
      }
    })

    setResult(best)
  }

  const onSecretOpen = () => setSecretOpen(true)
  const secretTap = useSecretTap(onSecretOpen)
  const currentQuestion = quizQuestions[quizStep]

  return (
    <>
      <div className="page-shell">
        <header className="topbar container">
          <a className="brand-mark" href="#home" aria-label="Rhythm of Life home">
            <span className="brand-symbol" aria-hidden="true">r.</span>
            <span>Rhythm<br />of Life</span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#approach">The approach</a>
            <a href="#practice">Daily practice</a>
            <a href="#about">About</a>
          </nav>
          <a href={waLink('Hi, I would like to know more about Rhythm of Life.')} className="header-link" target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> Say hello
          </a>
        </header>

        <main>
          <section className="hero container section-spacing" id="home">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-mark" /> A practice in coming back to yourself</span>
              <h1>There is a rhythm beneath <em>all the noise.</em></h1>
              <p className="lead">A quieter way to meet old patterns, make room for what you feel, and find your own pace again.</p>
              <div className="action-row">
                <a className="primary-button" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} />
                  Begin a conversation
                </a>
                <button type="button" className="sound-chip" onClick={() => setSoundEnabled((prev) => !prev)} aria-label="Toggle sound ambience">
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  <span>{soundEnabled ? 'Ambience on' : 'Ambience off'}</span>
                </button>
              </div>
              <p className="hero-note"><span>01</span> You don&apos;t need fixing. You need room to listen.</p>
            </div>
            <figure className="hero-visual">
              <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1500&q=85" alt="Quiet mountain lake surrounded by green hills" />
              <figcaption><span className="image-index">FIELD NOTE 01</span><span>Find a softer pace.</span></figcaption>
              <span className="image-stamp" aria-hidden="true">pause<br />·<br />notice<br />·<br />return</span>
              <span className="image-edge-label" aria-hidden="true">A LITTLE SPACE TO BEGIN AGAIN</span>
            </figure>
            <a className="scroll-cue" href="#approach" aria-label="Scroll to the approach"><span /> Scroll to explore</a>
          </section>

          <section className="manifesto-band" aria-label="A note on the work">
            <p>Not a new version of you. <em>A closer one.</em></p>
          </section>

          <motion.section id="approach" className="container section-spacing approach-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading">
              <span className="eyebrow">The Mirror</span>
              <h2>Patterns that feel familiar, but never truly belong to you.</h2>
            </div>
            <div className="mirror-grid">
              {mirrorLines.map((line) => (
                <div key={line} className="mirror-card">
                  <Heart size={18} />
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading narrow">
              <span className="eyebrow">The Shift</span>
              <h2>Everything has a rhythm, so your patterns do too.</h2>
            </div>
            <div className="shift-grid">
              {shiftPoints.map((point, index) => (
                <div key={point} className="shift-card">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading">
              <span className="eyebrow">How it works</span>
              <h2>Three gentle steps back toward ease.</h2>
            </div>
            <div className="three-col">
              {howItWorks.map((step) => (
                <div key={step.title} className="info-card">
                  <div className="step-badge">{step.title}</div>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading">
              <span className="eyebrow">Methods</span>
              <h2>What you may notice when your rhythm begins to settle.</h2>
            </div>
            <div className="method-grid">
              {methods.map((method) => (
                <article key={method.title} className="method-card">
                  <div className="method-icon"><Sparkles size={18} /></div>
                  <h3>{method.title}</h3>
                  <p className="method-note">What you may notice</p>
                  <p>{method.what}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading">
              <span className="eyebrow">For you / not for you</span>
              <h2>Support that matches your current season.</h2>
            </div>
            <div className="audience-grid">
              <div className="panel">
                <h3>For you</h3>
                <ul>
                  {audience.forYou.map((item) => <li key={item}><CheckCircle2 size={16} /> {item}</li>)}
                </ul>
              </div>
              <div className="panel muted-panel">
                <h3>Not for you</h3>
                <ul>
                  {audience.notForYou.map((item) => <li key={item}><Waves size={16} /> {item}</li>)}
                </ul>
              </div>
            </div>
          </motion.section>

          <section className="affirmation-strip" aria-live="polite">
            {affirmations.map((affirmation, index) => (
              <div key={affirmation} className={`affirmation-word ${index === activeAffirmation ? 'active' : ''}`}>
                {affirmation}
              </div>
            ))}
          </section>

          <motion.section id="challenge" className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading">
              <span className="eyebrow">The 90-day Rhythm Challenge</span>
              <h2>Small practices, steady rhythm, no guilt if life interrupts.</h2>
            </div>
            <div className="challenge-panel">
              <div className="challenge-progress">
                <div className="ring" style={{ '--progress': `${progress}%` }}>
                  <span>{progress}%</span>
                </div>
                <div className="challenge-summary">
                  <p className="mini-label">Your practice, at your pace</p>
                  <h3>{challengeDone.length}<span> / 90 days</span></h3>
                  <button type="button" className="secondary-button" onClick={() => setChallengeOpen((prev) => !prev)} aria-expanded={challengeOpen}>
                    {challengeOpen ? 'Close day tracker' : 'Open day tracker'}
                  </button>
                </div>
              </div>
              {challengeOpen && (
                <div className="challenge-grid">
                  {challengeEntries.map((entry) => (
                    <button key={entry.day} type="button" className={`day-dot ${challengeDone.includes(entry.day) ? 'done' : ''}`} onClick={() => handleChallengeToggle(entry.day)} aria-pressed={challengeDone.includes(entry.day)} aria-label={`Day ${entry.day}${challengeDone.includes(entry.day) ? ', completed' : ''}`}>
                      {entry.day}
                    </button>
                  ))}
                </div>
              )}
              {challengeToday && (
                <div className="today-card">
                  <div>
                    <span className="mini-label">Today</span>
                    <h3>Day {challengeToday.day}</h3>
                  </div>
                  <p><strong>Theme:</strong> {challengeToday.theme}</p>
                  <p><strong>Affirmation:</strong> {challengeToday.affirmation}</p>
                  <p><strong>Action:</strong> {challengeToday.action}</p>
                  <p><strong>Gratitude:</strong> {challengeToday.gratitude}</p>
                  <button type="button" className="primary-button compact" onClick={() => handleChallengeToggle(challengeToday.day)}>
                    {challengeDone.includes(challengeToday.day) ? 'Mark undone' : 'Mark done'}
                  </button>
                </div>
              )}
            </div>
          </motion.section>

          <motion.section id="reset" className="container section-spacing practice-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading narrow">
              <span className="eyebrow">A small return</span>
              <h2>A gentle reset for wherever you are.</h2>
              <p>There is nothing to get right here. Take what is useful and leave the rest.</p>
            </div>
            <div className="practice-grid">
              {resetPractice.map((step) => (
                <article key={step.number} className="practice-step">
                  <span className="practice-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section id="practice" className="container section-spacing rhythm-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading narrow">
              <span className="eyebrow">Small moments, throughout the day</span>
              <h2>Make a little room for your own rhythm.</h2>
            </div>
            <div className="daily-rhythm-grid">
              {dailyRhythm.map((moment) => (
                <article key={moment.time} className="daily-rhythm-card">
                  <span className="mini-label">{moment.time}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                  <blockquote>{moment.prompt}</blockquote>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading">
              <span className="eyebrow">Real stories</span>
              <h2>Gentle shifts that people feel long after they leave.</h2>
            </div>
            <div className="story-grid">
              {[
                'One client noticed she stopped reacting before thinking. Another felt the tension in her shoulders soften on the first week.',
                'A quiet reset became a new rhythm, and the difference showed up in how she spoke to herself and how she moved through the day.',
                'The pattern was never really a failure; it was a signal asking for a new pace and more self-kindness.',
              ].map((story) => (
                <blockquote key={story} className="story-card">“{story}”</blockquote>
              ))}
            </div>
          </motion.section>

          <motion.section id="about" className="container section-spacing about-wrap" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="about-photo">
              <img className="photo-frame" src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85" alt="Soft morning light over a quiet field" loading="lazy" />
            </div>
            <div className="about-copy">
              <span className="eyebrow">About you</span>
              <h2>Helping people return to the rhythm that already belongs to them.</h2>
              <p>I work with people who are tired of forcing themselves to feel calm and want a gentler, more intuitive path back to alignment.</p>
              <p>Rhythm of Life began as a reminder that emotional wellbeing is not about fixing yourself. It is about creating more room to feel, breathe and begin again.</p>
            </div>
          </motion.section>

          <motion.section className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading narrow">
              <span className="eyebrow">Find Your Rhythm</span>
              <h2>Three quiet questions. One clearer sense of where you are.</h2>
            </div>
            {!result ? (
              <div className="quiz-card">
                <p className="question-index">Question {quizStep + 1} of {quizQuestions.length}</p>
                <h3>{currentQuestion.question}</h3>
                <div className="quiz-options">
                  {currentQuestion.options.map((option) => (
                    <button key={option.text} type="button" className="quiz-option" onClick={() => handleAnswer(option.outcome)}>
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="quiz-card result-card">
                <span className="eyebrow">Your rhythm</span>
                <h3>{result}</h3>
                <p>{quizResults[result].insight}</p>
                <div className="affirmation-pill">{quizResults[result].affirmation}</div>
                <a className="primary-button" href={waLink(`Hi, my rhythm result is ${result}. I would like to know more about Rhythm of Life.`)} target="_blank" rel="noreferrer">
                  Continue on WhatsApp
                  <ArrowRight size={18} />
                </a>
              </div>
            )}
          </motion.section>

          <motion.section className="container section-spacing" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <div className="section-heading narrow">
              <span className="eyebrow">FAQ</span>
              <h2>Clear answers, soft boundaries.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <div key={faq.question} className="faq-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="container section-spacing final-cta" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <h2>{finalCta.heading}</h2>
            <p>{finalCta.body}</p>
            <a className="primary-button" href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer">
              Continue on WhatsApp
              <ArrowRight size={18} />
            </a>
          </motion.section>
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p>Rhythm of Life offers wellbeing and self-reflection support. It is not a substitute for medical or psychological care.</p>
            <div className="footer-links">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
            <button type="button" className="site-reference" onClick={secretTap}>
              rhythm of life · site reference · v1
            </button>
          </div>
        </footer>
      </div>

      <div className="mobile-cta">
        <a href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
          <FaWhatsapp />
        </a>
      </div>

      {secretOpen && (
        <div className="secret-room" role="dialog" aria-modal="true">
          <div className="secret-door">
            <div className="door-panel left-panel" />
            <div className="door-panel right-panel" />
            <div className="door-seam" />
          </div>
          <div className="room-shell">
            <div className="room-header">
              <span>Inner Room</span>
              <button type="button" onClick={() => setSecretOpen(false)}>Close</button>
            </div>
            <div className="room-content">
              <div className="room-column">
                <h3>Sound library</h3>
                <div className="sound-grid">
                  {Object.keys(tracks).map((trackId) => (
                    <button key={trackId} type="button" className={`track-button ${selectedTrack === trackId ? 'active' : ''}`} onClick={() => { setSelectedTrack(trackId); setSoundEnabled(true) }}>
                      {trackId}
                    </button>
                  ))}
                </div>
                <div className="mini-controls">
                  <button type="button" onClick={() => setSoundEnabled((prev) => !prev)}>{soundEnabled ? 'Pause' : 'Play'}</button>
                  <button type="button" onClick={() => setSelectedTrack('ocean')}>Ocean</button>
                </div>
              </div>
              <div className="room-column">
                <h3>Notes</h3>
                <p>The public page keeps the framing light and curious. The Inner Room holds the deeper method, session details and private context.</p>
                <ul>
                  <li>Self-reflection is the core support.</li>
                  <li>Breath, pacing and presence work together.</li>
                  <li>Affirmations are invitations, not force.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
