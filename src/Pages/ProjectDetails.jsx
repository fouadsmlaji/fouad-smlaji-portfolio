import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { projects } from '../data/projects'

import './ProjectDetails.css'

export default function ProjectDetails() {
  const { id } = useParams()
  const index = parseInt(id, 10)
  const project = Number.isNaN(index) || index < 0 || index >= projects.length
    ? null
    : projects[index]

  const [lightboxImage, setLightboxImage] = useState(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setLightboxImage(null)
    }
    if (lightboxImage) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [lightboxImage])

  if (!project) {
    return (
      <main className="project-details-page">
        <div className="project-details-content">
          <p>Project not found.</p>
          <Link to="/#projects" className="project-details-back">Back to projects</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="project-details-page">
      <div className="project-details-content">
        <Link to="/#projects" className="project-details-back">
          <span className="project-details-back-arrow">←</span> Back to projects
        </Link>
        <header className="project-details-header">
          <span className="project-details-location-badge">{project.location}</span>
          <h1 className="project-details-title">{project.name}</h1>
        </header>
        <button
          type="button"
          className="project-details-hero project-details-image-trigger"
          onClick={() => setLightboxImage(project.thumb)}
          aria-label="View full size"
        >
          <img
            src={project.thumb}
            alt={project.name}
            className="project-details-thumb"
            style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
          />
        </button>
        {project.gallery && project.gallery.length > 0 && (
          <div className="project-details-gallery">
            {project.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                className="project-details-gallery-item project-details-image-trigger"
                onClick={() => setLightboxImage(src)}
                aria-label={`View screenshot ${i + 1} full size`}
              >
                <img src={src} alt={`${project.name} screenshot ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
        {lightboxImage && (
          <div
            className="project-details-lightbox"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              type="button"
              className="project-details-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="project-details-lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxImage} alt="" />
            </div>
          </div>
        )}
        <section className="project-details-body">
          <h2 className="project-details-body-title">About This Project</h2>
          <p className="project-details-description">{project.description || 'No description available.'}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-details-link"
            >
              View project
              <svg className="project-details-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </section>
      </div>
    </main>
  )
}
