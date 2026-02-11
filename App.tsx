
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import ChartsSection from './components/ChartsSection';
import CampaignTable from './components/CampaignTable';
import AIInsightsPanel from './components/AIInsightsPanel';
import { BrainCircuit } from 'lucide-react';
import { mockCampaigns, generateDailyPerformance } from './mockData';
import { Platform, AggregatedMetrics } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [platform, setPlatform] = useState<Platform>('All');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Derived state
  const filteredCampaigns = useMemo(() => {
    if (platform === 'All') return mockCampaigns;
    return mockCampaigns.filter(c => c.platform === platform);
  }, [platform]);

  const performanceData = useMemo(() => generateDailyPerformance(30), []);

  const aggregatedMetrics = useMemo((): AggregatedMetrics => {
    const totals = filteredCampaigns.reduce((acc, c) => ({
      spend: acc.spend + c.spend,
      revenue: acc.revenue + c.revenue,
      conversions: acc.conversions + c.conversions,
      clicks: acc.clicks + c.clicks,
      impressions: acc.impressions + c.impressions
    }), { spend: 0, revenue: 0, conversions: 0, clicks: 0, impressions: 0 });

    return {
      totalSpend: totals.spend,
      totalRevenue: totals.revenue,
      totalConversions: totals.conversions,
      avgROAS: totals.spend > 0 ? totals.revenue / totals.spend : 0,
      avgCPA: totals.conversions > 0 ? totals.spend / totals.conversions : 0,
      avgCTR: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
      avgCPC: totals.clicks > 0 ? totals.spend / totals.clicks : 0,
    };
  }, [filteredCampaigns]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 min-w-0">
        <TopBar 
          platform={platform} 
          setPlatform={setPlatform} 
          dateRange={dateRange} 
          setDateRange={setDateRange}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <div className="p-8">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Overview</h2>
                  <p className="text-slate-500">Summary of your account performance across all platforms.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    API Connected: Facebook
                  </div>
                  <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    API Connected: Google
                  </div>
                </div>
              </div>

              <KPICards metrics={aggregatedMetrics} />
              
              <div className="mb-8">
                <AIInsightsPanel campaigns={filteredCampaigns} />
              </div>

              <ChartsSection 
                performanceData={performanceData} 
                campaigns={filteredCampaigns} 
              />

              <CampaignTable campaigns={filteredCampaigns} />
            </>
          )}

          {activeTab === 'campaigns' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Campaign Manager</h2>
                <p className="text-slate-500">Manage budgets, status, and tracking for all active campaigns.</p>
              </div>
              <CampaignTable campaigns={filteredCampaigns} />
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Strategy Lab</h2>
                <p className="text-slate-500">Deep dive into AI-generated media buying strategies.</p>
              </div>
              <AIInsightsPanel campaigns={filteredCampaigns} />
            </div>
          )}

          {(activeTab === 'accounts' || activeTab === 'reports') && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
               <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
                 {/* Fixed missing import for BrainCircuit icon */}
                 <BrainCircuit className="w-10 h-10 text-slate-300" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Feature coming soon</h3>
               <p className="max-w-md text-center">We're building advanced multi-account management and custom reporting tools to help you scale even faster.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
