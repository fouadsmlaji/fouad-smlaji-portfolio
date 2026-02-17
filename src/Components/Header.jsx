import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './Header.css'
import logoTransparent from '../../public/assets/images/Logo/LogoTransparent.png'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isProjectDetails = location.pathname.startsWith('/project')

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

  return (
    <header className={`header ${showScrolledBg ? 'header-scrolled' : ''} ${isProjectDetails ? 'header-project-page' : ''} ${menuOpen ? 'header-menu-open' : ''}`}>
      <nav className="header-nav">
        <div className="header-nav-left">
          <img src={logoTransparent} alt="Fouad logo" className="header-logo" />
        </div>
        <div className="header-nav-middle">
          <ul className="header-nav-links">
            <li><a href="#home" className="header-nav-link" onClick={closeMenu}>Home</a></li>
            <li><a href="#about" className="header-nav-link" onClick={closeMenu}>About</a></li>
            <li><a href="#projects" className="header-nav-link" onClick={closeMenu}>Projects</a></li>
            <li><a href="#contact" className="header-nav-link" onClick={closeMenu}>Contact</a></li>
          </ul>
        </div>
        <div className="header-nav-right">
          <Link to="/#contact" className="header-nav-button" onClick={closeMenu}>Contact</Link>
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
          <li><a href="#contact" className="header-mobile-link" onClick={closeMenu}>Contact</a></li>
          <li>
            <Link to="/#contact" className="header-nav-button header-mobile-button" onClick={closeMenu}>Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
