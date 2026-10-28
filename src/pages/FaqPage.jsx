import PageIntro from '../components/PageIntro'
import { faqs } from '../content/site'

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow="Frequently asked questions" title="Clear answers, soft boundaries." description="A few practical details about the work and what to expect when you reach out." />
      <section className="container section-spacing faq-page">
        <div className="faq-list">{faqs.map((faq) => <article key={faq.question} className="faq-card"><h2>{faq.question}</h2><p>{faq.answer}</p></article>)}</div>
      </section>
    </>
  )
}