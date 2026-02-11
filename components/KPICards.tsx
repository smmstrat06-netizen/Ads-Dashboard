
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, MousePointer2, ShoppingCart } from 'lucide-react';
import { AggregatedMetrics } from '../types';

interface KPICardsProps {
  metrics: AggregatedMetrics;
}

const KPICard = ({ title, value, change, isPositive, icon: Icon, unit = '' }: { title: string, value: string, change: string, isPositive: boolean, icon: any, unit?: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
        <Icon className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{unit}{value}</h3>
    </div>
  </div>
);

const KPICards: React.FC<KPICardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KPICard 
        title="Total Spend" 
        value={metrics.totalSpend.toLocaleString()} 
        unit="$"
        change="+12.5%" 
        isPositive={false} 
        icon={DollarSign} 
      />
      <KPICard 
        title="Revenue" 
        value={metrics.totalRevenue.toLocaleString()} 
        unit="$"
        change="+24.2%" 
        isPositive={true} 
        icon={ShoppingCart} 
      />
      <KPICard 
        title="Avg ROAS" 
        value={metrics.avgROAS.toFixed(2)} 
        unit="x"
        change="+8.4%" 
        isPositive={true} 
        icon={Target} 
      />
      <KPICard 
        title="Conversions" 
        value={metrics.totalConversions.toLocaleString()} 
        change="+15.1%" 
        isPositive={true} 
        icon={MousePointer2} 
      />
    </div>
  );
};

export default KPICards;
