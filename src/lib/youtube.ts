export interface YTPlayerHandle {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  setVolume: (volume: number) => void
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  nextVideo: () => void
  previousVideo: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  getVideoData?: () => { title?: string; author?: string }
  destroy: () => void
}

export interface YTNamespace {
  Player: new (element: HTMLElement, options: Record<string, unknown>) => YTPlayerHandle
  PlayerState: Record<string, number>
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace> | null = null

/** Loads the YouTube IFrame API once and resolves with the global namespace. */
export const loadYouTubeApi = (): Promise<YTNamespace> => {
  if (apiPromise) return apiPromise

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const current = window.YT
    if (current?.Player) {
      resolve(current)
      return
    }

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      const api = window.YT
      if (api) resolve(api)
      else reject(new Error('YouTube IFrame API namespace missing'))
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => reject(new Error('YouTube IFrame API failed to load'))
    document.head.appendChild(script)
  })

  return apiPromise
}
