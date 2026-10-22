import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useState, type KeyboardEvent } from 'react'
import { usePreferences } from '../../context/preferences'

interface GalleryDialogProps {
  open: boolean
  title: string
  subtitle?: string
  images: string[]
  track: 'frontend' | 'backend' | 'hub'
  link?: { label: string; url: string }
  onClose: () => void
}

/** Shared lightbox used by projects and by the credentials section. */
const GalleryDialog = ({ open, title, subtitle, images, track, link, onClose }: GalleryDialogProps) => {
  const { language, mode } = usePreferences()
  const [index, setIndex] = useState(0)
  const isBackend = track === 'backend'
  const total = images.length

  useEffect(() => {
    setIndex(0)
  }, [open, title])

  const move = (direction: -1 | 1) => {
    if (total === 0) return
    setIndex((current) => (current + direction + total) % total)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') move(-1)
    if (event.key === 'ArrowRight') move(1)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      maxWidth="lg"
      fullWidth
      aria-labelledby="gallery-title"
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
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ px: 1, pb: 1.5 }}>
        <Box>
          <Typography
            id="gallery-title"
            sx={{
              fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
              fontStyle: isBackend ? 'normal' : 'italic',
              fontSize: { xs: '1.25rem', md: '1.8rem' },
              lineHeight: 1.1,
            }}
          >
            {title}
          </Typography>
          <Typography className="mono" sx={{ mt: 0.5, color: 'var(--accent)', fontSize: '0.62rem' }}>
            {index + 1} / {total}
            {subtitle ? ` · ${subtitle}` : ''}
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label={language === 'pt' ? 'Fechar galeria' : 'Close gallery'} sx={{ color: 'text.primary' }}>
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
          key={images[index]}
          component={motion.img}
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          src={images[index]}
          alt={`${title} ${index + 1}`}
          decoding="async"
          sx={{ display: 'block', width: '100%', height: '100%', maxHeight: '72vh', objectFit: 'contain' }}
        />

        {total > 1 && (
          <>
            <IconButton
              onClick={() => move(-1)}
              aria-label={language === 'pt' ? 'Imagem anterior' : 'Previous image'}
              className={isBackend ? 'panel' : 'liquid-glass-strong'}
              sx={{ position: 'absolute', left: { xs: 8, md: 16 }, width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, color: '#fff' }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => move(1)}
              aria-label={language === 'pt' ? 'Próxima imagem' : 'Next image'}
              className={isBackend ? 'panel' : 'liquid-glass-strong'}
              sx={{ position: 'absolute', right: { xs: 8, md: 16 }, width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, color: '#fff' }}
            >
              <ArrowForwardRoundedIcon />
            </IconButton>
          </>
        )}
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ px: 1, pt: 1.5 }}>
        <Stack direction="row" gap={0.6} sx={{ overflowX: 'auto', maxWidth: '72%', py: 0.5 }}>
          {images.map((image, thumbIndex) => (
            <Box
              key={image}
              component="button"
              type="button"
              onClick={() => setIndex(thumbIndex)}
              aria-label={`${title} ${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
              sx={{
                flex: '0 0 auto',
                width: 54,
                height: 34,
                p: 0,
                border: thumbIndex === index ? '1px solid var(--accent)' : '1px solid var(--line)',
                borderRadius: '5px',
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: thumbIndex === index ? 1 : 0.55,
                backgroundColor: '#000',
              }}
            >
              <Box component="img" src={image} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Stack>

        {link && (
          <Button
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={isBackend ? 'mono' : undefined}
            sx={{ borderRadius: isBackend ? '5px' : '9999px', border: '1px solid var(--line)', px: 1.6, color: 'text.primary', fontSize: '0.64rem' }}
          >
            {link.label}
          </Button>
        )}
      </Stack>
    </Dialog>
  )
}

export default GalleryDialog
