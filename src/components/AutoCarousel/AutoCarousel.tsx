import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Box, IconButton } from '@mui/material'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePreferences } from '../../context/preferences'

interface AutoCarouselProps {
  images: string[]
  alt: string
  /** Click on the frame (or keyboard activation) — opens the gallery. */
  onActivate?: () => void
  cycleMs?: number
  aspectRatio?: string
}

const CYCLE_MS = 2400

/**
 * Auto-playing frame carousel used by the credential cards: cycles the images,
 * pauses on hover (or by the pause button) and keeps its own counter/progress.
 */
const AutoCarousel = ({
  images,
  alt,
  onActivate,
  cycleMs = CYCLE_MS,
  aspectRatio = '16 / 9',
}: AutoCarouselProps) => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const frames = useMemo(() => images.filter(Boolean), [images])
  const [slides, setSlides] = useState({ current: 0, previous: 0 })
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [visible, setVisible] = useState(false)
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = hostRef.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.2 },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const autoPlay = visible && !hovered && !pinned && !reduceMotion && frames.length > 1

  useEffect(() => {
    if (!autoPlay) return

    const timer = window.setInterval(() => {
      setSlides((state) => ({
        previous: state.current,
        current: (state.current + 1) % frames.length,
      }))
    }, cycleMs)

    return () => window.clearInterval(timer)
  }, [autoPlay, frames.length, cycleMs])

  useEffect(() => {
    if (!visible || frames.length < 2) return
    const next = frames[(slides.current + 1) % frames.length]
    if (!next) return
    const image = new Image()
    image.src = next
  }, [frames, slides, visible])

  const counter = `${String(slides.current + 1).padStart(2, '0')}/${String(frames.length).padStart(2, '0')}`

  if (frames.length === 0) return null

  return (
    <Box
      ref={hostRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ position: 'relative', width: '100%', aspectRatio, overflow: 'hidden', backgroundColor: '#05070b' }}
    >
      <Box
        component="img"
        src={frames[slides.previous]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
      />
      <Box
        key={frames[slides.current]}
        component="img"
        src={frames[slides.current]}
        alt={alt}
        loading="lazy"
        decoding="async"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: reduceMotion ? 'none' : 'frame-in 720ms var(--ease-glass) both',
        }}
      />

      {onActivate && (
        <Box
          component="button"
          type="button"
          onClick={onActivate}
          aria-label={alt}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            border: 0,
            p: 0,
            background: 'transparent',
            cursor: 'pointer',
          }}
        />
      )}

      {frames.length > 1 && (
        <>
          <Box
            className="mono"
            sx={{
              position: 'absolute',
              left: 10,
              bottom: 10,
              zIndex: 3,
              px: 0.8,
              py: 0.3,
              borderRadius: '9999px',
              border: '1px solid var(--line)',
              backgroundColor: 'rgba(0,0,0,0.48)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: '0.54rem',
              pointerEvents: 'none',
            }}
          >
            {counter}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              zIndex: 3,
              borderRadius: '9999px',
              backgroundColor: 'rgba(0,0,0,0.42)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <IconButton
              size="small"
              aria-label={
                pinned
                  ? language === 'pt' ? 'Retomar carrossel' : 'Resume carousel'
                  : language === 'pt' ? 'Pausar carrossel' : 'Pause carousel'
              }
              aria-pressed={pinned}
              onClick={(event) => {
                event.stopPropagation()
                setPinned((current) => !current)
              }}
              sx={{ width: 22, height: 22, color: '#fff' }}
            >
              {pinned ? <PlayArrowRoundedIcon sx={{ fontSize: 13 }} /> : <PauseRoundedIcon sx={{ fontSize: 13 }} />}
            </IconButton>
          </Box>

          <Box
            aria-hidden="true"
            key={`bar-${slides.current}-${pinned}-${hovered}`}
            sx={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              zIndex: 3,
              height: 2,
              width: hovered || pinned ? '100%' : 0,
              opacity: hovered ? 0.45 : 0,
              backgroundColor: 'var(--accent)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}
    </Box>
  )
}

export default AutoCarousel
