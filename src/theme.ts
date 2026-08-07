import { createTheme, type PaletteMode } from '@mui/material/styles'

const createAppTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    background: {
      default: mode === 'dark' ? '#030405' : '#eef1f3',
      paper: mode === 'dark' ? 'rgba(7, 9, 11, 0.72)' : 'rgba(255, 255, 255, 0.72)',
    },
    primary: {
      main: mode === 'dark' ? '#ffffff' : '#111315',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#111315',
      secondary: mode === 'dark' ? 'rgba(255,255,255,0.72)' : 'rgba(17,19,21,0.68)',
    },
  },
  typography: {
    fontFamily: 'Sora, sans-serif',
    h1: { fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' },
    h2: { fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' },
    h3: { fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' },
    button: { fontFamily: 'Sora, sans-serif', textTransform: 'none' },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'dark' ? '#030405' : '#eef1f3',
        },
      },
    },
  },
})

export default createAppTheme
