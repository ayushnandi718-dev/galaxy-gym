import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Membership', href: '#membership' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Tools', href: '#tools' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex flex-col leading-none group cursor-pointer">
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-medium">Galaxy</span>
            <span className="text-xl font-black tracking-wider text-white group-hover:text-[#C9A84C] transition-colors duration-300">MULTI GYM</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Alipurduar • Est. 2015</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                className="text-sm tracking-widest uppercase text-gray-400 hover:text-[#C9A84C] transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
              className="ml-4 px-6 py-2.5 text-xs tracking-widest uppercase font-semibold text-black gold-gradient rounded-full hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] transition-all duration-300 hover:scale-105"
            >
              Join Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white hover:text-[#C9A84C] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 px-6 pb-10 flex flex-col"
            style={{ background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(30px)' }}
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  className="text-2xl font-light tracking-widest uppercase text-gray-300 hover:text-[#C9A84C] transition-colors border-b border-white/5 pb-6"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
                className="mt-4 px-8 py-4 text-sm tracking-widest uppercase font-bold text-black gold-gradient rounded-full text-center"
              >
                Join Now — Free Trial
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
