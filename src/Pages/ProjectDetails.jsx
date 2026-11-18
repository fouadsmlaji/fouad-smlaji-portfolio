import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import './ProjectDetails.css'

export default function ProjectDetails() {
  const { id } = useParams()
  const index = Number.parseInt(id, 10)
  const project = Number.isNaN(index) || index < 0 || index >= projects.length ? null : projects[index]
  const [lightboxImage, setLightboxImage] = useState(null)
  const nextIndex = project ? (index + 1) % projects.length : 0

  useEffect(() => {
    if (!lightboxImage) return undefined
    const handleEscape = (event) => { if (event.key === 'Escape') setLightboxImage(null) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [lightboxImage])

  useEffect(() => {
    const targets = document.querySelectorAll('.project-details-page [data-reveal]')
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
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [project?.name])

  if (!project) {
    return <main className="project-details-page"><div className="project-details-content project-not-found"><span>404 / PROJECT NOT FOUND</span><h1>Lost in the<br /><em>wrong tab?</em></h1><Link to="/#projects" className="project-details-back">←︎ Back to selected work</Link></div></main>
  }

  const gallery = project.gallery || []
  return (
    <main className="project-details-page">
      <div className="project-details-content">
        <div className="project-details-topline" data-reveal="up"><Link to="/#projects" className="project-details-back"><span aria-hidden="true">←︎</span> All projects</Link><span>SELECTED WORK / {String(index + 1).padStart(2, '0')}</span></div>
        <header className="project-details-header" data-reveal="up">
          <div className="project-details-heading"><p className="project-details-kicker">A project by Fouad Smlaji</p><h1 className="project-details-title">{project.name}<sup>{String(index + 1).padStart(2, '0')}</sup></h1></div>
          <div className="project-details-summary"><span className="project-details-location-badge">{project.location}</span><p>A digital experience shaped around people, purpose, and the details that matter.</p>{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-details-link">Visit live project <span aria-hidden="true">↗︎</span></a>}</div>
        </header>

        <button type="button" className="project-details-hero project-details-image-trigger" data-reveal="scale" onClick={() => setLightboxImage(project.thumb)} aria-label={`View ${project.name} cover image full size`}>
          <img src={project.thumb} alt={`${project.name} project preview`} className="project-details-thumb" style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined} />
          <span className="project-details-image-label">PROJECT PREVIEW <span aria-hidden="true">↗︎</span></span>
        </button>

        <section className="project-details-story" data-reveal="up">
          <div className="project-details-story-label"><span>THE STORY</span><span>01 — 03</span></div>
          <h2>Made to make<br /><em>a difference.</em></h2>
          <div className="project-details-body"><p className="project-details-description">{project.description || 'A thoughtful digital experience, designed and built around the people who use it.'}</p><div className="project-details-note"><p>Every project starts with listening. The best details come from understanding what matters most.</p></div></div>
        </section>

        {gallery.length > 0 && <section className="project-gallery-section"><div className="project-gallery-heading" data-reveal="up"><div><p className="project-details-kicker">A closer look</p><h2>Inside the<br /><em>experience.</em></h2></div><span>{String(gallery.length).padStart(2, '0')} IMAGES</span></div><div className="project-details-gallery">{gallery.map((src, imageIndex) => <button key={src} type="button" data-reveal="up" style={{ '--reveal-delay': `${imageIndex * 90}ms` }} className={`project-details-gallery-item gallery-frame-${imageIndex + 1}`} onClick={() => setLightboxImage(src)} aria-label={`View screenshot ${imageIndex + 1} full size`}><img src={src} alt={`${project.name} screen ${imageIndex + 1}`} loading="lazy" /><span>0{imageIndex + 1} <i>↗︎</i></span></button>)}</div></section>}

        {lightboxImage && <div className="project-details-lightbox" onClick={() => setLightboxImage(null)} role="dialog" aria-modal="true" aria-label="Project image viewer"><button type="button" className="project-details-lightbox-close" onClick={() => setLightboxImage(null)} aria-label="Close image viewer">×</button><div className="project-details-lightbox-inner" onClick={(event) => event.stopPropagation()}><img src={lightboxImage} alt={`${project.name} enlarged view`} /></div></div>}

        <nav className="project-next" data-reveal="up" aria-label="Project navigation"><Link to="/#projects" className="project-next-back">←︎ <span>Back to all work</span></Link><Link to={`/project/${nextIndex}`} className="project-next-link"><span>NEXT PROJECT / {String(nextIndex + 1).padStart(2, '0')}</span><strong>{projects[nextIndex].name}</strong><i aria-hidden="true">↗︎</i></Link></nav>
        <footer className="project-details-footer"><Link to="/">FOUAD SMLAJI</Link><span>Made with curiosity and care</span><a href="mailto:fouad.smlaji@gmail.com">LET’S TALK ↗︎</a></footer>
      </div>
    </main>
  )
}
