import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface NeuralFieldProps {
  className?: string
  /** Multiplies node/link opacity (0–2). */
  intensity?: number
  /** Radius, in CSS pixels, where the cursor pushes nodes away. */
  repelRadius?: number
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const hexToRgb = (value: string): [number, number, number] => {
  const hex = value.trim().replace('#', '')
  const full = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex
  const int = Number.parseInt(full, 16)

  if (Number.isNaN(int) || full.length < 6) return [140, 170, 255]

  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

/**
 * Canvas of drifting nodes connected by proximity — the "neurons" backdrop.
 * The pointer repels nodes, which doubles as the cursor interaction.
 */
const NeuralField = ({ className, intensity = 1, repelRadius = 150 }: NeuralFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let dpr = 1
    let nodes: Node[] = []
    let frame = 0
    let accent: [number, number, number] = [140, 170, 255]
    let linkAlpha = 0.22
    const pointer = { x: -9999, y: -9999, active: false }

    const readColors = () => {
      const styles = window.getComputedStyle(document.documentElement)
      const accentValue = styles.getPropertyValue('--accent') || '#5b8bff'
      accent = hexToRgb(accentValue)
      linkAlpha = document.documentElement.dataset.theme === 'light' ? 0.34 : 0.24
    }

    const buildNodes = () => {
      const density = width < 720 ? 16000 : 22000
      const count = Math.min(140, Math.max(22, Math.round((width * height) / density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.7,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
      readColors()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      const maxLink = width < 720 ? 110 : 150
      const [r, g, b] = accent

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.hypot(dx, dy)
          if (distance > maxLink) continue

          const alpha = (1 - distance / maxLink) * linkAlpha * intensity
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          context.lineWidth = 0.6
          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(other.x, other.y)
          context.stroke()
        }
      }

      for (const node of nodes) {
        const cursorDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y)
        const heat = pointer.active ? Math.max(0, 1 - cursorDistance / (repelRadius * 1.6)) : 0
        context.beginPath()
        context.arc(node.x, node.y, node.r + heat * 1.4, 0, Math.PI * 2)
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, 0.35 + heat * 0.65) * intensity})`
        context.fill()
      }
    }

    const step = () => {
      for (const node of nodes) {
        if (pointer.active) {
          const dx = node.x - pointer.x
          const dy = node.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < repelRadius && distance > 0.01) {
            const force = (1 - distance / repelRadius) * 0.55
            node.vx += (dx / distance) * force
            node.vy += (dy / distance) * force
          }
        }

        node.vx *= 0.972
        node.vy *= 0.972
        node.vx += (Math.random() - 0.5) * 0.008
        node.vy += (Math.random() - 0.5) * 0.008

        const speed = Math.hypot(node.vx, node.vy)
        if (speed > 2.4) {
          node.vx = (node.vx / speed) * 2.4
          node.vy = (node.vy / speed) * 2.4
        }

        node.x += node.vx
        node.y += node.vy

        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20
      }

      draw()
      frame = window.requestAnimationFrame(step)
    }

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const handleLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const themeObserver = new MutationObserver(readColors)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-track'] })

    window.addEventListener('pointermove', handlePointer, { passive: true })
    window.addEventListener('pointerleave', handleLeave)

    if (reduceMotion) {
      draw()
    } else {
      frame = window.requestAnimationFrame(step)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('pointerleave', handleLeave)
    }
  }, [intensity, reduceMotion, repelRadius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

export default NeuralField
