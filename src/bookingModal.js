import confetti from 'canvas-confetti';

export class BookingModal {
  constructor() {
    this.modal = document.getElementById('booking-modal');
    this.openButtons = document.querySelectorAll('[data-open-booking]');
    this.closeButton = document.getElementById('booking-modal-close');
    this.backdrop = document.getElementById('booking-modal-backdrop');
    this.modalForm = document.getElementById('booking-form');
    this.inlineForm = document.getElementById('inline-booking-form');
    this.successView = document.getElementById('booking-success-view');
    this.gradeSelect = document.getElementById('field-student-grade');

    this.currentTimezone = 'CT'; // Central Time (Texas default)
    this.selectedSlot = 'Tomorrow 5:00 PM CST';

    this.slotsByTz = {
      'ET': ['Tomorrow 6:00 PM EST', 'Tomorrow 7:30 PM EST', 'Saturday 11:30 AM EST', 'Saturday 3:00 PM EST', 'Sunday 2:00 PM EST'],
      'CT': ['Tomorrow 5:00 PM CST', 'Tomorrow 6:30 PM CST', 'Saturday 10:30 AM CST', 'Saturday 2:00 PM CST', 'Sunday 1:00 PM CST'],
      'MT': ['Tomorrow 4:00 PM MST', 'Tomorrow 5:30 PM MST', 'Saturday 9:30 AM MST', 'Saturday 1:00 PM MST', 'Sunday 12:00 PM MST'],
      'PT': ['Tomorrow 3:00 PM PST', 'Tomorrow 4:30 PM PST', 'Saturday 8:30 AM PST', 'Saturday 12:00 PM PST', 'Sunday 11:00 AM PST']
    };

    this.init();
  }

  init() {
    // Open triggers
    this.openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preGrade = btn.getAttribute('data-grade');
        if (preGrade && this.gradeSelect) {
          this.gradeSelect.value = preGrade;
        }
        this.open();
      });
    });

    // Close triggers
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });

    // Timezone selector buttons across both modal and inline form
    document.querySelectorAll('.tz-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const tz = btn.getAttribute('data-tz');
        this.currentTimezone = tz;

        // Sync all tz buttons of same timezone
        document.querySelectorAll('.tz-pill').forEach(b => {
          if (b.getAttribute('data-tz') === tz) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });

        this.renderAllSlots();
      });
    });

    this.renderAllSlots();

    // Modal Form Submission
    if (this.modalForm) {
      this.modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pName = document.getElementById('field-parent-name')?.value.trim();
        const sName = document.getElementById('field-student-name')?.value.trim();
        const sGrade = document.getElementById('field-student-grade')?.value;
        const pEmail = document.getElementById('field-parent-email')?.value.trim();
        const pPhone = document.getElementById('field-parent-phone')?.value.trim();
        this.displaySuccess(pName, sName, sGrade, pEmail, pPhone);
      });
    }

    // Inline Form Submission
    if (this.inlineForm) {
      this.inlineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pName = document.getElementById('inline-field-parent-name')?.value.trim();
        const sName = document.getElementById('inline-field-student-name')?.value.trim();
        const sGrade = document.getElementById('inline-field-student-grade')?.value;
        const pEmail = document.getElementById('inline-field-parent-email')?.value.trim();
        const pPhone = document.getElementById('inline-field-parent-phone')?.value.trim();
        
        this.open();
        this.displaySuccess(pName, sName, sGrade, pEmail, pPhone);
      });
    }

    // Reset button in success view
    const newBookingBtn = document.getElementById('book-another-btn');
    if (newBookingBtn) {
      newBookingBtn.addEventListener('click', () => {
        if (this.modalForm) {
          this.modalForm.reset();
          this.modalForm.classList.remove('hidden');
        }
        if (this.successView) {
          this.successView.classList.add('hidden');
        }
        this.renderAllSlots();
      });
    }
  }

  renderAllSlots() {
    this.renderSlotContainer('modal-slot-picker-container');
    this.renderSlotContainer('inline-slot-picker-container');
  }

  renderSlotContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slots = this.slotsByTz[this.currentTimezone] || this.slotsByTz['CT'];
    container.innerHTML = '';

    slots.forEach((slot, idx) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `slot-pill ${idx === 0 ? 'selected' : ''}`;
      pill.textContent = slot;
      pill.addEventListener('click', () => {
        document.querySelectorAll(`#${containerId} .slot-pill`).forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.selectedSlot = slot;
      });
      container.appendChild(pill);
    });

    if (slots.length > 0) {
      this.selectedSlot = slots[0];
    }
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  displaySuccess(parentName, studentName, grade, email, phone) {
    document.getElementById('conf-parent').textContent = parentName || 'Valued Parent';
    document.getElementById('conf-student').textContent = `${studentName || 'Student'} (${grade || 'Grade 5'})`;
    document.getElementById('conf-slot').textContent = `${this.selectedSlot} (${this.currentTimezone})`;
    document.getElementById('conf-contact').textContent = `${email || ''} • ${phone || ''}`;

    if (this.modalForm) this.modalForm.classList.add('hidden');
    if (this.successView) this.successView.classList.remove('hidden');

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0A9155', '#F08A24', '#F7C948', '#D7262B']
      });
    } catch (err) {
      console.log('Confetti rendered');
    }
  }
}
