import { createLucideIcon } from '../utils/icons.js';

export function renderDashboardView(state) {
  return `
    <div class="view-container">
      <!-- Problem & Solution Overview Banner -->
      <div class="color-block block-emerald neu-box" style="padding:28px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:20px; flex-wrap:wrap;">
          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <span class="badge badge-mint" style="background:rgba(255,255,255,0.2); color:#fff;">Circular Economy</span>
              <span class="badge badge-amber" style="background:rgba(255,255,255,0.2); color:#fff;">Clean & Green Tech</span>
            </div>
            <h2 style="font-size:1.8rem; margin-bottom:2px; color:#ffffff;">KABADISETU</h2>
            <p class="brand-subtitle" style="color:rgba(255,255,255,0.88); font-size:0.75rem; letter-spacing:0.12em; margin-bottom:8px;">FORMALIZING E-WASTE CHAINS</p>
            <p style="font-size:0.95rem; opacity:0.92; max-width:820px;">
              Bringing informal scrap collectors into the formal recycling chain through vernacular AI material classification, offline-first SQLite synchronization, dynamic price discovery, and CPCB EPR credit traceability.
            </p>
          </div>
          <button class="neu-btn" style="background:#ffffff; color:#0d4a36; font-weight:700;" onclick="window.appState.navigateTo('collector')">
            ${createLucideIcon('plus-circle', { size: 18, color: '#0d4a36' })}
            Create Scrap Lot
          </button>
        </div>
      </div>

      <!-- Key Impact Metric Cards -->
      <div class="grid-4">
        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">E-Waste Diverted</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-mint-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('recycle', { size: 20, color: 'var(--block-emerald)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">142.8 <span style="font-size:1rem; font-weight:600; color:var(--text-muted);">Tons</span></h3>
          <p style="font-size:0.75rem; color:var(--block-mint); font-weight:700; margin-top:4px;">
            ${createLucideIcon('trending-up', { size: 14, color: 'currentColor' })} +18.4% this month
          </p>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Landfill Diversion Rate</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-cyan-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('shield-check', { size: 20, color: 'var(--block-cyan)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">99.4%</h3>
          <p style="font-size:0.75rem; color:var(--block-cyan); font-weight:700; margin-top:4px;">
            100% CPCB Compliance
          </p>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Fair Value Paid</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-amber-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('indian-rupee', { size: 20, color: 'var(--block-amber)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">₹42.8 <span style="font-size:1rem; font-weight:600; color:var(--text-muted);">Lakhs</span></h3>
          <p style="font-size:0.75rem; color:var(--block-amber); font-weight:700; margin-top:4px;">
            Direct Instant Escrow Payouts
          </p>
        </div>

        <div class="glass-card neu-box style-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Empowered Kabadiwalas</span>
            <div style="width:36px; height:36px; border-radius:10px; background:var(--block-indigo-light); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('users', { size: 20, color: 'var(--block-indigo)' })}
            </div>
          </div>
          <h3 style="font-size:1.8rem; font-weight:800;">1,480+</h3>
          <p style="font-size:0.75rem; color:var(--block-indigo); font-weight:700; margin-top:4px;">
            Active Collectors in Network
          </p>
        </div>
      </div>

      <!-- PDF Flowchart 1: Scrap Collection -> Fair Price -> Verified Recycling -->
      <div class="glass-card neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:1.2rem;">5-Step Recycling Value Chain Workflow</h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">From Scrap Collection → Fair Price → Verified Recycling</p>
          </div>
          <span class="badge badge-mint">Interactive Live Flow</span>
        </div>

        <div class="flow-container neu-inset">
          <!-- Step 1 -->
          <div class="flow-step-card glass-card neu-box-sm">
            <div class="flow-icon-circle" style="background:var(--block-mint-light); color:var(--block-emerald);">
              ${createLucideIcon('camera', { size: 22 })}
            </div>
            <h4 class="flow-step-title" style="color:var(--block-emerald);">1. CREATE LOT</h4>
            <p class="flow-step-desc">Photo + Category + Weight</p>
          </div>
          
          <div class="flow-arrow">${createLucideIcon('arrow-right', { size: 20 })}</div>

          <!-- Step 2 -->
          <div class="flow-step-card glass-card neu-box-sm">
            <div class="flow-icon-circle" style="background:var(--block-cyan-light); color:var(--block-cyan);">
              ${createLucideIcon('calculator', { size: 22 })}
            </div>
            <h4 class="flow-step-title" style="color:var(--block-cyan);">2. VALUE</h4>
            <p class="flow-step-desc">Live Price + Estimate</p>
          </div>

          <div class="flow-arrow">${createLucideIcon('arrow-right', { size: 20 })}</div>

          <!-- Step 3 -->
          <div class="flow-step-card glass-card neu-box-sm">
            <div class="flow-icon-circle" style="background:var(--block-amber-light); color:var(--block-amber);">
              ${createLucideIcon('store', { size: 22 })}
            </div>
            <h4 class="flow-step-title" style="color:var(--block-amber);">3. MATCH</h4>
            <p class="flow-step-desc">Verified Recycler + Offer</p>
          </div>

          <div class="flow-arrow">${createLucideIcon('arrow-right', { size: 20 })}</div>

          <!-- Step 4 -->
          <div class="flow-step-card glass-card neu-box-sm">
            <div class="flow-icon-circle" style="background:var(--block-indigo-light); color:var(--block-indigo);">
              ${createLucideIcon('qr-code', { size: 22 })}
            </div>
            <h4 class="flow-step-title" style="color:var(--block-indigo);">4. HANDOVER</h4>
            <p class="flow-step-desc">QR Receipt + Proof</p>
          </div>

          <div class="flow-arrow">${createLucideIcon('arrow-right', { size: 20 })}</div>

          <!-- Step 5 -->
          <div class="flow-step-card glass-card neu-box-sm">
            <div class="flow-icon-circle" style="background:var(--block-copper-light); color:var(--block-copper);">
              ${createLucideIcon('wallet', { size: 22 })}
            </div>
            <h4 class="flow-step-title" style="color:var(--block-copper);">5. EARN</h4>
            <p class="flow-step-desc">Cash / UPI + Ledger</p>
          </div>
        </div>
      </div>

      <!-- Detailed End-To-End Traceability Diagram (Page 2 PDF Architecture) -->
      <div class="glass-card neu-box" style="padding:24px;">
        <h3 style="font-size:1.2rem; margin-bottom:16px;">End-To-End Recycling Value Chain & Traceability Flow</h3>
        
        <div class="grid-4" style="gap:16px;">
          <!-- Node 1 -->
          <div class="color-block neu-box-sm" style="background:var(--card-bg-solid); border:2px solid var(--block-mint); color:var(--text-primary); padding:18px;">
            <div class="badge badge-mint" style="margin-bottom:10px;">Informal Collector</div>
            <h4 style="font-size:1.05rem; margin-bottom:8px;">Collector App Layer</h4>
            <ul style="font-size:0.78rem; color:var(--text-secondary); list-style:none; display:flex; flex-direction:column; gap:6px;">
              <li>✔ Offline SQLite Caching</li>
              <li>✔ Audio & Vernacular UI</li>
              <li>✔ Dynamic Price Board</li>
            </ul>
          </div>

          <!-- Node 2 -->
          <div class="color-block neu-box-sm" style="background:var(--card-bg-solid); border:2px solid var(--block-indigo); color:var(--text-primary); padding:18px;">
            <div class="badge badge-indigo" style="margin-bottom:10px;">KabadiSetu Platform</div>
            <h4 style="font-size:1.05rem; margin-bottom:8px;">FastAPI Engine</h4>
            <ul style="font-size:0.78rem; color:var(--text-secondary); list-style:none; display:flex; flex-direction:column; gap:6px;">
              <li>✔ Real-Time Ingestion</li>
              <li>✔ Benchmark Price Valuation</li>
              <li>✔ Recycler Matching AI</li>
            </ul>
          </div>

          <!-- Node 3 -->
          <div class="color-block neu-box-sm" style="background:var(--card-bg-solid); border:2px solid var(--block-amber); color:var(--text-primary); padding:18px;">
            <div class="badge badge-amber" style="margin-bottom:10px;">Verified Recycler</div>
            <h4 style="font-size:1.05rem; margin-bottom:8px;">CPCB Authorized Portal</h4>
            <ul style="font-size:0.78rem; color:var(--text-secondary); list-style:none; display:flex; flex-direction:column; gap:6px;">
              <li>✔ Real-Time Batch Bids</li>
              <li>✔ QR Scan Verification</li>
              <li>✔ Instant Escrow / Ledger</li>
            </ul>
          </div>

          <!-- Node 4 -->
          <div class="color-block neu-box-sm" style="background:var(--card-bg-solid); border:2px solid var(--block-copper); color:var(--text-primary); padding:18px;">
            <div class="badge badge-copper" style="margin-bottom:10px;">Closed-Loop Impact</div>
            <h4 style="font-size:1.05rem; margin-bottom:8px;">EPR Credit Hub</h4>
            <ul style="font-size:0.78rem; color:var(--text-secondary); list-style:none; display:flex; flex-direction:column; gap:6px;">
              <li>✔ 100% Landfill Diversion</li>
              <li>✔ Regulatory Audit Trail</li>
              <li>✔ Ecosystem Transparency</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Live Active Lots Table -->
      <div class="glass-card neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:1.2rem;">Live Collector Scrap Lots</h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">Real-time scrap creation and verified recycler offers</p>
          </div>
          <button class="neu-btn" onclick="window.appState.navigateTo('marketplace')">View Marketplace</button>
        </div>

        <div class="custom-table-container neu-inset">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Lot ID</th>
                <th>Collector</th>
                <th>Category</th>
                <th>Weight</th>
                <th>Est. Rate</th>
                <th>AI Accuracy</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.sampleLots.map(lot => `
                <tr>
                  <td><strong>${lot.id}</strong></td>
                  <td>${lot.collectorName}</td>
                  <td>${lot.category}</td>
                  <td><strong>${lot.weightKg} kg</strong></td>
                  <td>₹${lot.estimatedRateKg}/kg</td>
                  <td>
                    <span class="badge badge-mint">${lot.aiConfidence}%</span>
                  </td>
                  <td>
                    <span class="badge ${lot.status === 'Matched' ? 'badge-mint' : lot.status === 'Pending Bid' ? 'badge-amber' : lot.status === 'Handover Verified' ? 'badge-cyan' : 'badge-copper'}">
                      ${lot.status}
                    </span>
                  </td>
                  <td>
                    <button class="neu-btn" style="padding:4px 10px; font-size:0.75rem;" onclick="window.appState.navigateTo('handover', '${lot.id}')">
                      Inspect
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
