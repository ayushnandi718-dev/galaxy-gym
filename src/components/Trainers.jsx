import { RevealDiv } from '../hooks/useScrollReveal.jsx'
import { Award, Users, Clock } from 'lucide-react'
import Section3DCanvas from './3d/Section3DCanvas'
import MedalModel from './3d/MedalModel'

const trainers = [
  { name: 'SEENA', role: 'Head Coach & Founder', speciality: 'Powerlifting & Strength', exp: '12 Years', clients: '200+', cert: 'ISSA Certified', gradient: 'from-[#C9A84C]/30 to-[#050505]', initials: 'RS', achievements: ['State Powerlifting Champion', 'ISSA Certified Trainer', '200+ Transformations'] },
  { name: 'Priya Dey', role: 'Fat Loss Specialist', speciality: 'Weight Loss & Nutrition', exp: '8 Years', clients: '150+', cert: 'ACE Nutrition Coach', gradient: 'from-[#6B4C9A]/30 to-[#050505]', initials: 'PD', achievements: ['ACE Nutrition Coach', 'Yoga Alliance Certified', '150+ Weight Loss Cases'] },
  { name: 'Aman Singh', role: 'Bodybuilding Coach', speciality: 'Hypertrophy & Aesthetics', exp: '9 Years', clients: '120+', cert: 'NASM Certified', gradient: 'from-[#1a4a8a]/30 to-[#050505]', initials: 'AS', achievements: ['NPC Competitor', 'NASM Certified', 'Physique Transformation Expert'] },
]

function TrainerCard({ trainer, index }) {
  return (
    <RevealDiv delay={index * 0.12}
      className="glass-card rounded-3xl overflow-hidden group hover:border-[#C9A84C]/30 transition-all duration-500 hover:-translate-y-1">
      <div className={`relative h-52 bg-gradient-to-b ${trainer.gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 group-hover:scale-105 transition-transform duration-500">
          <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black gold-text"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))', border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 40px rgba(201,168,76,0.2), inset 0 0 20px rgba(201,168,76,0.05)' }}>
            {trainer.initials}
          </div>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-semibold text-[#C9A84C]"
          style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
          {trainer.cert}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-1 text-xs tracking-widest uppercase text-[#C9A84C] font-semibold">{trainer.role}</div>
        <h3 className="text-xl font-black text-white mb-1">{trainer.name}</h3>
        <p className="text-sm text-gray-400 mb-5">{trainer.speciality}</p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="glass-card rounded-xl p-3 text-center"><Clock size={12} className="text-[#C9A84C] mx-auto mb-1" /><div className="text-sm font-bold text-white">{trainer.exp}</div><div className="text-[10px] text-gray-500">Experience</div></div>
          <div className="glass-card rounded-xl p-3 text-center"><Users size={12} className="text-[#C9A84C] mx-auto mb-1" /><div className="text-sm font-bold text-white">{trainer.clients}</div><div className="text-[10px] text-gray-500">Clients</div></div>
          <div className="glass-card rounded-xl p-3 text-center"><Award size={12} className="text-[#C9A84C] mx-auto mb-1" /><div className="text-sm font-bold text-white">5★</div><div className="text-[10px] text-gray-500">Rating</div></div>
        </div>
        <div className="space-y-2">
          {trainer.achievements.map((a) => (
            <div key={a} className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1 h-1 rounded-full bg-[#C9A84C] flex-shrink-0" />{a}
            </div>
          ))}
        </div>
      </div>
    </RevealDiv>
  )
}

export default function Trainers() {
  return (
    <section id="trainers" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #070707 100%)' }}>

      {/* 3D Medal - right side background */}
      <div className="absolute right-0 top-0 w-[40%] h-full" style={{ zIndex: 0 }}>
        <Section3DCanvas cameraPosition={[0, 0, 4]} fov={48}>
          <MedalModel />
        </Section3DCanvas>
      </div>

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
        <RevealDiv className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">Our Experts</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black text-white">
            Elite <span className="gold-text">Trainers</span>
          </h2>
          <p className="mt-5 text-gray-400 max-w-xl mx-auto">Certified, passionate, and committed to your success. Our trainers don't just coach — they transform.</p>
        </RevealDiv>
        <div className="grid md:grid-cols-3 gap-6">
          {trainers.map((t, i) => <TrainerCard key={t.name} trainer={t} index={i} />)}
        </div>
      </div>
      <style>{`
        @keyframes float0 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes float1 { 0%, 100% { transform: translateY(-4px); } 50% { transform: translateY(4px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(-10px); } }
      `}</style>
    </section>
  )
}
