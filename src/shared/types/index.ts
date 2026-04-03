// User and Authentication Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "pioneer" | "developer" | "partner" | "admin";
  walletAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  fullName: string;
  confirmPassword: string;
}

// Game and Achievement Types
export interface GamePioneer {
  id: string;
  userId: string;
  username: string;
  level: number;
  experience: number;
  sac1Balance: number;
  territory: Territory[];
  resources: GameResource[];
  achievements: Achievement[];
  createdAt: Date;
}

export interface Territory {
  id: string;
  name: string;
  location: string;
  level: number;
  resourceGeneration: number;
  sac1RewardsPerDay: number;
  claimedAt: Date;
}

export interface GameResource {
  id: string;
  type: "ore" | "crystal" | "energy" | "data";
  quantity: number;
  value: number;
  lastUpdated: Date;
}

export interface Achievement {
  id: string;
  type: "mining" | "expansion" | "trading" | "milestone";
  title: string;
  description: string;
  reward: number;
  claimedAt: Date;
}

// SAC1 Token and Blockchain Types
export interface SAC1Token {
  id: string;
  address: string;
  name: "SableAssent Coin";
  symbol: "SAC1";
  decimals: 18;
  totalSupply: string;
  circulatingSupply: string;
  priceUSD: number;
}

export interface SAC1Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: Date;
  status: "pending" | "confirmed" | "failed";
  txHash: string;
  type: "reward" | "payment" | "purchase" | "transfer";
}

export interface SAC1Wallet {
  id: string;
  userId: string;
  address: string;
  balance: number;
  recentTransactions: SAC1Transaction[];
  createdAt: Date;
}

export interface POSTerminal {
  id: string;
  merchantId: string;
  location: {
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  status: "active" | "inactive" | "maintenance";
  transactionsPerDay: number;
  totalVolume: number;
  activatedAt: Date;
}

// NFT and Marketplace Types
export interface NFTAsset {
  id: string;
  tokenId: string;
  owner: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  type: "land" | "tool" | "skin" | "artifact";
  contractAddress: string;
  mintedAt: Date;
  value: number;
}

export interface NFTMarketplace {
  id: string;
  nftId: string;
  sellerAddress: string;
  askingPrice: number;
  currency: "SAC1" | "USD";
  status: "listed" | "sold" | "delisted";
  createdAt: Date;
  soldAt?: Date;
}

export interface NFTLease {
  id: string;
  nftId: string;
  ownerAddress: string;
  renterAddress: string;
  dailyRate: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "completed" | "cancelled";
}

// Partner Portal Types
export interface Partner {
  id: string;
  name: string;
  email: string;
  role: "lead_partner" | "consultant" | "merchant" | "developer";
  companyName: string;
  investmentAmount: number;
  status: "active" | "pending" | "suspended";
  createdAt: Date;
}

export interface InvestmentDisbursal {
  id: string;
  partnerId: string;
  amount: number;
  category: "development" | "infrastructure" | "marketing" | "legal";
  description: string;
  date: Date;
  status: "approved" | "pending" | "rejected";
}

export interface ComplianceReport {
  id: string;
  month: Date;
  dataPrivacy: {
    ndpaCompliant: boolean;
    auditsPassed: number;
    violationsCount: number;
  };
  security: {
    breachAttempts: number;
    successfulFends: number;
  };
  regulatory: {
    sECAligned: boolean;
    notes: string;
  };
}

export interface PartnerMetrics {
  totalRegisteredPioneers: number;
  sac1WalletsCreated: number;
  nftAssetsMinted: number;
  communityGrowthPercent: number;
  totalSAC1Transactions: number;
  averagePOSVelocity: number;
  liquidityHealth: number;
}

// Monthly Report Types
export interface MonthlyProgressReport {
  id: string;
  period: Date;
  status: "on_track" | "accelerated" | "delayed";
  completionPercent: number;
  keyMilestone: string;
  financialData: {
    totalInvestment: number;
    disbursedToDate: number;
    monthlyExpenditure: {
      development: number;
      infrastructure: number;
      marketing: number;
      legal: number;
    };
    burnRate: string;
  };
  technicalMilestones: {
    gameDevelopment: string;
    blockchainIntegration: string;
    posInfrastructure: string;
  };
  nextMonthObjectives: string[];
  preparedBy: string;
  submissionDate: Date;
}

// General Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  metadata?: {
    timestamp: Date;
    version: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface GenericError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}
