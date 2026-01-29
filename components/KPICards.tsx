
import React, { useMemo } from 'react';
import { Files, Clock, CheckCircle2, Timer, ShieldCheck } from 'lucide-react';
import { TimeFilter, Language, Sector } from '../types';
import { translations } from '../translations';
import { MOCK_SUBMISSIONS } from '../constants';

interface KPICardsProps {
  timeFilter: TimeFilter;
  sectorFilter: Sector | 'All';
  language: Language;
}

const KPICards: React.FC<KPICardsProps> = ({ timeFilter, sectorFilter, language }) => {
  const t = translations[language];

  const stats = useMemo(() => {
    const filtered = MOCK_SUBMISSIONS.filter(s => {
      const matchesSector = sectorFilter === 'All' || s.sector === sectorFilter;
      const itemDate = new Date(s.date);
      const now = new Date(2026, 0, 31);
      
      let matchesTime = true;
      if (timeFilter === 'Today') {
        matchesTime = itemDate.getDate() === now.getDate();
      } else if (timeFilter === 'Last Week') {
        const diff = (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
        matchesTime = diff <= 7;
      } else if (timeFilter === 'Last Month') {
        matchesTime = itemDate.getMonth() === now.getMonth();
      }
      return matchesSector && matchesTime;
    });

    const total = filtered.length;
    const reviewsRequired = filtered.filter(s => s.status === 'Review Required').length;
    
    // Approval rate fixed at 76% as per user request
    const approvalRate = "76%";
    
    const baseCompliance = 88;
    const complianceShift = sectorFilter === 'All' ? 0 : (total % 5);
    const compliance = Math.min(99, baseCompliance + complianceShift);

    return {
      total,
      reviewsRequired,
      approvalRate,
      compliance: `${compliance}%`,
      avgTime: language === 'ar' ? '٤أ ٠س' : '4d 0h'
    };
  }, [timeFilter, sectorFilter, language]);

  const kpis = [
    { 
      label: t.totalSubmissions, 
      value: stats.total, 
      icon: <Files size={22} />, 
      color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' 
    },
    { 
      label: t.reviewsRequired, 
      value: stats.reviewsRequired, 
      icon: <Clock size={22} />, 
      color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' 
    },
    { 
      label: t.approvalRate, 
      value: stats.approvalRate, 
      icon: <CheckCircle2 size={22} />, 
      color: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' 
    },
    { 
      label: t.avgResolutionTime, 
      value: stats.avgTime, 
      icon: <Timer size={22} />, 
      color: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' 
    },
    { 
      label: t.complianceScore, 
      value: stats.compliance, 
      icon: <ShieldCheck size={22} />, 
      color: 'text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10' 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-[var(--edix-surface-light-card)] dark:bg-[var(--edix-surface-dark-2)] px-4 py-4 rounded-2xl shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-slate-500/20 hover-lift"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${kpi.color} group-hover:scale-110 transition-transform duration-300`}>
              {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 18 })}
            </div>
          </div>
          <div className="text-start space-y-1">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
              {kpi.value}
            </h3>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.18em]">
              {kpi.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
