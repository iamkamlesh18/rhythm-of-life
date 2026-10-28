import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import PageIntro from '../components/PageIntro'
import { quizQuestions, quizResults } from '../content/quiz'
import { waLink } from '../lib/whatsapp'

export default function QuizPage() {
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const currentQuestion = quizQuestions[quizStep]

  const answerQuestion = (outcome) => {
    const nextAnswers = [...answers, outcome]
    setAnswers(nextAnswers)
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep((step) => step + 1)
      return
    }

    const tally = { Scattered: 0, Heavy: 0, Stuck: 0, Flowing: 0 }
    nextAnswers.forEach((entry) => { tally[entry] += 1 })
    setResult(Object.entries(tally).reduce((best, entry) => entry[1] > best[1] ? entry : best)[0])
  }

  const restart = () => {
    setQuizStep(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <>
      <PageIntro eyebrow="Find your rhythm" title="Three questions. A moment to check in." description="This reflection is a starting point, not a diagnosis. Choose what feels closest to your experience today." />
      <section className="container section-spacing quiz-page">
        {!result ? (
          <div className="quiz-card">
            <p className="question-index">Question {quizStep + 1} of {quizQuestions.length}</p>
            <div className="quiz-progress" aria-hidden="true"><span style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} /></div>
            <h3>{currentQuestion.question}</h3>
            <div className="quiz-options">{currentQuestion.options.map((option) => <button key={option.text} type="button" className="quiz-option" onClick={() => answerQuestion(option.outcome)}>{option.text}</button>)}</div>
          </div>
        ) : (
          <div className="quiz-card result-card">
            <span className="eyebrow">Your rhythm today</span>
            <h2>{result}</h2>
            <p>{quizResults[result].insight}</p>
            <div className="affirmation-pill">{quizResults[result].affirmation}</div>
            <div className="quiz-result-actions">
              <a className="primary-button" href={waLink(`Hi, my rhythm result is ${result}. I would like to know more about Rhythm of Life.`)} target="_blank" rel="noreferrer">Continue on WhatsApp <ArrowRight size={18} /></a>
              <button type="button" className="secondary-button" onClick={restart}>Start again</button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}