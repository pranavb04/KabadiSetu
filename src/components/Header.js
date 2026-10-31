import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderHeader(state) {
  // On landing or auth page, hide the app header
  if (state.currentView === 'landing' || state.currentView === 'auth') {
    return '';
  }

  const l = getLang(state);
  const isHi = state.currentLang === 'hi';

  const titlesEn = {
    'collector-dashboard': { 
      title: 'Collector Hub & Scrap Summary', 
      sub: 'Vernacular E-Waste Operations | Direct Recycler Link' 
    },
    'collector-upload': { 
      title: 'AI Material Camera & Lot Creation', 
      sub: 'TFLite Classification, Historical Price Recommendation & Custom Asking Price' 
    },
    'collector-lots': { 
      title: 'My Lots & Pickup Handover QR', 
      sub: 'Digital Chain of Custody & Instant UPI Escrow Receipts' 
    },
    'collector-epr': { 
      title: 'EPR & Environmental Impact Stats', 
      sub: 'Landfill Diversion Statistics | CPCB 2022 Green Credit Recognition' 
    },
    'recycler-dashboard': { 
      title: 'Recycler Procurement Overview', 
      sub: 'CPCB E-Waste Rules 2022 | Circular Feedstock Management' 
    },
    'recycler-marketplace': { 
      title: 'Verified Recycler Bidding Marketplace', 
      sub: 'Multi-Filter Sourcing by Material Grade, Price Range & Pickup Radius' 
    },
    'recycler-handover': { 
      title: 'Weighbridge & Handover QR Verification', 
      sub: 'Physical Receipt Check, GPS Timestamping & Escrow Release' 
    },
    'recycler-epr': { 
      title: 'EPR Credits & Environmental Audit Hub', 
      sub: 'Landfill Diversion Certifications & CPCB Filing Ledger' 
    }
  };

  const titlesHi = {
    'collector-dashboard': { 
      title: 'कबाड़ीवाला हब एवं स्क्रैप सारांश', 
      sub: 'स्थानीय भाषा संचालन | रीसाइक्लर्स से सीधा संपर्क' 
    },
    'collector-upload': { 
      title: 'एआई कैमरा सामग्री जांच व लॉट निर्माण', 
      sub: 'एआई वर्गीकरण, ऐतिहासिक मूल्य सुझाव एवं मनचाहा विक्रय भाव' 
    },
    'collector-lots': { 
      title: 'मेरे लॉट एवं पिकअप हैंडओवर क्यूआर', 
      sub: 'डिजिटल कस्टडी श्रृंखला एवं त्वरित यूपीआई एस्क्रो भुगतान रसीद' 
    },
    'collector-epr': { 
      title: 'ईपीआर एवं पर्यावरण प्रभाव सांख्यिकी', 
      sub: 'लैंडफिल डायवर्जन आंकड़े | सीपीसीबी 2022 हरित क्रेडिट' 
    },
    'recycler-dashboard': { 
      title: 'रीसाइक्लर खरीद एवं आपूर्ति अवलोकन', 
      sub: 'सीपीसीबी ई-कचरा नियम 2022 | सर्कुलर फीडस्टॉक प्रबंधन' 
    },
    'recycler-marketplace': { 
      title: 'सत्यापित रीसाइक्लर नीलामी मार्केटप्लेस', 
      sub: 'सामग्री श्रेणी, मूल्य सीमा व पिकअप दूरी के आधार पर मल्टी-फ़िल्टर खरीद' 
    },
    'recycler-handover': { 
      title: 'धर्मकांटा वजन व हैंडओवर क्यूआर सत्यापन', 
      sub: 'भौतिक रसीद जांच, जीपीएस समय-मुहर एवं एस्क्रो भुगतान जारी' 
    },
    'recycler-epr': { 
      title: 'ईपीआर क्रेडिट एवं पर्यावरण ऑडिट केंद्र', 
      sub: 'लैंडफिल डायवर्जन प्रमाणन एवं सीपीसीबी फाइलिंग खाता' 
    }
  };

  const currentInfo = (isHi ? titlesHi[state.currentView] : titlesEn[state.currentView]) || {
    title: l.appName,
    sub: l.appSubtitle
  };

  const offlineCount = state.sampleLots.filter(l => !l.syncedCloud).length;
  const role = state.currentRole || 'collector';

  return `
    <header class="app-header">
      <div class="header-left">
        <div style="display:flex; align-items:center; gap:12px;">
          <!-- Go Back Button with Return Arrow Symbol -->
          <button 
            id="btn-header-back" 
            class="neu-btn header-back-btn" 
            style="padding:6px 12px; font-size:0.78rem; display:inline-flex; align-items:center; gap:6px; cursor:pointer;" 
            onclick="window.appState.goBack()" 
            title="${l.goBack}"
          >
            ${createLucideIcon('arrow-left', { size: 15 })}
            <span style="font-weight:700;">${l.goBack}</span>
          </button>

          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <h1 class="page-title">${currentInfo.title}</h1>
              <span class="badge ${role === 'collector' ? 'badge-mint' : 'badge-amber'}" style="font-size:0.7rem;">
                ${role === 'collector' ? (isHi ? 'कबाड़ीवाला मोड' : 'Collector Mode') : (isHi ? 'रीसाइक्लर मोड' : 'Recycler Mode')}
              </span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted); font-weight: 500;">${currentInfo.sub}</p>
          </div>
        </div>
      </div>

      <div class="header-right">
        <!-- Network & Sync Queue Toggle with Functioning Wifi Symbol -->
        <button id="btn-sync-toggle" class="sync-status-btn neu-box-sm ${state.isOnline ? 'online' : 'offline'}" title="Click to toggle Network / Force Offline Sync">
          ${createLucideIcon(state.isOnline ? 'wifi' : 'wifi-off', { size: 14, color: state.isOnline ? 'var(--block-mint)' : 'var(--block-amber)' })}
          <span style="font-weight:700;">${state.isOnline ? l.online : l.offline}</span>
          ${offlineCount > 0 ? `<span class="badge badge-amber" style="margin-left:4px;">${offlineCount} ${l.pending}</span>` : ''}
        </button>

        <!-- Direct Working EPR Impact Hub Button with Leaf Symbol -->
        <button 
          id="btn-header-epr" 
          class="neu-btn header-epr-btn ${state.currentView.endsWith('-epr') ? 'active-epr' : ''}" 
          style="padding:6px 12px; font-size:0.78rem; display:inline-flex; align-items:center; gap:6px; cursor:pointer;" 
          onclick="window.appState.navigateTo(window.appState.state.currentRole === 'recycler' ? 'recycler-epr' : 'collector-epr')" 
          title="Open EPR Compliance & Environmental Impact Hub"
        >
          ${createLucideIcon('leaf', { size: 14, color: 'var(--block-mint)' })}
          <span style="font-weight:700;">${l.eprImpact}</span>
        </button>

        <!-- Themed Language Switcher with Symbols -->
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
          id="btn-theme-toggle" 
          class="theme-toggle-symbol-btn neu-box-sm" 
          title="Switch Theme (Current: ${state.currentTheme.toUpperCase()})"
          onclick="window.appState.toggleTheme()"
        >
          <span class="theme-symbol">${state.currentTheme === 'light' ? '🌙' : '☀️'}</span>
          <span class="theme-text-label">${state.currentTheme === 'light' ? l.darkMode : l.lightMode}</span>
        </button>

        <!-- Log Out Button with Symbol (replaces old Exit button) -->
        <button 
          id="btn-header-logout" 
          class="neu-btn header-logout-btn" 
          style="padding:6px 12px; font-size:0.78rem; display:inline-flex; align-items:center; gap:6px; cursor:pointer;" 
          onclick="window.appState.logout()" 
          title="${l.logOut}"
        >
          ${createLucideIcon('log-out', { size: 15 })}
          <span style="font-weight:700;">${l.logOut}</span>
        </button>
      </div>
    </header>
  `;
}
