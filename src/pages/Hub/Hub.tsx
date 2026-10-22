import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GalleryDialog from '../../components/GalleryDialog/GalleryDialog'
import NeuralField from '../../components/NeuralField/NeuralField'
import ProjectDeck from '../../components/ProjectDeck/ProjectDeck'
import SiteNav from '../../components/SiteNav/SiteNav'
import { TrackFooter } from '../../components/TrackContact/TrackContact'
import TrackTheme from '../../components/TrackTheme/TrackTheme'
import TypingText from '../../components/TypingText/TypingText'
import { githubUrl, linkedInUrl } from '../../content/portfolio'
import { hubCopy, hubDeck, tracks } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

/** Slow on purpose: the persona swap is a glitch, not a slideshow. */
const SWITCH_MS = 12000

interface GalleryState {
  title: string
  subtitle?: string
  images: string[]
  link?: { label: string; url: string }
}

/**
 * Words alternate between the frontend (serif italic) and backend (mono) typefaces,
 * so a single sentence looks like a broken render — the whole point of the glitch.
 */
const GlitchWords = ({ text, primary }: { text: string; primary: 'frontend' | 'backend' }) => {
  const words = text.split(/\s+/).filter(Boolean)

  return (
    <>
      {words.map((word, index) => {
        const isFront = primary === 'frontend' ? index % 2 === 0 : index % 2 === 1

        return (
          <Box
            component="span"
            key={`${word}-${index}`}
            sx={{
              fontFamily: isFront ? 'var(--font-display)' : 'var(--font-mono)',
              fontStyle: isFront ? 'italic' : 'normal',
              fontWeight: isFront ? 400 : 500,
              fontSize: isFront ? '1.04em' : '0.82em',
              letterSpacing: isFront ? '-0.03em' : '-0.01em',
              display: 'inline-block',
              mr: '0.22em',
            }}
          >
            {word}
          </Box>
        )
      })}
    </>
  )
}

const Hub = () => {
  const { language } = usePreferences()
  const reduceMotion = useReducedMotion()
  const copy = hubCopy[language]
  const personas = useMemo(() => [tracks.frontend, tracks.backend], [])
  const projects = hubDeck.projects
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

  const openProject = (index: number) => {
    const entry = projects[index]
    if (!entry) return
    setGallery({
      title: entry.project.name[language],
      subtitle: entry.highlight,
      images: entry.project.images,
      link: entry.project.links[0],
    })
  }

  const accent = isBackend ? '#5b8bff' : 'var(--accent)'
  const panelBg = isBackend ? 'rgba(4, 6, 16, 0.86)' : 'var(--glass-bg)'
  const panelBorder = isBackend ? '1px solid rgba(91, 139, 255, 0.28)' : '1px solid var(--line)'

  return (
    <TrackTheme track="hub">
      <SiteNav track="hub" />

      <Box component="main" sx={{ position: 'relative' }}>
        {/* ---------- hero: persona alternada, glitch só no texto ---------- */}
        <Box
          component="section"
          id="home"
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
                  fontSize: isBackend ? 'clamp(1.9rem, 3.4vw, 3.2rem)' : 'clamp(2.4rem, 4.6vw, 4.2rem)',
                  lineHeight: 1.12,
                  maxWidth: 760,
                  minHeight: { xs: '3em', md: '2.4em' },
                  transition: 'color 400ms ease',
                }}
              >
                <GlitchWords text={persona.heroTitle[language]} primary={isBackend ? 'backend' : 'frontend'} />
              </Typography>

              <Typography
                sx={{
                  mt: 2.6,
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

        {/* ---------- deck com todos os projetos (mesmo motor das trilhas) ---------- */}
        <ProjectDeck track="frontend" content={hubDeck} onOpen={openProject} />

        {/* ---------- atalhos + contato ---------- */}
        <Box component="section" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, md: 6, lg: 9 }, pt: { xs: 10, md: 12 }, pb: { xs: 6, md: 8 } }}>
          <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
            <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', mb: 1.6 }}>
              {copy.kicker}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: { xs: '1.8rem', md: '2.8rem' },
                lineHeight: 1,
                letterSpacing: '-0.035em',
                maxWidth: 760,
              }}
            >
              {language === 'pt' ? 'Dois ambientes, um só engenheiro' : 'Two environments, one engineer'}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} sx={{ mt: 3 }}>
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

            <Typography className="mono" sx={{ mt: 3.4, color: 'text.secondary', fontSize: '0.62rem', maxWidth: '58ch', lineHeight: 1.7 }}>
              {copy.hint}
            </Typography>

            <Stack direction="row" spacing={2.4} sx={{ mt: 2.6 }}>
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
