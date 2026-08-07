import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import { Box, Container, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { siteCopy } from '../../../../content/portfolio'
import { usePreferences } from '../../../../context/preferences'

const icons = [<CodeRoundedIcon />, <HubRoundedIcon />, <CloudDoneRoundedIcon />]

const Skills = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = siteCopy[language].expertise

  return (
    <Box component="section" id="expertise" className="section-anchor" sx={{ position: 'relative', zIndex: 1, display: 'flex', minHeight: '100svh', alignItems: 'center', py: { xs: 12, md: 15 }, color: 'text.primary' }}>
      <Container maxWidth="xl">
        <Typography sx={{ mb: 2.5, fontSize: '0.76rem', color: 'text.secondary' }}>{copy.kicker}</Typography>
        <Typography component="h2" sx={{ maxWidth: 700, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 'clamp(3.8rem, 8vw, 6.6rem)', fontWeight: 400, letterSpacing: '-0.045em', lineHeight: 0.84, textShadow: '0 2px 25px rgba(0,0,0,0.2)' }}>
          {copy.heading}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, mt: { xs: 6, md: 9 } }}>
          {copy.cards.map((card, index) => (
            <Box
              key={card.title}
              component={motion.article}
              initial={reduceMotion ? false : { opacity: 0, filter: 'blur(10px)', y: 30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.12, duration: 0.65, ease: 'easeOut' }}
              className="liquid-glass"
              sx={{ display: 'flex', minHeight: { xs: 330, md: 390 }, flexDirection: 'column', borderRadius: '1.25rem', p: 3 }}
            >
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
                <Box className="liquid-glass" sx={{ display: 'grid', width: 46, height: 46, flex: '0 0 auto', placeItems: 'center', borderRadius: '0.8rem', '& svg': { fontSize: 25 } }}>
                  {icons[index]}
                </Box>
                <Stack direction="row" flexWrap="wrap" justifyContent="flex-end" gap={0.75}>
                  {card.tags.map((tag) => (
                    <Box key={tag} className="liquid-glass" sx={{ borderRadius: '9999px', px: 1.3, py: 0.55, fontSize: '0.62rem', whiteSpace: 'nowrap' }}>
                      {tag}
                    </Box>
                  ))}
                </Stack>
              </Stack>
              <Box sx={{ flex: 1 }} />
              <Typography component="h3" sx={{ mt: 4, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: { xs: '2.25rem', lg: '2.75rem' }, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.9 }}>
                {card.title}
              </Typography>
              <Typography sx={{ mt: 2, maxWidth: '38ch', color: 'text.primary', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.55 }}>
                {card.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Skills
