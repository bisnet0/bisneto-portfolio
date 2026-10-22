import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { siteCopy } from '../../content/portfolio'
import type { TrackProjectEntry } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'
import TypingText from '../TypingText/TypingText'

interface ProjectCardProps {
  entry: TrackProjectEntry
  index: number
  track: 'frontend' | 'backend'
  /** `true` once the card has landed in the cascade — enables the typed description. */
  landed: boolean
  /** `true` while the card is still in the deck row: details are visible but not clickable. */
  deckMode?: boolean
  onOpen: () => void
  style?: CSSProperties
}

const CYCLE_MS = 2400

const ProjectCard = ({ entry, index, track, landed, deckMode = false, onOpen, style }: ProjectCardProps) => {
  const { language, mode } = usePreferences()
  const copy = siteCopy[language].projects
  const { project, focus, highlight } = entry
  const isBackend = track === 'backend'
  const dark = mode === 'dark'
  const code = String(index + 1).padStart(2, '0')
  const reduceMotion = useReducedMotion()

  const frames = useMemo(() => [project.cover, ...project.images], [project.cover, project.images])
  const [slides, setSlides] = useState({ current: 0, previous: 0 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pinned, setPinned] = useState(false)
  const coverRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const element = coverRef.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entryItem) => entryItem.isIntersecting)),
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
    }, CYCLE_MS)

    return () => window.clearInterval(timer)
  }, [autoPlay, frames.length])

  // Warm the next frame so the crossfade never shows a blank slot.
  useEffect(() => {
    if (!visible) return
    const next = frames[(slides.current + 1) % frames.length]
    if (!next) return
    const image = new Image()
    image.src = next
  }, [frames, slides, visible])

  const linkLabel = (label: string, type: string) => {
    if (type === 'case') return copy.viewCase
    if (type === 'code') return copy.viewCode
    return label || copy.visitWebsite
  }

  const surface = isBackend
    ? {
        panel: 'panel panel-glow',
        radius: '12px',
        bg: dark ? 'rgba(4, 6, 16, 0.92)' : 'rgba(255, 255, 255, 0.94)',
        heading: 'var(--font-mono)',
        headingStyle: 'normal' as const,
        headingWeight: 500,
        headingSize: 'clamp(1.35rem, 2vw, 1.9rem)',
        headingTracking: '-0.02em',
      }
    : {
        panel: 'liquid-glass-strong',
        radius: '1.6rem',
        bg: dark ? 'rgba(9, 11, 14, 0.55)' : 'rgba(255, 255, 255, 0.55)',
        heading: 'var(--font-display)',
        headingStyle: 'italic' as const,
        headingWeight: 400,
        headingSize: 'clamp(1.9rem, 3vw, 2.9rem)',
        headingTracking: '-0.04em',
      }

  const frameCounter = `${String(slides.current + 1).padStart(2, '0')}/${String(frames.length).padStart(2, '0')}`

  return (
    <Box
      component="article"
      className={surface.panel}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: surface.radius,
        backgroundColor: surface.bg,
        border: isBackend ? '1px solid var(--line)' : 'none',
      }}
    >
      {isBackend && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            px: 1.6,
            py: 1,
            borderBottom: '1px solid var(--line)',
            backgroundColor: dark ? 'rgba(91,139,255,0.05)' : 'rgba(6,70,45,0.04)',
          }}
        >
          <Stack direction="row" spacing={0.6} aria-hidden="true">
            {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
              <Box key={color} sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, opacity: 0.75 }} />
            ))}
          </Stack>
          <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.66rem', letterSpacing: '0.02em' }}>
            ~/services/{project.slug}.run
          </Typography>
          <Typography className="mono" sx={{ ml: 'auto', color: 'var(--accent)', fontSize: '0.66rem' }}>
            {code}
          </Typography>
        </Stack>
      )}

      <Box sx={{ position: 'relative' }}>
        <Box
          ref={coverRef}
          component="button"
          type="button"
          onClick={onOpen}
          aria-label={`${copy.gallery}: ${project.name[language]}`}
          sx={{
            position: 'relative',
            display: 'block',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            border: 0,
            p: 0,
            cursor: 'pointer',
            backgroundColor: '#05070b',
            '&:hover .frame-img, &:focus-visible .frame-img': { transform: 'scale(1.03)' },
          }}
        >
          <Box
            component="img"
            src={frames[slides.previous]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
          />
          <Box
            key={slides.current}
            component="img"
            className="frame-img"
            src={frames[slides.current]}
            alt={`${project.name[language]} — ${frameCounter}`}
            loading="lazy"
            decoding="async"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isBackend ? 0.92 : 1,
              animation: reduceMotion ? 'none' : 'frame-in 720ms var(--ease-glass) both',
              transition: 'transform 700ms var(--ease-glass)',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isBackend
                ? 'linear-gradient(180deg, rgba(0,0,4,0.05) 40%, rgba(0,0,4,0.85) 100%)'
                : 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.4) 100%)',
            }}
          />

        </Box>

        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.6}
            className="mono"
            sx={{
              position: 'absolute',
              left: 12,
              bottom: 10,
              px: 0.9,
              py: 0.4,
              borderRadius: isBackend ? '4px' : '9999px',
              border: `1px solid ${isBackend ? 'var(--line-strong)' : 'rgba(255,255,255,0.22)'}`,
              backgroundColor: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: '0.56rem',
            }}
          >
            <CollectionsRoundedIcon sx={{ fontSize: 13 }} />
            {frameCounter}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.4}
            sx={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              px: 0.5,
              py: 0.2,
              borderRadius: '9999px',
              backgroundColor: 'rgba(0,0,0,0.42)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
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
              sx={{ width: 22, height: 22, color: '#fff', pointerEvents: 'auto' }}
            >
              {pinned ? <PlayArrowRoundedIcon sx={{ fontSize: 13 }} /> : <PauseRoundedIcon sx={{ fontSize: 13 }} />}
            </IconButton>
          </Stack>

          {!reduceMotion && (
            <Box
              aria-hidden="true"
              key={`bar-${slides.current}-${pinned}-${hovered}`}
              sx={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                height: 2,
                width: hovered || pinned ? '100%' : 0,
                backgroundColor: 'var(--accent)',
                opacity: hovered ? 0.45 : 0,
                animation: autoPlay ? `frame-bar ${CYCLE_MS}ms linear both` : 'none',
                transformOrigin: 'left',
              }}
            />
          )}

          <Typography
            className="mono"
            sx={{
              position: 'absolute',
              right: 12,
              top: 10,
              color: 'rgba(255,255,255,0.86)',
              fontSize: '0.56rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {highlight}
          </Typography>
        </Box>
      </Box>

      <Box
        style={{
          pointerEvents: deckMode ? 'none' : 'auto',
          transition: 'opacity 380ms ease',
        }}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: { xs: 2, sm: 2.4 }, pt: { xs: 2, sm: 2.2 } }}
      >
        <Stack direction="row" alignItems="baseline" justifyContent="space-between" spacing={2}>
          <Typography
            component="p"
            className="mono"
            sx={{ color: 'var(--accent)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            {`${code} · ${highlight}`}
          </Typography>
          <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.6rem', whiteSpace: 'nowrap' }}>
            {project.period[language]}
          </Typography>
        </Stack>

        <Typography
          component="h3"
          sx={{
            fontFamily: surface.heading,
            fontStyle: surface.headingStyle,
            fontWeight: surface.headingWeight,
            fontSize: surface.headingSize,
            letterSpacing: surface.headingTracking,
            lineHeight: isBackend ? 1.15 : 0.98,
          }}
        >
          {project.name[language]}
        </Typography>

        <Box sx={{ minHeight: '4.2em' }}>
          {landed ? (
            <TypingText lines={[focus[language]]} speed={9} lineDelay={0} caret className="mono" />
          ) : (
            <Typography sx={{ color: 'text.primary', fontSize: '0.84rem', fontWeight: 300, lineHeight: 1.65 }}>
              {focus[language]}
            </Typography>
          )}
        </Box>

        <Stack direction="row" flexWrap="wrap" gap={0.7} aria-label={copy.technologies}>
          {project.technologies.map((technology) => (
            <Box
              key={technology}
              className={isBackend ? 'mono' : undefined}
              sx={{
                px: 1.1,
                py: 0.45,
                borderRadius: isBackend ? '5px' : '9999px',
                border: `1px solid ${isBackend ? 'var(--line-strong)' : 'var(--line)'}`,
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--text-primary)',
                fontSize: '0.62rem',
              }}
            >
              {isBackend ? technology.toLowerCase() : technology}
            </Box>
          ))}
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ pt: 0.5 }}>
          <Button
            onClick={onOpen}
            className={isBackend ? 'mono' : 'liquid-glass-strong'}
            sx={{
              borderRadius: isBackend ? '6px' : '9999px',
              px: 1.8,
              py: 0.6,
              color: isBackend ? 'var(--page-bg)' : 'text.primary',
              backgroundColor: isBackend ? 'var(--accent)' : undefined,
              fontSize: '0.64rem',
              '&:hover': { filter: isBackend ? 'brightness(1.1)' : undefined },
            }}
          >
            {isBackend ? `> ${copy.gallery.toLowerCase()}` : copy.gallery}
          </Button>
          {project.links.slice(0, isBackend ? 2 : 3).map((link) => (
            <Button
              key={link.url}
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: '0.8rem !important' }} />}
              className={isBackend ? 'mono' : undefined}
              sx={{
                borderRadius: isBackend ? '6px' : '9999px',
                px: 1.2,
                py: 0.6,
                border: isBackend ? '1px solid var(--line)' : 'none',
                color: 'text.primary',
                fontSize: '0.62rem',
              }}
            >
              {linkLabel(link.label, link.type)}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default ProjectCard
