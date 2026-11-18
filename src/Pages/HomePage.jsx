import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { projects } from '../data/projects'
import './HomePage.css'

const toolkit = ['JavaScript', 'React', 'Vue', 'CSS', 'Tailwind', 'Bootstrap', 'Sass', 'PostgreSQL']
const process = [
  { number: '01', title: 'Listen closely', text: 'Start with the people, the problem, and what success should feel like.' },
  { number: '02', title: 'Shape the idea', text: 'Find the clearest story, then turn it into a thoughtful visual system.' },
  { number: '03', title: 'Make it real', text: 'Build, refine, and launch a fast experience that feels right everywhere.' },
]

function tiltElement(event, selector, amount = 5) {
  const element = event.currentTarget.matches(selector) ? event.currentTarget : event.currentTarget.querySelector(selector)
  if (!element) return
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height
  element.style.setProperty('--tilt-x', `${((x - 0.5) * amount * 2).toFixed(2)}deg`)
  element.style.setProperty('--tilt-y', `${((0.5 - y) * amount * 2).toFixed(2)}deg`)
  element.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`)
  element.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`)
}

function resetTilt(event, selector) {
  const element = event.currentTarget.matches(selector) ? event.currentTarget : event.currentTarget.querySelector(selector)
  if (!element) return
  element.style.setProperty('--tilt-x', '0deg')
  element.style.setProperty('--tilt-y', '0deg')
  element.style.setProperty('--pointer-x', '50%')
  element.style.setProperty('--pointer-y', '50%')
}

