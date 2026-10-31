import { createLucideIcon } from '../utils/icons.js';
import { getLang } from '../utils/i18n.js';

export function renderPrivacyPolicyModal(state) {
  const isHi = state.currentLang === 'hi';

  return `
    <div id="privacy-policy-modal" class="modal-backdrop" onclick="if(event.target === this) window.appState.closePrivacyModal()">
      <div class="glass-card neu-box privacy-modal-card" style="max-width:840px; width:92%; max-height:88vh; display:flex; flex-direction:column; overflow:hidden; border-radius:24px; padding:0;">
        
        <!-- Modal Header -->
        <div class="privacy-modal-header" style="padding:22px 28px; background:var(--card-bg-solid); border-bottom:1px solid var(--card-border-subtle); display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:44px; height:44px; border-radius:14px; background:var(--block-mint-light); color:var(--block-emerald); display:flex; align-items:center; justify-content:center;">
              ${createLucideIcon('shield-check', { size: 24, color: 'var(--block-emerald)' })}
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="font-size:1.25rem; font-weight:800; color:var(--text-primary); margin:0;">
                  ${isHi ? 'कबाड़ीसेतु उपयोगकर्ता डेटा गोपनीयता नीति' : 'KABADISETU Privacy & Data Protection Charter'}
                </h3>
                <span class="badge badge-mint" style="font-size:0.65rem;">DPDP Act 2023</span>
              </div>
              <p style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
                ${isHi ? 'सीपीसीबी ई-कचरा नियम 2022 एवं डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम के अंतर्गत' : 'Compliant with DPDP Act 2023 & MoEFCC CPCB E-Waste Management Rules'}
              </p>
            </div>
          </div>
          <button class="neu-btn" style="padding:8px 12px; border-radius:10px;" onclick="window.appState.closePrivacyModal()" title="Close">
            ${createLucideIcon('x', { size: 18 })}
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="privacy-modal-body" style="padding:28px; overflow-y:auto; line-height:1.65; font-size:0.9rem;">
          
          <!-- Key Commitment Banner -->
          <div class="color-block block-emerald neu-box-sm" style="padding:18px 22px; border-radius:16px; margin-bottom:24px; color:#ffffff;">
            <div style="display:flex; align-items:flex-start; gap:12px;">
              ${createLucideIcon('lock', { size: 22, color: '#ffffff' })}
              <div>
                <h4 style="font-size:1rem; font-weight:800; margin-bottom:4px; color:#ffffff;">
                  ${isHi ? 'हमारा दृढ़ संकल्प: आपकी पहचान व वित्तीय विवरण 100% सुरक्षित हैं' : 'Our Guarantee: Zero Data Selling & Tamper-Proof Security'}
                </h4>
                <p style="font-size:0.82rem; opacity:0.95; line-height:1.5;">
                  ${isHi 
                    ? 'कबाड़ीसेतु अनौपचारिक कबाड़ियों और पंजीकृत रीसाइक्लर्स के व्यक्तिगत फोन नंबर, जीपीएस स्थान, और बैंक/यूपीआई विवरण को कभी भी किसी तीसरे पक्ष या विज्ञापन नेटवर्क को नहीं बेचता है।' 
                    : 'KABADISETU guarantees that informal scrap collectors and CPCB recyclers maintain complete ownership of their data. Your phone numbers, GPS coordinates, scrap photographs, and bank/UPI accounts are never monetized or shared with third-party brokers.'}
                </p>
              </div>
            </div>
          </div>

          <!-- Section 1: What We Collect -->
          <div style="margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
              ${createLucideIcon('file-text', { size: 18, color: 'var(--block-mint)' })}
              <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0;">
                ${isHi ? '1. हम कौन सा डेटा एकत्र करते हैं?' : '1. Information We Collect'}
              </h4>
            </div>
            <ul style="padding-left:22px; color:var(--text-secondary); display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
              <li>
                <strong>${isHi ? 'व्यक्तिगत पहचान विवरण:' : 'Identity & Contact Information:'}</strong> 
                ${isHi ? 'कबाड़ी का नाम, संपर्क फोन नंबर, विशिष्ट कबाड़ी आईडी (COL-xxxx), रीसाइक्लर कंपनी का नाम, और सीपीसीबी पंजीकरण संख्या।' : 'Name, mobile phone number, unique Collector ID (COL-xxxx), Recycler Company Name, and official CPCB Registration Number.'}
              </li>
              <li>
                <strong>${isHi ? 'स्क्रैप सामग्री व तस्वीरें:' : 'Material Data & Camera Scans:'}</strong> 
                ${isHi ? 'सामग्री का प्रकार (पीसीबी, तांबा, लिथियम बैटरी), अपलोड की गई छवियां, एआई सटीकता स्कोर, और मापा गया वजन।' : 'Material category (PCBs, copper, batteries), camera scan uploads, purity classification scores, and weighbridge weights.'}
              </li>
              <li>
                <strong>${isHi ? 'जीपीएस पिकअप स्थान:' : 'Geographic Hub Coordinates:'}</strong> 
                ${isHi ? 'स्क्रैप पिकअप केंद्र का अनुमानित जीपीएस निर्देशांक (जैसे धारावी, कुर्ला) ताकि अधिकृत गाड़ियां कचरा उठा सकें। आपका व्यक्तिगत घरेलू पता कभी सार्वजनिक नहीं किया जाता।' : 'Scrap hub GPS coordinates (e.g. Dharavi, Kurla) used strictly for routing pickup vehicles. Personal residential addresses are never stored or displayed.'}
              </li>
              <li>
                <strong>${isHi ? 'त्वरित भुगतान जानकारी:' : 'Payout & Escrow Details:'}</strong> 
                ${isHi ? 'मास्क्ड यूपीआई आईडी या बैंक विवरण, जिनका उपयोग धर्मकांटे पर क्यूआर सत्यापन के बाद तत्काल एस्क्रो भुगतान जारी करने के लिए किया जाता है।' : 'Masked UPI Virtual Payment Addresses (VPAs) or bank ledger identifiers used solely to disburse instant escrow payouts upon QR scan confirmation.'}
              </li>
            </ul>
          </div>

          <!-- Section 2: How Data is Used -->
          <div style="margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
              ${createLucideIcon('sliders-horizontal', { size: 18, color: 'var(--block-amber)' })}
              <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0;">
                ${isHi ? '2. इस डेटा का उपयोग कैसे किया जाता है?' : '2. Purpose of Data Processing'}
              </h4>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
              <div class="neu-box-sm" style="padding:14px; background:var(--input-bg); border-radius:12px;">
                <strong style="color:var(--block-emerald); display:block; font-size:0.85rem; margin-bottom:4px;">${isHi ? 'उचित मूल्य निर्धारण' : 'Fair Price Discovery'}</strong>
                <p style="font-size:0.78rem; color:var(--text-muted);">${isHi ? 'ऐतिहासिक सीपीसीबी नीलामी डेटा के आधार पर पारदर्शी भाव तय करने के लिए।' : 'To compute unbiased historical benchmark rates and eliminate middleman markdowns.'}</p>
              </div>
              <div class="neu-box-sm" style="padding:14px; background:var(--input-bg); border-radius:12px;">
                <strong style="color:var(--block-mint); display:block; font-size:0.85rem; margin-bottom:4px;">${isHi ? 'सुरक्षित क्यूआर कस्टडी' : 'Chain of Custody'}</strong>
                <p style="font-size:0.78rem; color:var(--text-muted);">${isHi ? 'कबाड़ी से रीसाइक्लर तक भौतिक हस्तांतरण को डिजिटल समय-मुहर के साथ दर्ज करने के लिए।' : 'To cryptographically link scrap pickup from collector to recycler scale.'}</p>
              </div>
              <div class="neu-box-sm" style="padding:14px; background:var(--input-bg); border-radius:12px;">
                <strong style="color:var(--block-indigo); display:block; font-size:0.85rem; margin-bottom:4px;">${isHi ? 'सीपीसीबी ईपीआर प्रमाणन' : 'CPCB Regulatory Audit'}</strong>
                <p style="font-size:0.78rem; color:var(--text-muted);">${isHi ? 'पर्यावरण मंत्रालय (MoEFCC) के तहत लैंडफिल डायवर्जन ग्रीन क्रेडिट जारी करने हेतु।' : 'To generate statutory compliance records verifying zero-landfill diversion.'}</p>
              </div>
            </div>
          </div>

          <!-- Section 3: Cryptography & Security -->
          <div style="margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
              ${createLucideIcon('shield-alert', { size: 18, color: 'var(--block-indigo)' })}
              <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0;">
                ${isHi ? '3. डेटा सुरक्षा एवं क्रिप्टोग्राफी' : '3. Cryptographic Security & Offline Storage'}
              </h4>
            </div>
            <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.55; margin-bottom:8px;">
              ${isHi 
                ? 'प्रत्येक लॉट हस्तांतरण को <strong>SHA-256 क्रिप्टोग्राफिक हैश</strong> के साथ सुरक्षित किया जाता है। एक बार डेटा दर्ज होने के बाद वजन, श्रेणी या भुगतान राशि में कोई भी बदलाव नहीं कर सकता।' 
                : 'Every physical scrap handover produces an immutable <strong>SHA-256 cryptographic hash stamp</strong>. Neither recyclers nor collectors can alter lot weight, category, or payment totals after generation.'}
            </p>
            <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.55;">
              ${isHi 
                ? 'ऑफलाइन मोड में काम करते समय, सारा डेटा आपके फोन के स्थानीय सुरक्षित स्टोरेज (SQLite) में रहता है और केवल इंटरनेट कनेक्ट होने पर ही सिंक होता है।' 
                : 'While operating offline in remote scrap yards, data is securely isolated in local on-device SQLite storage and transmitted over encrypted HTTPS/TLS protocols upon reconnection.'}
            </p>
          </div>

          <!-- Section 4: User Rights Under DPDP Act -->
          <div style="margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
              ${createLucideIcon('user-check', { size: 18, color: 'var(--block-emerald)' })}
              <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0;">
                ${isHi ? '4. उपयोगकर्ता अधिकार (डीपीडीपी अधिनियम 2023)' : '4. Your Rights under the DPDP Act 2023'}
              </h4>
            </div>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">
              ${isHi 
                ? 'आपको अपने व्यक्तिगत डेटा तक पहुंचने, गलत फोन नंबर या विवरण सुधारने, और अपने खाते को हटाने का पूर्ण अधिकार है।' 
                : 'As a user of KABADISETU, you have the statutory right to access your stored data, rectify outdated phone numbers, download your historical transaction ledger, and request total account deletion.'}
            </p>
          </div>

          <!-- Section 5: Grievance & Nodal Contact -->
          <div class="neu-box-sm" style="padding:16px 20px; background:var(--input-bg); border-radius:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <strong style="font-size:0.9rem; color:var(--text-primary); display:block;">
                  ${isHi ? 'शिकायत निवारण अधिकारी (Grievance Redressal Officer)' : 'Data Protection & Grievance Redressal Officer'}
                </strong>
                <span style="font-size:0.8rem; color:var(--text-muted); display:block; margin-top:2px;">
                  Email: <strong>privacy@kabadisetu.in</strong> | Contact: <strong>+91 22 4912 8821</strong>
                </span>
                <span style="font-size:0.75rem; color:var(--text-muted);">
                  KABADISETU Circular Economy Foundation, BKC, Mumbai, Maharashtra 400051
                </span>
              </div>
              <button class="neu-btn" style="background:var(--block-emerald); color:#fff; font-size:0.8rem; padding:8px 16px;" onclick="window.appState.closePrivacyModal()">
                ${createLucideIcon('check', { size: 16, color: '#fff' })} ${isHi ? 'मैंने समझ लिया एवं सहमत हूँ' : 'I Understand & Agree'}
              </button>
            </div>
          </div>

        </div>

        <!-- Modal Footer -->
        <div class="privacy-modal-footer" style="padding:16px 28px; background:var(--card-bg-solid); border-top:1px solid var(--card-border-subtle); display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.75rem; color:var(--text-muted);">
            ${isHi ? 'अंतिम अद्यतन: 31 अक्टूबर 2026 • संस्करण 1.0.0' : 'Last Updated: October 31, 2026 • Policy Version 1.0.0 (DPDP Certified)'}
          </span>
          <button class="neu-btn" style="background:var(--block-mint); color:#fff; font-weight:700; padding:8px 18px;" onclick="window.appState.closePrivacyModal()">
            ${isHi ? 'बंद करें' : 'Close Charter'}
          </button>
        </div>

      </div>
    </div>
  `;
}

