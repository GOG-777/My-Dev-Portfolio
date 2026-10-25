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

// ─── 1. Multi-Stage Atmospheric Rolling Thunder (~3.6s) ─────────
export function playThunderSound(): void {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 3.6; // 3.6 seconds rolling storm rumble

  // Pure deep atmospheric shockwave pressure waves (no artificial clicks or toggle transients)
  const strikes = [
    { timeOffset: 0.04, freq: 85, vol: 0.45 },
    { timeOffset: 0.28, freq: 70, vol: 0.50 },
    { timeOffset: 0.65, freq: 55, vol: 0.60 },
  ];

  strikes.forEach(({ timeOffset, freq, vol }) => {
    const t = now + timeOffset;

    // Organic low-end shockwave (sine wave pressure wave, smoothed attack so there is NO click)
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(freq, t);
    boomOsc.frequency.exponentialRampToValueAtTime(28, t + 0.7);

    boomGain.gain.setValueAtTime(0.0001, t);
    boomGain.gain.linearRampToValueAtTime(vol, t + 0.06);
    boomGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);

    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);
    boomOsc.start(t);
    boomOsc.stop(t + 0.76);
  });

  // Long Rolling Cloud Reverberation (3.6s Brown noise with 3 distinct rolling shockwave envelopes)
  const rumbleLength = Math.floor(ctx.sampleRate * duration);
  const rumbleBuffer = ctx.createBuffer(1, rumbleLength, ctx.sampleRate);
  const rumbleData = rumbleBuffer.getChannelData(0);
  let lastVal = 0.0;

  for (let i = 0; i < rumbleLength; i++) {
    const white = Math.random() * 2 - 1;
    lastVal = (lastVal + 0.035 * white) / 1.035;
    const t = i / ctx.sampleRate;

    // 3 distinct envelope peaks matching the strikes, followed by distant rolling echoes
    let env = Math.exp(-t * 2.2) * 1.8;
    env += Math.exp(-Math.pow((t - 0.28) / 0.12, 2)) * 1.8;
    env += Math.exp(-Math.pow((t - 0.65) / 0.18, 2)) * 2.4;
    env += Math.exp(-Math.pow((t - 1.20) / 0.28, 2)) * 1.1;
    env += Math.exp(-Math.pow((t - 1.95) / 0.40, 2)) * 0.7;
    env += Math.exp(-Math.pow((t - 2.80) / 0.50, 2)) * 0.4;
    env *= Math.max(0, 1 - t / duration);

    rumbleData[i] = lastVal * env * 4.2;
  }

  const rumbleSource = ctx.createBufferSource();
  rumbleSource.buffer = rumbleBuffer;

  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = 'lowpass';
  rumbleFilter.frequency.setValueAtTime(240, now);
  rumbleFilter.frequency.exponentialRampToValueAtTime(35, now + duration);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.0001, now);
  rumbleGain.gain.linearRampToValueAtTime(0.6, now + 0.08); // Smooth atmospheric swell, zero button click!
  rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(ctx.destination);
  rumbleSource.start(now);
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
