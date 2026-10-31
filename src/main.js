import './style.css';
import { 
  benchmarkPrices, 
  sampleLots, 
  defaultUsers, 
  verifiedRecyclers, 
  eprCertificates, 
  vernacularTranslations 
} from './data/mockData.js';

import { renderSidebar } from './components/Sidebar.js';
import { renderHeader } from './components/Header.js';
import { createLucideIcon } from './utils/icons.js';

// Views
import { renderLandingPageView } from './views/LandingPageView.js';
import { renderAuthView } from './views/AuthView.js';
import { renderCollectorDashboardView } from './views/CollectorDashboardView.js';
import { renderCollectorView } from './views/CollectorView.js';
import { renderRecyclerDashboardView } from './views/RecyclerDashboardView.js';
import { renderRecyclerMarketplaceView } from './views/RecyclerMarketplaceView.js';
import { renderHandoverView } from './views/HandoverView.js';
import { renderEPRComplianceView } from './views/EPRComplianceView.js';
import { renderPrivacyPolicyModal } from './views/PrivacyPolicyView.js';

// Supabase Real User Authentication & JWT Route Guarding
import { 
  getActiveSession, 
  saveActiveSession, 
  clearActiveSession, 
  checkRoutePermission, 
  authenticateWithSupabase,
  signOutUser,
  generateJWT,
  verifyJWT 
} from './utils/supabase.js';

import { 
  loadCloudData, 
  syncLotToCloud, 
  syncBidToCloud, 
  syncHandoverToCloud, 
  initRealtimeSubscription 
} from './utils/supabaseSync.js';

