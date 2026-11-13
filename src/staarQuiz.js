import confetti from 'canvas-confetti';

export class StaarQuizSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.questions = [
      {
        grade: "Grade 4–5 TEKS Focus",
        prompt: "A school library bought 6 boxes of math puzzle books. Each box contained 18 books. The librarian kept 12 books for display and distributed the rest equally among 6 classrooms. How many books did each classroom receive?",
        options: [
          { text: "16 books", isCorrect: true },
          { text: "18 books", isCorrect: false },
          { text: "14 books", isCorrect: false },
          { text: "20 books", isCorrect: false }
        ],
        explanation: "Total books = 6 × 18 = 108. After keeping 12 for display: 108 − 12 = 96 books remaining. Divided equally among 6 classrooms: 96 ÷ 6 = 16 books per classroom!"
      },
      {
        grade: "Grade 6–7 Ratio & Rate Focus",
        prompt: "A recipe uses 3 cups of flour for every 2 cups of sugar. If a chef makes a large batch using 15 cups of flour, how many cups of sugar are needed to maintain the exact ratio?",
        options: [
          { text: "10 cups", isCorrect: true },
          { text: "12 cups", isCorrect: false },
          { text: "9 cups", isCorrect: false },
          { text: "8 cups", isCorrect: false }
        ],
        explanation: "Ratio is Flour : Sugar = 3 : 2. Since 15 cups of flour is 5 times the base recipe (15 ÷ 3 = 5), multiply the sugar by 5: 2 × 5 = 10 cups of sugar."
      },
      {
        grade: "Grade 8 Pre-Algebra & Function Focus",
        prompt: "A water tank starts with 40 gallons of water and fills at a steady rate of 5 gallons per minute. Which equation best models the total volume of water V after m minutes?",
        options: [
          { text: "V = 5m + 40", isCorrect: true },
          { text: "V = 40m + 5", isCorrect: false },
          { text: "V = 5m - 40", isCorrect: false },
          { text: "V = 40(m + 5)", isCorrect: false }
        ],
        explanation: "The initial quantity (y-intercept b) is 40 gallons. The rate of change (slope m) is +5 gallons/minute. Therefore, V = 5m + 40."
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
            ${this.currentIndex < this.questions.length - 1 ? 'Next Question →' : 'See Full Analysis →'}
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
        // Disable further clicks
        optionButtons.forEach(b => b.disabled = true);

        const isCorrect = btn.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          this.score++;
          btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
          feedbackBox.className = 'p-4 rounded-xl text-sm leading-relaxed mb-4 bg-emerald-50 text-emerald-800 border border-emerald-200';
          feedbackBox.innerHTML = `<strong>🎉 Spot on!</strong> ${q.explanation}`;
          try {
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
          } catch(e) {}
        } else {
          btn.classList.add('bg-rose-50', 'border-rose-400', 'text-rose-800');
          // Highlight correct option
          optionButtons.forEach(b => {
            if (b.getAttribute('data-correct') === 'true') {
              b.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
            }
          });
          feedbackBox.className = 'p-4 rounded-xl text-sm leading-relaxed mb-4 bg-amber-50 text-amber-900 border border-amber-200';
          feedbackBox.innerHTML = `<strong>💡 Conceptual Breakdown:</strong> ${q.explanation}`;
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
        <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-cream flex items-center justify-center text-3xl">
          ${this.score === 3 ? '🏆' : this.score >= 2 ? '⭐' : '🌱'}
        </div>
        <h4 class="font-heading text-xl font-bold text-ink mb-1">Diagnostic Simulation Complete!</h4>
        <p class="text-sm text-ink/70 mb-4">Your child scored <strong>${this.score} out of 3</strong> in foundational problem solving.</p>
        
        <div class="bg-cream/60 p-4 rounded-xl text-left text-xs leading-relaxed text-ink/80 mb-5 border border-diyaOrange/20">
          <strong class="text-diyaOrange block mb-1 font-bold">Mentor Insight:</strong>
          ${this.score === 3 
            ? "Outstanding foundation! In MathDiya's small cohorts (5–8 students), your child will be accelerated with multi-step non-routine problems and competition-level logic from R.S. Aggarwal."
            : "Strong conceptual potential! They will benefit immensely from MathDiya's structured 2× weekly sessions where teachers uncover underlying 'why' concepts rather than rote steps."}
        </div>

        <button type="button" data-open-booking class="w-full py-3.5 px-6 rounded-xl bg-diyaOrange text-white font-bold text-sm tracking-wide shadow-lg shadow-diyaOrange/30 hover:bg-diyaOrange/90 transition-all">
          Book Full 1-on-1 Free Assessment Class →
        </button>
      </div>
    `;

    // Rebind open booking triggers inside results
    const newBtn = this.container.querySelector('[data-open-booking]');
    if (newBtn && window.mathDiyaModal) {
      newBtn.addEventListener('click', () => window.mathDiyaModal.open());
    }
  }
}
