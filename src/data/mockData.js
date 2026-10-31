// KABADISETU Mock Dataset - E-Waste Recycling Value Chain

export const benchmarkPrices = [
  { id: 'p1', category: 'High-Grade Printed Circuit Boards (PCBs)', grade: 'Grade A (Server/Telecom)', rate: 480, trend: '+4.2%', icon: 'cpu', hazard: 'Medium', desc: 'Gold/Silver contacts, multi-layer IC chips' },
  { id: 'p2', category: 'Copper Wires & Transformer Coils', grade: '99% Purity Heavy Copper', rate: 680, trend: '+2.8%', icon: 'cable', hazard: 'Low', desc: 'Stripped copper windings, heavy power cables' },
  { id: 'p3', category: 'Lithium-Ion Battery Modules', grade: 'High Energy Cell Packs', rate: 320, trend: '+6.1%', icon: 'battery-charging', hazard: 'High', desc: 'EV/Laptop batteries, requires safe handling' },
  { id: 'p4', category: 'Display Glass & LCD Modules', grade: 'Intact Panels & Glass', rate: 95, trend: '-1.2%', icon: 'monitor', hazard: 'Medium', desc: 'Mercury backlight tubes (pre-2018) require care' },
  { id: 'p5', category: 'Mixed Computer Hardware & Sheeting', grade: 'Standard Scrap Mix', rate: 165, trend: '+1.5%', icon: 'hard-drive', hazard: 'Low', desc: 'Steel chassis, power supplies, fan assemblies' },
  { id: 'p6', category: 'Aluminum Heatsinks & Enclosures', grade: 'Grade 6061 Extruded', rate: 210, trend: '+3.0%', icon: 'layers', hazard: 'Low', desc: 'Clean aluminum heatsinks from servers and amplifiers' }
];

export const defaultUsers = [
  {
    id: 'COL-8821',
    name: 'Ramesh Kumar',
    username: 'ramesh_kumar',
    email: 'ramesh.collector@kabadisetu.in',
    phone: '+91 98201 44821',
    role: 'collector',
    location: 'Dharavi Sector 4, Mumbai',
    kycVerified: true,
    rating: 4.9,
    totalLotsSold: 28,
    totalEarned: 148500
  },
  {
    id: 'REC-001',
    name: 'EcoRecycle India Pvt Ltd',
    username: 'ecorecycle_admin',
    email: 'procurement@ecorecycle.in',
    phone: '+91 99308 19011',
    role: 'recycler',
    cpcbRegistration: 'CPCB/E-WASTE/REG-9011',
    location: 'Thane Industrial Belt, MH',
    capacityTonsMonth: 250,
    rating: 4.9,
    activeBids: 6,
    totalLotsAcquired: 42
  }
];

