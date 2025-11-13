import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Cpu, Bot, Database, Globe2, Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import SplineScene from './components/SplineScene'

function Badge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/70 backdrop-blur border border-white/40 text-gray-800">
      {children}
    </span>
  )
}

function ProjectCard({ title, tags, description, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/60 backdrop-blur shadow-sm hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-blue-500/0 to-orange-500/0 group-hover:from-purple-500/10 group-hover:to-orange-500/10 transition-colors" />
      <div className="p-5 relative">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {tags.map((t, i) => (
            <Badge key={i}>{t}</Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>
    </motion.a>
  )
}

function MotionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Soft gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1226]/60 via-[#0b1021]/40 to-[#090e1b]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(124,58,237,0.25),transparent)]" />
      {/* Floating orbs */}
      {[
        { x: '10%', y: '20%', size: 220, color: 'from-purple-500/25 to-transparent', delay: 0 },
        { x: '80%', y: '30%', size: 180, color: 'from-blue-500/20 to-transparent', delay: 0.6 },
        { x: '50%', y: '70%', size: 260, color: 'from-orange-400/15 to-transparent', delay: 1.2 },
      ].map((o, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4, y: 0 }}
          animate={{ opacity: [0.35, 0.6, 0.35], y: [-6, 6, -6] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: o.delay, ease: 'easeInOut' }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${o.color} blur-3xl`}
          style={{ left: o.x, top: o.y, width: o.size, height: o.size }}
        />
      ))}
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-screen bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
    </div>
  )
}

export default function App() {
  const projects = useMemo(() => [
    {
      title: 'Conversational AI Agent',
      tags: ['AI Agent', 'RAG', 'LangChain'],
      description:
        'Voice-enabled assistant with retrieval-augmented generation and tool-use for browsing and data tasks.',
      link: 'https://github.com/',
    },
    {
      title: 'Full‑Stack SaaS Starter',
      tags: ['React', 'FastAPI', 'Auth', 'Stripe'],
      description:
        'Production-ready boilerplate with authentication, billing, dashboards, and responsive UI.',
      link: 'https://github.com/',
    },
    {
      title: 'ML Pipeline – MLOps',
      tags: ['Python', 'scikit‑learn', 'Airflow'],
      description:
        'Automated training, evaluation, and deployment pipeline with experiment tracking.',
      link: 'https://github.com/',
    },
  ], [])

  // URL controls for robot overlay
  const params = new URLSearchParams(window.location.search)
  const robotParam = params.get('robot')
  const robotEnabled = robotParam !== '0'

  const defaultRobotScene = 'https://prod.spline.design/Ogq0nP1mJr1nqjQz/scene.splinecode'
  const robotSceneParam = params.get('robotUrl')
  const robotScene = robotSceneParam || defaultRobotScene

  const robotScale = parseFloat(params.get('robotScale') || '1')
  const robotOpacity = parseFloat(params.get('robotOpacity') || '0.6')
  const robotOffsetX = parseFloat(params.get('robotX') || '0')
  const robotOffsetY = parseFloat(params.get('robotY') || '0')
  const robotBlend = params.get('robotBlend') || 'screen'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1226] via-[#0b1021] to-[#090e1b] text-white">
      <Navbar />

      {/* Hero Section with layered motion background */}
      <section className="relative pt-32 md:pt-36 pb-24" id="home">
        <div className="absolute inset-0 overflow-hidden">
          {/* Base AI aura animation */}
          <div className="absolute inset-0 opacity-70">
            <SplineScene scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Realistic robot overlay with tuning via URL params */}
          {robotEnabled && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: robotOpacity,
                mixBlendMode: robotBlend,
                transform: `translate3d(${robotOffsetX}px, ${robotOffsetY}px, 0) scale(${robotScale})`,
                transformOrigin: 'center center',
              }}
            >
              <SplineScene scene={robotScene} style={{ width: '100%', height: '100%' }} />
            </div>
          )}

          <MotionBackground />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
              <Sparkles size={14} className="text-purple-300" />
              Building AI agents • Full‑stack apps • Aspiring data scientist
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              Crafting intelligent products with a modern, minimal, and futuristic touch
            </h1>
            <p className="mt-5 text-white/80 leading-relaxed max-w-2xl">
              I design and ship end‑to‑end experiences — from conversational agents and data pipelines to responsive web apps. Clean code, clear results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-5 py-2.5 text-sm font-medium shadow hover:shadow-md transition-shadow">See my work</a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors">Get in touch</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services / Highlights */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[{
            icon: Bot,
            title: 'AI Agents',
            desc: 'Autonomous tools with memory, tool‑use, and robust evaluation.'
          }, {
            icon: Globe2,
            title: 'Full‑Stack Apps',
            desc: 'Fast, scalable web experiences with modern patterns.'
          }, {
            icon: Database,
            title: 'Data Science',
            desc: 'From exploration to deployment with reproducible pipelines.'
          }].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-xl border border-white/15 bg-white/10 backdrop-blur p-5"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-orange-400/10 blur-2xl" />
              <div className="relative">
                <Icon className="text-purple-300" size={22} />
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Selected Work</h2>
            <div className="hidden md:flex items-center gap-3 text-sm text-white/70">
              <Cpu size={16} />
              <span>Real projects, clean delivery</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Core Skills</h2>
          <div className="flex flex-wrap gap-3">
            {[ 'JavaScript', 'React', 'Vite', 'Tailwind', 'FastAPI', 'Python', 'Pandas', 'scikit‑learn', 'Postgres', 'MongoDB', 'LangChain', 'OpenAI', 'RAG', 'MLOps' ].map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">About Me</h2>
            <p className="text-white/85 leading-relaxed">
              I build intelligent, user‑centric software. My focus is on shipping agents that reason and act, scalable APIs, and data pipelines that turn raw information into insight. I care about clarity, performance, and delightful UX.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-purple-500/10 via-blue-500/10 to-orange-400/10 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-6">
              <ul className="space-y-3 text-sm text-white/85">
                <li>• 3+ years building web products and prototypes</li>
                <li>• Passion for ML, agents, and data visualization</li>
                <li>• Comfortable across frontend, backend, and infra</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Let’s build something</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur p-6">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="text-sm text-white/80">Name</label>
                  <input className="mt-1 w-full rounded-lg bg-white/80 text-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-white/80">Email</label>
                  <input type="email" className="mt-1 w-full rounded-lg bg-white/80 text-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm text-white/80">Message</label>
                  <textarea rows="4" className="mt-1 w-full rounded-lg bg-white/80 text-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500" placeholder="Tell me about your project..." />
                </div>
                <button className="inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-5 py-2.5 text-sm font-medium shadow hover:shadow-md transition-all">
                  Send message
                </button>
              </form>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur p-6">
              <p className="text-white/85 mb-4">Prefer email or socials?</p>
              <div className="flex flex-col gap-3 text-sm">
                <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 text-white/90 hover:text-white"><Mail size={16}/> hello@example.com</a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-white"><Github size={16}/> github.com/username</a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-white"><Linkedin size={16}/> linkedin.com/in/username</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-white">Top</a>
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
