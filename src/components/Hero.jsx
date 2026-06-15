import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, AdaptiveDpr } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import DumbbellModel from './DumbbellModel'
import GoldParticles from './GoldParticles'

function Scene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={2.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#C9A84C" />
      <pointLight position={[0, 3, 2]} intensity={1.2} color="#C9A84C" distance={8} />
      <pointLight position={[0, -3, -2]} intensity={0.5} color="#4466ff" distance={6} />
      <spotLight
        position={[3, 5, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#C9A84C"
        castShadow
      />

      <GoldParticles count={160} />
      <DumbbellModel scrollProgress={scrollProgress} />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.4}
        blur={2.5}
        far={3}
        color="#C9A84C"
      />
      <Environment preset="city" />
      <AdaptiveDpr pixelated />
    </>
  )
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef()

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current
      if (!el) return
      const p = Math.min(window.scrollY / (el.offsetHeight || 1), 1)
      setScrollProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className="relative w-full h-screen min-h-[640px] flex items-center overflow-hidden bg-[#050505]">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, #050505, transparent)' }} />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp} className="mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.25em] uppercase font-semibold text-[#C9A84C]"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              Alipurduar's Premier Fitness Destination
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="text-5xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight mb-6">
            <span className="block text-white">BUILD YOUR</span>
            <span className="block gold-text gold-glow-text">STRONGEST</span>
            <span className="block text-white">VERSION</span>
          </motion.h1>

          <motion.p variants={fadeUp}
            className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-lg">
            Elite training. Expert guidance. Proven results. Galaxy Multi Gym transforms bodies and minds with world-class equipment and personalized programs.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group px-8 py-4 text-sm tracking-widest uppercase font-bold text-black gold-gradient rounded-full hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer">
              Join Now — Free Trial
            </a>
            <a href="#membership"
              onClick={(e) => { e.preventDefault(); document.querySelector('#membership')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group px-8 py-4 text-sm tracking-widest uppercase font-semibold text-[#C9A84C] rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.05)' }}>
              View Plans
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="mt-12 flex gap-8 flex-wrap">
            {[
              { num: '500+', label: 'Members' },
              { num: '10+', label: 'Years' },
              { num: '15+', label: 'Programs' },
              { num: '8', label: 'Expert Trainers' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-black gold-text">{s.num}</span>
                <span className="text-xs tracking-widest uppercase text-gray-500 mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500 hover:text-[#C9A84C] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="group-hover:text-[#C9A84C]" />
        </motion.div>
      </motion.button>
    </section>
  )
}
