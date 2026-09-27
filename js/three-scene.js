/* ============================================================
   CAFFYO by Zauq - 3D WebGL Explosive Coffee Engine
   Featuring White Ceramic Cup, Bursting Roasted Beans,
   Touch-Interactive Mobile Drag, and Living Cup Layer Simulator
   ============================================================ */

class Caffyo3DExperience {
  constructor() {
    this.container = document.getElementById('webgl-canvas-container');
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // Interaction & Touch State
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isInteracting = false;
    this.previousPos = { x: 0, y: 0 };
    this.cameraTarget = new THREE.Vector3(0, 0.4, 0);
    this.cameraDefaultPos = new THREE.Vector3(0, 2.2, 5.2);
    this.currentViewMode = 'orbit';

    // 3D Objects
    this.cupGroup = null;
    this.liquidMesh = null;
    this.beans = [];
    this.steamParticles = null;
    this.sparkParticles = [];
    this.shockwaves = [];
    this.pointLight = null;

    // Sweet Cinematic Entry Animation
    this.entryProgress = 0;
    this.entryDuration = 1.6;
    this.hasCompletedEntry = false;

    // Fluid Slosh Physics & Interactive Surface Simulator
    this.fluid = {
      sloshX: 0,
      sloshZ: 0,
      velX: 0,
      velZ: 0,
      waveEnergy: 0,
      wavePhase: 0,
      angularVel: 0,
      lastSloshSoundTime: 0
    };
    this.rippleTime = 0;
    this.rippleStrength = 0;

    // Explosion state
    this.isExploding = false;
    this.explosionCooldown = 0;

    this.init();
    this.createLights();
    this.createCoffeeCup();
    this.createFloatingBeans();
    this.createSteamSystem();
    this.setupEventListeners();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x100b07, 0.08);

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('three-canvas'),
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.updateResponsiveLayout();
    this.camera.position.copy(this.cameraDefaultPos);
    this.camera.lookAt(this.cameraTarget);
  }

  /*
   * Fluid Aesthetic Responsive Layout:
   * Dynamically calculates scale, camera framing, and 3D position offset
   * so the coffee cup scales and shifts smoothly across all display sizes
   * (large monitors, standard laptops, tablets, mobile) with safe aesthetic margins.
   */
  updateResponsiveLayout() {
    if (!this.container || !this.camera || !this.renderer) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return;

    const aspect = width / height;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let scale = 0.92;
    let restX = 2.4;
    let restY = -0.28;
    let camX = 0.6;
    let camY = 2.2;
    let camZ = 5.0;
    let targetX = 0.6;
    let targetY = 0.40;

    if (width <= 480) {
      // Small Phones (e.g. 360-480px, iPhone SE) - fitted inside window with natural margins
      scale = 0.48;
      restX = 0;
      restY = 0.80;
      camX = 0;
      camY = 1.62;
      camZ = 5.3;
      targetX = 0;
      targetY = 0.42;
    } else if (width <= 768) {
      // Standard & Large Phones (481-768px)
      scale = 0.52;
      restX = 0;
      restY = 0.80;
      camX = 0;
      camY = 1.62;
      camZ = 5.3;
      targetX = 0;
      targetY = 0.42;
    } else if (width <= 1024) {
      // Tablets (769-1024px)
      scale = 0.65;
      restX = 1.35;
      restY = -0.15;
      camX = 0.35;
      camY = 2.1;
      camZ = 5.3;
      targetX = 0.35;
      targetY = 0.35;
    } else if (width <= 1280) {
      // Compact Laptops (1025-1280px)
      scale = 0.74;
      restX = 1.85;
      restY = -0.26;
      camX = 0.45;
      camY = 2.2;
      camZ = 5.2;
      targetX = 0.45;
      targetY = 0.40;
    } else if (width <= 1536) {
      // Standard Laptops & 1080p displays (e.g. 1366x768, 1440x900, 1536x776)
      // Shifted comfortably right for generous breathing room alongside hero typography
      scale = 0.84;
      restX = 2.25;
      restY = -0.28;
      camX = 0.55;
      camY = 2.2;
      camZ = 5.0;
      targetX = 0.55;
      targetY = 0.40;
    } else {
      // Large Desktop Monitors (1920x1080 and above)
      scale = 0.94;
      restX = 2.45;
      restY = -0.30;
      camX = 0.60;
      camY = 2.2;
      camZ = 4.8;
      targetX = 0.60;
      targetY = 0.40;
    }

    // Height-based compensation if viewport height is compact (desktop only)
    if (width > 768 && height < 750) {
      const heightRatio = Math.max(0.65, height / 760);
      scale *= heightRatio;
    }

    this.targetScale = scale;
    this.targetRestX = restX;
    this.targetRestY = restY;

    if (this.cupGroup && !this.hasInitializedScale) {
      this.cupGroup.scale.setScalar(scale);
      this.cupGroup.position.set(restX, restY, 0);
      this.hasInitializedScale = true;
    }

    this.cameraDefaultPos.set(camX, camY, camZ);
    this.cameraTarget.set(targetX, targetY, 0);

    // Responsive adaptation of floating bean trajectories on resize
    if (this.beans && this.beans.length > 0) {
      const isMobile = width <= 768;
      this.beans.forEach((bean, i) => {
        const isLowerBean = isMobile && (i % 2 === 1);
        bean.isLowerBean = isLowerBean;
        if (isMobile) {
          const cupY = 0.80;
          if (isLowerBean) {
            bean.homeX = (Math.sin(i * 3.7) * 0.5) * 2.8;
            bean.homeY = -1.5 + ((i % 8) / 8) * 1.8;
            bean.homeZ = -0.5 + Math.sin(i * 2.1) * 0.9;
          } else {
            bean.baseRadius = 1.05 + ((i % 6) / 6) * 1.25;
            bean.baseOffsetY = (Math.sin(i * 1.8) * 0.5) * 1.2;
          }
        } else {
          bean.isLowerBean = false;
          bean.baseRadius = 2.2 + ((i % 7) / 7) * 2.6;
          bean.baseOffsetY = (Math.sin(i * 1.8) * 0.5) * 1.8;
        }
      });
    }
  }

  createLights() {
    // Ambient light with warm undertones
    const ambientLight = new THREE.AmbientLight(0x3a2215, 2.2);
    this.scene.add(ambientLight);

    // Warm Key Light casting crisp highlights on porcelain and beans
    this.keyLight = new THREE.DirectionalLight(0xfff1e0, 2.2);
    this.keyLight.position.set(5, 9, 5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.keyLight.shadow.bias = -0.0005;
    this.keyLight.shadow.radius = 2.0;
    this.scene.add(this.keyLight);

    // Rich Amber Rim Light for atmospheric glow
    const rimLight = new THREE.DirectionalLight(0xe59866, 2.6);
    rimLight.position.set(-6, 4, -4);
    this.scene.add(rimLight);

    // Soft warm crema bounce fill (delicate, natural, zero artificial blowout)
    this.pointLight = new THREE.PointLight(0xffecd9, 0.35, 6);
    this.pointLight.position.set(2.1, 2.8, 1.0);
    this.scene.add(this.pointLight);
  }

  createCoffeeCup() {
    this.cupGroup = new THREE.Group();

    // Ultra-Refined Bone-China Porcelain Material
    const porcelainMat = new THREE.MeshPhysicalMaterial({
      color: 0xfcfaf7,
      roughness: 0.08,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.92,
      transmission: 0.04,
      thickness: 0.15
    });

    // Elegant gold accent rim
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xe59866,
      roughness: 0.22,
      metalness: 0.88
    });

    // 1. Saucer Base (Ultra smooth lathe with 96 segments)
    const saucerPoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.2, 0.01),
      new THREE.Vector2(1.85, 0.06),
      new THREE.Vector2(2.18, 0.22),
      new THREE.Vector2(2.22, 0.20),
      new THREE.Vector2(1.8, 0.06),
      new THREE.Vector2(0.9, 0.04),
      new THREE.Vector2(0, 0.04)
    ];
    const saucerGeo = new THREE.LatheGeometry(saucerPoints, 96);
    const saucer = new THREE.Mesh(saucerGeo, porcelainMat);
    saucer.receiveShadow = true;
    this.cupGroup.add(saucer);

    // Saucer Gold Rim
    const saucerRimGeo = new THREE.TorusGeometry(2.12, 0.02, 16, 96);
    saucerRimGeo.rotateX(Math.PI / 2);
    saucerRimGeo.translate(0, 0.19, 0);
    const saucerRim = new THREE.Mesh(saucerRimGeo, goldTrimMat);
    this.cupGroup.add(saucerRim);

    // 2. Cup Body (Artisanal curved latte cup with 96 segments)
    // Profile carefully calculated so wall has realistic ~0.10 thickness
    // and inner wall is completely smooth
    const cupPoints = [
      new THREE.Vector2(0.76, 0.02),
      new THREE.Vector2(0.82, 0.12),
      new THREE.Vector2(1.02, 0.35),
      new THREE.Vector2(1.24, 0.75),
      new THREE.Vector2(1.38, 1.15),
      new THREE.Vector2(1.44, 1.40),
      new THREE.Vector2(1.41, 1.45), // Soft rounded rim
      new THREE.Vector2(1.34, 1.42),
      new THREE.Vector2(1.28, 1.22), // Sits right at liquid level
      new THREE.Vector2(1.14, 0.75),
      new THREE.Vector2(0.92, 0.35),
      new THREE.Vector2(0.72, 0.20),
      new THREE.Vector2(0, 0.20)
    ];
    const cupGeo = new THREE.LatheGeometry(cupPoints, 96);
    const cup = new THREE.Mesh(cupGeo, porcelainMat);
    cup.castShadow = true;
    cup.receiveShadow = true;
    this.cupGroup.add(cup);

    // Cup Lip Gold Ring
    const cupLipGeo = new THREE.TorusGeometry(1.41, 0.018, 16, 96);
    cupLipGeo.rotateX(Math.PI / 2);
    cupLipGeo.translate(0, 1.43, 0);
    const cupLip = new THREE.Mesh(cupLipGeo, goldTrimMat);
    this.cupGroup.add(cupLip);

    // 3. Ergonomic Handle: STRICTLY EXTERIOR, zero penetration into cup interior!
    // Top anchor starts on outer wall at (1.41, 1.20, 0)
    // Outer apex arches outward to (2.05, 0.98, 0)
    // Bottom anchor attaches to outer wall at (1.15, 0.48, 0)
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.41, 1.20, 0),
      new THREE.Vector3(1.72, 1.28, 0),
      new THREE.Vector3(2.05, 0.98, 0),
      new THREE.Vector3(1.95, 0.68, 0),
      new THREE.Vector3(1.55, 0.46, 0),
      new THREE.Vector3(1.15, 0.48, 0)
    ]);
    const handleGeo = new THREE.TubeGeometry(handleCurve, 64, 0.076, 20, false);
    const handle = new THREE.Mesh(handleGeo, porcelainMat);
    handle.castShadow = true;
    handle.receiveShadow = true;
    this.cupGroup.add(handle);

    // 4. Realistic Liquid Coffee Surface
    // Inside cup at y = 1.205 (cup inner radius is ~1.278, matches 96 lathe segments)
    this.liquidGroup = new THREE.Group();
    this.liquidGroup.position.set(0, 1.205, 0);

    // Liquid surface disk with 96 radial segments matching cup lathe geometry perfectly
    const liquidGeo = new THREE.CircleGeometry(1.265, 96);
    liquidGeo.rotateX(-Math.PI / 2);

    const pos = liquidGeo.attributes.position;
    this.liquidOrigPos = new Float32Array(pos.array.length);
    this.liquidOrigPos.set(pos.array);

    // Authentic Barista Rosetta Latte Art Texture (from user reference)
    const textureLoader = new THREE.TextureLoader();
    const rosettaTexture = textureLoader.load('assets/images/latte_art_rosetta.png');
    rosettaTexture.generateMipmaps = true;
    rosettaTexture.minFilter = THREE.LinearMipmapLinearFilter;
    rosettaTexture.magFilter = THREE.LinearFilter;
    rosettaTexture.encoding = THREE.sRGBEncoding;
    // Center the art exactly on the circular disk surface
    rosettaTexture.center.set(0.5, 0.5);   // rotation pivot = UV center
    rosettaTexture.offset.set(0.0, 0.0);   // no offset — dead center
    rosettaTexture.repeat.set(1.0, 1.0);   // fill the full disk, no tiling
    rosettaTexture.rotation = 0;           // heart crown facing up (natural barista pour)
    if (this.renderer && this.renderer.capabilities && this.renderer.capabilities.getMaxAnisotropy) {
      rosettaTexture.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
    }

    // Microfoam depth normal / bump map for tactile realism
    const rosettaNormal = textureLoader.load('assets/images/latte_art_rosetta_normal.png');
    rosettaNormal.minFilter = THREE.LinearMipmapLinearFilter;

    // Photorealistic velvety microfoam physical material
    const liquidMat = new THREE.MeshPhysicalMaterial({
      map: rosettaTexture,
      bumpMap: rosettaTexture,
      bumpScale: 0.003,
      color: 0xffffff,
      roughness: 0.35,        // Soft microfoam scattering (not shiny plastic mirror)
      metalness: 0.0,
      clearcoat: 0.35,        // Subtle wet liquid sheen of freshly poured espresso
      clearcoatRoughness: 0.20,
      reflectivity: 0.70,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -1.0
    });

    this.liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    this.liquidGroup.add(this.liquidMesh);
    this.cupGroup.add(this.liquidGroup);

    // Position & Scale: Starts slightly lower and scaled down for sweet entry animation
    const isMobile = window.innerWidth <= 768;
    const initX = this.targetRestX !== undefined ? this.targetRestX : (isMobile ? 0 : 2.25);
    const initY = this.targetRestY !== undefined ? this.targetRestY : (isMobile ? 0.22 : -0.28);
    this.cupGroup.position.set(initX - (isMobile ? 0 : 0.6), initY - 2.0, -0.6);
    this.cupGroup.scale.setScalar(0.04);
    this.cupGroup.rotation.set(0.65, -0.90, 0.20);
    this.scene.add(this.cupGroup);
  }

  /* Procedural 3D Coffee Bean Geometry */
  createCoffeeBeanGeometry() {
    const geo = new THREE.SphereGeometry(0.24, 20, 16);
    geo.scale(0.8, 1.3, 0.55);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      if (z > 0 && Math.abs(x) < 0.1) {
        z -= 0.08 * (1.0 - Math.abs(y * 2));
      }
      x += (y * y) * 0.12;

      pos.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    return geo;
  }

  /* Saucer kept clean and pristine per user request (no beans on plate) */
  createSaucerBeans() {
    // Plate beans removed per user instruction
  }

  /* 32 Floating Artisanal Roasted Beans orbiting & drifting in 3D around the cup and behind text */
  createFloatingBeans() {
    const beanGeo = this.createCoffeeBeanGeometry();
    const roastColors = [0x261105, 0x3d1a08, 0x4e230b, 0x5c2b0e, 0x1f0e04];
    const beanCount = 32;
    const isMobile = window.innerWidth <= 768;

    for (let i = 0; i < beanCount; i++) {
      const color = roastColors[i % roastColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.38 + Math.random() * 0.15,
        metalness: 0.12,
        bumpScale: 0.04
      });

      const mesh = new THREE.Mesh(beanGeo, mat);
      const angle = (i / beanCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const isLowerBean = isMobile && (i % 2 === 1);

      let x, y, z, radius, yOffset;

      if (isMobile) {
        const cupX = 0;
        const cupY = 0.85;
        if (isLowerBean) {
          // Lower beans drifting directly BEHIND text
          x = (Math.random() - 0.5) * 3.2;
          y = -1.5 + Math.random() * 1.8; // Behind headline, desc & buttons
          z = -0.6 + Math.random() * 1.6;
          radius = Math.hypot(x, y - cupY);
          yOffset = y - cupY;
        } else {
          // Upper beans orbiting around the cup
          radius = 1.3 + Math.random() * 1.6;
          yOffset = (Math.random() - 0.5) * 1.4;
          y = cupY + yOffset;
          x = cupX + Math.cos(angle) * radius;
          z = (Math.random() - 0.4) * 2.2;
        }
      } else {
        // Desktop distribution
        const cupX = 2.4;
        const cupY = -0.28;
        radius = 2.2 + Math.random() * 2.6;
        yOffset = (Math.random() - 0.5) * 1.8;
        y = cupY + yOffset;
        x = cupX + Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      }

      const scale = 0.48 + Math.random() * 0.40;
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);

      this.beans.push({
        mesh: mesh,
        originalPos: new THREE.Vector3(x, y, z),
        homeX: x,
        homeY: y,
        homeZ: z,
        isLowerBean: isLowerBean,
        baseOffsetY: yOffset,
        baseRadius: radius,
        angle: angle,
        orbitSpeed: (0.14 + Math.random() * 0.20) * (i % 2 === 0 ? 1 : -1),
        bobFreq: 0.7 + Math.random() * 1.1,
        bobAmp: 0.08 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
        velocity: new THREE.Vector3(0, 0, 0),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 0.9
        )
      });
    }
  }

  createSteamSystem() {
    const count = 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    const isMobile = window.innerWidth <= 768;
    const cupX = isMobile ? 0 : 2.9;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = cupX + (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 1] = 1.35 + Math.random() * 2.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    grad.addColorStop(0.5, 'rgba(240, 230, 220, 0.12)');
    grad.addColorStop(1, 'rgba(240, 230, 220, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.35,
      map: texture,
      transparent: true,
      opacity: 0.12,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    this.steamParticles = new THREE.Points(geometry, material);
    this.scene.add(this.steamParticles);
  }

  /* Explosive Radial Detonation */
  explode(forceMultiplier = 1.0) {
    if (this.explosionCooldown > 0) return;
    this.explosionCooldown = 0.7;
    this.isExploding = true;

    if (window.caffyoAudio) {
      window.caffyoAudio.playExplosionSound();
    }

    const blastOrigin = new THREE.Vector3(
      this.cupGroup.position.x,
      this.cupGroup.position.y + 1.2,
      this.cupGroup.position.z
    );

    this.beans.forEach(bean => {
      const dir = new THREE.Vector3().subVectors(bean.mesh.position, blastOrigin).normalize();
      dir.x += (Math.random() - 0.5) * 0.8;
      dir.y += Math.random() * 0.9;
      dir.z += (Math.random() - 0.5) * 0.8;
      dir.normalize();

      const power = (14.0 + Math.random() * 20.0) * forceMultiplier;
      bean.velocity.copy(dir.multiplyScalar(power));

      bean.rotSpeed.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16
      );
    });

    // 3D Shockwave
    this.spawnShockwave(blastOrigin);

    // Glowing ember sparks
    this.spawnSparks(blastOrigin, 120);

    // Point Light Burst
    if (this.pointLight) {
      const origIntensity = this.pointLight.intensity;
      this.pointLight.intensity = 15;
      this.pointLight.color.setHex(0xffffff);

      setTimeout(() => {
        this.pointLight.intensity = origIntensity;
        this.pointLight.color.setHex(0xffa502);
      }, 250);
    }
  }

  spawnShockwave(origin) {
    const geo = new THREE.RingGeometry(0.1, 0.4, 32);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xe59866,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const shockwave = new THREE.Mesh(geo, mat);
    shockwave.position.copy(origin);
    this.scene.add(shockwave);

    this.shockwaves.push({
      mesh: shockwave,
      scale: 1,
      opacity: 0.9
    });
  }

  spawnSparks(origin, count = 100) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = origin.x;
      positions[i * 3 + 1] = origin.y;
      positions[i * 3 + 2] = origin.z;

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2,
        (Math.random() - 0.5) * 2
      ).normalize();

      velocities.push(dir.multiplyScalar(6 + Math.random() * 12));
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffa502,
      size: 0.18,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geo, mat);
    this.scene.add(points);

    this.sparkParticles.push({
      points: points,
      velocities: velocities,
      age: 0,
      maxAge: 1.2
    });
  }

  setViewMode(mode) {
    this.currentViewMode = mode;
    const isMobile = window.innerWidth <= 768;

    switch (mode) {
      case 'orbit':
        this.cameraDefaultPos.set(isMobile ? 0 : 1.45, isMobile ? 2.5 : 2.2, isMobile ? 6.2 : 5.5);
        this.cameraTarget.set(isMobile ? 0 : 1.45, 0.38, 0);
        break;
      case 'explode':
        this.cameraDefaultPos.set(isMobile ? 0 : 1.95, 3.5, 6.8);
        this.cameraTarget.set(isMobile ? 0 : 1.95, 0.8, 0);
        this.explode(1.3);
        break;
      case 'crema':
        this.cameraDefaultPos.set(isMobile ? 0 : 2.9, 2.4, 1.8);
        this.cameraTarget.set(isMobile ? 0 : 2.9, 1.2, 0);
        break;
      case 'roast':
        this.cameraDefaultPos.set(isMobile ? 0 : 0.5, 1.8, 4.2);
        this.cameraTarget.set(isMobile ? 0 : 2.9, 0.5, 0);
        break;
    }
  }

  triggerLiquidRipple() {
    this.rippleTime = 0;
    this.rippleStrength = 1.0;
    if (window.caffyoAudio && window.caffyoAudio.playCupStir) {
      window.caffyoAudio.playCupStir();
    }
  }

  setupEventListeners() {
    // Window Resize - recalibrate camera, scale and responsive margins dynamically
    window.addEventListener('resize', () => {
      this.updateResponsiveLayout();
    });

    // Mouse Movement & Drag Momentum
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (this.isInteracting && this.cupGroup) {
        const deltaX = e.clientX - this.previousPos.x;
        const deltaY = e.clientY - this.previousPos.y;
        this.cupGroup.rotation.y += deltaX * 0.009;
        this.cupGroup.rotation.x = Math.max(-0.55, Math.min(0.55, this.cupGroup.rotation.x + deltaY * 0.009));

        // Inject direct physical kinetic force into the fluid!
        const forceMult = 0.038;
        this.fluid.velX -= deltaX * forceMult;
        this.fluid.velZ -= deltaY * forceMult;
        const dragDist = Math.hypot(deltaX, deltaY);
        this.fluid.waveEnergy = Math.min(2.5, this.fluid.waveEnergy + dragDist * 0.05);
        this.fluid.angularVel += deltaX * 0.012;

        const now = performance.now();
        if (dragDist > 10 && now - this.fluid.lastSloshSoundTime > 300) {
          this.fluid.lastSloshSoundTime = now;
          if (window.caffyoAudio && window.caffyoAudio.playLiquidSlosh) {
            window.caffyoAudio.playLiquidSlosh(Math.min(1.0, dragDist / 26));
          }
        }

        this.previousPos = { x: e.clientX, y: e.clientY };
      }
    });

    const canvas = document.getElementById('three-canvas');
    if (canvas) {
      // Desktop mouse drag for intuitive 3D inspection
      canvas.addEventListener('mousedown', (e) => {
        this.isInteracting = true;
        this.previousPos = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mouseup', () => {
        this.isInteracting = false;
      });
      canvas.addEventListener('mouseleave', () => {
        this.isInteracting = false;
      });
      canvas.addEventListener('click', () => {
        this.triggerLiquidRipple();
      });

      // Mobile Touch Gestures: Touch drag to orbit & slosh fluid
      canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isInteracting = true;
          this.previousPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: true });

      canvas.addEventListener('touchmove', (e) => {
        if (this.isInteracting && e.touches.length === 1 && this.cupGroup) {
          const touch = e.touches[0];
          const deltaX = touch.clientX - this.previousPos.x;
          const deltaY = touch.clientY - this.previousPos.y;
          this.cupGroup.rotation.y += deltaX * 0.012;
          this.cupGroup.rotation.x = Math.max(-0.45, Math.min(0.65, this.cupGroup.rotation.x + deltaY * 0.012));

          // Physical fluid slosh force on touch drag
          const forceMult = 0.046;
          this.fluid.velX -= deltaX * forceMult;
          this.fluid.velZ -= deltaY * forceMult;
          const dragDist = Math.hypot(deltaX, deltaY);
          this.fluid.waveEnergy = Math.min(2.5, this.fluid.waveEnergy + dragDist * 0.06);
          this.fluid.angularVel += deltaX * 0.015;

          const now = performance.now();
          if (dragDist > 12 && now - this.fluid.lastSloshSoundTime > 300) {
            this.fluid.lastSloshSoundTime = now;
            if (window.caffyoAudio && window.caffyoAudio.playLiquidSlosh) {
              window.caffyoAudio.playLiquidSlosh(Math.min(1.0, dragDist / 22));
            }
          }

          this.previousPos = { x: touch.clientX, y: touch.clientY };
        }
      }, { passive: true });

      canvas.addEventListener('touchend', () => {
        this.isInteracting = false;
      }, { passive: true });
      canvas.addEventListener('touchcancel', () => {
        this.isInteracting = false;
      }, { passive: true });
      window.addEventListener('touchend', () => {
        this.isInteracting = false;
      }, { passive: true });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    // Smooth Mouse Lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    const isMobile = window.innerWidth <= 768;

    if (!this.isInteracting) {
      this.camera.position.x = this.cameraDefaultPos.x + this.mouse.x * 0.35;
      this.camera.position.y = this.cameraDefaultPos.y + this.mouse.y * 0.25;
      this.camera.position.z = this.cameraDefaultPos.z;
      this.camera.lookAt(this.cameraTarget);

      // Aesthetic resting position & orientation auto-return
      // When user releases finger or cursor, smoothly spring back to the perfect showcase angle
      if (this.cupGroup) {
        const isMobile = window.innerWidth <= 768;
        const targetX = this.targetRestX !== undefined ? this.targetRestX : (isMobile ? 0 : 2.25);
        const targetY = (this.targetRestY !== undefined ? this.targetRestY : (isMobile ? 0.16 : -0.28)) + Math.sin(elapsedTime * 0.8) * 0.02;
        const restZ = 0;
        const targetScale = this.targetScale !== undefined ? this.targetScale : (isMobile ? 0.52 : 0.86);

        // Ideal aesthetic presentation angle:
        const restRotX = 0.28;
        const restRotY = 0.30 + Math.sin(elapsedTime * 0.3) * 0.05;
        const restRotZ = 0;

        if (!this.hasCompletedEntry) {
          this.entryProgress += dt / this.entryDuration;
          if (this.entryProgress >= 1.0) {
            this.entryProgress = 1.0;
            this.hasCompletedEntry = true;
            this.fluid.waveEnergy = 0.65; // subtle welcoming ripple upon arrival
          }

          const t = this.entryProgress;
          // Smooth quartic ease-out
          const ease = 1 - Math.pow(1 - t, 4);
          const scaleEase = 1 - Math.pow(1 - t, 3.2);

          const startX = targetX - (isMobile ? 0 : 0.6);
          const startY = targetY - 2.0;

          this.cupGroup.position.x = THREE.MathUtils.lerp(startX, targetX, ease);
          this.cupGroup.position.y = THREE.MathUtils.lerp(startY, targetY, ease) + Math.sin(t * Math.PI) * 0.08;
          this.cupGroup.position.z = THREE.MathUtils.lerp(-0.6, restZ, ease);

          this.cupGroup.scale.setScalar(THREE.MathUtils.lerp(0.04, targetScale, scaleEase));

          this.cupGroup.rotation.x = THREE.MathUtils.lerp(0.65, restRotX, ease);
          this.cupGroup.rotation.y = THREE.MathUtils.lerp(-0.90, restRotY, ease);
          this.cupGroup.rotation.z = THREE.MathUtils.lerp(0.20, restRotZ, ease);
        } else {
          const returnSpeed = 0.055; // Silky smooth damped spring back
          this.cupGroup.position.x += (targetX - this.cupGroup.position.x) * returnSpeed;
          this.cupGroup.position.y += (targetY - this.cupGroup.position.y) * returnSpeed;
          this.cupGroup.position.z += (restZ - this.cupGroup.position.z) * returnSpeed;

          // Smooth responsive scale transition
          if (this.targetScale !== undefined) {
            const curScale = this.cupGroup.scale.x;
            const nextScale = curScale + (this.targetScale - curScale) * returnSpeed;
            this.cupGroup.scale.setScalar(nextScale);
          }

          this.cupGroup.rotation.x += (restRotX - this.cupGroup.rotation.x) * returnSpeed;
          this.cupGroup.rotation.y += (restRotY - this.cupGroup.rotation.y) * returnSpeed;
          this.cupGroup.rotation.z += (restRotZ - this.cupGroup.rotation.z) * returnSpeed;
        }
      }
    }

    // ============================================================
    // Real-Time Fluid Dynamics Simulator (Damped 2D Harmonic Oscillator)
    // ============================================================
    const spring = 26.0;   // Restoring buoyancy force
    const damping = 4.2;  // Viscous fluid resistance

    const accelX = -spring * this.fluid.sloshX - damping * this.fluid.velX;
    const accelZ = -spring * this.fluid.sloshZ - damping * this.fluid.velZ;

    this.fluid.velX += accelX * dt;
    this.fluid.velZ += accelZ * dt;
    this.fluid.sloshX += this.fluid.velX * dt;
    this.fluid.sloshZ += this.fluid.velZ * dt;

    // Harmonic wave decay & phase advancement
    this.fluid.waveEnergy *= Math.exp(-2.5 * dt);
    this.fluid.wavePhase += (8.0 + this.fluid.waveEnergy * 6.0) * dt;
    this.fluid.angularVel *= Math.exp(-2.0 * dt);

    // Realistic physical boundary constraint to keep fluid inside porcelain rim
    const sloshMag = Math.hypot(this.fluid.sloshX, this.fluid.sloshZ);
    const maxTilt = 0.085; // radians (~4.9 degrees - stays perfectly within porcelain wall)
    if (sloshMag > maxTilt) {
      const scale = maxTilt / sloshMag;
      this.fluid.sloshX *= scale;
      this.fluid.sloshZ *= scale;
      this.fluid.velX *= 0.5;
      this.fluid.velZ *= 0.5;
    }

    // 1. Rigid Continuous Fluid Plane Tilt (100% Smooth, Zero Tearing, Zero Jagged Polygons)
    if (this.liquidGroup) {
      this.liquidGroup.rotation.z = -this.fluid.sloshX;
      this.liquidGroup.rotation.x = this.fluid.sloshZ;
    }

    // 2. Continuous Organic Surface Capillary Ripples (Zero-Derivative Center & Boundary)
    if (this.liquidMesh && this.liquidOrigPos) {
      const pos = this.liquidMesh.geometry.attributes.position;
      const count = pos.count;
      const R = 1.245;

      for (let i = 0; i < count; i++) {
        const ox = this.liquidOrigPos[i * 3 + 0];
        const oy = this.liquidOrigPos[i * 3 + 1];
        const r = Math.hypot(ox, oy);

        if (r <= R) {
          // Quadratic hermite falloff: exactly 0 at rim with zero slope (NO EDGE TEARING)
          const w = Math.pow(Math.max(0, 1.0 - (r * r) / (R * R)), 2);
          // Cosine wave: smooth rounded peak at center (NO CONE SPIKE)
          const ripple = Math.cos(r * 9.0 - this.fluid.wavePhase) * (this.fluid.waveEnergy * 0.016) * w;
          const ambient = Math.cos(r * 4.5 - elapsedTime * 2.0) * 0.0015 * w;
          pos.setZ(i, this.liquidOrigPos[i * 3 + 2] + ripple + ambient);
        }
      }
      pos.needsUpdate = true;
      this.liquidMesh.geometry.computeVertexNormals();

      // Responsive physical micro-inertia for latte art (anchored & centered)
      if (this.liquidMesh.material && this.liquidMesh.material.map) {
        // Always keep center + offset pinned so art stays dead-center on the disk
        this.liquidMesh.material.map.center.set(0.5, 0.5);
        this.liquidMesh.material.map.offset.set(0.0, 0.0);
        this.liquidMesh.material.map.rotation = THREE.MathUtils.lerp(
          this.liquidMesh.material.map.rotation || 0,
          this.fluid.angularVel * 0.06,
          0.12
        );
      }
    }

    // 3. Floating Coffee Beans Orbit & Explosion Physics (Restored Floating Beans)
    if (this.beans && this.beans.length > 0) {
      this.beans.forEach(bean => {
        if (bean.velocity.lengthSq() > 0.001) {
          bean.mesh.position.addScaledVector(bean.velocity, dt);
          bean.velocity.multiplyScalar(Math.exp(-2.2 * dt));
          const toHome = new THREE.Vector3().subVectors(bean.originalPos, bean.mesh.position);
          bean.velocity.addScaledVector(toHome, 4.0 * dt);
        } else {
          const cupX = this.cupGroup ? this.cupGroup.position.x : 0;
          const cupY = this.cupGroup ? this.cupGroup.position.y : 0;
          const isMobile = window.innerWidth <= 768;
          let targetX, targetY, targetZ;

          if (isMobile && bean.isLowerBean) {
            // Lower beans float and drift smoothly directly BEHIND text
            targetX = bean.homeX + Math.sin(elapsedTime * bean.bobFreq * 0.6 + bean.phase) * 0.35;
            targetY = bean.homeY + Math.cos(elapsedTime * bean.bobFreq * 0.7 + bean.phase) * 0.18;
            targetZ = bean.homeZ + Math.sin(elapsedTime * 0.5 + bean.phase) * 0.22;
          } else {
            // Upper beans orbiting around the cup
            bean.angle += bean.orbitSpeed * dt * 0.35;
            targetX = cupX + Math.cos(bean.angle) * bean.baseRadius;
            targetZ = Math.sin(bean.angle) * bean.baseRadius;
            targetY = cupY + (bean.baseOffsetY !== undefined ? bean.baseOffsetY : 0) + Math.sin(elapsedTime * bean.bobFreq + bean.phase) * bean.bobAmp;
          }

          bean.originalPos.x = targetX;
          bean.originalPos.y = targetY;
          bean.originalPos.z = targetZ;
          bean.mesh.position.x += (targetX - bean.mesh.position.x) * 0.06;
          bean.mesh.position.y += (targetY - bean.mesh.position.y) * 0.06;
          bean.mesh.position.z += (targetZ - bean.mesh.position.z) * 0.06;
        }

        bean.mesh.rotation.x += bean.rotSpeed.x * dt;
        bean.mesh.rotation.y += bean.rotSpeed.y * dt;
        bean.mesh.rotation.z += bean.rotSpeed.z * dt;
      });
    }

    // Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.scale += delta * 12.0;
      sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
      sw.opacity -= delta * 1.5;
      sw.mesh.material.opacity = Math.max(0, sw.opacity);

      if (sw.opacity <= 0) {
        this.scene.remove(sw.mesh);
        this.shockwaves.splice(i, 1);
      }
    }

    // Spark Particles
    for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
      const sp = this.sparkParticles[i];
      sp.age += delta;

      const positions = sp.points.geometry.attributes.position.array;
      const count = sp.velocities.length;

      for (let j = 0; j < count; j++) {
        positions[j * 3 + 0] += sp.velocities[j].x * delta;
        positions[j * 3 + 1] += sp.velocities[j].y * delta;
        positions[j * 3 + 2] += sp.velocities[j].z * delta;
        sp.velocities[j].y -= 9.8 * delta * 0.35;
      }
      sp.points.geometry.attributes.position.needsUpdate = true;
      sp.points.material.opacity = Math.max(0, 1 - sp.age / sp.maxAge);

      if (sp.age >= sp.maxAge) {
        this.scene.remove(sp.points);
        this.sparkParticles.splice(i, 1);
      }
    }

    // Realistic Rising Steam
    if (this.steamParticles) {
      const positions = this.steamParticles.geometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += 0.009;
        positions[i * 3 + 0] += Math.sin(elapsedTime * 1.5 + i) * 0.0018;

        if (positions[i * 3 + 1] > 3.6) {
          positions[i * 3 + 0] = this.cupGroup.position.x + (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 1] = 1.35 + Math.random() * 0.3;
          positions[i * 3 + 2] = this.cupGroup.position.z + (Math.random() - 0.5) * 0.5;
        }
      }
      this.steamParticles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ------------------------------------------------------------------
