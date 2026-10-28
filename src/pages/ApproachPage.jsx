import { CheckCircle2, Heart, Sparkles, Waves } from 'lucide-react'
import PageIntro from '../components/PageIntro'
import SectionHeading from '../components/SectionHeading'
import { audience, methods, mirrorLines, shiftPoints } from '../content/site'

export default function ApproachPage() {
  return (
    <>
      <PageIntro eyebrow="The approach" title="Patterns are signals, not character flaws." description="A calm, reflective way to understand what keeps repeating and make room for a different response." />
      <section className="container section-spacing">
        <SectionHeading eyebrow="The mirror" title="Does any of this feel familiar?" />
        <div className="mirror-grid">
          {mirrorLines.map((line) => <article key={line} className="mirror-card"><Heart size={18} /><p>{line}</p></article>)}
        </div>
      </section>
      <section className="container section-spacing">
        <SectionHeading eyebrow="The shift" title="Everything has a rhythm, so your patterns do too." />
        <div className="shift-grid">
          {shiftPoints.map((point, index) => <article key={point} className="shift-card"><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p></article>)}
        </div>
      </section>
      <section className="container section-spacing">
        <SectionHeading eyebrow="Methods" title="Ways to support a steadier rhythm." />
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
      </section>
      <section className="container section-spacing">
        <SectionHeading eyebrow="Good to know" title="Support that matches your current season." />
        <div className="audience-grid">
          <article className="panel"><h3>For you</h3><ul>{audience.forYou.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul></article>
          <article className="panel muted-panel"><h3>Not for you</h3><ul>{audience.notForYou.map((item) => <li key={item}><Waves size={16} />{item}</li>)}</ul></article>
        </div>
      </section>
    </>
  )
}