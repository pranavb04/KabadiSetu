import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderRecyclerMarketplaceView(state) {
  const l = getLang(state);
  const isHi = state.currentLang === 'hi';

  const filters = state.recyclerFilters || {
    material: 'all',
    minPrice: 0,
    maxPrice: 1000,
    radiusKm: 'all'
  };

  const categories = [
    { value: 'all', label: isHi ? 'सभी सामग्रियां' : 'All Materials' },
    { value: 'PCBs', label: isHi ? 'उच्च-श्रेणी पीसीबी (PCBs)' : 'High-Grade PCBs' },
    { value: 'Copper', label: isHi ? 'तांबे के तार व कॉइल' : 'Copper Wires & Coils' },
    { value: 'Battery', label: isHi ? 'लिथियम-आयन बैटरी' : 'Lithium-Ion Battery Modules' },
    { value: 'Display', label: isHi ? 'डिस्प्ले ग्लास व एलसीडी' : 'Display Glass & LCD Panels' }
  ];

  // Filter logic
  const filteredLots = state.sampleLots.filter(lot => {
    // 1. Material filter
    if (filters.material !== 'all') {
      const matchCat = lot.category.toLowerCase().includes(filters.material.toLowerCase());
      if (!matchCat) return false;
    }

    // 2. Price filter (uses collector's asking rate or benchmark rate)
    const lotRate = lot.collectorPriceRate || lot.estimatedRateKg;
    if (filters.minPrice !== undefined && filters.minPrice !== null && lotRate < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null && lotRate > filters.maxPrice) {
      return false;
    }

    // 3. Radius filter (km)
    if (filters.radiusKm !== 'all' && filters.radiusKm !== undefined) {
      const maxDist = parseFloat(filters.radiusKm);
      if (lot.distanceKm > maxDist) return false;
    }

    return true;
  });

  return `
    <div class="view-container">
      <!-- Recycler Marketplace Header Banner -->
      <div class="color-block block-amber neu-box" style="padding:22px 26px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span class="badge badge-amber" style="background:rgba(255,255,255,0.25); color:#fff;">${isHi ? 'सीपीसीबी अधिकृत रीसाइक्लर पहुंच' : 'CPCB Verified Recycler Access'}</span>
              <span class="badge badge-mint" style="background:rgba(255,255,255,0.25); color:#fff;">${isHi ? 'डायनामिक एस्क्रो क्लीयरेंस' : 'Dynamic Escrow Clearing'}</span>
            </div>
            <h2 style="font-size:1.65rem; color:#ffffff;">${isHi ? 'रीसाइक्लर स्क्रैप नीलामी मार्केटप्लेस' : 'Recycler Scrap Bidding Marketplace'}</h2>
            <p style="font-size:0.9rem; opacity:0.92; max-width:740px;">
              ${isHi ? 'सत्यापित अनौपचारिक कबाड़ियों से सीधे स्क्रैप खरीदें। सामग्री श्रेणी, मूल्य सीमा और वाहन दूरी के अनुसार फ़िल्टर करें।' : 'Source directly from verified informal collectors. Filter by material grade, price range, and distance radius to optimize pickup fleet logistics.'}
            </p>
          </div>
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <button class="neu-btn" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.35); display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.goBack()">
              ${createLucideIcon('arrow-left', { size: 16, color: '#ffffff' })}
              <span>${l.goBack}</span>
            </button>
            <span class="badge badge-indigo" style="font-size:0.85rem; padding:8px 14px;">
              ${filteredLots.length} ${isHi ? 'लॉट उपलब्ध' : 'Lots Available'}
            </span>
          </div>
        </div>
      </div>

      <!-- INTERACTIVE FILTERS SECTION (Material + Price Range + Radius) -->
      <div class="glass-card neu-box" style="padding:22px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            ${createLucideIcon('sliders-horizontal', { size: 18, color: 'var(--block-amber)' })}
            <h3 style="font-size:1.15rem; margin:0;">${l.filterScrapLots}</h3>
            <span class="badge badge-cyan" style="font-size:0.75rem;">${isHi ? 'दिखाए गए' : 'Showing'} ${filteredLots.length} / ${state.sampleLots.length}</span>
          </div>

          <!-- Reset Filter Button -->
          <button 
            type="button" 
            class="neu-btn" 
            style="font-size:0.75rem; padding:6px 12px; background:var(--input-bg); color:var(--text-secondary);" 
            onclick="window.appState.resetRecyclerFilters()"
          >
            ${createLucideIcon('rotate-ccw', { size: 13 })} ${l.resetAllFilters}
          </button>
        </div>

        <div style="display:grid; grid-template-columns: 1.4fr 1.6fr 1.2fr; gap:20px;" class="filter-controls-grid">
          <!-- Filter 1: Material Category -->
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-weight:700;">
              ${createLucideIcon('layers', { size: 14 })} ${l.materialCategory}
            </label>
            <select 
              id="filter-material" 
              class="form-select" 
              style="font-weight:600;" 
              onchange="window.appState.updateRecyclerFilter('material', this.value)"
            >
              ${categories.map(c => `
                <option value="${c.value}" ${filters.material === c.value ? 'selected' : ''}>${c.label}</option>
              `).join('')}
            </select>
          </div>

          <!-- Filter 2: Suitable Price Range (₹/kg) -->
          <div class="form-group" style="margin-bottom:0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label class="form-label" style="font-weight:700; margin-bottom:0;">
                ${createLucideIcon('indian-rupee', { size: 14 })} ${l.priceRangeKg}
              </label>
              <span style="font-size:0.8rem; font-weight:700; color:var(--block-emerald);">
                ₹${filters.minPrice} - ₹${filters.maxPrice}/kg
              </span>
            </div>
            
            <div style="display:flex; align-items:center; gap:8px;">
              <div class="input-with-icon" style="flex:1;">
                <span class="input-icon" style="font-size:0.75rem;">${isHi ? 'न्यूनतम' : 'Min'}</span>
                <input 
                  type="number" 
                  id="filter-min-price" 
                  class="form-input" 
                  value="${filters.minPrice}" 
                  min="0" 
                  max="2000" 
                  step="25" 
                  placeholder="${isHi ? 'न्यूनतम ₹' : 'Min ₹'}" 
                  onchange="window.appState.updateRecyclerFilter('minPrice', parseFloat(this.value) || 0)"
                />
              </div>
              <span style="color:var(--text-muted); font-weight:700;">${isHi ? 'से' : 'to'}</span>
              <div class="input-with-icon" style="flex:1;">
                <span class="input-icon" style="font-size:0.75rem;">${isHi ? 'अधिकतम' : 'Max'}</span>
                <input 
                  type="number" 
                  id="filter-max-price" 
                  class="form-input" 
                  value="${filters.maxPrice}" 
                  min="0" 
                  max="2000" 
                  step="25" 
                  placeholder="${isHi ? 'अधिकतम ₹' : 'Max ₹'}" 
                  onchange="window.appState.updateRecyclerFilter('maxPrice', parseFloat(this.value) || 1000)"
                />
              </div>
            </div>
          </div>

          <!-- Filter 3: Radius of Recycler's Choice -->
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-weight:700;">
              ${createLucideIcon('navigation', { size: 14 })} ${l.pickupRadius}
            </label>
            <select 
              id="filter-radius" 
              class="form-select" 
              style="font-weight:600;" 
              onchange="window.appState.updateRecyclerFilter('radiusKm', this.value === 'all' ? 'all' : parseFloat(this.value))"
            >
              <option value="all" ${filters.radiusKm === 'all' ? 'selected' : ''}>${l.anyDistance}</option>
              <option value="5" ${filters.radiusKm === 5 ? 'selected' : ''}>${l.within5km}</option>
              <option value="10" ${filters.radiusKm === 10 ? 'selected' : ''}>${l.within10km}</option>
              <option value="25" ${filters.radiusKm === 25 ? 'selected' : ''}>${l.within25km}</option>
              <option value="50" ${filters.radiusKm === 50 ? 'selected' : ''}>${l.within50km}</option>
            </select>
          </div>
        </div>

        <!-- Quick Filter Pills -->
        <div style="display:flex; align-items:center; gap:8px; margin-top:14px; flex-wrap:wrap;">
          <span style="font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${isHi ? 'त्वरित प्रीसेट:' : 'Quick Presets:'}</span>
          <button class="neu-btn filter-pill-btn" onclick="window.appState.applyFilterPreset('pcb_nearby')" style="display:inline-flex; align-items:center; gap:4px;">
            ${createLucideIcon('cpu', { size: 12 })}
            <span>${isHi ? 'पीसीबी < 15 किमी' : 'PCBs < 15km'}</span>
          </button>
          <button class="neu-btn filter-pill-btn" onclick="window.appState.applyFilterPreset('copper_high')" style="display:inline-flex; align-items:center; gap:4px;">
            ${createLucideIcon('zap', { size: 12 })}
            <span>${isHi ? 'कॉपर तार (उच्च भाव)' : 'Copper Coils (High Value)'}</span>
          </button>
          <button class="neu-btn filter-pill-btn" onclick="window.appState.applyFilterPreset('battery_safe')" style="display:inline-flex; align-items:center; gap:4px;">
            ${createLucideIcon('battery-charging', { size: 12 })}
            <span>${isHi ? 'लिथियम-आयन बैटरी' : 'Li-ion Batteries'}</span>
          </button>
          <button class="neu-btn filter-pill-btn" onclick="window.appState.applyFilterPreset('all')" style="display:inline-flex; align-items:center; gap:4px;">
            ${createLucideIcon('x', { size: 12 })}
            <span>${isHi ? 'फ़िल्टर हटाएं' : 'Clear Filters'}</span>
          </button>
        </div>

        <div class="data-source-badge" style="margin-top:14px; width:100%; box-sizing:border-box;">
          ${createLucideIcon('database', { size: 12, color: 'var(--block-amber)' })}
          <span><strong>Data Provenance:</strong> Geospatial coordinates referenced via OpenStreetMap GIS / Municipal ward boundaries. Real-time lot feeds verified from CPCB-registered aggregator nodes.</span>
        </div>
      </div>

      <!-- FILTERED SCRAP LOTS CARDS -->
      ${filteredLots.length > 0 ? `
        <div class="grid-2">
          ${filteredLots.map(lot => {
            const askingRate = lot.collectorPriceRate || lot.estimatedRateKg;
            const aiBenchmarkRate = lot.estimatedRateKg;
            const askingTotal = lot.collectorPriceRate ? Math.round(lot.weightKg * lot.collectorPriceRate) : lot.estimatedTotal;

            return `
              <div class="glass-card neu-box-sm style-card" style="padding:22px; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <!-- Lot Card Header -->
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                      <img src="${lot.photoUrl}" style="width:68px; height:68px; border-radius:12px; object-fit:cover; border:2px solid var(--card-border-subtle);" />
                      <div>
                        <span class="badge badge-indigo" style="margin-bottom:4px;">${lot.id}</span>
                        <h4 style="font-size:1.1rem; margin:2px 0;">${lot.category}</h4>
                        <p style="font-size:0.78rem; color:var(--text-muted);">
                          ${createLucideIcon('map-pin', { size: 12 })} ${lot.location}
                        </p>
                      </div>
                    </div>
                    
                    <div style="text-align:right;">
                      <span class="badge ${lot.distanceKm <= 5 ? 'badge-mint' : lot.distanceKm <= 15 ? 'badge-cyan' : 'badge-amber'}" style="font-weight:700; font-size:0.8rem;">
                        ${lot.distanceKm} ${isHi ? 'किमी दूर' : 'km away'}
                      </span>
                      <p style="font-size:0.7rem; color:var(--text-muted); margin-top:4px;">${isHi ? 'कबाड़ीवाला:' : 'Collector:'} <strong>${lot.collectorName}</strong></p>
                    </div>
                  </div>

                  <!-- Spec & Pricing Grid -->
                  <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin:14px 0; background:var(--input-bg); padding:12px 14px; border-radius:12px;" class="neu-inset">
                    <div>
                      <span style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${isHi ? 'लॉट वजन' : 'Lot Weight'}</span>
                      <p style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">${lot.weightKg} kg</p>
                    </div>
                    <div>
                      <span style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${isHi ? 'कबाड़ी का भाव' : 'Collector Asking'}</span>
                      <p style="font-size:1.15rem; font-weight:800; color:var(--block-emerald);">₹${askingRate}/kg</p>
                    </div>
                    <div>
                      <span style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${isHi ? 'एआई बेंचमार्क' : 'AI Benchmark'}</span>
                      <p style="font-size:1.15rem; font-weight:800; color:var(--block-amber);">₹${aiBenchmarkRate}/kg</p>
                    </div>
                  </div>

                  <!-- Total Value & Status -->
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <span style="font-size:0.75rem; color:var(--text-muted);">
                      ${isHi ? 'एआई सटीकता:' : 'AI Confidence:'} <strong style="color:var(--block-mint);">${lot.aiConfidence}%</strong>
                    </span>
                    <span style="font-size:1rem; font-weight:800; color:var(--block-copper);">
                      ${isHi ? 'अनुमानित कुल मूल्य:' : 'Est. Lot Value:'} ₹${askingTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <!-- Action Button -->
                <div>
                  ${lot.status === 'Pending Bid' ? `
                    <div style="display:flex; gap:10px;">
                      <button 
                        class="neu-btn" 
                        style="flex:1; background:var(--block-amber); color:#fff; font-weight:700;" 
                        onclick="window.appState.openBidModal('${lot.id}')"
                      >
                        ${createLucideIcon('gavel', { size: 16, color: '#ffffff' })} ${l.placeBid}
                      </button>
                      <button 
                        class="neu-btn" 
                        style="flex:1; background:var(--block-emerald); color:#fff; font-weight:700;" 
                        onclick="window.appState.acceptCollectorAskingPrice('${lot.id}')"
                      >
                        ${createLucideIcon('check-circle', { size: 16, color: '#ffffff' })} ${l.acceptAskingRate}
                      </button>
                    </div>
                  ` : lot.status === 'Matched' ? `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--block-mint-light); border-radius:10px; color:var(--block-emerald);">
                      <div>
                        <span style="font-size:0.8rem; font-weight:700;">${isHi ? 'स्वीकृत:' : 'Matched:'} ${lot.matchedRecycler || (isHi ? 'आपकी कंपनी' : 'Your Company')}</span>
                        <p style="font-size:0.72rem;">${isHi ? 'तय भाव:' : 'Agreed Rate:'} ₹${lot.finalOfferRate || askingRate}/kg</p>
                      </div>
                      <button class="neu-btn" style="padding:6px 12px; font-size:0.75rem; background:var(--block-emerald); color:#fff; display:inline-flex; align-items:center; gap:5px;" onclick="window.appState.navigateTo('recycler-handover', '${lot.id}')">
                        ${createLucideIcon('qr-code', { size: 14, color: '#ffffff' })}
                        <span>${isHi ? 'क्यूआर सत्यापित करें' : 'Verify QR'}</span>
                      </button>
                    </div>
                  ` : `
                    <button class="neu-btn" style="width:100%; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="window.appState.navigateTo('recycler-handover', '${lot.id}')">
                      ${createLucideIcon('file-check', { size: 15 })}
                      <span>${isHi ? 'सत्यापित विवरण देखें' : 'View Verified Manifest'}</span>
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="glass-card neu-box" style="padding:40px; text-align:center;">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--input-bg); margin:0 auto 16px; display:flex; align-items:center; justify-content:center;">
            ${createLucideIcon('search-x', { size: 32, color: 'var(--text-muted)' })}
          </div>
          <h3 style="font-size:1.3rem; margin-bottom:8px;">${isHi ? 'वर्तमान फ़िल्टर के अनुसार कोई लॉट नहीं मिला' : 'No Lots Match Current Filters'}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted); max-width:440px; margin:0 auto 16px;">
            ${isHi ? 'कृपया मूल्य सीमा या दूरी का दायरा बढ़ाकर पुनः प्रयास करें।' : 'Try widening your price range, increasing your pickup radius, or selecting \'All Materials\'.'}
          </p>
          <button class="neu-btn" style="background:var(--block-amber); color:#fff; display:inline-flex; align-items:center; gap:6px;" onclick="window.appState.resetRecyclerFilters()">
            ${createLucideIcon('rotate-ccw', { size: 15, color: '#ffffff' })}
            <span>${l.resetAllFilters}</span>
          </button>
        </div>
      `}

      <div class="ip-reservation-banner neu-box-sm" style="margin-top:24px;">
        ${createLucideIcon('shield-check', { size: 18, color: 'var(--block-mint)' })}
        <div>
          <strong>Intellectual Property & Fair Trade Reservation:</strong>
          ${isHi
            ? ' कबाड़ीसेतु बहु-आयामी स्क्रैप मिलान एल्गोरिथम, स्वचालित बोली मूल्यांकन एवं ईपीआर क्रेडिट आबंटन प्रणाली पर समस्त बौद्धिक संपदा अधिकार सुरक्षित हैं (कॉपीराइट अधिनियम 1957)।'
            : ' The multi-parameter scrap matching algorithms, automated bid settlement, and EPR yield distribution mechanisms are proprietary intellectual property of KabadiSetu under the Indian Copyright Act 1957.'}
        </div>
      </div>
    </div>
  `;
}
