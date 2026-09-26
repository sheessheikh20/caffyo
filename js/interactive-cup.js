/* ============================================================
   CAFFYO by Zauq - Standalone Procedural Drink Assembly Engine
   Reconstructs the Pistachio Tiramisu Iced Latte Build
   Features:
   - 100% Isolated Component with Pure Transparent Background
   - Heavy Crystal Iced Latte Glass with Real Specular Caustics & Rim
   - 3D Faceted Floating Clear Ice Cubes
   - Steamed Milk / Condensed Cream Base with Fluid Wave Turbulence
   - Double-Shot Espresso Pour with Dynamic Marbling Curl Tendrils
   - Pistachio Velvet Cream Ribbons wrapping helically around glass
   - Thick Tiramisu Mascarpone Cream Foam Crown with Pillowy Peaks
   - Roasted Belgian Cocoa Powder Crust Particles
   - Crushed Pistachio Nut Pieces with Physical Gravity & 3D Tumble
   - Interactive Scrubber & Continuous 60fps Playback Engine
   ============================================================ */

class InteractiveCraftExperience {
  constructor() {
    this.canvas = document.getElementById('craft-frames-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.totalFrames = 50;
    this.currentFrame = 48; // Default showcase (rich completed latte)
    this.progress = 0.96;   // 0.0 to 1.0

    this.isPlaying = false;
    this.animId = null;
    this.lastTime = performance.now();
    this.simTime = 0;

    // Pistachio Crumbles Physics System
    this.pistachioPieces = this.initPistachioPieces(24);
    // Cocoa Powder Dust Particles System
    this.cocoaParticles = this.initCocoaParticles(180);
    // Ice Cubes State
    this.iceCubes = this.initIceCubes();

    this.init();
  }

  init() {
    this.setupCanvasResolution();
    this.bindControls();

    const indicator = document.getElementById('craft-loading-indicator');
    if (indicator) indicator.style.display = 'none';

    window.addEventListener('resize', () => {
      this.setupCanvasResolution();
      this.render();
    });

    // Start 60fps rendering loop
    this.loop = (now) => {
      const dt = Math.min((now - this.lastTime) / 1000, 0.05);
      this.lastTime = now;
      this.simTime += dt;

      if (this.isPlaying) {
        this.progress += dt * 0.16; // ~6.2s full build cycle
        if (this.progress > 1.0) {
          this.progress = 0.0;
        }
        this.currentFrame = Math.max(1, Math.min(50, Math.round(this.progress * 49) + 1));
        this.syncUI();
      }

      this.updatePhysics(dt);
      this.render();
      this.animId = requestAnimationFrame(this.loop);
    };

    this.animId = requestAnimationFrame(this.loop);
  }

  setupCanvasResolution() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width || 420;
    const h = rect.height || 540;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.displayWidth = w;
    this.displayHeight = h;
  }

  initIceCubes() {
    return [
      { x: -32, y: 110, w: 56, h: 48, rot: 0.18, melt: 1.0, floatOffset: 0 },
      { x: 28,  y: 90,  w: 52, h: 54, rot: -0.24, melt: 1.0, floatOffset: 1.2 },
      { x: -15, y: 35,  w: 60, h: 50, rot: 0.08, melt: 1.0, floatOffset: 2.5 },
      { x: 20,  y: -20, w: 54, h: 46, rot: -0.15, melt: 1.0, floatOffset: 3.8 }
    ];
  }

