
import React from 'react';
import { LayoutDashboard, FileText, ClipboardCheck, BarChart3, Users, Settings, HelpCircle, ShieldCheck } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <FileText size={20} />, label: 'All Submissions', active: false },
    { icon: <ClipboardCheck size={20} />, label: 'My Reviews', active: false },
    { icon: <BarChart3 size={20} />, label: 'Analytics', active: false },
    { icon: <Users size={20} />, label: 'Organizations', active: false },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col h-full bg-[var(--edix-surface-dark-1)] text-slate-300 border-r border-slate-800 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#00629D] p-2 rounded-lg text-white">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight">Regulatory Expert</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">AI-Powered Specialist</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              item.active 
                ? 'bg-[#00629D]/20 text-[var(--edix-primary-soft)] border border-[#00629D]/40' 
                : 'hover:bg-[var(--edix-surface-dark-2)] hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--edix-surface-dark-2)] hover:text-white transition-colors">
          <Settings size={20} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-[var(--edix-surface-dark-2)] hover:text-white transition-colors">
          <HelpCircle size={20} />
          Help & Docs
        </button>
      </div>

      <div className="p-6 text-center border-t border-slate-800">
        <p className="text-[10px] text-slate-600 font-medium">Regulatory Expert v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
