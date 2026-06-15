import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealDiv } from '../hooks/useScrollReveal.jsx'
import { Scale, Flame, Beef, Droplets } from 'lucide-react'
import Section3DCanvas from './3d/Section3DCanvas'
import ScaleModel from './3d/ScaleModel'

const TABS = [
  { id: 'bmi', label: 'BMI', icon: Scale },
  { id: 'calorie', label: 'Calories', icon: Flame },
  { id: 'protein', label: 'Protein', icon: Beef },
  { id: 'water', label: 'Water', icon: Droplets },
]

function Input({ label, value, onChange, type = 'number', placeholder, unit }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2 font-medium">{label}</label>
      <div className="relative">
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all duration-300 focus:border-[#C9A84C]/60"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
        {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#C9A84C] font-semibold">{unit}</span>}
      </div>
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2 font-medium">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-300 appearance-none cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {options.map((o) => <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>)}
      </select>
    </div>
  )
}

function Result({ label, value, unit, note }) {
  return (
    <div className="rounded-2xl p-5 mt-5"
      style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))', border: '1px solid rgba(201,168,76,0.3)' }}>
      <div className="text-xs tracking-widest uppercase text-[#C9A84C] mb-1">{label}</div>
      <div className="text-4xl font-black text-white">{value} <span className="text-lg text-[#C9A84C] font-semibold">{unit}</span></div>
      {note && <div className="mt-2 text-xs text-gray-400">{note}</div>}
    </div>
  )
}

function BMICalc() {
  const [weight, setWeight] = useState(''); const [height, setHeight] = useState(''); const [result, setResult] = useState(null)
  const calc = () => { const w=parseFloat(weight),h=parseFloat(height)/100; if(!w||!h)return; const bmi=(w/(h*h)).toFixed(1); let cat=bmi<18.5?'Underweight':bmi<25?'Normal weight':bmi<30?'Overweight':'Obese'; setResult({bmi,cat}) }
  return (
    <div className="space-y-4">
      <Input label="Weight" value={weight} onChange={setWeight} placeholder="70" unit="kg" />
      <Input label="Height" value={height} onChange={setHeight} placeholder="170" unit="cm" />
      <button onClick={calc} className="w-full py-3 rounded-xl text-sm tracking-widest uppercase font-bold text-black gold-gradient hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all duration-300">Calculate BMI</button>
      <AnimatePresence>{result && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}><Result label="Your BMI" value={result.bmi} unit="" note={`Category: ${result.cat}. ${result.bmi<18.5?'Focus on weight gain.':result.bmi<25?"You're in the healthy range!":'Consider a fat loss program.'}`} /></motion.div>}</AnimatePresence>
    </div>
  )
}

function CalorieCalc() {
  const [weight,setWeight]=useState(''); const [height,setHeight]=useState(''); const [age,setAge]=useState(''); const [gender,setGender]=useState('male'); const [activity,setActivity]=useState('1.55'); const [result,setResult]=useState(null)
  const calc = () => { const w=parseFloat(weight),h=parseFloat(height),a=parseFloat(age); if(!w||!h||!a)return; const bmr=gender==='male'?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161; const tdee=Math.round(bmr*parseFloat(activity)); setResult({tdee,cut:Math.round(tdee*0.8),bulk:Math.round(tdee*1.1)}) }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4"><Input label="Weight (kg)" value={weight} onChange={setWeight} placeholder="70" /><Input label="Height (cm)" value={height} onChange={setHeight} placeholder="170" /></div>
      <div className="grid grid-cols-2 gap-4"><Input label="Age" value={age} onChange={setAge} placeholder="25" /><Select label="Gender" value={gender} onChange={setGender} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} /></div>
      <Select label="Activity Level" value={activity} onChange={setActivity} options={[{value:'1.2',label:'Sedentary (desk job)'},{value:'1.375',label:'Light (1-3 days/wk)'},{value:'1.55',label:'Moderate (3-5 days/wk)'},{value:'1.725',label:'Active (6-7 days/wk)'},{value:'1.9',label:'Very Active (2x/day)'}]} />
      <button onClick={calc} className="w-full py-3 rounded-xl text-sm tracking-widest uppercase font-bold text-black gold-gradient hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all duration-300">Calculate</button>
      <AnimatePresence>{result && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="space-y-3"><Result label="Maintenance Calories" value={result.tdee} unit="kcal/day" note="Eat this to maintain your current weight." /><div className="grid grid-cols-2 gap-3"><div className="rounded-xl p-4 text-center" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}><div className="text-xs text-gray-400 mb-1">Fat Loss</div><div className="text-xl font-bold text-white">{result.cut} <span className="text-xs text-gray-400">kcal</span></div></div><div className="rounded-xl p-4 text-center" style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)'}}><div className="text-xs text-[#C9A84C] mb-1">Muscle Gain</div><div className="text-xl font-bold text-white">{result.bulk} <span className="text-xs text-gray-400">kcal</span></div></div></div></motion.div>}</AnimatePresence>
    </div>
  )
}

