import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Box, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NeuralField from '../../components/NeuralField/NeuralField'
import SiteNav from '../../components/SiteNav/SiteNav'
import { TrackFooter } from '../../components/TrackContact/TrackContact'
import TrackTheme from '../../components/TrackTheme/TrackTheme'
import { githubUrl, linkedInUrl } from '../../content/portfolio'
import { hubCopy, tracks } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

const Hub = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = hubCopy[language]

  const cards = [
    {
      to: '/frontend',
      label: tracks.frontend.label,
      tagline: tracks.frontend.tagline[language],
      meta: `${tracks.frontend.projects.length} · ${language === 'pt' ? 'interfaces & motion' : 'interfaces & motion'}`,
    },
    {
      to: '/backend',
      label: tracks.backend.label,
      tagline: tracks.backend.tagline[language],
      meta: `${tracks.backend.projects.length} · ${language === 'pt' ? 'serviços & dados' : 'services & data'}`,
    },
  ]

  return (
    <TrackTheme track="hub">
      <SiteNav track="hub" />

      <Box
        component="main"
        sx={{ position: 'relative', display: 'flex', minHeight: '100vh', alignItems: 'center', overflow: 'hidden', px: { xs: 2.5, md: 6, lg: 9 }, py: { xs: 14, md: 16 } }}
      >
        <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
          <NeuralField intensity={0.8} />
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(60% 50% at 50% 20%, var(--accent-soft), transparent 62%)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1180, mx: 'auto' }}>
          <Stack direction="row" alignItems="center" spacing={1.4} sx={{ mb: 3 }}>
            <Box
              className="mono"
              sx={{
                px: 1.2,
                py: 0.5,
                borderRadius: '9999px',
                border: '1px solid var(--line)',
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
              }}
            >
              {copy.kicker}
            </Box>
            <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.64rem' }}>
              {language === 'pt' ? 'selecione um ambiente' : 'select an environment'}
            </Typography>
          </Stack>

          <Typography
            component="h1"
            sx={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.6rem, 6vw, 5.4rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.045em',
              maxWidth: 900,
            }}
          >
            {copy.title}
          </Typography>

          <Typography sx={{ mt: 3, maxWidth: '60ch', color: 'text.secondary', fontSize: { xs: '0.92rem', md: '1.02rem' }, fontWeight: 300, lineHeight: 1.7 }}>
            {copy.lead}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              mt: { xs: 6, md: 7 },
              gap: { xs: 2, md: 2.5 },
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            {cards.map((card, index) => {
              const isBackend = card.to === '/backend'

              return (
                <Box
                  key={card.to}
                  component={motion.div}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.12 * index, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Box
                    component={Link}
                    to={card.to}
                    className={isBackend ? 'panel panel-glow mono' : 'liquid-glass-strong'}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      p: { xs: 2.6, md: 3.2 },
                      minHeight: { xs: 200, md: 240 },
                      borderRadius: isBackend ? '12px' : '1.8rem',
                      color: 'text.primary',
                      textDecoration: 'none',
                      transition: 'transform 320ms var(--ease-out)',
                      '&:hover, &:focus-visible': { transform: 'translateY(-4px)' },
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                        /{card.label.toLowerCase()}
                      </Typography>
                      <ArrowOutwardRoundedIcon sx={{ fontSize: '1.1rem', opacity: 0.7 }} />
                    </Stack>

                    <Typography
                      sx={{
                        fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
                        fontStyle: isBackend ? 'normal' : 'italic',
                        fontSize: isBackend ? 'clamp(1.5rem, 2.4vw, 2rem)' : 'clamp(2rem, 3.4vw, 2.9rem)',
                        lineHeight: 1.02,
                        letterSpacing: '-0.035em',
                        mt: 'auto',
                      }}
                    >
                      {card.label}
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', fontSize: '0.84rem', fontWeight: 300, lineHeight: 1.6 }}>
                      {card.tagline}
                    </Typography>

                    <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {card.meta}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Typography className="mono" sx={{ mt: 5, color: 'text.secondary', fontSize: '0.64rem', maxWidth: '60ch', lineHeight: 1.7 }}>
            {copy.hint}
          </Typography>

          <Stack direction="row" spacing={2.4} sx={{ mt: 4 }}>
            <Box component="a" href={githubUrl} target="_blank" rel="noopener noreferrer" className="mono" sx={{ color: 'text.secondary', fontSize: '0.66rem', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
              GitHub
            </Box>
            <Box component="a" href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="mono" sx={{ color: 'text.secondary', fontSize: '0.66rem', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
              LinkedIn
            </Box>
          </Stack>
        </Box>
      </Box>

      <TrackFooter track="hub" />
    </TrackTheme>
  )
}

export default Hub
