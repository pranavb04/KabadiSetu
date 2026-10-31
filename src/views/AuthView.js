import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderAuthView(state) {
  const l = getLang(state);
  const isHi = state.currentLang === 'hi';
  const isSignUp = state.authMode === 'signup';
  const preselectedRole = state.authRole || 'collector';

  return `
    <div class="auth-page-wrapper">
      <div class="auth-top-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <button class="back-home-btn neu-box-sm" onclick="window.appState.navigateTo('landing')">
          ${createLucideIcon('arrow-left', { size: 16 })} ${isHi ? 'मुख्य पृष्ठ पर वापस' : 'Back to Home'}
        </button>
        <div class="landing-brand" onclick="window.appState.navigateTo('landing')" style="cursor:pointer;" title="KABADISETU">
          <div class="brand-icon-box" style="width:38px; height:38px; border: 2px solid var(--block-mint);">
            <img src="/logo.png" alt="KABADISETU" class="brand-logo-img" />
          </div>
          <div class="brand-text-block">
            <span class="brand-title" style="font-size:1.15rem;">${l.appName}</span>
            <span class="brand-subtitle" style="font-size:0.58rem;">${l.appSubtitle}</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <!-- Themed Language Switcher -->
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

          <!-- Themed Switch Button with Clear Symbol for Dark/Light Theme -->
          <button 
            class="theme-toggle-symbol-btn neu-box-sm" 
            onclick="window.appState.toggleTheme()" 
            title="Switch Theme"
          >
            <span class="theme-symbol">${state.currentTheme === 'light' ? '🌙' : '☀️'}</span>
            <span class="theme-text-label">${state.currentTheme === 'light' ? l.darkMode : l.lightMode}</span>
          </button>
        </div>
      </div>

      <div class="auth-card-container">
        <div class="glass-card neu-box auth-card">
          <!-- Auth Mode Tabs (Sign In vs Sign Up) -->
          <div class="auth-tabs neu-inset">
            <button class="auth-tab-btn ${!isSignUp ? 'active' : ''}" onclick="window.appState.setAuthMode('signin')" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
              ${createLucideIcon('log-in', { size: 14 })}
              <span>${isHi ? 'लॉग इन (Sign In)' : 'Sign In'}</span>
            </button>
            <button class="auth-tab-btn ${isSignUp ? 'active' : ''}" onclick="window.appState.setAuthMode('signup')" style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
              ${createLucideIcon('user-plus', { size: 14 })}
              <span>${isHi ? 'नया खाता? साइन अप' : 'New User? Sign Up'}</span>
            </button>
          </div>

          <!-- Header Titles -->
          <div style="text-align:center; margin: 20px 0 24px;">
            <h2 style="font-size:1.6rem; margin-bottom:3px;">
              ${isSignUp 
                ? (isHi ? 'कबाड़ीसेतु में नया खाता बनाएं' : 'Create KABADISETU Account') 
                : (isHi ? 'पुनः स्वागत है — कबाड़ीसेतु' : 'Welcome Back')}
            </h2>
            <span class="brand-subtitle" style="font-size:0.7rem; letter-spacing:0.1em; color:var(--block-mint); margin-bottom:8px;">FORMALIZING E-WASTE CHAINS</span>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:6px;">
              ${isSignUp 
                ? (isHi ? 'ई-कचरा कबाड़ी व सीपीसीबी रीसाइक्लर्स के औपचारिक नेटवर्क से जुड़ें।' : 'Join India\'s formalizing network for e-waste scrap collectors & CPCB recyclers.')
                : (isHi ? 'अपने समर्पित डैशबोर्ड और लाइव संचालन में प्रवेश के लिए लॉग इन करें।' : 'Sign in to access your role-specific dashboard and live operations.')}
            </p>
          </div>

          <!-- Fast Demo Login Pills -->
          <div class="auth-demo-shortcuts neu-inset" style="padding:14px; border-radius:14px; margin-bottom:20px;">
            <p style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px; text-align:center;">
              ⚡ ${isHi ? 'त्वरित 1-क्लिक डेमो लॉगिन' : 'Quick Demo 1-Click Login (Pre-configured)'}
            </p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <button type="button" class="neu-btn" style="background:var(--block-emerald); color:#fff; font-size:0.8rem; padding:8px 10px;" onclick="window.appState.quickLogin('collector')">
                ${createLucideIcon('user', { size: 15 })} ${isHi ? 'कबाड़ी (रमेश कुमार)' : 'Collector (Ramesh)'}
              </button>
              <button type="button" class="neu-btn" style="background:var(--block-amber); color:#fff; font-size:0.8rem; padding:8px 10px;" onclick="window.appState.quickLogin('recycler')">
                ${createLucideIcon('shield-check', { size: 15 })} ${isHi ? 'सीपीसीबी रीसाइक्लर' : 'CPCB Recycler'}
              </button>
            </div>
          </div>

          <div class="auth-divider">
            <span>${isHi ? 'अथवा क्रेडेंशियल्स दर्ज करें' : 'OR ENTER CREDENTIALS'}</span>
          </div>

          <!-- FORM -->
          <form id="auth-form" onsubmit="window.appState.handleAuthSubmit(event)">
            <!-- Role Selector -->
            <div class="form-group" style="margin-bottom:18px;">
              <label class="form-label" style="font-weight:700;">${isHi ? 'खाता प्रकार चुनें' : 'Select Account Role'}</label>
              <div class="role-selector-cards">
                <label class="role-card ${preselectedRole === 'collector' ? 'selected' : ''}">
                  <input type="radio" name="auth-role" value="collector" ${preselectedRole === 'collector' ? 'checked' : ''} onchange="window.appState.setAuthRole('collector')" />
                  <div class="role-card-inner">
                    <div class="role-icon-circle mint">
                      ${createLucideIcon('smartphone', { size: 20 })}
                    </div>
                    <div>
                      <h4 style="font-size:0.95rem;">${isHi ? 'अनौपचारिक कबाड़ी' : 'Informal Collector'}</h4>
                      <p style="font-size:0.75rem; color:var(--text-muted);">${isHi ? 'कबाड़ीवाला / एग्रीगेटर' : 'कबाड़ीवाला / Aggregator'}</p>
                    </div>
                  </div>
                </label>

                <label class="role-card ${preselectedRole === 'recycler' ? 'selected' : ''}">
                  <input type="radio" name="auth-role" value="recycler" ${preselectedRole === 'recycler' ? 'checked' : ''} onchange="window.appState.setAuthRole('recycler')" />
                  <div class="role-card-inner">
                    <div class="role-icon-circle amber">
                      ${createLucideIcon('building-2', { size: 20 })}
                    </div>
                    <div>
                      <h4 style="font-size:0.95rem;">${isHi ? 'सीपीसीबी रीसाइक्लर' : 'CPCB Recycler'}</h4>
                      <p style="font-size:0.75rem; color:var(--text-muted);">${isHi ? 'पंजीकृत रीसाइक्लर' : 'Registered Recycler'}</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            ${isSignUp ? `
              <!-- Sign Up Extra Fields: Username & Phone -->
              <div class="form-group">
                <label class="form-label" for="auth-username">${isHi ? 'उपयोगकर्ता नाम / पूरा नाम' : 'Username / Full Name'}</label>
                <div class="input-with-icon">
                  <span class="input-icon">${createLucideIcon('user', { size: 16 })}</span>
                  <input type="text" id="auth-username" class="form-input" placeholder="${isHi ? 'उदा. रमेश कुमार या इकोरीसायकल प्रा. लि.' : 'e.g. Ramesh Kumar or EcoRecycle Ltd'}" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="auth-phone">${isHi ? 'संपर्क फ़ोन नंबर (व्हाट्सएप सक्षम)' : 'Contact Phone Number (WhatsApp Enabled)'}</label>
                <div class="input-with-icon">
                  <span class="input-icon">${createLucideIcon('phone', { size: 16 })}</span>
                  <input type="tel" id="auth-phone" class="form-input" placeholder="e.g. +91 98201 44821" required />
                </div>
              </div>
            ` : ''}

            <!-- Email Field -->
            <div class="form-group">
              <label class="form-label" for="auth-email">${isHi ? 'ईमेल पता' : 'Email Address'}</label>
              <div class="input-with-icon">
                <span class="input-icon">${createLucideIcon('mail', { size: 16 })}</span>
                <input type="email" id="auth-email" class="form-input" placeholder="name@domain.com" required value="${!isSignUp && preselectedRole === 'collector' ? 'ramesh.collector@kabadisetu.in' : !isSignUp && preselectedRole === 'recycler' ? 'procurement@ecorecycle.in' : ''}" />
              </div>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label class="form-label" for="auth-password">${isHi ? 'पासवर्ड' : 'Password'}</label>
              <div class="input-with-icon">
                <span class="input-icon">${createLucideIcon('lock', { size: 16 })}</span>
                <input type="password" id="auth-password" class="form-input" placeholder="${isHi ? 'सुरक्षित पासवर्ड दर्ज करें' : 'Enter secure password'}" required value="${!isSignUp ? '••••••••' : ''}" />
              </div>
            </div>

            ${isSignUp && preselectedRole === 'recycler' ? `
              <div class="form-group">
                <label class="form-label" for="auth-cpcb">${isHi ? 'सीपीसीबी ई-कचरा पंजीकरण आईडी' : 'CPCB E-Waste Registration ID'}</label>
                <div class="input-with-icon">
                  <span class="input-icon">${createLucideIcon('file-badge', { size: 16 })}</span>
                  <input type="text" id="auth-cpcb" class="form-input" placeholder="CPCB/E-WASTE/REG-XXXX" required />
                </div>
              </div>
            ` : ''}

            <button type="submit" class="neu-btn auth-submit-btn" style="background:${preselectedRole === 'collector' ? 'var(--block-emerald)' : 'var(--block-amber)'}; color:#fff; width:100%; margin-top:16px;">
              ${createLucideIcon(isSignUp ? 'user-plus' : 'log-in', { size: 18 })}
              ${isSignUp 
                ? (isHi ? 'खाता बनाएं एवं डैशबोर्ड खोलें' : 'Create Account & Access Dashboard') 
                : (isHi ? 'डैशबोर्ड में लॉग इन करें' : 'Sign In to Dashboard')}
            </button>

            <!-- User Data Privacy Consent Notice (DPDP Act 2023 Compliant) -->
            <p style="font-size:0.75rem; color:var(--text-muted); text-align:center; margin-top:16px; line-height:1.5;">
              ${isHi ? 'प्रवेश करके, आप हमारी ' : 'By proceeding, you agree to our '}
              <a onclick="window.appState.openPrivacyModal()" style="color:var(--block-mint); font-weight:700; cursor:pointer; text-decoration:underline;">
                ${isHi ? 'डेटा गोपनीयता एवं सुरक्षा नीति (DPDP Act)' : 'User Data Privacy Policy (DPDP Act)'}
              </a>
              ${isHi ? ' से सहमत होते हैं।' : '.'}
            </p>

            <div class="data-source-badge" style="width:100%; box-sizing:border-box; margin-top:12px; justify-content:center; text-align:center;">
              ${createLucideIcon('shield-check', { size: 13, color: 'var(--block-mint)' })}
              <span><strong>Security:</strong> Supabase Authentication • Cryptographic JWT Route Guard • Strict Role Isolation</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

