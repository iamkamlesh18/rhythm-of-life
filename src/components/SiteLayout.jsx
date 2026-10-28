import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageCircle, Pause, Play, Volume2, VolumeX, Wind } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import BreathWelcome from './BreathWelcome'
import { footerLinks } from '../content/site'
import { readStorage, writeStorage } from '../lib/storage'
import { playTrack, stopTrack, tracks } from '../lib/audio'
import { waLink } from '../lib/whatsapp'
import { useSecretTap } from '../hooks/useSecretTap'

const navigation = [
  { to: '/approach', label: 'Approach' },
  { to: '/practice', label: 'Practice' },
  { to: '/challenge', label: 'Challenge' },
  { to: '/music', label: 'Music' },
  { to: '/about', label: 'About' },
  { to: '/find-your-rhythm', label: 'Your rhythm' },
  { to: '/faq', label: 'FAQ' },
]

const devotionalVideoId = '9THx_-Y1YJg'

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)

  return new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.()
      resolve(window.YT)
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  })
}

export default function SiteLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const youtubeMountRef = useRef(null)
  const youtubePlayerRef = useRef(null)
  const [youtubePlaying, setYoutubePlaying] = useState(false)
  const [youtubeStarted, setYoutubeStarted] = useState(false)
  const isHomePage = location.pathname === '/'
  const isMusicPage = location.pathname === '/music'
  const [soundState, setSoundState] = useState(() => readStorage('rol.sound.v2', { enabled: true, track: 'spiritual' }))
  const soundEnabled = soundState.enabled !== false
  const selectedTrack = soundState.track || 'spiritual'

  const updateSoundState = useCallback((patch) => {
    setSoundState((current) => {
      const next = {
        enabled: true,
        track: 'spiritual',
        ...current,
        ...patch,
      }
      writeStorage('rol.sound.v2', next)
      return next
    })
  }, [])

  const unlockAmbientAudio = useCallback(() => {
    if (!soundEnabled) return
    const track = tracks[selectedTrack]
    if (!track) return
    if (!track.playing()) {
      track.play()
    }
    track.fade(track.volume() || 0, 0.35, 1500)
  }, [selectedTrack, soundEnabled])
  const [breathState, setBreathState] = useState(() => {
    try {
      const dismissed = window.sessionStorage.getItem('rol.breath-intro.v1') === 'done'
      return { dismissed, visible: !dismissed }
    } catch {
      return { dismissed: false, visible: true }
    }
  })
  const openInnerRoom = useSecretTap(() => navigate('/inner-room'))
  const playAmbient = useCallback((trackId = selectedTrack) => {
    Object.entries(tracks).forEach(([id, track]) => {
      if (id !== trackId && track?.playing()) stopTrack(id)
    })
    playTrack(trackId)
    updateSoundState({ enabled: true, track: trackId })
  }, [selectedTrack, updateSoundState])
  const toggleAmbient = useCallback(() => {
    if (soundEnabled) {
      updateSoundState({ enabled: false })
      return
    }
    playAmbient(selectedTrack)
  }, [playAmbient, selectedTrack, soundEnabled, updateSoundState])
  const finishBreath = useCallback(() => {
    try {
      window.sessionStorage.setItem('rol.breath-intro.v1', 'done')
    } catch {
      setBreathState({ dismissed: true, visible: false })
      return
    }
    setBreathState({ dismissed: true, visible: false })
  }, [])
  const reopenBreath = useCallback(() => {
    setBreathState((state) => ({ ...state, visible: true }))
  }, [])
  const toggleYoutube = useCallback(() => {
    const player = youtubePlayerRef.current
    if (!player) return
    if (youtubePlaying) player.pauseVideo()
    else player.playVideo()
  }, [youtubePlaying])

  useEffect(() => {
    let cancelled = false

    loadYouTubeApi().then((youtube) => {
      if (cancelled || !youtubeMountRef.current) return

      youtubePlayerRef.current = new youtube.Player(youtubeMountRef.current, {
        width: '800',
        height: '450',
        videoId: devotionalVideoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onStateChange: (event) => {
            const isPlaying = event.data === youtube.PlayerState.PLAYING
            setYoutubePlaying(isPlaying)
            if (isPlaying || event.data === youtube.PlayerState.PAUSED || event.data === youtube.PlayerState.ENDED) {
              setYoutubeStarted(true)
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      youtubePlayerRef.current?.destroy()
      youtubePlayerRef.current = null
    }
  }, [])

  useEffect(() => {
    writeStorage('rol.sound.v2', soundState)

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
  }, [selectedTrack, soundEnabled, soundState])

  useEffect(() => {
    const unlockOnInteraction = () => {
      if (!soundEnabled) return
      unlockAmbientAudio()
    }

    const events = ['pointerdown', 'pointerup', 'touchstart', 'keydown', 'mousedown']
    events.forEach((eventName) => {
      window.addEventListener(eventName, unlockOnInteraction, { passive: true })
    })

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, unlockOnInteraction)
      })
    }
  }, [soundEnabled, unlockAmbientAudio])


  return (
    <div className={`page-shell${isHomePage ? ' home-page-shell' : ''}`}>
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
        <Outlet context={{ soundEnabled, toggleAmbient, selectedTrack, playAmbient }} />
        <div className={`youtube-player-dock${isMusicPage ? ' is-expanded' : ''}`}>
          <div className="youtube-player-mount" ref={youtubeMountRef} />
        </div>
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
          <p className="audio-attribution">Ambient track: <a href="https://commons.wikimedia.org/wiki/File:Spiritual_Ambient_by_MusicLFiles.ogg" target="_blank" rel="noreferrer">“Spiritual Ambient” by MusicLFiles</a>, licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>.</p>
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

      <div className="floating-controls">
        <button type="button" className="sound-toggle" onClick={toggleAmbient} aria-label={soundEnabled ? 'Turn ambience off' : 'Turn ambience on'} title={soundEnabled ? 'Turn ambience off' : 'Turn ambience on'}>
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {youtubeStarted && (
          <button
            type="button"
            className={`youtube-toggle${youtubePlaying ? ' is-playing' : ''}`}
            onClick={toggleYoutube}
            aria-label={youtubePlaying ? 'Pause devotional music' : 'Play devotional music'}
            title={youtubePlaying ? 'Pause devotional music' : 'Play devotional music'}
          >
            {youtubePlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        )}

        {breathState.dismissed && !breathState.visible && (
          <button type="button" className="breath-reconnect" onClick={reopenBreath} aria-label="One-minute breathing reset">
            <Wind size={17} />
            <span className="breath-reconnect-label">One-minute breathing reset</span>
          </button>
        )}
      </div>

      {breathState.visible && <BreathWelcome onComplete={finishBreath} />}

    </div>
  )
}