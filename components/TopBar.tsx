
import React from 'react';
import { Search, Bell, RefreshCcw, Calendar, ChevronDown } from 'lucide-react';
import { Platform } from '../types';

interface TopBarProps {
  platform: Platform;
  setPlatform: (p: Platform) => void;
  dateRange: string;
  setDateRange: (d: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ platform, setPlatform, dateRange, setDateRange, onRefresh, isRefreshing }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search campaigns, metrics, ads..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPlatform('All')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${platform === 'All' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            All
          </button>
          <button 
            onClick={() => setPlatform('Meta')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${platform === 'Meta' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Meta
          </button>
          <button 
            onClick={() => setPlatform('Google')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${platform === 'Google' ? 'bg-green-600 text-white shadow-lg shadow-green-600/10' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Google
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{dateRange}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl hidden group-hover:block z-50">
            {['Last 7 days', 'Last 30 days', 'Month to date', 'Custom'].map(range => (
              <button 
                key={range} 
                onClick={() => setDateRange(range)}
                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onRefresh}
          className={`p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCcw className="w-5 h-5 text-slate-500" />
        </button>

        <button className="p-2 relative bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
