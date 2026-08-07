import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { capstoneUrl, presentationUrl, siteCopy } from '../../../../content/portfolio'
import { usePreferences } from '../../../../context/preferences'

const About = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = siteCopy[language].about
  const cards = [
    { icon: <WorkspacePremiumRoundedIcon />, title: copy.experienceTitle, body: copy.experience },
    { icon: <SchoolRoundedIcon />, title: copy.educationTitle, body: copy.education },
  ]

  return (
    <Box component="section" id="about" className="section-anchor" sx={{ position: 'relative', zIndex: 1, display: 'flex', minHeight: '100svh', alignItems: 'center', py: { xs: 12, md: 15 }, color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '0.9fr 1.1fr' }, alignItems: 'end', gap: { xs: 5, lg: 10 } }}>
          <Box>
            <Typography sx={{ mb: 2.5, color: 'text.secondary', fontSize: '0.76rem' }}>{copy.kicker}</Typography>
            <Typography component="h2" sx={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 'clamp(3.7rem, 7vw, 6.2rem)', fontWeight: 400, letterSpacing: '-0.045em', lineHeight: 0.84 }}>
              {copy.heading}
            </Typography>
          </Box>
          <Typography sx={{ maxWidth: '58ch', color: 'text.primary', fontSize: { xs: '0.9rem', md: '1rem' }, fontWeight: 300, lineHeight: 1.7 }}>
            {copy.intro}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5, mt: { xs: 6, md: 9 } }}>
          {cards.map((card, index) => (
            <Box
              key={card.title}
              component={motion.article}
              initial={reduceMotion ? false : { opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="liquid-glass"
              sx={{ minHeight: 280, borderRadius: '1.25rem', p: { xs: 3, md: 4 } }}
            >
              <Box className="liquid-glass" sx={{ display: 'grid', width: 46, height: 46, placeItems: 'center', borderRadius: '0.8rem' }}>
                {card.icon}
              </Box>
              <Typography component="h3" sx={{ mt: 5, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: '2.3rem', fontWeight: 400, lineHeight: 1 }}>
                {card.title}
              </Typography>
              <Typography sx={{ mt: 2, color: 'text.primary', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.65 }}>
                {card.body}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
          <Button component="a" href={capstoneUrl} target="_blank" rel="noopener noreferrer" className="liquid-glass-strong" endIcon={<ArrowOutwardRoundedIcon />} sx={{ borderRadius: '9999px', px: 2.5, py: 1.25, color: 'text.primary' }}>
            {copy.capstone}
          </Button>
          <Button component="a" href={presentationUrl} target="_blank" rel="noopener noreferrer" endIcon={<ArrowOutwardRoundedIcon />} sx={{ borderRadius: '9999px', px: 2.5, color: 'text.primary' }}>
            {copy.presentation}
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default About
