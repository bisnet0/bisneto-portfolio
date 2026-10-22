import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { cvUrl, emailUrl, githubUrl, linkedInUrl, siteCopy } from '../../content/portfolio'
import type { TrackContent, TrackId } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

interface TrackContactProps {
  track: TrackId
  content: TrackContent
}

const TrackContact = ({ track, content }: TrackContactProps) => {
  const { language } = usePreferences()
  const copy = siteCopy[language]
  const isBackend = track === 'backend'

  const linkSx = {
    px: 1.7,
    py: 1,
    borderRadius: isBackend ? '6px' : '9999px',
    border: '1px solid var(--line)',
    color: 'text.primary',
    fontSize: '0.7rem',
  } as const

  return (
    <Box
      component="section"
      id="contact"
      className="section-anchor"
      sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, md: 6, lg: 9 }, pt: { xs: 12, md: 16 }, pb: { xs: 6, md: 8 } }}
    >
      <Box
        className={isBackend ? 'panel mono' : 'liquid-glass'}
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 7 },
          borderRadius: isBackend ? '12px' : '2rem',
        }}
      >
        <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', mb: 2 }}>
          {copy.contact.kicker}
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
            fontStyle: isBackend ? 'normal' : 'italic',
            fontSize: isBackend ? 'clamp(1.5rem, 3vw, 2.4rem)' : 'clamp(2rem, 4.2vw, 3.6rem)',
            lineHeight: isBackend ? 1.15 : 0.98,
            letterSpacing: '-0.03em',
            maxWidth: 780,
          }}
        >
          {content.contactHeading[language]}
        </Typography>
        <Typography sx={{ mt: 2.4, maxWidth: '62ch', color: 'text.secondary', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.7 }}>
          {content.contactBody[language]}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1.1} sx={{ mt: 4 }}>
          <Button
            component="a"
            href={emailUrl}
            endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: '0.9rem !important' }} />}
            className={isBackend ? 'mono' : 'liquid-glass-strong'}
            sx={{
              px: 2.2,
              py: 1.1,
              borderRadius: isBackend ? '6px' : '9999px',
              color: isBackend ? 'var(--page-bg)' : 'text.primary',
              backgroundColor: isBackend ? 'var(--accent)' : undefined,
              fontSize: '0.72rem',
            }}
          >
            {copy.contact.email}
          </Button>
          <Button component="a" href={cvUrl} target="_blank" rel="noopener noreferrer" sx={linkSx}>
            {copy.contact.cv}
          </Button>
          <Button component="a" href={githubUrl} target="_blank" rel="noopener noreferrer" sx={linkSx}>
            GitHub
          </Button>
          <Button component="a" href={linkedInUrl} target="_blank" rel="noopener noreferrer" sx={linkSx}>
            LinkedIn
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

interface TrackFooterProps {
  track: TrackId
}

export const TrackFooter = ({ track }: TrackFooterProps) => {
  const { language } = usePreferences()
  const copy = siteCopy[language]
  const isBackend = track === 'backend'
  const other = isBackend ? { to: '/frontend', label: 'Frontend' } : { to: '/backend', label: 'Backend' }

  return (
    <Box component="footer" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, md: 6, lg: 9 }, pb: { xs: 4, md: 5 } }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        gap={2}
        sx={{ maxWidth: 1440, mx: 'auto', pt: 3, borderTop: '1px solid var(--line)' }}
      >
        <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.62rem' }}>
          © {new Date().getFullYear()} {copy.footer.rights}
        </Typography>
        <Stack direction="row" spacing={2.2} alignItems="center">
          <Box component={Link} to="/" sx={{ color: 'text.secondary', fontSize: '0.66rem', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
            {language === 'pt' ? 'Início' : 'Home'}
          </Box>
          <Box component={Link} to={other.to} sx={{ color: 'text.secondary', fontSize: '0.66rem', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
            {other.label}
          </Box>
          <Box
            component="a"
            href="#home"
            sx={{ color: 'text.secondary', fontSize: '0.66rem', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
          >
            {copy.footer.backToTop}
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default TrackContact
