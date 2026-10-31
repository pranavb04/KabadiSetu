import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderRecyclerDashboardView(state) {
  const l = getLang(state);
  const isHi = state.currentLang === 'hi';
  const user = state.currentUser || { 
    name: 'EcoRecycle India Pvt Ltd', 
    id: 'REC-001', 
    cpcbRegistration: 'CPCB/E-WASTE/REG-9011',
    location: 'Thane Industrial Belt, MH' 
  };

  const totalLots = state.sampleLots;
  const activeMarketLots = totalLots.filter(lot => lot.status === 'Pending Bid');
  const matchedLots = totalLots.filter(lot => lot.matchedRecycler === user.name || lot.status === 'Matched');

  return `
    <div class="view-container">
      <!-- Recycler Welcome Banner -->
      <div class="color-block block-amber neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <span class="badge badge-amber" style="background:rgba(255,255,255,0.25); color:#fff;">
                ${isHi ? 'सीपीसीबी अधिकृत रीसाइक्लर पोर्टल' : 'CPCB Authorized Recycler Portal'}
              </span>
              <span class="badge badge-mint" style="background:rgba(255,255,255,0.25); color:#fff;">Auth: ${user.cpcbRegistration || 'REG-9011'}</span>
            </div>
            <h2 style="font-size:1.8rem; color:#ffffff; margin-bottom:6px;">
              ${user.name}
            </h2>
            <p style="font-size:0.92rem; opacity:0.92; max-width:760px;">
              ${isHi 
                ? 'सत्यापित कबाड़ियों से सीधे पूर्व-वर्गीकृत ई-कचरा स्क्रैप लॉट खरीदें। लॉजिस्टिक्स को अनुकूलित करने और वार्षिक ईपीआर को पूरा करने के लिए सामग्री, मूल्य और दूरी के अनुसार फ़िल्टर करें।'
                : 'Procure pre-graded e-waste scrap lots directly from verified informal collectors. Filter by material grade, suitable price, and radius to optimize logistics and meet annual EPR quotas.'}
            </p>
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="neu-btn" style="background:#ffffff; color:var(--block-amber); font-weight:800;" onclick="window.appState.navigateTo('recycler-marketplace')">
              ${createLucideIcon('filter', { size: 18, color: 'var(--block-amber)' })}
              ${isHi ? 'लॉट खोजें व बोली लगाएं' : 'Filter & Bid Lots'}
            </button>
            <button class="neu-btn" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.3);" onclick="window.appState.navigateTo('recycler-epr')">
              ${createLucideIcon('file-check-2', { size: 18, color: '#ffffff' })}
              ${l.eprAuditHub}
            </button>
          </div>
        </div>
      </div>

      <!-- Recycler KPI Metrics -->
      <div class="grid-4">
        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.procuredThisMonth}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-mint-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('recycle', { size: 20, color: 'var(--block-emerald)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">48.2 <span style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">${isHi ? 'टन' : 'Tons'}</span></h3>
          <p style="font-size:0.75rem; color:var(--block-mint); font-weight:700; margin-top:4px;">
            ${createLucideIcon('trending-up', { size: 14, color: 'currentColor' })} +22.4% ${isHi ? 'गत माह की तुलना में' : 'vs last month'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: CPCB Annual EPR Target Schedule</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.activeOpenLots}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-amber-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('store', { size: 20, color: 'var(--block-amber)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800; color:var(--block-amber);">${activeMarketLots.length} <span style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">${isHi ? 'लॉट' : 'Lots'}</span></h3>
          <p style="font-size:0.75rem; color:var(--text-secondary); font-weight:700; margin-top:4px;">
            ${isHi ? 'मुंबई क्लस्टर्स में उपलब्ध' : 'Available across Mumbai scrap clusters'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: KabadiSetu Collector Aggregate Feeds</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.eprFulfillment}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-cyan-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('file-badge', { size: 20, color: 'var(--block-cyan)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">72.5%</h3>
          <p style="font-size:0.75rem; color:var(--block-cyan); font-weight:700; margin-top:4px;">
            ${isHi ? 'सीपीसीबी वित्त वर्ष 2026 लक्ष्य' : 'CPCB FY26 Compliance Goal'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: MoEFCC Gazette S.O. 5234(E) EPR Targets</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.pickupsReady}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-indigo-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('truck', { size: 20, color: 'var(--block-indigo)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">${matchedLots.length} <span style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">${isHi ? 'लॉट' : 'Lots'}</span></h3>
          <p style="font-size:0.75rem; color:var(--block-indigo); font-weight:700; margin-top:4px;">
            ${isHi ? 'पिकअप पर क्यूआर स्कैन करें' : 'Scan QR on collection'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: Haversine Geofenced Routing Engine</span>
          </div>
        </div>
      </div>

      <!-- Quick Shortcuts -->
      <div class="grid-3" style="margin-bottom:24px;">
        <div class="glass-card neu-box-sm action-card" onclick="window.appState.navigateTo('recycler-marketplace')" style="cursor:pointer; padding:20px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:48px; height:48px; border-radius:12px; background:var(--block-amber); color:#fff; display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('search', { size: 24, color: '#ffffff' })}
            </div>
            <div>
              <h4 style="font-size:1.05rem;">${l.recyclerMarketplace}</h4>
              <p style="font-size:0.8rem; color:var(--text-muted);">${isHi ? 'सामग्री, मूल्य व दूरी के अनुसार फ़िल्टर' : 'Filter by material, price range & radius'}</p>
            </div>
          </div>
        </div>

        <div class="glass-card neu-box-sm action-card" onclick="window.appState.navigateTo('recycler-handover')" style="cursor:pointer; padding:20px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:48px; height:48px; border-radius:12px; background:var(--block-emerald); color:#fff; display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('scan', { size: 24, color: '#ffffff' })}
            </div>
            <div>
              <h4 style="font-size:1.05rem;">${l.weighbridgeTrace}</h4>
              <p style="font-size:0.8rem; color:var(--text-muted);">${isHi ? 'कबाड़ी का क्यूआर स्कैन करें व भुगतान जारी करें' : 'Scan collector QR code and release payment'}</p>
            </div>
          </div>
        </div>

        <div class="glass-card neu-box-sm action-card" onclick="window.appState.navigateTo('recycler-epr')" style="cursor:pointer; padding:20px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:48px; height:48px; border-radius:12px; background:var(--block-indigo); color:#fff; display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('file-text', { size: 24, color: '#ffffff' })}
            </div>
            <div>
              <h4 style="font-size:1.05rem;">${l.eprAuditHub}</h4>
              <p style="font-size:0.8rem; color:var(--text-muted);">${isHi ? 'सीपीसीबी प्रमाणित अनुपालन फाइलिंग डाउनलोड' : 'Download CPCB certified compliance filings'}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- DETAILED HOW IT WORKS SECTION FOR RECYCLERS -->
      <div class="glass-card neu-box" style="padding:28px; margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="badge badge-amber">${isHi ? 'रीसाइक्लर आर्किटेक्चर' : 'Recycler Architecture'}</span>
              <span class="badge badge-mint">${isHi ? 'प्रक्रिया एवं कार्यप्रणाली' : 'Procurement & Compliance Workflow'}</span>
            </div>
            <h3 style="font-size:1.35rem; color:var(--text-primary);">${l.recyclerWorkflowTitle}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">${l.recyclerWorkflowSub}</p>
          </div>
          <button class="neu-btn" style="background:var(--block-amber); color:#fff; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.navigateTo('recycler-marketplace')">
            ${createLucideIcon('sliders-horizontal', { size: 14, color: '#ffffff' })}
            <span>${l.filterScrapLots}</span>
          </button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:16px;" class="workflow-steps-grid">
          <!-- Step 1 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-amber-light); color:var(--block-amber);">1</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('sliders-horizontal', { size: 24, color: 'var(--block-amber)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.rStep1Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.rStep1Desc}
            </p>
          </div>

          <!-- Step 2 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-mint-light); color:var(--block-emerald);">2</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('gavel', { size: 24, color: 'var(--block-mint)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.rStep2Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.rStep2Desc}
            </p>
          </div>

          <!-- Step 3 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-cyan-light); color:var(--block-cyan);">3</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('truck', { size: 24, color: 'var(--block-cyan)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.rStep3Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.rStep3Desc}
            </p>
          </div>

          <!-- Step 4 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-indigo-light); color:var(--block-indigo);">4</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('scan', { size: 24, color: 'var(--block-indigo)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.rStep4Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.rStep4Desc}
            </p>
          </div>

          <!-- Step 5 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-copper-light); color:var(--block-copper);">5</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('file-check-2', { size: 24, color: 'var(--block-copper)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.rStep5Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.rStep5Desc}
            </p>
          </div>
        </div>
      </div>

      <!-- Urgent Nearby Lots Waiting for Bids -->
      <div class="glass-card neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:1.25rem;">${l.urgentLotsTitle}</h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">${isHi ? 'बोली स्वीकार होते ही तुरंत पिकअप के लिए उपलब्ध' : 'Ready for immediate collection upon bid acceptance'}</p>
          </div>
          <button class="neu-btn" style="background:var(--block-amber); color:#fff; font-size:0.85rem; display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.navigateTo('recycler-marketplace')">
            <span>${isHi ? 'मार्केटप्लेस में सभी देखें' : 'View All in Marketplace'}</span>
            ${createLucideIcon('arrow-right', { size: 14, color: '#ffffff' })}
          </button>
        </div>

        <div class="grid-2">
          ${activeMarketLots.slice(0, 4).map(lot => `
            <div class="glass-card neu-box-sm style-card" style="padding:18px;">
              <div style="display:flex; gap:14px;">
                <img src="${lot.photoUrl}" style="width:72px; height:72px; border-radius:10px; object-fit:cover;" />
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <span class="badge badge-indigo">${lot.category}</span>
                    <span class="badge badge-mint" style="font-weight:700;">${lot.distanceKm} ${isHi ? 'किमी दूर' : 'km away'}</span>
                  </div>
                  <h4 style="font-size:1rem; margin:6px 0 2px;">${lot.id}</h4>
                  <p style="font-size:0.75rem; color:var(--text-muted); display:flex; align-items:center; gap:8px; margin:3px 0;">
                    <span style="display:inline-flex; align-items:center; gap:3px;">${createLucideIcon('map-pin', { size: 12 })} ${lot.location}</span>
                    <span style="display:inline-flex; align-items:center; gap:3px;">${createLucideIcon('user', { size: 12 })} ${lot.collectorName}</span>
                  </p>
                  
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; padding-top:8px; border-top:1px solid var(--card-border-subtle);">
                    <div>
                      <span style="font-size:0.7rem; color:var(--text-muted);">${isHi ? 'वजन' : 'Weight'}: <strong>${lot.weightKg} ${isHi ? 'किग्रा' : 'kg'}</strong></span>
                      <p style="font-size:0.95rem; font-weight:800; color:var(--block-emerald);">${isHi ? 'मांग' : 'Asking'}: ₹${lot.collectorPriceRate || lot.estimatedRateKg}/kg</p>
                    </div>
                    <button class="neu-btn" style="padding:6px 12px; font-size:0.8rem; background:var(--block-amber); color:#fff; display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.openBidModal('${lot.id}')">
                      ${createLucideIcon('gavel', { size: 13, color: '#ffffff' })}
                      <span>${isHi ? 'बोली लगाएं' : 'Bid Offer'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Recycler IP Reservation Banner -->
      <div class="ip-reservation-banner neu-box-sm" style="margin-top:20px;">
        ${createLucideIcon('shield-check', { size: 18, color: 'var(--block-mint)' })}
        <div>
          <strong>Intellectual Property & Statutory Recycler Licensing:</strong>
          ${isHi
            ? ' कबाड़ीसेतु रीसाइक्लर नीलामी प्रणाली, ईपीआर कोटा मिलान एल्गोरिथम एवं डिजिटल कस्टडी सत्यापन प्रारूप भारतीय बौद्धिक संपदा कानूनों के तहत पूर्णतः सुरक्षित हैं। सीपीसीबी पंजीकरण: CPCB/E-WASTE/REG-9011।'
            : ' KabadiSetu dynamic auction engine, EPR quota fulfillment matching algorithms, and tamper-proof manifest custody schemas are proprietary intellectual property. Recycler Registry Reference: CPCB/E-WASTE/REG-9011.'}
        </div>
      </div>
    </div>
  `;
}
