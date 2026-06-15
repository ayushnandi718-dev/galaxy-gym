import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { RevealDiv } from '../hooks/useScrollReveal.jsx'
import { Award, Users, Zap, Star, Target, Shield } from 'lucide-react'
import Section3DCanvas from './3d/Section3DCanvas'
import TrophyModel from './3d/TrophyModel'

function Counter({ end, suffix = '', duration = 2 }) {
  const ref = useRef()
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true })
  const started = useRef(false)
  const setRefs = (el) => { ref.current = el; inViewRef(el) }
  useEffect(() => {
    if (!inView || started.current || !ref.current) return
    started.current = true
    const startTime = Date.now()
    const endVal = parseInt(end)
    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * endVal)
      if (ref.current) ref.current.textContent = current + suffix
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, suffix, duration])
  return <span ref={setRefs} className="text-4xl md:text-5xl font-black gold-text">0{suffix}</span>
}

const stats = [
  { icon: Users, num: '500', suffix: '+', label: 'Active Members', desc: 'Transforming lives daily' },
  { icon: Award, num: '10', suffix: '+', label: 'Years of Excellence', desc: 'Proven track record' },
  { icon: Zap, num: '15', suffix: '+', label: 'Training Programs', desc: 'For every fitness goal' },
  { icon: Star, num: '98', suffix: '%', label: 'Satisfaction Rate', desc: 'Member reviewed excellence' },
]
const pillars = [
  { icon: Target, title: 'Results-Driven', body: 'Every program is built around measurable outcomes. We track your progress and adjust your training to ensure consistent results.' },
  { icon: Shield, title: 'Expert Guidance', body: 'Our certified trainers bring years of experience to every session, ensuring safe, effective, and goal-aligned training.' },
  { icon: Zap, title: 'Premium Equipment', body: 'State-of-the-art machines and free weights from leading brands, maintained to the highest standards for your best workout.' },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* 3D Trophy - right side background */}
      <div className="absolute right-0 top-0 w-[50%] h-full" style={{ zIndex: 0 }}>
        <Section3DCanvas cameraPosition={[0, 0, 4.5]} fov={42}>
          <TrophyModel />
        </Section3DCanvas>
      </div>

      {/* Radial glow behind 3D */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ zIndex: 0,
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />

      {/* All content above 3D */}
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
        <RevealDiv className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">Our Story</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black text-white leading-tight">
            More Than A Gym.<br /><span className="gold-text">A Lifestyle.</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Founded in Alipurduar, Galaxy Multi Gym has been the region's most trusted fitness destination for over a decade. We combine cutting-edge equipment with elite coaching to deliver transformations that last a lifetime.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <RevealDiv key={s.label} delay={i * 0.1}
                className="glass-card rounded-2xl p-6 text-center hover:border-[#C9A84C]/40 transition-all duration-500 group">
                <Icon size={22} className="text-[#C9A84C] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <Counter end={s.num} suffix={s.suffix} />
                <div className="mt-2 text-sm font-semibold text-white">{s.label}</div>
                <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
              </RevealDiv>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <RevealDiv key={p.title} delay={i * 0.12} direction="up"
                className="glass-card rounded-2xl p-8 group hover:border-[#C9A84C]/30 hover:-translate-y-1 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <Icon size={22} className="text-[#C9A84C]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
              </RevealDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}
