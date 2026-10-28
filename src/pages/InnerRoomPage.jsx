import { useOutletContext } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import { tracks } from '../lib/audio'

export default function InnerRoomPage() {
  const { soundEnabled, setSoundEnabled, selectedTrack, setSelectedTrack } = useOutletContext()

  return (
    <>
      <PageIntro eyebrow="Inner Room" title="A quieter space for the work beneath the surface." description="A small library of ambience and notes on the rhythm work." />
      <section className="container section-spacing inner-room-page">
        <div className="room-content">
          <article className="room-column">
            <h3>Sound library</h3>
            <div className="sound-grid">{Object.keys(tracks).map((trackId) => <button key={trackId} type="button" className={`track-button${selectedTrack === trackId ? ' active' : ''}`} onClick={() => { setSelectedTrack(trackId); setSoundEnabled(true) }}>{trackId}</button>)}</div>
            <div className="mini-controls"><button type="button" onClick={() => setSoundEnabled((enabled) => !enabled)}>{soundEnabled ? 'Pause ambience' : 'Play ambience'}</button></div>
          </article>
          <article className="room-column">
            <h3>Notes</h3>
            <p>The public pages keep the framing light and curious. This room holds a few reminders about the practice.</p>
            <ul><li>Self-reflection is the core support.</li><li>Breath, pacing, and presence work together.</li><li>Affirmations are invitations, not force.</li></ul>
          </article>
        </div>
      </section>
    </>
  )
}