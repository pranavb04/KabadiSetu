import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderSidebar(state) {
  // Hide sidebar on public landing page and auth page
  if (state.currentView === 'landing' || state.currentView === 'auth') {
    return '';
  }

  const l = getLang(state);
  const role = state.currentRole || 'collector';
  const user = state.currentUser || (role === 'collector' ? {
    name: 'Ramesh Kumar',
    id: 'COL-8821',
    role: 'collector',
    location: 'Dharavi Sector 4, Mumbai'
  } : {
    name: 'EcoRecycle India Pvt Ltd',
    id: 'REC-001',
    role: 'recycler',
    cpcbRegistration: 'CPCB/E-WASTE/REG-9011',
    location: 'Thane Industrial Belt, MH'
  });

  // Collector navigation items
  const collectorNav = [
    { id: 'collector-dashboard', label: l.collectorDashboard, icon: 'layout-dashboard', badge: 'Overview' },
    { id: 'collector-upload', label: l.aiScanCreate, icon: 'camera', badge: 'AI & Rate' },
    { id: 'collector-lots', label: l.myLotsQr, icon: 'qr-code', badge: 'Handover' },
    { id: 'collector-epr', label: l.eprStats, icon: 'file-check-2', badge: 'Impact' }
  ];

  // Recycler-only navigation items
  const recyclerNav = [
    { id: 'recycler-dashboard', label: l.recyclerDashboard, icon: 'layout-dashboard', badge: 'Overview' },
    { id: 'recycler-marketplace', label: l.recyclerMarketplace, icon: 'store', badge: 'Filtered' },
    { id: 'recycler-handover', label: l.weighbridgeTrace, icon: 'scan', badge: 'Verification' },
    { id: 'recycler-epr', label: l.eprAuditHub, icon: 'file-check-2', badge: 'CPCB 2022' }
  ];

  const navItems = role === 'collector' ? collectorNav : recyclerNav;
  const isOpen = state.isMobileNavOpen;

  return `
    <!-- Mobile Backdrop -->
    ${isOpen ? `<div class="mobile-nav-backdrop" onclick="window.appState.closeMobileNav()"></div>` : ''}

    <aside class="app-sidebar glass-panel ${isOpen ? 'mobile-open' : ''}">
      <!-- Brand Logo Header & Mobile Close -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
        <div class="sidebar-brand" style="cursor:pointer;" onclick="window.appState.closeMobileNav(); window.appState.navigateTo('landing')" title="Go to Home / Landing">
          <div class="brand-icon-box" style="border: 2px solid var(--block-mint);">
            <img src="/logo.png" alt="KABADISETU" class="brand-logo-img" />
          </div>
          <div class="brand-text-block">
            <h2 class="brand-title">${l.appName}</h2>
            <span class="brand-subtitle">${l.appSubtitle}</span>
          </div>
        </div>

        <!-- Mobile Drawer Close Button -->
        <button 
          class="mobile-sidebar-close-btn neu-btn" 
          onclick="window.appState.closeMobileNav()" 
          title="Close Navigation"
          aria-label="Close Navigation"
        >
          ${createLucideIcon('x', { size: 18 })}
        </button>
      </div>

      <!-- Current Role Mode Badge -->
      <div class="role-mode-badge-box neu-inset" style="padding:10px 14px; border-radius:12px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.65rem; text-transform:uppercase; font-weight:800; color:var(--text-muted); display:block;">${l.activeRole}</span>
          <span class="badge ${role === 'collector' ? 'badge-mint' : 'badge-amber'}" style="font-weight:700;">
            ${role === 'collector' ? (state.currentLang === 'hi' ? 'कबाड़ीवाला' : 'Collector') : (state.currentLang === 'hi' ? 'रीसाइक्लर' : 'CPCB Recycler')}
          </span>
        </div>
        <button 
          class="neu-btn" 
          style="padding:5px 9px; font-size:0.72rem; background:transparent; display:inline-flex; align-items:center; gap:4px;" 
          title="Switch Account Role" 
          onclick="window.appState.closeMobileNav(); window.appState.navigateTo('auth')"
        >
          ${createLucideIcon('refresh-cw', { size: 12 })}
          <span>${l.switch}</span>
        </button>
      </div>

      <!-- Navigation List (Strictly role-isolated) -->
      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <a class="nav-item ${state.currentView === item.id ? 'active' : ''}" data-view="${item.id}" onclick="window.appState.closeMobileNav(); window.appState.navigateTo('${item.id}');">
            <span class="nav-icon">
              ${createLucideIcon(item.icon, { size: 19, color: state.currentView === item.id ? 'var(--block-mint)' : 'currentColor' })}
            </span>
            <span class="nav-text">${item.label}</span>
            ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          </a>
        `).join('')}
      </nav>

      <!-- Privacy Policy & Public Landing Page Links -->
      <div style="margin-top:auto; margin-bottom:12px; display:flex; flex-direction:column; gap:8px;">
        <button class="neu-btn" style="width:100%; font-size:0.78rem; background:transparent; border:1px solid var(--card-border-subtle); color:var(--text-muted); display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="window.appState.closeMobileNav(); window.appState.openPrivacyModal()">
          ${createLucideIcon('shield-check', { size: 14 })}
          <span>${state.currentLang === 'hi' ? 'डेटा गोपनीयता नीति' : 'Data Privacy Charter'}</span>
        </button>
        <button class="neu-btn" style="width:100%; font-size:0.8rem; background:var(--input-bg); color:var(--text-secondary); display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="window.appState.closeMobileNav(); window.appState.goBack()">
          ${createLucideIcon('arrow-left', { size: 15 })} <span>${l.goBack}</span>
        </button>
      </div>

      <!-- User Profile Box & Sign Out -->
      <div class="sidebar-user-card neu-box-sm">
        <div class="user-avatar" style="background:${role === 'collector' ? 'var(--block-emerald)' : 'var(--block-amber)'}; color:#fff;">
          ${user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div class="user-info">
          <span class="user-name">${user.name}</span>
          <span class="user-role">${role === 'collector' ? `ID: ${user.id}` : `REG: ${user.cpcbRegistration || user.id}`}</span>
        </div>
        <button class="sign-out-btn" title="${l.logOut}" onclick="window.appState.closeMobileNav(); window.appState.logout()">
          ${createLucideIcon('log-out', { size: 16 })}
        </button>
      </div>
    </aside>
  `;
}
