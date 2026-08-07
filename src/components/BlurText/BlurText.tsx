import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type CSSProperties, type ElementType } from 'react'

interface BlurTextProps {
  text: string
  className?: string
  as?: ElementType
  style?: CSSProperties
}

const BlurText = ({ text, className, as: Component = 'h1', style }: BlurTextProps) => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const reduceMotion = useReducedMotion()

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '0.1em',
        ...style,
      }}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={reduceMotion ? false : { filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView && !reduceMotion
            ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
            : undefined}
          transition={{
            duration: reduceMotion ? 0.15 : 0.7,
            times: [0, 0.5, 1],
            delay: reduceMotion ? 0 : index * 0.1,
            ease: 'easeOut',
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}

export default BlurText
