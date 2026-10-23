// Web Audio API Native Synthesizer — Zero asset downloads, 0ms latency

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSfxEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('sfx_enabled');
  return saved !== null ? saved === 'true' : true;
}

export function setSfxEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sfx_enabled', String(enabled));
  window.dispatchEvent(new CustomEvent('sfx-status-changed', { detail: { enabled } }));
}

// ─── 1. Multi-Stage 3-Split Atmospheric Thunder (~3.6s Rolling Storm) ─────────
export function playThunderSound(): void {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 3.6; // 3.6 seconds rolling storm rumble

  // 3 distinct stepped return stroke detonations ("DOH... DOH... DOHHH")
  const strikes = [
    { timeOffset: 0.00, crackFreq: 2600, boomFreq: 115, boomVol: 0.50, crackVol: 0.45 },
    { timeOffset: 0.26, crackFreq: 2000, boomFreq: 98,  boomVol: 0.42, crackVol: 0.38 },
    { timeOffset: 0.62, crackFreq: 1500, boomFreq: 82,  boomVol: 0.55, crackVol: 0.50 },
  ];

  strikes.forEach(({ timeOffset, crackFreq, boomFreq, boomVol, crackVol }) => {
    const t = now + timeOffset;

    // High-voltage crack / whip transient
    const crackLength = Math.floor(ctx.sampleRate * 0.08);
    const crackBuffer = ctx.createBuffer(1, crackLength, ctx.sampleRate);
    const crackData = crackBuffer.getChannelData(0);
    for (let i = 0; i < crackLength; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }
    const crackSource = ctx.createBufferSource();
    crackSource.buffer = crackBuffer;

    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    crackFilter.frequency.setValueAtTime(crackFreq, t);
    crackFilter.Q.setValueAtTime(2.2, t);

    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(crackVol, t);
    crackGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(ctx.destination);
    crackSource.start(t);

    // Deep sub-bass shockwave detonation (triangle wave drop)
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boomOsc.type = 'triangle';
    boomOsc.frequency.setValueAtTime(boomFreq, t);
    boomOsc.frequency.exponentialRampToValueAtTime(32, t + 0.6);

    boomGain.gain.setValueAtTime(0.01, t);
    boomGain.gain.linearRampToValueAtTime(boomVol, t + 0.025);
    boomGain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);
    boomOsc.start(t);
    boomOsc.stop(t + 0.68);
  });

  // Long Rolling Cloud Reverberation (3.6s Brown noise with 3 distinct shockwave envelopes)
  const rumbleLength = Math.floor(ctx.sampleRate * duration);
  const rumbleBuffer = ctx.createBuffer(1, rumbleLength, ctx.sampleRate);
  const rumbleData = rumbleBuffer.getChannelData(0);
  let lastVal = 0.0;

  for (let i = 0; i < rumbleLength; i++) {
    const white = Math.random() * 2 - 1;
    lastVal = (lastVal + 0.035 * white) / 1.035;
    const t = i / ctx.sampleRate;

    // 3 distinct envelope peaks matching the strikes, followed by distant rolling echoes
    let env = Math.exp(-t * 2.2) * 2.0;                         // Strike 1 envelope
    env += Math.exp(-Math.pow((t - 0.28) / 0.12, 2)) * 1.8;     // Strike 2 envelope
    env += Math.exp(-Math.pow((t - 0.65) / 0.18, 2)) * 2.4;     // Strike 3 main payload
    env += Math.exp(-Math.pow((t - 1.20) / 0.28, 2)) * 1.1;     // Distant mountain/cloud bounce
    env += Math.exp(-Math.pow((t - 1.95) / 0.40, 2)) * 0.7;     // Second rolling reverberation
    env += Math.exp(-Math.pow((t - 2.80) / 0.50, 2)) * 0.4;     // Atmospheric tail
    env *= Math.max(0, 1 - t / duration);

    rumbleData[i] = lastVal * env * 4.2;
  }

  const rumbleSource = ctx.createBufferSource();
  rumbleSource.buffer = rumbleBuffer;

  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = 'lowpass';
  rumbleFilter.frequency.setValueAtTime(280, now);
  rumbleFilter.frequency.exponentialRampToValueAtTime(40, now + duration);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.02, now);
  rumbleGain.gain.linearRampToValueAtTime(0.55, now + 0.04);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(ctx.destination);
  rumbleSource.start(now + 0.01);
}

// ─── 2. Tactile Clipboard Copy Blip ──────────────────────────────────────────
export function playCopySound(): void {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(820, now);
  osc.frequency.exponentialRampToValueAtTime(1240, now + 0.045);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

// ─── 3. Mobile Hamburger Menu Toggle Sound ───────────────────────────────────
export function playMenuSound(opening = true): void {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  if (opening) {
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.06);
  } else {
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.05);
  }

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.065);
}

// ─── 4. Departure Interstitial Chime ─────────────────────────────────────────
export function playDepartureSound(): void {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [587.33, 880];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.03);

    gain.gain.setValueAtTime(0.01, now + idx * 0.03);
    gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.03 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.03);
    osc.stop(now + idx * 0.03 + 0.36);
  });
}
