/**
 * Tiny WebAudio toolkit — mechanical keyboard clicks and UI clicks.
 *
 * The key sound is pure filtered noise (no oscillator): a short plastic click plus
 * a low, dry "thock", which is what a real switch sounds like. Oscillators made it
 * sound like a beep, so typing no longer uses any.
 */

let context: AudioContext | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null
let enabled = true
let lastKeyAt = 0
let keyCount = 0
/**
 * The keyboard only sounds during the very first typing of the session (8 s window).
 * Everything typed later — hero retypes, card descriptions — stays silent on purpose.
 */
let typingWindowEnd = 0

type AudioContextCtor = typeof AudioContext

const ensureContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null

  const Ctor: AudioContextCtor | undefined = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext

  if (!Ctor) return null

  if (!context) {
    context = new Ctor()
    master = context.createGain()
    master.gain.value = 0.42
    const shelf = context.createBiquadFilter()
    shelf.type = 'highshelf'
    shelf.frequency.value = 5200
    shelf.gain.value = -6
    master.connect(shelf)
    shelf.connect(context.destination)
  }

  if (context.state === 'suspended') void context.resume()

  return context
}

/** One 0.3 s noise buffer reused by every hit (cheap and phase-random). */
const getNoise = (ctx: AudioContext) => {
  if (noise && noise.sampleRate === ctx.sampleRate) return noise

  const length = Math.floor(ctx.sampleRate * 0.3)
  noise = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = noise.getChannelData(0)
  for (let index = 0; index < length; index += 1) {
    data[index] = Math.random() * 2 - 1
  }

  return noise
}

interface HitOptions {
  filterType: BiquadFilterType
  frequency: number
  q?: number
  gain: number
  attack: number
  decay: number
  rate?: number
  offset?: number
}

const hit = (ctx: AudioContext, destination: AudioNode, options: HitOptions) => {
  const now = ctx.currentTime
  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const envelope = ctx.createGain()

  source.buffer = getNoise(ctx)
  source.playbackRate.value = options.rate ?? 1
  filter.type = options.filterType
  filter.frequency.value = options.frequency
  filter.Q.value = options.q ?? 0.7

  envelope.gain.setValueAtTime(0.0001, now)
  envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, options.gain), now + options.attack)
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + options.attack + options.decay)

  source.connect(filter)
  filter.connect(envelope)
  envelope.connect(destination)

  source.start(now, options.offset ?? Math.random() * 0.15, options.attack + options.decay + 0.02)
}

/** Mechanical switch: dry click + low body, no tone. */
const playKey = () => {
  if (!enabled || performance.now() > typingWindowEnd) return

  const nowMs = performance.now()
  if (nowMs - lastKeyAt < 16) return
  lastKeyAt = nowMs

  const ctx = ensureContext()
  if (!ctx || !master) return

  keyCount += 1
  const wide = keyCount % 11 === 0
  const pitch = 0.88 + Math.random() * 0.3

  // 1) plastic click of the keycap
  hit(ctx, master, {
    filterType: 'bandpass',
    frequency: (2400 + Math.random() * 1300) * pitch,
    q: 1.1,
    gain: wide ? 0.05 : 0.075,
    attack: 0.0015,
    decay: wide ? 0.014 : 0.01,
    rate: pitch,
  })

  // 2) body resonance (the "thock") — low and dry
  hit(ctx, master, {
    filterType: 'lowpass',
    frequency: (wide ? 260 : 420) + Math.random() * 90,
    q: 1.6,
    gain: wide ? 0.075 : 0.052,
    attack: 0.002,
    decay: wide ? 0.075 : 0.042,
    rate: 0.9 + Math.random() * 0.2,
  })

  // 3) tiny top-end tick so it cuts through the music
  hit(ctx, master, {
    filterType: 'highpass',
    frequency: 5200,
    q: 0.6,
    gain: 0.022,
    attack: 0.001,
    decay: 0.006,
    rate: pitch,
  })
}

/** Fuller click for buttons, cards and links. */
const playClick = () => {
  if (!enabled) return

  const ctx = ensureContext()
  if (!ctx || !master) return

  hit(ctx, master, {
    filterType: 'lowpass',
    frequency: 320,
    q: 1.4,
    gain: 0.11,
    attack: 0.003,
    decay: 0.1,
    rate: 0.85,
  })

  hit(ctx, master, {
    filterType: 'bandpass',
    frequency: 1900,
    q: 0.9,
    gain: 0.05,
    attack: 0.0015,
    decay: 0.03,
  })
}

export const sfx = {
  key: playKey,
  click: playClick,
  prime: () => {
    ensureContext()
  },
  /** Opens the single typing-sound window for this session. */
  armTyping: () => {
    if (typingWindowEnd === 0) typingWindowEnd = performance.now() + 8000
  },
  setEnabled: (value: boolean) => {
    enabled = value
    if (value) ensureContext()
  },
  isEnabled: () => enabled,
}
