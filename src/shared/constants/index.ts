// API Configuration
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) || "https://api.fap-game.com";
export const API_TIMEOUT = 30000;

// Routes
export const ROUTES = {
  // Public Routes
  HOME: "/",
  ECOSYSTEM: "/ecosystem",
  EPISODE_ONE: "/episode-one",
  SAC1_POS_BRIDGE: "/sac1-pos-bridge",
  DIGITAL_ASSETS: "/digital-assets",
  PARTNERSHIP: "/partnership",
  ROADMAP: "/roadmap",
  CONTACT: "/contact",

  // Partner Portal Routes
  PARTNER_LOGIN: "/partner-login",
  PARTNER_PORTAL: "/partner-portal",
  PARTNER_DASHBOARD: "/partner-portal/dashboard",
  PARTNER_INVESTMENT: "/partner-portal/investment",
  PARTNER_METRICS: "/partner-portal/metrics",
  PARTNER_REPORTS: "/partner-portal/reports",
  PARTNER_DOCUMENTATION: "/partner-portal/documentation",
  PARTNER_SUPPORT: "/partner-portal/support",

  // Game Routes
  GAME: "/game",
  GAME_DASHBOARD: "/game/dashboard",
  GAME_TERRITORIES: "/game/territories",
  GAME_INVENTORY: "/game/inventory",
  GAME_ACHIEVEMENTS: "/game/achievements",

  // NFT Routes
  NFT_MARKETPLACE: "/nft-marketplace",
  NFT_MY_ASSETS: "/nft-marketplace/my-assets",

  // Wallet Routes
  WALLET: "/wallet",
  WALLET_TRANSACTIONS: "/wallet/transactions",

  // Auth Routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Error Routes
  NOT_FOUND: "/404",
  UNAUTHORIZED: "/401",
  SERVER_ERROR: "/500",
} as const;

// Company Information
export const COMPANY = {
  NAME: "Bentech Synergy Technology Ltd",
  PARTNER_NAME: "Sable Assents Coin Corporation",
  HEADQUARTERS: "10 Ijaye Road Ogba, Ikeja, Lagos",
  EMAIL: "contact@fap-game.com",
  WEBSITE: "https://fap-game.com",
  INVESTMENT_AMOUNT: 2000000,
  INVESTMENT_CURRENCY: "USD",
} as const;

// Game Configuration
export const GAME_CONFIG = {
  INITIAL_LEVEL: 1,
  INITIAL_EXPERIENCE: 0,
  INITIAL_SAC1_BALANCE: 100,
  EXPERIENCE_PER_LEVEL: 1000,
  RESOURCE_TYPES: ["ore", "crystal", "energy", "data"],
  ACHIEVEMENT_TYPES: ["mining", "expansion", "trading", "milestone"],
  TERRITORY_TYPES: ["digital_hub", "processing_center", "trading_post"],
  RESOURCE_GENERATION_RATE: 10, // per hour
  SAC1_REWARD_MULTIPLIER: 1.5,
} as const;

// NFT Configuration
export const NFT_CONFIG = {
  RARITY_LEVELS: ["common", "uncommon", "rare", "epic", "legendary"],
  ASSET_TYPES: ["land", "tool", "skin", "artifact"],
  COMMON_PRICE: 10,
  UNCOMMON_PRICE: 50,
  RARE_PRICE: 250,
  EPIC_PRICE: 1000,
  LEGENDARY_PRICE: 5000,
  MARKETPLACE_FEE_PERCENT: 2.5,
} as const;

// SAC1 Token Configuration
export const SAC1_CONFIG = {
  NAME: "Sable Assents Coin",
  SYMBOL: "SAC1",
  DECIMALS: 18,
  GAS_NETWORK: "low",
  TRANSACTION_FINALITY: "instant",
  UPTIME_GUARANTEE: 99.9,
} as const;

// POS Terminal Configuration
export const POS_CONFIG = {
  ENCRYPTION: "AES-256",
  SECURITY_PROTOCOL: "SAC1 Blockchain Security Protocol",
  QR_CODE_FORMAT: "dynamic",
  TRANSACTION_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// Partner Portal Configuration
export const PARTNER_PORTAL_CONFIG = {
  REQUIRED_2FA: true,
  SESSION_TIMEOUT: 3600000, // 1 hour
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_REQUIRE_SPECIAL: true,
  AUDIT_RETENTION_DAYS: 730, // 2 years
} as const;

// Compliance Configuration
export const COMPLIANCE_CONFIG = {
  NDPA_VERSION: "2023",
  DATA_RETENTION_DAYS: 730,
  AUDIT_FREQUENCY: "monthly",
  ENCRYPTION_STANDARD: "AES-256",
  IP_WHITELIST_ENABLED: false,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Cache Duration (in seconds)
export const CACHE_DURATION = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_GAME: true,
  ENABLE_NFT_MARKETPLACE: true,
  ENABLE_POS_INTEGRATION: true,
  ENABLE_PARTNER_PORTAL: true,
  ENABLE_2FA: true,
  ENABLE_WALLET: true,
  BETA_FEATURES: false,
} as const;

// Roadmap Phases
export const ROADMAP_PHASES = {
  PHASE_1: {
    name: "Q1-Q2 2026",
    title: "Episode One Implementation",
    description:
      "Implementation of Episode One. Deployment of $2M capital for core infrastructure.",
    status: "in_progress",
  },
  PHASE_2: {
    name: "Q3 2026",
    title: "Public Beta & Integration",
    description:
      "Public Beta Launch & SAC1 Wallet Integration. First 500 Physical SAC1 POS Terminal integrations.",
    status: "upcoming",
  },
  PHASE_3: {
    name: "Q4 2026",
    title: "NFT Marketplace & Episode Two",
    description:
      'NFT Marketplace Launch. Expansion into Episode Two: "The Continental Grid."',
    status: "upcoming",
  },
  PHASE_4: {
    name: "2027+",
    title: "Pan-African Rollout",
    description:
      "Pan-African retail rollout and integration of FAP rewards into mainstream digital services.",
    status: "upcoming",
  },
} as const;

// Social Links
export const SOCIAL_LINKS = {
  TWITTER: "https://twitter.com/fapgame",
  DISCORD: "https://discord.gg/fapgame",
  TELEGRAM: "https://t.me/fapgame",
  LINKEDIN: "https://linkedin.com/company/fap-game",
  INSTAGRAM: "https://instagram.com/fapgame",
} as const;

// Legal Links
export const LEGAL_LINKS = {
  PRIVACY_POLICY: "/legal/privacy-policy",
  TERMS_OF_SERVICE: "/legal/terms-of-service",
  NDPA_COMPLIANCE: "/legal/ndpa-compliance",
  COOKIE_POLICY: "/legal/cookie-policy",
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  UNAUTHORIZED: "Your session has expired. Please log in again.",
  FORBIDDEN: "You do not have permission to access this resource.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "An unexpected error occurred. Please try again later.",
  TIMEOUT: "Request timeout. Please try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  LOGOUT_SUCCESS: "Successfully logged out.",
  REGISTRATION_SUCCESS: "Account created successfully!",
  UPDATE_SUCCESS: "Updated successfully.",
  DELETE_SUCCESS: "Deleted successfully.",
  TRANSACTION_SUCCESS: "Transaction completed successfully!",
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT_DATE: "MMM dd, yyyy",
  LONG_DATE: "MMMM dd, yyyy",
  FULL_DATE: "EEEE, MMMM dd, yyyy",
  DATE_TIME: "MMM dd, yyyy HH:mm",
  TIME: "HH:mm:ss",
} as const;
