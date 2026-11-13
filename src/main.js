import { ThreeMathUniverse } from './threeCanvas.js';
import { MascotScrollEngine } from './scrollEngine.js';
import { GradeExplorer } from './gradeExplorer.js';
import { StaarQuizSimulator } from './staarQuiz.js';
import { BookingModal } from './bookingModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Universe
  let threeUniverse = null;
  try {
    threeUniverse = new ThreeMathUniverse('three-canvas-container');
  } catch (err) {
    console.warn('Three.js canvas init note:', err);
  }

  // 2. Initialize Mascot Scroll Sync Engine
  const scrollEngine = new MascotScrollEngine('bg-video-element', threeUniverse);

  // 3. Initialize Interactive Grade Explorer
  const gradeExplorer = new GradeExplorer('grade-explorer-container');

  // 4. Initialize Texas Math Readiness (STAAR & Beyond) Simulator
  const staarQuiz = new StaarQuizSimulator('staar-quiz-container');

  // 5. Initialize Parent Booking Modal
  const bookingModal = new BookingModal();
  window.mathDiyaModal = bookingModal;

  // 6. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // 7. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close all others
        faqItems.forEach(other => {
          const otherAns = other.querySelector('.faq-answer');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherAns) otherAns.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 8. Smooth Anchor Scrolling with offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 9. Diya Outro Single-Play Scroll Trigger
  const diyaVideo = document.getElementById('diya-outro-video');
  if (diyaVideo) {
    let hasPlayed = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true;
          diyaVideo.play().catch(err => {
            console.warn('Diya video autoplay interrupted:', err);
          });
          observer.unobserve(diyaVideo);
        }
      });
    }, {
      threshold: 0.2
    });

    observer.observe(diyaVideo);

    // Freeze / rest on the final illuminated frame once complete
    diyaVideo.addEventListener('ended', () => {
      diyaVideo.pause();
    });
  }

  console.log('MathDiya 3D Scroll-Driven Experience Ready!');
});
