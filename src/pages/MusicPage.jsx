import PageIntro from '../components/PageIntro'

const videoTitle = 'The Best Devi Prayer 432 Hz - Ma Amba Lalitha Devi'

export default function MusicPage() {
  return (
    <>
      <PageIntro
        eyebrow="Music"
        title="A moment for devotional listening."
        description="Listen to the featured prayer here, whenever it feels right for you."
      />
      <section className="container section-spacing music-page">
        <div className="music-player-copy">
          <span className="mini-label">Featured devotional</span>
          <h2>{videoTitle}</h2>
          <p>Shared from YouTube. Press play when you are ready to listen.</p>
        </div>
      </section>
    </>
  )
}