export const sampleLots = [
  {
    id: 'LOT-2026-0891',
    collectorName: 'Ramesh Kumar',
    collectorId: 'COL-8821',
    location: 'Dharavi Sector 4, Mumbai',
    distanceKm: 2.8,
    category: 'High-Grade Printed Circuit Boards (PCBs)',
    grade: 'Grade A (Server/Telecom)',
    weightKg: 18.5,
    collectorPriceRate: 490,
    estimatedRateKg: 480,
    estimatedTotal: 9065,
    aiConfidence: 96.4,
    status: 'Matched',
    matchedRecycler: 'EcoRecycle India Pvt Ltd',
    recyclerCpcb: 'CPCB/E-WASTE/REG-9011',
    finalOfferRate: 495,
    finalTotal: 9157,
    paymentMethod: 'UPI Instant Escrow',
    timestamp: '2026-09-07 03:15 PM',
    photoUrl: '/materials/pcb.jpg',
    syncedCloud: true
  },
  {
    id: 'LOT-2026-0892',
    collectorName: 'Sunil Aggregator Yard',
    collectorId: 'COL-7743',
    location: 'Kurla West Industrial Estate, Mumbai',
    distanceKm: 4.5,
    category: 'Copper Wires & Transformer Coils',
    grade: '99% Purity Heavy Copper',
    weightKg: 34.0,
    collectorPriceRate: 700,
    estimatedRateKg: 680,
    estimatedTotal: 23800,
    aiConfidence: 98.1,
    status: 'Pending Bid',
    matchedRecycler: null,
    highestBidRate: 690,
    highestBidTotal: 23460,
    paymentMethod: 'Cash Handover Payout',
    timestamp: '2026-09-07 04:02 PM',
    photoUrl: '/materials/copper.jpg',
    syncedCloud: true
  },
  {
    id: 'LOT-2026-0893',
    collectorName: 'Ananya E-Collect Self-Help Group',
    collectorId: 'COL-9012',
    location: 'Bandra Reclamation, Mumbai',
    distanceKm: 8.2,
    category: 'Lithium-Ion Battery Modules',
    grade: 'High Energy Cell Packs',
    weightKg: 12.0,
    collectorPriceRate: 330,
    estimatedRateKg: 320,
    estimatedTotal: 3960,
    aiConfidence: 94.2,
    status: 'Handover Verified',
    matchedRecycler: 'GreenTech Recycling Hub',
    recyclerCpcb: 'CPCB/E-WASTE/REG-8812',
    finalOfferRate: 330,
    finalTotal: 3960,
    paymentMethod: 'Bank Ledger Direct',
    timestamp: '2026-09-07 01:30 PM',
    photoUrl: '/materials/battery.jpg',
    syncedCloud: true,
    eprCreditGenerated: 'EPR-BAT-2026-4401'
  },
  {
    id: 'LOT-2026-0894',
    collectorName: 'Ramesh Kumar',
    collectorId: 'COL-8821',
    location: 'Mahim Scrap Hub, Mumbai',
    distanceKm: 13.5,
    category: 'Display Glass & LCD Modules',
    grade: 'Intact Panels & Glass',
    weightKg: 28.5,
    collectorPriceRate: 98,
    estimatedRateKg: 95,
    estimatedTotal: 2793,
    aiConfidence: 91.8,
    status: 'Pending Bid',
    matchedRecycler: null,
    highestBidRate: null,
    paymentMethod: 'UPI Instant Escrow',
    timestamp: '2026-09-07 04:30 PM',
    photoUrl: '/materials/display.jpg',
    syncedCloud: true
  },
  {
    id: 'LOT-2026-0895',
    collectorName: 'Ghatkopar Scrap Cooperative',
    collectorId: 'COL-6510',
    location: 'Ghatkopar Industrial Zone, Mumbai',
    distanceKm: 26.0,
    category: 'High-Grade Printed Circuit Boards (PCBs)',
    grade: 'Telecom Server Boards',
    weightKg: 45.0,
    collectorPriceRate: 485,
    estimatedRateKg: 480,
    estimatedTotal: 21825,
    aiConfidence: 97.2,
    status: 'Pending Bid',
    matchedRecycler: null,
    highestBidRate: 475,
    paymentMethod: 'UPI Instant Escrow',
    timestamp: '2026-09-07 05:10 PM',
    photoUrl: '/materials/pcb.jpg',
    syncedCloud: true
  },
  {
    id: 'LOT-2026-0896',
    collectorName: 'Navi Mumbai Green Collectors',
    collectorId: 'COL-4421',
    location: 'Vashi APMC Market, Navi Mumbai',
    distanceKm: 42.0,
    category: 'Lithium-Ion Battery Modules',
    grade: 'Automotive EV Modules',
    weightKg: 65.0,
    collectorPriceRate: 340,
    estimatedRateKg: 320,
    estimatedTotal: 22100,
    aiConfidence: 95.8,
    status: 'Pending Bid',
    matchedRecycler: null,
    highestBidRate: 325,
    paymentMethod: 'Bank Ledger Direct',
    timestamp: '2026-09-07 05:45 PM',
    photoUrl: '/materials/battery.jpg',
    syncedCloud: true
  }
];

