import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded'
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
/**
 * Playlist is discovered from the file system at build/dev time, so dropping new
 * audio in src/assets/audio/soft-disco is enough — no generated file, no race.
 */
const AUDIO_FILES = import.meta.glob('../../assets/audio/soft-disco/*.{mp3,m4a,ogg,wav,aac,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const displayName = (path: string) => {
  const base = path.split('/').pop() ?? path
  return base
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]?spotdown(\.org)?/gi, '')
    .replace(/[-_]?www\.[a-z0-9.-]+/gi, '')
    .replace(/_+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || base
}

const tracklist = Object.entries(AUDIO_FILES)
  .map(([path, src]) => ({ title: displayName(path), src, path }))
  .sort((a, b) => a.path.localeCompare(b.path, 'pt-BR'))
import { usePreferences } from '../../context/preferences'
import { sfx } from '../../lib/sfx'

const COOKIE = 'portfolio-audio'
const DEFAULT_VOLUME = 18

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
 * Floating radio playing the local playlist from public/audio/soft-disco.
 * Custom controls over a hidden <audio>, so no YouTube embed is involved.
 */
const AudioPlayer = () => {
  const location = useLocation()
  const { language } = usePreferences()
  const isBackend = location.pathname.startsWith('/backend')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const initial = useRef<AudioPrefs>(readPrefs())
  const [index, setIndex] = useState(0)
  const [volume, setVolume] = useState(initial.current.volume)
  const [muted, setMuted] = useState(initial.current.muted)
  const [sfxOn, setSfxOn] = useState(initial.current.sfx)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)
  const wantsPlay = useRef(false)

  const track = tracklist[index]
  const total = tracklist.length

  useEffect(() => {
    sfx.setEnabled(initial.current.sfx)
  }, [])

  useEffect(() => {
    writePrefs({ volume, muted, sfx: sfxOn })
    sfx.setEnabled(sfxOn)
  }, [volume, muted, sfxOn])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume / 100
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = muted
  }, [muted])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      await audio.play()
      setPlaying(true)
      setBlocked(false)
    } catch {
      setPlaying(false)
      setBlocked(true)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    sfx.click()
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      wantsPlay.current = false
      return
    }

    wantsPlay.current = true
    void play()
  }, [play, playing])

  const stop = useCallback(() => {
    const audio = audioRef.current
    sfx.click()
    if (!audio) return
    wantsPlay.current = false
    audio.pause()
    audio.currentTime = 0
    setPlaying(false)
    setElapsed(0)
  }, [])

  const skip = useCallback((direction: 1 | -1) => {
    sfx.click()
    wantsPlay.current = true
    setIndex((current) => {
      if (total === 0) return 0
      return (current + direction + total) % total
    })
  }, [total])

  // New track: load and, if the user was listening, keep listening.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track) return
    audio.load()
    setElapsed(0)
    if (wantsPlay.current) void play()
  }, [index, play, track])

  // Browsers block autoplay: unlock on the first gesture.
  useEffect(() => {
    const unlock = () => {
      sfx.prime()
      if (!wantsPlay.current || playing) return
      void play()
    }

    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [play, playing])

  const progress = duration > 0 ? Math.min(1, elapsed / duration) : 0
  const isBackendStyle = isBackend
  const surfaceClass = isBackendStyle ? 'panel mono' : 'liquid-glass-strong'
  const label = useMemo(() => (track ? track.title : language === 'pt' ? 'sem faixas' : 'no tracks'), [track, language])

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
        borderRadius: isBackendStyle ? '8px' : '9999px',
        overflow: 'hidden',
      }}
    >
      <Box
        component="audio"
        ref={audioRef}
        src={track?.src}
        preload="metadata"
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          if (total > 0) setIndex((current) => (current + 1) % total)
        }}
        sx={{ display: 'none' }}
      />

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
          onChange={(event) => {
            const next = Number(event.target.value)
            setVolume(next)
            if (next > 0 && muted) setMuted(false)
          }}
          aria-label={language === 'pt' ? 'Volume' : 'Volume'}
          sx={{
            width: { xs: 54, md: 72 },
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
            sx={{ fontSize: '0.56rem', color: 'text.secondary', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {blocked && !playing ? (language === 'pt' ? 'clique para liberar o áudio' : 'click to unlock audio') : label}
          </Typography>
        </Stack>
        <Typography className="mono" sx={{ fontSize: '0.5rem', color: 'text.secondary', opacity: 0.7, letterSpacing: '0.06em' }}>
          {formatTime(elapsed)} / {formatTime(duration)} · {index + 1}/{total || 0}
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
          sx={{ width: 28, height: 28, color: sfxOn ? 'var(--accent)' : 'text.secondary' }}
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
