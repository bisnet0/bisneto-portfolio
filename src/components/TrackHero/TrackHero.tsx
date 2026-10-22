import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import type { TrackContent, TrackId } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'
import TypingText from '../TypingText/TypingText'

interface TrackHeroProps {
  track: TrackId
  content: TrackContent
  onExplore: () => void
  onContact: () => void
}

interface Fragment {
  title: string
  lines: string[]
  position: Record<string, string | number>
  rotate: number
  delay: number
}

const fragments: Record<'frontend' | 'backend', Fragment[]> = {
  frontend: [
    {
      title: 'tokens.css',
      lines: ['--radius: 20px;', '--glass-blur: 50px;', '--ease: cubic-bezier(.16,1,.3,1);'],
      position: { top: '2%', left: '-6%' },
      rotate: -4,
      delay: 0.1,
    },
    {
      title: 'motion.ts',
      lines: ['const spring = {', '  stiffness: 380,', '  damping: 28,', '};'],
      position: { bottom: '8%', right: '-10%' },
      rotate: 3,
      delay: 0.35,
    },
    {
      title: 'a11y.tsx',
      lines: ['<section aria-label="deck">', '  <h2>Projetos</h2>'],
      position: { top: '52%', left: '-14%' },
      rotate: -7,
      delay: 0.55,
    },
  ],
  backend: [
    {
      title: 'deploy.sh',
      lines: ['$ docker compose up -d --build', '✔ 0 pending migrations', '✔ healthcheck 200'],
      position: { top: '0%', left: '-8%' },
      rotate: -3,
      delay: 0.1,
    },
    {
      title: 'api.ts',
      lines: ['POST /integrations → 201', 'p95 = 42ms', 'cache: mongo · 5s'],
      position: { bottom: '4%', right: '-12%' },
      rotate: 2.5,
      delay: 0.3,
    },
    {
      title: 'worker.log',
      lines: ['[12:04:11] job:photos ok', '[12:04:12] job:certificates ok'],
      position: { top: '58%', left: '-16%' },
      rotate: -5,
      delay: 0.5,
    },
  ],
}

