
import React from 'react';
import { LayoutDashboard, Target, Users, BarChart3, Settings, BrainCircuit, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'accounts', label: 'Ad Accounts', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'ai-insights', label: 'AI Insights', icon: BrainCircuit },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 z-50 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">AdPulse AI</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <div className="mt-4 flex items-center gap-3 px-4 py-2">
          <img src="https://picsum.photos/32/32" alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">John Media</span>
            <span className="text-xs text-slate-500">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
