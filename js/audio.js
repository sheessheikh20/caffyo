/* ============================================================
   CAFFYO by Zauq - Web Audio API Sound Engine
   Zero external audio dependencies - 100% procedural & immersive
   ============================================================ */

class CaffyoAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientGain = null;
    this.ambientOscillators = [];
    this.noiseNode = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  toggleSound() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.playChime(587.33, 0.15); // D5 welcome chime
    } else {
      this.stopAmbient();
    }

    return !this.isMuted;
  }

  startAmbient() {
    if (!this.ctx || this.ambientGain) return;

    // Master ambient gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
    this.ambientGain.connect(this.ctx.destination);

    // Warm cafe pad chord (Dm9 / Fmaj7 warmth: D3, F3, A3, C4, E4)
    const freqs = [146.83, 174.61, 220.00, 261.63, 329.63];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter to make it cozy and warm like boutique vinyl
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + idx * 40, this.ctx.currentTime);

      if (panner) {
        panner.pan.value = (idx - 2) * 0.3;
        osc.connect(filter);
        filter.connect(panner);
        panner.connect(this.ambientGain);
      } else {
        osc.connect(filter);
        filter.connect(this.ambientGain);
      }

      osc.start();
      this.ambientOscillators.push(osc);
    });

    // Gentle vinyl / espresso gentle hiss noise
    this.startVinylHiss();
  }

  startVinylHiss() {
    if (!this.ctx || !this.ambientGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.015;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1200;
    noiseFilter.Q.value = 0.8;

    noise.connect(noiseFilter);
    noiseFilter.connect(this.ambientGain);
    noise.start();
    this.noiseNode = noise;
  }

  stopAmbient() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.ambientOscillators.forEach(osc => osc.stop());
        this.ambientOscillators = [];
        if (this.noiseNode) {
          try { this.noiseNode.stop(); } catch(e){}
          this.noiseNode = null;
        }
        this.ambientGain = null;
      }, 1000);
    }
  }

  /* Explosive Detonation Sound Effect */
  playExplosionSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Low punch boom
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

    subGain.gain.setValueAtTime(0.5, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.75);

    // 2. High sizzle / espresso steam burst
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.8);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);

    // 3. Shimmering bell chime
    setTimeout(() => {
      this.playChime(880, 0.1);
      this.playChime(1174.66, 0.08);
    }, 120);
  }

  /* Coffee bean click/tap */
  playBeanClick() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  /* Success Chime */
  playChime(freq = 659.25, volume = 0.12) {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.65);
  }

  /* Steam wand hiss for brew lab */
  playSteamWand() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.Q.value = 1.2;

    const gain = this.ctx.createGain();
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  /* Gentle Porcelain Clink & Liquid Stir Sound */
  playCupStir() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Ceramic ping
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1480, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);

    // Warm lower resonance
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(420, now);
    subOsc.frequency.exponentialRampToValueAtTime(360, now + 0.18);

    subGain.gain.setValueAtTime(0.05, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.22);
  }

  /* Soft procedural liquid slosh sound on cursor drag / tilt */
  playLiquidSlosh(intensity = 0.5) {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = 0.22 + intensity * 0.12;

    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(340, now);
    filter.frequency.exponentialRampToValueAtTime(580 + intensity * 150, now + dur * 0.5);
    filter.frequency.exponentialRampToValueAtTime(320, now + dur);
    filter.Q.value = 2.4;

    const gain = this.ctx.createGain();
    const peakVolume = Math.min(0.06, 0.02 + intensity * 0.04);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(peakVolume, now + dur * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }
}

window.caffyoAudio = new CaffyoAudioEngine();
