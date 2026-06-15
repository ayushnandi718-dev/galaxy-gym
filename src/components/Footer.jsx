import { Camera, Share2, Play, Phone, MapPin, Mail } from 'lucide-react'

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Membership Plans', href: '#membership' },
  { label: 'Our Trainers', href: '#trainers' },
  { label: 'Transformations', href: '#transformation' },
  { label: 'Contact Us', href: '#contact' },
]

const programs = [
  'Strength Training',
  'Weight Loss',
  'Bodybuilding',
  'Personal Training',
  'Nutrition Guidance',
  'Powerlifting',
]

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden pt-16 pb-8"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #030303 100%)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] font-medium">Galaxy</span>
              <div className="text-2xl font-black text-white tracking-wider">MULTI GYM</div>
              <div className="text-xs text-gray-500 tracking-[0.15em] uppercase">Alipurduar, West Bengal</div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Alipurduar's premier fitness destination since 2015. Transforming bodies, building champions, one rep at a time.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { Icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Share2, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Play, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-[#C9A84C] transition-all duration-300 hover:border-[#C9A84C]/40 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                    className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-3 h-px bg-gray-700 group-hover:bg-[#C9A84C] group-hover:w-4 transition-all duration-200" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] font-semibold mb-5">Programs</h4>
            <ul className="space-y-3">
              {programs.map((p) => (
                <li key={p}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services') }}
                    className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-3 h-px bg-gray-700 group-hover:bg-[#C9A84C] group-hover:w-4 transition-all duration-200" />
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] font-semibold mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400 leading-relaxed">
                  Galaxy Multi Gym,<br />Alipurduar, West Bengal — 736121
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#C9A84C] flex-shrink-0" />
                <a href="tel:+919832376881" className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors">
                  +91 98323 76881
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#C9A84C] flex-shrink-0" />
                <a href="mailto:ayushnandi718@gmail.com" className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors">
                  ayushnandi718@gmail.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-5 p-4 rounded-xl" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
              <div className="text-xs tracking-widest uppercase text-[#C9A84C] font-semibold mb-2">Hours</div>
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between"><span>Mon – Sat</span><span>5:30 AM – 10:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>7:00 AM – 2:00 PM</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div>© {new Date().getFullYear()} Galaxy Multi Gym, Alipurduar. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
          <div className="text-gray-700">Built with ❤️ for champions</div>
        </div>
      </div>
    </footer>
  )
}
