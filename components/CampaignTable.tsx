
import React from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { CampaignMetric } from '../types';

interface CampaignTableProps {
  campaigns: CampaignMetric[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const handleExportCSV = () => {
    // Define headers
    const headers = [
      'Campaign Name',
      'Platform',
      'Status',
      'Spend ($)',
      'Impressions',
      'Reach',
      'Clicks',
      'Conversions',
      'Revenue ($)',
      'ROAS',
      'CPA ($)'
    ];

    // Map campaign data to rows
    const rows = campaigns.map(c => {
      const roas = c.spend > 0 ? (c.revenue / c.spend).toFixed(2) : '0.00';
      const cpa = c.conversions > 0 ? (c.spend / c.conversions).toFixed(2) : '0.00';
      
      return [
        `"${c.name.replace(/"/g, '""')}"`, // Escape quotes and wrap in quotes for CSV safety
        c.platform,
        c.status,
        c.spend,
        c.impressions,
        c.reach,
        c.clicks,
        c.conversions,
        c.revenue,
        roas,
        cpa
      ].join(',');
    });

    // Combine headers and rows
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const timestamp = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `adpulse_export_${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Campaign Performance Breakdown</h3>
        <button 
          onClick={handleExportCSV}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-all"
        >
          Export CSV <ExternalLink className="w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Campaign Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Spend</th>
              <th className="px-6 py-4">ROAS</th>
              <th className="px-6 py-4">CPA</th>
              <th className="px-6 py-4">Conv.</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {campaigns.map((c) => {
              const roas = c.spend > 0 ? (c.revenue / c.spend).toFixed(2) : '0.00';
              const cpa = c.conversions > 0 ? (c.spend / c.conversions).toFixed(2) : '0.00';
              
              return (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${c.platform === 'Meta' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        {c.platform === 'Meta' ? 'FB' : 'GO'}
                      </div>
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      c.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
                      c.status === 'learning' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">${c.spend.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                      {roas}x
                      {parseFloat(roas) > 3 ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-rose-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">${cpa}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{c.conversions}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
