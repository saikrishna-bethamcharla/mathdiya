import { GRADE_CURRICULUM } from './curriculumData.js';
import confetti from 'canvas-confetti';

export class GradeExplorer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.activeGrade = 3;
    this.render();
  }

  render() {
    const grades = [3, 4, 5, 6, 7, 8];
    const data = GRADE_CURRICULUM[this.activeGrade];

    this.container.innerHTML = `
      <!-- Grade Tabs -->
      <div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        ${grades.map(g => `
          <button type="button" class="grade-pill-tab px-6 py-3 rounded-2xl font-heading font-bold text-sm transition-all whitespace-nowrap ${this.activeGrade === g ? 'active' : ''}" data-grade-tab="${g}">
            Grade ${g}
          </button>
        `).join('')}
      </div>

      <!-- Grade Main Card with 3D Depth -->
      <div class="grade-detail-card bg-white/95 rounded-3xl p-6 sm:p-10 shadow-2xl border border-diyaGreen/20 transition-all">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="px-3.5 py-1 rounded-full bg-emerald-100 text-diyaGreen font-bold text-xs uppercase tracking-wider">
                ${data.grade} • ${data.ageRange}
              </span>
              <span class="px-3 py-1 rounded-full bg-orange-100 text-diyaOrange font-semibold text-xs">
                ${data.badge}
              </span>
            </div>
            <h3 class="font-heading text-2xl sm:text-3xl font-bold text-ink">
              Grade ${this.activeGrade} Curriculum & STAAR Mastery
            </h3>
            <p class="text-ink/75 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              ${data.heroDesc}
            </p>
          </div>

          <div class="flex-shrink-0">
            <button type="button" data-open-booking data-grade="Grade ${this.activeGrade}" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-diyaOrange text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-diyaOrange/30 hover:bg-diyaOrange/90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <span>Book Free Assessment for Grade ${this.activeGrade}</span>
              <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <!-- Two Columns: R.S. Aggarwal Rigor & STAAR Test Confidence -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Col 1: R.S. Aggarwal Conceptual Units -->
          <div class="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div class="flex items-center gap-2.5 mb-4">
              <span class="w-8 h-8 rounded-xl bg-diyaGreen text-white flex items-center justify-center font-bold text-sm">RS</span>
              <h4 class="font-heading font-bold text-lg text-ink">R.S. Aggarwal Conceptual Units</h4>
            </div>
            <p class="text-xs text-ink/70 mb-4">Deep, systematic problem-solving building foundational 'why' intuition:</p>
            <div class="space-y-3">
              ${data.rsAggarwalUnits.map((u, i) => `
                <div class="p-3.5 rounded-xl bg-white border border-stone-100 shadow-sm">
                  <div class="font-bold text-sm text-ink mb-1 flex items-center gap-2">
                    <span class="text-xs font-bold text-diyaGreen">0${i + 1}.</span>
                    <span>${u.title}</span>
                  </div>
                  <p class="text-xs text-ink/70 leading-relaxed">${u.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Col 2: Texas Math Readiness (STAAR & Beyond) & Practice Challenge -->
          <div class="space-y-6">
            <!-- STAAR Competencies -->
            <div class="p-6 rounded-2xl bg-amber-50/50 border border-amber-100">
              <div class="flex items-center gap-2.5 mb-3">
                <span class="w-8 h-8 rounded-xl bg-diyaOrange text-white flex items-center justify-center font-bold text-sm">TX</span>
                <h4 class="font-heading font-bold text-lg text-ink">Texas Math Readiness Focus</h4>
              </div>
              <p class="text-xs text-ink/70 mb-4">Prepared for current STAAR format and future Texas interim progress checks:</p>
              <ul class="space-y-2.5">
                ${data.staarFocus.map(item => `
                  <li class="flex items-start gap-2.5 text-xs text-ink/80 leading-relaxed">
                    <svg class="w-3.5 h-3.5 text-diyaOrange flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Sample Practice Problem -->
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-md">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold uppercase tracking-wider text-diyaOrange flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-diyaOrange"></span>
                  <span>Grade ${this.activeGrade} Practice Problem</span>
                </span>
              </div>
              
              <p class="font-medium text-sm text-ink mb-4 leading-snug">${data.sampleQuestion.question}</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3" id="sample-q-options">
                ${data.sampleQuestion.options.map((opt, idx) => `
                  <button type="button" class="sample-opt-btn p-3 text-left rounded-xl border border-stone-200 text-xs font-medium hover:border-diyaOrange transition-all" data-idx="${idx}">
                    ${opt}
                  </button>
                `).join('')}
              </div>

              <div id="sample-q-feedback" class="hidden p-3 rounded-xl text-xs leading-relaxed"></div>
            </div>

            <!-- Schedule info banner -->
            <div class="p-4 rounded-2xl bg-cream border border-stone-200 flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-orange-100 text-diyaOrange flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
              <div>
                <strong class="text-xs font-bold text-ink block">Live Cohort Timing:</strong>
                <span class="text-xs text-ink/70">${data.weeklySchedule}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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

    // Sample question interactive checker
    const optButtons = this.container.querySelectorAll('.sample-opt-btn');
    const feedback = this.container.querySelector('#sample-q-feedback');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'), 10);
        optButtons.forEach(b => b.disabled = true);

        if (selectedIdx === data.sampleQuestion.correctIndex) {
          btn.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-900', 'font-bold');
          feedback.className = 'p-3 rounded-xl text-xs leading-relaxed bg-emerald-50 text-emerald-800 border border-emerald-200';
          feedback.innerHTML = `<strong>Correct.</strong> ${data.sampleQuestion.explanation}`;
          try {
            confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 } });
          } catch(e) {}
        } else {
          btn.classList.add('bg-rose-100', 'border-rose-400', 'text-rose-900');
          optButtons[data.sampleQuestion.correctIndex].classList.add('bg-emerald-50', 'border-emerald-400', 'text-emerald-800');
          feedback.className = 'p-3 rounded-xl text-xs leading-relaxed bg-amber-50 text-amber-900 border border-amber-200';
          feedback.innerHTML = `<strong>Explanation:</strong> ${data.sampleQuestion.explanation}`;
        }
        feedback.classList.remove('hidden');
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
