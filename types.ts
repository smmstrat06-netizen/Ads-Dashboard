
export type Platform = 'Meta' | 'Google' | 'All';

export interface CampaignMetric {
  id: string;
  name: string;
  platform: 'Meta' | 'Google';
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  conversions: number;
  revenue: number;
  date: string;
  status: 'active' | 'paused' | 'learning';
}

export interface AggregatedMetrics {
  totalSpend: number;
  totalRevenue: number;
  avgROAS: number;
  avgCPA: number;
  avgCTR: number;
  avgCPC: number;
  totalConversions: number;
}

export interface PerformanceData {
  date: string;
  spend: number;
  revenue: number;
  roas: number;
}

export interface AIRecommendation {
  type: 'diagnosis' | 'issue' | 'opportunity' | 'action';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export enum UserRole {
  ADMIN = 'Admin',
  MEDIA_BUYER = 'Media Buyer',
  CLIENT = 'Client'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
