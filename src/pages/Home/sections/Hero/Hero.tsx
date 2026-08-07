import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import BlurText from '../../../../components/BlurText/BlurText'
import { emailUrl, siteCopy } from '../../../../content/portfolio'
import { usePreferences } from '../../../../context/preferences'

const entrance = (delay: number, reduceMotion: boolean | null) => reduceMotion
  ? { initial: false as const }
  : {
      initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
      animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
      transition: { delay, duration: 0.7, ease: 'easeOut' as const },
    }

const Hero = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = siteCopy[language].hero
  const stack = ['TypeScript', 'React', 'Node.js', 'Python', 'Docker']

  return (
    <Box
      component="section"
      id="home"
      className="section-anchor"
      sx={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        minHeight: '100svh',
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'text.primary',
        pt: { xs: 13, md: 15 },
        pb: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <Stack alignItems="center" textAlign="center">
          <Box
            component={motion.div}
            {...entrance(0.35, reduceMotion)}
            className="liquid-glass"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, borderRadius: '9999px', p: 0.6, pr: 1.5 }}
          >
            <Box sx={{ borderRadius: '9999px', px: 1.4, py: 0.55, color: '#060708', backgroundColor: '#fff', fontSize: '0.68rem', fontWeight: 600 }}>
              {copy.badgeChip}
            </Box>
            <Typography sx={{ fontSize: { xs: '0.68rem', sm: '0.78rem' }, fontWeight: 400 }}>
              {copy.badge}
            </Typography>
          </Box>

          <BlurText
            text={copy.headline}
            style={{
              maxWidth: '980px',
              width: '100%',
              margin: 'clamp(22px, 4vh, 38px) auto 0',
              color: 'var(--text-primary)',
              fontFamily: 'Instrument Serif, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(3.4rem, 8vw, 7rem)',
              fontWeight: 400,
              letterSpacing: '-0.045em',
              lineHeight: 0.82,
              textShadow: '0 2px 24px rgba(0,0,0,0.24)',
            }}
          />

          <Typography
            component={motion.p}
            {...entrance(0.8, reduceMotion)}
            sx={{ mt: 3, mb: 0, maxWidth: 720, color: 'text.primary', fontSize: { xs: '0.86rem', md: '1rem' }, fontWeight: 300, lineHeight: 1.45, textShadow: '0 1px 16px rgba(0,0,0,0.28)' }}
          >
            {copy.description}
          </Typography>

          <Stack component={motion.div} {...entrance(1.05, reduceMotion)} direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              component="a"
              href="#projects"
              className="liquid-glass-strong"
              endIcon={<ArrowOutwardRoundedIcon />}
              sx={{ borderRadius: '9999px', px: 2.5, py: 1.25, color: 'text.primary', fontSize: '0.8rem' }}
            >
              {copy.primaryCta}
            </Button>
            <Button component="a" href={emailUrl} sx={{ borderRadius: '9999px', px: 2, color: 'text.primary', fontSize: '0.8rem' }}>
              {copy.secondaryCta}
            </Button>
          </Stack>

          <Stack component={motion.div} {...entrance(1.25, reduceMotion)} direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4, width: { xs: '100%', sm: 'auto' } }}>
            {[
              { icon: <CodeRoundedIcon />, number: copy.projectsNumber, label: copy.projectsLabel },
              { icon: <HubRoundedIcon />, number: copy.technologiesNumber, label: copy.technologiesLabel },
            ].map((stat) => (
              <Box key={stat.label} className="liquid-glass" sx={{ width: { xs: '100%', sm: 230 }, minHeight: 150, borderRadius: '1.25rem', p: 2.5, textAlign: 'left' }}>
                <Box sx={{ display: 'grid', width: 30, height: 30, placeItems: 'center', '& svg': { fontSize: 25 } }}>{stat.icon}</Box>
                <Typography sx={{ mt: 2.5, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: '2.5rem', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
                  {stat.number}
                </Typography>
                <Typography sx={{ mt: 1, color: 'text.primary', fontSize: '0.68rem', fontWeight: 300 }}>{stat.label}</Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack component={motion.div} {...entrance(1.4, reduceMotion)} alignItems="center" spacing={2} sx={{ mt: { xs: 5, md: 7 } }}>
          <Box className="liquid-glass" sx={{ borderRadius: '9999px', px: 1.6, py: 0.7, fontSize: '0.65rem', fontWeight: 500 }}>
            {copy.stackIntro}
          </Box>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={{ xs: 2.5, sm: 5, md: 7 }}>
            {stack.map((name) => (
              <Typography key={name} sx={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: { xs: '1.35rem', md: '1.8rem' }, lineHeight: 1 }}>
                {name}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero
