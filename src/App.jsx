import { Link, Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AboutPage from './pages/AboutPage'
import ApproachPage from './pages/ApproachPage'
import ChallengePage from './pages/ChallengePage'
import FaqPage from './pages/FaqPage'
import HomePage from './pages/HomePage'
import InnerRoomPage from './pages/InnerRoomPage'
import MusicPage from './pages/MusicPage'
import PracticePage from './pages/PracticePage'
import QuizPage from './pages/QuizPage'
import './App.css'

function NotFoundPage() {
  return (
    <section className="container section-spacing not-found-page">
      <span className="eyebrow">A small detour</span>
      <h1>This page isn&apos;t on the map.</h1>
      <Link className="primary-button" to="/">Return home</Link>
    </section>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="approach" element={<ApproachPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="challenge" element={<ChallengePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="music" element={<MusicPage />} />
        <Route path="find-your-rhythm" element={<QuizPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="inner-room" element={<InnerRoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
