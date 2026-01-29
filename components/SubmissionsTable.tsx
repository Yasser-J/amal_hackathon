
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, Download, Send } from 'lucide-react';
import { MOCK_SUBMISSIONS, SECTORS } from '../constants';
import { Sector, Status, Submission, Language } from '../types';
import Badge from './Badge';
import { translations } from '../translations';

interface SubmissionsTableProps {
  language: Language;
  sectorFilter: Sector | 'All';
  onReviewClick: (submission: Submission) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ language, sectorFilter, onReviewClick }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const itemsPerPage = 10;

  const t = translations[language];

  const filteredData = useMemo(() => {
    const filtered = MOCK_SUBMISSIONS.filter(item => {
      const matchesSearch = 
        item.reference.toLowerCase().includes(search.toLowerCase()) ||
        item.productNameEn.toLowerCase().includes(search.toLowerCase()) ||
        item.productNameAr.includes(search) ||
        item.applicant.toLowerCase().includes(search.toLowerCase());
      const matchesSector = sectorFilter === 'All' || item.sector === sectorFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesSector && matchesStatus;
    });
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search, sectorFilter, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusLabel = (status: Status) => {
    if (language === 'ar') {
      if (status === 'Review Required') return t.statusReview;
      if (status === 'Approved') return t.statusApproved;
      if (status === 'Rejected') return t.statusRejected;
    }
    return status;
  };

  const getStatusBadgeVariant = (status: Status) => {
    switch (status) {
      case 'Review Required': return 'warning';
      case 'Approved': return 'success';
      case 'Rejected': return 'danger';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-[var(--edix-surface-light-card)] dark:bg-[var(--edix-surface-dark-2)] rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col border border-gray-50 dark:border-slate-800 transition-all animate-universal">
      <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-start">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.submissionsQueue}</h2>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{t.manageSubmissions}</p>
          </div>
          <div className="flex items-center gap-3 relative">
            <span className="text-xs font-bold text-[#004A78] bg-[var(--edix-primary-surface)] dark:bg-[var(--edix-surface-dark-3)] px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">
              {filteredData.length} {t.results.toLowerCase()}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowExportMenu(!showExportMenu); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
            >
              <Download size={14} />
              {t.export}
            </button>
            {showExportMenu && (
              <div className={`absolute top-full mt-2 ${language === 'ar' ? 'left-0' : 'right-0'} w-36 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50 animate-universal`}>
                <div className="p-1.5 space-y-1">
                  <p className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.downloadAs}</p>
                  {['XLSX', 'CSV', 'PDF'].map(fmt => (
                    <button key={fmt} onClick={() => setShowExportMenu(false)} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all">{fmt}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[320px] relative">
            <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full ${language === 'ar' ? 'pr-12 pl-6' : 'pl-12 pr-6'} py-3.5 bg-[var(--edix-primary-surface)] dark:bg-[var(--edix-surface-dark-3)] border border-slate-100 dark:border-slate-700 rounded-2xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00629D]/30 focus:border-[#00629D] text-slate-900 dark:text-white transition-all`}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | 'All')}
            className="px-4 py-3.5 bg-[var(--edix-primary-surface)] dark:bg-[var(--edix-surface-dark-3)] border border-slate-100 dark:border-slate-700 rounded-2xl text-[13px] font-bold text-slate-700 dark:text-slate-100 focus:outline-none cursor-pointer"
          >
            <option value="All">{t.allStatus}</option>
            <option value="Review Required">{t.statusReview}</option>
            <option value="Approved">{t.statusApproved}</option>
            <option value="Rejected">{t.statusRejected}</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full text-start border-collapse ${language === 'ar' ? 'font-arabic' : ''}`}>
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/30 text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              <th className="px-8 py-5 text-start">{t.reference}</th>
              <th className="px-8 py-5 text-start">{t.date}</th>
              <th className="px-8 py-5 text-start">{t.sector}</th>
              <th className="px-8 py-5 text-start">{t.productName}</th>
              <th className="px-8 py-5 text-start">{t.applicant}</th>
              <th className="px-8 py-5 text-start">{t.aiAssessment}</th>
              <th className="px-8 py-5 text-start">{t.confidence}</th>
              <th className="px-8 py-5 text-start">{t.action}</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
            {paginatedData.map((item) => (
              <tr 
                key={item.id}
                onClick={() => onReviewClick(item)}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-all cursor-pointer group"
              >
                <td className="px-8 py-6 text-start text-sm font-bold text-slate-900 dark:text-white">#{item.reference}</td>
                <td className="px-8 py-6 text-start text-[12px] font-bold text-slate-500">{item.date}</td>
                <td className="px-8 py-6 text-start">
                  <span className="text-[13px] font-bold text-slate-900 dark:text-white">
                    {SECTORS.find(s => s.id === item.sector)?.label}
                  </span>
                </td>
                <td className="px-8 py-6 text-start">
                  <span className="text-[13px] font-bold text-slate-900 dark:text-white line-clamp-1">{language === 'ar' ? item.productNameAr : item.productNameEn}</span>
                </td>
                <td className="px-8 py-6 text-start">
                  {/* Just normal themed text without any special background or pill */}
                  <span className="text-[13px] font-bold text-slate-900 dark:text-white">
                    {item.applicant}
                  </span>
                </td>
                <td className="px-8 py-6 text-start">
                  <Badge variant={getStatusBadgeVariant(item.status)}>{getStatusLabel(item.status)}</Badge>
                </td>
                <td className="px-8 py-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 w-14 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full transition-all duration-700 ${item.confidenceScore > 90 ? 'bg-[#008766]' : item.confidenceScore > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.confidenceScore}%` }}></div>
                    </div>
                    <span className="text-[11px] font-black text-slate-500">{item.confidenceScore}%</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-start">
                  <button 
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#00629D] text-white rounded-xl text-[11px] font-black shadow-lg shadow-slate-900/20 hover:bg-[#004A78] transition-all uppercase tracking-widest"
                  >
                    <Send size={12} />
                    {t.submit}
                  </button>
                </td>
                <td className="px-8 py-6 text-center">
                  <ChevronRight size={20} className={`text-slate-300 group-hover:text-[#00629D] transition-all duration-300 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-8 border-t border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          {t.showing} <span className="text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> {t.to} <span className="text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> {t.of} <span className="text-slate-900 dark:text-white">{filteredData.length}</span> {t.results}
        </p>
        
        <div className="flex items-center gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} className={`px-4 py-2.5 rounded-xl border border-gray-100 dark:border-slate-800 text-xs font-bold transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
            {language === 'ar' ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)} 
                className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === i + 1 ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} className={`px-4 py-2.5 rounded-xl border border-gray-100 dark:border-slate-800 text-xs font-bold transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed text-slate-400' : 'text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
            {language === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsTable;
