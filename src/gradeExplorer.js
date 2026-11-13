import { GRADE_CURRICULUM } from './curriculumData.js';
import confetti from 'canvas-confetti';

export class GradeExplorer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.activeGrade = 3;
    this.activeTab = 'units'; // 'units' | 'practice'
    this.render();
  }

  render() {
    const grades = [3, 4, 5, 6, 7, 8];
    const data = GRADE_CURRICULUM[this.activeGrade];

    this.container.innerHTML = `
      <!-- Grade Selection Pills (6 Grades) -->
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        ${grades.map(g => `
          <button type="button" class="py-2.5 px-2 rounded-xl text-center font-heading font-bold text-xs sm:text-sm transition-all ${this.activeGrade === g ? 'bg-diyaGreen text-white shadow-md shadow-diyaGreen/20 scale-[1.02]' : 'bg-stone-100 text-ink/70 hover:bg-stone-200/80 hover:text-ink'}" data-grade-tab="${g}">
            Grade ${g}
          </button>
        `).join('')}
      </div>

      <!-- Grade Header Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-stone-200">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-diyaGreen font-bold text-xs">
              ${data.grade} • ${data.ageRange}
            </span>
            <span class="px-2.5 py-0.5 rounded-full bg-orange-100 text-diyaOrange font-semibold text-xs">
              ${data.badge}
            </span>
          </div>
          <h3 class="font-heading text-xl sm:text-2xl font-bold text-ink">
            Grade ${this.activeGrade} Curriculum &amp; STAAR Mastery
          </h3>
          <p class="text-ink/75 text-xs sm:text-sm mt-1 leading-relaxed">
            ${data.heroDesc}
          </p>
        </div>

        <button type="button" data-open-booking data-grade="Grade ${this.activeGrade}" class="self-start sm:self-center px-4 py-2.5 rounded-xl bg-diyaOrange text-white font-heading font-bold text-xs tracking-wide shadow-md shadow-diyaOrange/20 hover:bg-diyaOrange/90 transition-all flex items-center gap-1.5 whitespace-nowrap">
          <span>Book Assessment</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- View Selector (Sub-tabs) -->
      <div class="flex items-center gap-2 p-1 bg-stone-100 rounded-xl mb-5 text-xs font-heading font-bold">
        <button type="button" class="flex-1 py-2 px-3 rounded-lg transition-all ${this.activeTab === 'units' ? 'bg-white text-ink shadow-sm' : 'text-ink/60 hover:text-ink'}" data-sub-tab="units">
          Core Syllabus &amp; Units
        </button>
        <button type="button" class="flex-1 py-2 px-3 rounded-lg transition-all ${this.activeTab === 'practice' ? 'bg-white text-ink shadow-sm' : 'text-ink/60 hover:text-ink'}" data-sub-tab="practice">
          Interactive Practice Problem
        </button>
      </div>

      <!-- Tab Content Area -->
      ${this.activeTab === 'units' ? `
        <div class="space-y-4">
          <!-- R.S. Aggarwal Conceptual Units -->
          <div class="space-y-2.5">
            <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-diyaGreen">
              R.S. Aggarwal Foundation Units
            </h4>
            <div class="grid grid-cols-1 gap-2.5">
              ${data.rsAggarwalUnits.slice(0, 4).map((u, i) => `
                <div class="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                  <span class="w-6 h-6 rounded-lg bg-diyaGreen/15 text-diyaGreen flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    0${i + 1}
                  </span>
                  <div>
                    <h5 class="font-bold text-xs sm:text-sm text-ink mb-0.5">${u.title}</h5>
                    <p class="text-[11px] sm:text-xs text-ink/70 leading-relaxed">${u.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Texas Math Readiness Focus -->
          <div class="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70">
            <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-diyaOrange mb-2">
              Texas STAAR &amp; Beyond Competencies
            </h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink/80">
              ${data.staarFocus.map(item => `
                <li class="flex items-start gap-2">
                  <svg class="w-3.5 h-3.5 text-diyaOrange flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span class="text-[11px] sm:text-xs leading-snug">${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Weekly Schedule Banner -->
          <div class="p-3 rounded-xl bg-cream border border-stone-200/80 flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-orange-100 text-diyaOrange flex items-center justify-center flex-shrink-0">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <div class="text-[11px] sm:text-xs">
              <span class="font-bold text-ink">Live Cohort Timing: </span>
              <span class="text-ink/75">${data.weeklySchedule}</span>
            </div>
          </div>
        </div>
      ` : `
        <!-- Interactive Practice Problem View -->
        <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-diyaOrange flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-diyaOrange"></span>
              <span>Grade ${this.activeGrade} Practice Question</span>
            </span>
            <span class="text-xs font-semibold text-ink/50">Multi-Step Reasoning</span>
          </div>

          <p class="font-semibold text-sm sm:text-base text-ink leading-relaxed">
            ${data.sampleQuestion.question}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5" id="sample-q-options">
            ${data.sampleQuestion.options.map((opt, idx) => `
              <button type="button" class="sample-opt-btn p-3 text-left rounded-xl border-2 border-stone-200 hover:border-diyaOrange text-xs sm:text-sm font-medium transition-all" data-idx="${idx}">
                <span class="inline-block w-5 h-5 rounded-md bg-stone-100 text-center font-bold text-xs leading-5 mr-1.5 text-ink">${String.fromCharCode(65 + idx)}</span>
                ${opt}
              </button>
            `).join('')}
          </div>

          <div id="sample-q-feedback" class="hidden p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed"></div>
        </div>
      `}
    `;

    this.bindEvents(data);
  }

  bindEvents(data) {
    // Grade tab buttons
    const tabs = this.container.querySelectorAll('[data-grade-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeGrade = parseInt(tab.getAttribute('data-grade-tab'), 10);
        this.render();
      });
    });

    // Sub-tab view toggle buttons
    const subTabs = this.container.querySelectorAll('[data-sub-tab]');
    subTabs.forEach(sub => {
      sub.addEventListener('click', () => {
        this.activeTab = sub.getAttribute('data-sub-tab');
        this.render();
      });
    });

    // Sample question interactive checker
    const optButtons = this.container.querySelectorAll('.sample-opt-btn');
    const feedback = this.container.querySelector('#sample-q-feedback');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
        optButtons.forEach(b => b.disabled = true);

        if (selectedIdx === data.sampleQuestion.correctIndex) {
          btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-900', 'font-bold');
          if (feedback) {
            feedback.className = 'p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed bg-emerald-50 text-emerald-800 border border-emerald-200';
            feedback.innerHTML = `<strong>Correct.</strong> ${data.sampleQuestion.explanation}`;
          }
          try {
            confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 } });
          } catch(e) {}
        } else {
          btn.classList.add('bg-rose-50', 'border-rose-400', 'text-rose-900');
          if (optButtons[data.sampleQuestion.correctIndex]) {
            optButtons[data.sampleQuestion.correctIndex].classList.add('bg-emerald-50', 'border-emerald-400', 'text-emerald-800');
          }
          if (feedback) {
            feedback.className = 'p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed bg-amber-50 text-amber-900 border border-amber-200';
            feedback.innerHTML = `<strong>Explanation:</strong> ${data.sampleQuestion.explanation}`;
          }
        }
        if (feedback) feedback.classList.remove('hidden');
      });
    });

    // Booking modal trigger binding
    const bookingBtns = this.container.querySelectorAll('[data-open-booking]');
    bookingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.mathDiyaModal) {
          const preGrade = btn.getAttribute('data-grade');
          if (preGrade && window.mathDiyaModal.gradeSelect) {
            window.mathDiyaModal.gradeSelect.value = preGrade;
          }
          window.mathDiyaModal.open();
        }
      });
    });
  }
}
