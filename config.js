/*
  JESTER CONFIGURATION
  -----------------------------------------
  This file keeps backend configuration separate
  from the main application code.

  For a real online version, create a Supabase
  project and put its public URL and ANON KEY below.

  IMPORTANT:
  - Never put a Supabase SERVICE_ROLE key here.
  - The anon/public key is designed for frontend use
    when Row Level Security (RLS) is configured correctly.
*/

const JESTER_CONFIG = {
  appName: "JESTER",
  version: "1.0.0",

  // Replace these when connecting Supabase:
  supabaseUrl: "YOUR_SUPABASE_URL",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",

  features: {
    authentication: true,
    posts: true,
    stories: true,
    reels: true,
    likes: true,
    comments: true,
    followers: true,
    privateMessaging: true,
    contacts: true,
    notifications: true,
    profiles: true
  }
};

// Example future initialization:
// const supabase = window.supabase.createClient(
//   JESTER_CONFIG.supabaseUrl,
//   JESTER_CONFIG.supabaseAnonKey
// );
