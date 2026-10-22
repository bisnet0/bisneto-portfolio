import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import type { PostComment } from '../../content/postComments'

interface CommentStormProps {
  comments: PostComment[]
  track: 'frontend' | 'backend'
  /** Stable seed (project slug) so the scatter does not jump on every render. */
  seed?: string
  compact?: boolean
}

/** Deterministic little LCG so positions are stable per project. */
const makeRandom = (seed: number) => {
  let state = seed * 9301 + 49297

  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}

const hashSeed = (value: string) => {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 100000
  }
  return hash + 7
}

/**
 * Comments scattered right below the post panel — always visible, no hover needed.
 * The parent gives it the width of the post, so bubbles never reach the card side.
 */
const CommentStorm = ({ comments, track, seed = 'post', compact = false }: CommentStormProps) => {
  const isBackend = track === 'backend'

  const placed = useMemo(() => {
    const random = makeRandom(hashSeed(seed))
    const visible = comments.slice(0, compact ? 3 : 6)

    return visible.map((comment, index) => {
      const side = index % 2 === 0
      return {
        comment,
        left: (side ? 2 : 46) + random() * (compact ? 6 : 14),
        top: 4 + random() * (compact ? 56 : 62),
        rotate: (random() - 0.5) * 6,
        delay: index * 90,
      }
    })
  }, [comments, seed, compact])

  if (placed.length === 0) return null

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        height: compact ? 132 : 176,
        width: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {placed.map(({ comment, left, top, rotate, delay }, index) => (
        <Box
          key={`${seed}-${index}`}
          className="storm-chip"
          sx={{
            position: 'absolute',
            left: `${left}%`,
            top: `${top}%`,
            maxWidth: compact ? '88%' : '52%',
            rotate: `${rotate}deg`,
            px: 1,
            py: 0.7,
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
            sx={{ color: 'var(--accent)', fontSize: '0.52rem', letterSpacing: '0.04em', mb: 0.25 }}
          >
            {comment.author}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.6rem', lineHeight: 1.45, fontWeight: 300 }}>
            {comment.text.length > 130 ? `${comment.text.slice(0, 127)}…` : comment.text}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default CommentStorm
