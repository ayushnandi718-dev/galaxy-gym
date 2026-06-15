import { useRef } from 'react'
import { RevealDiv } from '../hooks/useScrollReveal.jsx'
import { Dumbbell, Flame, Trophy, User, Apple, Target } from 'lucide-react'
import Section3DCanvas from './3d/Section3DCanvas'
import BarbellModel from './3d/BarbellModel'

const services = [
  { icon: Dumbbell, title: 'Strength Training', desc: 'Build raw power and muscular strength with our periodized powerlifting and strength programs. Progressive overload protocols designed for all levels.', highlight: 'Free weights, barbells, cables', tag: 'Most Popular' },
  { icon: Flame, title: 'Weight Loss', desc: 'Science-backed fat loss protocols combining HIIT, cardio, and metabolic conditioning. Lose fat while preserving lean muscle mass.', highlight: 'Cardio + resistance training', tag: null },
  { icon: Trophy, title: 'Bodybuilding', desc: 'Aesthetic physique development with hypertrophy-focused training, posing guidance, and competition prep for serious competitors.', highlight: 'Hypertrophy protocols', tag: null },
  { icon: User, title: 'Personal Training', desc: 'One-on-one coaching tailored to your unique goals, schedule, and fitness level. Maximum results in minimum time with expert accountability.', highlight: '1-on-1 dedicated coaching', tag: 'Premium' },
  { icon: Apple, title: 'Nutrition Guidance', desc: 'Customized meal planning and macro coaching to fuel your training and accelerate recovery. Food is the other half of your transformation.', highlight: 'Macro & meal planning', tag: null },
  { icon: Target, title: 'Powerlifting', desc: 'Structured squat, bench, and deadlift programming. Build competition-level strength with expert technique coaching and periodization.', highlight: 'SBD specialization', tag: null },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef()
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    const cx = rect.width / 2, cy = rect.height / 2
    cardRef.current.style.transform = `perspective(800px) rotateX(${((y-cy)/cy)*-6}deg) rotateY(${((x-cx)/cx)*6}deg) translateZ(8px)`
  }
  const handleMouseLeave = () => { if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)' }
  const Icon = service.icon
  return (
    <RevealDiv delay={index * 0.07} className="relative">
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        className="glass-card rounded-2xl p-7 h-full transition-colors duration-300 hover:border-[#C9A84C]/35 cursor-default group"
        style={{ transition: 'transform 0.15s ease, border-color 0.3s ease' }}>
        {service.tag && (
          <span className="absolute top-5 right-5 px-3 py-1 text-[10px] tracking-widest uppercase font-bold text-black gold-gradient rounded-full">{service.tag}</span>
        )}
        <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.04))', border: '1px solid rgba(201,168,76,0.25)' }}>
          <Icon size={22} className="text-[#C9A84C]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">{service.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>
        <div className="flex items-center gap-2">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-xs text-[#C9A84C] tracking-wide">{service.highlight}</span>
        </div>
      </div>
    </RevealDiv>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #080808 50%, #050505 100%)' }}>

      {/* 3D Barbell centered in background */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 0, opacity: 0.85 }}>
        <div className="w-full h-full max-h-[500px]">
          <Section3DCanvas cameraPosition={[0, 0, 5]} fov={50}>
            <BarbellModel />
          </Section3DCanvas>
        </div>
      </div>

      {/* Glow overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
        <RevealDiv className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">What We Offer</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black text-white">
            Training <span className="gold-text">Programs</span>
          </h2>
          <p className="mt-5 text-gray-400 max-w-xl mx-auto text-base">
            From beginners to competitive athletes — we have a specialized program designed to meet you exactly where you are.
          </p>
        </RevealDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
