import * as THREE from 'three';

export class ThreeMathUniverse {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 22;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.container.appendChild(this.renderer.domElement);

    this.shapes = [];
    this.particles = null;
    this.clock = new THREE.Clock();
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;

    this.initLights();
    this.initMathematicalConstellation();
    this.initDiyaSparks();
    this.initEvents();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  initLights() {
    // Warm ambient base
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.95);
    this.scene.add(ambientLight);

    // Warm Diya core flame light
    this.diyaLight = new THREE.PointLight(0xF08A24, 2.2, 55);
    this.diyaLight.position.set(0, 4, 12);
    this.scene.add(this.diyaLight);

    // Emerald green pedagogical accent
    const greenLight = new THREE.PointLight(0x0A9155, 1.5, 45);
    greenLight.position.set(-14, -6, 10);
    this.scene.add(greenLight);

    // Golden rim light for crisp depth
    const goldLight = new THREE.DirectionalLight(0xF7C948, 1.1);
    goldLight.position.set(14, 12, 10);
    this.scene.add(goldLight);
  }

  initMathematicalConstellation() {
    this.shapes = [];

    // Curated high-order mathematical elements (Operators & Sacred Geometry)
    const symbolTypes = [
      'plus',
      'minus',
      'multiply',
      'divide',
      'equals',
      'pi-ring',
      'plus',
      'multiply',
      'divide',
      'delta-pyramid',
      'minus',
      'equals'
    ];

    const palette = [
      { color: 0xF08A24, name: 'orange' }, // Diya Orange
      { color: 0x0A9155, name: 'green' },  // Diya Green
      { color: 0xF7C948, name: 'gold' },   // Glow Gold
      { color: 0xD7262B, name: 'red' }     // Flame Red
    ];

    // Pre-calculate distributed layout so symbols never clump together
    const total = symbolTypes.length;
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio distribution

    for (let i = 0; i < total; i++) {
      const type = symbolTypes[i];
      const colorObj = palette[i % palette.length];
      const group = new THREE.Group();

      // Z-depth layering: foreground (subtle) to deep atmospheric background
      const depthTier = i % 3; // 0 = near, 1 = mid, 2 = deep
      let zPos = -3;
      let opacity = 0.75;
      let baseScale = 0.65;

      if (depthTier === 2) {
        zPos = -10 - Math.random() * 5; // Deep background
        opacity = 0.32;
        baseScale = 0.55;
      } else if (depthTier === 1) {
        zPos = -6 - Math.random() * 3; // Mid-ground
        opacity = 0.55;
        baseScale = 0.65;
      } else {
        zPos = -2 - Math.random() * 2; // Near accent
        opacity = 0.8;
        baseScale = 0.75;
      }

      // Elegant satin/glass material
      const material = new THREE.MeshStandardMaterial({
        color: colorObj.color,
        roughness: 0.25,
        metalness: 0.35,
        transparent: true,
        opacity: opacity,
        depthWrite: depthTier === 0
      });

      // Helper for rounded-style bars
      const addBar = (w, h, x, y, rot = 0) => {
        const geo = new THREE.BoxGeometry(w, h, 0.22);
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(x, y, 0);
        mesh.rotation.z = rot;
        group.add(mesh);
      };

      // Helper for circular dots
      const addDot = (x, y, rad = 0.16) => {
        const geo = new THREE.CylinderGeometry(rad, rad, 0.22, 20);
        geo.rotateX(Math.PI / 2);
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(x, y, 0);
        group.add(mesh);
      };

      // 1. PLUS (+)
      if (type === 'plus') {
        addBar(1.4 * baseScale, 0.22 * baseScale, 0, 0);
        addBar(0.22 * baseScale, 1.4 * baseScale, 0, 0);
      }
      // 2. MINUS (−)
      else if (type === 'minus') {
        addBar(1.4 * baseScale, 0.22 * baseScale, 0, 0);
      }
      // 3. MULTIPLICATION (×)
      else if (type === 'multiply') {
        addBar(1.5 * baseScale, 0.22 * baseScale, 0, 0, Math.PI / 4);
        addBar(1.5 * baseScale, 0.22 * baseScale, 0, 0, -Math.PI / 4);
      }
      // 4. DIVISION (÷)
      else if (type === 'divide') {
        addBar(1.4 * baseScale, 0.22 * baseScale, 0, 0);
        addDot(0, 0.42 * baseScale, 0.12 * baseScale);
        addDot(0, -0.42 * baseScale, 0.12 * baseScale);
      }
      // 5. EQUALS (=)
      else if (type === 'equals') {
        addBar(1.3 * baseScale, 0.2 * baseScale, 0, 0.22 * baseScale);
        addBar(1.3 * baseScale, 0.2 * baseScale, 0, -0.22 * baseScale);
      }
      // 6. PI / CIRCLE TORUS RING
      else if (type === 'pi-ring') {
        const ringGeo = new THREE.TorusGeometry(0.75 * baseScale, 0.12 * baseScale, 16, 32);
        const ringMesh = new THREE.Mesh(ringGeo, material);
        group.add(ringMesh);
      }
      // 7. DELTA / PYRAMID (Change & Geometry)
      else if (type === 'delta-pyramid') {
        const coneGeo = new THREE.ConeGeometry(0.8 * baseScale, 1.2 * baseScale, 3);
        const coneMesh = new THREE.Mesh(coneGeo, material);
        group.add(coneMesh);
      }

      // Distribute evenly across viewport field
      const aspect = window.innerWidth / window.innerHeight;
      const spreadX = 14 * aspect;
      const spreadY = 12;

      // Position in golden spiral offset so screen is balanced
      const theta = i * phi * Math.PI * 2;
      const radiusFraction = Math.sqrt((i + 1) / total);
      const baseX = Math.cos(theta) * spreadX * 0.48 * radiusFraction;
      const baseY = Math.sin(theta) * spreadY * 0.48 * radiusFraction;

      group.position.set(baseX, baseY, zPos);
      this.scene.add(group);

      this.shapes.push({
        mesh: group,
        baseX: baseX,
        baseY: baseY,
        baseZ: zPos,
        // Harmonic motion parameters (calm & weightless)
        freqX: 0.35 + (i % 5) * 0.12,
        freqY: 0.45 + ((i + 2) % 4) * 0.15,
        ampX: 0.6 + Math.random() * 0.6,
        ampY: 0.7 + Math.random() * 0.8,
        phase: (i * 1.618),
        // Gentle rotation speed
        rotSpeedX: (Math.random() - 0.5) * 0.006,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        rotSpeedZ: (Math.random() - 0.5) * 0.004,
        // Interactive repulsion displacement
        repelX: 0,
        repelY: 0
      });
    }
  }

  // Subtle ambient Diya sparks floating upwards like gentle embers of insight
  initDiyaSparks() {
    const count = 35;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = -5 - Math.random() * 15;
      speeds[i] = 0.004 + Math.random() * 0.008;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xF7C948,
      size: 0.28,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.particlesData = { speeds, count };
    this.scene.add(this.particles);
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Reset mouse to center on leave
    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
    });
  }

  updateScroll(progress) {
    this.scrollProgress = progress; // 0 to 1
  }

  animate() {
    requestAnimationFrame(this.animate);

    // Smooth mouse parallax easing
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;

    // Camera gently shifts with mouse and scroll
    this.camera.position.x = this.mouse.x * 1.2;
    this.camera.position.y = this.mouse.y * 1.0;

    const time = performance.now() * 0.001;

    // Approximate cursor world coordinates at mid-plane (Z ~ -5)
    const cursorWorldX = this.mouse.x * (window.innerWidth / window.innerHeight) * 8.5;
    const cursorWorldY = this.mouse.y * 7.0;

    // Animate each mathematical element
    this.shapes.forEach((item) => {
      // 1. Weightless Harmonic Drift (Harmonic sine waves, no jarring bounces)
      const harmonicX = item.baseX + Math.sin(time * item.freqX + item.phase) * item.ampX;
      const harmonicY = item.baseY + Math.cos(time * item.freqY + item.phase) * item.ampY + (this.scrollProgress * 2.2);

      // 2. Playful Mouse Interaction for Kids (Symbols gently glide away when approached)
      const dx = (item.mesh.position.x) - cursorWorldX;
      const dy = (item.mesh.position.y) - cursorWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 4.8;

      if (dist < repelRadius && dist > 0.1) {
        const force = (1 - dist / repelRadius) * 2.0;
        item.repelX += ((dx / dist) * force - item.repelX) * 0.1;
        item.repelY += ((dy / dist) * force - item.repelY) * 0.1;
      } else {
        item.repelX += (0 - item.repelX) * 0.05;
        item.repelY += (0 - item.repelY) * 0.05;
      }

      // Smoothly apply position
      item.mesh.position.x = harmonicX + item.repelX;
      item.mesh.position.y = harmonicY + item.repelY;

      // 3. Elegant, slow tumbling in 3D (Subtle tilt that reveals 3D shading)
      item.mesh.rotation.x = Math.sin(time * 0.35 + item.phase) * 0.35;
      item.mesh.rotation.y = Math.cos(time * 0.28 + item.phase) * 0.45;
      item.mesh.rotation.z += item.rotSpeedZ;
    });

    // Animate glowing Diya sparks (drifting upward gently)
    if (this.particles) {
      const pos = this.particles.geometry.attributes.position.array;
      const speeds = this.particlesData.speeds;
      const count = this.particlesData.count;

      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += speeds[i];
        // Wrap around when rising past ceiling
        if (pos[i * 3 + 1] > 14) {
          pos[i * 3 + 1] = -14;
        }
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // Gentle Diya light breathing intensity
    if (this.diyaLight) {
      this.diyaLight.intensity = 2.0 + Math.sin(time * 2.5) * 0.35;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
