import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { sfx } from '../../lib/sfx'

interface TypingTextProps {
  lines: string[]
  /** Milliseconds per character. */
  speed?: number
  /** Pause between lines, in milliseconds. */
  lineDelay?: number
  className?: string
  caret?: boolean
  /** Keeps the caret visible on the last line when typing ends. */
  keepCaret?: boolean
}

interface CursorState {
  line: number
  char: number
}

/**
 * Types a list of lines one after another, like a terminal session.
 * The full text is exposed to assistive tech through aria-label while the
 * animated spans stay aria-hidden.
 */
const TypingText = ({
  lines,
  speed = 26,
  lineDelay = 420,
  className,
  caret = true,
  keepCaret = true,
}: TypingTextProps) => {
  const reduceMotion = useReducedMotion()
  const [cursor, setCursor] = useState<CursorState>({ line: 0, char: 0 })
  const timeoutRef = useRef<number | undefined>(undefined)
  const signature = lines.join('\u0000')

  useEffect(() => {
    window.clearTimeout(timeoutRef.current)

    if (reduceMotion) {
      setCursor({ line: lines.length, char: 0 })
      return
    }

    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    setCursor({ line: 0, char: 0 })

    const tick = () => {
      if (cancelled) return

      if (lineIndex >= lines.length) {
        setCursor({ line: lines.length, char: 0 })
        return
      }

      const currentLine = lines[lineIndex]

      if (charIndex < currentLine.length) {
        charIndex += 1
        setCursor({ line: lineIndex, char: charIndex })
        const character = currentLine[charIndex - 1]
        if (character && character.trim() !== '') sfx.key()
        const jitter = speed * 0.55 * (charIndex % 3 === 0 ? 2.2 : 1)
        timeoutRef.current = window.setTimeout(tick, speed + jitter)
        return
      }

      lineIndex += 1
      charIndex = 0
      setCursor({ line: lineIndex, char: 0 })
      timeoutRef.current = window.setTimeout(tick, lineDelay)
    }

    timeoutRef.current = window.setTimeout(tick, 240)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, speed, lineDelay, reduceMotion])

  const typingDone = cursor.line >= lines.length
  const showCaret = caret && (!typingDone || keepCaret)

  return (
    <div className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, index) => {
        const isTyped = index < cursor.line
        const isActive = index === cursor.line
        if (!isTyped && !isActive) return null

        const visible = isTyped ? line : line.slice(0, cursor.char)

        return (
          <span key={line} aria-hidden="true" style={{ display: 'block', minHeight: '1.45em' }}>
            {visible}
            {isActive && showCaret && <span className="caret" />}
            {isTyped && index === lines.length - 1 && showCaret && cursor.line >= lines.length && <span className="caret" />}
          </span>
        )
      })}
    </div>
  )
}

export default TypingText
