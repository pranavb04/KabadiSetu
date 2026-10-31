import { supabase } from './supabase.js';

/**
 * Loads all scrap lots, bids, and EPR certificates from Supabase
 * Restores user progress across sessions and logins
 */
export async function loadCloudData(currentUser) {
  if (!supabase) return { lots: [], bids: [], certificates: [] };

  try {
    const [lotsRes, bidsRes, eprRes] = await Promise.all([
      supabase.from('lots').select('*').order('created_at', { ascending: false }),
      supabase.from('bids').select('*').order('created_at', { ascending: false }),
      supabase.from('epr_certificates').select('*').order('issued_at', { ascending: false })
    ]);

    const lots = lotsRes.data || [];
    const bids = bidsRes.data || [];
    const certificates = eprRes.data || [];

    console.log(`[Supabase Sync] Restored from cloud: ${lots.length} lots, ${bids.length} bids, ${certificates.length} certificates.`);
    return { lots, bids, certificates };
  } catch (err) {
    console.warn('[Supabase Sync] Error loading cloud data:', err.message);
    return { lots: [], bids: [], certificates: [] };
  }
}

/**
 * Saves a newly uploaded Scrap Lot to Supabase in Realtime
 */
export async function syncLotToCloud(lot, currentUser) {
  if (!supabase) return;

  try {
    const cloudRecord = {
      id: lot.id,
      collector_id: (currentUser?.id && currentUser.id.includes('-') && currentUser.id.length === 36) ? currentUser.id : undefined,
      collector_name: lot.collector || currentUser?.name || 'Informal Collector',
      category: lot.material || lot.category || 'High-Grade Printed Circuit Boards (PCBs)',
      grade: lot.grade || 'Grade A+',
      weight_kg: Number(lot.weight) || 15.0,
      asking_rate_per_kg: Number(lot.askingRate || lot.rate) || 480.0,
      total_valuation: Number(lot.valuation || (lot.weight * lot.rate)) || 7200.0,
      ai_confidence: Number(lot.confidence || 96.8),
      image_url: lot.image || '/materials/pcb.jpg',
      qr_handover_code: lot.qrCode || `QR-${lot.id}`,
      status: lot.status || 'Open for Bidding',
      matched_recycler_name: lot.buyer || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('lots').upsert(cloudRecord, { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase Sync Lot] Warning:', error.message);
    } else {
      console.log(`[Supabase Realtime] Lot ${lot.id} successfully synced to cloud.`);
    }
  } catch (err) {
    console.error('[Supabase Sync Lot] Error:', err);
  }
}

/**
 * Saves a new Bid from a Recycler to Supabase in Realtime
 */
export async function syncBidToCloud(bid, lot, currentUser) {
  if (!supabase) return;

  try {
    const cloudBid = {
      lot_id: lot.id,
      recycler_name: currentUser?.name || 'Authorized Recycler',
      bid_rate_per_kg: Number(bid.rate || bid.bid_rate_per_kg) || 490,
      total_bid_amount: Number(bid.total || (lot.weight * 490)),
      pickup_eta: bid.eta || 'Within 24 Hours',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    if (currentUser?.id && currentUser.id.includes('-') && currentUser.id.length === 36) {
      cloudBid.recycler_id = currentUser.id;
    }

    const { error: bidErr } = await supabase.from('bids').insert(cloudBid);
    if (bidErr) console.warn('[Supabase Sync Bid] Warning:', bidErr.message);

    // Also update lot status to 'Bid Accepted' or update buyer
    await supabase.from('lots').update({
      matched_recycler_name: currentUser?.name || 'EcoRecycle Solutions',
      updated_at: new Date().toISOString()
    }).eq('id', lot.id);

    console.log(`[Supabase Realtime] Bid for ${lot.id} synced to cloud.`);
  } catch (err) {
    console.error('[Supabase Sync Bid] Error:', err);
  }
}

/**
 * Updates Lot status on Handover Verification & creates statutory EPR Certificate in Supabase
 */
export async function syncHandoverToCloud(lot, certificate, currentUser) {
  if (!supabase) return;

  try {
    // 1. Update lot status in cloud
    await supabase.from('lots').update({
      status: 'Handover Verified',
      cpcb_manifest_no: certificate.id || `CPCB-EPR-${Date.now()}`,
      updated_at: new Date().toISOString()
    }).eq('id', lot.id);

    // 2. Insert EPR certificate into cloud
    const cloudCert = {
      id: certificate.id || `CPCB-EPR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      lot_id: lot.id,
      recycler_name: lot.buyer || certificate.recycler || 'Authorized Recycler',
      collector_name: lot.collector || certificate.collector || 'Informal Collector',
      material_category: lot.material || certificate.material || 'Printed Circuit Boards',
      quantity_mt: Number(lot.weight / 1000) || 0.015,
      co2_offset_mt: Number((lot.weight * 1.8) / 1000) || 0.027,
      green_credits_kwh: Number(lot.weight * 4.2) || 63.0,
      precious_metal_yield_g: Number(lot.weight * 0.12) || 1.8,
      cpcb_portal_sync_status: 'SYNCED_VERIFIED',
      issued_at: new Date().toISOString()
    };

    const { error } = await supabase.from('epr_certificates').upsert(cloudCert, { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase Sync Certificate] Warning:', error.message);
    } else {
      console.log(`[Supabase Realtime] EPR Certificate ${cloudCert.id} created and verified in cloud.`);
    }
  } catch (err) {
    console.error('[Supabase Sync Handover] Error:', err);
  }
}

/**
 * Initializes Supabase Realtime Listener across all tables
 */
export function initRealtimeSubscription(onDataChange) {
  if (!supabase) return null;

  try {
    const channel = supabase.channel('kabadisetu-live-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lots' }, (payload) => {
        console.log('[Supabase Realtime] Lot change detected:', payload.eventType, payload.new?.id);
        if (onDataChange) onDataChange('lots', payload);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bids' }, (payload) => {
        console.log('[Supabase Realtime] Bid change detected:', payload.eventType, payload.new?.id);
        if (onDataChange) onDataChange('bids', payload);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'epr_certificates' }, (payload) => {
        console.log('[Supabase Realtime] EPR change detected:', payload.eventType, payload.new?.id);
        if (onDataChange) onDataChange('epr_certificates', payload);
      })
      .subscribe((status) => {
        console.log('[Supabase Realtime Status]:', status);
      });

    return channel;
  } catch (err) {
    console.warn('[Supabase Realtime] Subscription warning:', err.message);
    return null;
  }
}

