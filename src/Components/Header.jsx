import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Header.css'
const logoUrl = `${import.meta.env.BASE_URL}assets/images/Logo/LogoTransparent.png`

function scrollToContact() {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isProjectDetails = location.pathname.startsWith('/project')
  const isHome = location.pathname === '/' || location.pathname === ''

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 50)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

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
      navigate({ pathname: '/', hash: 'contact' })
    }
  }

  return (
    <header className={`header ${showScrolledBg ? 'header-scrolled' : ''} ${isProjectDetails ? 'header-project-page' : ''} ${menuOpen ? 'header-menu-open' : ''}`}>
      <nav className="header-nav">
        <div className="header-nav-left">
          <img src={logoUrl} alt="Fouad logo" className="header-logo" />
        </div>
        <div className="header-nav-middle">
          <ul className="header-nav-links">
            <li><a href="#home" className="header-nav-link" onClick={closeMenu}>Home</a></li>
            <li><a href="#about" className="header-nav-link" onClick={closeMenu}>About</a></li>
            <li><a href="#projects" className="header-nav-link" onClick={closeMenu}>Projects</a></li>
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
      <div className="header-mobile-menu" aria-hidden={!menuOpen}>
        <ul className="header-mobile-links">
          <li><a href="#home" className="header-mobile-link" onClick={closeMenu}>Home</a></li>
          <li><a href="#about" className="header-mobile-link" onClick={closeMenu}>About</a></li>
          <li><a href="#projects" className="header-mobile-link" onClick={closeMenu}>Projects</a></li>
          <li><a href="#contact" className="header-mobile-link" onClick={handleContactClick}>Contact</a></li>
          <li>
            <a href="#contact" className="header-nav-button header-mobile-button" onClick={handleContactClick}>Contact</a>
          </li>
        </ul>
      </div>
    </header>
  )
}