export const verifiedRecyclers = [
  {
    id: 'REC-001',
    name: 'EcoRecycle India Pvt Ltd',
    cpcbRegistration: 'CPCB/E-WASTE/REG-9011',
    validity: 'Valid till Nov 2028',
    location: 'Thane Industrial Belt, MH',
    distanceKm: 3.2,
    rating: 4.9,
    capacityTonsMonth: 250,
    acceptedMaterials: ['PCBs', 'Copper', 'Batteries', 'Hardware'],
    minLotWeightKg: 10,
    escrowVerified: true
  },
  {
    id: 'REC-002',
    name: 'GreenTech Recycling Hub',
    cpcbRegistration: 'CPCB/E-WASTE/REG-8812',
    validity: 'Valid till Mar 2029',
    location: 'Navi Mumbai MIDC, MH',
    distanceKm: 6.5,
    rating: 4.8,
    capacityTonsMonth: 180,
    acceptedMaterials: ['Batteries', 'Display Glass', 'Plastics'],
    minLotWeightKg: 5,
    escrowVerified: true
  },
  {
    id: 'REC-003',
    name: 'MetalMatrix Refinement Ltd',
    cpcbRegistration: 'CPCB/E-WASTE/REG-7703',
    validity: 'Valid till Aug 2027',
    location: 'Taloja Recycling Zone, MH',
    distanceKm: 12.0,
    rating: 4.7,
    capacityTonsMonth: 500,
    acceptedMaterials: ['PCBs', 'Precious Metals', 'Heavy Copper'],
    minLotWeightKg: 20,
    escrowVerified: true
  }
];

export const eprCertificates = [
  {
    certId: 'EPR-2026-CERT-9041',
    recyclerName: 'EcoRecycle India Pvt Ltd',
    cpcbAuth: 'CPCB/E-WASTE/REG-9011',
    producerBrand: 'Apex Electronics Tech Corp',
    materialCategory: 'Class I - Telecom & Server PCBs',
    quantityKg: 1850,
    hazardousMitigated: 'Lead, Cadmium, Brominated Flame Retardants (BFR)',
    issueDate: '2026-09-01',
    qrVerificationHash: '0x8f4a12c90b3e512d77a8',
    auditStatus: 'VERIFIED & REGISTERED ON CPCB PORTAL'
  },
  {
    certId: 'EPR-2026-CERT-8820',
    recyclerName: 'GreenTech Recycling Hub',
    cpcbAuth: 'CPCB/E-WASTE/REG-8812',
    producerBrand: 'Global Mobility Devices Pvt Ltd',
    materialCategory: 'Class IV - Lithium-Ion Cell Packs',
    quantityKg: 1200,
    hazardousMitigated: 'Cobalt, Lithium, Electrolyte Solvents',
    issueDate: '2026-08-28',
    qrVerificationHash: '0x7e221bfa9001c432d1e5',
    auditStatus: 'VERIFIED & REGISTERED ON CPCB PORTAL'
  }
];

export const vernacularTranslations = {
  en: {
    appTitle: 'KABADISETU',
    tagline: 'Bridging Informal Collectors to Formal E-Waste Recycling',
    scanMaterial: 'Scan Scrap Material',
    createLot: 'Create E-Waste Lot',
    livePriceBoard: 'Live Benchmark Price Board',
    onlineStatus: 'ONLINE (FastAPI Engine)',
    offlineStatus: 'OFFLINE (SQLite Buffer)'
  },
  hi: {
    appTitle: 'कबाड़ीसेतु',
    tagline: 'अनौपचारिक कबाड़ियों को औपचारिक ई-कचरा रीसाइक्लिंग से जोड़ना',
    scanMaterial: 'कचरा सामग्री की फोटो लें / जांचें',
    createLot: 'नया कचरा लॉट बनाएं',
    livePriceBoard: 'लाइव सरकारी / बाजार मूल्य बोर्ड',
    onlineStatus: 'ऑनलाइन (फास्ट-एपीआई सर्वर)',
    offlineStatus: 'ऑफलाइन (लोकल स्टोरेज बफर)'
  }
};
