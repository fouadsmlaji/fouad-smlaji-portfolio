import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax'

import { projects } from '../data/projects'
import './HomePage.css'
import '../Media.css'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)

  const aboutSectionRef = useRef(null)
  const projectsSectionRef = useRef(null)
  const wordsSectionRef = useRef(null)

  const [aboutVisible, setAboutVisible] = useState(false)
  const [projectsVisible, setProjectsVisible] = useState(false)
  const [wordsVisible, setWordsVisible] = useState(false)
  const invertSectionRef = useRef(null)
  const [invertVisible, setInvertVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const target = projectsSectionRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('scrolled', isScrolled)
    return () => document.body.classList.remove('scrolled')
  }, [isScrolled])

  useEffect(() => {
    const target = aboutSectionRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const target = wordsSectionRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWordsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const section = aboutSectionRef.current
    if (!section) return undefined

    let rafId = null
    const minWidth = 70
    const maxWidth = 100
    const minHeight = 420
    const maxHeight = 1020
    const minOffset = 60
    const maxOffset = -60
    const minDepth = -60
    const maxDepth = 30

    const update = () => {
      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const start = viewport
      const end = -rect.height * 0.2
      const progress = 1 - Math.min(Math.max((rect.top - end) / (start - end), 0), 1)

      const width = minWidth + progress * (maxWidth - minWidth)
      const height = minHeight + progress * (maxHeight - minHeight)
      const offset = minOffset + progress * (maxOffset - minOffset)
      const depth = minDepth + progress * (maxDepth - minDepth)

      section.style.setProperty('--about-panel-width', `${width}%`)
      section.style.setProperty('--about-panel-height', `${height}px`)
      section.style.setProperty('--about-panel-offset', `${offset}px`)
      section.style.setProperty('--about-panel-depth', `${depth}px`)
      rafId = null
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])



  return (
   <div id="home" className={`home-page ${isScrolled ? 'scrolled' : ''}`}>
    <div className="home-page-content">
    <h1 className="home-page-title fadeIn">
      {isScrolled ? 'And Rise As' : 'Where Ideas '}
      <br />
      {isScrolled ? 'Worlds Of Code.' : 'Begin As Wispers.'}
    </h1>
    <p className="home-page-description fadeIn">
      {isScrolled
        ? 'Scroll to discover a new perspective.'
        : "Discover, search, and save what's next."}
    </p>
    <a href="#about" className="home-page-button fadeIn">Get Started</a>
    </div>

    <section className="banner-section" aria-label="Programming values banner">
      <div className="banner-track">
        <span className="banner-text">
          Code with purpose • Build for people • Ship with care • Debug with
          patience • Learn endlessly •
        </span>
        <span className="banner-text" aria-hidden="true">
          Code with purpose • Build for people • Ship with care • Debug with
          patience • Learn endlessly •
        </span>
      </div>
    </section>

    <section
      id="about"
      ref={aboutSectionRef}
      className={`about-section ${aboutVisible ? 'about-visible' : ''}`}
    >
      <h2 className="about-title">
        <span className="about-title-line">Discover The Mind </span>
        <span className="about-title-line">Behind The Code.</span>
      </h2>
      <div className="about-panel">
        <video
          className="about-panel-video"
          src={`${import.meta.env.BASE_URL}assets/videos/Intro.mp4`}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>

    <section
      id="projects"
      className={`projects-showcase ${projectsVisible ? 'projects-visible' : ''}`}
      ref={projectsSectionRef}
    >
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title"> Selected Work That Speaks for Itself.</h2>
          <div className="projects-actions">
            <a href="#contact" className="projects-button primary">Book a call</a>
            <button
              className="projects-button"
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
            >
              {showAllProjects ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
        <div className={`projects-cards ${showAllProjects ? 'show-all' : ''}`}>
          {(showAllProjects ? projects : projects.slice(0, 4)).map((project, index) => (
            <Link
              key={project.name}
              to={`/project/${index}`}
              className={`project-item ${showAllProjects && index >= 4 ? 'project-item-extra' : ''}`}
            >
              <article className="project-card">
                <div className="project-thumb">
                  <img
                    src={project.thumb}
                    alt={project.name}
                    style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                  />
                </div>
              </article>
              <div className="project-meta">
                <div className="project-meta-row">
                  <div className="project-icon">
                    <img src={project.logo || project.thumb} alt="" />
                  </div>
                  <div className="project-text">
                    <span className="project-name">{project.name}</span>
                    <span className="project-location">{project.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    
    <section
      className={`Words-container ${wordsVisible ? 'words-visible' : ''}`}
      ref={wordsSectionRef}
    >
      <div className="words-arc" aria-hidden="true" />
      <div className="word-bubbles" aria-hidden="true">
        <span className="word-bubble bubble-1"></span>
        <span className="word-bubble bubble-2"></span>
        <span className="word-bubble bubble-3"></span>
        <span className="word-bubble bubble-4"></span>
        <span className="word-bubble bubble-5"></span>
      </div>
      <div className="words-container">
        <div className="word">
          <Parallax translateY={[200, -200]}>
            <h2 className="word-title">
              <span>Interfaces Whisper </span>
              <span className="word-line">
                <span>Intentions</span>
                <video
                  className="word-eye-video"
                  src={`${import.meta.env.BASE_URL}assets/videos/eye.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <span>Clearly.</span>
              </span>
            </h2>
          </Parallax>
        </div>
      </div>
    </section>

    <section
      className={`Words-container invert-section ${
        invertVisible ? 'invert-visible words-visible' : ''
      }`}
      ref={invertSectionRef}
    >
      <div className="invert-arc" aria-hidden="true"></div>
     
    </section>

    <section id="contact" className="contact-section">
      <div className="contact-content">
        <h2 className="contact-title">Let's Build Something Great</h2>
        <p className="contact-subtitle">
          Have a project in mind? Let's connect and make it happen.
        </p>
        <div className="contact-socials">
          <a className="contact-link" href="https://www.linkedin.com/in/fouad-smlaji-3272263a2" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a className="contact-link" href="https://github.com/fouadsmlaji" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a className="contact-link" href="tel:+96358987736" aria-label="Phone">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +963 958 987 736
          </a>
          <a className="contact-link" href="mailto:fouad.smlaji@gamil.com" aria-label="Email">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email
          </a>
        </div>
      </div>
      <div className="contact-arc" aria-hidden="true" />
    </section>
    </div>
  )
}
