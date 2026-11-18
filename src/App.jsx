import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import ProjectDetails from './Pages/ProjectDetails'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow
      setIsLoading(false)
    }, prefersReducedMotion ? 500 : 1500)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <ParallaxProvider>
      {isLoading && (
        <div className="intro-loader" role="status" aria-label="Loading portfolio">
          <div className="intro-loader-content">
            <div className="intro-loader-brand"><span className="intro-loader-mark">F<span>.</span></span><span className="intro-loader-name">FOUAD<br />SMLAJI</span></div>
            <p className="intro-loader-caption">Thoughtful design. Careful code.</p>
            <div className="intro-loader-track" aria-hidden="true"><span /></div>
            <div className="intro-loader-foot"><span>INDEPENDENT DESIGNER & DEVELOPER</span><span>FS — {new Date().getFullYear()}</span></div>
          </div>
          <span className="intro-loader-orbit" aria-hidden="true">✳</span>
        </div>
      )}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </ParallaxProvider>
  )
}

export default App
