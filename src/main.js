import { ThreeMathUniverse } from './threeCanvas.js';
import { MascotScrollEngine } from './scrollEngine.js';
import { GradeExplorer } from './gradeExplorer.js';
import { StaarQuizSimulator } from './staarQuiz.js';
import { BookingModal } from './bookingModal.js';

// 0. Disable browser automatic scroll restoration so page always reloads at the Hero section
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  // Always ensure we start at the top on initial open or refresh
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));

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

  // 9. Scroll to Top Floating Button
  const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollToTopBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 350) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
        scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
        scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    };

    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    toggleScrollBtn();

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  console.log('MathDiya 3D Scroll-Driven Experience Ready!');
});
