import { createLucideIcon } from '../utils/icons.js';

export function renderArchitectureView(state) {
  const offlineLots = state.sampleLots.filter(l => !l.syncedCloud);

  return `
    <div class="view-container">
      <!-- Banner -->
      <div class="color-block block-indigo neu-box" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <span class="badge badge-indigo" style="background:rgba(255,255,255,0.25); color:#fff; margin-bottom:6px;">Technical Approach & Offline Resilience</span>
            <h2 style="font-size:1.6rem; color:#ffffff;">3-Layer System Architecture & Sync Pipeline</h2>
            <p style="font-size:0.9rem; opacity:0.9; max-width:760px;">
              Designed for zero offline data loss in low-connectivity scrap yards using SQLite local caching, FastAPI microservices, and TFLite ONNX lightweight AI.
            </p>
          </div>
          <button class="neu-btn" style="background:#ffffff; color:var(--block-indigo);" onclick="window.appState.triggerBatchSync()">
            ${createLucideIcon('refresh-cw', { size: 18 })} Simulate Batch FIFO Sync
          </button>
        </div>
      </div>

      <!-- 3-Layer Architecture Diagram (From PDF Page 3) -->
      <div class="glass-card neu-box" style="padding:24px;">
        <h3 style="font-size:1.25rem; margin-bottom:16px;">3-Layer Software Architecture</h3>

        <div style="display:flex; flex-direction:column; gap:16px;">
          <!-- Layer 1: User Layer -->
          <div class="color-block block-emerald neu-box-sm" style="padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:0.8rem; font-weight:800; text-transform:uppercase;">USER LAYER</span>
              <span class="badge badge-mint" style="background:rgba(255,255,255,0.2); color:#fff;">Frontend Interfaces</span>
            </div>
            <div style="display:flex; gap:16px; flex-wrap:wrap;">
              <div style="flex:1; background:rgba(255,255,255,0.15); padding:12px; border-radius:12px; font-weight:700;">
                📱 Vernacular Collector Mobile App (Flutter)
              </div>
              <div style="flex:1; background:rgba(255,255,255,0.15); padding:12px; border-radius:12px; font-weight:700;">
                🏭 Recycler Bidding & Escrow Portal (Web App)
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div style="text-align:center; color:var(--text-muted);">
            ${createLucideIcon('arrow-down', { size: 24 })}
          </div>

          <!-- Layer 2: Intelligence Layer -->
          <div class="color-block block-indigo neu-box-sm" style="padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:0.8rem; font-weight:800; text-transform:uppercase;">INTELLIGENCE LAYER</span>
              <span class="badge badge-indigo" style="background:rgba(255,255,255,0.2); color:#fff;">AI Engine & Microservices</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Material AI (TFLite)
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Price Engine
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Matching Algorithm
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Anomaly Detector
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div style="text-align:center; color:var(--text-muted);">
            ${createLucideIcon('arrow-down', { size: 24 })}
          </div>

          <!-- Layer 3: Data Layer -->
          <div class="color-block block-cyan neu-box-sm" style="padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:0.8rem; font-weight:800; text-transform:uppercase;">DATA LAYER & CLOUD STORAGE</span>
              <span class="badge badge-cyan" style="background:rgba(255,255,255,0.2); color:#fff;">PostgreSQL / S3</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Materials DB
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Benchmark Prices
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Recycler Auth DB
              </div>
              <div style="background:rgba(255,255,255,0.15); padding:10px; border-radius:10px; font-size:0.85rem; font-weight:600; text-align:center;">
                Transactions & Trace
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Offline Sync Pipeline Steps (From PDF Page 3) -->
      <div class="grid-2">
        <div class="glass-card neu-box" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-size:1.15rem;">Offline Sync Pipeline (No Internet)</h3>
            <span class="badge badge-copper">NO INTERNET READY</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--input-bg); border-radius:12px;" class="neu-inset">
              <span class="badge badge-indigo">1</span>
              <div>
                <strong style="font-size:0.88rem;">Create Lot</strong>
                <p style="font-size:0.75rem; color:var(--text-muted);">Photo + Weight + GPS captured locally</p>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--input-bg); border-radius:12px;" class="neu-inset">
              <span class="badge badge-indigo">2</span>
              <div>
                <strong style="font-size:0.88rem;">Save Locally</strong>
                <p style="font-size:0.75rem; color:var(--text-muted);">Encrypted SQLite database on collector phone</p>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--input-bg); border-radius:12px;" class="neu-inset">
              <span class="badge badge-indigo">3</span>
              <div>
                <strong style="font-size:0.88rem;">Sync Queue</strong>
                <p style="font-size:0.75rem; color:var(--text-muted);">FIFO retry buffer stores unsynced payloads</p>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--input-bg); border-radius:12px;" class="neu-inset">
              <span class="badge badge-indigo">4</span>
              <div>
                <strong style="font-size:0.88rem;">Internet Returns</strong>
                <p style="font-size:0.75rem; color:var(--text-muted);">Connectivity auto-detected via background listener</p>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--input-bg); border-radius:12px;" class="neu-inset">
              <span class="badge badge-indigo">5</span>
              <div>
                <strong style="font-size:0.88rem;">Upload & Reconcile</strong>
                <p style="font-size:0.75rem; color:var(--text-muted);">Batch sync to FastAPI server backend</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SQLite Queue Debugger -->
        <div class="glass-card neu-box" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-size:1.15rem;">Simulated SQLite Local Queue</h3>
            <span class="badge badge-amber">${offlineLots.length} Pending Sync</span>
          </div>

          ${offlineLots.length > 0 ? `
            <div style="margin-bottom:16px;">
              <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;">Pending JSON payload in SQLite buffer:</p>
              <pre style="background:var(--input-bg); padding:14px; border-radius:12px; font-family:var(--font-mono); font-size:0.75rem; overflow-x:auto; color:var(--block-mint);" class="neu-inset">${JSON.stringify(offlineLots, null, 2)}</pre>
            </div>
            <button class="neu-btn" style="width:100%; background:var(--block-mint); color:#fff;" onclick="window.appState.triggerBatchSync()">
              ${createLucideIcon('upload-cloud', { size: 18, color: '#ffffff' })} Flush Queue to FastAPI Cloud
            </button>
          ` : `
            <div style="text-align:center; padding:40px 20px; background:var(--input-bg); border-radius:16px;" class="neu-inset">
              ${createLucideIcon('check-circle-2', { size: 40, color: 'var(--block-mint)' })}
              <h4 style="font-size:1.05rem; margin-top:12px;">SQLite Buffer Clear</h4>
              <p style="font-size:0.8rem; color:var(--text-muted);">All local scrap lots are synced with the FastAPI backend!</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}
