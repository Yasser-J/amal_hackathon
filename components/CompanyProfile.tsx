
import React, { useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { MOCK_SUBMISSIONS } from '../constants';
import { MapPin, Globe, ShieldCheck, Mail, Phone, Files, CheckCircle2, TrendingUp } from 'lucide-react';

interface CompanyProfileProps {
  companyName: string;
  language: Language;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ companyName, language }) => {
  const t = translations[language];

  const stats = useMemo(() => {
    const companySubmissions = MOCK_SUBMISSIONS.filter(s => s.applicant === companyName);
    const approved = companySubmissions.filter(s => s.status === 'Approved').length;
    const approvalRate = companySubmissions.length > 0 ? Math.round((approved / companySubmissions.length) * 100) : 0;
    
    return {
      total: companySubmissions.length,
      approvalRate: `${approvalRate}%`,
      compliance: companySubmissions.length > 0 ? '98.5%' : '0%'
    };
  }, [companyName]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Performance Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500">
              <Files size={20} />
            </div>
            <div className="text-start">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.totalSubmissions}</p>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mt-1">{stats.total}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
              <CheckCircle2 size={20} />
            </div>
            <div className="text-start">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.approvalRate}</p>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mt-1">{stats.approvalRate}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1A1F2E] p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-500">
              <TrendingUp size={20} />
            </div>
            <div className="text-start">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.complianceScore}</p>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mt-1">{stats.compliance}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1F2E] p-10 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm text-start">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="w-24 h-24 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-3xl font-black shadow-xl">
            {companyName.charAt(0)}
          </div>
          <div className="text-center md:text-start flex-1">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{companyName}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <span className="flex items-center gap-1 text-xs text-gray-500 font-bold uppercase tracking-tight">
                <MapPin size={14} className="text-emerald-500" />
                Regional Headquarters
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500 font-bold uppercase tracking-tight">
                <ShieldCheck size={14} className="text-emerald-500" />
                Verified Active Entity
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-emerald-500 transition-colors"><Mail size={20}/></button>
            <button className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-emerald-500 transition-colors"><Phone size={20}/></button>
            <button className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-emerald-500 transition-colors"><Globe size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-50 dark:border-slate-800/50">
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Registration Details</h4>
            <ul className="space-y-4 text-xs">
              <li className="flex justify-between font-medium">
                <span className="text-gray-500">License Number</span>
                <span className="text-gray-900 dark:text-white">LIC-SA-2022-9912</span>
              </li>
              <li className="flex justify-between font-medium">
                <span className="text-gray-500">Established</span>
                <span className="text-gray-900 dark:text-white">1985</span>
              </li>
              <li className="flex justify-between font-medium">
                <span className="text-gray-500">Legal Structure</span>
                <span className="text-gray-900 dark:text-white">Public Joint Stock</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Organization Overview</h4>
            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
              {companyName} is a major strategic partner in the regional supply chain. They maintain sophisticated manufacturing hubs and adhere to international GxP standards. Their ongoing collaboration with government entities has ensured a consistent record of safety and high-standard product distribution across the Middle East.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
