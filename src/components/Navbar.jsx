import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#timeline', label: 'Timeline' },
  { href: '#analysis', label: 'Analysis' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = links.map(({ href }) => {
        const el = document.querySelector(href)
        if (!el) return { id: href, top: Infinity }
        return { id: href, top: el.getBoundingClientRect().top }
      })

      const current = sections
        .filter(({ top }) => top <= 120)
        .sort((a, b) => b.top - a.top)[0]

      setActiveSection(current ? current.id : '')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-gradient">CG</span>
          <span className="text-white/90"> Timeline</span>
        </a>

        <div className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors ${
                activeSection === link.href
                  ? 'text-gradient font-semibold'
                  : 'text-white/70 hover:text-cyan'
              }`}
            >
              {link.label}
              {activeSection === link.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-cyan via-glow to-magenta" />
              )}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden sm:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    activeSection === link.href
                      ? 'text-gradient font-semibold'
                      : 'text-white/70 hover:text-cyan'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