export default function HomePage() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4)
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.hash])

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [showAllProjects])

  return (
    <main id="home" className="home-page portfolio-page">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow hero-enter hero-enter-1"><span className="status-dot" /> Independent designer & developer <span className="hero-location">Based in Syria · Working worldwide</span></p>
            <h1 id="hero-title" className="home-page-title hero-enter hero-enter-2">I make digital<br /><em>feel different.</em></h1>
            <p className="home-page-description hero-enter hero-enter-3">I’m Fouad Smlaji. I bring thoughtful design and careful engineering together to make useful things feel unmistakably human.</p>
            <div className="hero-actions hero-enter hero-enter-4">
              <a href="#projects" className="home-page-button">Explore selected work <span aria-hidden="true">↘</span></a>
              <a href="#about" className="hero-text-link">A little about me <span aria-hidden="true">↓︎</span></a>
            </div>
            <div className="hero-footnote"><span>Independent practice</span><span>Design · Development · Direction</span></div>
          </div>
          <div className="hero-art hero-enter hero-enter-3" aria-label="A glimpse into Fouad’s creative process" onMouseMove={(event) => tiltElement(event, '.hero-art', 3)} onMouseLeave={(event) => resetTilt(event, '.hero-art')}>
            <div className="hero-art-topline"><span>IDEAS IN MOTION</span><span>© FS — {new Date().getFullYear()}</span></div>
            <div className="hero-video-wrap">
              <video src={`${import.meta.env.BASE_URL}assets/videos/Intro.mp4`} autoPlay loop muted playsInline aria-label="Abstract creative process animation" />
              <span className="hero-video-caption">Curiosity, made visible.</span>
            </div>
            <div className="hero-art-stamp" aria-hidden="true"><span>GOOD<br />THINGS<br />TAKE<br /><i>intention</i></span></div>
            <div className="hero-art-bottom"><span>DESIGN THAT THINKS.</span><span>CODE THAT CARES.</span></div>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#about" aria-label="Scroll to about section"><span /> Scroll to explore</a>
      </section>

      <div className="ticker" aria-label="Design with intention. Build for people. Make it matter.">
        <div className="ticker-track" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i}>Design with intention · Build for people · Make it matter</span>)}</div>
      </div>

      <section id="about" className="about-section portfolio-about">
        <div className="section-label"><span>01 / A little about me</span><span>Curiosity, craft, and care</span></div>
        <div className="about-layout">
          <div className="about-heading-wrap" data-reveal="up"><p className="section-kicker">The person behind the pixels</p><h2 className="about-title">Good work<br />starts with<br /><em>good questions.</em></h2></div>
          <div className="about-copy" data-reveal="up" style={{ '--reveal-delay': '120ms' }}><p className="about-lead">I’m a designer and developer who cares about how things work, how they look, and most of all, how they make people feel.</p><p>I partner with people who want to make something meaningful. I help shape the idea, find its visual voice, and bring it to life on the web — with clarity at every step.</p><a href="#contact" className="inline-link">A project on your mind? <span aria-hidden="true">↗︎</span></a></div>
        </div>
        <div className="toolkit-row" data-reveal="up"><div className="toolkit-label"><div><b>My toolkit</b><small>Tools I reach for</small></div></div><div className="toolkit-list">{toolkit.map((item, index) => <span key={item} style={{ '--reveal-delay': `${index * 45}ms` }}>{item}</span>)}</div></div>
      </section>

      <section id="projects" className="projects-showcase portfolio-projects">
        <div className="projects-inner">
          <div className="section-label section-label-light" data-reveal="up"><span>02 / Selected work</span><span>A collection of collaborations</span></div>
          <div className="projects-header" data-reveal="up"><div><p className="section-kicker">A few things I’ve made</p><h2 className="projects-title">Made with<br /><em>meaning.</em></h2></div><p className="projects-intro">Different people, different challenges. One shared belief: the details make the difference.</p></div>
          <div className="projects-cards">
            {visibleProjects.map((project, index) => (
              <Link key={project.name} to={`/project/${index}`} className="project-item" data-reveal="up" style={{ '--reveal-delay': `${(index % 4) * 75}ms` }} onMouseMove={(event) => tiltElement(event, '.project-card', 2.5)} onMouseLeave={(event) => resetTilt(event, '.project-card')}>
                <article className="project-card"><span className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} <i>/ {String(projects.length).padStart(2, '0')}</i></span><div className="project-thumb"><img src={project.thumb} alt={project.name} style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined} loading={index > 1 ? 'lazy' : 'eager'} /></div><span className="project-open" aria-hidden="true">↗︎</span></article>
                <div className="project-meta"><div className="project-meta-row"><div className="project-icon"><img src={project.logo || project.thumb} alt="" loading="lazy" /></div><div className="project-text"><span className="project-name">{project.name}</span><span className="project-location">{project.location}</span></div></div><span className="project-meta-arrow" aria-hidden="true">↗︎</span></div>
              </Link>
            ))}
          </div>
          <div className="projects-footer"><button className="projects-button" type="button" onClick={() => setShowAllProjects((prev) => !prev)}>{showAllProjects ? 'Show fewer projects' : 'Explore all projects'} <span aria-hidden="true">{showAllProjects ? '↑︎' : '↓︎'}</span></button></div>
        </div>
      </section>

      <section className="approach-section">
        <div className="approach-inner"><div className="section-label" data-reveal="up"><span>03 / How I work</span><span>Simple on purpose</span></div><div className="approach-heading" data-reveal="up"><p className="section-kicker">From first thought to final detail</p><h2>A good process<br />makes room for <em>good work.</em></h2></div><div className="process-grid">{process.map((step, index) => <article className="process-card" data-reveal="up" style={{ '--reveal-delay': `${index * 100}ms` }} key={step.number}><span className="process-number">{step.number}</span><span className="process-mark" aria-hidden="true">↗︎</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="approach-note" data-reveal="up">Thoughtful by design. Built to last.</div></div>
      </section>

      <section id="contact" className="contact-section portfolio-contact">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="contact-content" data-reveal="up"><p className="section-kicker">04 / Your turn</p><p className="contact-pretitle">Have a good one in mind?</p><h2 className="contact-title">Let’s make it<br /><em>real.</em></h2><p className="contact-subtitle">Tell me what you’re working on. I’d love to hear about it.</p><a className="contact-email" href="mailto:fouad.smlaji@gmail.com">fouad.smlaji@gmail.com <span aria-hidden="true">↗︎</span></a><div className="contact-socials"><a className="contact-link" href="https://www.linkedin.com/in/fouad-smlaji-3272263a2" target="_blank" rel="noreferrer">LinkedIn ↗︎</a><a className="contact-link" href="https://github.com/fouadsmlaji" target="_blank" rel="noreferrer">GitHub ↗︎</a><a className="contact-link" href="tel:+96358987736">+963 958 987 736</a></div></div>
        <footer className="site-footer"><a href="#home">FOUAD SMLAJI <span>© {new Date().getFullYear()}</span></a><span>Made with curiosity and care</span><a href="#home">Back to top ↑︎</a></footer>
      </section>
    </main>
  )
}