const TrackHero = ({ track, content, onExplore, onContact }: TrackHeroProps) => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const isBackend = track === 'backend'
  const visibleFragments = isBackend ? fragments.backend : fragments.frontend

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
        px: { xs: 2.5, md: 6, lg: 9 },
        pt: { xs: 14, md: 16 },
        pb: { xs: 8, md: 10 },
      }}
    >
      {isBackend && (
        <Box aria-hidden="true" className="ide-grid" sx={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
      )}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: isBackend
            ? 'radial-gradient(68% 55% at 62% 34%, var(--accent-glow), transparent 62%), radial-gradient(50% 40% at 12% 88%, rgba(12,24,72,0.55), transparent 70%)'
            : 'radial-gradient(55% 45% at 70% 30%, var(--accent-soft), transparent 65%)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          width: '100%',
          maxWidth: 1440,
          mx: 'auto',
          alignItems: 'center',
          gap: { xs: 6, lg: 6 },
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(0, 0.86fr)' },
        }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 3 }}>
            <Box
              className="mono"
              sx={{
                px: 1.2,
                py: 0.5,
                borderRadius: isBackend ? '4px' : '9999px',
                border: `1px solid ${isBackend ? 'var(--line-strong)' : 'var(--line)'}`,
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {content.kicker}
            </Box>
            <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.66rem' }}>
              {content.tagline[language]}
            </Typography>
          </Stack>

          <Box
            className={isBackend ? 'panel mono' : 'liquid-glass mono'}
            sx={{
              mb: 3.5,
              px: 2,
              py: 1.6,
              borderRadius: isBackend ? '8px' : '14px',
              color: 'var(--accent)',
              fontSize: { xs: '0.68rem', md: '0.76rem' },
              lineHeight: 1.6,
              maxWidth: 560,
            }}
          >
            <TypingText lines={content.typedLines[language]} speed={16} lineDelay={340} />
          </Box>

          <Typography
            component="h1"
            sx={{
              fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
              fontStyle: isBackend ? 'normal' : 'italic',
              fontWeight: isBackend ? 500 : 400,
              fontSize: isBackend ? 'clamp(2rem, 3.6vw, 3.4rem)' : 'clamp(2.8rem, 5.2vw, 5rem)',
              lineHeight: isBackend ? 1.08 : 0.94,
              letterSpacing: isBackend ? '-0.03em' : '-0.045em',
              maxWidth: 780,
            }}
          >
            {content.heroTitle[language]}
          </Typography>

          <Typography
            sx={{
              mt: 3,
              maxWidth: '58ch',
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            {content.heroLead[language]}
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1.2} sx={{ mt: 4 }}>
            <Button
              onClick={onExplore}
              endIcon={<ArrowDownwardRoundedIcon sx={{ fontSize: '1rem !important' }} />}
              className={isBackend ? 'mono' : 'liquid-glass-strong'}
              sx={{
                px: 2.6,
                py: 1.2,
                borderRadius: isBackend ? '6px' : '9999px',
                backgroundColor: isBackend ? 'var(--accent)' : undefined,
                color: isBackend ? 'var(--page-bg)' : 'text.primary',
                fontSize: '0.74rem',
                '&:hover': { filter: 'brightness(1.08)' },
              }}
            >
              {isBackend ? '> ver projetos' : language === 'pt' ? 'Ver projetos' : 'See projects'}
            </Button>
            <Button
              onClick={onContact}
              endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: '0.95rem !important' }} />}
              className={isBackend ? 'mono' : undefined}
              sx={{
                px: 2.2,
                py: 1.2,
                borderRadius: isBackend ? '6px' : '9999px',
                border: '1px solid var(--line)',
                color: 'text.primary',
                fontSize: '0.72rem',
              }}
            >
              {language === 'pt' ? 'Falar comigo' : 'Talk to me'}
            </Button>
          </Stack>

          <Box sx={{ mt: 5 }}>
            <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', mb: 1.4 }}>
              {content.stackLabel[language]}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.8}>
              {content.stack.map((item) => (
                <Box
                  key={item}
                  className="mono"
                  sx={{
                    px: 1.1,
                    py: 0.45,
                    borderRadius: isBackend ? '4px' : '9999px',
                    border: '1px solid var(--line)',
                    color: 'text.secondary',
                    fontSize: '0.62rem',
                  }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mt: { xs: 2, lg: 0 } }}>
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              width: { xs: 260, md: 400, lg: 460 },
              height: { xs: 260, md: 400, lg: 460 },
              borderRadius: '50%',
              background: isBackend
                ? 'radial-gradient(circle, rgba(91,139,255,0.28), transparent 62%)'
                : 'radial-gradient(circle, var(--accent-soft), transparent 65%)',
              filter: 'blur(12px)',
              animation: reduceMotion ? 'none' : 'glow-pulse 7s ease-in-out infinite',
            }}
          />

          <Box
            component={motion.div}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            sx={{
              position: 'relative',
              width: { xs: 240, sm: 300, md: 380, lg: 430 },
              aspectRatio: '1 / 1',
              borderRadius: isBackend ? '10px' : '32px',
              overflow: 'hidden',
              border: `1px solid ${isBackend ? 'var(--line-strong)' : 'var(--line)'}`,
              boxShadow: isBackend
                ? '0 40px 120px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(91,139,255,0.08)'
                : '0 30px 90px var(--glass-shadow)',
              backgroundColor: isBackend ? 'rgba(3,5,14,0.55)' : 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Box
              component="img"
              src="/me/nocanva.webp"
              alt={language === 'pt' ? 'Henrique Bisneto' : 'Henrique Bisneto'}
              width={1024}
              height={1024}
              sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box
              aria-hidden="true"
              sx={{
                position: 'absolute',
                inset: 0,
                background: isBackend
                  ? 'linear-gradient(180deg, transparent 40%, rgba(0,0,4,0.72) 100%)'
                  : 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.35) 100%)',
              }}
            />
            <Typography
              className="mono"
              sx={{
                position: 'absolute',
                left: 14,
                bottom: 12,
                color: 'rgba(255,255,255,0.86)',
                fontSize: '0.6rem',
                letterSpacing: '0.08em',
              }}
            >
              {language === 'pt' ? 'henrique bisneto · engenheiro de software' : 'henrique bisneto · software engineer'}
            </Typography>
          </Box>

          {!reduceMotion &&
            visibleFragments.map((fragment) => (
              <Box
                key={fragment.title}
                component={motion.div}
                initial={{ opacity: 0, y: 14, rotate: fragment.rotate }}
                animate={{ opacity: 1, y: 0, rotate: fragment.rotate }}
                transition={{ duration: 0.8, delay: fragment.delay, ease: [0.16, 1, 0.3, 1] }}
                className={isBackend ? 'panel mono' : 'liquid-glass mono'}
                sx={{
                  position: 'absolute',
                  display: { xs: 'none', md: 'block' },
                  ...fragment.position,
                  px: 1.4,
                  py: 1.1,
                  borderRadius: isBackend ? '7px' : '12px',
                  width: 'max-content',
                  maxWidth: 220,
                  fontSize: '0.58rem',
                  lineHeight: 1.65,
                  color: 'text.secondary',
                }}
              >
                <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.56rem', mb: 0.4 }}>
                  {fragment.title}
                </Typography>
                {fragment.lines.map((line) => (
                  <Box key={line} sx={{ whiteSpace: 'pre' }}>
                    {line}
                  </Box>
                ))}
              </Box>
            ))}
        </Box>
      </Box>

      <Stack
        direction="column"
        alignItems="center"
        spacing={0.6}
        sx={{
          position: 'absolute',
          bottom: { xs: 14, md: 22 },
          left: '50%',
          translate: '-50% 0',
          display: { xs: 'none', md: 'flex' },
          pointerEvents: 'none',
        }}
      >
        <Typography
          className="mono"
          sx={{
            color: 'text.secondary',
            fontSize: '0.58rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          {content.heroHint[language]}
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: '1px solid var(--line)',
            color: 'var(--accent)',
            fontSize: '0.9rem',
            lineHeight: 1,
            animation: reduceMotion ? 'none' : 'scroll-hint 1.8s ease-in-out infinite',
          }}
        >
          ↓
        </Box>
      </Stack>
    </Box>
  )
}

export default TrackHero
