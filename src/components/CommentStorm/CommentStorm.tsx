import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import type { PostComment } from '../../content/postComments'

interface CommentStormProps {
  comments: PostComment[]
  active: boolean
  /** Increment on every activation so the scatter is re-rolled each hover. */
  burst: number
  track: 'frontend' | 'backend'
  /** Small screens: fewer bubbles, kept inside the card width. */
  compact?: boolean
}

/** Deterministic little LCG so positions are stable per burst but random across hovers. */
const makeRandom = (seed: number) => {
  let state = seed * 9301 + 49297

  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}

/**
 * Scatters the post comments across the row area. The parent must be the row
 * container with `overflow: hidden` so bubbles never invade neighbouring rows.
 */
const CommentStorm = ({ comments, active, burst, track, compact = false }: CommentStormProps) => {
  const isBackend = track === 'backend'

  const placed = useMemo(() => {
    const random = makeRandom(burst + 11)
    const visible = comments.slice(0, compact ? 3 : 8)
    const spread = compact ? 34 : 46

    return visible.map((comment, index) => {
      const side = index % 2 === 0
      return {
        comment,
        left: (side ? 4 : 42) + random() * (compact ? 10 : spread),
        top: 6 + random() * (compact ? 58 : 70),
        rotate: (random() - 0.5) * 7,
        delay: index * 70,
      }
    })
  }, [comments, burst, compact])

  if (!active || placed.length === 0) return null

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 6,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {placed.map(({ comment, left, top, rotate, delay }, index) => (
        <Box
          key={`${burst}-${index}`}
          className="storm-chip"
          sx={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            maxWidth: compact ? 190 : { xs: 210, md: 260 },
            rotate: `${rotate}deg`,
            px: 1.1,
            py: 0.8,
            borderRadius: isBackend ? '4px' : '12px',
            border: `1px solid ${isBackend ? 'var(--line-strong)' : 'var(--line)'}`,
            backgroundColor: isBackend ? 'rgba(6,9,22,0.9)' : 'rgba(12,14,18,0.82)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
            animationDelay: `${delay}ms`,
          }}
        >
          <Typography
            className="mono"
            sx={{ color: 'var(--accent)', fontSize: '0.54rem', letterSpacing: '0.04em', mb: 0.3 }}
          >
            {comment.author}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.62rem', lineHeight: 1.45, fontWeight: 300 }}>
            {comment.text}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default CommentStorm
