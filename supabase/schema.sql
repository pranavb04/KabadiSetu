-- ============================================================================
-- KABADISETU: SUPABASE DATABASE & AUTHENTICATION SCHEMA
-- Extended Producer Responsibility (EPR) & E-Waste Supply Chain Architecture
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Custom ENUM for User Roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('collector', 'recycler', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 3. PROFILES TABLE (Linked 1-to-1 with Supabase auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'collector',
    full_name TEXT NOT NULL,
    phone TEXT,
    cpcb_registration_no TEXT,          -- Mandatory for CPCB Registered Recyclers
    facility_address TEXT,              -- Physical recycling smelter / scrap yard address
    upi_id TEXT,                        -- UPI ID for instant escrow payments to collectors
    is_verified BOOLEAN DEFAULT false,  -- CPCB portal verification flag
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for high-speed lookup and JWT role checks
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_cpcb ON public.profiles(cpcb_registration_no);

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS) FOR PROFILES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view public metadata of collectors and recyclers
CREATE POLICY "Public profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (true);

-- Users can only insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ============================================================================
-- 5. AUTOMATIC PROFILE CREATION TRIGGER ON auth.users SIGNUP
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    user_role_val user_role := 'collector';
BEGIN
    -- Extract role from metadata or default to collector
    IF (NEW.raw_user_meta_data->>'role') = 'recycler' THEN
        user_role_val := 'recycler';
    ELSE
        user_role_val := 'collector';
    END IF;

    INSERT INTO public.profiles (
        id,
        email,
        role,
        full_name,
        phone,
        cpcb_registration_no,
        is_verified
    )
    VALUES (
        NEW.id,
        NEW.email,
        user_role_val,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'phone',
        CASE WHEN user_role_val = 'recycler' THEN NEW.raw_user_meta_data->>'cpcbRegistration' ELSE NULL END,
        CASE WHEN user_role_val = 'recycler' THEN true ELSE false END
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
        cpcb_registration_no = COALESCE(EXCLUDED.cpcb_registration_no, public.profiles.cpcb_registration_no),
        updated_at = NOW();

    RETURN NEW;
END;
$$;

-- Drop existing trigger if present, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 6. SCRAP LOTS TABLE (Created by Collectors, Bid on by Recyclers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.lots (
    id TEXT PRIMARY KEY,                                    -- e.g. 'LOT-2026-0891'
    collector_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    collector_name TEXT NOT NULL,
    category TEXT NOT NULL,
    grade TEXT NOT NULL,
    weight_kg NUMERIC(10, 2) NOT NULL CHECK (weight_kg > 0),
    asking_rate_per_kg NUMERIC(10, 2) NOT NULL CHECK (asking_rate_per_kg >= 0),
    total_valuation NUMERIC(12, 2) NOT NULL,
    ai_confidence NUMERIC(5, 2) DEFAULT 95.0,
    image_url TEXT,
    qr_handover_code TEXT,
    status TEXT DEFAULT 'Open for Bidding' CHECK (status IN ('Open for Bidding', 'Bid Accepted', 'Pickup Scheduled', 'Handover Verified')),
    matched_recycler_id UUID REFERENCES public.profiles(id),
    matched_recycler_name TEXT,
    cpcb_manifest_no TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.lots ENABLE ROW LEVEL SECURITY;

-- Collectors can manage their own lots
CREATE POLICY "Collectors can view own lots" 
ON public.lots FOR SELECT 
TO authenticated 
USING (auth.uid() = collector_id OR status = 'Open for Bidding');

CREATE POLICY "Collectors can insert lots" 
ON public.lots FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = collector_id);

CREATE POLICY "Collectors can update own lots" 
ON public.lots FOR UPDATE 
TO authenticated 
USING (auth.uid() = collector_id);

-- Recyclers can view open lots and lots they are matched with
CREATE POLICY "Recyclers can view lots for procurement" 
ON public.lots FOR SELECT 
TO authenticated 
USING (
    status = 'Open for Bidding' OR 
    matched_recycler_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'recycler')
);

-- ============================================================================
-- 7. BIDS TABLE (Placed by Verified Recyclers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lot_id TEXT REFERENCES public.lots(id) ON DELETE CASCADE NOT NULL,
    recycler_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    recycler_name TEXT NOT NULL,
    bid_rate_per_kg NUMERIC(10, 2) NOT NULL CHECK (bid_rate_per_kg > 0),
    total_bid_amount NUMERIC(12, 2) NOT NULL,
    pickup_eta TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recyclers can create bids" 
ON public.bids FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = recycler_id);

CREATE POLICY "Recyclers can view own bids" 
ON public.bids FOR SELECT 
TO authenticated 
USING (auth.uid() = recycler_id);

CREATE POLICY "Collectors can view bids on their lots" 
ON public.bids FOR SELECT 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.lots WHERE lots.id = bids.lot_id AND lots.collector_id = auth.uid()));

-- ============================================================================
-- 8. EPR CERTIFICATES TABLE (CPCB Statutory Audit & Green Credits)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.epr_certificates (
    id TEXT PRIMARY KEY,                                   -- e.g. 'CPCB-EPR-2026-9021'
    lot_id TEXT REFERENCES public.lots(id),
    recycler_id UUID REFERENCES public.profiles(id),
    collector_id UUID REFERENCES public.profiles(id),
    recycler_name TEXT NOT NULL,
    collector_name TEXT NOT NULL,
    material_category TEXT NOT NULL,
    quantity_mt NUMERIC(10, 3) NOT NULL,
    co2_offset_mt NUMERIC(10, 2) NOT NULL,
    green_credits_kwh NUMERIC(12, 2) NOT NULL,
    precious_metal_yield_g NUMERIC(10, 2) DEFAULT 0,
    cpcb_portal_sync_status TEXT DEFAULT 'SYNCED_VERIFIED',
    issued_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.epr_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "EPR certificates are viewable by all authenticated users" 
ON public.epr_certificates FOR SELECT 
TO authenticated 
USING (true);

-- ============================================================================
-- 9. HELPER VIEW: RECYCLER DASHBOARD AGGREGATES
-- ============================================================================
CREATE OR REPLACE VIEW public.recycler_stat_summary AS
SELECT 
    COUNT(DISTINCT l.id) AS total_lots_processed,
    COALESCE(SUM(l.weight_kg), 0) AS total_kg_diverted,
    COALESCE(SUM(l.total_valuation), 0) AS total_escrow_disbursed,
    COUNT(DISTINCT l.collector_id) AS total_active_collectors
FROM public.lots l
WHERE l.status = 'Handover Verified';

