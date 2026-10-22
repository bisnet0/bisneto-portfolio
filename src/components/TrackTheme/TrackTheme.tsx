import { CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useMemo, type ReactNode } from 'react'
import type { TrackId } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'
import createAppTheme from '../../theme'

interface TrackThemeProps {
  track: TrackId
  children: ReactNode
}

/**
 * Scopes the visual system to a route: `data-track` drives the CSS tokens,
 * while MUI receives a theme built for that track + current color mode.
 */
const TrackTheme = ({ track, children }: TrackThemeProps) => {
  const { mode } = usePreferences()
  const theme = useMemo(() => createAppTheme(mode, track), [mode, track])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.track = track
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.palette.background.default)
  }, [track, theme])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [track])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`track-shell track-shell--${track}`}>{children}</div>
    </ThemeProvider>
  )
}

export default TrackTheme
