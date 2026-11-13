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
    this.camera.position.z = 24;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.shapes = [];
    this.particles = null;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;

    this.initLights();
    this.initGeometricShapes();
    this.initDiyaParticles();
    this.initEvents();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.9);
    this.scene.add(ambientLight);

    // Warm diya glow point light
    this.diyaLight = new THREE.PointLight(0xF08A24, 2.5, 50);
    this.diyaLight.position.set(0, 5, 10);
    this.scene.add(this.diyaLight);

    // Green secondary brand accent light
    const greenLight = new THREE.PointLight(0x0A9155, 1.8, 40);
    greenLight.position.set(-10, -5, 8);
    this.scene.add(greenLight);

    // Golden rim light
    const goldLight = new THREE.DirectionalLight(0xF7C948, 1.2);
    goldLight.position.set(12, 10, 10);
    this.scene.add(goldLight);
  }

  initGeometricShapes() {
    // 1. Math Diya Pyramid (Tetrahedron with golden wireframe + solid core)
    const pyramidGeo = new THREE.ConeGeometry(1.6, 2.4, 4);
    const pyramidMat = new THREE.MeshStandardMaterial({
      color: 0xF08A24,
      roughness: 0.25,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85
    });
    const pyramidMesh = new THREE.Mesh(pyramidGeo, pyramidMat);
    pyramidMesh.position.set(-12, 5, -4);
    this.scene.add(pyramidMesh);
    this.shapes.push({ mesh: pyramidMesh, rotSpeedX: 0.008, rotSpeedY: 0.012, baseX: -12, baseY: 5 });

    // 2. Icosahedron (20 faces - Grade 6-8 geometry)
    const icosaGeo = new THREE.IcosahedronGeometry(1.8, 0);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0x0A9155,
      roughness: 0.3,
      metalness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.82
    });
    const icosaMesh = new THREE.Mesh(icosaGeo, icosaMat);
    icosaMesh.position.set(13, 4, -5);
    
    // Wireframe overlay for mathematical precision
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xF7C948, wireframe: true });
    const wireMesh = new THREE.Mesh(icosaGeo, wireMat);
    wireMesh.scale.setScalar(1.02);
    icosaMesh.add(wireMesh);

    this.scene.add(icosaMesh);
    this.shapes.push({ mesh: icosaMesh, rotSpeedX: -0.01, rotSpeedY: 0.007, baseX: 13, baseY: 4 });

    // 3. Octahedron (Grade 4-5 symmetry)
    const octaGeo = new THREE.OctahedronGeometry(1.4, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xF7C948,
      roughness: 0.2,
      metalness: 0.5,
      transparent: true,
      opacity: 0.88
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaMesh.position.set(-10, -6, -2);
    this.scene.add(octaMesh);
    this.shapes.push({ mesh: octaMesh, rotSpeedX: 0.012, rotSpeedY: -0.008, baseX: -10, baseY: -6 });

    // 4. Torus (Infinite circle / Pi concept)
    const torusGeo = new THREE.TorusGeometry(1.6, 0.45, 16, 50);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xD7262B,
      roughness: 0.35,
      metalness: 0.3,
      transparent: true,
      opacity: 0.8
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(11, -7, -3);
    this.scene.add(torusMesh);
    this.shapes.push({ mesh: torusMesh, rotSpeedX: 0.015, rotSpeedY: 0.01, baseX: 11, baseY: -7 });

    // 5. Dodecahedron (12 pentagonal faces - advanced logic)
    const dodecaGeo = new THREE.DodecahedronGeometry(1.3, 0);
    const dodecaMat = new THREE.MeshStandardMaterial({
      color: 0x0A9155,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    dodecaMesh.position.set(-14, -1, -6);
    this.scene.add(dodecaMesh);
    this.shapes.push({ mesh: dodecaMesh, rotSpeedX: -0.006, rotSpeedY: -0.009, baseX: -14, baseY: -1 });
  }

  initDiyaParticles() {
    // Subtle ambient diya sparkles with reduced density for clean, non-distracting background
    const particleCount = 65;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0xF08A24), // Diya Orange
      new THREE.Color(0xF7C948), // Glow Gold
      new THREE.Color(0x0A9155), // Diya Green
      new THREE.Color(0xD7262B)  // Flame Red
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = Math.random() * 0.4 + 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(247, 201, 72, 0.9)');
    grad.addColorStop(0.7, 'rgba(240, 138, 36, 0.4)');
    grad.addColorStop(1, 'rgba(240, 138, 36, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.5,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
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
  }

  updateScroll(progress) {
    this.scrollProgress = progress; // 0 to 1
  }

  animate() {
    requestAnimationFrame(this.animate);

    // Mouse parallax easing
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Camera reacts to mouse & scroll
    this.camera.position.x = this.mouse.x * 1.5;
    this.camera.position.y = this.mouse.y * 1.2;

    const time = performance.now() * 0.001;

    // Rotate and bob each mathematical shape
    this.shapes.forEach((item, idx) => {
      item.mesh.rotation.x += item.rotSpeedX;
      item.mesh.rotation.y += item.rotSpeedY;

      // Gentle floating sine motion
      const bob = Math.sin(time + idx) * 0.4;
      item.mesh.position.y = item.baseY + bob + (this.scrollProgress * 2.5);

      // Scroll responsive drift
      item.mesh.position.x = item.baseX + Math.sin(time * 0.5 + idx) * 0.3;
    });

    // Animate glowing diya particles
    if (this.particles) {
      this.particles.rotation.y = time * 0.04 + this.scrollProgress * 0.8;
      this.particles.rotation.x = time * 0.02;
    }

    // Pulse the diya flame point light
    if (this.diyaLight) {
      this.diyaLight.intensity = 2.2 + Math.sin(time * 4) * 0.5;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
