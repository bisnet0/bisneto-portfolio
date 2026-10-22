import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import ProjectDeck from '../../components/ProjectDeck/ProjectDeck'
import ProjectGalleryDialog from '../../components/ProjectGallery/ProjectGalleryDialog'
import NeuralField from '../../components/NeuralField/NeuralField'
import ScrollTopButton from '../../components/ScrollTopButton/ScrollTopButton'
import SiteNav from '../../components/SiteNav/SiteNav'
import TrackContact, { TrackFooter } from '../../components/TrackContact/TrackContact'
import TrackHero from '../../components/TrackHero/TrackHero'
import TrackTheme from '../../components/TrackTheme/TrackTheme'
import WindowBackdrop from '../../components/WindowBackdrop/WindowBackdrop'
import { tracks } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

interface TrackPageProps {
  track: 'frontend' | 'backend'
}

const TrackPage = ({ track }: TrackPageProps) => {
  const content = tracks[track]
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const { language } = usePreferences()

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const role = language === 'pt' ? 'Engenheiro de Software' : 'Software Engineer'
    document.title = `${content.label} · Henrique Bisneto | ${role}`
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      `${content.tagline[language]} — ${content.heroLead[language]}`,
    )
  }, [content, language])

  return (
    <TrackTheme track={track}>
      {track === 'backend' && <WindowBackdrop />}
      <Box aria-hidden="true" sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <NeuralField intensity={track === 'backend' ? 1 : 0.85} repelRadius={track === 'backend' ? 170 : 140} />
      </Box>
      <SiteNav track={track} />

      <Box component="main" sx={{ position: 'relative', zIndex: 1 }}>
        <TrackHero
          track={track}
          content={content}
          onExplore={() => scrollToId('projects')}
          onContact={() => scrollToId('contact')}
        />
        <ProjectDeck track={track} content={content} onOpen={setGalleryIndex} />
        <TrackContact track={track} content={content} />
      </Box>

      <TrackFooter track={track} />

      <ProjectGalleryDialog
        entries={content.projects}
        index={galleryIndex}
        track={track}
        onClose={() => setGalleryIndex(null)}
      />

      <ScrollTopButton />
    </TrackTheme>
  )
}

export default TrackPage
