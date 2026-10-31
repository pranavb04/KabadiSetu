import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderCollectorView(state) {
  const l = getLang(state);
  const isHi = state.currentLang === 'hi';

  const sampleScanPresets = [
    { 
      title: isHi ? 'हाई-ग्रेड पीसीबी' : 'High-Grade PCBs', 
      category: 'High-Grade Printed Circuit Boards (PCBs)', 
      rate: 480, 
      conf: 96.8, 
      img: '/materials/pcb.jpg',
      historicalMin: 460,
      historicalMax: 505,
      desc: isHi ? 'सोने/चांदी के संपर्क, मल्टी-लेयर टेलीकॉम/सर्वर सर्किट बोर्ड' : 'Gold/Silver contacts, multi-layer telecom/server circuit boards'
    },
    { 
      title: isHi ? 'मोटा तांबा तार' : 'Heavy Copper Wires', 
      category: 'Copper Wires & Transformer Coils', 
      rate: 680, 
      conf: 98.4, 
      img: '/materials/copper.jpg',
      historicalMin: 650,
      historicalMax: 710,
      desc: isHi ? '99% शुद्धता वाला छिला तांबा तार व ट्रांसफार्मर कॉइल' : '99% purity heavy stripped copper windings & power cables'
    },
    { 
      title: isHi ? 'ली-आयन बैटरी' : 'Li-ion Battery Modules', 
      category: 'Lithium-Ion Battery Modules', 
      rate: 320, 
      conf: 94.2, 
      img: '/materials/battery.jpg',
      historicalMin: 300,
      historicalMax: 345,
      desc: isHi ? 'ईवी एवं लैपटॉप बैटरी पैक, अग्निरोधक भंडारण आवश्यक' : 'EV/Laptop energy storage cell packs, requires fire-safe storage'
    },
    { 
      title: isHi ? 'एलसीडी स्क्रीन' : 'LCD Displays & Glass', 
      category: 'Display Glass & LCD Modules', 
      rate: 95, 
      conf: 92.1, 
      img: '/materials/display.jpg',
      historicalMin: 85,
      historicalMax: 105,
      desc: isHi ? 'सुरक्षित कंप्यूटर मॉनिटर, लैपटॉप स्क्रीन व टीवी पैनल' : 'Intact computer monitors, laptops, and LED/LCD screens'
    }
  ];

  const selectedAiResult = state.currentAiScan || sampleScanPresets[0];
  const weightKg = state.lotFormWeight || 15.0;
  
  // Collector price defaults to AI suggested rate unless overridden by collector
  const collectorRate = state.collectorInputPrice !== undefined ? state.collectorInputPrice : selectedAiResult.rate;
  const collectorTotalValuation = Math.round(weightKg * collectorRate);
  const aiEstimatedTotalValuation = Math.round(weightKg * selectedAiResult.rate);

  return `
    <div class="view-container">
      <!-- Vernacular Voice & Audio Helper -->
      <div class="color-block block-indigo neu-box" style="padding:18px 22px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
        <div style="display:flex; align-items:center; gap:16px;">
          <div style="width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center;">
            ${createLucideIcon('volume-2', { size: 22, color: '#ffffff' })}
          </div>
          <div>
            <h3 style="font-size:1.05rem; color:#fff;">
              ${isHi ? 'ध्वनि निर्देश (Audio Guidance) सक्रिय है' : 'Vernacular Audio Guidance Active'}
            </h3>
            <p style="font-size:0.8rem; opacity:0.9;">
              ${isHi ? 'सामग्री का चित्र खींचें या चुनें, ऐप स्वतः सही भाव और एआई अनुमान बताएगा।' : 'Upload or pick material photo, the AI will automatically identify grade and benchmark pricing.'}
            </p>
          </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button class="neu-btn" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.35); display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.goBack()">
            ${createLucideIcon('arrow-left', { size: 16, color: '#ffffff' })}
            <span>${l.goBack}</span>
          </button>
          <button class="neu-btn" style="background:#ffffff; color:var(--block-indigo);" onclick="alert('${isHi ? 'हिन्दी में ध्वनि निर्देश शुरू हो रहे हैं...' : 'Playing vernacular voice guide in English...'}')">
            ${createLucideIcon('play', { size: 16 })} ${l.audioHelp}
          </button>
        </div>
      </div>

      <!-- AI Scanner + Lot Creation Grid -->
      <div class="grid-2">
        <!-- AI Camera & Image Upload Box -->
        <div class="glass-card neu-box" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="font-size:1.2rem;">${l.aiCameraTitle}</h3>
            <span class="badge badge-mint">TFLite / ONNX Model</span>
          </div>

          <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:14px;">
            ${isHi ? 'अपने स्क्रैप ई-कचरे का फोटो अपलोड करें या नीचे दिए गए एआई नमूनों में से चुनें:' : 'Upload a photo of your scrap e-waste or select from verified AI material presets below:'}
          </p>

          <!-- Real Image File Upload Input -->
          <div style="margin-bottom:14px;">
            <label class="form-label" style="font-size:0.8rem;">${l.uploadCustomPhoto}</label>
            <input 
              type="file" 
              id="collector-image-upload" 
              accept="image/*" 
              class="form-input" 
              style="padding:8px;" 
              onchange="window.appState.handleCustomImageUpload(event)"
            />
          </div>

          <!-- Camera Frame with AI Scan Overlay -->
          <div id="ai-camera-frame" class="camera-scanner-box neu-inset ${state.isAiScanning ? 'scanner-active' : ''}">
            <div class="scan-beam"></div>
            ${state.isAiScanning ? `
              <div style="text-align:center;">
                ${createLucideIcon('loader-2', { size: 42, className: 'spin-icon' })}
                <p style="font-weight:700; font-size:1.1rem; margin-top:12px;">${isHi ? 'सामग्री संरचना की जांच जारी है...' : 'Analyzing Material Composition...'}</p>
                <p style="font-size:0.8rem; color:var(--text-muted);">${isHi ? '50,000+ सीपीसीबी ई-कचरा रिकॉर्ड से तुलना की जा रही है' : 'Comparing with 50,000+ historical CPCB e-waste records'}</p>
              </div>
            ` : `
              <img id="ai-preview-img" src="${selectedAiResult.img}" style="width:100%; height:100%; object-fit:cover;" />
              <div style="position:absolute; bottom:12px; left:12px; right:12px; background:rgba(0,0,0,0.8); backdrop-filter:blur(8px); padding:12px 14px; border-radius:12px; color:#fff; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700; font-size:0.9rem;">${selectedAiResult.category}</div>
                  <div style="font-size:0.75rem; color:#6ee7b7;">${isHi ? 'एआई सटीकता' : 'AI Material Confidence'}: ${selectedAiResult.conf}%</div>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:0.65rem; color:#fef3c7; text-transform:uppercase; font-weight:700;">${isHi ? 'एआई बेंचमार्क' : 'AI Benchmark'}</span>
                  <div style="font-weight:800; font-size:1.15rem; color:#f59e0b;">₹${selectedAiResult.rate}/kg</div>
                </div>
              </div>
            `}
          </div>

          <!-- Appropriate AI Generated Material Image Presets -->
          <div style="margin-top:18px;">
            <p style="font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase;">
              ${isHi ? 'एआई जनरेटेड स्क्रैप सामग्री नमूने:' : 'AI GENERATED MATERIAL RECOGNITION PRESETS:'}
            </p>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px;">
              ${sampleScanPresets.map((preset, idx) => `
                <div 
                  class="neu-box-sm" 
                  style="padding:6px; border-radius:10px; cursor:pointer; border:${selectedAiResult.title === preset.title ? '2px solid var(--block-mint)' : '1px solid var(--card-border-subtle)'}; background:var(--card-bg-solid);" 
                  onclick="window.appState.triggerAiScan(${idx})"
                  title="${preset.category}"
                >
                  <img src="${preset.img}" style="width:100%; height:50px; object-fit:cover; border-radius:6px;" />
                  <p style="font-size:0.65rem; font-weight:700; text-align:center; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${preset.title}
                  </p>
                </div>
              `).join('')}
            </div>

            <!-- AI Model Data Source & IP Notice -->
            <div class="data-source-badge" style="margin-top:14px; width:100%; box-sizing:border-box;">
              ${createLucideIcon('database', { size: 13, color: 'var(--block-mint)' })}
              <span><strong>AI Model Provenance:</strong> KabadiSetu EdgeVision v2.4 trained on 50,000+ CPCB-verified e-waste lots & IS 14489 recycling standards. Proprietary Weights — Intellectual Property Rights Reserved.</span>
            </div>
          </div>
        </div>

        <!-- Lot Creation Form (with Collector Asking Price & AI Recommendation) -->
        <div class="glass-card neu-box" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-size:1.2rem;">${isHi ? 'लॉट विवरण व अपना भाव भरें' : 'Set Lot Details & Price'}</h3>
            <span class="badge badge-amber">${isHi ? 'एस्क्रो सुरक्षित' : 'Instant Escrow Protected'}</span>
          </div>

          <form id="form-create-lot" onsubmit="event.preventDefault(); window.appState.submitLotForm();">
            <div class="form-group">
              <label class="form-label">${l.identifiedCategory}</label>
              <input type="text" class="form-input" value="${selectedAiResult.category}" readonly />
            </div>

            <!-- Scrap Weight Range + Input -->
            <div class="form-group human-slider-container">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <label class="form-label" style="margin-bottom:0; display:inline-flex; align-items:center; gap:6px;">
                  ${createLucideIcon('scale', { size: 16, color: 'var(--block-mint)' })}
                  <span>${l.lotWeightKg}</span>
                </label>
                <div class="weight-pill-display" style="padding:4px 12px; border-radius:10px; background:var(--input-bg); border:1px solid var(--card-border-subtle); display:inline-flex; align-items:baseline; gap:4px;">
                  <span id="weight-display-val" style="color:var(--block-emerald); font-size:1.35rem; font-weight:800; font-family:var(--font-mono);">${weightKg}</span>
                  <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">${isHi ? 'किग्रा' : 'kg'}</span>
                </div>
              </div>

              <!-- Ultra-Smooth Custom Range Slider with Dynamic Progress Track -->
              <div class="custom-slider-track-wrap">
                <input 
                  type="range" 
                  id="input-weight-range" 
                  class="human-range-slider"
                  min="1" 
                  max="200" 
                  step="0.5" 
                  value="${weightKg}" 
                  style="--slider-progress: ${((weightKg - 1) / 199) * 100}%;"
                  oninput="window.appState.updateLotWeight(this.value)" 
                />
              </div>

              <!-- Humanized Quick Preset Pills -->
              <div class="slider-preset-pills" style="display:flex; align-items:center; gap:8px; margin-top:10px; flex-wrap:wrap;">
                <span style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${isHi ? 'त्वरित वजन चुनें:' : 'Quick Presets:'}</span>
                ${[5, 15, 25, 50, 100].map(w => `
                  <button 
                    type="button" 
                    class="neu-btn slider-preset-btn ${weightKg === w ? 'active' : ''}" 
                    style="padding:5px 12px; font-size:0.75rem; border-radius:8px; font-weight:700;"
                    onclick="window.appState.setQuickWeight(${w})"
                  >
                    ${w} kg
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- AI Price Recommendation Card (Explicitly marked as historical data) -->
            <div class="ai-price-recommendation-box neu-inset" style="padding:16px; border-radius:14px; margin:16px 0; border:1px solid rgba(16, 185, 129, 0.3);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="width:28px; height:28px; border-radius:8px; background:var(--block-mint); color:#fff; display:flex; align-items:center; justify-content:center;">
                    ${createLucideIcon('sparkles', { size: 16 })}
                  </div>
                  <div>
                    <span style="font-size:0.75rem; text-transform:uppercase; font-weight:800; color:var(--block-mint);">${l.aiRecommendedPrice}</span>
                    <h4 style="font-size:1.25rem; font-weight:800; color:var(--text-primary);">₹${selectedAiResult.rate} <small style="font-size:0.8rem; font-weight:600;">/ kg</small></h4>
                  </div>
                </div>
                <button 
                  type="button" 
                  class="neu-btn" 
                  style="padding:6px 10px; font-size:0.72rem; background:var(--block-mint); color:#fff; display:inline-flex; align-items:center; gap:5px;" 
                  onclick="window.appState.applyAiPrice(${selectedAiResult.rate})"
                >
                  ${createLucideIcon('sparkles', { size: 13, color: '#ffffff' })}
                  <span>${l.applyAiPriceBtn}</span>
                </button>
              </div>

              <!-- Note required by user: Mark that it is suggested using historical data -->
              <div style="display:flex; align-items:center; gap:6px; font-size:0.75rem; color:var(--text-muted); background:var(--pill-bg); padding:6px 10px; border-radius:8px;">
                ${createLucideIcon('info', { size: 14, color: 'var(--block-mint)' })}
                <span><strong>${l.historicalNote}</strong> (${isHi ? 'औसत सीमा' : 'Range'}: ₹${selectedAiResult.historicalMin} - ₹${selectedAiResult.historicalMax}/kg).</span>
              </div>
              <div class="data-source-badge" style="margin-top:8px;">
                ${createLucideIcon('database', { size: 11, color: 'var(--block-mint)' })}
                <span><strong>Pricing Source:</strong> CPCB Authorized Dismantler Settlement Index & MCX Daily Scrap Spot Rates. Algorithmic fair-pricing IP Reserved.</span>
              </div>
            </div>

            <!-- Collector's Asking Price Input -->
            <div class="form-group">
              <label class="form-label" for="input-collector-price">
                <strong>${l.yourAskingPrice}</strong> — <span style="font-weight:400; color:var(--text-muted);">${l.askingPriceSub}</span>
              </label>
              <div class="input-with-icon">
                <span class="input-icon">${createLucideIcon('indian-rupee', { size: 18 })}</span>
                <input 
                  type="number" 
                  id="input-collector-price" 
                  class="form-input" 
                  value="${collectorRate}" 
                  min="10" 
                  max="5000" 
                  step="5" 
                  style="font-size:1.15rem; font-weight:700; color:var(--block-emerald);" 
                  oninput="window.appState.updateCollectorPrice(this.value)"
                  required 
                />
              </div>
            </div>

            <!-- Valuation Summary Box -->
            <div class="color-block block-emerald neu-box-sm style-card" style="padding:18px 20px; margin:18px 0; border-radius:18px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <span style="font-size:0.72rem; opacity:0.9; text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">${l.yourTotalAskingValue}</span>
                  <p id="collector-valuation-display" style="font-size:1.55rem; font-weight:800; color:#ffffff; font-family:var(--font-mono); margin:2px 0;">₹${collectorTotalValuation.toLocaleString()}</p>
                  <span id="valuation-calc-sub" style="font-size:0.75rem; opacity:0.85;">(${weightKg} kg × ₹${collectorRate}/kg)</span>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:0.72rem; opacity:0.9; text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">${l.aiBenchmarkTotal}</span>
                  <p id="ai-valuation-display" style="font-size:1.25rem; font-weight:800; color:#fef3c7; font-family:var(--font-mono); margin:2px 0;">₹${aiEstimatedTotalValuation.toLocaleString()}</p>
                  <span style="font-size:0.75rem; opacity:0.85;">(${isHi ? 'ऐतिहासिक आधार' : 'Historical Baseline'})</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${isHi ? 'कबाड़ी पिकअप केंद्र (जीपीएस पिन)' : 'Collector Pickup Hub (GPS Pinned)'}</label>
              <input type="text" class="form-input" value="Dharavi Scrap Hub, Sector 4, Mumbai (GPS: 19.043, 72.856)" readonly />
            </div>

            <div class="form-group">
              <label class="form-label">${isHi ? 'पसंदीदा भुगतान माध्यम' : 'Preferred Payout Mode'}</label>
              <select class="form-select" id="select-payout">
                <option value="UPI Instant Escrow">⚡ ${isHi ? 'तत्काल यूपीआई एस्क्रो (क्यूआर स्कैन पर सीधा ट्रांसफर)' : 'Instant UPI Direct Escrow (Instant Release on QR Scan)'}</option>
                <option value="Cash Handover Payout">💵 ${isHi ? 'धर्मकांटे पर नकद भुगतान' : 'Direct Cash Handover at Weighbridge'}</option>
                <option value="Bank Ledger Direct">🏦 ${isHi ? 'सीधा बैंक ट्रांसफर (NEFT / IMPS)' : 'Direct NEFT / IMPS Bank Transfer'}</option>
              </select>
            </div>

            <button type="submit" class="neu-btn" style="width:100%; background:var(--block-emerald); color:#fff; font-size:1rem; padding:14px; margin-top:14px;">
              ${createLucideIcon('check-circle-2', { size: 20 })}
              ${state.isOnline ? l.publishLotBtn : (isHi ? 'ऑफलाइन SQLite कतार में सहेजें' : 'Save to Offline SQLite Queue')}
            </button>
          </form>
        </div>
      </div>

      <!-- IP Reservation Notice for Collector Hub -->
      <div class="ip-reservation-banner neu-box-sm" style="margin-top:20px;">
        ${createLucideIcon('shield-check', { size: 18, color: 'var(--block-mint)' })}
        <div>
          <strong>Intellectual Property & Valuation Notice:</strong>
          ${isHi 
            ? ' कबाड़ीसेतु एआई सामग्री वर्गीकरण, ऐतिहासिक मूल्य खोज प्रणाली तथा गतिशील एस्क्रो कस्टडी एल्गोरिथम भारतीय पेटेंट अधिनियम एवं कॉपीराइट अधिनियम, 1957 के तहत कानूनी रूप से सुरक्षित हैं। किसी भी अनाधिकृत स्क्रैपिंग अथवा अनुकरण पर दंडात्मक कार्रवाई की जाएगी।'
            : ' KabadiSetu AI material vision classification, historical rate recommendation engine, and dynamic escrow custody algorithms are protected under the Indian Patents Act and Copyright Act, 1957. All statutory data referenced from CPCB Schedule I & II guidelines.'}
        </div>
      </div>
    </div>
  `;
}
