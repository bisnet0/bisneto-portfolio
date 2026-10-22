/**
 * Tiny WebAudio toolkit — mechanical keyboard clicks and UI clicks.
 * No audio files: every sound is synthesized (two layers per key: a plastic click
 * plus a low body "thock"), so nothing ships in the bundle.
 */

let context: AudioContext | null = null
let master: GainNode | null = null
let enabled = true
let lastKeyAt = 0
let keyCount = 0

type AudioContextCtor = typeof AudioContext

const ensureContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null

  const Ctor: AudioContextCtor | undefined = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext

  if (!Ctor) return null

  if (!context) {
    context = new Ctor()
    master = context.createGain()
    master.gain.value = 0.5
    const shelf = context.createBiquadFilter()
    shelf.type = 'highshelf'
    shelf.frequency.value = 4200
    shelf.gain.value = -4
    master.connect(shelf)
    shelf.connect(context.destination)
  }

  if (context.state === 'suspended') void context.resume()

  return context
}

const noiseBuffer = (ctx: AudioContext, seconds: number) => {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds))
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let index = 0; index < length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / length) ** 2
  }

  return buffer
}

/** Mechanical switch: low body + plastic click, with per-key variation. */
const playKey = () => {
  if (!enabled) return

  const nowMs = performance.now()
  if (nowMs - lastKeyAt < 18) return
  lastKeyAt = nowMs

  const ctx = ensureContext()
  if (!ctx || !master) return

  keyCount += 1
  const now = ctx.currentTime
  const isWide = keyCount % 13 === 0 || Math.random() < 0.06
  const bodyFreq = isWide ? 96 + Math.random() * 26 : 165 + Math.random() * 55
  const bodyGain = isWide ? 0.085 : 0.05 + Math.random() * 0.018
  const bodyDecay = isWide ? 0.13 : 0.062 + Math.random() * 0.02

  // 1) corpo grave (thock)
  const body = ctx.createOscillator()
  const bodyGainNode = ctx.createGain()
  const bodyFilter = ctx.createBiquadFilter()
  body.type = 'triangle'
  body.frequency.setValueAtTime(bodyFreq, now)
  body.frequency.exponentialRampToValueAtTime(bodyFreq * 0.62, now + bodyDecay)
  bodyFilter.type = 'lowpass'
  bodyFilter.frequency.value = 900
  bodyFilter.Q.value = 0.7
  bodyGainNode.gain.setValueAtTime(0.0001, now)
  bodyGainNode.gain.exponentialRampToValueAtTime(bodyGain, now + 0.003)
  bodyGainNode.gain.exponentialRampToValueAtTime(0.0001, now + bodyDecay)
  body.connect(bodyFilter)
  bodyFilter.connect(bodyGainNode)
  bodyGainNode.connect(master)
  body.start(now)
  body.stop(now + bodyDecay + 0.02)

  // 2) clique plástico (ruído filtrado)
  const click = ctx.createBufferSource()
  const clickGain = ctx.createGain()
  const clickFilter = ctx.createBiquadFilter()
  click.buffer = noiseBuffer(ctx, 0.02)
  clickFilter.type = 'bandpass'
  clickFilter.frequency.value = 2100 + Math.random() * 1600
  clickFilter.Q.value = 0.9
  clickGain.gain.setValueAtTime(0.055 + Math.random() * 0.015, now)
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022)
  click.connect(clickFilter)
  clickFilter.connect(clickGain)
  clickGain.connect(master)
  click.start(now)
}

/** Fuller click for buttons, cards and links. */
const playClick = () => {
  if (!enabled) return

  const ctx = ensureContext()
  if (!ctx || !master) return

  const now = ctx.currentTime

  const thump = ctx.createOscillator()
  const thumpGain = ctx.createGain()
  const thumpFilter = ctx.createBiquadFilter()
  thump.type = 'sine'
  thump.frequency.setValueAtTime(190, now)
  thump.frequency.exponentialRampToValueAtTime(78, now + 0.09)
  thumpFilter.type = 'lowpass'
  thumpFilter.frequency.value = 600
  thumpGain.gain.setValueAtTime(0.0001, now)
  thumpGain.gain.exponentialRampToValueAtTime(0.075, now + 0.005)
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13)
  thump.connect(thumpFilter)
  thumpFilter.connect(thumpGain)
  thumpGain.connect(master)
  thump.start(now)
  thump.stop(now + 0.15)

  const tick = ctx.createBufferSource()
  const tickGain = ctx.createGain()
  const tickFilter = ctx.createBiquadFilter()
  tick.buffer = noiseBuffer(ctx, 0.04)
  tickFilter.type = 'bandpass'
  tickFilter.frequency.value = 2400
  tickFilter.Q.value = 0.8
  tickGain.gain.setValueAtTime(0.05, now)
  tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)
  tick.connect(tickFilter)
  tickFilter.connect(tickGain)
  tickGain.connect(master)
  tick.start(now)
}

export const sfx = {
  key: playKey,
  click: playClick,
  prime: () => {
    ensureContext()
  },
  setEnabled: (value: boolean) => {
    enabled = value
    if (value) ensureContext()
  },
  isEnabled: () => enabled,
}
