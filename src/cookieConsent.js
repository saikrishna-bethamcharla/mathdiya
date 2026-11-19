export class CookieConsentManager {
  constructor() {
    this.storageKey = 'mathdiya_cookie_consent';
    this.banner = document.getElementById('cookie-consent-banner');
    this.customizePanel = document.getElementById('cookie-customize-panel');
    this.toggleCustomizeBtn = document.getElementById('cookie-toggle-customize');
    this.saveCustomBtn = document.getElementById('cookie-save-custom');
    this.acceptAllBtn = document.getElementById('cookie-accept-all');
    this.essentialOnlyBtn = document.getElementById('cookie-essential-only');
    this.toggleFunctional = document.getElementById('cookie-toggle-functional');
    this.toggleAnalytics = document.getElementById('cookie-toggle-analytics');
    this.openPreferencesBtns = document.querySelectorAll('[data-open-cookie-preferences]');

    if (!this.banner) return;
    this.init();
  }

  getConsent() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveConsent(consentObj) {
    try {
      const fullConsent = {
        ...consentObj,
        essential: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(fullConsent));
      window.mathDiyaCookieConsent = fullConsent;
    } catch (e) {}
    this.hideBanner();
  }

  showBanner() {
    if (!this.banner) return;
    this.banner.classList.remove('hidden');
    // Set checkboxes to match current saved settings or defaults
    const existing = this.getConsent();
    if (existing) {
      if (this.toggleFunctional) this.toggleFunctional.checked = !!existing.functional;
      if (this.toggleAnalytics) this.toggleAnalytics.checked = !!existing.analytics;
    }
  }

  hideBanner() {
    if (!this.banner) return;
    this.banner.classList.add('hidden');
  }

  init() {
    const consent = this.getConsent();
    if (!consent) {
      // First visit: show smoothly after initial page render (700ms)
      setTimeout(() => {
        this.showBanner();
      }, 700);
    } else {
      window.mathDiyaCookieConsent = consent;
    }

    if (this.acceptAllBtn) {
      this.acceptAllBtn.addEventListener('click', () => {
        this.saveConsent({ functional: true, analytics: true });
      });
    }

    if (this.essentialOnlyBtn) {
      this.essentialOnlyBtn.addEventListener('click', () => {
        this.saveConsent({ functional: false, analytics: false });
      });
    }

    if (this.toggleCustomizeBtn && this.customizePanel) {
      this.toggleCustomizeBtn.addEventListener('click', () => {
        const isHidden = this.customizePanel.classList.contains('hidden');
        if (isHidden) {
          this.customizePanel.classList.remove('hidden');
          if (this.saveCustomBtn) this.saveCustomBtn.classList.remove('hidden');
          this.toggleCustomizeBtn.textContent = 'Hide Details';
        } else {
          this.customizePanel.classList.add('hidden');
          if (this.saveCustomBtn) this.saveCustomBtn.classList.add('hidden');
          this.toggleCustomizeBtn.textContent = 'Customize';
        }
      });
    }

    if (this.saveCustomBtn) {
      this.saveCustomBtn.addEventListener('click', () => {
        this.saveConsent({
          functional: this.toggleFunctional ? this.toggleFunctional.checked : true,
          analytics: this.toggleAnalytics ? this.toggleAnalytics.checked : false
        });
      });
    }

    // Reopen preferences when clicking "Cookie Preferences" in footer or elsewhere
    this.openPreferencesBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showBanner();
        if (this.customizePanel) {
          this.customizePanel.classList.remove('hidden');
          if (this.saveCustomBtn) this.saveCustomBtn.classList.remove('hidden');
          if (this.toggleCustomizeBtn) this.toggleCustomizeBtn.textContent = 'Hide Details';
        }
      });
    });
  }
}
