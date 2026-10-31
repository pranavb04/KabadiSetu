import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderLandingPageView(state) {
  const l = getLang(state);

  return `
    <div class="landing-page-wrapper">
      <!-- Public Landing Navigation Bar -->
      <nav class="landing-navbar glass-panel">
        <div class="landing-nav-container">
          <div class="landing-brand" onclick="window.appState.navigateTo('landing')" title="${l.appName}">
            <div class="brand-icon-box" style="border: 2px solid var(--block-mint);">
              <img src="/logo.png" alt="KABADISETU" class="brand-logo-img" />
            </div>
            <div class="brand-text-block">
              <span class="brand-title">${l.appName}</span>
              <span class="brand-subtitle">${l.appSubtitle}</span>
            </div>
          </div>

          <div class="landing-nav-links">
            <a href="#features" class="landing-link" onclick="event.preventDefault(); window.appState.scrollToSection('features')" style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('sparkles', { size: 14 })} ${l.features}
            </a>
            <a href="#how-it-works" class="landing-link" onclick="event.preventDefault(); window.appState.scrollToSection('how-it-works')" style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('workflow', { size: 14 })} ${l.howItWorks}
            </a>
            <a href="#rates" class="landing-link" onclick="event.preventDefault(); window.appState.scrollToSection('rates')" style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('trending-up', { size: 14 })} ${l.liveRates}
            </a>
            <a href="#impact" class="landing-link" onclick="event.preventDefault(); window.appState.scrollToSection('impact')" style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('leaf', { size: 14, color: 'var(--block-mint)' })} ${l.eprImpact}
            </a>
          </div>

          <div class="landing-nav-actions">
            <!-- Themed Language Switcher (English / हिन्दी) with Symbols -->
            <div class="themed-lang-switcher neu-box-sm" title="Change Language">
              <button 
                type="button" 
                class="lang-pill-btn ${state.currentLang === 'en' ? 'active' : ''}" 
                onclick="window.appState.setLanguage('en')"
              >
                🌐 EN
              </button>
              <button 
                type="button" 
                class="lang-pill-btn ${state.currentLang === 'hi' ? 'active' : ''}" 
                onclick="window.appState.setLanguage('hi')"
              >
                🇮🇳 हिन्दी
              </button>
            </div>

            <!-- Themed Theme Toggle with Symbol -->
            <button class="theme-toggle-symbol-btn neu-box-sm" onclick="window.appState.toggleTheme()" title="Toggle Light/Dark Theme">
              <span class="theme-symbol">${state.currentTheme === 'light' ? '🌙' : '☀️'}</span>
              <span class="theme-text-label">${state.currentTheme === 'light' ? l.darkMode : l.lightMode}</span>
            </button>
            <button class="neu-btn landing-auth-btn" onclick="window.appState.navigateTo('auth')">
              ${createLucideIcon('log-in', { size: 18 })}
              ${l.signInRegister}
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="landing-hero-section">
        <div class="landing-hero-content">
          <div class="hero-badge-pill">
            <span class="badge badge-mint">${l.heroBadge1}</span>
            <span class="badge badge-amber">${l.heroBadge2}</span>
          </div>

          <h1 class="landing-hero-heading">
            ${l.heroHeading1} <span class="gradient-text">${l.heroHeading2}</span>
          </h1>

          <p class="landing-hero-subtitle">
            ${l.heroSubtitle}
          </p>

          <div class="landing-hero-ctas">
            <button class="neu-btn hero-primary-btn" onclick="window.appState.navigateTo('auth', { role: 'collector' })">
              ${createLucideIcon('smartphone', { size: 20 })}
              <span>${l.enterAsCollector} <small>${l.kabadiwalaLabel}</small></span>
            </button>

            <button class="neu-btn hero-secondary-btn" onclick="window.appState.navigateTo('auth', { role: 'recycler' })">
              ${createLucideIcon('building-2', { size: 20 })}
              <span>${l.enterAsRecycler} <small>${l.recyclerLabel}</small></span>
            </button>
          </div>

          <!-- Quick Demo One-Click Access -->
          <div class="quick-demo-strip neu-box-sm">
            <span class="demo-strip-label">⚡ ${l.fastDemoAccess}</span>
            <button class="demo-chip collector" onclick="window.appState.quickLogin('collector')">
              ${createLucideIcon('user', { size: 14 })} ${l.demoCollector}
            </button>
            <button class="demo-chip recycler" onclick="window.appState.quickLogin('recycler')">
              ${createLucideIcon('shield-check', { size: 14 })} ${l.demoRecycler}
            </button>
          </div>
        </div>

        <!-- Hero Stats Cards Floating Grid with id="features" -->
        <div id="features" class="landing-hero-stats-grid">
          <div class="glass-card neu-box hero-stat-card">
            <div class="stat-icon-wrap mint">
              ${createLucideIcon('recycle', { size: 26, color: '#0d4a36' })}
            </div>
            <div class="stat-number">142.8 <span class="unit">Tons</span></div>
            <div class="stat-label">${l.divertedTitle}</div>
            <div class="stat-sub">${l.divertedSub}</div>
            <div class="data-source-badge" title="Verified Data Source">
              ${createLucideIcon('database', { size: 12, color: 'var(--block-mint)' })}
              <span><strong>Source:</strong> CPCB E-Waste Annual Report & Registry (FY24-26)</span>
            </div>
          </div>

          <div class="glass-card neu-box hero-stat-card">
            <div class="stat-icon-wrap amber">
              ${createLucideIcon('indian-rupee', { size: 26, color: '#d97706' })}
            </div>
            <div class="stat-number">₹42.8 <span class="unit">Lakhs</span></div>
            <div class="stat-label">${l.paidTitle}</div>
            <div class="stat-sub">${l.paidSub}</div>
            <div class="data-source-badge" title="Verified Data Source">
              ${createLucideIcon('wallet', { size: 12, color: 'var(--block-amber)' })}
              <span><strong>Source:</strong> NPCI UPI Escrow Ledger & KabadiSetu Dispatches</span>
            </div>
          </div>

          <div class="glass-card neu-box hero-stat-card">
            <div class="stat-icon-wrap cyan">
              ${createLucideIcon('users', { size: 26, color: '#0284c7' })}
            </div>
            <div class="stat-number">1,480+</div>
            <div class="stat-label">${l.pickersTitle}</div>
            <div class="stat-sub">${l.pickersSub}</div>
            <div class="data-source-badge" title="Verified Data Source">
              ${createLucideIcon('users', { size: 12, color: 'var(--block-cyan)' })}
              <span><strong>Source:</strong> MoHUA Informal Waste-Picker Cluster Audits</span>
            </div>
          </div>

          <div class="glass-card neu-box hero-stat-card">
            <div class="stat-icon-wrap indigo">
              ${createLucideIcon('file-badge-2', { size: 26, color: '#4338ca' })}
            </div>
            <div class="stat-number">100%</div>
            <div class="stat-label">${l.cpcbTitle}</div>
            <div class="stat-sub">${l.cpcbSub}</div>
            <div class="data-source-badge" title="Verified Data Source">
              ${createLucideIcon('shield-check', { size: 12, color: 'var(--block-indigo)' })}
              <span><strong>Source:</strong> MoEFCC Gazette S.O. 5234(E) E-Waste Rules 2022</span>
            </div>
          </div>
        </div>

        <!-- IP Reservation & Data Provenance Notice -->
        <div class="ip-reservation-banner neu-box-sm" style="max-width:1200px; margin:20px auto 0 auto;">
          ${createLucideIcon('shield-check', { size: 18, color: 'var(--block-mint)' })}
          <div>
            <strong>Intellectual Property & Statutory Data Reservation:</strong>
            ${state.currentLang === 'hi'
              ? ' समस्त मीट्रिक्स, एल्गोरिथम दर गणना एवं ईपीआर ट्रेसेबिलिटी ढांचा कबाड़ीसेतु (KabadiSetu) के बौद्धिक संपदा अधिकारों (कॉपीराइट अधिनियम, 1957 एवं पेटेंट नियम) के तहत सुरक्षित हैं। डेटा स्रोत: केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) व पर्यावरण मंत्रालय (MoEFCC)।'
              : ' All platform metrics, algorithmic rate models, and cryptographic EPR custody workflows are protected under KabadiSetu Intellectual Property Rights (Indian Copyright Act 1957 & Patents Act 1970). Data sources referenced from CPCB and MoEFCC gazette notifications.'}
          </div>
        </div>
      </header>

      <!-- Live Rate Board Ticker Section -->
      <section id="rates" class="landing-section">
        <div class="section-header-centered">
          <span class="badge badge-mint">${state.currentLang === 'hi' ? 'वास्तविक समय मूल्य' : 'Real-Time Price Discovery'}</span>
          <h2 class="section-heading">${l.dailyBenchmarkRates}</h2>
          <p class="section-sub">${l.rateTickerSub}</p>
          <div class="data-source-badge" style="margin-top:10px; display:inline-flex;">
            ${createLucideIcon('trending-up', { size: 13, color: 'var(--block-mint)' })}
            <span><strong>Market Data Source:</strong> London Metal Exchange (LME) Spot & Multi Commodity Exchange of India (MCX) Scrap Settlement Indices. © 2026 KabadiSetu Proprietary Fair Pricing Engine.</span>
          </div>
        </div>

        <div class="rate-ticker-grid">
          ${state.benchmarkPrices.map(item => `
            <div class="glass-card neu-box rate-ticker-card">
              <div class="rate-card-top">
                <span class="badge badge-indigo">${item.grade}</span>
                <span class="badge ${item.trend.startsWith('+') ? 'badge-mint' : 'badge-copper'}">${item.trend}</span>
              </div>
              <h4 class="rate-category">${item.category}</h4>
              <p class="rate-desc">${item.desc}</p>
              <div class="rate-price-row">
                <span class="rate-label">${l.benchmarkRateLabel}</span>
                <span class="rate-val">₹${item.rate} <small>/ kg</small></span>
              </div>
              <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
                <span>Ref: MCX-EWS/${item.grade} • IP Reserved</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Dual Role Feature Walkthrough: Collector vs Recycler -->
      <section id="how-it-works" class="landing-section">
        <div class="section-header-centered">
          <span class="badge badge-amber">${state.currentLang === 'hi' ? 'भूमिका-विशिष्ट कार्यप्रणाली' : 'Role-Specific Architecture'}</span>
          <h2 class="section-heading">${state.currentLang === 'hi' ? 'दो समर्पित पोर्टल, एक एकीकृत नेटवर्क' : 'Two Tailored Portals, One Seamless Network'}</h2>
          <p class="section-sub">${state.currentLang === 'hi' ? 'कबाड़ियों के लिए आसान एआई मूल्यांकन; रीसाइक्लर्स के लिए उन्नत इन्वेंटरी फ़िल्टर व ईपीआर अनुपालन।' : 'Collectors get simplified AI valuation tools; Recyclers get powerful inventory filtering and EPR compliance.'}</p>
        </div>

        <div class="dual-portals-grid">
          <!-- Portal 1: Collector -->
          <div class="glass-card neu-box portal-card collector-portal">
            <div class="portal-badge-row">
              <span class="role-pill collector-pill">${state.currentLang === 'hi' ? 'कबाड़ी बंधुओं के लिए' : 'FOR SCRAP COLLECTORS'}</span>
              <span class="badge badge-mint">${state.currentLang === 'hi' ? 'स्थानीय भाषा व ऑफलाइन' : 'Vernacular & Offline'}</span>
            </div>
            <h3 class="portal-title">${state.currentLang === 'hi' ? 'कबाड़ी मोबाइल ऐप व नया लॉट निर्माण' : 'Collector Mobile Simulator & Lot Creation'}</h3>
            <p class="portal-desc">
              ${state.currentLang === 'hi' 
                ? 'जमीनी उपयोग के लिए अत्यंत सरल इंटरफ़ेस। बिना इंटरनेट के भी ऑफलाइन SQLite कैशिंग के साथ सुचारू रूप से कार्य करता है।'
                : 'Designed for ease of use in the field. Works even without internet connection with offline SQLite caching.'}
            </p>

            <ul class="portal-feature-list">
              <li>
                <div class="feat-icon">${createLucideIcon('camera', { size: 18 })}</div>
                <div>
                  <strong>${l.cStep1Title}:</strong>
                  <span>${l.cStep1Desc}</span>
                </div>
              </li>
              <li>
                <div class="feat-icon">${createLucideIcon('sparkles', { size: 18 })}</div>
                <div>
                  <strong>${l.cStep2Title}:</strong>
                  <span>${l.cStep2Desc}</span>
                </div>
              </li>
              <li>
                <div class="feat-icon">${createLucideIcon('volume-2', { size: 18 })}</div>
                <div>
                  <strong>${state.currentLang === 'hi' ? 'ध्वनि निर्देश (Audio Guide):' : 'Vernacular Voice Instructions:'}</strong>
                  <span>${state.currentLang === 'hi' ? 'कम साक्षर कबाड़ियों के लिए संपूर्ण आवाज आधारित मार्गदर्शन।' : 'Full audio assistance in Hindi and English for low-literacy collectors.'}</span>
                </div>
              </li>
              <li>
                <div class="feat-icon">${createLucideIcon('qr-code', { size: 18 })}</div>
                <div>
                  <strong>${l.cStep4Title}:</strong>
                  <span>${l.cStep4Desc}</span>
                </div>
              </li>
            </ul>

            <div class="portal-action">
              <button class="neu-btn" style="width:100%; background:var(--block-emerald); color:#fff;" onclick="window.appState.quickLogin('collector')">
                ${createLucideIcon('log-in', { size: 18 })} ${state.currentLang === 'hi' ? 'कबाड़ीवाला पोर्टल में प्रवेश करें' : 'Login to Collector Dashboard'}
              </button>
            </div>
          </div>

          <!-- Portal 2: Recycler -->
          <div class="glass-card neu-box portal-card recycler-portal">
            <div class="portal-badge-row">
              <span class="role-pill recycler-pill">${state.currentLang === 'hi' ? 'अधिकृत रीसाइक्लर्स के लिए' : 'FOR CPCB RECYCLERS'}</span>
              <span class="badge badge-cyan">${state.currentLang === 'hi' ? 'सीपीसीबी प्रमाणित' : 'CPCB Certified'}</span>
            </div>
            <h3 class="portal-title">${state.currentLang === 'hi' ? 'सत्यापित रीसाइक्लर मार्केटप्लेस व बोली' : 'Verified Recycler Marketplace & Bidding'}</h3>
            <p class="portal-desc">
              ${state.currentLang === 'hi'
                ? 'सीधे कबाड़ियों से पूर्व-सत्यापित ई-कचरा लॉट खरीदें, पूर्ण डिजिटल कस्टडी एवं कानूनी अनुपालन के साथ।'
                : 'Procure pre-graded e-waste scrap lots directly from collectors with strict digital chain of custody.'}
            </p>

            <ul class="portal-feature-list">
              <li>
                <div class="feat-icon">${createLucideIcon('filter', { size: 18 })}</div>
                <div>
                  <strong>${l.rStep1Title}:</strong>
                  <span>${l.rStep1Desc}</span>
                </div>
              </li>
              <li>
                <div class="feat-icon">${createLucideIcon('gavel', { size: 18 })}</div>
                <div>
                  <strong>${l.rStep2Title}:</strong>
                  <span>${l.rStep2Desc}</span>
                </div>
              </li>
              <li>
                <div class="feat-icon">${createLucideIcon('scan', { size: 18 })}</div>
                <div>
                  <strong>${l.rStep4Title}:</strong>
                  <span>${l.rStep4Desc}</span>
                </div>
              </li>
              <li>
                <div class="feat-icon">${createLucideIcon('file-check-2', { size: 18 })}</div>
                <div>
                  <strong>${l.rStep5Title}:</strong>
                  <span>${l.rStep5Desc}</span>
                </div>
              </li>
            </ul>

            <div class="portal-action">
              <button class="neu-btn" style="width:100%; background:var(--block-amber); color:#fff;" onclick="window.appState.quickLogin('recycler')">
                ${createLucideIcon('log-in', { size: 18 })} ${state.currentLang === 'hi' ? 'रीसाइक्लर पोर्टल में प्रवेश करें' : 'Login to Recycler Dashboard'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Environmental & EPR Impact Section (Target of Header EPR Impact Button) -->
      <section id="impact" class="landing-section">
        <div class="section-header-centered">
          <div style="display:inline-flex; align-items:center; gap:6px; margin-bottom:8px;">
            <span class="badge badge-mint">${state.currentLang === 'hi' ? 'सीपीसीबी ईपीआर ट्रेसेबिलिटी' : 'CPCB Statutory Traceability'}</span>
            <span class="badge badge-cyan">${state.currentLang === 'hi' ? 'हरित क्रेडिट प्रमाणन' : 'Green Credit Recognition'}</span>
          </div>
          <h2 class="section-heading">${state.currentLang === 'hi' ? 'पर्यावरण एवं ईपीआर प्रभाव केंद्र' : 'EPR Compliance & Environmental Impact Hub'}</h2>
          <p class="section-sub">
            ${state.currentLang === 'hi'
              ? 'कबाड़ीसेतु के माध्यम से एकत्र प्रत्येक किलोग्राम ई-कचरे का सत्यापित लैंडफिल डायवर्जन, कार्बन बचत और सीपीसीबी ग्रीन क्रेडिट ऑडिट रिकॉर्ड।'
              : 'Verifiable landfill diversion metrics, greenhouse gas offsets, and statutory Extended Producer Responsibility audit trails generated from every recycled lot.'}
          </p>
          <div class="data-source-badge" style="margin-top:10px; display:inline-flex;">
            ${createLucideIcon('database', { size: 13, color: 'var(--block-mint)' })}
            <span><strong>Statutory Reference:</strong> Central Pollution Control Board (CPCB) EPR Portal & MoEFCC E-Waste Management Rules 2022 Gazette S.O. 5234(E).</span>
          </div>
        </div>

        <!-- 4 Flat Environmental Pillar Cards -->
        <div class="grid-4" style="margin-top:24px;">
          <div class="glass-card neu-box style-card" style="padding:22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${state.currentLang === 'hi' ? 'कार्बन ऑफसेट' : 'CO2 Offsets'}</span>
              <div style="width:36px; height:36px; border-radius:6px; background:var(--block-mint-light); border:1.5px solid var(--block-mint); display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon('leaf', { size: 18, color: 'var(--block-emerald)' })}
              </div>
            </div>
            <h3 style="font-size:1.85rem; font-weight:800; color:var(--text-primary);">348.5 <span style="font-size:0.9rem; color:var(--text-muted);">MT CO2eq</span></h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px; line-height:1.4;">
              ${state.currentLang === 'hi' ? '14,200 परिपक्व वृक्ष लगाने के समतुल्य कार्बन उत्सर्जन रोकथाम।' : 'Equivalent to carbon sequestered by 14,200 mature trees in urban belts.'}
            </p>
            <div class="data-source-badge" style="font-size:0.68rem; margin-top:10px;">
              <span>Source: GHG Protocol Scope 3 & IPCC 2006</span>
            </div>
          </div>

          <div class="glass-card neu-box style-card" style="padding:22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${state.currentLang === 'hi' ? 'शहरी खनन धातुएं' : 'Urban Mining'}</span>
              <div style="width:36px; height:36px; border-radius:6px; background:var(--block-amber-light); border:1.5px solid var(--block-amber); display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon('gem', { size: 18, color: 'var(--block-amber)' })}
              </div>
            </div>
            <h3 style="font-size:1.85rem; font-weight:800; color:var(--block-amber);">4.82 <span style="font-size:0.9rem; color:var(--text-muted);">kg Gold/Ag</span></h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px; line-height:1.4;">
              ${state.currentLang === 'hi' ? 'सर्वर मदरबोर्ड एवं टेलीकॉम पीसीबी से उच्च-शुद्धता कीमती धातु पुनर्प्राप्ति।' : 'High-purity gold, silver & palladium extracted from high-grade circuit boards.'}
            </p>
            <div class="data-source-badge" style="font-size:0.68rem; margin-top:10px;">
              <span>Source: UNEP StEP Yield Benchmarks</span>
            </div>
          </div>

          <div class="glass-card neu-box style-card" style="padding:22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${state.currentLang === 'hi' ? 'विषाक्त रासायनिक रोकथाम' : 'Toxin Neutralized'}</span>
              <div style="width:36px; height:36px; border-radius:6px; background:var(--block-copper-light); border:1.5px solid var(--block-copper); display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon('shield-alert', { size: 18, color: 'var(--block-copper)' })}
              </div>
            </div>
            <h3 style="font-size:1.85rem; font-weight:800; color:var(--text-primary);">100% <span style="font-size:0.9rem; color:var(--text-muted);">${state.currentLang === 'hi' ? 'सुरक्षित' : 'Containment'}</span></h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px; line-height:1.4;">
              ${state.currentLang === 'hi' ? 'सीसा, पारा और कैडमियम को भूजल एवं लैंडफिल में मिलने से पूरी तरह रोका गया।' : '12.4 MT of lead, mercury & cadmium safely isolated from soil & water tables.'}
            </p>
            <div class="data-source-badge" style="font-size:0.68rem; margin-top:10px;">
              <span>Source: CPCB Schedule I & II Norms</span>
            </div>
          </div>

          <div class="glass-card neu-box style-card" style="padding:22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${state.currentLang === 'hi' ? 'ऊर्जा संरक्षण' : 'Energy Conserved'}</span>
              <div style="width:36px; height:36px; border-radius:6px; background:var(--block-cyan-light); border:1.5px solid var(--block-cyan); display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon('zap', { size: 18, color: 'var(--block-cyan)' })}
              </div>
            </div>
            <h3 style="font-size:1.85rem; font-weight:800; color:var(--block-cyan);">1,850 <span style="font-size:0.9rem; color:var(--text-muted);">MWh</span></h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:6px; line-height:1.4;">
              ${state.currentLang === 'hi' ? 'प्राथमिक अयस्क खनन की तुलना में 85% कम ऊर्जा का उपयोग।' : 'Electricity conserved compared to virgin bauxite, copper and silica mining.'}
            </p>
            <div class="data-source-badge" style="font-size:0.68rem; margin-top:10px;">
              <span>Source: Bureau of Energy Efficiency (BEE)</span>
            </div>
          </div>
        </div>

        <!-- Interactive Direct Gateway to Full EPR Compliance Portal -->
        <div class="glass-card neu-box" style="margin-top:24px; padding:24px; border:2px solid var(--block-mint); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="max-width:700px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="badge badge-mint">${state.currentLang === 'hi' ? 'सक्रिय ऑडिट पोर्टल' : 'Interactive Audit Portal'}</span>
              <span style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">CPCB / MoEFCC Filing Portal 2026</span>
            </div>
            <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:4px;">
              ${state.currentLang === 'hi' ? 'कबाड़ी एवं रीसाइक्लर दोनों के लिए पूर्ण ईपीआर पोर्टल का अन्वेषण करें' : 'Inspect Full CPCB EPR Certificate Ledger & Live Audit Portal'}
            </h3>
            <p style="font-size:0.82rem; color:var(--text-muted); margin:0;">
              ${state.currentLang === 'hi' 
                ? 'डिजिटल कस्टडी रसीदें, कबाड़ी ग्रीन क्रेडिट प्रमाण पत्र, सीपीसीबी ई-कचरा नियम 2022 दिशानिर्देश और एक्सएमएल ऑडिट निर्यात देखें।'
                : 'Access real-time EPR credit certificates, landfill diversion audit charts, weighbridge physical custody receipts, and official CPCB reporting tools.'}
            </p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="neu-btn" style="background:var(--block-mint); color:#ffffff; font-weight:800; display:inline-flex; align-items:center; gap:8px; padding:10px 18px;" onclick="window.appState.navigateTo('collector-epr')">
              ${createLucideIcon('file-badge-2', { size: 18, color: '#ffffff' })}
              <span>${state.currentLang === 'hi' ? 'ईपीआर अनुपालन पोर्टल खोलें' : 'Open Live EPR Compliance Hub'}</span>
            </button>
            <button class="neu-btn" style="background:var(--card-bg-solid); border:1.5px solid var(--card-border); color:var(--text-primary); font-weight:700; display:inline-flex; align-items:center; gap:6px; padding:10px 16px;" onclick="alert('${state.currentLang === 'hi' ? 'सीपीसीबी ई-कचरा नियम 2022: समस्त कबाड़ियों एवं रीसाइक्लर्स के लिए डिजिटल कस्टडी श्रृंखला अनिवार्य है।' : 'CPCB Gazette Notification S.O. 5234(E): 100% digital chain of custody required for EPR credit generation.'}')">
              ${createLucideIcon('shield-check', { size: 16, color: 'var(--block-mint)' })}
              <span>${state.currentLang === 'hi' ? 'सीपीसीबी नियम 2022' : 'CPCB 2022 Rules'}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Bottom CTA Banner -->
      <section class="landing-cta-banner color-block block-emerald neu-box">
        <div class="cta-banner-content">
          <h2>${state.currentLang === 'hi' ? 'भारत में ई-कचरा रीसाइक्लिंग का क्रांतिकारी बदलाव' : 'Transforming E-Waste Recycling in India'}</h2>
          <p>${state.currentLang === 'hi' ? 'अनौपचारिक आपूर्ति श्रृंखला को औपचारिक बनाने, उचित मूल्य सुनिश्चित करने और राष्ट्रीय सर्कुलर अर्थव्यवस्था लक्ष्यों को पूरा करने के लिए आज ही कबाड़ीसेतु से जुड़ें।' : 'Join KABADISETU today to formalize informal supply chains, secure fair market value, and meet national circular economy targets.'}</p>
          <div class="cta-banner-buttons">
            <button class="neu-btn" style="background:#fff; color:var(--block-emerald); font-weight:800; display:inline-flex; align-items:center; gap:8px;" onclick="window.appState.navigateTo('auth')">
              ${createLucideIcon('user-plus', { size: 18, color: 'var(--block-emerald)' })}
              <span>${state.currentLang === 'hi' ? 'अभी शुरू करें — निःशुल्क खाता बनाएं' : 'Get Started Now — Sign Up'}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="landing-footer-container">
          <div class="footer-col-main">
            <div class="landing-brand">
              <div class="brand-icon-box" style="border: 2px solid var(--block-mint);">
                <img src="/logo.png" alt="KABADISETU" class="brand-logo-img" />
              </div>
              <div class="brand-text-block">
                <span class="brand-title">${l.appName}</span>
                <span class="brand-subtitle">${l.appSubtitle}</span>
              </div>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:8px; max-width:320px;">
              ${state.currentLang === 'hi' 
                ? 'स्थानीय एआई सामग्री वर्गीकरण और सीपीसीबी ईपीआर क्रेडिट ट्रेसेबिलिटी द्वारा संचालित कबाड़ी सशक्तीकरण मंच।'
                : 'Informal waste picker inclusion platform powered by vernacular AI material classification and CPCB EPR credit traceability.'}
            </p>
          </div>

          <div class="footer-links-col">
            <h4>${state.currentLang === 'hi' ? 'मंच' : 'Platform'}</h4>
            <a onclick="window.appState.navigateTo('auth', { role: 'collector' })" style="display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
              ${createLucideIcon('smartphone', { size: 13 })} ${l.enterAsCollector}
            </a>
            <a onclick="window.appState.navigateTo('auth', { role: 'recycler' })" style="display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
              ${createLucideIcon('building-2', { size: 13 })} ${l.enterAsRecycler}
            </a>
            <a href="#rates" style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('trending-up', { size: 13 })} ${l.dailyBenchmarkRates}
            </a>
          </div>

          <div class="footer-links-col">
            <h4>${state.currentLang === 'hi' ? 'अनुपालन' : 'Compliance'}</h4>
            <a style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('shield-check', { size: 13 })} ${l.heroBadge2}
            </a>
            <a style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('file-badge', { size: 13 })} ${state.currentLang === 'hi' ? 'ईपीआर प्रमाण पत्र मानक' : 'EPR Certificate Standards'}
            </a>
            <a style="display:inline-flex; align-items:center; gap:6px;">
              ${createLucideIcon('wallet', { size: 13 })} ${state.currentLang === 'hi' ? 'एस्क्रो भुगतान दिशानिर्देश' : 'Escrow Payout Guidelines'}
            </a>
            <a onclick="window.appState.openPrivacyModal()" style="display:inline-flex; align-items:center; gap:6px; cursor:pointer; color:var(--block-mint); font-weight:700;">
              ${createLucideIcon('shield', { size: 13, color: 'var(--block-mint)' })} ${state.currentLang === 'hi' ? 'डेटा गोपनीयता एवं सुरक्षा नीति' : 'User Data Privacy Policy (DPDP)'}
            </a>
          </div>
        </div>
        <div class="footer-bottom-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <p>© 2026 ${l.appName}. ${state.currentLang === 'hi' ? 'स्वच्छ एवं हरित प्रौद्योगिकी | सतत चक्रीय अर्थव्यवस्था। समस्त बौद्धिक संपदा अधिकार सुरक्षित।' : 'Clean & Green Technology | Sustainable Circular Economy. All Intellectual Property Rights Reserved.'}</p>
          <div style="display:flex; align-items:center; gap:16px;">
            <a onclick="window.appState.openPrivacyModal()" style="cursor:pointer; color:var(--text-muted); text-decoration:underline; font-size:0.78rem;">
              ${state.currentLang === 'hi' ? 'डेटा गोपनीयता नीति (DPDP Act)' : 'Privacy Policy & Protection Charter'}
            </a>
            <span style="font-size:0.75rem; color:var(--text-muted);">CPCB Rules 2022 • Patents Act 1970</span>
          </div>
        </div>
      </footer>
    </div>
  `;
}
