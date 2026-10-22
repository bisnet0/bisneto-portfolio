import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import { Box, Stack, Typography } from '@mui/material'
import { postBySlug } from '../../content/postComments'
import type { TrackProjectEntry } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

interface PostPanelProps {
  entry: TrackProjectEntry
  index: number
  track: 'frontend' | 'backend'
  onHoverChange?: (hovered: boolean) => void
}

/**
 * Fills the corner opposite the project card with the real post about that work
 * (LinkedIn thread or GitHub repo) and its captured comments.
 */
const PostPanel = ({ entry, index, track, onHoverChange }: PostPanelProps) => {
  const { language } = usePreferences()
  const post = postBySlug[entry.project.slug]
  const isBackend = track === 'backend'
  const code = String(index + 1).padStart(2, '0')

  if (!post) return null

  const isLinkedIn = post.kind === 'linkedin'
  const captured = post.comments.length
  const total = post.commentsTotal ?? captured
  const label = isLinkedIn ? 'linkedin.post' : `github.repo · ${post.repo ?? ''}`

  return (
    <Box
      component="a"
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
      className={isBackend ? 'panel mono' : 'liquid-glass'}
      sx={{
        display: 'block',
        p: { xs: 1.8, md: 2.2 },
        borderRadius: isBackend ? '10px' : '1.4rem',
        color: 'text.primary',
        textDecoration: 'none',
        transition: 'transform 320ms var(--ease-out), border-color 320ms ease',
        '&:hover, &:focus-visible': {
          transform: 'translateY(-3px)',
          borderColor: isBackend ? 'var(--line-strong)' : undefined,
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.4 }}>
        <Box
          component="img"
          src="/me/nocanva.webp"
          alt=""
          width={30}
          height={30}
          sx={{
            width: 30,
            height: 30,
            borderRadius: isBackend ? '6px' : '50%',
            objectFit: 'cover',
            border: `1px solid ${isBackend ? 'var(--line-strong)' : 'var(--line)'}`,
          }}
        />

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: '0.74rem', fontWeight: 500, lineHeight: 1.2 }}>
            Henrique Bisneto
          </Typography>
          <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.54rem', letterSpacing: '0.03em' }}>
            {isBackend ? `// ${label} · ${code}` : isLinkedIn ? 'Engenheiro de Software · LinkedIn' : `Repositório · ${post.repo ?? 'GitHub'}`}
          </Typography>
        </Box>

        <Typography
          className="mono"
          sx={{ ml: 'auto', color: 'text.secondary', fontSize: '0.54rem', whiteSpace: 'nowrap' }}
        >
          {post.date[language]}
        </Typography>
      </Stack>

      <Typography
        sx={{
          color: 'text.primary',
          fontSize: { xs: '0.76rem', md: '0.8rem' },
          fontWeight: 300,
          lineHeight: 1.6,
          fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-body)',
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.text}
      </Typography>

      <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ mt: 1.6, gap: 1.4, color: 'text.secondary' }}>
        {isLinkedIn ? (
          <>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ThumbUpAltOutlinedIcon sx={{ fontSize: 13 }} />
              <Typography className="mono" sx={{ fontSize: '0.56rem' }}>
                {post.reactions ?? 0}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 13 }} />
              <Typography className="mono" sx={{ fontSize: '0.56rem' }}>
                {captured}/{total}
              </Typography>
            </Stack>
            <Typography className="mono" sx={{ fontSize: '0.52rem', letterSpacing: '0.04em', opacity: 0.8 }}>
              {language === 'pt'
                ? `passe o mouse: ${captured} comentários reais`
                : `hover: ${captured} real comments`}
            </Typography>
          </>
        ) : (
          <>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CodeRoundedIcon sx={{ fontSize: 13 }} />
              <Typography className="mono" sx={{ fontSize: '0.56rem' }}>
                {post.language}
              </Typography>
            </Stack>
            <Typography className="mono" sx={{ fontSize: '0.52rem', letterSpacing: '0.04em', opacity: 0.8 }}>
              {language === 'pt' ? `último push ${post.pushedAt}` : `last push ${post.pushedAt}`}
            </Typography>
          </>
        )}
        <ArrowOutwardRoundedIcon sx={{ fontSize: 13, ml: 'auto !important' }} />
      </Stack>

      {isLinkedIn && captured > 0 && (
        <Typography className="mono" sx={{ mt: 1, color: 'var(--accent)', fontSize: '0.5rem', opacity: 0.75 }}>
          {language === 'pt'
            ? `${captured} de ${total} comentários capturados da thread pública`
            : `${captured} of ${total} comments captured from the public thread`}
        </Typography>
      )}
    </Box>
  )
}

export default PostPanel