function ProteinCalc() {
  const [weight,setWeight]=useState(''); const [goal,setGoal]=useState('build'); const [result,setResult]=useState(null)
  const calc = () => { const w=parseFloat(weight); if(!w)return; const m=goal==='build'?2.2:goal==='maintain'?1.6:1.8; setResult(Math.round(w*m)) }
  return (
    <div className="space-y-4">
      <Input label="Body Weight" value={weight} onChange={setWeight} placeholder="70" unit="kg" />
      <Select label="Goal" value={goal} onChange={setGoal} options={[{value:'build',label:'Build Muscle'},{value:'lose',label:'Lose Fat & Preserve Muscle'},{value:'maintain',label:'Maintain'}]} />
      <button onClick={calc} className="w-full py-3 rounded-xl text-sm tracking-widest uppercase font-bold text-black gold-gradient hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all duration-300">Calculate</button>
      <AnimatePresence>{result && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}><Result label="Daily Protein Target" value={result} unit="g/day" note={`Spread across 4-5 meals. Aim for ${Math.round(result/5)}g per meal.`} /></motion.div>}</AnimatePresence>
    </div>
  )
}

function WaterCalc() {
  const [weight,setWeight]=useState(''); const [activity,setActivity]=useState('moderate'); const [result,setResult]=useState(null)
  const calc = () => { const w=parseFloat(weight); if(!w)return; const base=w*0.033; const extra=activity==='low'?0:activity==='moderate'?0.5:1.0; setResult((base+extra).toFixed(1)) }
  return (
    <div className="space-y-4">
      <Input label="Body Weight" value={weight} onChange={setWeight} placeholder="70" unit="kg" />
      <Select label="Activity Level" value={activity} onChange={setActivity} options={[{value:'low',label:'Low (office work)'},{value:'moderate',label:'Moderate (gym 3-4x/week)'},{value:'high',label:'High (daily training)'}]} />
      <button onClick={calc} className="w-full py-3 rounded-xl text-sm tracking-widest uppercase font-bold text-black gold-gradient hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all duration-300">Calculate</button>
      <AnimatePresence>{result && <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}><Result label="Daily Water Intake" value={result} unit="litres/day" note={`That's about ${Math.round(result*4)} glasses of water (250ml each).`} /></motion.div>}</AnimatePresence>
    </div>
  )
}

const CALCS = { bmi: BMICalc, calorie: CalorieCalc, protein: ProteinCalc, water: WaterCalc }

export default function FitnessTools() {
  const [active, setActive] = useState('bmi')
  const ActiveCalc = CALCS[active]

  return (
    <section id="tools" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #080808 100%)' }}>

      {/* 3D Weighing Scale - right background */}
      <div className="absolute right-0 top-0 w-[40%] h-full" style={{ zIndex: 0, opacity: 0.9 }}>
        <Section3DCanvas cameraPosition={[0, 0, 4.5]} fov={48}>
          <ScaleModel />
        </Section3DCanvas>
      </div>

      <div className="max-w-3xl mx-auto relative" style={{ zIndex: 1 }}>
        <RevealDiv className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">Free Tools</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            Fitness <span className="gold-text">Calculators</span>
          </h2>
          <p className="mt-5 text-gray-400">Know your numbers. Optimize your training.</p>
        </RevealDiv>

        <RevealDiv className="glass-card rounded-2xl p-2 flex gap-1 mb-8">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => setActive(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${active===tab.id ? 'gold-gradient text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]' : 'text-gray-400 hover:text-white'}`}>
                <Icon size={14} /><span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </RevealDiv>

        <RevealDiv className="glass-card rounded-2xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.25}}>
              <ActiveCalc />
            </motion.div>
          </AnimatePresence>
        </RevealDiv>
      </div>
    </section>
  )
}
