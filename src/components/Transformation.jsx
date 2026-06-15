import { useRef } from 'react'
import { RevealDiv } from '../hooks/useScrollReveal.jsx'
import { ArrowRight } from 'lucide-react'
import Section3DCanvas from './3d/Section3DCanvas'
import ArrowTransformModel from './3d/ArrowTransformModel'

const transformations = [
  { name: 'Rajesh K.', duration: '6 months', loss: '-18 kg', program: 'Weight Loss', before: 'RS', after: 'RS' },
  { name: 'Ananya M.', duration: '4 months', loss: '+8 kg muscle', program: 'Bodybuilding', before: 'AM', after: 'AM' },
  { name: 'Vikram D.', duration: '8 months', loss: '-22 kg', program: 'Elite Plan', before: 'VD', after: 'VD' },
  { name: 'Priti S.', duration: '5 months', loss: '-14 kg', program: 'Personal Training', before: 'PS', after: 'PS' },
]

const gradientsBefore = ['from-[#2a2a2a] to-[#111]', 'from-[#1a2040] to-[#0a0a20]', 'from-[#201a10] to-[#100a00]', 'from-[#1a1a2a] to-[#0a0a15]']
const gradientsAfter = ['from-[#C9A84C]/30 to-[#050505]', 'from-[#4a6a2a]/40 to-[#050505]', 'from-[#C9A84C]/25 to-[#050505]', 'from-[#6a4a2a]/30 to-[#050505]']

function TransformCard({ t, i }) {
  return (
    <div className="min-w-[300px] md:min-w-[360px] snap-start flex-shrink-0">
      <RevealDiv delay={i * 0.08} className="glass-card rounded-3xl overflow-hidden group hover:border-[#C9A84C]/30 transition-all duration-500">
        <div className="flex h-52">
          <div className={`flex-1 bg-gradient-to-b ${gradientsBefore[i]} flex flex-col items-center justify-center relative`}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-gray-400"
              style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.1)' }}>{t.before}</div>
            <div className="absolute bottom-3 left-3 text-[10px] tracking-widest uppercase text-gray-500 font-semibold">Before</div>
          </div>
          <div className="flex items-center justify-center z-10 -mx-3">
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.4)]">
              <ArrowRight size={14} className="text-black" />
            </div>
          </div>
          <div className={`flex-1 bg-gradient-to-b ${gradientsAfter[i]} flex flex-col items-center justify-center relative`}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black gold-text"
              style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))', border: '2px solid rgba(201,168,76,0.4)' }}>{t.after}</div>
            <div className="absolute bottom-3 right-3 text-[10px] tracking-widest uppercase text-[#C9A84C] font-semibold">After</div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-white text-base">{t.name}</h4>
              <p className="text-xs text-gray-400 mt-0.5">{t.program}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black gold-text">{t.loss}</div>
              <div className="text-xs text-gray-400">{t.duration}</div>
            </div>
          </div>
        </div>
      </RevealDiv>
    </div>
  )
}

export default function Transformation() {
  const scrollRef = useRef()

  return (
    <section id="transformation" className="section-padding bg-[#050505] overflow-hidden relative">
      {/* 3D Transform figures - centered background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Section3DCanvas cameraPosition={[0, 0, 6]} fov={52}>
          <ArrowTransformModel />
        </Section3DCanvas>
      </div>

      {/* Gradient overlay to keep top/bottom clean */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0,
        background: 'linear-gradient(180deg, #050505 0%, transparent 25%, transparent 75%, #050505 100%)' }} />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
        <RevealDiv className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">Real Results</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black text-white">
            Real <span className="gold-text">Transformations</span>
          </h2>
          <p className="mt-5 text-gray-400 max-w-xl mx-auto">Numbers don't lie. These are real members who committed and conquered. Your transformation starts now.</p>
        </RevealDiv>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {transformations.map((t, i) => <TransformCard key={t.name} t={t} i={i} />)}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {transformations.map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#C9A84C]/30" />)}
        </div>

        <RevealDiv className="text-center mt-14">
          <p className="text-gray-400 mb-6 text-base">Ready to write your own success story?</p>
          <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 text-sm tracking-widest uppercase font-bold text-black gold-gradient rounded-full hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-300 hover:scale-105">
            Start Your Transformation
          </button>
        </RevealDiv>
      </div>
    </section>
  )
}
