import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded'
import { Box, Button, Container, Dialog, IconButton, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, type KeyboardEvent } from 'react'
import { projects, siteCopy, type ProjectLink } from '../../../../content/portfolio'
import { usePreferences } from '../../../../context/preferences'

const Projects = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = siteCopy[language].projects
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex]

  const openGallery = (projectIndex: number) => {
    setActiveProjectIndex(projectIndex)
    setActiveImageIndex(0)
  }

  const closeGallery = () => {
    setActiveProjectIndex(null)
    setActiveImageIndex(0)
  }

  const changeImage = (direction: -1 | 1) => {
    if (!activeProject) return
    setActiveImageIndex((current) => (current + direction + activeProject.images.length) % activeProject.images.length)
  }

  const getLinkLabel = (link: ProjectLink) => {
    if (link.type === 'case') return copy.viewCase
    if (link.type === 'code') return copy.viewCode
    return link.label || copy.visitWebsite
  }

  return (
    <Box component="section" id="projects" className="section-anchor" sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 16 }, color: 'text.primary' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' }, alignItems: 'end', gap: { xs: 4, lg: 10 }, mb: { xs: 6, md: 9 } }}>
          <Box>
            <Typography sx={{ mb: 2.5, color: 'text.secondary', fontSize: '0.76rem' }}>{copy.kicker}</Typography>
            <Typography component="h2" sx={{ maxWidth: 850, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 'clamp(3.8rem, 7vw, 6.4rem)', fontWeight: 400, letterSpacing: '-0.045em', lineHeight: 0.84 }}>
              {copy.heading}
            </Typography>
          </Box>
          <Typography sx={{ maxWidth: '56ch', color: 'text.primary', fontSize: { xs: '0.88rem', md: '0.96rem' }, fontWeight: 300, lineHeight: 1.65 }}>
            {copy.intro}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2.5, md: 3 } }}>
          {projects.map((project, projectIndex) => (
            <Box
              key={project.name.en}
              component={motion.article}
              initial={reduceMotion ? false : { opacity: 0, filter: 'blur(8px)', y: 30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65, delay: (projectIndex % 2) * 0.08, ease: 'easeOut' }}
              className="liquid-glass"
              sx={{ display: 'flex', minWidth: 0, flexDirection: 'column', borderRadius: '1.5rem', p: { xs: 1.5, sm: 2 } }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => openGallery(projectIndex)}
                aria-label={`${copy.gallery}: ${project.name[language]}`}
                sx={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  border: 0,
                  borderRadius: '1rem',
                  p: 0,
                  cursor: 'pointer',
                  background: '#090b0c',
                  '& img': { transition: 'transform 500ms cubic-bezier(.2,.8,.2,1)' },
                  '&:hover img, &:focus-visible img': { transform: 'scale(1.025)' },
                  '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 3 },
                }}
              >
                <Box component="img" src={project.cover} alt="" loading="lazy" decoding="async" width="960" height="600" sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
                <Box className="liquid-glass-strong" sx={{ position: 'absolute', right: 14, bottom: 14, display: 'flex', alignItems: 'center', gap: 0.8, borderRadius: '9999px', px: 1.4, py: 0.8, color: '#fff', fontSize: '0.66rem' }}>
                  <CollectionsRoundedIcon sx={{ fontSize: 17 }} />
                  {project.images.length}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', p: { xs: 1, sm: 1.5 }, pt: { xs: 2.5, sm: 3 } }}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
                  <Typography component="h3" sx={{ maxWidth: '75%', fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.94 }}>
                    {project.name[language]}
                  </Typography>
                  <Typography sx={{ pt: 0.5, color: 'text.secondary', fontSize: '0.62rem', textAlign: 'right' }}>{project.period[language]}</Typography>
                </Stack>

                <Typography sx={{ mt: 2, color: 'text.primary', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.6 }}>
                  {project.description[language]}
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 2.5 }} aria-label={copy.technologies}>
                  {project.technologies.map((technology) => (
                    <Box key={technology} className="liquid-glass" sx={{ borderRadius: '9999px', px: 1.2, py: 0.5, fontSize: '0.6rem' }}>
                      {technology}
                    </Box>
                  ))}
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 'auto', pt: 3 }}>
                  <Button onClick={() => openGallery(projectIndex)} className="liquid-glass-strong" sx={{ borderRadius: '9999px', px: 1.8, color: 'text.primary', fontSize: '0.68rem' }}>
                    {copy.gallery}
                  </Button>
                  {project.links.map((link) => (
                    <Button
                      key={link.url}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: '0.95rem !important' }} />}
                      sx={{ borderRadius: '9999px', px: 1.4, color: 'text.primary', fontSize: '0.65rem' }}
                    >
                      {getLinkLabel(link)}{project.links.filter((item) => item.type === link.type).length > 1 ? ` · ${link.label}` : ''}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      <Dialog
        open={Boolean(activeProject)}
        onClose={closeGallery}
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key === 'ArrowLeft') changeImage(-1)
          if (event.key === 'ArrowRight') changeImage(1)
        }}
        maxWidth="lg"
        fullWidth
        aria-labelledby="project-gallery-title"
        slotProps={{
          backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' } },
          paper: {
            className: 'liquid-glass-strong',
            sx: { overflow: 'visible', borderRadius: { xs: '1.25rem', md: '1.75rem' }, backgroundImage: 'none', m: { xs: 1.5, sm: 4 }, p: { xs: 1.5, md: 2 } },
          },
        }}
      >
        {activeProject && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ px: 1, pb: 1.5 }}>
              <Box>
                <Typography id="project-gallery-title" sx={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1 }}>
                  {activeProject.name[language]}
                </Typography>
                <Typography sx={{ mt: 0.5, color: 'text.secondary', fontSize: '0.65rem' }}>
                  {activeImageIndex + 1} / {activeProject.images.length}
                </Typography>
              </Box>
              <IconButton onClick={closeGallery} aria-label={copy.close} sx={{ color: 'text.primary' }}>
                <CloseRoundedIcon />
              </IconButton>
            </Stack>

            <Box sx={{ position: 'relative', display: 'grid', minHeight: { xs: 220, sm: 420 }, maxHeight: '72vh', placeItems: 'center', overflow: 'hidden', borderRadius: '1rem', backgroundColor: 'rgba(0,0,0,0.72)' }}>
              <Box
                key={activeProject.images[activeImageIndex]}
                component={motion.img}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                src={activeProject.images[activeImageIndex]}
                alt={`${copy.imageOf} ${activeProject.name[language]} ${activeImageIndex + 1}`}
                decoding="async"
                sx={{ display: 'block', width: '100%', height: '100%', maxHeight: '72vh', objectFit: 'contain' }}
              />

              <IconButton onClick={() => changeImage(-1)} aria-label={copy.previous} className="liquid-glass-strong" sx={{ position: 'absolute', left: { xs: 8, md: 16 }, width: { xs: 42, md: 50 }, height: { xs: 42, md: 50 }, color: '#fff' }}>
                <ArrowBackRoundedIcon />
              </IconButton>
              <IconButton onClick={() => changeImage(1)} aria-label={copy.next} className="liquid-glass-strong" sx={{ position: 'absolute', right: { xs: 8, md: 16 }, width: { xs: 42, md: 50 }, height: { xs: 42, md: 50 }, color: '#fff' }}>
                <ArrowForwardRoundedIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default Projects
