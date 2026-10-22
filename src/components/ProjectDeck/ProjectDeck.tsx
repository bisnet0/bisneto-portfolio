import { Box, Stack, Typography } from '@mui/material'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { postBySlug } from '../../content/postComments'
import type { TrackContent, TrackProjectEntry } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'
import CommentStorm from '../CommentStorm/CommentStorm'
import PostPanel from '../PostPanel/PostPanel'
import ProjectCard from '../ProjectCard/ProjectCard'

interface ProjectDeckProps {
  track: 'frontend' | 'backend'
  content: TrackContent
  onOpen: (index: number) => void
}

interface DeckMetrics {
  vw: number
  vh: number
  cardW: number
  cardH: number
  marginX: number
  deckCardW: number
  deckScale: number
  deckCardH: number
  deckRowGap: number
  deckBottom: number
  perRow: number
  rows: number
  rowHeight: number
  padTop: number
  gap: number
}

interface DeckTiming {
  start: number
  end: number
}

interface DeckLayout {
  slots: Array<{ x: number; y: number; deckX: number; deckY: number; tilt: number; postX: number; postW: number }>
  timings: DeckTiming[]
  camInputs: number[]
  camOutputs: number[]
  rowLeft: number
  rowWidth: number
}

const easeOutCubic = (value: number) => 1 - (1 - value) ** 3

const P_START = 0.04
const LAND_RATIO = 0.72
/** Extra scroll (in card steps) after the last landing, so the final card can be read. */
const TAIL = 0.55

const buildLayout = (metrics: DeckMetrics, count: number): DeckLayout => {
  const { vw, vh, cardW, cardH, marginX, deckCardW, rowHeight, padTop, gap, perRow, rows, deckCardH, deckRowGap, deckBottom } = metrics
  const deckRowW = deckCardW * perRow
  // Keep the row clear of the floating radio at the bottom-left corner.
  const safeLeft = vw >= 1280 ? 468 : 236
  const centered = (vw - deckRowW) / 2
  const deckLeft = Math.min(Math.max(centered, safeLeft), Math.max(24, vw - deckRowW - 24))
  const deckBlockH = rows * deckCardH + (rows - 1) * deckRowGap
  const deckTop = deckBottom - deckBlockH
  const span = (1 - P_START - 0.02) / count
  const innerW = vw - marginX * 2

  const slots = Array.from({ length: count }, (_, index) => {
    const isLeft = index % 2 === 0
    const x = isLeft ? marginX : vw - marginX - cardW
    const y = padTop + index * rowHeight
    const tilt = (index - (count - 1) / 2) * 1.1
    const postX = isLeft ? marginX + cardW + gap : marginX
    const postW = innerW - cardW - gap

    // Deck rows: up to 6 cards in a single row, more than that splits into two rows.
    const column = index % perRow
    const deckRow = Math.floor(index / perRow)
    const deckX = deckLeft + column * deckCardW
    const deckY = deckTop + deckRow * (deckCardH + deckRowGap)

    return { x, y, deckX, deckY, tilt, postX, postW }
  })

  const timings: DeckTiming[] = slots.map((_, index) => ({
    start: P_START + index * span,
    end: P_START + index * span + span * LAND_RATIO,
  }))

  // Center the card when it fits the viewport; otherwise keep it near the top edge.
  const anchor = Math.max(vh * 0.06, (vh - cardH) / 2)
  const camInputs = [0, ...timings.map((timing) => timing.end), 1]
  const camOutputs = [0, ...slots.map((slot) => slot.y - anchor)]
  camOutputs.push(camOutputs[camOutputs.length - 1])

  return { slots, timings, camInputs, camOutputs, rowLeft: marginX, rowWidth: innerW }
}

interface DeckCardProps {
  entry: TrackProjectEntry
  index: number
  track: 'frontend' | 'backend'
  layout: DeckLayout
  metrics: DeckMetrics
  progress: MotionValue<number>
  camera: MotionValue<number>
  inDeck: boolean
  typing: boolean
  hovered: boolean
  dimmed: boolean
  onSelect: () => void
  onOpen: () => void
  onHoverChange: (hovered: boolean) => void
  registerRef: (element: HTMLDivElement | null) => void
}

