import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export function useScrollReveal(threshold = 0.15) {
  const [ref, inView] = useInView({ threshold, triggerOnce: true })
  return { ref, inView }
}

export function RevealDiv({ children, className, delay = 0, direction = 'up', ...props }) {
  const { ref, inView } = useScrollReveal()

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'scale' ? 0.92 : 1,
    },
    show: {
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
