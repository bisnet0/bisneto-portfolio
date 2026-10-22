import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import { sfx } from './lib/sfx'
import Hub from './pages/Hub/Hub'
import TrackPage from './pages/Track/TrackPage'

const INTERACTIVE_TARGET = 'a, button, [role="button"], input, textarea, select, label'

/** Single place that gives every control a click sound. */
const useInterfaceSounds = () => {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null
      if (target?.closest?.(INTERACTIVE_TARGET)) sfx.click()
    }

    window.addEventListener('pointerdown', handlePointerDown, true)

    return () => window.removeEventListener('pointerdown', handlePointerDown, true)
  }, [])
}

const App = () => {
  useInterfaceSounds()

  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/frontend" element={<TrackPage track="frontend" />} />
        <Route path="/backend" element={<TrackPage track="backend" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AudioPlayer />
    </BrowserRouter>
  )
}

export default App