  initCocoaParticles(count) {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        relX: (Math.random() - 0.5) * 120,
        relY: (Math.random() - 0.5) * 16,
        size: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? '#331709' : '#4a2512',
        spawnProgress: 0.65 + Math.random() * 0.15
      });
    }
    return particles;
  }

  initPistachioPieces(count) {
    const pieces = [];
    for (let i = 0; i < count; i++) {
      const targetRelX = (Math.random() - 0.5) * 115;
      const targetRelY = (Math.random() - 0.5) * 18;
      const spawnP = 0.78 + (i / count) * 0.14; // Start falling during phase 7

      pieces.push({
        targetX: targetRelX,
        targetY: targetRelY,
        spawnProgress: spawnP,
        currentY: -220,
        velY: 0,
        rot: Math.random() * Math.PI * 2,
        rotVel: (Math.random() - 0.5) * 7.0,
        width: Math.random() * 6 + 5,
        height: Math.random() * 5 + 4,
        points: [
          [(Math.random() - 0.5) * 8, -4 + Math.random() * 2],
          [4 + Math.random() * 3, (Math.random() - 0.5) * 4],
          [(Math.random() - 0.5) * 6, 4 + Math.random() * 2],
          [-4 - Math.random() * 3, (Math.random() - 0.5) * 4]
        ],
        greenColor: Math.random() > 0.4 ? '#8eb359' : '#6f9243',
        skinColor: '#5a3518',
        settled: false,
        bounceAmp: 0
      });
    }
    return pieces;
  }

  updatePhysics(dt) {
    const p = this.progress;

    // Update falling pistachio pieces based on current progress
    this.pistachioPieces.forEach(piece => {
      if (p < piece.spawnProgress) {
        piece.currentY = -220;
        piece.settled = false;
        piece.velY = 0;
      } else {
        const fallT = (p - piece.spawnProgress) / (1.0 - piece.spawnProgress);
        const destinationY = piece.targetY;

        if (piece.currentY < destinationY) {
          piece.velY += 850 * dt;
          piece.currentY += piece.velY * dt;
          piece.rot += piece.rotVel * dt;

          if (piece.currentY >= destinationY) {
            piece.currentY = destinationY;
            piece.settled = true;
            piece.bounceAmp = 4;
            piece.velY = -35;
          }
        } else {
          // Resting with gentle foam bobbing
          piece.rot += piece.rotVel * 0.05 * dt;
          if (piece.bounceAmp > 0.1) {
            piece.bounceAmp *= 0.92;
          }
        }
      }
    });
  }

  render() {
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;

    // 100% CLEAR - Pure Transparent Background for seamless integration
    ctx.clearRect(0, 0, w, h);

    const centerX = w * 0.5;
    const centerY = h * 0.52;

    // Glass Dimensions
    const glassW = Math.min(w * 0.58, 220);
    const glassH = Math.min(h * 0.72, 360);
    const halfW = glassW * 0.5;
    const topY = centerY - glassH * 0.48;
    const botY = centerY + glassH * 0.50;

    ctx.save();

    // 1. Soft Ambient Drop Shadow under the glass
    const shadowGrad = ctx.createRadialGradient(centerX, botY + 12, 10, centerX, botY + 12, halfW * 1.35);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.22)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(centerX, botY + 12, halfW * 1.35, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. DEFINE GLASS INNER CLIPPING PATH
    // Liquids, ice, and creams are strictly clipped inside the glass wall!
    ctx.save();
    ctx.beginPath();
    const cornerR = 24;
    ctx.moveTo(centerX - halfW + 6, topY);
    ctx.lineTo(centerX + halfW - 6, topY);
    ctx.lineTo(centerX + halfW - 10, botY - cornerR);
    ctx.quadraticCurveTo(centerX + halfW - 10, botY, centerX + halfW - cornerR - 10, botY);
    ctx.lineTo(centerX - halfW + cornerR + 10, botY);
    ctx.quadraticCurveTo(centerX - halfW + 10, botY, centerX - halfW + 10, botY - cornerR);
    ctx.closePath();
    ctx.clip(); // <<--- MASK: Everything inside stays physically inside the glass!

    // 3. RENDER INTERNAL DRINK CONTENTS
    this.renderDrinkContents(ctx, centerX, topY, botY, halfW, glassH);

    ctx.restore(); // Exit inner clipping mask

    // 4. RENDER OVERLAY GLASSWARE, SPECULAR HIGHLIGHTS & REFRACTIONS
    this.renderGlassware(ctx, centerX, topY, botY, halfW, glassH);

    // 5. RENDER FALLING PISTACHIOS & TOP FOAM GARNISH OVER GLASS RIM
    this.renderTopGarnish(ctx, centerX, topY, halfW);

    ctx.restore();
  }

  renderDrinkContents(ctx, cx, topY, botY, hw, gh) {
    const p = this.progress;
    const t = this.simTime;

    // --- PHASE 1: ICE CUBES ---
    this.renderIceCubes(ctx, cx, topY, botY, hw, p, t);

    // --- PHASE 2: MILK & CONDENSED CREAM LAYER ---
    // Fills up from bottom: 0.0 to 0.45 of total height
    const milkFillProgress = Math.min(1.0, Math.max(0, (p - 0.04) / 0.38));
    const milkH = gh * 0.46 * milkFillProgress;
    const milkTopY = botY - milkH;

    if (milkH > 2) {
      ctx.save();
      const milkGrad = ctx.createLinearGradient(cx, botY, cx, milkTopY);
      milkGrad.addColorStop(0, '#f2ece1');
      milkGrad.addColorStop(0.3, '#fbf7ee');
      milkGrad.addColorStop(0.85, '#fdfbf6');
      milkGrad.addColorStop(1, '#ffffff');

      ctx.fillStyle = milkGrad;
      ctx.beginPath();
      ctx.moveTo(cx - hw, botY + 10);
      ctx.lineTo(cx + hw, botY + 10);

      // Organic fluid wave surface
      const waveAmp = (1.0 - p * 0.5) * 4.5;
      for (let x = hw; x >= -hw; x -= 8) {
        const wave = Math.sin((x + cx) * 0.045 + t * 4.2) * waveAmp;
        ctx.lineTo(cx + x, milkTopY + wave);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // --- PHASE 3: ESPRESSO EXTRACTION & SWIRLING MARBLING ---
    // Begins at p >= 0.22, fills upward and marbled through milk
    const espressoProgress = Math.min(1.0, Math.max(0, (p - 0.20) / 0.42));
    if (espressoProgress > 0.01) {
      const espressoH = gh * 0.28 * espressoProgress;
      const espressoTopY = milkTopY - espressoH;

      ctx.save();
      // Rich roasted espresso gradient
      const espGrad = ctx.createLinearGradient(cx, milkTopY, cx, espressoTopY);
      espGrad.addColorStop(0, 'rgba(84, 38, 14, 0.92)');
      espGrad.addColorStop(0.4, 'rgba(125, 59, 21, 0.95)');
      espGrad.addColorStop(0.8, 'rgba(62, 26, 8, 0.98)');
      espGrad.addColorStop(1, '#2c1205');

      ctx.fillStyle = espGrad;
      ctx.beginPath();
      ctx.moveTo(cx - hw, milkTopY + 4);
      ctx.lineTo(cx + hw, milkTopY + 4);

      // Top wave of espresso
      for (let x = hw; x >= -hw; x -= 8) {
        const espWave = Math.sin((x + cx) * 0.038 - t * 3.6) * 3.5;
        ctx.lineTo(cx + x, espressoTopY + espWave);
      }
      ctx.closePath();
      ctx.fill();

      // Fluid Marbling Curls penetrating into milk
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      const tendrils = [
        { xOffset: -45, depth: 75, curl: 32, alpha: 0.65 },
        { xOffset: -10, depth: 105, curl: -24, alpha: 0.75 },
        { xOffset: 25, depth: 85, curl: 28, alpha: 0.70 },
        { xOffset: 55, depth: 60, curl: -18, alpha: 0.55 }
      ];

      tendrils.forEach(td => {
        const actualDepth = td.depth * espressoProgress;
        ctx.strokeStyle = `rgba(102, 47, 18, ${td.alpha * espressoProgress})`;
        ctx.beginPath();
        const startX = cx + td.xOffset;
        ctx.moveTo(startX, milkTopY - 2);
        ctx.bezierCurveTo(
          startX + Math.sin(t * 2.2 + td.xOffset) * 12,
          milkTopY + actualDepth * 0.45,
          startX + td.curl + Math.cos(t * 1.8) * 14,
          milkTopY + actualDepth * 0.85,
          startX + td.curl * 0.7,
          milkTopY + actualDepth
        );
        ctx.stroke();
      });

      ctx.restore();
    }

    // --- PHASE 4: PISTACHIO VELVET CREAM RIBBONS ---
    // Volumetric 3D pistachio ribbons wrapping organically around the inside wall
    const pistachioProgress = Math.min(1.0, Math.max(0, (p - 0.35) / 0.38));
    if (pistachioProgress > 0.02) {
      ctx.save();
      const ribbons = [
        { startFrac: 0.18, ampX: hw * 0.82, freq: 0.022, phase: 0.3, w: 22 },
        { startFrac: 0.35, ampX: hw * 0.78, freq: 0.026, phase: 2.5, w: 18 },
        { startFrac: 0.52, ampX: hw * 0.74, freq: 0.030, phase: 4.6, w: 16 }
      ];

      ribbons.forEach((rb, idx) => {
        const totalSteps = 48;
        const currentSteps = Math.floor(totalSteps * pistachioProgress);
        if (currentSteps < 2) return;

        const pathPoints = [];
        for (let s = 0; s <= currentSteps; s++) {
          const stepFrac = s / totalSteps;
          const sy = (topY + gh * rb.startFrac) + stepFrac * (gh * 0.54);
          const sx = cx + Math.sin(sy * rb.freq + rb.phase + t * 0.3) * (rb.ampX);
          pathPoints.push({ x: sx, y: sy });
        }

        // Layer A: Soft Diffuse Cream Shadow
        ctx.strokeStyle = 'rgba(78, 108, 42, 0.45)';
        ctx.lineWidth = rb.w * pistachioProgress + 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        pathPoints.forEach((pt, i) => { if (i === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
        ctx.stroke();

        // Layer B: Rich Pistachio Paste Body Gradient
        const ribbonGrad = ctx.createLinearGradient(cx - hw, 0, cx + hw, 0);
        ribbonGrad.addColorStop(0, '#668f3a');
        ribbonGrad.addColorStop(0.3, '#8db555');
        ribbonGrad.addColorStop(0.65, '#aed576');
        ribbonGrad.addColorStop(1, '#668f3a');

        ctx.strokeStyle = ribbonGrad;
        ctx.lineWidth = rb.w * pistachioProgress;
        ctx.beginPath();
        pathPoints.forEach((pt, i) => { if (i === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
        ctx.stroke();

        // Layer C: Center Fluid Highlight Sheen (Gives delicious wet gloss)
        ctx.strokeStyle = 'rgba(235, 255, 205, 0.55)';
        ctx.lineWidth = Math.max(2, rb.w * 0.28 * pistachioProgress);
        ctx.beginPath();
        pathPoints.forEach((pt, i) => { if (i === 0) ctx.moveTo(pt.x, pt.y - 1); else ctx.lineTo(pt.x, pt.y - 1); });
        ctx.stroke();

        // Viscous drip droplets
        if (pistachioProgress > 0.55) {
          const dropY = topY + gh * (0.38 + idx * 0.18 + Math.sin(t * 1.6 + idx) * 0.03);
          const dropX = cx + (idx % 2 === 0 ? 1 : -1) * (hw * 0.68);
          // Drop shadow
          ctx.fillStyle = 'rgba(60, 85, 30, 0.6)';
          ctx.beginPath();
          ctx.arc(dropX + 1, dropY + 2, 6, 0, Math.PI * 2);
          ctx.fill();
          // Drop body
          ctx.fillStyle = '#92ba57';
          ctx.beginPath();
          ctx.arc(dropX, dropY, 5.5, 0, Math.PI * 2);
          ctx.fill();
          // Drop glint
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(dropX - 1.5, dropY - 1.5, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();
    }

    // --- PHASE 5: THICK TIRAMISU MASCARPONE FOAM CROWN ---
    const foamProgress = Math.min(1.0, Math.max(0, (p - 0.55) / 0.35));
    if (foamProgress > 0.02) {
      ctx.save();
      const foamH = gh * 0.22 * foamProgress;
      const foamTopY = (topY + gh * 0.08) - (foamH * 0.5);

      const foamGrad = ctx.createLinearGradient(cx, foamTopY + foamH, cx, foamTopY);
      foamGrad.addColorStop(0, 'rgba(238, 222, 196, 0.95)');
      foamGrad.addColorStop(0.35, '#faf5e8');
      foamGrad.addColorStop(0.75, '#fdfbf6');
      foamGrad.addColorStop(1, '#ffffff');

      ctx.fillStyle = foamGrad;
      ctx.beginPath();
      ctx.moveTo(cx - hw - 5, foamTopY + foamH + 5);
      ctx.lineTo(cx + hw + 5, foamTopY + foamH + 5);

      // Pillowy cloud-like peaks
      for (let x = hw + 5; x >= -hw - 5; x -= 6) {
        const peak1 = Math.sin((x + cx) * 0.075) * 5.0;
        const peak2 = Math.cos((x + cx) * 0.035 + t * 1.5) * 3.5;
        ctx.lineTo(cx + x, foamTopY + peak1 + peak2);
      }
      ctx.closePath();
      ctx.fill();

      // Soft shaded foam mounds for 3D depth
      ctx.fillStyle = 'rgba(214, 191, 160, 0.35)';
      ctx.beginPath();
      ctx.ellipse(cx - 35, foamTopY + 12, 42, 14, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 32, foamTopY + 14, 38, 12, 0.12, 0, Math.PI * 2);
      ctx.fill();

      // --- PHASE 6: BELGIAN COCOA POWDER DUSTING ---
      if (p > 0.68) {
        const cocoaProgress = Math.min(1.0, (p - 0.68) / 0.18);
        this.cocoaParticles.forEach(cp => {
          if (p >= cp.spawnProgress) {
            ctx.fillStyle = cp.color;
            ctx.globalAlpha = Math.min(0.92, cocoaProgress * 0.95);
            ctx.beginPath();
            ctx.arc(cx + cp.relX, foamTopY + 10 + cp.relY, cp.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      ctx.restore();
    }
  }

  renderIceCubes(ctx, cx, topY, botY, hw, p, t) {
    ctx.save();
    this.iceCubes.forEach(cube => {
      // Ice bobbing buoyancy as liquid rises
      const bob = Math.sin(t * 2.2 + cube.floatOffset) * (p > 0.2 ? 3.5 : 0.8);
      const ix = cx + cube.x;
      const iy = (botY - cube.y) + bob;

      ctx.save();
      ctx.translate(ix, iy);
      ctx.rotate(cube.rot + Math.sin(t * 1.2 + cube.floatOffset) * 0.04);

      // Faceted ice cube body
      const iceGrad = ctx.createLinearGradient(-cube.w * 0.5, -cube.h * 0.5, cube.w * 0.5, cube.h * 0.5);
      iceGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      iceGrad.addColorStop(0.4, 'rgba(220, 235, 245, 0.28)');
      iceGrad.addColorStop(0.8, 'rgba(195, 215, 230, 0.42)');
      iceGrad.addColorStop(1, 'rgba(255, 255, 255, 0.65)');

      ctx.fillStyle = iceGrad;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1.6;

      ctx.beginPath();
      ctx.roundRect(-cube.w * 0.5, -cube.h * 0.5, cube.w, cube.h, 6);
      ctx.fill();
      ctx.stroke();

      // Inner ice crack refraction lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(-cube.w * 0.3, -cube.h * 0.2);
      ctx.lineTo(cube.w * 0.2, cube.h * 0.1);
      ctx.lineTo(cube.w * 0.35, cube.h * 0.35);
      ctx.stroke();

      // Corner specular glint
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-cube.w * 0.35, -cube.h * 0.35, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
    ctx.restore();
  }

  renderGlassware(ctx, cx, topY, botY, hw, gh) {
    ctx.save();
    const cornerR = 24;

    // 1. Heavy Weighted Solid Glass Base (Bottom refraction facet)
    const baseH = 26;
    const baseGrad = ctx.createLinearGradient(cx, botY - baseH, cx, botY);
    baseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
    baseGrad.addColorStop(0.5, 'rgba(220, 235, 245, 0.32)');
    baseGrad.addColorStop(1, 'rgba(255, 255, 255, 0.55)');

    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.moveTo(cx - hw + 8, botY - baseH);
    ctx.lineTo(cx + hw - 8, botY - baseH);
    ctx.lineTo(cx + hw - 10, botY - cornerR);
    ctx.quadraticCurveTo(cx + hw - 10, botY, cx + hw - cornerR - 10, botY);
    ctx.lineTo(cx - hw + cornerR + 10, botY);
    ctx.quadraticCurveTo(cx - hw + 10, botY, cx - hw + 10, botY - cornerR);
    ctx.closePath();
    ctx.fill();

    // 2. Clear Glass Outer Outline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(cx - hw + 6, topY);
    ctx.lineTo(cx + hw - 6, topY);
    ctx.lineTo(cx + hw - 10, botY - cornerR);
    ctx.quadraticCurveTo(cx + hw - 10, botY, cx + hw - cornerR - 10, botY);
    ctx.lineTo(cx - hw + cornerR + 10, botY);
    ctx.quadraticCurveTo(cx - hw + 10, botY, cx - hw + 10, botY - cornerR);
    ctx.closePath();
    ctx.stroke();

    // 3. Specular Highlights (Left soft sheen & Right razor reflection)
    // Left Soft Sheen
    const leftGlow = ctx.createLinearGradient(cx - hw + 8, topY, cx - hw + 24, topY);
    leftGlow.addColorStop(0, 'rgba(255, 255, 255, 0.52)');
    leftGlow.addColorStop(0.4, 'rgba(255, 255, 255, 0.22)');
    leftGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = leftGlow;
    ctx.fillRect(cx - hw + 8, topY + 8, 16, gh - 32);

    // Right Razor Specular Line
    const rightGlow = ctx.createLinearGradient(cx + hw - 22, topY, cx + hw - 10, topY);
    rightGlow.addColorStop(0, 'rgba(255, 255, 255, 0)');
    rightGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.35)');
    rightGlow.addColorStop(1, 'rgba(255, 255, 255, 0.75)');
    ctx.fillStyle = rightGlow;
    ctx.fillRect(cx + hw - 22, topY + 6, 12, gh - 28);

    // Fluted Crystal Vertical Ribs across the glass body (Luxurious artisanal cafe glassware)
    ctx.lineWidth = 1.0;
    const fluteCount = 7;
    const fluteSpacing = (hw * 1.6) / fluteCount;
    for (let f = 1; f < fluteCount; f++) {
      const fx = (cx - hw * 0.8) + f * fluteSpacing;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.beginPath();
      ctx.moveTo(fx, topY + 12);
      ctx.lineTo(fx, botY - baseH - 4);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.beginPath();
      ctx.moveTo(fx + 1.2, topY + 12);
      ctx.lineTo(fx + 1.2, botY - baseH - 4);
      ctx.stroke();
    }

    // 4. Chilled Glass Condensation Drops (Forms after espresso is poured, p > 0.45)
    if (this.progress > 0.45) {
      const dropAlpha = Math.min(0.6, (this.progress - 0.45) * 1.4);
      ctx.fillStyle = `rgba(255, 255, 255, ${dropAlpha})`;
      const drops = [
        { x: -hw + 26, y: botY - 95, r: 2.2 },
        { x: -hw + 24, y: botY - 82, r: 3.2 },
        { x: -hw + 25, y: botY - 60, r: 2.6 },
        { x: hw - 28,  y: botY - 110, r: 2.8 },
        { x: hw - 26,  y: botY - 75,  r: 3.4 },
        { x: 15,       y: botY - 45,  r: 2.0 },
        { x: -12,      y: botY - 50,  r: 2.5 }
      ];
      drops.forEach(d => {
        ctx.beginPath();
        ctx.arc(cx + d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 5. Glass Lip Rim Highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 3.0;
    ctx.beginPath();
    ctx.moveTo(cx - hw + 8, topY);
    ctx.lineTo(cx + hw - 8, topY);
    ctx.stroke();

    ctx.restore();
  }

  renderTopGarnish(ctx, cx, topY, hw) {
    const p = this.progress;
    if (p < 0.72) return;

    ctx.save();
    // Render Crushed Pistachio Nut Pieces landing on foam
    this.pistachioPieces.forEach(piece => {
      if (p >= piece.spawnProgress) {
        ctx.save();
        ctx.translate(cx + piece.targetX, topY + 12 + piece.currentY);
        ctx.rotate(piece.rot);

        // 3D Nut piece: green core with roasted brown skin border
        ctx.fillStyle = piece.skinColor;
        ctx.beginPath();
        piece.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt[0] * 1.25, pt[1] * 1.25);
          else ctx.lineTo(pt[0] * 1.25, pt[1] * 1.25);
        });
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = piece.greenColor;
        ctx.beginPath();
        piece.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt[0], pt[1]);
          else ctx.lineTo(pt[0], pt[1]);
        });
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    });
    ctx.restore();
  }

  bindControls() {
    const playBtn = document.getElementById('btn-play-sequence');
    const scrubber = document.getElementById('frame-scrubber');

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        playBtn.textContent = this.isPlaying ? 'Pause Extraction' : 'Play Extraction';
        if (window.caffyoAudio) {
          window.caffyoAudio.playChime(659.25, 0.15);
        }
      });
    }

    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        this.isPlaying = false;
        if (playBtn) playBtn.textContent = 'Play Extraction';
        const val = parseInt(e.target.value, 10);
        this.currentFrame = val;
        this.progress = (val - 1) / (this.totalFrames - 1);
        this.syncUI();
      });
    }
  }

  syncUI() {
    const scrubber = document.getElementById('frame-scrubber');
    const counter = document.getElementById('frame-counter-label');
    if (scrubber) scrubber.value = this.currentFrame;
    if (counter) counter.textContent = `Phase ${this.currentFrame} / ${this.totalFrames}`;
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.caffyoCraft = new InteractiveCraftExperience();
});
