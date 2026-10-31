import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderHandoverView(state, targetLotId) {
  const l = getLang(state);
  const isHi = state.currentLang === 'hi';
  const lot = state.sampleLots.find(l => l.id === targetLotId) || state.sampleLots[0];

  return `
    <div class="view-container">
      <!-- Banner -->
      <div class="color-block block-indigo neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <span class="badge badge-indigo" style="background:rgba(255,255,255,0.25); color:#fff; margin-bottom:6px;">${isHi ? 'डिजिटल कस्टडी सत्यापन' : 'Chain of Custody Verification'}</span>
            <h2 style="font-size:1.6rem; color:#ffffff;">${isHi ? 'डिजिटल क्यूआर हैंडओवर एवं रसीद सत्यापन' : 'Digital QR Handover & Receipt Verification'}</h2>
            <p style="font-size:0.9rem; opacity:0.9; max-width:700px;">
              ${isHi ? 'क्यूआर कोड स्कैन, जीपीएस समय-मुहर और त्वरित ऑनलाइन एस्क्रो भुगतान के साथ सुरक्षित भौतिक कस्टडी सत्यापन।' : 'Secure physical-to-digital handover verification via QR code scan, GPS timestamping, and instant ledger payment dispatch.'}
            </p>
          </div>
          <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            <button class="neu-btn" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.35); display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.goBack()">
              ${createLucideIcon('arrow-left', { size: 16, color: '#ffffff' })}
              <span>${l.goBack}</span>
            </button>
            <button class="neu-btn" style="background:#ffffff; color:var(--block-indigo);" onclick="window.appState.verifyHandover('${lot.id}')">
              ${createLucideIcon('check-circle-2', { size: 18 })} ${isHi ? 'रीसाइक्लर क्यूआर सत्यापन सिमुलेट करें' : 'Simulate Recycler QR Verification'}
            </button>
          </div>
        </div>
      </div>

      <!-- Main Handover Grid -->
      <div class="grid-2">
        <!-- QR Code Receipt Box -->
        <div class="glass-card neu-box" style="padding:28px; text-align:center;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <span class="badge badge-indigo">${isHi ? 'क्यूआर हैंडओवर रसीद' : 'QR Handover Receipt'}</span>
            <span class="badge ${lot.status === 'Handover Verified' ? 'badge-mint' : 'badge-amber'}">
              ${lot.status === 'Handover Verified' ? (isHi ? 'हैंडओवर सत्यापित' : lot.status) : (isHi ? 'पिकअप हेतु तैयार' : lot.status)}
            </span>
          </div>

          <!-- Dynamic QR Code Container -->
          <div class="neu-box-sm" style="display:inline-block; padding:20px; background:#ffffff; border-radius:20px; margin-bottom:16px;">
            <canvas id="handover-qr-canvas" style="width:200px; height:200px; display:block; margin:0 auto;"></canvas>
          </div>

          <h4 style="font-size:1.1rem; font-family:var(--font-mono); margin-bottom:4px;">${lot.id}</h4>
          <p style="font-size:0.8rem; color:var(--text-muted);">${isHi ? 'समय-मुहर' : 'Timestamp'}: ${lot.timestamp}</p>

          <div style="margin-top:20px; padding:14px; background:var(--input-bg); border-radius:14px; text-align:left;" class="neu-inset">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; margin-bottom:8px;">
              <span style="color:var(--text-muted); display:inline-flex; align-items:center; gap:6px;">
                ${createLucideIcon('user', { size: 14, color: 'var(--text-muted)' })}
                ${isHi ? 'कबाड़ी आईडी:' : 'Collector ID:'}
              </span>
              <strong>${lot.collectorId} (${lot.collectorName})</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; margin-bottom:8px;">
              <span style="color:var(--text-muted); display:inline-flex; align-items:center; gap:6px;">
                ${createLucideIcon('layers', { size: 14, color: 'var(--text-muted)' })}
                ${isHi ? 'सामग्री श्रेणी:' : 'Material:'}
              </span>
              <strong>${lot.category}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; margin-bottom:8px;">
              <span style="color:var(--text-muted); display:inline-flex; align-items:center; gap:6px;">
                ${createLucideIcon('scale', { size: 14, color: 'var(--text-muted)' })}
                ${isHi ? 'सत्यापित वजन:' : 'Verified Weight:'}
              </span>
              <strong>${lot.weightKg} kg</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem; margin-top:8px; padding-top:8px; border-top:1px solid var(--card-border-subtle); color:var(--block-emerald);">
              <span style="display:inline-flex; align-items:center; gap:6px;">
                ${createLucideIcon('indian-rupee', { size: 15, color: 'var(--block-emerald)' })}
                ${isHi ? 'भुगतान राशि:' : 'Payout Amount:'}
              </span>
              <strong>₹${(lot.finalTotal || lot.estimatedTotal).toLocaleString()}</strong>
            </div>
          </div>

          <div style="display:flex; gap:12px; margin-top:20px;">
            <button class="neu-btn" style="flex:1;" onclick="window.print()">
              ${createLucideIcon('printer', { size: 16 })} ${isHi ? 'रसीद प्रिंट करें' : 'Print Physical Receipt'}
            </button>
            <button class="neu-btn" style="flex:1; background:var(--block-emerald); color:#fff;" onclick="window.appState.verifyHandover('${lot.id}')">
              ${createLucideIcon('qr-code', { size: 16, color: '#ffffff' })} ${isHi ? 'स्कैन व पिकअप पुष्टि' : 'Scan & Confirm Pickup'}
            </button>
          </div>
        </div>

        <!-- Verification Checklist & Audit Log -->
        <div class="glass-card neu-box" style="padding:28px;">
          <h3 style="font-size:1.2rem; margin-bottom:16px;">${isHi ? 'कस्टडी सत्यापन चेकलिस्ट' : 'Chain of Custody Checklist'}</h3>

          <div style="display:flex; flex-direction:column; gap:16px;">
            <!-- Step 1 -->
            <div style="display:flex; align-items:flex-start; gap:14px; padding:14px; background:var(--input-bg); border-radius:14px;" class="neu-inset">
              <div style="width:32px; height:32px; border-radius:50%; background:var(--block-mint-light); color:var(--block-emerald); display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon('check', { size: 18 })}
              </div>
              <div>
                <h4 style="font-size:0.95rem;">${isHi ? 'एआई सामग्री वर्गीकरण सत्यापित' : 'AI Material Classification Verified'}</h4>
                <p style="font-size:0.78rem; color:var(--text-muted);">${lot.category} (${isHi ? 'सटीकता' : 'Accuracy'} ${lot.aiConfidence}%)</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div style="display:flex; align-items:flex-start; gap:14px; padding:14px; background:var(--input-bg); border-radius:14px;" class="neu-inset">
              <div style="width:32px; height:32px; border-radius:50%; background:var(--block-mint-light); color:var(--block-emerald); display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon('check', { size: 18 })}
              </div>
              <div>
                <h4 style="font-size:0.95rem;">${isHi ? 'सीपीसीबी अधिकृत रीसाइक्लर से मिलान' : 'CPCB Authorized Recycler Matched'}</h4>
                <p style="font-size:0.78rem; color:var(--text-muted);">${lot.matchedRecycler || 'EcoRecycle India Pvt Ltd'} (${lot.recyclerCpcb || 'CPCB/E-WASTE/REG-9011'})</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div style="display:flex; align-items:flex-start; gap:14px; padding:14px; background:var(--input-bg); border-radius:14px;" class="neu-inset">
              <div style="width:32px; height:32px; border-radius:50%; background:${lot.status === 'Handover Verified' ? 'var(--block-mint-light)' : 'var(--block-amber-light)'}; color:${lot.status === 'Handover Verified' ? 'var(--block-emerald)' : 'var(--block-amber)'}; display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon(lot.status === 'Handover Verified' ? 'check' : 'clock', { size: 18 })}
              </div>
              <div>
                <h4 style="font-size:0.95rem;">${isHi ? 'धर्मकांटा वजन एवं गुणवत्ता जांच' : 'Physical Weight & Proof Scan'}</h4>
                <p style="font-size:0.78rem; color:var(--text-muted);">${lot.weightKg} kg ${isHi ? 'सकल वजन रीसाइक्लर स्केल पर पुष्ट' : 'gross weight confirmed at recycler scale'}</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div style="display:flex; align-items:flex-start; gap:14px; padding:14px; background:var(--input-bg); border-radius:14px;" class="neu-inset">
              <div style="width:32px; height:32px; border-radius:50%; background:${lot.status === 'Handover Verified' ? 'var(--block-mint-light)' : 'var(--block-amber-light)'}; color:${lot.status === 'Handover Verified' ? 'var(--block-emerald)' : 'var(--block-amber)'}; display:flex; align-items:center; justify-content:center;">
                ${createLucideIcon(lot.status === 'Handover Verified' ? 'shield-check' : 'lock', { size: 18 })}
              </div>
              <div>
                <h4 style="font-size:0.95rem;">${isHi ? 'त्वरित एस्क्रो भुगतान जारी' : 'Instant Escrow Payment Release'}</h4>
                <p style="font-size:0.78rem; color:var(--text-muted);">${isHi ? 'भुगतान माध्यम' : 'Payout'}: ${lot.paymentMethod || 'UPI Instant Escrow'} | ${isHi ? 'स्थिति: ' + (lot.status === 'Handover Verified' ? 'भुगतान संपन्न' : 'एस्क्रो में सुरक्षित') : 'Status: ' + (lot.status === 'Handover Verified' ? 'PAID & SETTLED' : 'LOCKED IN ESCROW')}</p>
              </div>
            </div>
          </div>

          <div class="data-source-badge" style="margin-top:16px;">
            ${createLucideIcon('database', { size: 12, color: 'var(--block-mint)' })}
            <span><strong>Statutory Manifest Source:</strong> MoEFCC Form 6 (E-Waste Movement Manifest System) & Section 14 CPCB Guidelines.</span>
          </div>
        </div>
      </div>

      <!-- IP Reservation Notice -->
      <div class="ip-reservation-banner neu-box-sm" style="margin-top:20px;">
        ${createLucideIcon('shield-check', { size: 18, color: 'var(--block-mint)' })}
        <div>
          <strong>Intellectual Property Rights Reserved:</strong>
          ${isHi
            ? ' कबाड़ीसेतु क्रिप्टोग्राफिक क्यूआर भौतिक-डिजिटल हैंडओवर प्रोटोकॉल तथा स्वचालित एस्क्रो भुगतान रिलीज आर्किटेक्चर भारतीय पेटेंट अधिनियम एवं कॉपीराइट अधिनियम, 1957 के तहत संरक्षित बौद्धिक संपदा हैं।'
            : ' The KabadiSetu cryptographic QR physical-to-digital custody protocol and automated escrow dispatch logic are proprietary intellectual property protected under Indian Patent and Copyright laws.'}
        </div>
      </div>
    </div>
  `;
}
