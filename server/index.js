import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from Prototype/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const JWT_SECRET = process.env.VITE_JWT_SECRET || 'kabadisetu_secure_jwt_token_secret_2026_cpcb_auth';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://vbmlypfojzyvqkxownii.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7tf5AiKz44q0uRzRkaU-fA_1g5cXd1x';

app.use(cors());
app.use(express.json());

// Initialize Supabase client for cloud profile synchronization
let supabase = null;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('[Backend] Supabase client initialized for:', SUPABASE_URL);
} catch (err) {
  console.warn('[Backend] Supabase client initialization warning:', err.message);
}

// Ensure local persistence store exists
const DB_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'users.json');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Seed default verified test users if users.json does not exist
if (!fs.existsSync(DB_FILE)) {
  const defaultSalt = bcrypt.genSaltSync(10);
  const initialUsers = [
    {
      id: 'COL-1001',
      email: 'collector@kabadisetu.in',
      password_hash: bcrypt.hashSync('collector123', defaultSalt),
      role: 'collector',
      full_name: 'Ramesh Kumar (Informal Scrap Collector)',
      phone: '+91 98200 12345',
      cpcb_registration_no: null,
      is_verified: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'REC-2001',
      email: 'recycler@kabadisetu.in',
      password_hash: bcrypt.hashSync('recycler123', defaultSalt),
      role: 'recycler',
      full_name: 'EcoRecycle Solutions India Pvt Ltd',
      phone: '+91 98111 67890',
      cpcb_registration_no: 'CPCB/E-WASTE/REG-2026-9011',
      is_verified: true,
      created_at: new Date().toISOString()
    }
  ];
  fs.writeFileSync(DB_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
  console.log('[Backend] Created initial user database with default collector & recycler accounts.');
}

// Helper to read users from database
function getUsers() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Backend] Error reading users.json:', err);
    return [];
  }
}

// Helper to write users to database
function saveUsers(users) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Backend] Error saving users.json:', err);
  }
}

// Helper to sync user profile to Supabase database
async function syncToSupabaseProfile(user) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from('profiles').upsert({
      id: user.id.includes('-') && user.id.length === 36 ? user.id : undefined,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      phone: user.phone,
      cpcb_registration_no: user.cpcb_registration_no,
      is_verified: user.is_verified,
      updated_at: new Date().toISOString()
    }, { onConflict: 'email' });

    if (error) {
      console.warn('[Backend Supabase Sync] Notice:', error.message);
    } else {
      console.log(`[Backend Supabase Sync] Synced profile for: ${user.email} (${user.role})`);
    }
  } catch (err) {
    console.warn('[Backend Supabase Sync] Non-blocking sync note:', err.message);
  }
}

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

/**
 * Health check & status
 */
app.get('/api/health', (req, res) => {
  const users = getUsers();
  res.json({
    status: 'online',
    service: 'KabadiSetu Authentication & Sync Gateway',
    timestamp: new Date().toISOString(),
    registeredUsersCount: users.length,
    supabaseConfigured: !!supabase
  });
});

/**
 * POST /api/auth/signup
 * Validates, hashes password, saves to database, and syncs with Supabase
 */
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, role, name, phone, cpcbRegistration } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and account role are strictly required.'
      });
    }

    if (!['collector', 'recycler'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either collector or recycler.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already registered
    const existingUser = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: `An account with email "${normalizedEmail}" is already registered. Please sign in instead.`
      });
    }

    // Hash password with bcryptjs salt
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    // Generate verified User Record
    const userId = role === 'collector'
      ? `COL-${Math.floor(1000 + Math.random() * 9000)}`
      : `REC-${Math.floor(2000 + Math.random() * 9000)}`;

    const newUser = {
      id: userId,
      email: normalizedEmail,
      password_hash,
      role,
      full_name: name || (role === 'collector' ? 'Kabadiwala Collector' : 'Authorized Recycler'),
      phone: phone || '+91 98200 12345',
      cpcb_registration_no: role === 'recycler' ? (cpcbRegistration || 'CPCB/E-WASTE/REG-2026-9011') : null,
      is_verified: role === 'recycler',
      created_at: new Date().toISOString()
    };

    // Save to persistent database
    users.push(newUser);
    saveUsers(users);

    // Sync profile to Supabase
    await syncToSupabaseProfile(newUser);

    // Generate signed JWT token
    const tokenPayload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.full_name,
      phone: newUser.phone,
      cpcbRegistration: newUser.cpcb_registration_no,
      is_verified: newUser.is_verified,
      iss: 'kabadisetu-auth-server'
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });

    console.log(`[Backend Auth] New user registered: ${newUser.email} as ${newUser.role.toUpperCase()}`);

    return res.status(201).json({
      success: true,
      message: 'Account successfully created and registered.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.full_name,
        phone: newUser.phone,
        cpcbRegistration: newUser.cpcb_registration_no,
        is_verified: newUser.is_verified
      }
    });

  } catch (err) {
    console.error('[Backend Auth Signup Error]', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing signup.'
    });
  }
});

/**
 * POST /api/auth/login
 * Strictly verifies registered email, password hash, AND selected role matching
 */
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check if user exists in database
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `No registered account found with email "${normalizedEmail}". Please sign up first.`
      });
    }

    // 2. Verify password with bcrypt
    const passwordMatch = bcrypt.compareSync(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please verify your credentials and try again.'
      });
    }

    // 3. Strict Role Matching Validation
    if (role && user.role !== role) {
      const registeredRoleTitle = user.role === 'collector' ? 'Informal Scrap Collector' : 'Authorized CPCB Recycler';
      const attemptedRoleTitle = role === 'collector' ? 'Scrap Collector Hub' : 'Recycler Procurement Portal';
      return res.status(403).json({
        success: false,
        message: `Role Access Denied: This account is registered as an "${registeredRoleTitle}". You cannot log into the "${attemptedRoleTitle}". Please select the correct "${registeredRoleTitle}" tab on the login screen.`
      });
    }

    // 4. Generate signed cryptographic JWT Token
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.full_name,
      phone: user.phone,
      cpcbRegistration: user.cpcb_registration_no,
      is_verified: user.is_verified,
      iss: 'kabadisetu-auth-server'
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });

    console.log(`[Backend Auth] Successful login: ${user.email} as ${user.role.toUpperCase()}`);

    return res.json({
      success: true,
      message: `Authentication verified. Welcome back, ${user.full_name}!`,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.full_name,
        phone: user.phone,
        cpcbRegistration: user.cpcb_registration_no,
        is_verified: user.is_verified
      }
    });

  } catch (err) {
    console.error('[Backend Auth Login Error]', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing login.'
    });
  }
});

/**
 * GET /api/auth/me
 * Verifies JWT token and returns verified session
 */
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const users = getUsers();
    const user = users.find(u => u.id === decoded.id || u.email === decoded.email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User record no longer exists.' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.full_name,
        phone: user.phone,
        cpcbRegistration: user.cpcb_registration_no,
        is_verified: user.is_verified
      }
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
});

/**
 * GET /api/auth/users
 * Lists sanitized registered users for dashboard inspection
 */
app.get('/api/auth/users', (req, res) => {
  const users = getUsers().map(u => ({
    id: u.id,
    email: u.email,
    role: u.role,
    name: u.full_name,
    phone: u.phone,
    cpcbRegistration: u.cpcb_registration_no,
    is_verified: u.is_verified,
    created_at: u.created_at
  }));
  res.json({ success: true, count: users.length, users });
});

app.listen(PORT, () => {
  console.log(`[Backend Server] KabadiSetu Auth & Database API running on http://localhost:${PORT}`);
});

