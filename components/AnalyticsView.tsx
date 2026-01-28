
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, Cell } from 'recharts';
import { Language } from '../types';
import { translations } from '../translations';
import { SECTORS, MOCK_SUBMISSIONS } from '../constants';
import { Clock, Shield, Target } from 'lucide-react';

interface AnalyticsViewProps {
  language: Language;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ language }) => {
  const t = translations[language];
  const [interval, setInterval] = useState<'Daily' | 'Monthly' | 'Annual'>('Monthly');

  // Compliance Data per Sector (Dynamic based on interval)
  const complianceData = useMemo(() => {
    const factor = interval === 'Daily' ? 0.85 : interval === 'Annual' ? 1.05 : 1.0;
    return SECTORS.map(sector => {
      const sectorSubmissions = MOCK_SUBMISSIONS.filter(s => s.sector === sector.id);
      const approved = sectorSubmissions.filter(s => s.status === 'Approved').length;
      const rate = sectorSubmissions.length > 0 ? Math.round((approved / sectorSubmissions.length) * 100) : 0;
      return {
        name: sector.label,
        compliance: Math.min(100, Math.round((rate + 15) * factor)), 
        amt: sectorSubmissions.length
      };
    });
  }, [interval]);

  // Resolution Time per Sector (Dynamic based on interval)
  const resolutionData = useMemo(() => {
    const factor = interval === 'Daily' ? 1.3 : interval === 'Annual' ? 0.8 : 1.0;
    const baseDays: Record<string, number> = { Drug: 12, Cosmetic: 5, Food: 8, Construction: 25, Chemical: 18, Electrical: 15, Mechanical: 20, Textile: 7 };
    return SECTORS.map(sector => ({
      subject: sector.label,
      A: Math.round((baseDays[sector.id] || 10) * factor),
      fullMark: 35
    }));
  }, [interval]);

  // Submissions over time (Changes drastically based on interval)
  const submissionsTimeline = useMemo(() => {
    let data = [];
    if (interval === 'Daily') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      data = days.map(d => ({
        name: d,
        count: 10 + Math.floor(Math.random() * 20),
        approvals: 6 + Math.floor(Math.random() * 12)
      }));
    } else if (interval === 'Annual') {
      const years = ['2022', '2023', '2024', '2025', '2026'];
      data = years.map(y => ({
        name: y,
        count: 500 + Math.floor(Math.random() * 250),
        approvals: 380 + Math.floor(Math.random() * 180)
      }));
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = months.map(m => ({
        name: m,
        count: 30 + Math.floor(Math.random() * 50),
        approvals: 22 + Math.floor(Math.random() * 35)
      }));
    }
    return data;
  }, [interval]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {entry.value}{entry.name === 'compliance' ? '%' : ''}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12 animate-universal">
      {/* Interval Picker - Re-styled for consistency */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-slate-800/50">
        <div className="text-start">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t.analytics}</h2>
          <p className="text-sm text-slate-500 font-bold mt-1 uppercase tracking-widest opacity-60">Insight Report • Real-time Data</p>
        </div>
        <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl shadow-inner border border-slate-100 dark:border-slate-800">
          {(['Daily', 'Monthly', 'Annual'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setInterval(opt)}
              className={`px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${interval === opt ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-md ring-1 ring-slate-100 dark:ring-slate-700' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              {t[opt.toLowerCase() as keyof typeof t] || opt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-50 dark:border-slate-800/50 flex flex-col hover-lift">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl text-emerald-600">
              <Shield size={24} />
            </div>
            <div className="text-start">
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none">{t.complianceDistribution}</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">Target Score: 95%</p>
            </div>
          </div>
          <div className="h-[350px] w-full chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#047857" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="compliance" radius={[8, 8, 0, 0]} barSize={28} fill="url(#barGradient)">
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={0.7 + (index * 0.05)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-50 dark:border-slate-800/50 flex flex-col hover-lift">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-2xl text-amber-600">
              <Clock size={24} />
            </div>
            <div className="text-start">
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none">{t.resolutionTimePerSector}</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">Unit: Mean Days</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={resolutionData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 40]} tick={false} axisLine={false} />
                <Radar name="Days" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} dot={{ r: 4, fill: '#f59e0b' }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-50 dark:border-slate-800/50 hover-lift">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600">
              <Target size={24} />
            </div>
            <div className="text-start">
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none">{t.submissionsOverTime}</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">Submission Inflow vs Verification Throughput</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Inflow</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/20"></div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Approvals</span>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={submissionsTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorCount)" />
              <Area type="monotone" dataKey="approvals" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorApps)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
