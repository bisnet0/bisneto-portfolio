import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded'
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePreferences } from '../../context/preferences'
import { sfx } from '../../lib/sfx'
import { loadYouTubeApi, type YTPlayerHandle } from '../../lib/youtube'

const PLAYLIST_ID = 'PLsVfn9YIFmNBaILsPtU3Vu3KLbsZ4R7oG'
const START_VIDEO = '950OULymIZQ'
const COOKIE = 'portfolio-audio'
const DEFAULT_VOLUME = 16

interface AudioPrefs {
  volume: number
  muted: boolean
  sfx: boolean
}

const readPrefs = (): AudioPrefs => {
  const raw = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${COOKIE}=`))
    ?.split('=')[1]

  if (!raw) return { volume: DEFAULT_VOLUME, muted: false, sfx: true }

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<AudioPrefs>
    return {
      volume: typeof parsed.volume === 'number' ? Math.min(100, Math.max(0, parsed.volume)) : DEFAULT_VOLUME,
      muted: Boolean(parsed.muted),
      sfx: parsed.sfx !== false,
    }
  } catch {
    return { volume: DEFAULT_VOLUME, muted: false, sfx: true }
  }
}

const writePrefs = (prefs: AudioPrefs) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(prefs))}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

/**
 * Floating radio: the YouTube playlist plays from a hidden embed, controlled by a
 * custom bottom bar (play/pause, stop, volume, mute) plus the UI sound toggle.
 */
const AudioPlayer = () => {
  const location = useLocation()
  const { language } = usePreferences()
  const isBackend = location.pathname.startsWith('/backend')
  const hostRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<YTPlayerHandle | null>(null)
  const initial = useRef<AudioPrefs>(readPrefs())
  const [volume, setVolume] = useState(initial.current.volume)
  const [muted, setMuted] = useState(initial.current.muted)
  const [sfxOn, setSfxOn] = useState(initial.current.sfx)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [title, setTitle] = useState('Dual Air · LonePeakMusic')
  const wantsPlay = useRef(true)

  useEffect(() => {
    sfx.setEnabled(initial.current.sfx)
  }, [])

  useEffect(() => {
    writePrefs({ volume, muted, sfx: sfxOn })
    sfx.setEnabled(sfxOn)
  }, [volume, muted, sfxOn])

  useEffect(() => {
    let cancelled = false

    loadYouTubeApi()
      .then((api) => {
        if (cancelled || !hostRef.current) return

        playerRef.current = new api.Player(hostRef.current, {
          height: '90',
          width: '160',
          videoId: START_VIDEO,
          playerVars: {
            listType: 'playlist',
            list: PLAYLIST_ID,
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            iv_load_policy: 3,
            loop: 1,
          },
          events: {
            onReady: (event: { target: YTPlayerHandle }) => {
              const player = event.target
              player.setVolume(volume)
              if (!muted) player.unMute()
              setReady(true)
              if (wantsPlay.current) {
                try {
                  player.playVideo()
                } catch {
                  setBlocked(true)
                }
              }
            },
            onStateChange: (event: { data: number; target: YTPlayerHandle }) => {
              const state = event.data
              setPlaying(state === 1)
              if (state === 1) {
                setBlocked(false)
                const data = event.target.getVideoData?.()
                if (data?.title) setTitle(data.title)
              }
            },
          },
        })
      })
      .catch(() => setBlocked(true))

    return () => {
      cancelled = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
    // Player is created once; preferences are applied through the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    playerRef.current?.setVolume(volume)
  }, [volume])

  useEffect(() => {
    if (!playerRef.current || !ready) return
    if (muted) playerRef.current.mute()
    else playerRef.current.unMute()
  }, [muted, ready])

  /** Reads the real player state — the embed, not our optimism, decides the UI. */
  const syncState = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    const state = player.getPlayerState()
    const isPlaying = state === 1
    setPlaying(isPlaying)
    if (isPlaying) setBlocked(false)
    else if (wantsPlay.current) setBlocked(true)
  }, [])

  const togglePlay = useCallback(() => {
    const player = playerRef.current
    sfx.click()
    if (!player) return

    if (playing) {
      wantsPlay.current = false
      player.pauseVideo()
      setPlaying(false)
    } else {
      wantsPlay.current = true
      setBlocked(false)
      player.playVideo()
      window.setTimeout(syncState, 900)
    }
  }, [playing, syncState])

  const skip = useCallback((direction: 1 | -1) => {
    const player = playerRef.current
    sfx.click()
    if (!player) return
    wantsPlay.current = true
    try {
      if (direction === 1) player.nextVideo()
      else player.previousVideo()
      player.playVideo()
      window.setTimeout(syncState, 900)
    } catch {
      setBlocked(true)
    }
  }, [syncState])

  const stop = useCallback(() => {
    const player = playerRef.current
    sfx.click()
    wantsPlay.current = false
    if (!player) return
    player.pauseVideo()
    player.seekTo(0, true)
    setPlaying(false)
    setElapsed(0)
  }, [])

  useEffect(() => {
    if (!ready) return
    const interval = window.setInterval(() => {
      const player = playerRef.current
      if (!player) return
      setElapsed(player.getCurrentTime() ?? 0)
      setDuration(player.getDuration() ?? 0)
    }, 800)

    return () => window.clearInterval(interval)
  }, [ready])

  useEffect(() => {
    const resume = () => {
      sfx.prime()
      if (!wantsPlay.current || playing) return
      const player = playerRef.current
      if (!player) return
      try {
        player.playVideo()
        window.setTimeout(syncState, 900)
      } catch {
        setBlocked(true)
      }
    }

    window.addEventListener('pointerdown', resume, { once: true })
    window.addEventListener('keydown', resume, { once: true })

    return () => {
      window.removeEventListener('pointerdown', resume)
      window.removeEventListener('keydown', resume)
    }
  }, [playing, syncState])

  const progress = duration > 0 ? Math.min(1, elapsed / duration) : 0
  const surfaceClass = isBackend ? 'panel mono' : 'liquid-glass-strong'

  return (
    <Box
      className={surfaceClass}
      role="group"
      aria-label={language === 'pt' ? 'Rádio do portfólio' : 'Portfolio radio'}
      sx={{
        position: 'fixed',
        zIndex: 58,
        left: { xs: 12, md: 22 },
        bottom: { xs: 12, md: 20 },
        display: 'flex',
        alignItems: 'center',
        gap: 0.6,
        pr: 1.2,
        pl: 0.8,
        py: 0.6,
        borderRadius: isBackend ? '8px' : '9999px',
        overflow: 'hidden',
      }}
    >
      <Box ref={hostRef} aria-hidden="true" sx={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', overflow: 'hidden' }} />

      <IconButton
        onClick={togglePlay}
        aria-label={playing ? (language === 'pt' ? 'Pausar' : 'Pause') : language === 'pt' ? 'Tocar' : 'Play'}
        sx={{ width: 34, height: 34, color: 'var(--text-primary)' }}
      >
        {playing ? <PauseRoundedIcon sx={{ fontSize: 18 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 20 }} />}
      </IconButton>

      <IconButton
        onClick={() => skip(-1)}
        aria-label={language === 'pt' ? 'Faixa anterior' : 'Previous track'}
        sx={{ width: 28, height: 28, color: 'var(--text-primary)' }}
      >
        <SkipPreviousRoundedIcon sx={{ fontSize: 16 }} />
      </IconButton>

      <IconButton
        onClick={stop}
        aria-label={language === 'pt' ? 'Parar' : 'Stop'}
        sx={{ width: 28, height: 28, color: 'var(--text-primary)' }}
      >
        <StopRoundedIcon sx={{ fontSize: 14 }} />
      </IconButton>

      <IconButton
        onClick={() => skip(1)}
        aria-label={language === 'pt' ? 'Próxima faixa' : 'Next track'}
        sx={{ width: 28, height: 28, color: 'var(--text-primary)' }}
      >
        <SkipNextRoundedIcon sx={{ fontSize: 16 }} />
      </IconButton>

      <Stack direction="row" alignItems="center" spacing={0.4} sx={{ minWidth: 0 }}>
        <IconButton
          onClick={() => {
            sfx.click()
            setMuted((current) => !current)
          }}
          aria-label={muted ? (language === 'pt' ? 'Ativar som' : 'Unmute') : language === 'pt' ? 'Silenciar' : 'Mute'}
          sx={{ width: 28, height: 28, color: 'var(--text-primary)' }}
        >
          {muted || volume === 0 ? <VolumeOffRoundedIcon sx={{ fontSize: 15 }} /> : <VolumeUpRoundedIcon sx={{ fontSize: 15 }} />}
        </IconButton>

        <Box
          component="input"
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const next = Number(event.target.value)
            setVolume(next)
            if (next > 0 && muted) setMuted(false)
          }}
          aria-label={language === 'pt' ? 'Volume' : 'Volume'}
          sx={{
            width: { xs: 54, md: 74 },
            height: 3,
            appearance: 'none',
            borderRadius: 999,
            backgroundColor: 'var(--line-strong)',
            accentColor: 'var(--accent)',
            cursor: 'pointer',
            '&::-webkit-slider-thumb': {
              appearance: 'none',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
            },
          }}
        />
      </Stack>

      <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: 0, pl: 0.6 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <GraphicEqRoundedIcon sx={{ fontSize: 13, color: 'var(--accent)', opacity: playing ? 1 : 0.4 }} />
          <Typography
            className="mono"
            sx={{ fontSize: '0.56rem', color: 'var(--text-secondary)', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {blocked
              ? language === 'pt' ? 'clique para liberar o áudio' : 'click to unlock audio'
              : title}
          </Typography>
        </Stack>
        <Typography className="mono" sx={{ fontSize: '0.5rem', color: 'var(--text-secondary)', opacity: 0.7, letterSpacing: '0.06em' }}>
          {formatTime(elapsed)} / {formatTime(duration)} · playlist
        </Typography>
      </Box>

      <Tooltip title={language === 'pt' ? 'Sons de interface' : 'Interface sounds'}>
        <IconButton
          onClick={() => {
            setSfxOn((current) => {
              const next = !current
              sfx.setEnabled(next)
              if (next) sfx.click()
              return next
            })
          }}
          aria-pressed={sfxOn}
          aria-label={language === 'pt' ? 'Sons de interface' : 'Interface sounds'}
          sx={{ width: 28, height: 28, color: sfxOn ? 'var(--accent)' : 'var(--text-secondary)' }}
        >
          <GraphicEqRoundedIcon sx={{ fontSize: 15, opacity: sfxOn ? 1 : 0.4 }} />
        </IconButton>
      </Tooltip>

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 2,
          width: `${progress * 100}%`,
          backgroundColor: 'var(--accent)',
          transition: 'width 400ms linear',
          opacity: playing ? 0.9 : 0.3,
        }}
      />
    </Box>
  )
}

export default AudioPlayer
