import { createTheme, type PaletteMode } from '@mui/material/styles'
import type { TrackId } from './content/tracks'

interface TrackScale {
  bg: string
  paper: string
  text: string
  muted: string
  accent: string
}

const scales: Record<TrackId, Record<PaletteMode, TrackScale>> = {
  frontend: {
    dark: {
      bg: '#030405',
      paper: 'rgba(7, 9, 11, 0.72)',
      text: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.72)',
      accent: '#d9e5c5',
    },
    light: {
      bg: '#eef1f3',
      paper: 'rgba(255, 255, 255, 0.72)',
      text: '#111315',
      muted: 'rgba(17, 19, 21, 0.68)',
      accent: '#06462d',
    },
  },
  backend: {
    dark: {
      bg: '#000004',
      paper: 'rgba(6, 9, 22, 0.78)',
      text: '#e9edff',
      muted: 'rgba(196, 208, 255, 0.66)',
      accent: '#5b8bff',
    },
    light: {
      bg: '#f3f7ec',
      paper: 'rgba(255, 255, 255, 0.86)',
      text: '#101310',
      muted: 'rgba(16, 19, 16, 0.68)',
      accent: '#06462d',
    },
  },
  hub: {
    dark: {
      bg: '#030405',
      paper: 'rgba(7, 9, 11, 0.72)',
      text: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.72)',
      accent: '#ffffff',
    },
    light: {
      bg: '#eef1f3',
      paper: 'rgba(255, 255, 255, 0.72)',
      text: '#111315',
      muted: 'rgba(17, 19, 21, 0.68)',
      accent: '#111315',
    },
  },
}

const createAppTheme = (mode: PaletteMode, track: TrackId = 'frontend') => {
  const scale = scales[track][mode]
  const isBackend = track === 'backend'
  const displayFont = isBackend
    ? '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace'
    : 'Instrument Serif, serif'

  return createTheme({
    palette: {
      mode,
      background: { default: scale.bg, paper: scale.paper },
      primary: { main: scale.accent },
      text: { primary: scale.text, secondary: scale.muted },
    },
    typography: {
      fontFamily: 'Sora, sans-serif',
      h1: { fontFamily: displayFont, fontStyle: isBackend ? 'normal' : 'italic' },
      h2: { fontFamily: displayFont, fontStyle: isBackend ? 'normal' : 'italic' },
      h3: { fontFamily: displayFont, fontStyle: isBackend ? 'normal' : 'italic' },
      button: {
        fontFamily: isBackend ? '"JetBrains Mono", monospace' : 'Sora, sans-serif',
        textTransform: 'none',
      },
    },
    shape: { borderRadius: isBackend ? 8 : 20 },
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiCssBaseline: {
        styleOverrides: { body: { backgroundColor: scale.bg } },
      },
    },
  })
}

export default createAppTheme
