import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useState, type KeyboardEvent } from 'react'
import { siteCopy } from '../../content/portfolio'
import type { TrackProjectEntry } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

interface ProjectGalleryDialogProps {
  entries: TrackProjectEntry[]
  index: number | null
  track: 'frontend' | 'backend'
  onClose: () => void
}

const ProjectGalleryDialog = ({ entries, index, track, onClose }: ProjectGalleryDialogProps) => {
  const { language, mode } = usePreferences()
  const copy = siteCopy[language].projects
  const [imageIndex, setImageIndex] = useState(0)
  const entry = index === null ? null : entries[index]
  const isBackend = track === 'backend'

  useEffect(() => {
    setImageIndex(0)
  }, [index])

  const changeImage = (direction: -1 | 1) => {
    if (!entry) return
    setImageIndex((current) => (current + direction + entry.project.images.length) % entry.project.images.length)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') changeImage(-1)
    if (event.key === 'ArrowRight') changeImage(1)
  }

  return (
    <Dialog
      open={Boolean(entry)}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      maxWidth="lg"
      fullWidth
      aria-labelledby="project-gallery-title"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: mode === 'dark' ? 'rgba(0,0,4,0.82)' : 'rgba(12,16,20,0.55)',
            backdropFilter: 'blur(10px)',
          },
        },
        paper: {
          className: isBackend ? 'panel mono' : 'liquid-glass-strong',
          sx: {
            overflow: 'visible',
            borderRadius: isBackend ? '10px' : { xs: '1.25rem', md: '1.75rem' },
            backgroundImage: 'none',
            m: { xs: 1.5, sm: 4 },
            p: { xs: 1.4, md: 2 },
          },
        },
      }}
    >
      {entry && (
        <>
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ px: 1, pb: 1.5 }}>
            <Box>
              <Typography
                id="project-gallery-title"
                sx={{
                  fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
                  fontStyle: isBackend ? 'normal' : 'italic',
                  fontSize: { xs: '1.3rem', md: '1.9rem' },
                  lineHeight: 1.1,
                }}
              >
                {entry.project.name[language]}
              </Typography>
              <Typography className="mono" sx={{ mt: 0.5, color: 'var(--accent)', fontSize: '0.62rem' }}>
                {imageIndex + 1} / {entry.project.images.length} · {entry.highlight}
              </Typography>
            </Box>
            <IconButton onClick={onClose} aria-label={copy.close} sx={{ color: 'text.primary' }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              minHeight: { xs: 220, sm: 420 },
              maxHeight: '72vh',
              placeItems: 'center',
              overflow: 'hidden',
              borderRadius: isBackend ? '6px' : '1rem',
              border: isBackend ? '1px solid var(--line)' : 'none',
              backgroundColor: 'rgba(0,0,0,0.72)',
            }}
          >
            <Box
              key={entry.project.images[imageIndex]}
              component={motion.img}
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              src={entry.project.images[imageIndex]}
              alt={`${copy.imageOf} ${entry.project.name[language]} ${imageIndex + 1}`}
              decoding="async"
              sx={{ display: 'block', width: '100%', height: '100%', maxHeight: '72vh', objectFit: 'contain' }}
            />

            <IconButton
              onClick={() => changeImage(-1)}
              aria-label={copy.previous}
              className={isBackend ? 'panel' : 'liquid-glass-strong'}
              sx={{ position: 'absolute', left: { xs: 8, md: 16 }, width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, color: '#fff' }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => changeImage(1)}
              aria-label={copy.next}
              className={isBackend ? 'panel' : 'liquid-glass-strong'}
              sx={{ position: 'absolute', right: { xs: 8, md: 16 }, width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, color: '#fff' }}
            >
              <ArrowForwardRoundedIcon />
            </IconButton>
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ px: 1, pt: 1.5 }}>
            <Stack direction="row" gap={0.6} sx={{ overflowX: 'auto', maxWidth: '70%', py: 0.5 }}>
              {entry.project.images.map((image, thumbIndex) => (
                <Box
                  key={image}
                  component="button"
                  type="button"
                  onClick={() => setImageIndex(thumbIndex)}
                  aria-label={`${copy.imageOf} ${thumbIndex + 1}`}
                  aria-current={thumbIndex === imageIndex}
                  sx={{
                    flex: '0 0 auto',
                    width: 54,
                    height: 34,
                    p: 0,
                    border: thumbIndex === imageIndex ? '1px solid var(--accent)' : '1px solid var(--line)',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    opacity: thumbIndex === imageIndex ? 1 : 0.55,
                    backgroundColor: '#000',
                  }}
                >
                  <Box component="img" src={image} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Stack>
            {entry.project.links.length > 0 && (
              <Button
                component="a"
                href={entry.project.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className={isBackend ? 'mono' : undefined}
                sx={{ borderRadius: isBackend ? '5px' : '9999px', border: '1px solid var(--line)', px: 1.6, color: 'text.primary', fontSize: '0.64rem' }}
              >
                {entry.project.links[0].label}
              </Button>
            )}
          </Stack>
        </>
      )}
    </Dialog>
  )
}

export default ProjectGalleryDialog
