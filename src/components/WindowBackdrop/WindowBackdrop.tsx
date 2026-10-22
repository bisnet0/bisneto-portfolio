import { Box, Stack, Typography } from '@mui/material'
import { usePreferences } from '../../context/preferences'

/**
 * Decorative layer that turns the backend environment into a window inside a window:
 * chrome bar, gutter numbers, grid and the sampled texture plate.
 */
const WindowBackdrop = () => {
  const { mode, language } = usePreferences()
  const dark = mode === 'dark'

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <Box
        component="img"
        src="/textures/window-plate.webp"
        alt=""
        loading="lazy"
        sx={{
          position: 'absolute',
          inset: '-6%',
          width: '112%',
          height: '112%',
          objectFit: 'cover',
          opacity: dark ? 0.14 : 0.08,
          filter: 'blur(18px) saturate(0.7)',
          mixBlendMode: dark ? 'screen' : 'multiply',
        }}
      />

      <Box
        className="ide-grid"
        sx={{ position: 'absolute', inset: 0, opacity: dark ? 0.55 : 0.35 }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: { xs: 8, md: 14 },
          border: '1px solid var(--line)',
          borderRadius: { xs: '8px', md: '10px' },
          backgroundColor: dark ? 'rgba(0,0,4,0.18)' : 'rgba(255,255,255,0.16)',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{
            height: 34,
            // O logo da navbar é fixo à esquerda: os dots e o path começam depois dele.
            pl: { xs: '78px', md: '92px' },
            pr: 1.6,
            borderBottom: '1px solid var(--line)',
            backgroundColor: dark ? 'rgba(6,9,22,0.55)' : 'rgba(255,255,255,0.55)',
          }}
        >
          <Stack direction="row" spacing={0.55}>
            {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
              <Box key={color} sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: color, opacity: 0.7 }} />
            ))}
          </Stack>
          <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.6rem', letterSpacing: '0.04em' }}>
            {language === 'pt' ? '~/bisneto/backend — zsh' : '~/bisneto/backend — zsh'}
          </Typography>
          <Typography className="mono" sx={{ ml: 'auto', color: 'var(--accent)', fontSize: '0.6rem', display: { xs: 'none', sm: 'block' } }}>
            main · build ok · p95 42ms
          </Typography>
        </Stack>

        <Box
          sx={{
            position: 'absolute',
            top: 34,
            left: 0,
            bottom: 0,
            width: 40,
            borderRight: '1px solid var(--line)',
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            alignItems: 'flex-end',
            pt: 1.4,
            pr: 1,
            gap: 0.35,
            opacity: 0.5,
          }}
        >
          {Array.from({ length: 28 }, (_, index) => (
            <Typography key={index} className="mono" sx={{ color: 'text.secondary', fontSize: '0.54rem', lineHeight: 1.35 }}>
              {index + 1}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default WindowBackdrop
