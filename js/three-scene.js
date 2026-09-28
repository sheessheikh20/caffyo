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
    this.saucerGroup = null;
    this.cupBodyGroup = null;
    this.liquidGroup = null;
    this.liquidMesh = null;
    this.latteArtMesh = null;
    this.espressoMesh = null;
    this.pourStreamGroup = null;
    this.pourStreamMesh = null;
    this.pourDroplets = [];
    this.beans = [];
    this.steamParticles = null;
    this.sparkParticles = [];
    this.shockwaves = [];
    this.pointLight = null;

    // Cinematic Barista Animation Sequence:
    // Stage 1: Saucer drops & settles on table
    // Stage 2: Cup body drops & clinks onto saucer
    // Stage 3: Rich brown coffee (espresso) pours & fills base of cup
    // Stage 4: Silky white steamed milk pours into espresso, organically forming the latte art design!
    // Stage 5: Settle & warm steam rises
    this.entryProgress = 0;
    this.entryDuration = 5.8;      // Relaxed, natural, authentic barista sequence length in seconds
    this.hasCompletedEntry = false;
    this.entryStarted = false;     // Frozen until triggerCupEntry() is called
    this.hasPlayedCupLand = false;
    this.hasPlayedPourStart = false;
    this.hasPlayedMilkStart = false;
    this.hasPlayedLatteBloom = false;
    this.hasCutoffJiggled = false;
    this.hasCutoffJiggledCoffee = false;

    // Fluid Slosh Physics & Interactive Surface Simulator
    this.fluid = {
      sloshX: 0,
      sloshZ: 0,
      velX: 0,
      velZ: 0,
      jiggleY: 0,
      jiggleVelY: 0,
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
      const vFOV = (this.camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOV / 2) * this.cameraDefaultPos.z;
      const visibleWidth = visibleHeight * aspect;
      const halfW = visibleWidth / 2;

      this.beans.forEach((bean, i) => {
        const isLowerBean = isMobile && (i % 2 === 1);
        bean.isLowerBean = isLowerBean;
        if (isMobile) {
          const cupY = 0.80;
          if (isLowerBean) {
            // Symmetrically cover both left window edge AND right window edge
            const sidePattern = i % 4;
            if (sidePattern === 1) {
              // Left window boundary
              bean.homeX = -halfW * (0.82 + ((i % 3) / 3) * 0.14);
            } else if (sidePattern === 3) {
              // Right window boundary - reaches right window edge!
              bean.homeX = halfW * (0.82 + ((i % 3) / 3) * 0.14);
            } else {
              // Centered drift across text
              bean.homeX = (Math.sin(i * 3.7) * 0.45) * halfW;
            }
            bean.homeY = -1.6 + ((i % 8) / 8) * 2.0;
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
    saucer.castShadow = true;
    saucer.receiveShadow = true;
    this.saucerGroup = new THREE.Group();
    this.cupGroup.add(this.saucerGroup);
    this.saucerGroup.add(saucer);

    // Saucer Gold Rim
    const saucerRimGeo = new THREE.TorusGeometry(2.12, 0.02, 16, 96);
    saucerRimGeo.rotateX(Math.PI / 2);
    saucerRimGeo.translate(0, 0.19, 0);
    const saucerRim = new THREE.Mesh(saucerRimGeo, goldTrimMat);
    this.saucerGroup.add(saucerRim);

    // 2. Cup Body Group (Artisanal curved latte cup with 96 segments)
    this.cupBodyGroup = new THREE.Group();
    this.cupGroup.add(this.cupBodyGroup);

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
    this.cupBodyGroup.add(cup);

    // Cup Lip Gold Ring
    const cupLipGeo = new THREE.TorusGeometry(1.41, 0.018, 16, 96);
    cupLipGeo.rotateX(Math.PI / 2);
    cupLipGeo.translate(0, 1.43, 0);
    const cupLip = new THREE.Mesh(cupLipGeo, goldTrimMat);
    this.cupBodyGroup.add(cupLip);

    // 3. Ergonomic Handle: STRICTLY EXTERIOR, zero penetration into cup interior!
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
    this.cupBodyGroup.add(handle);

    // 4. Realistic Liquid Coffee Surface
    // Inside cup: starts with rich dark coffee already present at y = 0.82 (~60% cup fill)
    this.liquidGroup = new THREE.Group();
    this.liquidGroup.position.set(0, 0.82, 0);
    this.liquidGroup.scale.set(0.85, 1.0, 0.85);

    // Liquid surface disk with 64 radial sectors and 28 concentric rings for silky-smooth wave physics
    const liquidGeo = this.createPolarDiskGeometry(1.265, 64, 28);

    const pos = liquidGeo.attributes.position;
    this.liquidOrigPos = new Float32Array(pos.array.length);
    this.liquidOrigPos.set(pos.array);

    // Authentic Barista Heart Latte Art Texture (photorealistic from user reference)
    const textureLoader = new THREE.TextureLoader();
    const heartTexture = textureLoader.load('assets/images/latte_art_heart.png');
    heartTexture.generateMipmaps = true;
    heartTexture.minFilter = THREE.LinearMipmapLinearFilter;
    heartTexture.magFilter = THREE.LinearFilter;
    heartTexture.encoding = THREE.sRGBEncoding;
    // Center the art exactly on the circular disk surface
    heartTexture.center.set(0.5, 0.5);   // rotation pivot = UV center
    heartTexture.offset.set(0.0, 0.0);   // no offset — dead center
    heartTexture.repeat.set(1.0, 1.0);   // fill the full disk, no tiling
    heartTexture.rotation = 0;           // Heart cleft faces top/back of cup
    if (this.renderer && this.renderer.capabilities && this.renderer.capabilities.getMaxAnisotropy) {
      heartTexture.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
    }

    const normalTexture = textureLoader.load('assets/images/latte_art_heart_normal.png');
    normalTexture.generateMipmaps = true;
    normalTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Photorealistic velvety microfoam physical material
    // A. Base Dark Espresso Liquid Surface (pre-existing inside cup)
    const espressoMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f0e05,        // Deep dark roasted espresso coffee
      roughness: 0.10,
      metalness: 0.02,
      clearcoat: 0.95,
      clearcoatRoughness: 0.04,
      reflectivity: 0.90,
      side: THREE.DoubleSide
    });
    this.espressoMesh = new THREE.Mesh(liquidGeo, espressoMat);
    this.espressoMesh.position.set(0, 0, 0);
    this.espressoMesh.renderOrder = 1;
    this.espressoMesh.frustumCulled = false;
    this.liquidGroup.add(this.espressoMesh);

    // Latte art custom shader uniforms for organic outward milk expansion
    this.latteUniforms = {
      uBloomRadius: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 }
    };

    // B. Blooming Heart Latte Art Surface (layered directly on top, blooms from poured milk)
    const latteArtMat = new THREE.MeshPhysicalMaterial({
      map: heartTexture,
      bumpMap: heartTexture,
      bumpScale: 0.003,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.18, 0.18),
      color: 0xffffff,
      roughness: 0.30,        // Soft microfoam scattering
      metalness: 0.0,
      clearcoat: 0.45,        // Creamy liquid sheen
      clearcoatRoughness: 0.10,
      reflectivity: 0.75,
      transparent: true,
      opacity: 1.0,           // Constant full opacity; expansion is handled by dynamic surface bloom!
      depthWrite: false,
      side: THREE.DoubleSide
    });

    const latteUniformsRef = this.latteUniforms;
    latteArtMat.onBeforeCompile = (shader) => {
      shader.uniforms.uBloomRadius = latteUniformsRef.uBloomRadius;
      shader.uniforms.uCenter = latteUniformsRef.uCenter;
      shader.uniforms.uTime = latteUniformsRef.uTime;

      shader.fragmentShader = `
        uniform float uBloomRadius;
        uniform vec2 uCenter;
        uniform float uTime;
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>

        // Barista Milk Foam Radial Spreading: starts from 1 dot at impact point and expands organically
        float dist = length(vUv - uCenter);
        float angle = atan(vUv.y - uCenter.y, vUv.x - uCenter.x);
        // Organic fluid ripples along expanding perimeter
        float ripple = sin(angle * 7.0 + uTime * 3.5) * 0.012 + cos(angle * 13.0 - uTime * 2.2) * 0.008;
        float effDist = dist + ripple;

        if (uBloomRadius <= 0.002) {
          gl_FragColor.a = 0.0;
        } else if (effDist > uBloomRadius) {
          gl_FragColor.a = 0.0;
        } else {
          // Soft fluid feathering at the expanding boundary
          float feather = smoothstep(uBloomRadius, max(0.001, uBloomRadius - 0.035), effDist);
          
          // Steamed milk leading froth edge (bright white microfoam ripple at perimeter)
          float edgeFroth = smoothstep(max(0.0, uBloomRadius - 0.045), max(0.001, uBloomRadius - 0.012), effDist) * 
                            (1.0 - smoothstep(max(0.001, uBloomRadius - 0.012), uBloomRadius, effDist));
          gl_FragColor.rgb += vec3(edgeFroth * 0.28);
          
          // During early dot/bulb expansion stage, blend pure silky white steamed milk
          float dotPhase = clamp(1.0 - uBloomRadius / 0.20, 0.0, 1.0);
          if (dotPhase > 0.0) {
            gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.98, 0.97, 0.94), dotPhase * 0.70);
          }
          
          gl_FragColor.a *= feather;
        }
        `
      );
    };

    this.latteArtMesh = new THREE.Mesh(liquidGeo, latteArtMat);
    this.latteArtMesh.position.set(0, 0.003, 0);
    this.latteArtMesh.renderOrder = 2;
    this.latteArtMesh.frustumCulled = false;
    this.latteArtMesh.visible = false;
    this.liquidMesh = this.latteArtMesh; // ripple engine targets this shared geometry
    this.liquidGroup.add(this.latteArtMesh);

    // Steamed milk touchdown microfoam pool disk (physical white foam dot at pour center)
    const foamSpotGeo = new THREE.CircleGeometry(0.12, 32);
    foamSpotGeo.rotateX(-Math.PI / 2);
    const foamSpotMat = new THREE.MeshBasicMaterial({
      color: 0xfffef8,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
    this.pourFoamSpot = new THREE.Mesh(foamSpotGeo, foamSpotMat);
    this.pourFoamSpot.position.set(0, 0.005, 0);
    this.pourFoamSpot.renderOrder = 3;
    this.pourFoamSpot.visible = false;
    this.liquidGroup.add(this.pourFoamSpot);

    this.cupBodyGroup.add(this.liquidGroup);

    // 5. Authentic Barista Steamed Milk Pouring Stream System
    this.pourStreamGroup = new THREE.Group();
    const streamGeo = this.createLaminarStreamGeometry(96, 64);
    const streamMat = new THREE.MeshStandardMaterial({
      color: 0xfffef9,         // Pure creamy white steamed microfoam milk
      roughness: 0.20,         // Soft velvety microfoam
      metalness: 0.01,
      side: THREE.DoubleSide
    });
    this.pourStreamMesh = new THREE.Mesh(streamGeo, streamMat);
    this.pourStreamMesh.frustumCulled = false;
    this.pourStreamGroup.add(this.pourStreamMesh);
    this.pourStreamGroup.visible = false;
    this.cupGroup.add(this.pourStreamGroup);

    this.pourDroplets = [];

    // Overall cupGroup positioned at resting layout
    const isMobile = window.innerWidth <= 768;
    const initX = this.targetRestX !== undefined ? this.targetRestX : (isMobile ? 0 : 2.25);
    const initY = this.targetRestY !== undefined ? this.targetRestY : (isMobile ? 0.80 : -0.28);
    const initScale = this.targetScale !== undefined ? this.targetScale : (isMobile ? 0.52 : 0.86);

    this.cupGroup.position.set(initX, initY, 0);
    this.cupGroup.scale.setScalar(initScale);
    this.cupGroup.rotation.set(0.28, 0.30, 0);

    // Subgroups parked gently above until triggerCupEntry()
    this.saucerGroup.position.set(0, 4.5, 0);
    this.saucerGroup.scale.setScalar(0.70);

    this.cupBodyGroup.position.set(0, 5.0, 0);
    this.cupBodyGroup.scale.setScalar(0.70);

    // Coffee is ALREADY present inside the cup!
    this.liquidGroup.position.set(0, 0.82, 0);
    this.liquidGroup.scale.set(0.85, 1.0, 0.85);

    this.scene.add(this.cupGroup);
  }

  /* Concentric Polar Disk Geometry for Silky-Smooth Organic Liquid Capillary Ripples */
  createPolarDiskGeometry(radius, thetaSegments = 64, ringSegments = 28) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const uvs = [];
    const indices = [];

    // Center vertex at (0, 0, 0)
    positions.push(0, 0, 0);
    uvs.push(0.5, 0.5);

    // Concentric rings in X-Z horizontal plane
    for (let r = 1; r <= ringSegments; r++) {
      const ringRadius = (r / ringSegments) * radius;
      for (let s = 0; s < thetaSegments; s++) {
        const theta = (s / thetaSegments) * Math.PI * 2;
        const x = Math.cos(theta) * ringRadius;
        const z = Math.sin(theta) * ringRadius;
        positions.push(x, 0, z);
        uvs.push(0.5 + (x / (2 * radius)), 0.5 - (z / (2 * radius)));
      }
    }

    // Center fan triangles (wound so normal points upward +Y)
    for (let s = 0; s < thetaSegments; s++) {
      const nextS = (s + 1) % thetaSegments;
      indices.push(0, 1 + nextS, 1 + s);
    }

    // Quad strips between concentric rings (wound so normal points upward +Y)
    for (let r = 1; r < ringSegments; r++) {
      const curRing = 1 + (r - 1) * thetaSegments;
      const nextRing = 1 + r * thetaSegments;
      for (let s = 0; s < thetaSegments; s++) {
        const nextS = (s + 1) % thetaSegments;
        const v0 = curRing + s;
        const v1 = curRing + nextS;
        const v2 = nextRing + s;
        const v3 = nextRing + nextS;

        indices.push(v0, v3, v2);
        indices.push(v0, v1, v3);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  /* Ultra-Refined Curvy Fluid Ribbon Stream with Dynamic Helical Twist & Meniscus Flare */
  createLaminarStreamGeometry(rings = 96, radialSegments = 64) {
    const geometry = new THREE.BufferGeometry();
    const count = (rings + 1) * radialSegments;
    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    const indices = [];

    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const v0 = i * radialSegments + j;
        const v1 = i * radialSegments + nextJ;
        const v2 = (i + 1) * radialSegments + j;
        const v3 = (i + 1) * radialSegments + nextJ;

        indices.push(v0, v2, v1);
        indices.push(v1, v2, v3);
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    return geometry;
  }

  updateLaminarStream(currentLiquidY, uStart = 0.0, uEnd = 1.0, elapsedTime = 0.0) {
    if (!this.pourStreamMesh || !this.pourStreamMesh.geometry) return;

    const geo = this.pourStreamMesh.geometry;
    const pos = geo.attributes.position;
    const rings = 96;
    const radialSegments = 64;

    // Spout position in cup coordinates (origin of barista milk pitcher pour directly above rim)
    const spout = new THREE.Vector3(0.15, 3.4, -0.75);
    const pool = new THREE.Vector3(0, currentLiquidY, 0);

    // Natural curvy flow trajectory with organic fluid arc:
    const getStreamCenter = (u) => {
      // Fluid descent accelerates naturally under gravity
      const uGrav = THREE.MathUtils.lerp(Math.pow(u, 1.35), u, 0.15);
      const cy = THREE.MathUtils.lerp(spout.y, pool.y, uGrav);

      // Curvy arc factor (vanishes smoothly at spout u=0 and pool u=1, peaking gracefully in mid-flow)
      const arcFactor = Math.sin(Math.PI * Math.pow(u, 0.85));

      // Organic gentle lateral sway & forward pitcher trajectory arc
      const swayX = 0.045 * arcFactor;
      const swayZ = 0.055 * arcFactor;

      const cx = THREE.MathUtils.lerp(spout.x, pool.x, u) + swayX;
      const cz = THREE.MathUtils.lerp(spout.z, pool.z, Math.pow(u, 1.15)) + swayZ;

      return new THREE.Vector3(cx, cy, cz);
    };

    let idx = 0;
    for (let i = 0; i <= rings; i++) {
      const frac = i / rings;
      // Active parameter along pouring trajectory
      const u = uStart + (uEnd - uStart) * frac;

      // Centerline position
      const center = getStreamCenter(u);

      // Tangent vector along curvy trajectory
      const uPrev = Math.max(0.0, u - 0.012);
      const uNext = Math.min(1.0, u + 0.012);
      const pPrev = getStreamCenter(uPrev);
      const pNext = getStreamCenter(uNext);
      const tangent = new THREE.Vector3().subVectors(pNext, pPrev).normalize();

      // Orthonormal frame perpendicular to tangent
      let ref = new THREE.Vector3(0, 0, 1);
      if (Math.abs(tangent.dot(ref)) > 0.88) {
        ref = new THREE.Vector3(1, 0, 0);
      }
      const norm = new THREE.Vector3().crossVectors(tangent, ref).normalize();
      const binorm = new THREE.Vector3().crossVectors(tangent, norm).normalize();

      // --- DYNAMIC HELICAL FLUID ROPE TWIST (Silky, Smooth Spiral Mechanics) ---
      // 1.2 full, graceful spiral turns down the stream length
      const twistTurns = 1.2;
      // Smooth natural flow downward with fluid velocity
      const twistAngle = u * (Math.PI * 2.0 * twistTurns) - elapsedTime * 2.0;

      const cosTwist = Math.cos(twistAngle);
      const sinTwist = Math.sin(twistAngle);

      // Rotated principal axes for elliptical twisted fluid ribbon
      const uMajor = new THREE.Vector3()
        .copy(norm).multiplyScalar(cosTwist)
        .addScaledVector(binorm, sinTwist);

      const uMinor = new THREE.Vector3()
        .copy(norm).multiplyScalar(-sinTwist)
        .addScaledVector(binorm, cosTwist);

      // --- SUBSTANTIAL THICK FLUID RIBBON RADIUS & ECCENTRICITY PROFILE ---
      // Generous, thick barista stream profile (freefall waist ~0.060, lip ~0.105, flare ~0.110)
      const neckFrac = Math.pow(1.0 - u, 2.0);
      const flareFrac = Math.pow(Math.max(0, (u - 0.70) / 0.30), 2.2);
      const baseR = 0.058 + 0.042 * neckFrac + 0.046 * flareFrac;

      // Soft, silky fluid ribbon flattening:
      // Spout lip pours as a wide flat sheet, contracts into twisted fluid column, flares circular at pool
      const topSheet = Math.pow(Math.max(0, 1.0 - u / 0.28), 1.6);
      const poolRound = Math.pow(Math.max(0, (u - 0.74) / 0.26), 1.8);
      const eccentricity = THREE.MathUtils.lerp(0.26 + 0.18 * topSheet, 0.0, poolRound);

      // Unbroken continuous fluid ribbon without high-frequency ring oscillations (100% line-free & silky smooth)
      const flowRipple = 1.0;

      const rMajor = baseR * (1.0 + eccentricity * 1.10) * flowRipple;
      const rMinor = baseR * (1.0 - eccentricity * 0.65) * flowRipple;

      // Smooth horizontal planar blend at the pool surface (u > 0.72)
      // Eliminates diagonal slicing and ensures 100% flush co-planar contact with the coffee surface
      const hBlend = Math.pow(Math.max(0, (u - 0.72) / 0.28), 2.0);

      for (let j = 0; j < radialSegments; j++) {
        const theta = (j / radialSegments) * Math.PI * 2;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Elliptical twisted cross-section offset
        const offX = rMajor * cosT * uMajor.x + rMinor * sinT * uMinor.x;
        const offY = rMajor * cosT * uMajor.y + rMinor * sinT * uMinor.y;
        const offZ = rMajor * cosT * uMajor.z + rMinor * sinT * uMinor.z;

        const pxTwist = center.x + offX;
        const pyTwist = center.y + offY;
        const pzTwist = center.z + offZ;

        // Horizontally flat cross section at pool impact (u -> 1)
        const pxHoriz = center.x + baseR * cosT;
        const pyHoriz = center.y;
        const pzHoriz = center.z + baseR * sinT;

        const px = THREE.MathUtils.lerp(pxTwist, pxHoriz, hBlend);
        const py = THREE.MathUtils.lerp(pyTwist, pyHoriz, hBlend);
        const pz = THREE.MathUtils.lerp(pzTwist, pzHoriz, hBlend);

        pos.setXYZ(idx, px, py, pz);
        idx++;
      }
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
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
          // Lower beans drifting directly BEHIND text and spanning both window boundaries
          const sidePattern = i % 4;
          if (sidePattern === 1) {
            x = -1.15 * (0.82 + Math.random() * 0.14);
          } else if (sidePattern === 3) {
            x = 1.15 * (0.82 + Math.random() * 0.14);
          } else {
            x = (Math.random() - 0.5) * 1.6;
          }
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
    this.steamParticles.visible = false;
    this.scene.add(this.steamParticles);
  }

  /* Explosive Radial Detonation */
  explode(forceMultiplier = 1.0) {
    if (this.explosionCooldown > 0) return;
    this.explosionCooldown = 0.7;
    this.isExploding = true;

    // Direct physical detonation impulse on fluid: compress and bounce
    this.fluid.jiggleVelY = -0.09;
    this.fluid.waveEnergy = Math.max(this.fluid.waveEnergy, 2.8);

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
    this.fluid.waveEnergy = Math.max(this.fluid.waveEnergy, 2.2);
    this.fluid.jiggleVelY = -0.055; // sharp little downward tap, then buoyant rebound jiggle!
    if (window.caffyoAudio && window.caffyoAudio.playCupStir) {
      window.caffyoAudio.playCupStir();
    }
  }

  /* Called by app.js once the preloader fades out — starts cinematic barista entry sequence */
  triggerCupEntry() {
    if (this.entryStarted) return; // prevent double-fire
    this.entryStarted = true;
    this.entryProgress = 0;
    this.hasCompletedEntry = false;
    this.hasPlayedCupLand = false;
    this.hasPlayedPourStart = false;
    this.hasPlayedMilkStart = false;
    this.hasPlayedLatteBloom = false;
    this.hasCutoffJiggled = false;
    this.hasCutoffJiggledCoffee = false;
    if (this.steamParticles) {
      this.steamParticles.visible = false;
    }
    if (this.latteArtMesh) {
      this.latteArtMesh.visible = false;
      this.latteArtMesh.scale.set(1.0, 1.0, 1.0);
    }
    if (this.latteUniforms) {
      this.latteUniforms.uBloomRadius.value = 0.0;
    }
    if (this.pourFoamSpot) {
      this.pourFoamSpot.visible = false;
    }
    if (this.liquidGroup) {
      this.liquidGroup.position.set(0, 0.82, 0);
      this.liquidGroup.scale.set(0.85, 1.0, 0.85);
    }
    if (this.pourStreamGroup) {
      this.pourStreamGroup.visible = false;
    }
    if (this.pourDroplets) {
      this.pourDroplets.forEach(d => { d.mesh.visible = false; });
    }
    this.clock.getDelta(); // flush accumulated delta so dt starts fresh
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
        this.fluid.jiggleVelY += dragDist * 0.0016; // Vertical inertial fluid jiggle

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
        if (this.isInteracting) {
          const sloshEnergy = Math.hypot(this.fluid.velX, this.fluid.velZ);
          this.fluid.jiggleVelY += Math.min(0.045, sloshEnergy * 0.035);
        }
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
          this.fluid.jiggleVelY += dragDist * 0.0020; // Mobile touch jiggle

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
        if (this.isInteracting) {
          const sloshEnergy = Math.hypot(this.fluid.velX, this.fluid.velZ);
          this.fluid.jiggleVelY += Math.min(0.045, sloshEnergy * 0.035);
        }
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

        if (!this.entryStarted) {
          // All parts parked gently above until triggerCupEntry() is called
          if (this.saucerGroup) {
            this.saucerGroup.position.set(0, 4.5, 0);
            this.saucerGroup.scale.setScalar(0.70);
          }
          if (this.cupBodyGroup) {
            this.cupBodyGroup.position.set(0, 5.0, 0);
            this.cupBodyGroup.scale.setScalar(0.70);
          }
          if (this.liquidGroup) {
            this.liquidGroup.position.set(0, 0.82, 0);
            this.liquidGroup.scale.set(0.85, 1.0, 0.85);
          }
          if (this.pourStreamGroup) {
            this.pourStreamGroup.visible = false;
          }
          if (this.pourDroplets) {
            this.pourDroplets.forEach(d => { d.mesh.visible = false; });
          }
          if (this.latteArtMesh) {
            this.latteArtMesh.visible = false;
            this.latteArtMesh.scale.set(1.0, 1.0, 1.0);
          }
          if (this.latteUniforms) {
            this.latteUniforms.uBloomRadius.value = 0.0;
          }
          if (this.pourFoamSpot) {
            this.pourFoamSpot.visible = false;
          }
          if (this.steamParticles) {
            this.steamParticles.visible = false;
          }
        } else if (!this.hasCompletedEntry) {
          this.entryProgress += dt / this.entryDuration;
          if (this.entryProgress >= 1.0) {
            this.entryProgress = 1.0;
            this.hasCompletedEntry = true;
          }

          const t = this.entryProgress;

          // ─────────────────────────────────────────────────────────
          // 4-STAGE BARISTA CHOREOGRAPHY (Soft, Fluid, Natural Physics):
          //  Stage 1 [t: 0.00 → 0.24]: Saucer gently glides down with cushioned air resistance & rim wobble
          //  Stage 2 [t: 0.18 → 0.42]: Cup body drops gracefully into saucer with ceramic ping & coupled recoil
          //  Stage 3 [t: 0.38 → 0.74]: Espresso pours from high above into cup with fluid dynamics, trumpet flare & capillary ripples
          //  Stage 4 [t: 0.72 → 0.98]: Rosetta Latte Art blooms radially outward across crema + warm steam rises
          // ─────────────────────────────────────────────────────────

          // --- STAGE 1: SAUCER / PLATE DROP ---
          const s1Start = 0.00;
          const s1End = 0.24;
          if (t < s1Start) {
            this.saucerGroup.position.set(0, 4.5, 0);
            this.saucerGroup.scale.setScalar(0.70);
          } else if (t < s1End) {
            const p = (t - s1Start) / (s1End - s1Start);
            if (p < 0.65) {
              const f = p / 0.65;
              // Smooth cubic ease-out: cushions softly into table contact
              const ease = 1 - Math.pow(1 - f, 2.8);
              this.saucerGroup.position.y = THREE.MathUtils.lerp(4.5, 0.0, ease);
              this.saucerGroup.scale.setScalar(THREE.MathUtils.lerp(0.70, 1.0, f));
              this.saucerGroup.rotation.x = THREE.MathUtils.lerp(-0.25, 0, f);
              this.saucerGroup.rotation.z = THREE.MathUtils.lerp(0.12, 0, f);
            } else {
              // Delicate, organic ceramic rim settling wobble
              const tRel = (p - 0.65) / 0.35;
              const bounce = Math.max(0, Math.sin(tRel * Math.PI * 2.0) * Math.exp(-tRel * 4.5) * 0.18);
              const wobbleZ = Math.sin(tRel * Math.PI * 3.0) * Math.exp(-tRel * 4.8) * 0.035;
              const wobbleX = Math.cos(tRel * Math.PI * 2.5) * Math.exp(-tRel * 4.8) * 0.022;
              this.saucerGroup.position.y = bounce;
              this.saucerGroup.rotation.x = wobbleX;
              this.saucerGroup.rotation.z = wobbleZ;
              this.saucerGroup.scale.setScalar(1.0);
            }
          } else {
            this.saucerGroup.position.set(0, 0, 0);
            this.saucerGroup.scale.setScalar(1.0);
            this.saucerGroup.rotation.set(0, 0, 0);
          }

          // --- STAGE 2: CUP BODY DROP ONTO SAUCER ---
          const s2Start = 0.18;
          const s2End = 0.42;
          if (t < s2Start) {
            this.cupBodyGroup.position.set(0, 5.0, 0);
            this.cupBodyGroup.scale.setScalar(0.70);
          } else if (t < s2End) {
            const p = (t - s2Start) / (s2End - s2Start);
            if (p < 0.65) {
              const f = p / 0.65;
              const ease = 1 - Math.pow(1 - f, 2.8);
              this.cupBodyGroup.position.y = THREE.MathUtils.lerp(5.0, 0.0, ease);
              this.cupBodyGroup.scale.setScalar(THREE.MathUtils.lerp(0.70, 1.0, f));
              this.cupBodyGroup.rotation.x = THREE.MathUtils.lerp(-0.20, 0, f);
              this.cupBodyGroup.rotation.y = THREE.MathUtils.lerp(0.60, 0, f);
            } else {
              if (!this.hasPlayedCupLand) {
                this.hasPlayedCupLand = true;
                if (window.caffyoAudio && window.caffyoAudio.playCupStir) {
                  window.caffyoAudio.playCupStir();
                }
                // When cup clinks into saucer, the pre-existing coffee inside sloshes and jiggles!
                this.fluid.jiggleVelY = -0.065;
                this.fluid.waveEnergy = 2.4;
              }
              const tRel = (p - 0.65) / 0.35;
              const bounce = Math.max(0, Math.sin(tRel * Math.PI * 2.2) * Math.exp(-tRel * 4.6) * 0.14);
              this.cupBodyGroup.position.y = bounce;
              this.cupBodyGroup.scale.setScalar(1.0);
              this.cupBodyGroup.rotation.x = 0;
              this.cupBodyGroup.rotation.y = 0;
              this.cupBodyGroup.rotation.z = Math.sin(tRel * Math.PI * 1.8) * Math.exp(-tRel * 4.2) * 0.018;

              // Coupled Newton's 3rd Law reaction on saucer beneath
              const saucerDip = -0.028 * Math.sin(tRel * Math.PI) * Math.exp(-tRel * 4.0);
              this.saucerGroup.position.y = saucerDip;
            }
          } else {
            this.cupBodyGroup.position.set(0, 0, 0);
            this.cupBodyGroup.scale.setScalar(1.0);
            this.cupBodyGroup.rotation.set(0, 0, 0);
          }

          // --- STAGE 3: STEAMED MILK POUR & NATURAL BARISTA LATTE ART CREATION ---
          // Dark coffee (espresso) is ALREADY PRESENT in cup at yMid = 0.82 (~60% cup fill).
          // Steamed microfoam milk pours from pitcher, filling cup to yTop = 1.205.
          // Right where milk pours in, the microfoam blooms organically into the barista heart latte art!
          const s3Start = 0.34;
          const s3End = 0.82;
          const yMid = 0.82;    // pre-existing espresso base fill level (~60% cup volume)
          const yTop = 1.205;   // full liquid capacity level inside porcelain cup

          if (t < s3Start) {
            // Coffee is visibly present inside the cup, sloshing and jiggling with cup landing impact
            const jiggleStretchY = 1.0 + this.fluid.jiggleY * 1.2;
            const jiggleSquashXZ = 1.0 - this.fluid.jiggleY * 0.45;
            this.liquidGroup.position.set(0, yMid + this.fluid.jiggleY, 0);
            this.liquidGroup.scale.set(0.85 * jiggleSquashXZ, jiggleStretchY, 0.85 * jiggleSquashXZ);
            if (this.pourStreamGroup) this.pourStreamGroup.visible = false;
            if (this.pourDroplets) {
              this.pourDroplets.forEach(d => { d.active = false; d.mesh.visible = false; });
            }
            if (this.latteArtMesh) this.latteArtMesh.visible = false;
            if (this.latteUniforms) this.latteUniforms.uBloomRadius.value = 0.0;
            if (this.pourFoamSpot) this.pourFoamSpot.visible = false;
          } else if (t < s3End) {
            const milkP = (t - s3Start) / (s3End - s3Start);

            // Configure stream appearance for silky white steamed microfoam milk
            if (this.pourStreamMesh && this.pourStreamMesh.material) {
              this.pourStreamMesh.material.color.setHex(0xfffef9);
              this.pourStreamMesh.material.roughness = 0.20;
            }

            if (!this.hasPlayedMilkStart) {
              this.hasPlayedMilkStart = true;
              if (window.caffyoAudio && window.caffyoAudio.playMilkPourSound) {
                window.caffyoAudio.playMilkPourSound();
              }
            }

            if (milkP < 0.10) {
              // Steamed milk stream shoots down to the dark coffee surface
              const shootP = Math.max(0.04, milkP / 0.10);
              if (this.pourStreamGroup) {
                this.pourStreamGroup.visible = true;
                this.updateLaminarStream(yMid, 0.0, shootP, elapsedTime);
              }
              const jiggleStretchY = 1.0 + this.fluid.jiggleY * 1.2;
              const jiggleSquashXZ = 1.0 - this.fluid.jiggleY * 0.45;
              this.liquidGroup.position.set(0, yMid + this.fluid.jiggleY, 0);
              this.liquidGroup.scale.set(0.85 * jiggleSquashXZ, jiggleStretchY, 0.85 * jiggleSquashXZ);
              if (this.latteArtMesh) this.latteArtMesh.visible = false;
              if (this.latteUniforms) this.latteUniforms.uBloomRadius.value = 0.0;
              if (this.pourFoamSpot) this.pourFoamSpot.visible = false;
            } else if (milkP < 0.86) {
              // Steamed milk pours into dark espresso, filling cup from yMid (0.82) to yTop (1.205)
              const fillVolume = (milkP - 0.10) / 0.76;
              const fillH = Math.pow(Math.max(0, fillVolume), 0.88);
              const currentLiquidY = THREE.MathUtils.lerp(yMid, yTop, fillH);
              const currentLiquidScale = THREE.MathUtils.lerp(0.85, 1.0, fillH);

              // DYNAMIC BARISTA MILK FOAM SPREADING (DOT -> EXPANDING BULB -> HEART ART):
              // No whole-image opacity fade! Milk lands as a single white dot at impact and expands organically outward.
              let currentRadius = 0.0;
              if (fillVolume < 0.18) {
                // 1 dot emergence & initial circular puddle expansion: 0.003 -> 0.085
                const f = fillVolume / 0.18;
                currentRadius = THREE.MathUtils.lerp(0.003, 0.085, Math.pow(f, 1.35));
              } else if (fillVolume < 0.62) {
                // Microfoam spreads into heart lobes & pattern: 0.085 -> 0.35
                const f = (fillVolume - 0.18) / 0.44;
                currentRadius = THREE.MathUtils.lerp(0.085, 0.35, 1.0 - Math.pow(1.0 - f, 1.5));
              } else {
                // Crema pushed outward to porcelain cup rim: 0.35 -> 0.62
                const f = (fillVolume - 0.62) / 0.38;
                currentRadius = THREE.MathUtils.lerp(0.35, 0.62, 1.0 - Math.pow(1.0 - f, 1.7));
              }

              if (this.latteUniforms) {
                this.latteUniforms.uBloomRadius.value = currentRadius;
                this.latteUniforms.uTime.value = elapsedTime;
              }
              if (this.latteArtMesh) {
                this.latteArtMesh.visible = true;
                this.latteArtMesh.scale.set(1.0, 1.0, 1.0);
              }

              // Touchdown foam spot provides instant bright white milk splash at contact point during early pour
              if (this.pourFoamSpot) {
                if (fillVolume < 0.25) {
                  this.pourFoamSpot.visible = true;
                  const spotScale = Math.min(1.0, Math.max(0.05, currentRadius / 0.085));
                  this.pourFoamSpot.scale.set(spotScale, 1.0, spotScale);
                  this.pourFoamSpot.material.opacity = Math.max(0.0, 1.0 - (fillVolume / 0.25));
                } else {
                  this.pourFoamSpot.visible = false;
                }
              }

              // Liquid pour jiggle & wave turbulence from pouring milk
              this.fluid.jiggleVelY += (Math.sin(milkP * 34.0) * 0.010 + (Math.random() - 0.5) * 0.005) * (dt * 60);

              const jiggleStretchY = 1.0 + this.fluid.jiggleY * 1.2;
              const jiggleSquashXZ = 1.0 - this.fluid.jiggleY * 0.45;

              this.liquidGroup.position.set(0, currentLiquidY + this.fluid.jiggleY, 0);
              this.liquidGroup.scale.set(
                currentLiquidScale * jiggleSquashXZ,
                jiggleStretchY,
                currentLiquidScale * jiggleSquashXZ
              );

              if (this.pourStreamGroup) {
                this.pourStreamGroup.visible = true;
                this.updateLaminarStream(currentLiquidY + this.fluid.jiggleY, 0.0, 1.0, elapsedTime);
              }

              this.fluid.waveEnergy = Math.max(this.fluid.waveEnergy, 1.8);
              const massCompression = -0.020 * fillH;
              this.cupBodyGroup.position.y = massCompression;
              this.saucerGroup.position.y = massCompression * 0.5;

            } else {
              // Milk stream gracefully finishes and cuts off from the top
              const cutP = (milkP - 0.86) / 0.14;

              if (!this.hasCutoffJiggled) {
                this.hasCutoffJiggled = true;
                // Impact cessation rebound jiggle
                this.fluid.jiggleVelY = -0.065;
                this.fluid.waveEnergy = Math.max(this.fluid.waveEnergy, 2.4);
              }

              const jiggleStretchY = 1.0 + this.fluid.jiggleY * 1.2;
              const jiggleSquashXZ = 1.0 - this.fluid.jiggleY * 0.45;

              this.liquidGroup.position.set(0, yTop + this.fluid.jiggleY, 0);
              this.liquidGroup.scale.set(jiggleSquashXZ, jiggleStretchY, jiggleSquashXZ);

              if (this.latteUniforms) {
                this.latteUniforms.uBloomRadius.value = 0.62;
                this.latteUniforms.uTime.value = elapsedTime;
              }
              if (this.latteArtMesh) {
                this.latteArtMesh.visible = true;
                this.latteArtMesh.scale.set(1.0, 1.0, 1.0);
              }
              if (this.pourFoamSpot) {
                this.pourFoamSpot.visible = false;
              }

              if (cutP < 1.0 && this.pourStreamGroup) {
                this.pourStreamGroup.visible = true;
                this.updateLaminarStream(yTop + this.fluid.jiggleY, cutP, 1.0, elapsedTime);
              } else if (this.pourStreamGroup) {
                this.pourStreamGroup.visible = false;
              }

              this.fluid.waveEnergy = Math.max(this.fluid.waveEnergy, 1.4 * (1.0 - cutP));
            }

          } else {
            // --- STAGE 4: SETTLE, WARM STEAM RISE & SUCCESS CHIME ---
            if (this.pourStreamGroup) this.pourStreamGroup.visible = false;
            const jiggleStretchY = 1.0 + this.fluid.jiggleY * 1.2;
            const jiggleSquashXZ = 1.0 - this.fluid.jiggleY * 0.45;
            this.liquidGroup.position.set(0, yTop + this.fluid.jiggleY, 0);
            this.liquidGroup.scale.set(jiggleSquashXZ, jiggleStretchY, jiggleSquashXZ);

            if (this.latteUniforms) {
              this.latteUniforms.uBloomRadius.value = 0.62;
              this.latteUniforms.uTime.value = elapsedTime;
            }
            if (this.latteArtMesh) {
              this.latteArtMesh.visible = true;
              this.latteArtMesh.scale.set(1.0, 1.0, 1.0);
            }
            if (this.pourFoamSpot) {
              this.pourFoamSpot.visible = false;
            }

            this.cupBodyGroup.position.set(0, 0, 0);
            this.saucerGroup.position.set(0, 0, 0);

            // Fresh warm steam smoothly appears and rises
            const steamP = Math.min(1.0, (t - s3End) / (1.0 - s3End));
            if (this.steamParticles) {
              this.steamParticles.visible = true;
              if (this.steamParticles.material) {
                this.steamParticles.material.opacity = THREE.MathUtils.lerp(0.0, 0.16, steamP);
              }
            }

            if (!this.hasPlayedLatteBloom) {
              this.hasPlayedLatteBloom = true;
              if (window.caffyoAudio && window.caffyoAudio.playChime) {
                window.caffyoAudio.playChime(784, 0.08); // gentle crystalline chime
              }
            }

            this.fluid.waveEnergy *= Math.exp(-2.8 * dt);
          }

          // Gentle positioning of overall cupGroup during entry
          this.cupGroup.position.x = targetX;
          this.cupGroup.position.y = targetY;
          this.cupGroup.position.z = restZ;
          this.cupGroup.scale.setScalar(targetScale);
          this.cupGroup.rotation.x = restRotX;
          this.cupGroup.rotation.y = restRotY;
          this.cupGroup.rotation.z = restRotZ;

        } else {
          // After entry completes: ensure subgroups are locked at rest positions
          if (this.saucerGroup) {
            this.saucerGroup.position.set(0, 0, 0);
            this.saucerGroup.scale.setScalar(1.0);
          }
          if (this.cupBodyGroup) {
            this.cupBodyGroup.position.set(0, 0, 0);
            this.cupBodyGroup.scale.setScalar(1.0);
          }
          if (this.liquidGroup && !this.hasCompletedEntry) {
            this.liquidGroup.position.set(0, 1.205, 0);
            this.liquidGroup.scale.set(1.0, 1.0, 1.0);
          }
          if (this.latteArtMesh) {
            this.latteArtMesh.visible = true;
            this.latteArtMesh.scale.set(1.0, 1.0, 1.0);
          }
          if (this.latteUniforms) {
            this.latteUniforms.uBloomRadius.value = 0.62;
            this.latteUniforms.uTime.value = elapsedTime;
          }
          if (this.pourFoamSpot) {
            this.pourFoamSpot.visible = false;
          }
          if (this.pourStreamGroup) {
            this.pourStreamGroup.visible = false;
          }
          if (this.pourDroplets) {
            this.pourDroplets.forEach(d => { d.mesh.visible = false; });
          }
          if (this.steamParticles) {
            this.steamParticles.visible = true;
          }

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
    // Real-Time Fluid Dynamics Simulator (Damped 2D Slosh + 3D Harmonic Jiggle)
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

    // Vertical Fluid Jiggle Oscillator (Restoring Surface Tension & Volume Elasticity)
    const jiggleOmega = 24.0;   // ~3.8 Hz natural fluid bounce
    const jiggleDamp = 6.8;     // Viscous damping for soft, organic jiggle
    const accelJiggleY = -jiggleOmega * jiggleOmega * this.fluid.jiggleY - 2.0 * jiggleDamp * this.fluid.jiggleVelY;

    this.fluid.jiggleVelY += accelJiggleY * dt;
    this.fluid.jiggleY += this.fluid.jiggleVelY * dt;

    // Ambient micro-jiggle (delicate living fluid tremor)
    const ambientJiggle = (Math.sin(elapsedTime * 5.4) * 0.0006 + Math.cos(elapsedTime * 9.8) * 0.0003);
    this.fluid.jiggleY += ambientJiggle * dt * 25.0;

    // Physical limit so liquid stays securely within the porcelain cup rim
    this.fluid.jiggleY = Math.max(-0.048, Math.min(0.048, this.fluid.jiggleY));

    // 1. Continuous Fluid Plane Tilt & Dynamic Volume Jiggle (100% Smooth, Zero Tearing)
    if (this.liquidGroup) {
      this.liquidGroup.rotation.z = -this.fluid.sloshX;
      this.liquidGroup.rotation.x = this.fluid.sloshZ;

      const jiggleStretchY = 1.0 + this.fluid.jiggleY * 1.2;
      const jiggleSquashXZ = 1.0 - this.fluid.jiggleY * 0.45;

      // When entry has finished (idle or interactive drag), jiggle updates position & scale dynamically!
      if (this.hasCompletedEntry) {
        this.liquidGroup.position.set(0, 1.205 + this.fluid.jiggleY, 0);
        this.liquidGroup.scale.set(jiggleSquashXZ, jiggleStretchY, jiggleSquashXZ);
      }
    }

    // 2. Continuous Organic Surface Capillary Ripples + Harmonic Bessel J0 Dome Jiggle
    if (this.liquidMesh && this.liquidOrigPos) {
      const pos = this.liquidMesh.geometry.attributes.position;
      const count = pos.count;
      const R = 1.255;

      for (let i = 0; i < count; i++) {
        const ox = this.liquidOrigPos[i * 3 + 0];
        const oz = this.liquidOrigPos[i * 3 + 2];
        const r = Math.hypot(ox, oz);

        if (r <= R) {
          // Quadratic hermite falloff: exactly 0 at rim with zero slope (NO EDGE TEARING)
          const w = Math.pow(Math.max(0, 1.0 - (r * r) / (R * R)), 2);
          // Silky capillary ripple: calm, organic wave
          const ripple = Math.cos(r * 7.5 - this.fluid.wavePhase) * (this.fluid.waveEnergy * 0.009) * w;
          const ambient = Math.cos(r * 3.5 - elapsedTime * 1.8) * 0.0012 * w;
          // Organic fluid center bounce jiggle (Bessel J0-like dome mode)
          const jiggleBulge = this.fluid.jiggleY * 0.50 * Math.cos(r * 2.2) * w;
          pos.setY(i, this.liquidOrigPos[i * 3 + 1] + ripple + ambient + jiggleBulge);
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
          const isMobile = window.innerWidth <= 768;
          // Floating beans remain at rest position immediately on load (they do NOT drop with the cup)
          const restCupX = this.targetRestX !== undefined ? this.targetRestX : (isMobile ? 0 : 2.25);
          const restCupY = this.targetRestY !== undefined ? this.targetRestY : (isMobile ? 0.80 : -0.28);
          let targetX, targetY, targetZ;

          if (isMobile && bean.isLowerBean) {
            // Lower beans float and drift smoothly directly BEHIND text
            targetX = bean.homeX + Math.sin(elapsedTime * bean.bobFreq * 0.6 + bean.phase) * 0.35;
            targetY = bean.homeY + Math.cos(elapsedTime * bean.bobFreq * 0.7 + bean.phase) * 0.18;
            targetZ = bean.homeZ + Math.sin(elapsedTime * 0.5 + bean.phase) * 0.22;
          } else {
            // Orbiting beans drift around the cup's resting position
            bean.angle += bean.orbitSpeed * dt * 0.35;
            targetX = restCupX + Math.cos(bean.angle) * bean.baseRadius;
            targetZ = Math.sin(bean.angle) * bean.baseRadius;
            targetY = restCupY + (bean.baseOffsetY !== undefined ? bean.baseOffsetY : 0) + Math.sin(elapsedTime * bean.bobFreq + bean.phase) * bean.bobAmp;
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
