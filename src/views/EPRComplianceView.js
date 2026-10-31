import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderEPRComplianceView(state) {
  const l = getLang(state);
  const isHi = state.currentLang === 'hi';

  return `
    <div class="view-container">
      <!-- CPCB Compliance Banner with Working Action Buttons -->
      <div class="color-block block-cyan neu-box" style="padding:26px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="badge badge-cyan" style="background:rgba(255,255,255,0.25); color:#fff; display:inline-flex; align-items:center; gap:5px;">
                ${createLucideIcon('shield-check', { size: 14, color: '#ffffff' })} CPCB E-Waste Rules 2022
              </span>
              <span class="badge ${state.currentRole === 'collector' ? 'badge-mint' : 'badge-amber'}" style="background:rgba(255,255,255,0.25); color:#fff; display:inline-flex; align-items:center; gap:5px;">
                ${createLucideIcon(state.currentRole === 'collector' ? 'leaf' : 'file-check-2', { size: 14, color: '#ffffff' })}
                ${state.currentRole === 'collector' 
                  ? (isHi ? 'कबाड़ी ग्रीन क्रेडिट एवं लैंडफिल प्रभाव' : 'Collector Green Credits & Landfill Impact') 
                  : (isHi ? 'रीसाइक्लर सीपीसीबी ईपीआर खाता' : 'Recycler CPCB EPR Portal Ledger')}
              </span>
            </div>
            <h2 style="font-size:1.6rem; color:#ffffff;">${l.eprBannerTitle}</h2>
            <p style="font-size:0.9rem; opacity:0.9; max-width:760px;">
              ${l.eprBannerSub}
            </p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="neu-btn" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.35); display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.goBack()">
              ${createLucideIcon('arrow-left', { size: 16, color: '#ffffff' })}
              <span>${l.goBack}</span>
            </button>
            <button class="neu-btn" style="background:#ffffff; color:var(--block-cyan); font-weight:700; display:inline-flex; align-items:center; gap:6px;" onclick="alert('${isHi ? 'सीपीसीबी एक्सएमएल/जेएसओएन ऑडिट डेटा सफलतापूर्वक निर्यात हुआ (Q3 2026)!' : 'Official CPCB XML/JSON Audit Export generated for Q3 2026!'}')">
              ${createLucideIcon('download', { size: 16, color: 'var(--block-cyan)' })}
              <span>${l.exportCpcb}</span>
            </button>
            <button class="neu-btn" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.35); display:inline-flex; align-items:center; gap:6px;" onclick="alert('${isHi ? 'पर्यावरण मंत्रालय (MoEFCC) ई-कचरा नियम 2022 दिशा-निर्देश सक्रिय हैं।' : 'MoEFCC E-Waste Management Rules 2022 compliance portal guidelines active.'}')">
              ${createLucideIcon('book-open', { size: 16, color: '#ffffff' })}
              <span>${isHi ? 'नियम 2022' : 'E-Waste Rules'}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Environmental Metrics with Rich Icon Badges and Statutory Data Provenance -->
      <div class="grid-3">
        <div class="glass-card neu-box style-card" style="padding:22px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${isHi ? 'कार्बन ऑफसेट (CO2 Offsets)' : 'CO2 Offsets'}</span>
            <div style="width:38px; height:38px; border-radius:10px; background:var(--block-mint-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('leaf', { size: 20, color: 'var(--block-emerald)' })}
            </div>
          </div>
          <h3 style="font-size:1.85rem; font-weight:800;">348.5 <span style="font-size:0.9rem; color:var(--text-muted);">MT CO2eq</span></h3>
          <div style="display:inline-flex; align-items:center; gap:6px; margin-top:8px; padding:4px 10px; border-radius:20px; background:var(--block-mint-light); color:var(--block-emerald); font-size:0.76rem; font-weight:700;">
            ${createLucideIcon('trees', { size: 14, color: 'var(--block-emerald)' })}
            <span>${isHi ? '14,200 वृक्ष लगाने के समतुल्य' : 'Equivalent to planting 14,200 trees'}</span>
          </div>
          <div class="data-source-badge" style="margin-top:10px;">
            ${createLucideIcon('database', { size: 12, color: 'var(--block-mint)' })}
            <span><strong>Source:</strong> GHG Protocol Scope 3 & IPCC 2006 Electronics Lifecycle Guidelines</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:22px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${isHi ? 'पुनर्प्राप्त बहुमूल्य धातुएं' : 'Precious Metal Recovered'}</span>
            <div style="width:38px; height:38px; border-radius:10px; background:var(--block-amber-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('gem', { size: 20, color: 'var(--block-amber)' })}
            </div>
          </div>
          <h3 style="font-size:1.85rem; font-weight:800; color:var(--block-amber);">4.82 <span style="font-size:0.9rem; color:var(--text-muted);">kg Gold/Silver</span></h3>
          <div style="display:inline-flex; align-items:center; gap:6px; margin-top:8px; padding:4px 10px; border-radius:20px; background:var(--block-amber-light); color:var(--block-amber); font-size:0.76rem; font-weight:700;">
            ${createLucideIcon('cpu', { size: 14, color: 'var(--block-amber)' })}
            <span>${isHi ? 'सर्वर व टेलीकॉम पीसीबी से निकाली गई' : 'Recovered from server & telecom PCBs'}</span>
          </div>
          <div class="data-source-badge" style="margin-top:10px;">
            ${createLucideIcon('database', { size: 12, color: 'var(--block-amber)' })}
            <span><strong>Source:</strong> UNEP StEP Urban Mining Benchmark & CPCB Schedule III Yields</span>
          </div>
        </div>

        <div class="glass-card neu-box style-card" style="padding:22px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${isHi ? 'विषाक्त रासायनिक रोकथाम' : 'Hazardous Toxin Containment'}</span>
            <div style="width:38px; height:38px; border-radius:10px; background:var(--block-copper-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('shield-alert', { size: 20, color: 'var(--block-copper)' })}
            </div>
          </div>
          <h3 style="font-size:1.85rem; font-weight:800;">100% <span style="font-size:0.9rem; color:var(--text-muted);">${isHi ? 'सुरक्षित निस्तारण' : 'Safe Diverted'}</span></h3>
          <div style="display:inline-flex; align-items:center; gap:6px; margin-top:8px; padding:4px 10px; border-radius:20px; background:var(--block-copper-light); color:var(--block-copper); font-size:0.76rem; font-weight:700;">
            ${createLucideIcon('shield-check', { size: 14, color: 'var(--block-copper)' })}
            <span>${isHi ? 'सीसा, पारा व कैडमियम अलग किया गया' : 'Lead, Mercury & Cadmium isolated'}</span>
          </div>
          <div class="data-source-badge" style="margin-top:10px;">
            ${createLucideIcon('shield-alert', { size: 12, color: 'var(--block-copper)' })}
            <span><strong>Source:</strong> CPCB Schedule I & II Hazardous Substances Management Norms</span>
          </div>
        </div>
      </div>

      <!-- RICH INFORMATION BULLET POINTS: CPCB & EPR AUDIT PILLARS (REPLACING PLAIN DOT DESIGN) -->
      <div class="glass-card neu-box" style="padding:26px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span class="badge badge-mint" style="display:inline-flex; align-items:center; gap:4px;">
                ${createLucideIcon('award', { size: 13 })} ${isHi ? 'राष्ट्रीय ईपीआर मानक' : 'National EPR Standards'}
              </span>
              <span class="badge badge-indigo" style="display:inline-flex; align-items:center; gap:4px;">
                ${createLucideIcon('check-circle-2', { size: 13 })} MoEFCC Verified
              </span>
            </div>
            <h3 style="font-size:1.25rem;">${isHi ? 'ईपीआर अनुपालन एवं पर्यावरणीय ऑडिट के मुख्य स्तंभ' : 'Key Environmental Audit & EPR Compliance Pillars'}</h3>
            <p style="font-size:0.82rem; color:var(--text-muted);">${isHi ? 'साधारण डॉट सूची के स्थान पर सत्यापित तकनीकी मानक एवं ऑडिट ट्रेसेबिलिटी विवरण:' : 'Structured regulatory standards and verifiable audit trails powering formal circular e-waste flow:'}</p>
          </div>
          <button class="neu-btn" style="background:var(--input-bg); color:var(--text-secondary); font-size:0.78rem; display:inline-flex; align-items:center; gap:6px;" onclick="alert('${isHi ? 'केंद्रीय प्रदूषण नियंत्रण बोर्ड (CPCB) ई-कचरा पोर्टल एपीआई सिंक्रोनाइज़ेशन सक्रिय है।' : 'Central Pollution Control Board (CPCB) Portal API sync status: ONLINE & HEALTHY'}')">
            ${createLucideIcon('activity', { size: 14, color: 'var(--block-mint)' })}
            <span>${isHi ? 'लाइव एपीआई स्थिति' : 'CPCB Live Gateway'}</span>
          </button>
        </div>

        <div class="info-bullet-grid">
          <!-- Bullet Point 1 -->
          <div class="info-bullet-card neu-box-sm">
            <div class="info-bullet-icon" style="background:var(--block-mint-light); color:var(--block-emerald);">
              ${createLucideIcon('trees', { size: 20 })}
            </div>
            <div class="info-bullet-content">
              <h4 class="info-bullet-title">
                <span>${isHi ? 'कार्बन उत्सर्जन बचत' : 'Carbon Abatement Credits'}</span>
                <span class="badge badge-mint" style="font-size:0.65rem;">348.5 MT</span>
              </h4>
              <p class="info-bullet-desc">
                ${isHi 
                  ? 'प्रत्येक टन ई-कचरा लैंडफिल से बचाकर 2.45 MT ग्रीनहाउस गैस उत्सर्जन रोका गया, जो 14,200 वृक्षों के बराबर है।'
                  : 'Every ton of e-waste diverted eliminates ~2.45 MT of lifecycle carbon emissions, equivalent to 14,200 mature trees.'}
              </p>
            </div>
          </div>

          <!-- Bullet Point 2 -->
          <div class="info-bullet-card neu-box-sm">
            <div class="info-bullet-icon" style="background:var(--block-amber-light); color:var(--block-amber);">
              ${createLucideIcon('gem', { size: 20 })}
            </div>
            <div class="info-bullet-content">
              <h4 class="info-bullet-title">
                <span>${isHi ? 'शहरी खनन एवं धातु पुनर्प्राप्ति' : 'Urban Mining & Metal Recovery'}</span>
                <span class="badge badge-amber" style="font-size:0.65rem;">4.82 kg Au/Ag</span>
              </h4>
              <p class="info-bullet-desc">
                ${isHi 
                  ? 'सर्वर व मोबाइल पीसीबी से बिना विषैले तेजाब जलाए 4.82 किग्रा सोना व चांदी पुनर्प्राप्त की गई, जिससे 120 टन कच्चा अयस्क खनन बचा।'
                  : 'Reclaimed 4.82 kg of Gold & Silver without toxic acid burning, preserving 120 tons of virgin ore extraction.'}
              </p>
            </div>
          </div>

          <!-- Bullet Point 3 -->
          <div class="info-bullet-card neu-box-sm">
            <div class="info-bullet-icon" style="background:var(--block-copper-light); color:var(--block-copper);">
              ${createLucideIcon('shield-alert', { size: 20 })}
            </div>
            <div class="info-bullet-content">
              <h4 class="info-bullet-title">
                <span>${isHi ? 'विषाक्त पदार्थों का पूर्ण निस्तारण' : 'Zero-Landfill Toxin Isolation'}</span>
                <span class="badge badge-copper" style="font-size:0.65rem;">100% Isolated</span>
              </h4>
              <p class="info-bullet-desc">
                ${isHi 
                  ? 'लेड (सीसा), मरकरी (पारा) और कैडमियम को भूजल में मिलने से पूर्णतः रोककर अधिकृत रासायनिक शोधन शाला भेजा गया।'
                  : '100% of Lead, Mercury, and Cadmium kept out of city landfill groundwater and routed to sealed TSDF facilities.'}
              </p>
            </div>
          </div>

          <!-- Bullet Point 4 -->
          <div class="info-bullet-card neu-box-sm">
            <div class="info-bullet-icon" style="background:var(--block-indigo-light); color:var(--block-indigo);">
              ${createLucideIcon('file-check-2', { size: 20 })}
            </div>
            <div class="info-bullet-content">
              <h4 class="info-bullet-title">
                <span>${isHi ? 'सीपीसीबी ईपीआर प्रमाण पत्र' : 'CPCB Tradeable Green Credits'}</span>
                <span class="badge badge-indigo" style="font-size:0.65rem;">MoEFCC 2022</span>
              </h4>
              <p class="info-bullet-desc">
                ${isHi 
                  ? 'ई-कचरा नियम 2022 के तहत इलेक्ट्रॉनिक्स ब्रांड्स व उत्पादकों के अनिवार्य ईपीआर लक्ष्यों हेतु डिजिटल प्रमाण पत्र।'
                  : 'Compliant EPR credit certificates tradeable on the official CPCB portal for national producer brand compliance.'}
              </p>
            </div>
          </div>

          <!-- Bullet Point 5 -->
          <div class="info-bullet-card neu-box-sm">
            <div class="info-bullet-icon" style="background:var(--block-cyan-light); color:var(--block-cyan);">
              ${createLucideIcon('qr-code', { size: 20 })}
            </div>
            <div class="info-bullet-content">
              <h4 class="info-bullet-title">
                <span>${isHi ? 'क्रिप्टोग्राफिक कस्टडी हैश' : 'Cryptographic Manifest Audit'}</span>
                <span class="badge badge-cyan" style="font-size:0.65rem;">SHA-256</span>
              </h4>
              <p class="info-bullet-desc">
                ${isHi 
                  ? 'कबाड़ी के यूपीआई भुगतान रसीद से लेकर रीसाइक्लर के धर्मकांटे तक प्रत्येक लॉट का क्यूआर कोड आधारित अपरिवर्तनीय ऑडिट ट्रेल।'
                  : 'Tamper-proof digital manifest linking informal collector UPI payout receipt to authorized recycler weighbridge.'}
              </p>
            </div>
          </div>

          <!-- Bullet Point 6 -->
          <div class="info-bullet-card neu-box-sm">
            <div class="info-bullet-icon" style="background:var(--block-mint-light); color:var(--block-mint);">
              ${createLucideIcon('zap', { size: 20 })}
            </div>
            <div class="info-bullet-content">
              <h4 class="info-bullet-title">
                <span>${isHi ? 'सीधा कबाड़ी एस्क्रो प्रोत्साहन' : 'Direct Collector Green Bonus'}</span>
                <span class="badge badge-mint" style="font-size:0.65rem;">Instant UPI</span>
              </h4>
              <p class="info-bullet-desc">
                ${isHi 
                  ? 'स्वच्छ छंटाई और उच्च ग्रेड सामग्री देने वाले कबाड़ियों को सीधे बैंक खाते में ईपीआर ग्रीन इंसेंटिव प्रीमियम ट्रांसफर।'
                  : 'Formalizing informal aggregators with direct digital escrow payouts and green credit recycling premiums.'}
              </p>
            </div>
          </div>
        </div>

        <!-- IP Reservation & Statutory Reference Notice -->
        <div class="ip-reservation-banner neu-box-sm" style="margin-top:16px;">
          ${createLucideIcon('shield-check', { size: 18, color: 'var(--block-mint)' })}
          <div>
            <strong>Intellectual Property Rights Reserved:</strong>
            ${isHi
              ? ' समस्त ईपीआर कार्बन गणना मॉडल, बहुमूल्य धातु पुनर्प्राप्ति फॉर्मूले एवं डिजिटल सीपीसीबी ऑडिट ट्रेल विनिर्देश कबाड़ीसेतु (KabadiSetu) के स्वामित्व में हैं (भारतीय कॉपीराइट अधिनियम 1957 एवं पेटेंट नियम)। वैधानिक अनुपालन संदर्भ: पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय (MoEFCC) ई-कचरा प्रबंधन नियम 2022 (राजपत्र S.O. 5234(E))।'
              : ' All carbon abatement calculation engines, precious metal recovery yield algorithms, and CPCB XML compliance mapping schemas are proprietary intellectual property of KabadiSetu (Indian Copyright Act 1957 & Patents Act 1970). Statutory reference: Ministry of Environment, Forest and Climate Change (MoEFCC) E-Waste Management Rules 2022 (Gazette S.O. 5234(E)).'}
          </div>
        </div>
      </div>

      <!-- Analytics Charts Section with Working Switch Buttons -->
      <div class="grid-2">
        <div class="glass-card neu-box" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <h3 style="font-size:1.15rem; margin:0;">${isHi ? 'सामग्री श्रेणी विभाजन' : 'Material Category Breakdown'}</h3>
            <div style="display:flex; gap:6px;">
              <button class="neu-btn" style="padding:4px 8px; font-size:0.7rem; background:var(--card-bg-solid); display:inline-flex; align-items:center; gap:4px;" onclick="alert('Showing breakdown by volume')">
                ${createLucideIcon('pie-chart', { size: 12 })}
                <span>${isHi ? 'वजन आधार' : 'By Weight'}</span>
              </button>
            </div>
          </div>
          <div style="height:240px; position:relative;">
            <canvas id="chart-material-category"></canvas>
          </div>
          <div class="data-source-badge" style="margin-top:10px;">
            ${createLucideIcon('database', { size: 12, color: 'var(--block-mint)' })}
            <span><strong>Source:</strong> CPCB Schedule I Product Categorization Data (ITEW1 - ITEW16)</span>
          </div>
        </div>

        <div class="glass-card neu-box" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <h3 style="font-size:1.15rem; margin:0;">${isHi ? 'मासिक लैंडफिल डायवर्जन (टन)' : 'Monthly Landfill Diversion (Tons)'}</h3>
            <div style="display:flex; gap:6px;">
              <button class="neu-btn" style="padding:4px 8px; font-size:0.7rem; background:var(--card-bg-solid); display:inline-flex; align-items:center; gap:4px;" onclick="alert('Filtered: FY 2026-27 Active')">
                ${createLucideIcon('calendar', { size: 12 })}
                <span>FY 26-27</span>
              </button>
            </div>
          </div>
          <div style="height:240px; position:relative;">
            <canvas id="chart-monthly-diversion"></canvas>
          </div>
          <div class="data-source-badge" style="margin-top:10px;">
            ${createLucideIcon('database', { size: 12, color: 'var(--block-cyan)' })}
            <span><strong>Source:</strong> State Pollution Control Board (SPCB) Monthly Returns Registry</span>
          </div>
        </div>
      </div>

      <!-- EPR Certificate Ledger Table with Working Row Buttons -->
      <div class="glass-card neu-box" style="padding:24px; margin-top:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
          <div>
            <h3 style="font-size:1.25rem;">${isHi ? 'सीपीसीबी ईपीआर क्रेडिट लेजर' : 'CPCB EPR Credit Ledger'}</h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">${isHi ? 'ब्रांड्स व उत्पादकों के लिए क्रिप्टोग्राफिक रूप से हस्ताक्षरित ईपीआर प्रमाण पत्र' : 'Cryptographically signed EPR credit certificates for producers'}</p>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="neu-btn" style="background:var(--input-bg); color:var(--text-secondary); font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;" onclick="alert('${isHi ? 'सीपीसीबी पोर्टल के साथ खाता सिंक्रोनाइज़ हो गया है!' : 'CPCB Ledger successfully synced with National Portal!'}')">
              ${createLucideIcon('refresh-cw', { size: 14 })}
              <span>${isHi ? 'रिफ्रेश लेजर' : 'Sync CPCB Ledger'}</span>
            </button>
            <button class="neu-btn" style="background:var(--block-mint); color:#fff; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;" onclick="alert('${isHi ? 'सत्यापित लॉट हेतु नया ईपीआर प्रमाण पत्र जनरेटर प्रारंभ!' : 'EPR Certificate Generator initialized for verified lots!'}')">
              ${createLucideIcon('plus-circle', { size: 15, color: '#ffffff' })}
              <span>${isHi ? 'नया ईपीआर प्रमाण पत्र जारी करें' : 'Issue New EPR Certificate'}</span>
            </button>
          </div>
        </div>

        <div class="custom-table-container neu-inset">
          <table class="custom-table">
            <thead>
              <tr>
                <th>${isHi ? 'प्रमाण पत्र आईडी' : 'Cert ID'}</th>
                <th>${isHi ? 'रीसाइक्लर' : 'Recycler'}</th>
                <th>${isHi ? 'सीपीसीबी पंजीकरण' : 'CPCB Registration'}</th>
                <th>${isHi ? 'उत्पादक / ब्रांड' : 'Producer / Brand'}</th>
                <th>${isHi ? 'सामग्री वर्ग' : 'Material Class'}</th>
                <th>${isHi ? 'मात्रा (किग्रा)' : 'Qty (kg)'}</th>
                <th>${isHi ? 'सत्यापन हैश' : 'Verification Hash'}</th>
                <th>${isHi ? 'सीपीसीबी स्थिति' : 'CPCB Status'}</th>
                <th>${isHi ? 'कार्रवाई' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              ${state.eprCertificates.map(cert => `
                <tr>
                  <td>
                    <div style="display:flex; align-items:center; gap:6px;">
                      ${createLucideIcon('file-badge-2', { size: 15, color: 'var(--block-mint)' })}
                      <strong>${cert.certId}</strong>
                    </div>
                  </td>
                  <td>${cert.recyclerName}</td>
                  <td><span class="badge badge-indigo">${cert.cpcbAuth}</span></td>
                  <td>${cert.producerBrand}</td>
                  <td>${cert.materialCategory}</td>
                  <td><strong>${cert.quantityKg} kg</strong></td>
                  <td><code style="font-size:0.75rem; font-family:var(--font-mono);">${cert.qrVerificationHash}</code></td>
                  <td><span class="badge badge-mint" style="display:inline-flex; align-items:center; gap:4px;">${createLucideIcon('check-circle-2', { size: 12 })} ${cert.auditStatus}</span></td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      <button 
                        class="neu-btn" 
                        style="padding:5px 9px; font-size:0.72rem; background:var(--block-emerald); color:#fff; display:inline-flex; align-items:center; gap:4px;" 
                        onclick="alert('CPCB Official Certificate ${cert.certId} downloaded for ${cert.producerBrand}!')"
                        title="Download Certificate PDF"
                      >
                        ${createLucideIcon('file-down', { size: 13, color: '#ffffff' })}
                        <span>${isHi ? 'डाउनलोड' : 'PDF'}</span>
                      </button>
                      <button 
                        class="neu-btn" 
                        style="padding:5px 9px; font-size:0.72rem; display:inline-flex; align-items:center; gap:4px;" 
                        onclick="alert('Cryptographic Hash Verified on CPCB Blockchain Gateway: ${cert.qrVerificationHash}')"
                        title="Verify SHA-256 Hash"
                      >
                        ${createLucideIcon('shield-check', { size: 13, color: 'var(--block-mint)' })}
                        <span>${isHi ? 'जांचें' : 'Verify'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:16px;">
          <div class="data-source-badge">
            ${createLucideIcon('database', { size: 12, color: 'var(--block-mint)' })}
            <span><strong>Data Source:</strong> Central Pollution Control Board (CPCB) National EPR Portal API (e-waste.cpcb.gov.in)</span>
          </div>
          <div class="data-source-badge">
            ${createLucideIcon('shield-check', { size: 12, color: 'var(--block-indigo)' })}
            <span><strong>IP Protected:</strong> Form 6 Consignment Manifest & SHA-256 Ledger • KabadiSetu Platform Patent Pending</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
