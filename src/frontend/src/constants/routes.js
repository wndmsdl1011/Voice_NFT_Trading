// Route constants for better maintainability
export const ROUTES = {
  // Main routes
  HOME: "/",
  CREATE: "/create",

  // TTS routes
  TTS: "/tts",

  // Auth routes
  LOGIN: "/login",

  // Marketplace routes
  MARKETPLACE: "/marketplace",
  NFT_DETAILS: (id) => `/nft/${id}`,
  RESELL: (id) => `/resell/${id}`,

  // Dashboard routes
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Static pages
  ABOUT: "/about",
  CONTACT: "/contact",
  DOCS: "/docs",
  FAQ: "/faq",
  HELP: "/help",
  PRICING: "/pricing",
  PRIVACY: "/privacy",
  TERMS: "/terms",

  // Utility routes
  SUCCESS: "/success",
  LOADING: "/loading",
  ERROR: "*",
};

// Navigation menu items
export const NAV_ITEMS = [
  { path: ROUTES.HOME, label: "Home", isPublic: true },
  { path: ROUTES.MARKETPLACE, label: "Marketplace", isPublic: true },
  { path: ROUTES.CREATE, label: "Create", isPublic: false },
  { path: ROUTES.TTS, label: "TTS Studio", isPublic: false },
  { path: ROUTES.DASHBOARD, label: "Dashboard", isPublic: false },
  { path: ROUTES.ABOUT, label: "About", isPublic: true },
];

export default ROUTES;
