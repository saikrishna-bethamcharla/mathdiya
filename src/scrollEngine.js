export class MascotScrollEngine {
  constructor(videoElementId, threeUniverse, diyaVideoId = 'diya-bg-video') {
    this.video = document.getElementById(videoElementId);
    this.diyaVideo = document.getElementById(diyaVideoId);
    this.three = threeUniverse;
    this.duration = 14.92;
    this.targetTime = 0;
    this.currentTime = 0;
    this.lerpSpeed = 0.12;
    this.isReady = false;

    // Diya Video HyperFrames Frame-by-Frame Scrub State
    this.diyaDuration = 3.33;
    this.diyaTargetTime = 0;
    this.diyaCurrentTime = 0;
    this.diyaReady = false;
    this.diyaLerpSpeed = 0.15;

    this.stageCards = document.querySelectorAll('[data-stage]');
    this.progressBar = document.getElementById('scroll-progress-fill');

    this.initVideo();
    this.initDiyaVideo();
    this.bindScroll();
    this.renderLoop = this.renderLoop.bind(this);
    requestAnimationFrame(this.renderLoop);
  }

  initDiyaVideo() {
    if (!this.diyaVideo) return;
    this.diyaVideo.muted = true;
    this.diyaVideo.playsInline = true;

    const onMeta = () => {
      this.diyaDuration = this.diyaVideo.duration || 3.33;
      this.diyaReady = true;
      this.onScroll();
    };

    this.diyaVideo.addEventListener('loadedmetadata', onMeta);
    this.diyaVideo.addEventListener('canplay', () => {
      this.diyaReady = true;
    });

    if (this.diyaVideo.readyState >= 1) {
      onMeta();
    }
  }

  initVideo() {
    if (!this.video) return;

    this.video.muted = true;
    this.video.playsInline = true;

    const onMeta = () => {
      this.duration = this.video.duration || 14.92;
      this.isReady = true;
      this.onScroll();
    };

    this.video.addEventListener('loadedmetadata', onMeta);
    this.video.addEventListener('canplay', () => {
      this.isReady = true;
    });

    if (this.video.readyState >= 1) {
      onMeta();
    }
  }

  bindScroll() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    window.addEventListener('resize', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollY / maxScroll : 0));

    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.width = `${progress * 100}%`;
    }

    // Choreographed video timeline mapped directly to 50/50 frame section layouts:
    // 0.00 - 0.18 (Hero): 0.0s -> 3.5s (3D Logo at center, mascot pops forward and jumps)
    // 0.18 - 0.24 (Walking left): 3.5s -> 6.5s (Mascot walks to frame left)
    // 0.24 - 0.78 (#curriculum, #staar, #grades - ALL ON RIGHT HALF OF FRAME): 6.5s -> 12.8s (Mascot stays at frame LEFT pointing and presenting RIGHT)
    // 0.78 - 1.00 (Reviews, Schedule, FAQ, Footer): 12.8s -> 14.8s (Warm welcoming posture)
    if (this.video) {
      this.video.style.opacity = '1';
      if (progress < 0.18) {
        const p = progress / 0.18;
        this.targetTime = p * 3.5;
      } else if (progress < 0.24) {
        const p = (progress - 0.18) / 0.06;
        this.targetTime = 3.5 + p * 3.0; // 3.5s to 6.5s (walks to left)
      } else if (progress < 0.78) {
        const p = (progress - 0.24) / 0.54;
        this.targetTime = 6.5 + p * 6.3; // 6.5s to 12.8s (STAYS AT FRAME LEFT, presenting right)
      } else {
        const p = Math.min(1, (progress - 0.78) / 0.22);
        this.targetTime = 12.8 + p * 2.0; // 12.8s to 14.8s (warm resting pose)
      }
    } else {
      this.targetTime = progress * this.duration;
    }

    // Update Three.js scroll progress
    if (this.three) {
      this.three.updateScroll(progress);
    }

    // Update active story stages based on scroll progress
    this.updateStages(progress);

    // Seamless background transition & HyperFrames frame-by-frame scrub for Diya
    const outroSection = document.getElementById('diya-outro');
    if (outroSection && this.diyaVideo) {
      const rect = outroSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the outro approaches the viewport
      if (rect.top < windowHeight * 0.9) {
        // Calculate scroll progress through outro to the bottom of the page
        const totalDistance = outroSection.offsetHeight + windowHeight;
        const currentDistance = windowHeight * 0.9 - rect.top;
        const outroProgress = Math.max(0, Math.min(1, currentDistance / totalDistance));

        // Smooth dissolve: mascot video fades out, diya video fades in
        const blend = Math.max(0, Math.min(1, outroProgress / 0.25));
        if (this.video) {
          this.video.style.opacity = (1 - blend).toFixed(2);
        }
        this.diyaVideo.style.opacity = blend.toFixed(2);

        // Soften 3D shapes to give prominence to the authentic diya
        if (this.three && this.three.renderer) {
          this.three.renderer.domElement.style.opacity = (1 - blend * 0.7).toFixed(2);
        }

        // Frame-by-frame scrub target time: 0.0s to duration
        this.diyaTargetTime = outroProgress * this.diyaDuration;
      } else {
        // Reset when scrolled above outro
        if (this.video) {
          this.video.style.opacity = '1';
        }
        this.diyaVideo.style.opacity = '0';
        if (this.three && this.three.renderer) {
          this.three.renderer.domElement.style.opacity = '1';
        }
        this.diyaTargetTime = 0;
      }
    }
  }

  updateStages(progress) {
    // Toggle active classes on floating stage cue cards
    this.stageCards.forEach((card) => {
      const start = parseFloat(card.getAttribute('data-start') || '0');
      const end = parseFloat(card.getAttribute('data-end') || '1');

      if (progress >= start && progress <= end) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });
  }

  renderLoop() {
    // Smooth dampening interpolation for mascot video currentTime
    if (this.video && this.isReady) {
      const diff = this.targetTime - this.currentTime;
      if (Math.abs(diff) > 0.003 && !this.video.seeking) {
        this.currentTime += diff * this.lerpSpeed;
        try {
          this.video.currentTime = Math.max(0, Math.min(this.duration - 0.05, this.currentTime));
        } catch (e) {
          // video seek exception fallback
        }
      }
    }

    // Smooth dampening interpolation for Diya video currentTime (HyperFrames frame-by-frame scrub)
    if (this.diyaVideo && this.diyaReady) {
      const diff = this.diyaTargetTime - this.diyaCurrentTime;
      if (Math.abs(diff) > 0.002 && !this.diyaVideo.seeking) {
        this.diyaCurrentTime += diff * this.diyaLerpSpeed;
        try {
          this.diyaVideo.currentTime = Math.max(0, Math.min(this.diyaDuration - 0.03, this.diyaCurrentTime));
        } catch (e) {
          // video seek exception fallback
        }
      }
    }

    requestAnimationFrame(this.renderLoop);
  }
}
