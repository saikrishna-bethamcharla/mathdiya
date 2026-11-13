import confetti from 'canvas-confetti';

export class StaarQuizSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.questions = [
      {
        grade: "Grades 4–5 TEKS",
        prompt: "A school library bought 6 boxes of math puzzle books. Each box contained 18 books. The librarian kept 12 books for display and distributed the rest equally among 6 classrooms. How many books did each classroom receive?",
        options: [
          { text: "16 books", isCorrect: true },
          { text: "18 books", isCorrect: false },
          { text: "14 books", isCorrect: false },
          { text: "20 books", isCorrect: false }
        ],
        explanation: "Total books: 6 × 18 = 108. After keeping 12: 108 − 12 = 96. Divided among 6 rooms: 96 ÷ 6 = 16 books per room."
      },
      {
        grade: "Grades 6–7 Ratios",
        prompt: "A recipe uses 3 cups of flour for every 2 cups of sugar. If a baker uses 15 cups of flour, how many cups of sugar are needed to keep the exact ratio?",
        options: [
          { text: "10 cups", isCorrect: true },
          { text: "12 cups", isCorrect: false },
          { text: "9 cups", isCorrect: false },
          { text: "8 cups", isCorrect: false }
        ],
        explanation: "The ratio is 3 : 2. Since 15 cups is 5 times the base amount (15 ÷ 3 = 5), multiply the sugar by 5: 2 × 5 = 10 cups."
      },
      {
        grade: "Grade 8 Linear Equations",
        prompt: "A water tank starts with 40 gallons of water and fills at a rate of 5 gallons per minute. Which equation represents the total volume V after m minutes?",
        options: [
          { text: "V = 5m + 40", isCorrect: true },
          { text: "V = 40m + 5", isCorrect: false },
          { text: "V = 5m - 40", isCorrect: false },
          { text: "V = 40(m + 5)", isCorrect: false }
        ],
        explanation: "The starting amount is 40 gallons (y-intercept) and it increases by 5 gallons each minute (rate of change). The equation is V = 5m + 40."
      }
    ];

    this.currentIndex = 0;
    this.score = 0;
    this.render();
  }

  render() {
    const q = this.questions[this.currentIndex];
    this.container.innerHTML = `
      <div class="quiz-card p-6 bg-white/95 rounded-2xl shadow-xl border border-diyaGreen/15">
        <div class="flex items-center justify-between mb-4">
          <span class="px-3 py-1 bg-cream rounded-full text-xs font-bold text-diyaGreen uppercase tracking-wider">${q.grade}</span>
          <span class="text-xs font-semibold text-ink/60">Question ${this.currentIndex + 1} of ${this.questions.length}</span>
        </div>
        
        <h4 class="font-heading text-lg font-bold text-ink mb-4 leading-snug">${q.prompt}</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4" id="quiz-options">
          ${q.options.map((opt, idx) => `
            <button type="button" class="quiz-option-btn text-left p-3.5 rounded-xl border-2 border-stone-200 hover:border-diyaOrange font-medium text-sm transition-all" data-correct="${opt.isCorrect}">
              <span class="inline-block w-6 h-6 rounded-full bg-cream text-center font-bold text-xs leading-6 mr-2 text-ink">${String.fromCharCode(65 + idx)}</span>
              ${opt.text}
            </button>
          `).join('')}
        </div>

        <div id="quiz-feedback" class="hidden p-4 rounded-xl text-sm leading-relaxed mb-4"></div>

        <div class="flex items-center justify-between pt-2 border-t border-stone-100">
          <span class="text-xs text-ink/60">Score: ${this.score}/${this.questions.length}</span>
          <button type="button" id="quiz-next-btn" class="hidden px-5 py-2 rounded-xl bg-diyaGreen text-white text-xs font-bold uppercase tracking-wider hover:bg-diyaGreen/90 transition-all">
            ${this.currentIndex < this.questions.length - 1 ? 'Next Question →' : 'See Summary →'}
          </button>
        </div>
      </div>
    `;

    this.bindOptionClicks(q);
  }

  bindOptionClicks(q) {
    const optionButtons = this.container.querySelectorAll('.quiz-option-btn');
    const feedbackBox = this.container.querySelector('#quiz-feedback');
    const nextBtn = this.container.querySelector('#quiz-next-btn');

    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        optionButtons.forEach(b => b.disabled = true);

        const isCorrect = btn.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          this.score++;
          btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
          feedbackBox.className = 'p-4 rounded-xl text-sm leading-relaxed mb-4 bg-emerald-50 text-emerald-800 border border-emerald-200';
          feedbackBox.innerHTML = `<strong>Correct.</strong> ${q.explanation}`;
          try {
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
          } catch(e) {}
        } else {
          btn.classList.add('bg-rose-50', 'border-rose-400', 'text-rose-800');
          optionButtons.forEach(b => {
            if (b.getAttribute('data-correct') === 'true') {
              b.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
            }
          });
          feedbackBox.className = 'p-4 rounded-xl text-sm leading-relaxed mb-4 bg-amber-50 text-amber-900 border border-amber-200';
          feedbackBox.innerHTML = `<strong>How to solve this:</strong> ${q.explanation}`;
        }

        feedbackBox.classList.remove('hidden');
        nextBtn.classList.remove('hidden');

        nextBtn.addEventListener('click', () => {
          if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.render();
          } else {
            this.renderResults();
          }
        });
      });
    });
  }

  renderResults() {
    this.container.innerHTML = `
      <div class="quiz-card p-6 bg-white/95 rounded-2xl shadow-xl border border-diyaGreen/20 text-center">
        <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-cream flex items-center justify-center">
          ${this.score === 3 
            ? '<svg class="w-7 h-7 text-diyaGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
            : '<svg class="w-7 h-7 text-diyaOrange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'}
        </div>
        <h4 class="font-heading text-xl font-bold text-ink mb-1">Practice Questions Complete</h4>
        <p class="text-sm text-ink/70 mb-4">Your child answered <strong>${this.score} of 3</strong> correctly.</p>
        
        <div class="bg-cream/60 p-4 rounded-xl text-left text-xs leading-relaxed text-ink/80 mb-5 border border-diyaOrange/20">
          <strong class="text-diyaOrange block mb-1 font-bold">Teacher Note:</strong>
          ${this.score === 3 
            ? "Strong arithmetic and word-problem skills. In our 5–8 student cohorts, we build on this with multi-step reasoning and STAAR question strategies."
            : "Good effort. Practicing the steps behind word problems and ratio setups in our weekly classes will help turn these into comfortable skills."}
        </div>

        <button type="button" data-open-booking class="w-full py-3.5 px-6 rounded-xl bg-diyaOrange text-white font-bold text-sm tracking-wide shadow-lg shadow-diyaOrange/30 hover:bg-diyaOrange/90 transition-all">
          Book Free Assessment Class →
        </button>
      </div>
    `;

    const newBtn = this.container.querySelector('[data-open-booking]');
    if (newBtn && window.mathDiyaModal) {
      newBtn.addEventListener('click', () => window.mathDiyaModal.open());
    }
  }
}
