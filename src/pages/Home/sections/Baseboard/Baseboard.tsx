import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { cvUrl, emailUrl, githubUrl, linkedInUrl, siteCopy } from '../../../../content/portfolio'
import { usePreferences } from '../../../../context/preferences'

const Baseboard = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = siteCopy[language]

  return (
    <Box component="footer" id="contact" className="section-anchor" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 3 }, pt: { xs: 8, md: 12 }, pb: 3, color: 'text.primary' }}>
      <Container
        maxWidth="lg"
        component={motion.div}
        initial={reduceMotion ? false : { opacity: 0, filter: 'blur(10px)', y: 30 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="liquid-glass-strong"
        sx={{ borderRadius: { xs: '1.5rem', md: '2.25rem' }, px: { xs: 3, md: 7 }, py: { xs: 6, md: 8 }, textAlign: 'center' }}
      >
        <Typography sx={{ color: 'text.secondary', fontSize: '0.74rem' }}>{copy.contact.kicker}</Typography>
        <Typography component="h2" sx={{ mt: 2.5, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 'clamp(3.4rem, 7vw, 6.2rem)', fontWeight: 400, letterSpacing: '-0.045em', lineHeight: 0.85 }}>
          {copy.contact.heading}
        </Typography>
        <Typography sx={{ mx: 'auto', mt: 3, maxWidth: 620, color: 'text.primary', fontSize: { xs: '0.85rem', md: '0.96rem' }, fontWeight: 300, lineHeight: 1.65 }}>
          {copy.contact.description}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center" spacing={1.5} sx={{ mt: 4 }}>
          <Button component="a" href={emailUrl} endIcon={<ArrowOutwardRoundedIcon />} sx={{ borderRadius: '9999px', px: 2.5, py: 1.25, color: '#050607', backgroundColor: '#fff', '&:hover': { backgroundColor: '#eceff1' } }}>
            {copy.contact.email}
          </Button>
          <Button component="a" href={cvUrl} target="_blank" rel="noopener noreferrer" sx={{ borderRadius: '9999px', px: 2.5, py: 1.25, color: 'text.primary' }}>
            {copy.contact.cv}
          </Button>
        </Stack>

        <Typography sx={{ mt: 5, color: 'text.secondary', fontSize: '0.66rem' }}>{copy.contact.social}</Typography>
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1.5 }}>
          <IconButton component="a" href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="liquid-glass" sx={{ width: 46, height: 46, color: 'text.primary' }}>
            <GitHubIcon />
          </IconButton>
          <IconButton component="a" href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="liquid-glass" sx={{ width: 46, height: 46, color: 'text.primary' }}>
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Container>

      <Stack direction={{ xs: 'column-reverse', sm: 'row' }} alignItems="center" justifyContent="space-between" gap={2} sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, md: 3 }, pt: 4 }}>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.64rem' }}>
          © {new Date().getFullYear()} {copy.footer.rights}
        </Typography>
        <Button component="a" href="#home" endIcon={<ArrowUpwardRoundedIcon />} sx={{ borderRadius: '9999px', color: 'text.primary', fontSize: '0.68rem' }}>
          {copy.footer.backToTop}
        </Button>
      </Stack>
    </Box>
  )
}

export default Baseboard
