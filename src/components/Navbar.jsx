import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const NavLinks = ({ onClick }) => (
    <>
      <a href="#work" onClick={onClick} className="hover:text-white transition-colors">Work</a>
      <a href="#skills" onClick={onClick} className="hover:text-white transition-colors">Skills</a>
      <a href="#about" onClick={onClick} className="hover:text-white transition-colors">About</a>
      <a href="#contact" onClick={onClick} className="hover:text-white transition-colors">Contact</a>
    </>
  )

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="text-sm font-semibold tracking-wider uppercase">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-orange-300 bg-clip-text text-transparent">Developer Portfolio</span>
        </a>
        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <NavLinks />
          <div className="flex items-center gap-4">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><Github size={18} /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={18} /></a>
            <a href="#contact" aria-label="Email" className="hover:text-white"><Mail size={18} /></a>
          </div>
        </nav>
        {/* Mobile */}
        <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/10" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          {open ? <X size={18}/> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-white/10 backdrop-blur"
          >
            <div className="px-4 py-4 flex flex-col gap-3 text-sm text-white/85">
              <NavLinks onClick={() => setOpen(false)} />
              <div className="flex items-center gap-4 pt-2">
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><Github size={18} /></a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={18} /></a>
                <a href="#contact" aria-label="Email" className="hover:text-white"><Mail size={18} /></a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