const DeckCard = ({
  entry,
  index,
  track,
  layout,
  metrics,
  progress,
  camera,
  inDeck,
  typing,
  hovered,
  dimmed,
  onSelect,
  onOpen,
  onHoverChange,
  registerRef,
}: DeckCardProps) => {
  const slot = layout.slots[index]
  const timing = layout.timings[index]
  const t = useTransform(progress, [timing.start, timing.end], [0, 1])
  const eased = useTransform(t, easeOutCubic)
  const x = useTransform(() => (1 - eased.get()) * (slot.deckX - slot.x))
  const y = useTransform(() => (1 - eased.get()) * (slot.deckY + camera.get() - slot.y))
  const scale = useTransform(() => metrics.deckScale + (1 - metrics.deckScale) * eased.get())
  const rotate = useTransform(() => slot.tilt * (1 - eased.get()))

  return (
    <motion.div
      ref={registerRef}
      style={{
        position: 'absolute',
        top: slot.y,
        left: slot.x,
        width: metrics.cardW,
        x,
        y,
        scale,
        rotate,
        transformOrigin: 'top left',
        willChange: 'transform',
        zIndex: hovered ? 12 : 3,
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <Box
        onClick={() => {
          if (inDeck) onSelect()
        }}
        sx={{
          transform: hovered && inDeck ? 'translateY(-26px) scale(1.22)' : 'none',
          transformOrigin: 'bottom center',
          filter: dimmed ? 'blur(3px) saturate(0.75)' : 'none',
          opacity: dimmed ? 0.55 : 1,
          transition: 'transform 360ms var(--ease-out), filter 320ms ease, opacity 320ms ease',
          cursor: inDeck ? 'pointer' : 'auto',
          boxShadow: hovered && inDeck ? '0 32px 80px rgba(0,0,0,0.55)' : 'none',
          borderRadius: '16px',
        }}
      >
        <ProjectCard
          entry={entry}
          index={index}
          track={track}
          landed={typing}
          deckMode={inDeck}
          onOpen={inDeck ? onSelect : onOpen}
        />
      </Box>

      {inDeck && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: '50%',
            top: -22,
            translate: '-50% 0',
            px: 0.8,
            py: 0.25,
            borderRadius: '4px',
            border: '1px solid var(--line)',
            backgroundColor: 'var(--page-bg)',
            color: 'text.secondary',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.54rem',
            whiteSpace: 'nowrap',
            opacity: hovered ? 1 : 0.65,
            transition: 'opacity 240ms ease',
          }}
        >
          {String(index + 1).padStart(2, '0')} · {entry.highlight}
        </Box>
      )}
    </motion.div>
  )
}

interface DeckRowProps {
  entry: TrackProjectEntry
  index: number
  track: 'frontend' | 'backend'
  layout: DeckLayout
  progress: MotionValue<number>
}

/** The opposite corner: the real post about the project, revealed once the card lands. */
const DeckRow = ({ entry, index, track, layout, progress }: DeckRowProps) => {
  const slot = layout.slots[index]
  const timing = layout.timings[index]
  const post = postBySlug[entry.project.slug]
  const reveal = useTransform(progress, [timing.end - 0.015, timing.end + 0.02], [0, 1])
  const opacity = useTransform(reveal, (value) => Math.min(1, Math.max(0, value)))
  const offsetY = useTransform(reveal, (value) => (1 - Math.min(1, Math.max(0, value))) * 10)

  if (!post) return null

  return (
    <>
      <motion.div
        style={{
          position: 'absolute',
          top: slot.y,
          left: slot.postX,
          width: slot.postW,
          opacity,
          y: offsetY,
          zIndex: 2,
        }}
      >
        <PostPanel entry={entry} index={index} track={track} />
        {post.comments.length > 0 && (
          <Box sx={{ mt: 1.4 }}>
            <CommentStorm comments={post.comments} track={track} seed={entry.project.slug} />
          </Box>
        )}
      </motion.div>
    </>
  )
}

/**
 * Sticky stage that holds all project cards in a deck row at the bottom of the screen
 * and, as the page scrolls, flies them one by one into a cascade (left / right
 * alternating) with the project info and its real post filling the opposite corner.
 */
