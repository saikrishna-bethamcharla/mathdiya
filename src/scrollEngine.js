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
    this.currentPhaseIndicator = document.getElementById('phase-tag');

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

    // Map scroll progress to video time (0 to duration)
    this.targetTime = progress * this.duration;

    // Update Three.js scroll progress
    if (this.three) {
      this.three.updateScroll(progress);
    }

    // Update active story stages based on scroll progress
    this.updateStages(progress);
  }

  updateStages(progress) {
    // Phase 1 (0.00 - 0.22): Identity & Welcome
    // Phase 2 (0.22 - 0.48): The Mascot Leap & Core Pillars
    // Phase 3 (0.48 - 0.74): Left Anchor -> Grade Explorer & STAAR Focus
    // Phase 4 (0.74 - 1.00): Right Anchor -> 4-Step Pathway & Booking
    let phaseName = "1. Light Up Math";
    if (progress > 0.74) {
      phaseName = "4. Path to Mastery & Booking";
    } else if (progress > 0.48) {
      phaseName = "3. Grades 3–8 & STAAR Readiness";
    } else if (progress > 0.22) {
      phaseName = "2. Meet Diya Dost & Pillars";
    }

    if (this.currentPhaseIndicator) {
      this.currentPhaseIndicator.textContent = phaseName;
    }

    // Toggle active classes on floating stage cue cards
    this.stageCards.forEach((card) => {
      const stage = card.getAttribute('data-stage');
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
