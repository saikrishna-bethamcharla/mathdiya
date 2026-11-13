export class MascotScrollEngine {
  constructor(videoElementId, threeUniverse) {
    this.video = document.getElementById(videoElementId);
    this.three = threeUniverse;
    this.duration = 14.92;
    this.targetTime = 0;
    this.currentTime = 0;
    this.lerpSpeed = 0.12;
    this.isReady = false;
    this.stageCards = document.querySelectorAll('[data-stage]');
    this.progressBar = document.getElementById('scroll-progress-fill');

    this.initVideo();
    this.bindScroll();
    this.renderLoop = this.renderLoop.bind(this);
    requestAnimationFrame(this.renderLoop);
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
    // Smooth dampening interpolation for video currentTime
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

    requestAnimationFrame(this.renderLoop);
  }
}
