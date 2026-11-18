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
    this.clock = new THREE.Clock();
    this.particles = null;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;

    this.initLights();
    this.initGeometricShapes();
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

    this.shapes = [];

    const symbolTypes = [
      "plus",
      "minus",
      "multiply",
      "divide"
    ];

    const colors = [
      0xF08A24, // Orange
      0x0A9155, // Green
      0xF7C948, // Gold
      0xD7262B  // Red
    ];

    // Create 24 floating mathematical symbols
    for (let i = 0; i < 24; i++) {

      const type = symbolTypes[i % symbolTypes.length];
      const color = colors[i % colors.length];

      const group = new THREE.Group();

      const scale = 0.55 + Math.random() * 0.35;

      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.35
      });

      // Create rectangular bars
      const addBar = (width, height, x, y, rotation = 0) => {

        const geometry = new THREE.BoxGeometry(
          width,
          height,
          0.18
        );

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, 0);
        mesh.rotation.z = rotation;

        group.add(mesh);
      };

      // Create division dots
      const addDot = (x, y) => {

        const geometry = new THREE.CircleGeometry(
          0.13 * scale,
          24
        );

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, 0.02);

        group.add(mesh);
      };

      // PLUS (+)
      if (type === "plus") {

        addBar(1.5 * scale, 0.2 * scale, 0, 0);
        addBar(0.2 * scale, 1.5 * scale, 0, 0);

      }

      // MINUS (-)
      else if (type === "minus") {

        addBar(1.5 * scale, 0.2 * scale, 0, 0);

      }

      // MULTIPLICATION (×)
      else if (type === "multiply") {

        addBar(
          1.7 * scale,
          0.2 * scale,
          0, 0,
          Math.PI / 4
        );

        addBar(
          1.7 * scale,
          0.2 * scale,
          0, 0,
          -Math.PI / 4
        );

      }

      // DIVISION (÷)
      else if (type === "divide") {

        addBar(1.5 * scale, 0.2 * scale, 0, 0);

        addDot(0, 0.42 * scale);
        addDot(0, -0.42 * scale);

      }

      // Calculate visible camera area
      const z = -2 - Math.random() * 3;

      const distance = this.camera.position.z - z;

      const viewHeight =
        2 * Math.tan(
          THREE.MathUtils.degToRad(this.camera.fov / 2)
        ) * distance;

      const viewWidth = viewHeight * this.camera.aspect;

      const halfWidth = viewWidth / 2 - 1;
      const halfHeight = viewHeight / 2 - 1;

      // Random starting position
      const x = (Math.random() * 2 - 1) * halfWidth;
      const y = (Math.random() * 2 - 1) * halfHeight;

      group.position.set(x, y, z);

      // IMPORTANT: Keep symbols facing the camera
      // No X, Y or Z animation rotation

      this.scene.add(group);

      this.shapes.push({

        mesh: group,

        // Random movement speed
        velocityX: (0.4 + Math.random() * 0.7) *
          (Math.random() > 0.5 ? 1 : -1),

        velocityY: (0.3 + Math.random() * 0.6) *
          (Math.random() > 0.5 ? 1 : -1)

      });

    }

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

    // Mouse parallax
    this.mouse.x +=
      (this.mouse.targetX - this.mouse.x) * 0.05;

    this.mouse.y +=
      (this.mouse.targetY - this.mouse.y) * 0.05;

    // Camera movement
    this.camera.position.x = this.mouse.x * 1.5;
    this.camera.position.y = this.mouse.y * 1.2;

    const time = performance.now() * 0.001;

    // Time-based smooth movement
    const delta = Math.min(
      this.clock.getDelta(),
      0.05
    );

    // Move all mathematical symbols
    this.shapes.forEach((item) => {

      const distance =
        this.camera.position.z - item.mesh.position.z;

      const viewHeight =
        2 * Math.tan(
          THREE.MathUtils.degToRad(this.camera.fov / 2)
        ) * distance;

      const viewWidth =
        viewHeight * this.camera.aspect;

      const halfWidth = viewWidth / 2 - 0.8;
      const halfHeight = viewHeight / 2 - 0.8;

      // Move horizontally
      item.mesh.position.x += item.velocityX * delta;

      // Move vertically
      item.mesh.position.y += item.velocityY * delta;

      // Bounce from left and right boundaries
      if (item.mesh.position.x >= halfWidth) {
        item.mesh.position.x = halfWidth;
        item.velocityX = -Math.abs(item.velocityX);
      }

      if (item.mesh.position.x <= -halfWidth) {
        item.mesh.position.x = -halfWidth;
        item.velocityX = Math.abs(item.velocityX);
      }

      // Bounce from top and bottom boundaries
      if (item.mesh.position.y >= halfHeight) {
        item.mesh.position.y = halfHeight;
        item.velocityY = -Math.abs(item.velocityY);
      }

      if (item.mesh.position.y <= -halfHeight) {
        item.mesh.position.y = -halfHeight;
        item.velocityY = Math.abs(item.velocityY);
      }

      // No rotation: symbols always face camera

    });

    // Diya light animation
    if (this.diyaLight) {
      this.diyaLight.intensity =
        2.2 + Math.sin(time * 4) * 0.5;
    }

    // Render scene
    this.renderer.render(this.scene, this.camera);

  }

}
