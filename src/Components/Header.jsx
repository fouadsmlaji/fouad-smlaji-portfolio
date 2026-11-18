import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import './Header.css'

const logoUrl = `${import.meta.env.BASE_URL}assets/images/Logo/LogoTransparent.png`

function scrollToContact() {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progressRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isProjectDetails = location.pathname.startsWith('/project')
  const isHome = location.pathname === '/' || location.pathname === ''

  const handleSectionClick = (section, event) => {
    event.preventDefault()
    closeMenu()
    if (isHome) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate({ pathname: '/', hash: `#${section}` })
    }
  }

  useEffect(() => {
    let frame = null
    const check = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
        frame = null
      })
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const showScrolledBg = scrolled && !isProjectDetails
  const closeMenu = () => setMenuOpen(false)

  const handleContactClick = (e) => {
    e.preventDefault()
    closeMenu()
    if (isHome) {
      scrollToContact()
    } else {
      navigate({ pathname: '/', hash: '#contact' })
    }
  }

  const headerContent = (
    <>
      <div ref={progressRef} className="site-scroll-progress" aria-hidden="true" />
      <header className={`header ${showScrolledBg ? 'header-scrolled' : ''} ${isProjectDetails ? 'header-project-page' : ''} ${isHome ? 'header-home-page' : ''} ${menuOpen ? 'header-menu-open' : ''}`}>
        <nav className="header-nav">
          <div className="header-nav-left">
            <a href={import.meta.env.BASE_URL} className="header-brand" aria-label="Fouad Smlaji home"><img src={logoUrl} alt="Fouad logo" className="header-logo" /></a>
          </div>
          <div className="header-nav-middle">
            <ul className="header-nav-links">
              <li><a href={`${import.meta.env.BASE_URL}#home`} className="header-nav-link" onClick={(e) => handleSectionClick('home', e)}>Home</a></li>
              <li><a href={`${import.meta.env.BASE_URL}#about`} className="header-nav-link" onClick={(e) => handleSectionClick('about', e)}>About</a></li>
              <li><a href={`${import.meta.env.BASE_URL}#projects`} className="header-nav-link" onClick={(e) => handleSectionClick('projects', e)}>Projects</a></li>
              <li><a href="#contact" className="header-nav-link" onClick={handleContactClick}>Contact</a></li>
            </ul>
          </div>
          <div className="header-nav-right">
            <a href="#contact" className="header-nav-button" onClick={handleContactClick}>Contact</a>
          </div>
          <button
            type="button"
            className="header-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="header-hamburger-line" />
            <span className="header-hamburger-line" />
            <span className="header-hamburger-line" />
          </button>
        </nav>
      </header>
      <div
        className="header-mobile-menu"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      >
        <ul className="header-mobile-links" onClick={(e) => e.stopPropagation()}>
          <li><a href={`${import.meta.env.BASE_URL}#home`} className="header-mobile-link" onClick={(e) => handleSectionClick('home', e)}>Home</a></li>
          <li><a href={`${import.meta.env.BASE_URL}#about`} className="header-mobile-link" onClick={(e) => handleSectionClick('about', e)}>About</a></li>
          <li><a href={`${import.meta.env.BASE_URL}#projects`} className="header-mobile-link" onClick={(e) => handleSectionClick('projects', e)}>Projects</a></li>
          <li><a href="#contact" className="header-mobile-link" onClick={handleContactClick}>Contact</a></li>
        </ul>
      </div>
    </>
  )

  return createPortal(headerContent, document.body)
}
