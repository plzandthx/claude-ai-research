// Confidence score for data accuracy
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface SourcedData {
  value: any;
  source: string;
  sourceUrl: string;
  confidence: ConfidenceLevel;
  dateCollected: string;
  notes?: string;
}

// 1. Basic Company Information
export interface CompanyBasics {
  name: string;
  slug: string;
  logo: string;
  website: string;
  headquarters: SourcedData;
  foundedYear: SourcedData;
  numberOfEmployees: SourcedData;
  industry: SourcedData;
  description: SourcedData;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

// 2. Financials
export interface FinancialReport {
  quarter: string;
  year: number;
  revenue: SourcedData;
  profit?: SourcedData;
  growthRate?: SourcedData;
}

export interface Financials {
  fundingRounds?: SourcedData[];
  totalFunding?: SourcedData;
  valuation?: SourcedData;
  quarterlyEarnings: FinancialReport[];
  revenueHistory: SourcedData[];
  isPublic: SourcedData;
  stockSymbol?: SourcedData;
}

// 3. Milestones
export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'ipo' | 'funding' | 'product' | 'partnership' | 'acquisition' | 'strategic-shift' | 'other';
  source: string;
  sourceUrl: string;
  confidence: ConfidenceLevel;
  impact: 'high' | 'medium' | 'low';
}

// 4. Product Information
export interface ProductFeature {
  name: string;
  description: SourcedData;
  screenshots: string[];
  category: string;
  keyCapabilities: SourcedData[];
}

export interface Product {
  name: string;
  description: SourcedData;
  launchDate?: SourcedData;
  targetAudience: SourcedData;
  usageStats?: SourcedData;
  strategy: SourcedData;
  positioning: SourcedData;
  features: ProductFeature[];
  screenshots: string[];
}

// 5. Pricing
export interface PricingTier {
  name: string;
  price: SourcedData;
  billingCycle: 'monthly' | 'annual' | 'one-time' | 'usage-based';
  features: string[];
  limitations?: string[];
  targetCustomer: string;
  popular?: boolean;
}

export interface Pricing {
  model: SourcedData; // 'freemium' | 'subscription' | 'usage-based' | 'enterprise' | 'free'
  tiers: PricingTier[];
  discounts?: SourcedData[];
  customPricing: boolean;
  freeTrialAvailable: SourcedData;
  moneyBackGuarantee?: SourcedData;
  lastUpdated: string;
}

// 6. Technology
export interface Technology {
  frontend: SourcedData[];
  backend: SourcedData[];
  infrastructure: SourcedData[];
  security: SourcedData[];
  integrations: SourcedData[];
  mobileApps: {
    ios: SourcedData;
    android: SourcedData;
  };
  apiAvailability: SourcedData;
}

// 7. Marketing and Positioning
export interface MarketingChannelSpend {
  channel: string;
  estimatedSpend: SourcedData;
  activity: SourcedData;
}

export interface Marketing {
  brandIdentity: {
    tagline: SourcedData;
    colors: string[];
    tone: SourcedData;
  };
  valuePropositions: SourcedData[];
  targetMarkets: SourcedData[];
  differentiators: SourcedData[];
  marketingChannels: MarketingChannelSpend[];
  estimatedMarketingBudget?: SourcedData;
  seoStrategy: SourcedData;
  contentStrategy: SourcedData;
}

// 8. Claims and Statistics
export interface Claim {
  id: string;
  claim: string;
  metric: string;
  value: SourcedData;
  context?: string;
  dateStated: string;
}

// 9. Reviews and Ratings
export interface Review {
  platform: string;
  rating: SourcedData;
  totalReviews: SourcedData;
  recentTrend: 'improving' | 'declining' | 'stable';
  commonPraises: string[];
  commonComplaints: string[];
  lastUpdated: string;
}

export interface ReviewSynthesis {
  overallSentiment: 'positive' | 'neutral' | 'negative';
  aggregatedRating: number;
  totalReviewsAcrossPlatforms: number;
  reviews: Review[];
  keyInsights: SourcedData[];
}

// Main Competitor Interface
export interface Competitor {
  id: string;
  basics: CompanyBasics;
  financials: Financials;
  milestones: Milestone[];
  products: Product[];
  pricing: Pricing;
  technology: Technology;
  marketing: Marketing;
  claims: Claim[];
  reviews: ReviewSynthesis;
  lastUpdated: string;
  completeness: number; // 0-100 percentage of data collected
}

// For the overview/dashboard
export interface CompetitorSummary {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  employees: number;
  founded: number;
  overallRating: number;
  keyStrengths: string[];
  completeness: number;
}
