import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderCollectorDashboardView(state) {
  const l = getLang(state);
  const isHi = state.currentLang === 'hi';
  const user = state.currentUser || { name: 'Ramesh Kumar', id: 'COL-8821', location: 'Dharavi Sector 4, Mumbai' };
  const userLots = state.sampleLots.filter(l => l.collectorId === user.id || l.collectorName === user.name);
  const pendingLots = userLots.filter(l => l.status === 'Pending Bid');
  const matchedLots = userLots.filter(l => l.status === 'Matched');
  const completedLots = userLots.filter(l => l.status === 'Handover Verified');

  const totalKg = userLots.reduce((acc, lot) => acc + (lot.weightKg || 0), 0);
  const totalValuation = userLots.reduce((acc, lot) => acc + (lot.finalTotal || lot.estimatedTotal || 0), 0);

  return `
    <div class="view-container">
      <!-- Collector Welcome & Vernacular Voice Guidance Banner -->
      <div class="color-block block-emerald neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <span class="badge badge-mint" style="background:rgba(255,255,255,0.25); color:#fff;">
                ${isHi ? 'कबाड़ीवाला पोर्टल' : 'Collector Portal (कबाड़ीवाला)'}
              </span>
              <span class="badge badge-amber" style="background:rgba(255,255,255,0.25); color:#fff;">ID: ${user.id}</span>
            </div>
            <h2 style="font-size:1.8rem; color:#ffffff; margin-bottom:6px;">
              ${l.welcomeCollector} ${user.name} ${isHi ? 'जी' : ''}
            </h2>
            <p style="font-size:0.92rem; opacity:0.92; max-width:760px;">
              ${l.collectorSubtitle}
            </p>
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="neu-btn" style="background:#ffffff; color:var(--block-emerald); font-weight:800;" onclick="window.appState.navigateTo('collector-upload')">
              ${createLucideIcon('plus-circle', { size: 18, color: 'var(--block-emerald)' })}
              ${l.scanAndCreateLot}
            </button>
            <button class="neu-btn" style="background:rgba(255,255,255,0.15); color:#ffffff; border:1px solid rgba(255,255,255,0.3);" onclick="alert('Playing vernacular voice guide in ${state.currentLang.toUpperCase()}...')">
              ${createLucideIcon('volume-2', { size: 18, color: '#ffffff' })}
              ${l.audioHelp}
            </button>
          </div>
        </div>
      </div>

      <!-- Collector Summary Metrics -->
      <div class="grid-4">
        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.totalLotsCreated}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-mint-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('layers', { size: 20, color: 'var(--block-emerald)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">${userLots.length} <span style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">${isHi ? 'लॉट' : 'Lots'}</span></h3>
          <p style="font-size:0.75rem; color:var(--block-mint); font-weight:700; margin-top:4px;">
            ${createLucideIcon('check', { size: 14, color: 'currentColor' })} ${completedLots.length} ${isHi ? 'सत्यापित' : 'Handover Verified'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: Collector Lot Ledger</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.totalWeightSold}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-cyan-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('scale', { size: 20, color: 'var(--block-cyan)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">${totalKg.toFixed(1)} <span style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">${isHi ? 'किग्रा' : 'KG'}</span></h3>
          <p style="font-size:0.75rem; color:var(--block-cyan); font-weight:700; margin-top:4px;">
            ${isHi ? 'उच्च श्रेणी ई-कचरा' : 'High-Grade E-Waste Fractions'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: Legal Metrology Act 2009 Scale Calibrations</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.estimatedRevenue}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-amber-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('indian-rupee', { size: 20, color: 'var(--block-amber)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800; color:var(--block-amber);">₹${totalValuation.toLocaleString()}</h3>
          <p style="font-size:0.75rem; color:var(--text-secondary); font-weight:700; margin-top:4px;">
            ${isHi ? 'सीधा यूपीआई / नकद भुगतान' : 'Direct Instant UPI / Cash Payout'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: NPCI Payment Gateway Logs</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${l.activeBidsReceived}</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-indigo-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('gavel', { size: 20, color: 'var(--block-indigo)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">${matchedLots.length + pendingLots.length} <span style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">${isHi ? 'सक्रिय' : 'Active'}</span></h3>
          <p style="font-size:0.75rem; color:var(--block-indigo); font-weight:700; margin-top:4px;">
            ${matchedLots.length} ${isHi ? 'पिकअप हेतु मैच' : 'Matched for Pickup'}
          </p>
          <div class="data-source-badge" style="font-size:0.68rem; margin-top:8px;">
            <span>Source: CPCB Recycler Marketplace Pool</span>
          </div>
        </div>
      </div>

      <!-- Quick Action Cards (Including EPR Stats Access) -->
      <div class="grid-4" style="margin-bottom:24px;">
        <div class="glass-card neu-box-sm action-card" onclick="window.appState.navigateTo('collector-upload')" style="cursor:pointer; padding:18px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px; height:44px; border-radius:12px; background:var(--block-emerald); color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ${createLucideIcon('camera', { size: 22, color: '#ffffff' })}
            </div>
            <div>
              <h4 style="font-size:0.95rem;">${l.aiScanCreate}</h4>
              <p style="font-size:0.75rem; color:var(--text-muted);">${isHi ? 'सामग्री पहचानें व भाव तय करें' : 'Identify material & set your price'}</p>
            </div>
          </div>
        </div>

        <div class="glass-card neu-box-sm action-card" onclick="window.appState.navigateTo('collector-lots')" style="cursor:pointer; padding:18px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px; height:44px; border-radius:12px; background:var(--block-amber); color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ${createLucideIcon('qr-code', { size: 22, color: '#ffffff' })}
            </div>
            <div>
              <h4 style="font-size:0.95rem;">${l.myLotsQr}</h4>
              <p style="font-size:0.75rem; color:var(--text-muted);">${isHi ? 'भुगतान हेतु क्यूआर दिखाएं' : 'Show QR for instant UPI payout'}</p>
            </div>
          </div>
        </div>

        <!-- EPR & Environmental Stats Page Access for Collector -->
        <div class="glass-card neu-box-sm action-card" onclick="window.appState.navigateTo('collector-epr')" style="cursor:pointer; padding:18px; border:1px solid rgba(16, 185, 129, 0.3);">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px; height:44px; border-radius:12px; background:var(--block-mint); color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ${createLucideIcon('file-check-2', { size: 22, color: '#ffffff' })}
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <h4 style="font-size:0.95rem;">${l.eprStats}</h4>
                <span class="badge badge-mint" style="font-size:0.65rem;">Impact</span>
              </div>
              <p style="font-size:0.75rem; color:var(--text-muted);">${isHi ? 'लैंडफिल डायवर्जन व ग्रीन क्रेडिट' : 'View landfill diversion & green credits'}</p>
            </div>
          </div>
        </div>

        <div class="glass-card neu-box-sm action-card" onclick="alert('${isHi ? 'सीपीसीबी दैनिक ई-कचरा मूल्य बोर्ड खुल रहा है...' : 'Viewing CPCB daily scrap price board...'}')" style="cursor:pointer; padding:18px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px; height:44px; border-radius:12px; background:var(--block-cyan); color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ${createLucideIcon('trending-up', { size: 22, color: '#ffffff' })}
            </div>
            <div>
              <h4 style="font-size:0.95rem;">${l.dailyBenchmarkRates}</h4>
              <p style="font-size:0.75rem; color:var(--text-muted);">${isHi ? 'तांबा, पीसीबी व बैटरी के ताजा भाव' : 'Daily rates for copper & PCBs'}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- DETAILED HOW IT WORKS SECTION FOR COLLECTORS -->
      <div class="glass-card neu-box" style="padding:28px; margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="badge badge-mint">${isHi ? 'कबाड़ीवाला गाइड' : 'Collector Guide'}</span>
              <span class="badge badge-indigo">${isHi ? '5 आसान चरण' : 'कबाड़ीवाला कार्यप्रणाली'}</span>
            </div>
            <h3 style="font-size:1.35rem; color:var(--text-primary);">${l.collectorWorkflowTitle}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">${l.collectorWorkflowSub}</p>
          </div>
          <button class="neu-btn" style="background:var(--block-emerald); color:#fff; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.navigateTo('collector-upload')">
            ${createLucideIcon('camera', { size: 15, color: '#ffffff' })}
            <span>${isHi ? 'अभी एआई जांचें' : 'Try AI Scan Now'}</span>
          </button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:16px;" class="workflow-steps-grid">
          <!-- Step 1 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-mint-light); color:var(--block-emerald);">1</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('camera', { size: 24, color: 'var(--block-mint)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.cStep1Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.cStep1Desc}
            </p>
          </div>

          <!-- Step 2 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-amber-light); color:var(--block-amber);">2</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('sparkles', { size: 24, color: 'var(--block-amber)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.cStep2Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.cStep2Desc}
            </p>
          </div>

          <!-- Step 3 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-cyan-light); color:var(--block-cyan);">3</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('gavel', { size: 24, color: 'var(--block-cyan)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.cStep3Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.cStep3Desc}
            </p>
          </div>

          <!-- Step 4 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-indigo-light); color:var(--block-indigo);">4</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('qr-code', { size: 24, color: 'var(--block-indigo)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.cStep4Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.cStep4Desc}
            </p>
          </div>

          <!-- Step 5 -->
          <div class="workflow-step-card neu-box-sm" style="padding:18px; border-radius:16px; background:var(--card-bg-solid);">
            <div class="step-badge-number" style="background:var(--block-copper-light); color:var(--block-copper);">5</div>
            <div style="margin:12px 0 8px;">
              ${createLucideIcon('file-badge', { size: 24, color: 'var(--block-copper)' })}
            </div>
            <h4 style="font-size:0.95rem; margin-bottom:6px;">${l.cStep5Title}</h4>
            <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.45;">
              ${l.cStep5Desc}
            </p>
          </div>
        </div>
      </div>

      <!-- Collector's Active Lots Table -->
      <div class="glass-card neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:1.25rem;">${l.myScrapLots}</h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">${l.trackBids}</p>
          </div>
          <button class="neu-btn" style="background:var(--block-mint); color:#fff; font-size:0.85rem; display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.navigateTo('collector-upload')">
            ${createLucideIcon('plus-circle', { size: 15, color: '#ffffff' })}
            <span>${l.newLotBtn}</span>
          </button>
        </div>

        <div class="custom-table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>${isHi ? 'लॉट आईडी व फोटो' : 'Lot ID & Photo'}</th>
                <th>${isHi ? 'सामग्री श्रेणी' : 'Material Category'}</th>
                <th>${isHi ? 'वजन' : 'Weight'}</th>
                <th>${isHi ? 'विक्रय भाव' : 'Your Asking Rate'}</th>
                <th>${isHi ? 'एआई बेंचमार्क' : 'AI Benchmark'}</th>
                <th>${isHi ? 'स्थिति / खरीदार' : 'Status / Buyer'}</th>
                <th>${isHi ? 'कुल मूल्य' : 'Total Value'}</th>
                <th>${isHi ? 'कार्रवाई' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              ${userLots.length > 0 ? userLots.map(lot => `
                <tr>
                  <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <img src="${lot.photoUrl}" style="width:44px; height:44px; border-radius:8px; object-fit:cover;" />
                      <div>
                        <strong>${lot.id}</strong>
                        <p style="font-size:0.75rem; color:var(--text-muted);">${lot.timestamp}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-indigo">${lot.category}</span>
                    <p style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">${lot.grade || (isHi ? 'एआई सत्यापित' : 'AI Verified')}</p>
                  </td>
                  <td><strong>${lot.weightKg} ${isHi ? 'किग्रा' : 'kg'}</strong></td>
                  <td><strong style="color:var(--block-emerald);">₹${lot.collectorPriceRate || lot.estimatedRateKg}/kg</strong></td>
                  <td>
                    <span style="font-size:0.82rem; color:var(--text-muted);">₹${lot.estimatedRateKg}/kg</span>
                    <span class="badge badge-mint" style="font-size:0.65rem; margin-left:4px;">${isHi ? 'ऐतिहासिक' : 'AI Historical'}</span>
                  </td>
                  <td>
                    <span class="badge ${lot.status === 'Handover Verified' ? 'badge-mint' : lot.status === 'Matched' ? 'badge-cyan' : 'badge-amber'}">
                      ${isHi && lot.status === 'Pending Bid' ? 'लंबित बोली' : isHi && lot.status === 'Matched' ? 'मैच हुआ' : isHi && lot.status === 'Handover Verified' ? 'सत्यापित' : lot.status}
                    </span>
                    ${lot.matchedRecycler ? `<p style="font-size:0.72rem; color:var(--text-muted); margin-top:3px;">${lot.matchedRecycler}</p>` : ''}
                  </td>
                  <td><strong style="color:var(--block-copper); font-size:1rem;">₹${(lot.finalTotal || lot.estimatedTotal || 0).toLocaleString()}</strong></td>
                  <td>
                    <button class="neu-btn" style="padding:6px 12px; font-size:0.75rem;" onclick="window.appState.navigateTo('collector-lots', '${lot.id}')">
                      ${createLucideIcon('qr-code', { size: 14 })} ${isHi ? 'हैंडओवर क्यूआर' : 'Handover QR'}
                    </button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">
                    ${isHi ? 'अभी तक कोई लॉट नहीं बनाया गया है। नया कचरा आइटम अपलोड करने के लिए "नया लॉट बनाएं" पर क्लिक करें!' : 'No lots created yet. Click "Scan & Create Lot" to upload your first e-waste item!'}
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:16px;">
          <div class="data-source-badge">
            ${createLucideIcon('database', { size: 12, color: 'var(--block-mint)' })}
            <span><strong>Data Source:</strong> CPCB Schedule III E-Waste Fractions & Local Hub Weighed Slips.</span>
          </div>
          <div class="data-source-badge">
            ${createLucideIcon('shield-check', { size: 12, color: 'var(--block-indigo)' })}
            <span><strong>IP Protected:</strong> KabadiSetu Collector Fair Value Protection System • Copyright Act 1957.</span>
          </div>
        </div>
      </div>

      <div class="ip-reservation-banner neu-box-sm">
        ${createLucideIcon('shield-check', { size: 18, color: 'var(--block-mint)' })}
        <div>
          <strong>Intellectual Property Rights Reserved:</strong>
          ${isHi
            ? ' कबाड़ीसेतु कलेक्टर डैशबोर्ड इंटरफेस, ऑफलाइन डेटा सिंकिंग आर्किटेक्चर तथा क्यूआर सत्यापन प्रोटोकॉल भारतीय बौद्धिक संपदा कानूनों के तहत सुरक्षित हैं।'
            : ' The KabadiSetu Collector Dashboard UX, offline caching architecture, and cryptographic QR handover protocols are protected under Indian Intellectual Property laws.'}
        </div>
      </div>
    </div>
  `;
}