const ProjectDeck = ({ track, content, onOpen }: ProjectDeckProps) => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [metrics, setMetrics] = useState<DeckMetrics | null>(null)
  const [compact, setCompact] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const entries = content.projects
  const count = entries.length

  const registerRef = useCallback((index: number) => (element: HTMLDivElement | null) => {
    cardRefs.current[index] = element
  }, [])

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const isCompact = vw < 1024
      setCompact(isCompact)
      if (isCompact) return

      const firstCard = cardRefs.current[0]
      const cardH = firstCard?.offsetHeight || Math.round(vh * 0.66)
      const cardW = Math.min(vw * 0.46, 680)
      const marginX = Math.max(24, Math.min(96, vw * 0.055))
      const gap = Math.max(20, Math.round(vw * 0.02))
      const safeLeft = vw >= 1280 ? 468 : 236
      const perRow = count > 6 ? Math.ceil(count / 2) : count
      const rows = Math.ceil(count / perRow)
      const deckCardW = Math.min(
        (vw - marginX * 2 - gap * (perRow - 1)) / perRow,
        (vw - safeLeft - 24) / perRow,
        210,
      )
      const deckScale = deckCardW / cardW
      const deckCardH = cardH * deckScale
      const deckRowGap = 12
      // The deck block hugs the bottom of the stage so it never covers a landed card.
      const deckBottom = vh - 26
      const rowHeight = Math.max(cardH + vh * 0.16, vh * 0.8)
      const padTop = vh * 0.1

      setMetrics((current) => {
        const next: DeckMetrics = { vw, vh, cardW, cardH, marginX, deckCardW, deckScale, deckCardH, deckRowGap, deckBottom, perRow, rows, rowHeight, padTop, gap }
        if (current && current.vw === next.vw && current.vh === next.vh && current.cardH === next.cardH) return current
        return next
      })
    }

    compute()
    window.addEventListener('resize', compute)
    window.visualViewport?.addEventListener('resize', compute)
    const observer = new ResizeObserver(compute)
    cardRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      window.removeEventListener('resize', compute)
      window.visualViewport?.removeEventListener('resize', compute)
      observer.disconnect()
    }
  }, [count])

  const layout = useMemo(() => (metrics ? buildLayout(metrics, count) : null), [metrics, count])

  const { scrollYProgress } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  })

  const camInputs = layout?.camInputs ?? [0, 1]
  const camOutputs = layout?.camOutputs ?? [0, 0]
  const camera = useTransform(scrollYProgress, camInputs, camOutputs)
  const worldY = useTransform(camera, (value) => -value)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!layout) return
    const next = layout.timings.reduce((acc, timing, index) => (value >= timing.start ? index : acc), -1)
    setActiveIndex(next)
  })

  const jumpTo = useCallback(
    (index: number) => {
      const section = sectionRef.current
      const layoutValue = layout
      if (!section || !layoutValue) return

      const scrollable = section.offsetHeight - window.innerHeight
      const target = section.offsetTop + layoutValue.timings[index].end * scrollable

      window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' })
    },
    [layout, reduceMotion],
  )

  if (compact || reduceMotion) {
    return (
      <Box
        component="section"
        id="projects"
        ref={sectionRef}
        className="section-anchor"
        sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6 }, py: { xs: 10, md: 14 } }}
      >
        <Box sx={{ position: 'relative', mb: { xs: 6, md: 8 }, maxWidth: 620 }}>
          <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.68rem', letterSpacing: '0.16em', mb: 1.2 }}>
            {content.deckKicker[language]}
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: track === 'backend' ? 'var(--font-mono)' : 'var(--font-display)',
              fontStyle: track === 'backend' ? 'normal' : 'italic',
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
            }}
          >
            {content.deckTitle[language]}
          </Typography>
        </Box>

        <Stack spacing={{ xs: 4, md: 6 }}>
          {entries.map((entry, index) => {
            const post = postBySlug[entry.project.slug]
            return (
              <Box
                key={entry.project.slug}
                component={motion.div}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                sx={{ width: { xs: '100%', md: '78%' }, ml: { md: index % 2 === 0 ? 0 : 'auto' } }}
              >
                <ProjectCard entry={entry} index={index} track={track} landed={false} onOpen={() => onOpen(index)} />

                {post && (
                  <Box sx={{ position: 'relative', mt: 1.6, overflow: 'hidden', borderRadius: '12px' }}>
                    <PostPanel entry={entry} index={index} track={track} />
                    <CommentStorm comments={post.comments} track={track} seed={entry.project.slug} compact />
                  </Box>
                )}
              </Box>
            )
          })}
        </Stack>
      </Box>
    )
  }

  return (
    <Box
      component="section"
      id="projects"
      ref={sectionRef}
      className="section-anchor"
      sx={{ position: 'relative', zIndex: 1, height: `calc(100vh + ${count * 95 + Math.round(TAIL * 95)}vh)` }}
    >
      <Box sx={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            right: { xs: 12, md: 28 },
            top: '38%',
            translate: '0 -50%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'flex-end',
            zIndex: 8,
          }}
        >
          {entries.map((entry, index) => (
            <Box
              key={entry.project.slug}
              sx={{
                width: activeIndex >= index ? 26 : 14,
                height: 2,
                borderRadius: 999,
                backgroundColor: activeIndex >= index ? 'var(--accent)' : 'var(--line)',
                transition: 'width 300ms ease, background-color 300ms ease',
              }}
            />
          ))}
        </Box>

        <motion.div style={{ position: 'absolute', inset: 0, y: worldY }}>
          {layout && metrics
            ? entries.map((entry, index) => (
                <DeckRow
                  key={`row-${entry.project.slug}`}
                  entry={entry}
                  index={index}
                  track={track}
                  layout={layout}
                  progress={scrollYProgress}
                />
              ))
            : null}

          {layout && metrics
            ? entries.map((entry, index) => (
                <DeckCard
                  key={entry.project.slug}
                  entry={entry}
                  index={index}
                  track={track}
                  layout={layout}
                  metrics={metrics}
                  progress={scrollYProgress}
                  camera={camera}
                  inDeck={activeIndex < index}
                  typing={activeIndex >= index}
                  hovered={hoveredCard === index}
                  dimmed={hoveredCard !== null && hoveredCard !== index && activeIndex < index}
                  onSelect={() => jumpTo(index)}
                  onOpen={() => onOpen(index)}
                  onHoverChange={(hovered) => setHoveredCard(hovered ? index : null)}
                  registerRef={registerRef(index)}
                />
              ))
            : null}
        </motion.div>
      </Box>
    </Box>
  )
}

export default ProjectDeck
