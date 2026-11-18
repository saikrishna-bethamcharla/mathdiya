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

    this.lastBooking = null;

    this.init();
    this.initVault();
  }

  // Sanitize helper to prevent any HTML injection
  sanitize(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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

    // Modal Form Submission with Honeypot & Input Validation
    if (this.modalForm) {
      this.modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Honeypot check for bots
        const hp = document.getElementById('field-hp')?.value;
        if (hp) {
          console.warn('Bot detected via modal honeypot.');
          return;
        }

        const pName = document.getElementById('field-parent-name')?.value.trim();
        const sName = document.getElementById('field-student-name')?.value.trim();
        const sGrade = document.getElementById('field-student-grade')?.value;
        const pEmail = document.getElementById('field-parent-email')?.value.trim();
        const pPhone = document.getElementById('field-parent-phone')?.value.trim();

        if (!this.validateInputs(pName, sName, pEmail, pPhone)) return;

        this.saveBooking({ parentName: pName, studentName: sName, grade: sGrade, email: pEmail, phone: pPhone });
        this.displaySuccess(pName, sName, sGrade, pEmail, pPhone);
      });
    }

    // Inline Form Submission with Honeypot & Input Validation
    if (this.inlineForm) {
      this.inlineForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Honeypot check for bots
        const hp = document.getElementById('inline-field-hp')?.value;
        if (hp) {
          console.warn('Bot detected via inline honeypot.');
          return;
        }

        const pName = document.getElementById('inline-field-parent-name')?.value.trim();
        const sName = document.getElementById('inline-field-student-name')?.value.trim();
        const sGrade = document.getElementById('inline-field-student-grade')?.value;
        const pEmail = document.getElementById('inline-field-parent-email')?.value.trim();
        const pPhone = document.getElementById('inline-field-parent-phone')?.value.trim();

        if (!this.validateInputs(pName, sName, pEmail, pPhone)) return;

        this.saveBooking({ parentName: pName, studentName: sName, grade: sGrade, email: pEmail, phone: pPhone });
        this.open();
        this.displaySuccess(pName, sName, sGrade, pEmail, pPhone);
      });
    }

    // Calendar Invite (.ics download) Action Button
    const calBtn = document.getElementById('conf-calendar-btn');
    if (calBtn) {
      calBtn.addEventListener('click', () => {
        if (this.lastBooking) {
          this.downloadCalendarInvite(this.lastBooking);
        }
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

  validateInputs(parentName, studentName, email, phone) {
    if (!parentName || parentName.length < 2) {
      alert("Please enter a valid Parent Name (at least 2 letters).");
      return false;
    }
    if (!studentName || studentName.length < 2) {
      alert("Please enter a valid Student Name (at least 2 letters).");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address (e.g. parent@gmail.com).");
      return false;
    }
    const digitsOnly = (phone || '').replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      alert("Please enter a valid phone or WhatsApp number (minimum 7-10 digits).");
      return false;
    }
    return true;
  }

  saveBooking(bookingData) {
    const record = {
      id: 'MD-' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      slot: this.selectedSlot,
      timezone: this.currentTimezone,
      ...bookingData
    };

    this.lastBooking = record;

    try {
      const existing = JSON.parse(localStorage.getItem('mathdiya_leads_vault') || '[]');
      existing.unshift(record);
      localStorage.setItem('mathdiya_leads_vault', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }
  }

  downloadCalendarInvite(booking) {
    const now = new Date();
    const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const startDate = new Date(Date.now() + 24 * 3600 * 1000);
    startDate.setHours(17, 0, 0, 0);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

    const toIcsDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MathDiya Education//Diagnostic Assessment//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:mathdiya-${booking.id || Date.now()}@mathdiya.com`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${toIcsDate(startDate)}`,
      `DTEND:${toIcsDate(endDate)}`,
      `SUMMARY:MathDiya Free Diagnostic Class — ${booking.studentName} (${booking.grade})`,
      `DESCRIPTION:Free 30-minute diagnostic math assessment with certified MathDiya teacher.\\nSlot: ${booking.slot} (${booking.timezone})\\nParent: ${booking.parentName}\\nContact: Team.mathdiya@gmail.com\\nWebsite: https://mathdiya.com`,
      'LOCATION:Online Live Classroom (Meeting Link sent via WhatsApp/Email)',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MathDiya_Class_${(booking.studentName || 'Student').replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

    // Configure WhatsApp direct dispatch button with complete booking summary
    const waText = encodeURIComponent(
      `Hello MathDiya Team!\n` +
      `I have booked a Free 30-Minute Math Diagnostic Assessment.\n\n` +
      `Parent: ${parentName}\n` +
      `Student: ${studentName} (${grade})\n` +
      `Selected Slot: ${this.selectedSlot} (${this.currentTimezone})\n` +
      `Contact: ${email} | ${phone}\n\n` +
      `Please confirm our live classroom meeting link.`
    );

    const waBtn = document.getElementById('conf-whatsapp-btn');
    if (waBtn) {
      waBtn.href = `https://api.whatsapp.com/send?text=${waText}`;
    }

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

  // Teacher / Admin Lead Vault (Stored Locally with CSV Export)
  initVault() {
    const vaultModal = document.getElementById('lead-vault-modal');
    const openVaultBtn = document.getElementById('open-vault-btn');
    const closeVaultBtn = document.getElementById('close-vault-modal');
    const exportCsvBtn = document.getElementById('export-vault-csv');
    const clearVaultBtn = document.getElementById('clear-vault-btn');
    const vaultBackdrop = document.getElementById('vault-modal-backdrop');

    // Shortcut: Ctrl + Shift + L to open vault anywhere
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        this.renderVault();
        if (vaultModal) vaultModal.classList.remove('hidden');
      }
    });

    if (openVaultBtn && vaultModal) {
      openVaultBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.renderVault();
        vaultModal.classList.remove('hidden');
      });
    }

    if (closeVaultBtn && vaultModal) {
      closeVaultBtn.addEventListener('click', () => vaultModal.classList.add('hidden'));
    }

    if (vaultBackdrop && vaultModal) {
      vaultBackdrop.addEventListener('click', () => vaultModal.classList.add('hidden'));
    }

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => this.exportVaultToCsv());
    }

    if (clearVaultBtn) {
      clearVaultBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all locally stored parent inquiries?')) {
          localStorage.removeItem('mathdiya_leads_vault');
          this.renderVault();
        }
      });
    }
  }

  renderVault() {
    const listContainer = document.getElementById('vault-leads-list');
    const countBadge = document.getElementById('vault-lead-count');
    if (!listContainer) return;

    let leads = [];
    try {
      leads = JSON.parse(localStorage.getItem('mathdiya_leads_vault') || '[]');
    } catch (e) {
      leads = [];
    }

    if (countBadge) countBadge.textContent = `${leads.length} Bookings`;

    if (leads.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-8 text-ink/60 text-xs">
          No bookings stored yet. When parents submit the booking form, their inquiry details will be securely saved here.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = leads.map((l, idx) => `
      <div class="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-ink space-y-1">
        <div class="flex items-center justify-between font-bold">
          <span class="text-diyaOrange font-mono">${this.sanitize(l.id || `MD-${idx + 1}`)}</span>
          <span class="text-[11px] text-ink/50">${new Date(l.createdAt || Date.now()).toLocaleString()}</span>
        </div>
        <div class="font-bold text-sm text-ink">${this.sanitize(l.parentName)} • Student: ${this.sanitize(l.studentName)} (${this.sanitize(l.grade)})</div>
        <div class="text-ink/80"><span class="font-semibold text-diyaGreen">Slot:</span> ${this.sanitize(l.slot)} (${this.sanitize(l.timezone)})</div>
        <div class="text-ink/70">Email: <a href="mailto:${encodeURIComponent(l.email || '')}" class="underline text-diyaGreen">${this.sanitize(l.email)}</a> • Phone: ${this.sanitize(l.phone)}</div>
      </div>
    `).join('');
  }

  exportVaultToCsv() {
    let leads = [];
    try {
      leads = JSON.parse(localStorage.getItem('mathdiya_leads_vault') || '[]');
    } catch (e) {
      leads = [];
    }

    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Date', 'Parent Name', 'Student Name', 'Grade', 'Email', 'Phone', 'Slot', 'Timezone'];
    const rows = leads.map(l => [
      `"${(l.id || '').replace(/"/g, '""')}"`,
      `"${(l.createdAt || '').replace(/"/g, '""')}"`,
      `"${(l.parentName || '').replace(/"/g, '""')}"`,
      `"${(l.studentName || '').replace(/"/g, '""')}"`,
      `"${(l.grade || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.slot || '').replace(/"/g, '""')}"`,
      `"${(l.timezone || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MathDiya_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
