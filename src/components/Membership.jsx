import { Check, Star, Zap, Crown } from 'lucide-react'
import { RevealDiv } from '../hooks/useScrollReveal.jsx'
import Section3DCanvas from './3d/Section3DCanvas'
import CrownModel from './3d/CrownModel'

const plans = [
  { name: 'Starter', icon: Zap, price: 599, period: 'month', desc: 'Perfect for beginners building their foundation.',
    features: ['Full gym access (6 AM – 10 PM)', 'Locker room & shower', 'Basic fitness assessment', 'Group fitness classes', 'Access to cardio section'],
    cta: 'Get Started', featured: false, color: 'rgba(120,120,120,0.15)' },
  { name: 'Elite', icon: Star, price: 999, period: 'month', desc: 'Our most popular plan for serious results.',
    features: ['Everything in Starter', '2x Monthly PT sessions', 'Custom workout plan', 'Nutrition consultation', 'Progress tracking', 'Diet chart included'],
    cta: 'Join Elite', featured: true, color: 'rgba(201,168,76,0.12)' },
  { name: 'Champion', icon: Crown, price: 1799, period: 'month', desc: 'Total transformation with maximum support.',
    features: ['Everything in Elite', '8x Monthly PT sessions', 'Full nutrition program', 'Supplement guidance', 'Competition prep', 'WhatsApp coach access'],
    cta: 'Go Champion', featured: false, color: 'rgba(120,120,120,0.15)' },
]

export default function Membership() {
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="membership" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* 3D Crown left side */}
      <div className="absolute left-0 top-0 w-[45%] h-full" style={{ zIndex: 0 }}>
        <Section3DCanvas cameraPosition={[0, 0, 4.5]} fov={45}>
          <CrownModel />
        </Section3DCanvas>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full" style={{ zIndex: 0,
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
        <RevealDiv className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">Pricing</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black text-white">
            Membership <span className="gold-text">Plans</span>
          </h2>
          <p className="mt-5 text-gray-400 max-w-xl mx-auto">Invest in yourself. Choose the plan that matches your ambition.</p>
        </RevealDiv>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <RevealDiv key={plan.name} delay={i * 0.1}
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${plan.featured ? 'md:-mt-4' : ''}`}
                style={{ background: plan.color,
                  border: plan.featured ? '1.5px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: plan.featured ? '0 0 60px rgba(201,168,76,0.2), 0 30px 60px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.3)' }}>
                {plan.featured && (
                  <div className="gold-gradient text-black text-[10px] tracking-[0.25em] uppercase font-black text-center py-2.5">⚡ Most Popular</div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.featured ? 'gold-gradient' : 'bg-white/5'}`}>
                      <Icon size={18} className={plan.featured ? 'text-black' : 'text-[#C9A84C]'} />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest uppercase text-gray-500">{plan.desc.split(' ')[0]}</div>
                      <div className="font-bold text-white text-base">{plan.name}</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-sm text-gray-400">₹</span>
                      <span className={`text-5xl font-black ${plan.featured ? 'gold-text' : 'text-white'}`}>{plan.price.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-gray-500 tracking-widest uppercase">/ {plan.period}</span>
                    <p className="mt-2 text-xs text-gray-400">{plan.desc}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? 'gold-gradient' : 'bg-white/10'}`}>
                          <Check size={10} className={plan.featured ? 'text-black' : 'text-[#C9A84C]'} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={scrollToContact}
                    className={`w-full py-3.5 rounded-xl text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 ${plan.featured ? 'gold-gradient text-black hover:shadow-[0_0_25px_rgba(201,168,76,0.4)]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                    {plan.cta}
                  </button>
                </div>
              </RevealDiv>
            )
          })}
        </div>
        <RevealDiv className="mt-10 text-center text-sm text-gray-500">
          * All plans include GST. Quarterly & annual plans available with discount. Ask at the gym for more details.
        </RevealDiv>
      </div>
    </section>
  )
}
