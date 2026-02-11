
import { CampaignMetric, PerformanceData } from './types';

export const mockCampaigns: CampaignMetric[] = [
  { id: '1', name: 'Summer Sale - US', platform: 'Meta', spend: 12500, impressions: 450000, reach: 210000, clicks: 8500, conversions: 420, revenue: 38000, date: '2023-10-01', status: 'active' },
  { id: '2', name: 'Prospecting - Lookalikes', platform: 'Meta', spend: 8400, impressions: 320000, reach: 180000, clicks: 5200, conversions: 180, revenue: 15200, date: '2023-10-02', status: 'active' },
  { id: '3', name: 'Search - Brand Terms', platform: 'Google', spend: 4500, impressions: 85000, reach: 62000, clicks: 12000, conversions: 350, revenue: 28000, date: '2023-10-03', status: 'active' },
  { id: '4', name: 'YouTube Remarketing', platform: 'Google', spend: 6200, impressions: 1200000, reach: 850000, clicks: 4200, conversions: 95, revenue: 8100, date: '2023-10-04', status: 'learning' },
  { id: '5', name: 'Retargeting - Catalog', platform: 'Meta', spend: 3200, impressions: 95000, reach: 45000, clicks: 4800, conversions: 210, revenue: 19500, date: '2023-10-05', status: 'active' },
  { id: '6', name: 'Performance Max - Ecom', platform: 'Google', spend: 15000, impressions: 1850000, reach: 1100000, clicks: 22000, conversions: 610, revenue: 54000, date: '2023-10-06', status: 'active' },
  { id: '7', name: 'Lead Gen - B2B', platform: 'Meta', spend: 2100, impressions: 45000, reach: 32000, clicks: 850, conversions: 25, revenue: 0, date: '2023-10-07', status: 'paused' },
];

export const generateDailyPerformance = (days: number): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const spend = 500 + Math.random() * 1000;
    const revenue = spend * (2.5 + Math.random() * 3);
    data.push({
      date: d.toISOString().split('T')[0],
      spend,
      revenue,
      roas: revenue / spend
    });
  }
  return data;
};
