import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AutoCarousel from '../../components/AutoCarousel/AutoCarousel'
import GalleryDialog from '../../components/GalleryDialog/GalleryDialog'
import NeuralField from '../../components/NeuralField/NeuralField'
import SiteNav from '../../components/SiteNav/SiteNav'
import { TrackFooter } from '../../components/TrackContact/TrackContact'
import TrackTheme from '../../components/TrackTheme/TrackTheme'
import TypingText from '../../components/TypingText/TypingText'
import { githubUrl, linkedInUrl } from '../../content/portfolio'
import { hubCopy, hubProjects, tracks } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

const SWITCH_MS = 7000

interface GalleryState {
  title: string
  subtitle?: string
  images: string[]
  link?: { label: string; url: string }
}

const Hub = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = hubCopy[language]
  const personas = useMemo(() => [tracks.frontend, tracks.backend], [])
  const projects = useMemo(() => hubProjects(), [])
  const [personaIndex, setPersonaIndex] = useState(0)
  const [glitch, setGlitch] = useState(0)
  const [gallery, setGallery] = useState<GalleryState | null>(null)

  const persona = personas[personaIndex]
  const isBackend = persona.id === 'backend'

  useEffect(() => {
    if (reduceMotion) return

    const timer = window.setInterval(() => {
      setPersonaIndex((current) => (current + 1) % personas.length)
      setGlitch((current) => current + 1)
    }, SWITCH_MS)

    return () => window.clearInterval(timer)
  }, [personas.length, reduceMotion])

  const switchTo = (index: number) => {
    if (index === personaIndex) return
    setPersonaIndex(index)
    setGlitch((current) => current + 1)
  }

  const accent = isBackend ? '#5b8bff' : 'var(--accent)'
  const panelBg = isBackend ? 'rgba(4, 6, 16, 0.86)' : 'var(--glass-bg)'
  const panelBorder = isBackend ? '1px solid rgba(91, 139, 255, 0.28)' : '1px solid var(--line)'

  return (
    <TrackTheme track="hub">
      <SiteNav track="hub" />

      <Box component="main" sx={{ position: 'relative' }}>
        {/* ---------- hero: alterna front/back ---------- */}
        <Box
          component="section"
          sx={{
            position: 'relative',
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            overflow: 'hidden',
            px: { xs: 2.5, md: 6, lg: 9 },
            pt: { xs: 14, md: 16 },
            pb: { xs: 8, md: 10 },
          }}
        >
          <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, opacity: 0.7 }}>
            <NeuralField intensity={isBackend ? 1 : 0.8} repelRadius={isBackend ? 170 : 140} />
          </Box>
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              transition: 'background 900ms ease',
              background: isBackend
                ? 'radial-gradient(62% 52% at 64% 32%, rgba(36,60,108,0.55), transparent 64%), radial-gradient(46% 38% at 12% 86%, rgba(12,24,72,0.5), transparent 70%)'
                : 'radial-gradient(58% 46% at 68% 30%, var(--accent-soft), transparent 66%)',
            }}
          />

          <Box
            key={`hero-${glitch}`}
            className={`${glitch > 0 && !reduceMotion ? 'glitch-hit' : ''}`}
            sx={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              width: '100%',
              maxWidth: 1440,
              mx: 'auto',
              alignItems: 'center',
              gap: { xs: 5, lg: 6 },
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.04fr) minmax(0, 0.82fr)' },
            }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 2.6 }}>
                <Box
                  className="mono"
                  sx={{
                    px: 1.2,
                    py: 0.45,
                    borderRadius: isBackend ? '4px' : '9999px',
                    border: `1px solid ${isBackend ? 'rgba(91,139,255,0.4)' : 'var(--line)'}`,
                    backgroundColor: isBackend ? 'rgba(91,139,255,0.12)' : 'var(--accent-soft)',
                    color: accent,
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    transition: 'all 400ms ease',
                  }}
                >
                  {persona.kicker}
                </Box>
                <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.64rem' }}>
                  {persona.tagline[language]}
                </Typography>
              </Stack>

              <Box
                className="mono"
                sx={{
                  mb: 3,
                  px: 1.8,
                  py: 1.4,
                  borderRadius: isBackend ? '8px' : '14px',
                  border: panelBorder,
                  backgroundColor: panelBg,
                  color: accent,
                  fontSize: { xs: '0.66rem', md: '0.74rem' },
                  lineHeight: 1.6,
                  maxWidth: 540,
                  minHeight: 96,
                  transition: 'border-color 400ms ease, background-color 400ms ease',
                }}
              >
                <TypingText key={persona.id} lines={persona.typedLines[language]} speed={14} lineDelay={300} />
              </Box>

              <Typography
                component="h1"
                className={glitch > 0 && !reduceMotion ? 'glitch-text' : undefined}
                sx={{
                  fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
                  fontStyle: isBackend ? 'normal' : 'italic',
                  fontWeight: isBackend ? 500 : 400,
                  fontSize: isBackend ? 'clamp(1.8rem, 3.2vw, 3rem)' : 'clamp(2.6rem, 5vw, 4.6rem)',
                  lineHeight: isBackend ? 1.1 : 0.95,
                  letterSpacing: isBackend ? '-0.03em' : '-0.045em',
                  maxWidth: 720,
                  minHeight: { xs: '3.2em', md: '2.6em' },
                  transition: 'color 400ms ease',
                }}
              >
                {persona.heroTitle[language]}
              </Typography>

              <Typography
                sx={{
                  mt: 2.4,
                  maxWidth: '58ch',
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', md: '0.98rem' },
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {persona.heroLead[language]}
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mt: 3.4 }}>
                {persona.stack.slice(0, 6).map((item) => (
                  <Box
                    key={item}
                    className="mono"
                    sx={{
                      px: 1.1,
                      py: 0.4,
                      borderRadius: isBackend ? '4px' : '9999px',
                      border: `1px solid ${isBackend ? 'rgba(91,139,255,0.24)' : 'var(--line)'}`,
                      color: 'text.secondary',
                      fontSize: '0.6rem',
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Stack>

              <Stack direction="row" alignItems="center" gap={1.4} sx={{ mt: 4.2 }}>
                <Button
                  component="a"
                  href="#projects"
                  className="mono"
                  endIcon={<ArrowDownwardRoundedIcon sx={{ fontSize: '1rem !important' }} />}
                  sx={{
                    px: 2.2,
                    py: 1,
                    borderRadius: isBackend ? '6px' : '9999px',
                    border: panelBorder,
                    color: 'text.primary',
                    fontSize: '0.7rem',
                    '&:hover': { borderColor: accent, color: accent },
                  }}
                >
                  {language === 'pt' ? 'ver todos os projetos' : 'see all projects'}
                </Button>

                <Stack direction="row" spacing={0.6} sx={{ ml: 'auto' }}>
                  {personas.map((item, index) => (
                    <Box
                      key={item.id}
                      component="button"
                      type="button"
                      onClick={() => switchTo(index)}
                      aria-label={item.label}
                      aria-pressed={index === personaIndex}
                      className="mono"
                      sx={{
                        px: 1,
                        py: 0.4,
                        border: 0,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.56rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: index === personaIndex ? 'var(--page-bg)' : 'text.secondary',
                        backgroundColor: index === personaIndex ? accent : 'transparent',
                        opacity: index === personaIndex ? 1 : 0.65,
                      }}
                    >
                      {item.label}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>

            {/* foto: moldura muda com a persona */}
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  width: { xs: 240, md: 340, lg: 400 },
                  height: { xs: 240, md: 340, lg: 400 },
                  borderRadius: '50%',
                  background: isBackend
                    ? 'radial-gradient(circle, rgba(91,139,255,0.3), transparent 62%)'
                    : 'radial-gradient(circle, var(--accent-soft), transparent 65%)',
                  filter: 'blur(12px)',
                  animation: reduceMotion ? 'none' : 'glow-pulse 7s ease-in-out infinite',
                  transition: 'background 800ms ease',
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 230, sm: 290, md: 350, lg: 400 },
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  borderRadius: isBackend ? '10px' : '32px',
                  border: panelBorder,
                  backgroundColor: isBackend ? 'rgba(3,5,14,0.55)' : 'rgba(255,255,255,0.04)',
                  boxShadow: isBackend
                    ? '0 40px 120px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(91,139,255,0.08)'
                    : '0 30px 90px var(--glass-shadow)',
                  transition: 'border-radius 500ms ease, border-color 400ms ease',
                }}
              >
                {isBackend && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      position: 'absolute',
                      zIndex: 2,
                      top: 0,
                      left: 0,
                      right: 0,
                      px: 1.2,
                      py: 0.7,
                      borderBottom: '1px solid rgba(91,139,255,0.22)',
                      backgroundColor: 'rgba(4,6,16,0.8)',
                    }}
                  >
                    <Stack direction="row" spacing={0.5}>
                      {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
                        <Box key={color} sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color, opacity: 0.8 }} />
                      ))}
                    </Stack>
                    <Typography className="mono" sx={{ color: 'rgba(196,208,255,0.7)', fontSize: '0.52rem' }}>
                      ~/henrique/profile.whoami
                    </Typography>
                  </Stack>
                )}
                <Box
                  component="img"
                  src="/me/nocanva.webp"
                  alt="Henrique Bisneto"
                  width={900}
                  height={900}
                  sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ---------- todos os projetos ---------- */}
        <Box component="section" id="projects" className="section-anchor" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, md: 6, lg: 9 }, py: { xs: 10, md: 14 } }}>
          <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
            <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', mb: 2 }}>
              {copy.kicker} · {language === 'pt' ? 'todos os projetos' : 'all projects'}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: { xs: '2rem', md: '3.4rem' },
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                maxWidth: 820,
              }}
            >
              {language === 'pt' ? 'Front e back no mesmo lugar' : 'Front and back in one place'}
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '62ch', color: 'text.secondary', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7 }}>
              {language === 'pt'
                ? `${projects.length} cases das duas trilhas. Cada card diz de onde veio — clique para abrir a galeria.`
                : `${projects.length} cases from both tracks. Each card tells where it came from — click to open the gallery.`}
            </Typography>

            <Box
              sx={{
                mt: { xs: 5, md: 6 },
                display: 'grid',
                gap: { xs: 2, md: 2.4 },
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
              }}
            >
              {projects.map(({ entry, track }, index) => {
                const cardIsBackend = track === 'backend'
                const cardAccent = cardIsBackend ? '#5b8bff' : 'var(--accent)'

                return (
                  <Box
                    key={`${track}-${entry.project.slug}`}
                    component={motion.article}
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.05, ease: 'easeOut' }}
                    className={cardIsBackend ? 'panel mono' : 'liquid-glass'}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      borderRadius: cardIsBackend ? '10px' : '1.3rem',
                    }}
                  >
                    <AutoCarousel
                      images={[entry.project.cover, ...entry.project.images]}
                      alt={entry.project.name[language]}
                      aspectRatio="16 / 9"
                      onActivate={() =>
                        setGallery({
                          title: entry.project.name[language],
                          subtitle: entry.highlight,
                          images: entry.project.images,
                          link: entry.project.links[0],
                        })
                      }
                    />

                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 1, p: 1.9 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box
                          className="mono"
                          sx={{
                            px: 0.9,
                            py: 0.3,
                            borderRadius: '4px',
                            border: `1px solid ${cardIsBackend ? 'rgba(91,139,255,0.3)' : 'var(--line)'}`,
                            color: cardAccent,
                            fontSize: '0.52rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {track}
                        </Box>
                        <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.54rem' }}>
                          {entry.project.period[language]}
                        </Typography>
                      </Stack>

                      <Typography
                        component="h3"
                        sx={{
                          fontFamily: cardIsBackend ? 'var(--font-mono)' : 'var(--font-display)',
                          fontStyle: cardIsBackend ? 'normal' : 'italic',
                          fontSize: cardIsBackend ? 'clamp(1.05rem, 1.6vw, 1.3rem)' : 'clamp(1.3rem, 2vw, 1.7rem)',
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {entry.project.name[language]}
                      </Typography>

                      <Typography sx={{ color: 'text.secondary', fontSize: '0.76rem', fontWeight: 300, lineHeight: 1.6 }}>
                        {entry.focus[language]}
                      </Typography>

                      <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 'auto', pt: 1 }}>
                        {entry.project.technologies.slice(0, 4).map((technology) => (
                          <Box
                            key={technology}
                            className="mono"
                            sx={{
                              px: 0.8,
                              py: 0.25,
                              borderRadius: '3px',
                              backgroundColor: 'var(--accent-soft)',
                              color: 'text.primary',
                              fontSize: '0.52rem',
                            }}
                          >
                            {technology}
                          </Box>
                        ))}
                      </Stack>

                      <Box
                        component={Link}
                        to={`/${track}`}
                        className="mono"
                        sx={{ mt: 0.8, color: cardAccent, fontSize: '0.56rem', letterSpacing: '0.06em', textDecoration: 'none' }}
                      >
                        {language === 'pt' ? 'ver na trilha' : 'see in track'} ↗
                      </Box>
                    </Box>
                  </Box>
                )
              })}
            </Box>

            {/* atalhos para os ambientes */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} sx={{ mt: { xs: 5, md: 6 } }}>
              {[tracks.frontend, tracks.backend].map((item) => (
                <Button
                  key={item.id}
                  component={Link}
                  to={`/${item.id}`}
                  endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: '0.9rem !important' }} />}
                  className="mono"
                  sx={{
                    px: 2,
                    py: 1.1,
                    borderRadius: '6px',
                    border: '1px solid var(--line)',
                    color: 'text.primary',
                    fontSize: '0.68rem',
                    '&:hover': { borderColor: 'var(--accent)', color: 'var(--accent)' },
                  }}
                >
                  /{item.id} · {item.tagline[language]}
                </Button>
              ))}
            </Stack>

            <Typography className="mono" sx={{ mt: 4, color: 'text.secondary', fontSize: '0.62rem', maxWidth: '58ch', lineHeight: 1.7 }}>
              {copy.hint}
            </Typography>

            <Stack direction="row" spacing={2.4} sx={{ mt: 3 }}>
              <Box component="a" href={githubUrl} target="_blank" rel="noopener noreferrer" className="mono" sx={{ color: 'text.secondary', fontSize: '0.64rem', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                GitHub
              </Box>
              <Box component="a" href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="mono" sx={{ color: 'text.secondary', fontSize: '0.64rem', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
                LinkedIn
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>

      <TrackFooter track="hub" />

      <GalleryDialog
        open={Boolean(gallery)}
        title={gallery?.title ?? ''}
        subtitle={gallery?.subtitle}
        images={gallery?.images ?? []}
        link={gallery?.link}
        track="hub"
        onClose={() => setGallery(null)}
      />
    </TrackTheme>
  )
}

export default Hub
