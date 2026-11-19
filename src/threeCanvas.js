import * as THREE from 'three';
import confetti from 'canvas-confetti';

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
    this.camera.position.set(0, 0, 22);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.container.appendChild(this.renderer.domElement);

    this.shapes = [];
    this.interactiveMeshes = [];
    this.hoveredItem = null;
    this.particles = null;
    this.clock = new THREE.Clock();
    this.scrollProgress = 0;

    // Direct Raycasting setup for direct-hover and click only
    this.raycaster = new THREE.Raycaster();
    this.mouseNdc = new THREE.Vector2(-999, -999);
    this.isOverInteractiveDom = false;

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
    this.interactiveMeshes = [];

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

    const total = symbolTypes.length;

    for (let i = 0; i < total; i++) {
      const type = symbolTypes[i];
      const colorObj = palette[i % palette.length];
      const group = new THREE.Group();

      // Aspect ratio scaling
      const aspect = window.innerWidth / window.innerHeight;
      const aspectScale = Math.min(Math.max(aspect / 1.77, 0.75), 1.25);

      // 12 curated anchor zones populating the OPEN space without covering text or the MathDiya logo:
      const anchors = [
        // Upper-Left Flank (clear diagonal above/left of headline)
        { x: -11.5 * aspectScale, y: 4.6, z: -3.5, opacity: 0.8, scale: 0.75 },
        // Far Left Wing
        { x: -14.5 * aspectScale, y: 2.0, z: -6.5, opacity: 0.55, scale: 0.65 },
        // Open Middle Belt (Left of center, cleanly between subtitle and MathDiya logo)
        { x: -5.6 * aspectScale, y: 2.1, z: -4.0, opacity: 0.75, scale: 0.70 },
        // Mid-Left Wing (directly left of the Diya lamp)
        { x: -12.0 * aspectScale, y: -0.6, z: -4.5, opacity: 0.70, scale: 0.70 },
        // Lower-Left Flanks (to the left of CTA buttons)
        { x: -9.2 * aspectScale, y: -2.4, z: -5.5, opacity: 0.60, scale: 0.65 },
        { x: -6.2 * aspectScale, y: -4.5, z: -4.0, opacity: 0.75, scale: 0.70 },

        // Upper-Right Flank (clear diagonal above/right of headline)
        { x: 11.5 * aspectScale, y: 4.6, z: -3.5, opacity: 0.8, scale: 0.75 },
        // Far Right Wing
        { x: 14.5 * aspectScale, y: 2.0, z: -6.5, opacity: 0.55, scale: 0.65 },
        // Open Middle Belt (Right of center, cleanly between subtitle and MathDiya logo)
        { x: 5.6 * aspectScale, y: 2.1, z: -4.0, opacity: 0.75, scale: 0.70 },
        // Mid-Right Wing (directly right of the 'ya' letters)
        { x: 12.0 * aspectScale, y: -0.6, z: -4.5, opacity: 0.70, scale: 0.70 },
        // Lower-Right Flanks (to the right of CTA buttons)
        { x: 9.2 * aspectScale, y: -2.4, z: -5.5, opacity: 0.60, scale: 0.65 },
        { x: 6.2 * aspectScale, y: -4.5, z: -4.0, opacity: 0.75, scale: 0.70 }
      ];

      const anchor = anchors[i % anchors.length];
      const zPos = anchor.z;
      const baseX = anchor.x;
      const baseY = anchor.y;
      const opacity = anchor.opacity;
      const baseScale = anchor.scale;

      // Elegant satin/glass material
      const material = new THREE.MeshStandardMaterial({
        color: colorObj.color,
        roughness: 0.25,
        metalness: 0.35,
        transparent: true,
        opacity: opacity
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

      // Invisible hit sphere for comfortable, kid-friendly hover and click targeting
      const hitGeo = new THREE.SphereGeometry(1.6 * baseScale, 10, 10);
      const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      group.add(hitMesh);

      group.position.set(baseX, baseY, zPos);
      this.scene.add(group);

      const item = {
        mesh: group,
        baseX: baseX,
        baseY: baseY,
        baseZ: zPos,
        baseScale: baseScale,
        currentScale: baseScale,
        material: material,
        baseOpacity: opacity,
        color: colorObj.color,
        // Free roaming harmonic parameters (smooth, natural drift)
        freqX: 0.28 + (i % 5) * 0.08,
        freqY: 0.35 + ((i + 2) % 4) * 0.09,
        freqZ: 0.22 + (i % 3) * 0.06,
        ampX: 0.9 + (i % 3) * 0.35,
        ampY: 0.8 + ((i + 1) % 3) * 0.3,
        ampZ: 0.6 + (i % 2) * 0.3,
        phase: i * 1.618,
        // Gentle idle rotation
        rotSpeedX: 0.002 * ((i % 2 === 0) ? 1 : -1),
        rotSpeedY: 0.003 * ((i % 3 === 0) ? 1 : -1),
        rotSpeedZ: 0.0025 * ((i % 4 === 0) ? 1 : -1),
        // Direct interaction states
        isHovered: false,
        hoverFactor: 0,
        spinBoost: 0,
        flipRotX: 0,
        flipRotY: 0,
        flipVelX: 0,
        flipVelY: 0,
        bounceImpulse: 0
      };

      // Connect all child meshes to item for fast raycasting
      group.children.forEach(child => {
        child.userData = { symbolItem: item };
        this.interactiveMeshes.push(child);
      });

      this.shapes.push(item);
    }
  }

  // Subtle ambient Diya sparks floating upwards like gentle embers of insight
  initDiyaSparks() {
    const count = 35;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60; // Spread across full viewport width
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
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

    // Track mouse NDC only when over non-interactive page areas
    window.addEventListener('mousemove', (e) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      this.isOverInteractiveDom = !!(target && target.closest('button, a, input, select, textarea, [data-open-booking], .faq-question'));

      if (this.isOverInteractiveDom) {
        this.mouseNdc.set(-999, -999);
      } else {
        this.mouseNdc.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouseNdc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    });

    // Reset mouse on leave
    window.addEventListener('mouseleave', () => {
      this.mouseNdc.set(-999, -999);
      if (document.body.style.cursor === 'pointer') {
        document.body.style.cursor = '';
      }
    });

    // Direct Click interaction: playful 360 flip and mini confetti pop!
    window.addEventListener('click', (e) => {
      if (e.target && e.target.closest('button, a, input, select, textarea, [data-open-booking], .faq-question')) {
        return; // Do not intercept native DOM controls
      }

      this.raycaster.setFromCamera(this.mouseNdc, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, false);
      if (intersects.length > 0) {
        const hitItem = intersects[0].object.userData?.symbolItem;
        if (hitItem) {
          // Playful somersault flip impulse
          hitItem.flipVelY += (Math.random() > 0.5 ? 1 : -1) * 0.42;
          hitItem.flipVelX += (Math.random() > 0.5 ? 1 : -1) * 0.32;
          hitItem.bounceImpulse = 0.55;

          // Kid-friendly confetti burst
          try {
            confetti({
              particleCount: 16,
              spread: 60,
              startVelocity: 16,
              origin: {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
              },
              colors: ['#0A9155', '#F08A24', '#F7C948', '#D7262B'],
              scalar: 0.65,
              ticks: 45,
              disableForReducedMotion: true
            });
          } catch (_) {}
        }
      }
    });
  }

  updateScroll(progress) {
    this.scrollProgress = progress; // 0 to 1
  }

  animate() {
    requestAnimationFrame(this.animate);

    const time = performance.now() * 0.001;

    // Raycasting for direct hover detection
    let currentHovered = null;
    if (!this.isOverInteractiveDom && this.mouseNdc.x > -900) {
      this.raycaster.setFromCamera(this.mouseNdc, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, false);
      if (intersects.length > 0) {
        currentHovered = intersects[0].object.userData?.symbolItem || null;
      }
    }

    // Update cursor style
    if (currentHovered) {
      document.body.style.cursor = 'pointer';
    } else if (document.body.style.cursor === 'pointer') {
      document.body.style.cursor = '';
    }

    // Animate each freely roaming mathematical element
    this.shapes.forEach((item) => {
      item.isHovered = (item === currentHovered);

      // Smooth hover factor lerp (0 when resting, 1 when hovered directly)
      item.hoverFactor += ((item.isHovered ? 1 : 0) - item.hoverFactor) * 0.14;

      // 1. Free Roaming Harmonic 3D Drift (Calm, weightless, self-governing)
      const roamX = item.baseX + Math.sin(time * item.freqX + item.phase) * item.ampX;
      const roamY = item.baseY + Math.cos(time * item.freqY + item.phase) * item.ampY + (this.scrollProgress * 2.2);
      const roamZ = item.baseZ + Math.sin(time * item.freqZ + item.phase) * item.ampZ;
      item.mesh.position.set(roamX, roamY, roamZ);

      // 2. Direct Hover & Click Scaling (Gently swells and bounces)
      item.bounceImpulse *= 0.88;
      if (Math.abs(item.bounceImpulse) < 0.001) item.bounceImpulse = 0;

      const targetScale = item.baseScale * (1 + item.hoverFactor * 0.32 + item.bounceImpulse);
      item.currentScale += (targetScale - item.currentScale) * 0.16;
      item.mesh.scale.set(item.currentScale, item.currentScale, item.currentScale);

      // 3. Hover Rotation Boost & Click Flip
      if (item.isHovered) {
        item.spinBoost += 0.02;
      }
      item.spinBoost *= 0.94;

      item.flipRotX += item.flipVelX;
      item.flipRotY += item.flipVelY;
      item.flipVelX *= 0.92;
      item.flipVelY *= 0.92;

      item.mesh.rotation.x = Math.sin(time * 0.35 + item.phase) * 0.35 + item.flipRotX;
      item.mesh.rotation.y = Math.cos(time * 0.28 + item.phase) * 0.45 + item.flipRotY;
      item.mesh.rotation.z += item.rotSpeedZ + item.spinBoost;

      // 4. Hover Glow & Emissive
      if (item.material) {
        item.material.opacity = item.baseOpacity + item.hoverFactor * (1 - item.baseOpacity);
        item.material.emissive.setHex(item.color);
        item.material.emissiveIntensity = item.hoverFactor * 0.45;
      }
    });

    // Animate glowing Diya sparks (drifting upward gently)
    if (this.particles) {
      const pos = this.particles.geometry.attributes.position.array;
      const speeds = this.particlesData.speeds;
      const count = this.particlesData.count;

      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += speeds[i];
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
