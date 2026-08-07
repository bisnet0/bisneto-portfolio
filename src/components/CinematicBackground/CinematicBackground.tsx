import { Box } from '@mui/material'
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { usePreferences } from '../../context/preferences'

const CinematicBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const durationRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef(-1)
  const { mode } = usePreferences()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 82,
    damping: 26,
    mass: 0.42,
    restDelta: 0.0005,
  })

  const seekToProgress = useCallback((progress: number) => {
    const video = videoRef.current
    if (!video || !durationRef.current || reduceMotion) return

    const targetTime = Math.min(
      progress * durationRef.current,
      Math.max(durationRef.current - 0.04, 0),
    )

    if (Math.abs(targetTime - lastTimeRef.current) < 0.012) return

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      video.currentTime = targetTime
      lastTimeRef.current = targetTime
      frameRef.current = null
    })
  }, [reduceMotion])

  useMotionValueEvent(smoothProgress, 'change', seekToProgress)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleMetadata = () => {
      durationRef.current = video.duration
      video.pause()
      seekToProgress(smoothProgress.get())
    }

    video.addEventListener('loadedmetadata', handleMetadata)
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata()

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [seekToProgress, smoothProgress])

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        zIndex: 0,
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        muted
        playsInline
        preload={reduceMotion ? 'none' : 'auto'}
        poster="/video/me_coding_poster.webp"
        tabIndex={-1}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: { xs: '58% center', md: 'center center' },
          filter: mode === 'dark'
            ? 'brightness(0.52) saturate(0.78) contrast(1.08)'
            : 'brightness(1.08) saturate(0.62) contrast(0.82)',
        }}
      >
        <source media="(max-width: 700px)" src="/video/me_coding_scroll_mobile.mp4" type="video/mp4" />
        <source src="/video/me_coding_scroll.mp4" type="video/mp4" />
      </Box>
    </Box>
  )
}

export default CinematicBackground
