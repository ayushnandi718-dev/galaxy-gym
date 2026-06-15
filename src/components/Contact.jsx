import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealDiv } from '../hooks/useScrollReveal.jsx'
import { Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'
import Section3DCanvas from './3d/Section3DCanvas'
import PhoneLocationModel from './3d/PhoneLocationModel'

function FormInput({ label, type='text', name, placeholder, required, textarea }) {
  const base = "w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all duration-300 focus:border-[#C9A84C]/60 resize-none"
  const style = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2 font-medium">
        {label}{required && <span className="text-[#C9A84C] ml-1">*</span>}
      </label>
      {textarea ? <textarea name={name} placeholder={placeholder} rows={4} required={required} className={base} style={style} />
        : <input type={type} name={name} placeholder={placeholder} required={required} className={base} style={style} />}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    const form = e.target; const data = new FormData(form)
    try {
      const res = await fetch('https://formsubmit.co/ayushnandi718@gmail.com', { method: 'POST', body: data })
      if (res.ok || res.status === 200) { setSubmitted(true); form.reset() }
    } catch { setSubmitted(true) }
    setLoading(false)
  }

  return (
    <section id="contact" className="section-padding bg-[#050505] relative overflow-hidden">
      {/* 3D Location Pin - left background */}
      <div className="absolute left-0 top-0 w-[40%] h-full" style={{ zIndex: 0, opacity: 0.85 }}>
        <Section3DCanvas cameraPosition={[0, 0, 5]} fov={46}>
          <PhoneLocationModel />
        </Section3DCanvas>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
        <RevealDiv className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-semibold">Get In Touch</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-black text-white">
            Start Your <span className="gold-text">Journey</span>
          </h2>
          <p className="mt-5 text-gray-400 max-w-xl mx-auto">Visit us, call us, or fill out the form. Our team is ready to help you take the first step.</p>
        </RevealDiv>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RevealDiv className="grid grid-cols-2 gap-4">
              <a href="https://wa.me/919832376881?text=Hi%20Galaxy%20Multi%20Gym!%20I%20want%20to%20enquire%20about%20membership." target="_blank" rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-green-500/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle size={18} className="text-green-400" /></div>
                <div><div className="text-xs text-gray-400">Chat on</div><div className="text-sm font-bold text-white">WhatsApp</div></div>
              </a>
              <a href="tel:+919832376881"
                className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-[#C9A84C]/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'rgba(201,168,76,0.15)' }}>
                  <Phone size={18} className="text-[#C9A84C]" /></div>
                <div><div className="text-xs text-gray-400">Call Us</div><div className="text-sm font-bold text-white">Call Now</div></div>
              </a>
            </RevealDiv>

            <RevealDiv delay={0.1} className="glass-card rounded-2xl p-6 space-y-5">
              {[
                { icon: MapPin, title: 'Address', line1: 'Galaxy Multi Gym', line2: 'Alipurduar, West Bengal, India — 736121' },
                { icon: Clock, title: 'Timings', line1: 'Mon – Sat: 5:30 AM – 10:00 PM', line2: 'Sunday: 7:00 AM – 2:00 PM' },
              ].map(({ icon: Icon, title, line1, line2 }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <Icon size={16} className="text-[#C9A84C]" /></div>
                  <div>
                    <div className="text-xs tracking-widest uppercase text-gray-500 mb-1">{title}</div>
                    <div className="text-sm text-white font-medium">{line1}</div>
                    <div className="text-sm text-gray-400">{line2}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <Phone size={16} className="text-[#C9A84C]" /></div>
                <div>
                  <div className="text-xs tracking-widest uppercase text-gray-500 mb-1">Phone</div>
                  <a href="tel:+919832376881" className="text-sm text-white font-medium hover:text-[#C9A84C] transition-colors">+91 9832376881</a>
                </div>
              </div>
            </RevealDiv>

            <RevealDiv delay={0.15} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)', height: '220px' }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d457029.06020615186!2d89.19800310624743!3d26.50276701318475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e257fb463f1f5b%3A0x12d23b9528a98345!2zR0FMQVhZIE1VTFRJIEdZTSAoZ3ltK2Nyb3NzZml0KSDwn4-L77iP!5e0!3m2!1sen!2sin!4v1781419679101!5m2!1sen!2sin"
                width="100%" height="220" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Galaxy Multi Gym Location" />
            </RevealDiv>
          </div>

          <RevealDiv delay={0.1} className="glass-card rounded-3xl p-7 md:p-8">
            <h3 className="text-xl font-bold text-white mb-1">Send Us a Message</h3>
            <p className="text-gray-400 text-sm mb-6">We reply within 2 hours during working hours.</p>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(201,168,76,0.4)]">
                    <CheckCircle size={28} className="text-black" /></div>
                  <h4 className="text-2xl font-black text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-sm max-w-xs">Thank you for reaching out. We'll get back to you very soon.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2.5 text-xs tracking-widest uppercase text-[#C9A84C] rounded-full transition-all hover:bg-[#C9A84C]/10"
                    style={{ border: '1px solid rgba(201,168,76,0.3)' }}>Send Another</button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{opacity:0}} animate={{opacity:1}} onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Enquiry — Galaxy Multi Gym" />
                  <input type="hidden" name="_template" value="table" />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="First Name" name="first_name" placeholder="Rajesh" required />
                    <FormInput label="Last Name" name="last_name" placeholder="Kumar" />
                  </div>
                  <FormInput label="Email" type="email" name="email" placeholder="you@email.com" required />
                  <FormInput label="Phone" type="tel" name="phone" placeholder="+91 9832376881" />
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-gray-400 mb-2 font-medium">Interested In</label>
                    <select name="interest" className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none appearance-none cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <option value="" className="bg-gray-900">Select a program...</option>
                      <option value="membership" className="bg-gray-900">General Membership</option>
                      <option value="pt" className="bg-gray-900">Personal Training</option>
                      <option value="weight-loss" className="bg-gray-900">Weight Loss Program</option>
                      <option value="bodybuilding" className="bg-gray-900">Bodybuilding</option>
                      <option value="nutrition" className="bg-gray-900">Nutrition Guidance</option>
                    </select>
                  </div>
                  <FormInput label="Message" name="message" placeholder="Tell us about your goals..." textarea />
                  <button type="submit" disabled={loading}
                    className="w-full py-4 rounded-xl text-sm tracking-widest uppercase font-bold text-black gold-gradient hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <><Send size={14} />Send Message</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </RevealDiv>
        </div>
      </div>
    </section>
  )
}