import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class App {
  constructor() {
    this.state = {
      currentView: 'landing', // Starts on Landing Page
      currentTheme: localStorage.getItem('kabadi_theme') || 'light',
      isOnline: true,
      currentLang: 'en',
      isPrivacyModalOpen: false,
      
      // User, Supabase & JWT Auth State
      currentUser: null, // Null on landing/auth until logged in
      jwtToken: null, // Signed JWT token enforcing session credentials
      currentRole: 'collector', // 'collector' or 'recycler'
      authMode: 'signin', // 'signin' or 'signup'
      authRole: 'collector', // 'collector' or 'recycler'
      registeredUsers: [...defaultUsers],

      // Data Collections
      sampleLots: [...sampleLots],
      benchmarkPrices: [...benchmarkPrices],
      verifiedRecyclers: [...verifiedRecyclers],
      eprCertificates: [...eprCertificates],

      // Collector Upload & AI State
      isAiScanning: false,
      currentAiScan: {
        title: 'High-Grade PCBs',
        category: 'High-Grade Printed Circuit Boards (PCBs)',
        rate: 480,
        conf: 96.8,
        img: '/materials/pcb.jpg',
        historicalMin: 460,
        historicalMax: 505
      },
      lotFormWeight: 15.0,
      collectorInputPrice: 480, // Collector asking price (defaults to AI historical rate)

      // Recycler Filtering State
      recyclerFilters: {
        material: 'all',
        minPrice: 0,
        maxPrice: 1000,
        radiusKm: 'all'
      },

      // Handover & Modal
      selectedHandoverLotId: 'LOT-2026-0891',
      activeModal: null,
      targetBidLotId: null,

      // Mobile Navigation & Responsive Drawer State
      isMobileNavOpen: false,

      // Entry Logo Splash Animation State
      showSplash: !sessionStorage.getItem('kabadi_splash_seen'),
      isSplashDismissing: false
    };

    this.splashTimer = null;

    // Attach app state to window for event access
    window.appState = this;
    this.init();
  }

  async init() {
    document.documentElement.setAttribute('data-theme', this.state.currentTheme);
    
    // Start splash timer if splash screen is active
    if (this.state.showSplash) {
      this.startSplashTimer();
    }

    // Check and restore active Supabase / JWT authenticated session
    const activeSession = getActiveSession();
    if (activeSession && activeSession.user) {
      this.state.jwtToken = activeSession.token;
      this.state.currentUser = activeSession.user;
      this.state.currentRole = activeSession.role;
      console.log(`[Supabase & JWT Auth] Session active for ${activeSession.user.name} (${activeSession.role})`);
      await this.restoreCloudProgress();
    }

    // Subscribe to realtime database changes
    initRealtimeSubscription(() => {
      this.restoreCloudProgress();
    });

    this.render();
  }

  async restoreCloudProgress() {
    try {
      const { lots, certificates } = await loadCloudData(this.state.currentUser);
      if (lots && lots.length > 0) {
        const cloudLots = lots.map(l => ({
          id: l.id,
          collectorName: l.collector_name || 'Informal Collector',
          collectorId: l.collector_id,
          location: 'Dharavi Sector 4, Mumbai',
          distanceKm: 2.8,
          category: l.category,
          grade: l.grade || 'Grade A',
          weightKg: Number(l.weight_kg) || 15.0,
          collectorPriceRate: Number(l.asking_rate_per_kg) || 480,
          estimatedRateKg: Number(l.asking_rate_per_kg) || 480,
          estimatedTotal: Number(l.total_valuation) || (Number(l.weight_kg) * Number(l.asking_rate_per_kg)),
          aiConfidence: Number(l.ai_confidence || 96.8),
          status: l.status || 'Open for Bidding',
          matchedRecycler: l.matched_recycler_name,
          paymentMethod: 'UPI Instant Escrow',
          timestamp: new Date(l.created_at).toLocaleString(),
          photoUrl: l.image_url || '/materials/pcb.jpg',
          syncedCloud: true
        }));

        const cloudIds = new Set(cloudLots.map(l => l.id));
        const remainingLocal = this.state.sampleLots.filter(l => !cloudIds.has(l.id));
        this.state.sampleLots = [...cloudLots, ...remainingLocal];
      }

      if (certificates && certificates.length > 0) {
        const cloudCerts = certificates.map(c => ({
          id: c.id,
          lotId: c.lot_id,
          recycler: c.recycler_name,
          collector: c.collector_name,
          material: c.material_category,
          qtyMt: Number(c.quantity_mt),
          co2OffsetMt: Number(c.co2_offset_mt),
          greenCreditsKwh: Number(c.green_credits_kwh),
          status: c.cpcb_portal_sync_status || 'SYNCED_VERIFIED',
          issuedDate: new Date(c.issued_at).toLocaleDateString()
        }));

        const certIds = new Set(cloudCerts.map(c => c.id));
        const remainingLocal = this.state.eprCertificates.filter(c => !certIds.has(c.id));
        this.state.eprCertificates = [...cloudCerts, ...remainingLocal];
      }

      this.render();
    } catch (err) {
      console.warn('[Supabase Progress Restore] Notice:', err.message);
    }
  }

  // Theme & Network Controls
  toggleTheme() {
    this.state.currentTheme = this.state.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('kabadi_theme', this.state.currentTheme);
    document.documentElement.setAttribute('data-theme', this.state.currentTheme);
    this.render();
  }

  toggleOnlineStatus() {
    this.state.isOnline = !this.state.isOnline;
    this.render();
  }

  setLanguage(lang) {
    this.state.currentLang = lang;
    this.render();
  }

  // Mobile Drawer Navigation Controls
  toggleMobileNav() {
    this.state.isMobileNavOpen = !this.state.isMobileNavOpen;
    this.render();
  }

  closeMobileNav() {
    if (this.state.isMobileNavOpen) {
      this.state.isMobileNavOpen = false;
      this.render();
    }
  }

  // Entry Logo Splash Screen Lifecycle & Replay
  playSplashAnimation() {
    this.state.showSplash = true;
    this.state.isSplashDismissing = false;
    this.render();
    this.startSplashTimer();
  }

  startSplashTimer() {
    if (this.splashTimer) clearTimeout(this.splashTimer);
    this.splashTimer = setTimeout(() => {
      this.dismissSplash();
    }, 2400);
  }

  dismissSplash() {
    if (this.splashTimer) {
      clearTimeout(this.splashTimer);
      this.splashTimer = null;
    }
    
    const splashEl = document.getElementById('entry-splash-screen');
    if (splashEl && !this.state.isSplashDismissing) {
      this.state.isSplashDismissing = true;
      splashEl.classList.add('splash-dismissing');
      setTimeout(() => {
        this.state.showSplash = false;
        this.state.isSplashDismissing = false;
        sessionStorage.setItem('kabadi_splash_seen', '1');
        if (splashEl && splashEl.parentNode) {
          splashEl.parentNode.removeChild(splashEl);
        }
      }, 500);
    } else {
      this.state.showSplash = false;
      this.state.isSplashDismissing = false;
      sessionStorage.setItem('kabadi_splash_seen', '1');
    }
  }

  renderSplashOverlay() {
    if (!this.state.showSplash) return '';
    return `
      <div id="entry-splash-screen" class="entry-splash-screen" onclick="window.appState.dismissSplash()">
        <div class="splash-backdrop-fx"></div>
        <div class="splash-card neu-box" onclick="event.stopPropagation()">
          <!-- Ambient Orbital Halo Rings & Animated Logo -->
          <div class="splash-halo-wrapper">
            <div class="splash-orbit-ring ring-1"></div>
            <div class="splash-orbit-ring ring-2"></div>
            <div class="splash-logo-container">
              <img src="/logo.png" alt="KABADISETU" class="splash-logo-img" />
            </div>
          </div>

          <!-- Animated Brand Typography -->
          <div class="splash-text-container">
            <div class="splash-hindi-title">कबाड़ी सेतु</div>
            <h1 class="splash-english-title">KABADISETU</h1>
            <p class="splash-tagline">Informal Scrap Collectors <span class="splash-arrow">⮀</span> CPCB Formal Recyclers</p>
          </div>

          <!-- Tech Protocol Badge -->
          <div class="splash-protocol-badge">
            <span class="protocol-dot"></span>
            <span>AI Material Diagnostic • CPCB E-Waste Rules 2022 • Instant Escrow</span>
          </div>

          <!-- Animated Loading Progress Bar -->
          <div class="splash-loader-bar-track">
            <div class="splash-loader-bar-fill"></div>
          </div>
          <div class="splash-status-text">Connecting Informal Pickers to Circular Value Chains...</div>

          <!-- Skip / Enter Platform Action Button -->
          <button class="neu-btn splash-enter-btn" onclick="window.appState.dismissSplash()">
            <span>Enter Platform</span>
            <span class="splash-enter-arrow">→</span>
          </button>
        </div>
      </div>
    `;
  }

  // Authentication & Session Management
  setAuthMode(mode) {
    this.state.authMode = mode;
    this.render();
  }

  setAuthRole(role) {
    this.state.authRole = role;
    this.render();
  }

  async handleAuthSubmit(event) {
    event.preventDefault();
    const isSignUp = this.state.authMode === 'signup';
    const role = this.state.authRole || 'collector';
    const email = document.getElementById('auth-email')?.value || '';
    const password = document.getElementById('auth-password')?.value || '';
    const username = document.getElementById('auth-username')?.value || email.split('@')[0];
    const phone = document.getElementById('auth-phone')?.value || '+91 98200 55432';
    const cpcbReg = document.getElementById('auth-cpcb')?.value || 'CPCB/E-WASTE/REG-9011';

    try {
      // Authenticate via Supabase Auth API & issue signed JWT
      const authResult = await authenticateWithSupabase(email, password, role, isSignUp, {
        name: username,
        phone,
        cpcbRegistration: role === 'recycler' ? cpcbReg : null
      });

      // Handle email confirmation requirement
      if (authResult.requiresEmailConfirmation) {
        alert(`📧 Verification Email Sent!\n\nA confirmation link has been sent to:\n${authResult.email}\n\nPlease check your email inbox and click the verification link to activate your account. Once verified, return here to sign in!`);
        this.state.authMode = 'signin';
        this.render();
        return;
      }

      this.state.jwtToken = authResult.token;
      this.state.currentUser = authResult.user;
      this.state.currentRole = role;

      // Restore user progress & lots from Supabase cloud
      await this.restoreCloudProgress();

      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });

      // Route to respective role-specific dashboard with JWT guard
      if (role === 'collector') {
        this.navigateTo('collector-dashboard');
      } else {
        this.navigateTo('recycler-dashboard');
      }
    } catch (err) {
      console.error('[Supabase Auth Error]', err);
      const errMsg = err?.message || err?.msg || err?.error_description || (typeof err === 'object' ? (err?.statusText || JSON.stringify(err)) : String(err));
      alert(`Authentication Error: ${errMsg || 'Could not verify credentials'}`);
    }
  }

  quickLogin(role) {
    const demoUser = this.state.registeredUsers.find(u => u.role === role) || this.state.registeredUsers[0];
    const token = generateJWT({
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      role: demoUser.role,
      phone: demoUser.phone || '+91 98200 12345',
      cpcbRegistration: demoUser.cpcbRegistration || null
    });

    saveActiveSession(demoUser, token);
    this.state.jwtToken = token;
    this.state.currentUser = demoUser;
    this.state.currentRole = role;

    confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });

    if (role === 'collector') {
      this.navigateTo('collector-dashboard');
    } else {
      this.navigateTo('recycler-dashboard');
    }
  }

  async logout() {
    await signOutUser();
    this.state.currentUser = null;
    this.state.jwtToken = null;
    this.navigateTo('landing');
  }

  // Go Back navigation handler (returns to parent dashboard or landing page)
  goBack() {
    const v = this.state.currentView;
    if (v.startsWith('collector-') && v !== 'collector-dashboard') {
      this.navigateTo('collector-dashboard');
    } else if (v.startsWith('recycler-') && v !== 'recycler-dashboard') {
      this.navigateTo('recycler-dashboard');
    } else {
      this.navigateTo('landing');
    }
  }

  // Smooth scroll to landing sections or switch view then scroll
  scrollToSection(sectionId) {
    if (this.state.currentView !== 'landing') {
      this.state.currentView = 'landing';
      this.render();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Strict Role-Based JWT Route Guard (Prevents Collectors from entering Recycler portal & vice-versa)
  navigateTo(viewId, param = null) {
    // If param is passed for auth role preselection
    if (viewId === 'auth' && param && param.role) {
      this.state.authRole = param.role;
    }

    // Public EPR transparency inspection (allow public auditor mode if not logged in)
    if (['collector-epr', 'recycler-epr'].includes(viewId) && !this.state.currentUser) {
      const guestAuditor = {
        id: 'CPCB-AUDIT-GUEST',
        name: 'Public Auditor / Citizen',
        email: 'auditor@cpcb.gov.in',
        role: viewId.startsWith('recycler') ? 'recycler' : 'collector',
        cpcbRegistration: 'CPCB/EPR/PUBLIC-AUDIT'
      };
      const token = generateJWT(guestAuditor);
      saveActiveSession(guestAuditor, token);
      this.state.jwtToken = token;
      this.state.currentUser = guestAuditor;
      this.state.currentRole = guestAuditor.role;
    }

    // Public views (landing and auth) are always accessible
    if (!['landing', 'auth', 'collector-epr', 'recycler-epr'].includes(viewId)) {
      // Validate active session
      const activeSession = getActiveSession();
      if (!activeSession || !this.state.currentUser) {
        alert('🔒 Authentication Required: Please sign in with your credentials to generate a secure JWT access token.');
        this.state.authRole = viewId.startsWith('recycler-') ? 'recycler' : 'collector';
        this.state.currentView = 'auth';
        this.render();
        return;
      }

      // Check Cryptographic JWT token validity
      const jwtClaims = verifyJWT(activeSession.token);
      if (!jwtClaims) {
        alert('⚠️ Session Expired: Your cryptographic access token has expired or is invalid. Please sign in again.');
        this.logout();
        return;
      }

      // Enforce strict dashboard separation (Collectors cannot access Recycler views, and Recyclers cannot access Collector views)
      const permission = checkRoutePermission(viewId, this.state.currentRole);
      if (!permission.allowed) {
        alert(`🛡️ JWT Security Route Guard:\n\n${permission.reason}`);
        this.state.currentView = permission.redirectView;
        this.render();
        return;
      }
    }

    if (param && (viewId === 'collector-lots' || viewId === 'recycler-handover')) {
      this.state.selectedHandoverLotId = param;
    }

    this.state.isMobileNavOpen = false;
    this.state.currentView = viewId;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Collector AI Scanning & Material Recognition
  triggerAiScan(presetIdx) {
    this.state.isAiScanning = true;
    this.render();

    setTimeout(() => {
      const presets = [
        { 
          title: 'High-Grade PCBs', 
          category: 'High-Grade Printed Circuit Boards (PCBs)', 
          rate: 480, 
          conf: 96.8, 
          img: '/materials/pcb.jpg',
          historicalMin: 460,
          historicalMax: 505
        },
        { 
          title: 'Heavy Copper Wires', 
          category: 'Copper Wires & Transformer Coils', 
          rate: 680, 
          conf: 98.4, 
          img: '/materials/copper.jpg',
          historicalMin: 650,
          historicalMax: 710
        },
        { 
          title: 'Li-ion Battery Modules', 
          category: 'Lithium-Ion Battery Modules', 
          rate: 320, 
          conf: 94.2, 
          img: '/materials/battery.jpg',
          historicalMin: 300,
          historicalMax: 345
        },
        { 
          title: 'LCD Displays & Glass', 
          category: 'Display Glass & LCD Modules', 
          rate: 95, 
          conf: 92.1, 
          img: '/materials/display.jpg',
          historicalMin: 85,
          historicalMax: 105
        }
      ];

      this.state.currentAiScan = presets[presetIdx] || presets[0];
      this.state.collectorInputPrice = this.state.currentAiScan.rate;
      this.state.isAiScanning = false;
      this.render();
    }, 800);
  }

  handleCustomImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    this.state.isAiScanning = true;
    this.render();

    reader.onload = (e) => {
      setTimeout(() => {
        // Match or simulate classification
        const fileName = file.name.toLowerCase();
        let cat = 'High-Grade Printed Circuit Boards (PCBs)';
        let rate = 480;
        let conf = 95.4;

        if (fileName.includes('copper') || fileName.includes('wire') || fileName.includes('coil')) {
          cat = 'Copper Wires & Transformer Coils';
          rate = 680;
          conf = 97.2;
        } else if (fileName.includes('battery') || fileName.includes('cell') || fileName.includes('lion')) {
          cat = 'Lithium-Ion Battery Modules';
          rate = 320;
          conf = 94.8;
        } else if (fileName.includes('display') || fileName.includes('monitor') || fileName.includes('screen')) {
          cat = 'Display Glass & LCD Modules';
          rate = 95;
          conf = 91.5;
        }

        this.state.currentAiScan = {
          title: 'Uploaded Material',
          category: cat,
          rate,
          conf,
          img: e.target.result,
          historicalMin: Math.round(rate * 0.95),
          historicalMax: Math.round(rate * 1.05)
        };
        this.state.collectorInputPrice = rate;
        this.state.isAiScanning = false;
        this.render();
      }, 1000);
    };

    reader.readAsDataURL(file);
  }

  updateLotWeight(val) {
    const weight = parseFloat(val) || 1;
    this.state.lotFormWeight = weight;

    // Direct DOM updates for ultra-smooth 60fps sliding without teardown
    const weightDisplayVal = document.getElementById('weight-display-val');
    if (weightDisplayVal) weightDisplayVal.innerText = weight.toFixed(1);

    const weightDisplay = document.getElementById('weight-display');
    if (weightDisplay) weightDisplay.innerText = `${weight.toFixed(1)} kg`;

    const weightSlider = document.getElementById('input-weight-range');
    if (weightSlider) {
      if (weightSlider.value != weight) weightSlider.value = weight;
      const min = parseFloat(weightSlider.min) || 1;
      const max = parseFloat(weightSlider.max) || 200;
      const pct = Math.min(100, Math.max(0, ((weight - min) / (max - min)) * 100));
      weightSlider.style.setProperty('--slider-progress', `${pct}%`);
    }

    const askingRate = this.state.collectorInputPrice !== undefined 
      ? this.state.collectorInputPrice 
      : (this.state.currentAiScan?.rate || 480);
    const aiRate = this.state.currentAiScan?.rate || 480;
    const collectorTotal = Math.round(weight * askingRate);
    const aiTotal = Math.round(weight * aiRate);

    const collectorValDisplay = document.getElementById('collector-valuation-display');
    if (collectorValDisplay) collectorValDisplay.innerText = `₹${collectorTotal.toLocaleString()}`;

    const aiValDisplay = document.getElementById('ai-valuation-display');
    if (aiValDisplay) aiValDisplay.innerText = `₹${aiTotal.toLocaleString()}`;

    const calcSub = document.getElementById('valuation-calc-sub');
    if (calcSub) calcSub.innerText = `(${weight.toFixed(1)} kg × ₹${askingRate}/kg)`;

    // Update active state of preset buttons
    document.querySelectorAll('.slider-preset-btn').forEach(btn => {
      const btnWeight = parseFloat(btn.innerText);
      if (Math.abs(btnWeight - weight) < 0.1) {
        btn.classList.add('active');
        btn.style.background = 'var(--block-mint)';
        btn.style.color = '#ffffff';
      } else {
        btn.classList.remove('active');
        btn.style.background = '';
        btn.style.color = '';
      }
    });
  }

  setQuickWeight(val) {
    this.updateLotWeight(val);
  }

  updateCollectorPrice(val) {
    const rate = parseFloat(val) || 0;
    this.state.collectorInputPrice = rate;
    const weight = this.state.lotFormWeight || 15.0;
    const collectorTotal = Math.round(weight * rate);

    const collectorValDisplay = document.getElementById('collector-valuation-display');
    if (collectorValDisplay) collectorValDisplay.innerText = `₹${collectorTotal.toLocaleString()}`;

    const calcSub = document.getElementById('valuation-calc-sub');
    if (calcSub) calcSub.innerText = `(${weight.toFixed(1)} kg × ₹${rate}/kg)`;
  }

  applyAiPrice(rate) {
    this.state.collectorInputPrice = rate;
    const priceInput = document.getElementById('input-collector-price');
    if (priceInput) priceInput.value = rate;
    this.render();
  }

  submitLotForm() {
    const aiScan = this.state.currentAiScan;
    const user = this.state.currentUser || { name: 'Ramesh Kumar', id: 'COL-8821' };
    const weight = this.state.lotFormWeight || 15.0;
    const askingRate = this.state.collectorInputPrice || aiScan.rate;
    const payoutMode = document.getElementById('select-payout')?.value || 'UPI Instant Escrow';

    const newLot = {
      id: `LOT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      collectorName: user.name,
      collectorId: user.id,
      location: 'Dharavi Sector 4, Mumbai',
      distanceKm: 2.8,
      category: aiScan.category,
      grade: 'Scrap Grade A',
      weightKg: weight,
      collectorPriceRate: askingRate,
      estimatedRateKg: aiScan.rate,
      estimatedTotal: Math.round(weight * askingRate),
      aiConfidence: aiScan.conf,
      status: this.state.isOnline ? 'Pending Bid' : 'Saved Offline Queue',
      matchedRecycler: null,
      paymentMethod: payoutMode,
      timestamp: new Date().toLocaleString(),
      photoUrl: aiScan.img,
      syncedCloud: this.state.isOnline
    };

    this.state.sampleLots.unshift(newLot);
    syncLotToCloud(newLot, user);

    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    alert(`Success! E-Waste Lot ${newLot.id} created with your asking price of ₹${askingRate}/kg.`);
    this.navigateTo('collector-dashboard');
  }

  // Recycler Filtering Engine
  updateRecyclerFilter(key, value) {
    this.state.recyclerFilters[key] = value;
    this.render();
  }

  resetRecyclerFilters() {
    this.state.recyclerFilters = {
      material: 'all',
      minPrice: 0,
      maxPrice: 1000,
      radiusKm: 'all'
    };
    this.render();
  }

  applyFilterPreset(preset) {
    if (preset === 'pcb_nearby') {
      this.state.recyclerFilters = { material: 'PCBs', minPrice: 0, maxPrice: 1000, radiusKm: 15 };
    } else if (preset === 'copper_high') {
      this.state.recyclerFilters = { material: 'Copper', minPrice: 600, maxPrice: 1000, radiusKm: 'all' };
    } else if (preset === 'battery_safe') {
      this.state.recyclerFilters = { material: 'Battery', minPrice: 0, maxPrice: 1000, radiusKm: 'all' };
    } else {
      this.resetRecyclerFilters();
      return;
    }
    this.render();
  }

  acceptCollectorAskingPrice(lotId) {
    const lot = this.state.sampleLots.find(l => l.id === lotId);
    if (!lot) return;

    const user = this.state.currentUser || { name: 'EcoRecycle India Pvt Ltd', cpcbRegistration: 'CPCB/E-WASTE/REG-9011' };
    lot.status = 'Matched';
    lot.matchedRecycler = user.name;
    lot.recyclerCpcb = user.cpcbRegistration || 'CPCB/REG-9011';
    lot.finalOfferRate = lot.collectorPriceRate || lot.estimatedRateKg;
    lot.finalTotal = Math.round(lot.weightKg * lot.finalOfferRate);
    lot.syncedCloud = true;

    syncBidToCloud({ rate: lot.finalOfferRate, total: lot.finalTotal }, lot, user);

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    alert(`Accepted! Collector asking rate of ₹${lot.finalOfferRate}/kg matched for Lot ${lot.id}. Total escrow locked: ₹${lot.finalTotal.toLocaleString()}.`);
    this.navigateTo('recycler-handover', lot.id);
  }

  openBidModal(lotId) {
    this.state.targetBidLotId = lotId;
    this.state.activeModal = 'bid';
    this.render();
  }

  closeModal() {
    this.state.activeModal = null;
    this.state.targetBidLotId = null;
    this.render();
  }

  submitBidOffer(event) {
    event.preventDefault();
    const rateInput = document.getElementById('input-bid-rate')?.value;
    if (!rateInput || !this.state.targetBidLotId) return;

    const rate = parseFloat(rateInput);
    const lot = this.state.sampleLots.find(l => l.id === this.state.targetBidLotId);
    const user = this.state.currentUser || { name: 'EcoRecycle India Pvt Ltd', cpcbRegistration: 'CPCB/E-WASTE/REG-9011' };

    if (lot) {
      lot.status = 'Matched';
      lot.matchedRecycler = user.name;
      lot.recyclerCpcb = user.cpcbRegistration || 'CPCB/E-WASTE/REG-9011';
      lot.finalOfferRate = rate;
      lot.finalTotal = Math.round(lot.weightKg * rate);
      lot.syncedCloud = true;

      syncBidToCloud({ rate, total: lot.finalTotal }, lot, user);
    }

    this.closeModal();
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    alert(`Bid of ₹${rate}/kg accepted for Lot ${lot.id}! Matched with ${user.name}.`);
    this.navigateTo('recycler-handover', lot.id);
  }

  verifyHandover(lotId) {
    const lot = this.state.sampleLots.find(l => l.id === lotId) || this.state.sampleLots[0];
    lot.status = 'Handover Verified';
    lot.syncedCloud = true;

    const cert = {
      id: `CPCB-EPR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      lotId: lot.id,
      recycler: lot.matchedRecycler || 'EcoRecycle Solutions India',
      collector: lot.collectorName || 'Ramesh Kumar',
      material: lot.category || 'Printed Circuit Boards (PCBs)',
      qtyMt: Number(((lot.weightKg || 15) / 1000).toFixed(3)),
      co2OffsetMt: Number((((lot.weightKg || 15) * 1.8) / 1000).toFixed(3)),
      greenCreditsKwh: Number(((lot.weightKg || 15) * 4.2).toFixed(1)),
      status: 'SYNCED_VERIFIED',
      issuedDate: new Date().toLocaleDateString()
    };

    this.state.eprCertificates.unshift(cert);
    syncHandoverToCloud(lot, cert, this.state.currentUser);

    this.render();

    confetti({
      particleCount: 130,
      spread: 75,
      origin: { y: 0.6 }
    });
  }

  // Master Render Method
  render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const view = this.state.currentView;
    const isPublic = view === 'landing' || view === 'auth';

    // Set container class
    if (isPublic) {
      appEl.className = 'public-mode';
    } else {
      appEl.className = 'dashboard-mode';
    }

    let viewHtml = '';

    // Route dispatch
    switch (view) {
      case 'landing':
        viewHtml = renderLandingPageView(this.state);
        break;
      case 'auth':
        viewHtml = renderAuthView(this.state);
        break;
      
      // Collector Routes
      case 'collector-dashboard':
        viewHtml = renderCollectorDashboardView(this.state);
        break;
      case 'collector-upload':
        viewHtml = renderCollectorView(this.state);
        break;
      case 'collector-lots':
        viewHtml = renderHandoverView(this.state, this.state.selectedHandoverLotId);
        break;

      // Recycler Routes
      case 'recycler-dashboard':
        viewHtml = renderRecyclerDashboardView(this.state);
        break;
      case 'recycler-marketplace':
        viewHtml = renderRecyclerMarketplaceView(this.state);
        break;
      case 'recycler-handover':
        viewHtml = renderHandoverView(this.state, this.state.selectedHandoverLotId);
        break;
      case 'collector-epr':
      case 'recycler-epr':
        viewHtml = renderEPRComplianceView(this.state);
        break;

      default:
        viewHtml = renderLandingPageView(this.state);
    }

    if (isPublic) {
      // No sidebar and no app header on public landing & auth
      appEl.innerHTML = `
        <main class="app-main full-width">
          ${viewHtml}
        </main>
        ${this.state.isPrivacyModalOpen ? renderPrivacyPolicyModal(this.state) : ''}
        ${this.renderSplashOverlay()}
      `;
    } else {
      // Authenticated portal with Sidebar and Header
      appEl.innerHTML = `
        ${renderSidebar(this.state)}
        <main class="app-main">
          ${renderHeader(this.state)}
          ${viewHtml}
        </main>
        ${this.renderModal()}
        ${this.state.isPrivacyModalOpen ? renderPrivacyPolicyModal(this.state) : ''}
        ${this.renderSplashOverlay()}
      `;
    }

    this.postRender();
  }

  openPrivacyModal() {
    this.state.isPrivacyModalOpen = true;
    this.render();
  }

  closePrivacyModal() {
    this.state.isPrivacyModalOpen = false;
    this.render();
  }

  renderModal() {
    if (this.state.activeModal !== 'bid') return '';
    const lot = this.state.sampleLots.find(l => l.id === this.state.targetBidLotId);
    if (!lot) return '';

    const currentRate = lot.highestBidRate || lot.collectorPriceRate || lot.estimatedRateKg;
    const user = this.state.currentUser || { name: 'EcoRecycle India Pvt Ltd', cpcbRegistration: 'CPCB/E-WASTE/REG-9011' };

    return `
      <div class="modal-overlay open" onclick="if(event.target === this) window.appState.closeModal();">
        <div class="modal-box neu-box">
          <div class="modal-header">
            <h3 style="font-size:1.25rem;">Submit Recycler Rate Bid</h3>
            <button class="modal-close-btn" onclick="window.appState.closeModal()">&times;</button>
          </div>
          <form onsubmit="window.appState.submitBidOffer(event)">
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">
              Submitting offer for <strong>${lot.id}</strong> (${lot.category} - ${lot.weightKg} kg)
            </p>
            <div class="form-group">
              <label class="form-label">Current Collector Asking Rate: ₹${lot.collectorPriceRate || lot.estimatedRateKg}/kg</label>
              <label class="form-label">Your Bid Offer (₹ per kg)</label>
              <input type="number" id="input-bid-rate" class="form-input" value="${currentRate + 15}" min="10" required />
            </div>
            <div class="form-group">
              <label class="form-label">Recycler Entity</label>
              <input type="text" class="form-input" value="${user.name} (${user.cpcbRegistration || 'REG-9011'})" readonly />
            </div>
            <div style="display:flex; gap:12px; margin-top:20px;">
              <button type="button" class="neu-btn" style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="window.appState.closeModal()">
                ${createLucideIcon('x', { size: 15 })}
                <span>Cancel</span>
              </button>
              <button type="submit" class="neu-btn" style="flex:1; background:var(--block-amber); color:#fff; display:inline-flex; align-items:center; justify-content:center; gap:6px;">
                ${createLucideIcon('gavel', { size: 16, color: '#ffffff' })}
                <span>Submit Bid Offer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  postRender() {
    this.bindHeaderEvents();
    this.bindSidebarEvents();

    // Render QR Code if on Handover View
    const isHandover = this.state.currentView === 'collector-lots' || this.state.currentView === 'recycler-handover';
    if (isHandover) {
      const qrCanvas = document.getElementById('handover-qr-canvas');
      if (qrCanvas) {
        const lot = this.state.sampleLots.find(l => l.id === this.state.selectedHandoverLotId) || this.state.sampleLots[0];
        const qrData = JSON.stringify({
          lotId: lot.id,
          collector: lot.collectorId,
          weightKg: lot.weightKg,
          category: lot.category,
          payout: lot.finalTotal || lot.estimatedTotal,
          timestamp: lot.timestamp,
          hash: '0x8f4a12c90b3e512d77a8'
        });
        QRCode.toCanvas(qrCanvas, qrData, { width: 200, margin: 1 }, (err) => {
          if (err) console.error(err);
        });
      }
    }

    // Render Charts if on EPR View (for both collector & recycler)
    if (this.state.currentView === 'recycler-epr' || this.state.currentView === 'collector-epr') {
      this.renderCharts();
    }
  }

  renderCharts() {
    const ctx1 = document.getElementById('chart-material-category')?.getContext('2d');
    if (ctx1) {
      new Chart(ctx1, {
        type: 'doughnut',
        data: {
          labels: ['PCBs & Circuits', 'Copper Wires', 'Li-ion Batteries', 'Display Glass', 'Mixed Hardware'],
          datasets: [{
            data: [42, 28, 15, 10, 5],
            backgroundColor: ['#0d4a36', '#10b981', '#d97706', '#0284c7', '#4338ca']
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    const ctx2 = document.getElementById('chart-monthly-diversion')?.getContext('2d');
    if (ctx2) {
      new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep (Est)'],
          datasets: [{
            label: 'Landfill Diversion (Tons)',
            data: [12.4, 18.2, 24.5, 31.0, 38.6, 42.8],
            backgroundColor: '#10b981',
            borderRadius: 8
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }

  bindHeaderEvents() {
    document.getElementById('btn-sync-toggle')?.addEventListener('click', () => this.toggleOnlineStatus());
  }

  bindSidebarEvents() {
    document.querySelectorAll('.app-sidebar .nav-item').forEach(el => {
      el.addEventListener('click', () => {
        const viewId = el.getAttribute('data-view');
        if (viewId) this.navigateTo(viewId);
      });
    });
  }
}

// Instantiate App on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
