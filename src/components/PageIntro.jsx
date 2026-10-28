export default function PageIntro({ eyebrow, title, description }) {
  return (
    <header className="page-intro container section-spacing">
      <span className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</span>
      <h1>{title}</h1>
      {description && <p className="lead">{description}</p>}
    </header>
  )
}