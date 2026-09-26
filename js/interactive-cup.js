/* ============================================================
   CAFFYO by Zauq - Auto-Playing Product Assembly Animation
   - Triggers automatically when section enters viewport
   - Cinematic 3.5s single-play physical drop-in sequence
   - Staggered downward motion: Glass -> Raspberry -> Milk -> Matcha -> Ice -> Straw
   - Uses untouched original frames (ezgif-frame-001.png -> ezgif-frame-023.png)
   - Dynamic viewport crop: pushes surrounding props outside visible area
   - Subtle 4-edge feathering dissolving seamlessly into #0D0805
   - Completely independent of user scroll position
   ============================================================ */

class AutoMatchaAssembly {
  constructor() {
    this.canvas = document.getElementById('craft-frames-canvas');
    this.section = document.getElementById('interactive-assembly');
    if (!this.canvas || !this.section) return;

    this.ctx = this.canvas.getContext('2d');
    this.totalFrames = 23;
    this.images = [];
    this.loadedImages = 0;

    // Animation state
    this.currentFrame = 0.0;
    this.isPlaying = false;
    this.hasCompleted = false;
    this.startTime = null;
    this.duration = 3400; // 3.4 seconds total sequence duration

    this.displayWidth = 440;
    this.displayHeight = 520;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Exact zoom framing inside original 1280x720 photography:
    // Captures complete drink from straw top (y=12) to glass base (y=685)
    // Pushes milk bottle (x<=522), strawberry bowl (x>=775), whisk, and table surface outside
    this.crop = {
      sx: 535,
      sy: 10,
      sw: 220,
      sh: 675
    };

    this.init();
  }

  init() {
    this.setupCanvas();
    this.preloadFrames();
    this.setupIntersectionObserver();

    window.addEventListener('resize', () => {
      this.setupCanvas();
      this.render();
    });
  }

  setupCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.displayWidth = rect.width || 440;
    this.displayHeight = rect.height || 520;
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
      img.src = `assets/matcha-frames/ezgif-frame-${numStr}.png`;

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

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When section enters view, trigger single-play drop sequence
          if (!this.isPlaying && !this.hasCompleted) {
            this.startSequence();
          }
        } else {
          // When user scrolls far away from section, reset for replay upon next return
          if (this.hasCompleted) {
            this.hasCompleted = false;
            this.currentFrame = 0.0;
            this.render();
          }
        }
      });
    }, {
      root: null,
      threshold: 0.25 // Trigger when 25% of the section is visible
    });

    observer.observe(this.section);
  }

  startSequence() {
    this.isPlaying = true;
    this.startTime = performance.now();

    const loop = (now) => {
      if (!this.isPlaying) return;

      const elapsed = now - this.startTime;
      const rawProgress = Math.min(1.0, elapsed / this.duration);

      // Natural gravity ease: smooth acceleration, steady descent, gentle deceleration at end
      // Cubic ease-out curve (1 - (1 - t)^2.4)
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.4);

      // Target frame 0 (exploded) -> 22 (assembled)
      const targetFrame = easedProgress * (this.totalFrames - 1);

      // Smooth frame interpolation
      this.currentFrame += (targetFrame - this.currentFrame) * 0.25;

      this.render();

      if (rawProgress < 1.0) {
        requestAnimationFrame(loop);
      } else {
        // Complete sequence: lock exactly on the final assembled drink
        this.currentFrame = this.totalFrames - 1;
        this.isPlaying = false;
        this.hasCompleted = true;
        this.render();
      }
    };

    requestAnimationFrame(loop);
  }

  applyEdgeFeather(drawX, drawY, drawW, drawH) {
    const ctx = this.ctx;
    const fadeX = 26;     // Subtle feather on left & right
    const fadeTop = 22;   // Subtle feather on top
    const fadeBottom = 18;// Subtle feather on bottom

    // Left edge -> softly fade into #0D0805
    const gradL = ctx.createLinearGradient(drawX - 1, 0, drawX + fadeX, 0);
    gradL.addColorStop(0.0, 'rgba(13, 8, 5, 1.0)');
    gradL.addColorStop(0.3, 'rgba(13, 8, 5, 0.7)');
    gradL.addColorStop(0.7, 'rgba(13, 8, 5, 0.2)');
    gradL.addColorStop(1.0, 'rgba(13, 8, 5, 0.0)');
    ctx.fillStyle = gradL;
    ctx.fillRect(drawX - 2, drawY - 2, fadeX + 2, drawH + 4);

    // Right edge -> softly fade into #0D0805
    const gradR = ctx.createLinearGradient(drawX + drawW + 1, 0, drawX + drawW - fadeX, 0);
    gradR.addColorStop(0.0, 'rgba(13, 8, 5, 1.0)');
    gradR.addColorStop(0.3, 'rgba(13, 8, 5, 0.7)');
    gradR.addColorStop(0.7, 'rgba(13, 8, 5, 0.2)');
    gradR.addColorStop(1.0, 'rgba(13, 8, 5, 0.0)');
    ctx.fillStyle = gradR;
    ctx.fillRect(drawX + drawW - fadeX, drawY - 2, fadeX + 2, drawH + 4);

    // Top edge -> softly fade into #0D0805
    const gradT = ctx.createLinearGradient(0, drawY - 1, 0, drawY + fadeTop);
    gradT.addColorStop(0.0, 'rgba(13, 8, 5, 1.0)');
    gradT.addColorStop(0.3, 'rgba(13, 8, 5, 0.7)');
    gradT.addColorStop(0.7, 'rgba(13, 8, 5, 0.2)');
    gradT.addColorStop(1.0, 'rgba(13, 8, 5, 0.0)');
    ctx.fillStyle = gradT;
    ctx.fillRect(drawX - 2, drawY - 2, drawW + 4, fadeTop + 2);

    // Bottom edge -> softly fade into #0D0805
    const gradB = ctx.createLinearGradient(0, drawY + drawH + 1, 0, drawY + drawH - fadeBottom);
    gradB.addColorStop(0.0, 'rgba(13, 8, 5, 1.0)');
    gradB.addColorStop(0.3, 'rgba(13, 8, 5, 0.7)');
    gradB.addColorStop(0.7, 'rgba(13, 8, 5, 0.2)');
    gradB.addColorStop(1.0, 'rgba(13, 8, 5, 0.0)');
    ctx.fillStyle = gradB;
    ctx.fillRect(drawX - 2, drawY + drawH - fadeBottom, drawW + 4, fadeBottom + 2);
  }

  render() {
    if (!this.ctx) return;

    const frameIndex = Math.max(0, Math.min(this.totalFrames - 1, Math.round(this.currentFrame)));
    const img = this.images[frameIndex];

    const w = this.displayWidth;
    const h = this.displayHeight;

    // Fill background with exact section background #0D0805
    this.ctx.fillStyle = '#0D0805';
    this.ctx.fillRect(0, 0, w, h);

    const aspect = this.crop.sw / this.crop.sh;
    const paddingY = 16;
    const drawH = h - (paddingY * 2);
    const drawW = drawH * aspect;
    const drawX = (w - drawW) / 2;
    const drawY = paddingY;

    if (img && img.complete && img.naturalWidth > 0) {
      this.ctx.drawImage(
        img,
        this.crop.sx,
        this.crop.sy,
        this.crop.sw,
        this.crop.sh,
        drawX,
        drawY,
        drawW,
        drawH
      );
      this.applyEdgeFeather(drawX, drawY, drawW, drawH);
    } else if (this.images[0] && this.images[0].complete) {
      const fallback = this.images[0];
      this.ctx.drawImage(
        fallback,
        this.crop.sx,
        this.crop.sy,
        this.crop.sw,
        this.crop.sh,
        drawX,
        drawY,
        drawW,
        drawH
      );
      this.applyEdgeFeather(drawX, drawY, drawW, drawH);
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.caffyoMatcha = new AutoMatchaAssembly();
});