// Secondary 3D Brew Lab / Living Cup Simulator (Inspired by Reel)
// ------------------------------------------------------------------
class BrewLabSimulator {
  constructor() {
    this.canvas = document.getElementById('brew-lab-canvas');
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.roast = 'signature';
    this.extraction = 'double';
    this.milk = 'oat';
    this.flavor = 'caramel';

    this.liquidMesh = null;
    this.foamMesh = null;
    this.flavorRings = [];

    this.init();
    this.createLabCup();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    this.camera.position.set(0, 1.2, 3.8);
    this.camera.lookAt(0, 0.4, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xfff1e0, 2.0);
    dirLight.position.set(3, 5, 3);
    this.scene.add(dirLight);

    const point = new THREE.PointLight(0xe59866, 2.0, 5);
    point.position.set(0, 1.5, 0);
    this.scene.add(point);
  }

  createLabCup() {
    this.group = new THREE.Group();

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.2
    });

    const glassGeo = new THREE.CylinderGeometry(0.75, 0.6, 1.8, 32, 1, true);
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.y = 0.9;
    this.group.add(glass);

    const baseGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 32);
    const base = new THREE.Mesh(baseGeo, glassMat);
    base.position.y = 0.05;
    this.group.add(base);

    // Inner Liquid
    const liquidGeo = new THREE.CylinderGeometry(0.7, 0.56, 1.4, 32);
    this.liquidMat = new THREE.MeshStandardMaterial({
      color: 0x4a2612,
      roughness: 0.2
    });
    this.liquidMesh = new THREE.Mesh(liquidGeo, this.liquidMat);
    this.liquidMesh.position.y = 0.8;
    this.group.add(this.liquidMesh);

    // Microfoam Top Layer
    const foamGeo = new THREE.CylinderGeometry(0.72, 0.7, 0.25, 32);
    this.foamMat = new THREE.MeshStandardMaterial({
      color: 0xfef7ed,
      roughness: 0.8
    });
    this.foamMesh = new THREE.Mesh(foamGeo, this.foamMat);
    this.foamMesh.position.y = 1.55;
    this.group.add(this.foamMesh);

    // Flavor Halo
    const ringGeo = new THREE.TorusGeometry(1.0, 0.02, 16, 64);
    this.flavorMat = new THREE.MeshBasicMaterial({
      color: 0xe59866,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ringGeo, this.flavorMat);
    ring1.rotation.x = Math.PI / 2.2;
    ring1.position.y = 1.2;
    this.group.add(ring1);
    this.flavorRings.push(ring1);

    this.scene.add(this.group);
  }

  updateConfig(roast, extraction, milk, flavor) {
    this.roast = roast;
    this.extraction = extraction;
    this.milk = milk;
    this.flavor = flavor;

    if (window.caffyoAudio) {
      window.caffyoAudio.playSteamWand();
    }

    let coffeeColor = 0x4a2612;
    if (roast === 'blonde') coffeeColor = 0x8b5a2b;
    if (roast === 'signature') coffeeColor = 0x3d1d0e;
    if (roast === 'dark') coffeeColor = 0x1a0d06;
    this.liquidMat.color.setHex(coffeeColor);

    if (milk === 'none') {
      this.foamMesh.visible = false;
      this.liquidMesh.scale.y = 0.9;
    } else {
      this.foamMesh.visible = true;
      let foamColor = 0xfef7ed;
      if (milk === 'oat') foamColor = 0xf0dfc8;
      if (milk === 'almond') foamColor = 0xebe3d5;
      this.foamMat.color.setHex(foamColor);
      this.liquidMesh.scale.y = 1.0;
    }

    let flavorCol = 0xe59866;
    if (flavor === 'hazelnut') flavorCol = 0xc06c3a;
    if (flavor === 'vanilla') flavorCol = 0xffeaa7;
    if (flavor === 'caramel') flavorCol = 0xf39c12;
    this.flavorMat.color.setHex(flavorCol);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.group) {
      this.group.rotation.y += 0.008;
    }
    this.flavorRings.forEach(r => {
      r.rotation.z += 0.02;
    });
    this.renderer.render(this.scene, this.camera);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.caffyo3D = new Caffyo3DExperience();
  window.brewLab = new BrewLabSimulator();
});
