import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="expand"]'

/**
 * Personal cursor: a crisp reticle that grows on interactive elements, glitches on
 * hover/press and plays a soft tick. Disabled on touch devices and reduced motion.
 */
const CustomCursor = () => {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [glitch, setGlitch] = useState(0)
  const pointerX = useMotionValue(-120)
  const pointerY = useMotionValue(-120)
  const ringX = useSpring(pointerX, { stiffness: 480, damping: 30, mass: 0.32 })
  const ringY = useSpring(pointerY, { stiffness: 480, damping: 30, mass: 0.32 })

  useEffect(() => {
    if (reduceMotion) return
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!query.matches) return

    setEnabled(true)
    document.documentElement.dataset.customCursor = 'on'
    document.body.classList.add('custom-cursor-on')

    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      const target = event.target as Element | null
      const hovering = Boolean(target?.closest?.(INTERACTIVE))
      setActive((current) => {
        if (current !== hovering) setGlitch((value) => value + 1)
        return hovering
      })
    }
    const handleDown = () => {
      setPressed(true)
      setGlitch((value) => value + 1)
    }
    const handleUp = () => setPressed(false)
    const handleLeave = () => {
      pointerX.set(-120)
      pointerY.set(-120)
    }
    const handleClick = (event: Event) => {
      const target = event.target as Element | null
      if (target?.closest?.('button, a, [role="button"]')) setGlitch((value) => value + 1)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointerleave', handleLeave)
    document.addEventListener('click', handleClick)

    return () => {
      delete document.documentElement.dataset.customCursor
      document.body.classList.remove('custom-cursor-on')
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointerleave', handleLeave)
      document.removeEventListener('click', handleClick)
    }
  }, [pointerX, pointerY, reduceMotion])

  // Ambient micro-glitches so the reticle feels alive even when idle.
  useEffect(() => {
    if (!enabled) return
    let timeout = 0
    const schedule = () => {
      timeout = window.setTimeout(() => {
        setGlitch((value) => value + 1)
        schedule()
      }, 2600 + Math.random() * 3200)
    }
    schedule()

    return () => window.clearTimeout(timeout)
  }, [enabled])

  if (!enabled) return null

  const size = pressed ? 30 : active ? 60 : 26
  const glitchClass = glitch === 0 ? ' is-stable' : ' is-glitching'

  return (
    <>
      <motion.div aria-hidden="true" className="cursor-anchor" style={{ x: ringX, y: ringY }}>
        <span className="cursor-cross cursor-cross--v" />
        <span className="cursor-cross cursor-cross--h" />
        <div key={`jitter-${glitch}`} className={`cursor-jitter ${glitchClass}`}>
          <div
            className="cursor-layer"
            style={{
              width: size,
              height: size,
              opacity: active ? 0.95 : 0.62,
              borderRadius: active ? 12 : 13,
            }}
          />
          <span className="cursor-ghost cursor-ghost--a" />
          <span className="cursor-ghost cursor-ghost--b" />
        </div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="cursor-dot"
        style={{ x: pointerX, y: pointerY, opacity: active ? 0 : 0.95 }}
      />
    </>
  )
}

export default CustomCursor
