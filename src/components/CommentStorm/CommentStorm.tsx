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

/** Deterministic little LCG so the scatter is stable per project. */
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
 * Comments right below the post, always visible.
 *
 * They live in a CSS grid (2 columns, 1 on mobile) instead of absolute positioning, so
 * two bubbles can never overlap — the "random" part is the rotation and the stagger.
 */
const CommentStorm = ({ comments, track, seed = 'post', compact = false }: CommentStormProps) => {
  const isBackend = track === 'backend'

  const placed = useMemo(() => {
    const random = makeRandom(hashSeed(seed))
    const visible = comments.slice(0, compact ? 4 : 6)

    return visible.map((comment, index) => ({
      comment,
      rotate: (random() - 0.5) * 2.4,
      delay: index * 90,
    }))
  }, [comments, seed, compact])

  if (placed.length === 0) return null

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'repeat(2, minmax(0, 1fr))',
        gap: compact ? 0.8 : 1,
        width: '100%',
        alignContent: 'start',
      }}
    >
      {placed.map(({ comment, rotate, delay }, index) => (
        <Box
          key={`${seed}-${index}`}
          className="storm-chip"
          sx={{
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
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.6rem',
              lineHeight: 1.45,
              fontWeight: 300,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {comment.text}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default CommentStorm
