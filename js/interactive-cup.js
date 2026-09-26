/* ============================================================
   CAFFYO by Zauq - Scroll-Driven Matcha Product Assembly Animation
   - Real 23 Isolated PNG Frames (Transparent Background)
   - Scroll-controlled assembly: Exploded (Frame 1) -> Assembled (Frame 23)
   - Cinematic RequestAnimationFrame Lerp Easing (Buttery Smooth)
   - Zero DOM overhead: High-DPI Canvas Rendering
   - Pure seamless integration with #0d0906 background
   ============================================================ */

class ScrollMatchaAssembly {
  constructor() {
    this.canvas = document.getElementById('craft-frames-canvas');
    this.section = document.getElementById('interactive-assembly');
    if (!this.canvas || !this.section) return;

    this.ctx = this.canvas.getContext('2d');
    this.totalFrames = 23;
    this.images = [];
    this.loadedImages = 0;

    // Frame interpolation state
    this.currentFrame = 0.0;
    this.targetFrame = 0.0;
    this.lerpSpeed = 0.12; // Silky smooth easing

    this.displayWidth = 440;
    this.displayHeight = 540;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.init();
  }

  init() {
    this.setupCanvas();
    this.preloadFrames();
    this.bindEvents();
    this.startLoop();
  }

  setupCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.displayWidth = rect.width || 440;
    this.displayHeight = rect.height || 540;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.round(this.displayWidth * this.dpr);
    this.canvas.height = Math.round(this.displayHeight * this.dpr);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  }

  preloadFrames() {
    const indicator = document.getElementById('craft-loading-indicator');

    for (let i = 1; i <= this.totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `assets/matcha-frames/frame_${numStr}.png`;

      img.onload = () => {
        this.loadedImages++;
        if (i === 1) {
          // Render initial exploded frame immediately
          this.render();
          if (indicator) indicator.style.display = 'none';
        }
      };

      this.images.push(img);
    }
  }

  calculateScrollProgress() {
    if (!this.section) return 0;
    const rect = this.section.getBoundingClientRect();
    const sectionHeight = this.section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollRange = sectionHeight - viewportHeight;

    if (totalScrollRange <= 20) {
      // Mobile or fallback: map scroll as section passes through viewport
      const start = viewportHeight;
      const end = -rect.height * 0.5;
      const current = rect.top;
      const progress = (start - current) / (start - end);
      return Math.max(0, Math.min(1, progress));
    }

    // Desktop pinned scroll track:
    // progress is 0 when section top hits viewport top (or just below navbar)
    const navOffset = 75;
    const progress = (navOffset - rect.top) / totalScrollRange;
    return Math.max(0, Math.min(1, progress));
  }

  bindEvents() {
    const onScroll = () => {
      const progress = this.calculateScrollProgress();
      this.targetFrame = progress * (this.totalFrames - 1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.render();
    });

    // Run once on load to sync initial scroll position
    onScroll();
  }

  startLoop() {
    const tick = () => {
      // Buttery smooth lerp toward target frame
      const diff = this.targetFrame - this.currentFrame;
      if (Math.abs(diff) > 0.001) {
        this.currentFrame += diff * this.lerpSpeed;
        this.render();
      } else if (this.currentFrame !== this.targetFrame) {
        this.currentFrame = this.targetFrame;
        this.render();
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  render() {
    if (!this.ctx) return;

    // Pick closest frame
    const frameIndex = Math.max(0, Math.min(this.totalFrames - 1, Math.round(this.currentFrame)));
    const img = this.images[frameIndex];

    // Clear canvas with the exact section background color #0d0906
    this.ctx.fillStyle = '#0d0906';
    this.ctx.fillRect(0, 0, this.displayWidth, this.displayHeight);

    // If frame is loaded, draw it centered with preserved aspect ratio
    if (img && img.complete && img.naturalWidth > 0) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgAspect = imgW / imgH;

      // Fit height with comfortable top/bottom padding
      const paddingY = 24;
      const drawH = this.displayHeight - (paddingY * 2);
      const drawW = drawH * imgAspect;

      // Center horizontally inside canvas
      const drawX = (this.displayWidth - drawW) / 2;
      const drawY = paddingY;

      this.ctx.drawImage(img, drawX, drawY, drawW, drawH);
    } else if (this.images[0] && this.images[0].complete) {
      // Fallback to initial loaded frame if current frame is still caching
      const fallback = this.images[0];
      const imgAspect = fallback.naturalWidth / fallback.naturalHeight;
      const paddingY = 24;
      const drawH = this.displayHeight - (paddingY * 2);
      const drawW = drawH * imgAspect;
      const drawX = (this.displayWidth - drawW) / 2;
      const drawY = paddingY;
      this.ctx.drawImage(fallback, drawX, drawY, drawW, drawH);
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.caffyoMatcha = new ScrollMatchaAssembly();
});
