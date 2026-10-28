import { useEffect, useState } from 'react'
import { MessageCircle, Volume2, VolumeX } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { footerLinks } from '../content/site'
import { readStorage, writeStorage } from '../lib/storage'
import { stopTrack, tracks } from '../lib/audio'
import { waLink } from '../lib/whatsapp'
import { useSecretTap } from '../hooks/useSecretTap'

const navigation = [
  { to: '/approach', label: 'Approach' },
  { to: '/practice', label: 'Practice' },
  { to: '/challenge', label: '90-day practice' },
  { to: '/about', label: 'About' },
  { to: '/find-your-rhythm', label: 'Your rhythm' },
  { to: '/faq', label: 'FAQ' },
]

export default function SiteLayout() {
  const navigate = useNavigate()
  const [savedSound] = useState(() => readStorage('rol.sound.v1', { enabled: false, track: 'rain' }))
  const [soundEnabled, setSoundEnabled] = useState(() => Boolean(savedSound.enabled))
  const [selectedTrack, setSelectedTrack] = useState(() => savedSound.track || 'rain')
  const openInnerRoom = useSecretTap(() => navigate('/inner-room'))

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
    const stopWhenHidden = () => {
      if (document.hidden) {
        Object.entries(tracks).forEach(([id, track]) => {
          if (track && track.playing()) stopTrack(id)
        })
      }
    }

    document.addEventListener('visibilitychange', stopWhenHidden)
    return () => document.removeEventListener('visibilitychange', stopWhenHidden)
  }, [])

  return (
    <div className="page-shell">
      <header className="topbar container">
        <NavLink className="brand-mark" to="/" end aria-label="Rhythm of Life home">
          <span className="brand-symbol" aria-hidden="true">r.</span>
          <span>Rhythm<br />of Life</span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : undefined}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a href={waLink('Hi, I would like to know more about Rhythm of Life.')} className="header-link" target="_blank" rel="noreferrer">
          <MessageCircle size={16} /> Say hello
        </a>
      </header>

      <main>
        <Outlet context={{ soundEnabled, setSoundEnabled, selectedTrack, setSelectedTrack }} />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>Rhythm of Life offers wellbeing and self-reflection support. It is not a substitute for medical or psychological care.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <NavLink to="/find-your-rhythm">Find your rhythm</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            ))}
          </nav>
          <button type="button" className="site-reference" onClick={openInnerRoom}>
            rhythm of life · site reference · v1
          </button>
        </div>
      </footer>

      <div className="mobile-cta">
        <a href={waLink('Hi, I would like to know more about Rhythm of Life.')} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
          <MessageCircle size={23} />
        </a>
      </div>

      <button type="button" className="sound-toggle" onClick={() => setSoundEnabled((enabled) => !enabled)} aria-label={soundEnabled ? 'Turn ambience off' : 'Turn ambience on'} title={soundEnabled ? 'Turn ambience off' : 'Turn ambience on'}>
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </div>
  )
}