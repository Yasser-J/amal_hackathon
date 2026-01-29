
import React, { useState } from 'react';
import { Submission, Language, ReviewSubTab } from '../types';
import { translations } from '../translations';
import Badge from './Badge';
import { FileText, Image as ImageIcon, CheckCircle2, Circle, Clock, AlertTriangle, User, ClipboardCheck } from 'lucide-react';
import CompanyProfile from './CompanyProfile';

interface ProductReviewProps {
  submission: Submission;
  language: Language;
  onActionComplete: () => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({ submission, language, onActionComplete }) => {
  const t = translations[language];
  const [activeSubTab, setActiveSubTab] = useState<ReviewSubTab>('review');
  const [confirmState, setConfirmState] = useState<{ type: 'Approve' | 'Reject' | null }>({ type: null });

  const handleDecision = () => {
    setConfirmState({ type: null });
    onActionComplete();
  };

  return (
    <div className="space-y-8 animate-universal">
      {/* Sub-Tabs Selector for Review and Applicant Details */}
      <div className="flex items-center justify-center lg:justify-start">
        <div className="flex items-center bg-[var(--edix-surface-light-card)] dark:bg-[var(--edix-surface-dark-2)] p-1.5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <button 
            onClick={() => setActiveSubTab('review')}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeSubTab === 'review' 
                ? 'bg-[#00629D] text-white shadow-lg shadow-slate-900/30' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ClipboardCheck size={16} />
            {t.productReview}
          </button>
          <button 
            onClick={() => setActiveSubTab('applicant')}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeSubTab === 'applicant' 
                ? 'bg-[#00629D] text-white shadow-lg shadow-slate-900/30' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User size={16} />
            {language === 'ar' ? 'بيانات المتقدم' : 'Applicant Details'}
          </button>
        </div>
      </div>

      {activeSubTab === 'review' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[var(--edix-surface-light-card)] dark:bg-[var(--edix-surface-dark-2)] p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <Badge variant="success" className="mb-4 uppercase tracking-[0.2em] font-black">Ready for Validation</Badge>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    {language === 'ar' ? submission.productNameAr : submission.productNameEn}
                  </h2>
                  <p className="text-sm text-gray-400 font-bold mt-2 uppercase tracking-widest">Reference: {submission.reference} • Sector: {submission.sector}</p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.confidence}</span>
                  <span className={`text-4xl font-black ${submission.confidenceScore > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{submission.confidenceScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 py-10 border-y border-gray-50 dark:border-slate-800/50">
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">{t.manufacturer}</h4>
                  <p className="text-lg font-black text-gray-900 dark:text-slate-100">{submission.details?.manufacturer}</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">{t.origin}</h4>
                  <Badge variant="gray" className="px-4 py-1 text-sm font-bold">{submission.details?.origin}</Badge>
                </div>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Functional Description</h4>
                  <p className="text-[15px] text-gray-600 dark:text-slate-400 leading-relaxed bg-gray-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-inner">
                    {submission.details?.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">{t.aiJustification}</h4>
                  <p className="text-[15px] text-[#004A78] dark:text-[var(--edix-primary-soft)] leading-relaxed bg-[var(--edix-primary-surface)] dark:bg-[var(--edix-surface-dark-3)] p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 font-medium italic">
                    "{submission.details?.justification}"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--edix-surface-light-card)] dark:bg-[var(--edix-surface-dark-2)] p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <ImageIcon size={24} className="text-emerald-500" />
                {t.attachments}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {submission.details?.attachments.map((att, i) => (
                  <div key={i} className="group relative rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden aspect-square bg-gray-50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-6 hover:border-emerald-500 transition-all cursor-pointer shadow-sm hover:shadow-xl">
                    {att.type === 'image' ? (
                      <img src={att.url} alt={att.name} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-60 transition-opacity" />
                    ) : (
                      <FileText size={48} className="text-emerald-200 mb-3" />
                    )}
                    <span className="relative z-10 text-[11px] font-black text-gray-500 dark:text-slate-300 uppercase tracking-widest text-center">{att.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-[#1A1F2E] p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-10 flex items-center gap-3">
                <Clock size={24} className="text-[#00629D]" />
                {t.timeline}
              </h3>
              <div className="space-y-10 relative">
                <div className={`absolute ${language === 'ar' ? 'right-[15px]' : 'left-[15px]'} top-2 bottom-2 w-1 bg-gray-100 dark:bg-slate-800 rounded-full`}></div>
                {submission.details?.timeline.map((step, i) => (
                  <div key={i} className="flex items-start gap-6 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                      step.status === 'completed' ? 'bg-[#008766] text-white' : 
                      step.status === 'current' ? 'bg-white dark:bg-slate-800 border-4 border-[#00629D] text-[#00629D] scale-125' : 
                      'bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-gray-300'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-widest ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>{step.label}</p>
                      {step.date && <p className="text-[10px] font-bold text-gray-400 mt-2">{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 dark:bg-[var(--edix-surface-dark-3)] p-10 rounded-[2.5rem] shadow-2xl space-y-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-4 text-center">Validation Verdict</h4>
              <button 
                onClick={() => setConfirmState({ type: 'Approve' })}
                className="w-full py-4 bg-[#00629D] text-white text-[11px] font-black rounded-2xl shadow-xl shadow-slate-900/40 hover:bg-[#004A78] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
              >
                Approve Submission
              </button>
              <button 
                onClick={() => setConfirmState({ type: 'Reject' })}
                className="w-full py-4 bg-transparent border-2 border-rose-500/50 text-rose-500 text-[11px] font-black rounded-2xl hover:bg-rose-500 hover:text-white hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
              >
                Reject Submission
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CompanyProfile companyName={submission.applicant} language={language} />
      )}

      {confirmState.type && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-[var(--edix-surface-light-card)] dark:bg-[var(--edix-surface-dark-2)] w-full max-w-sm p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-400 text-center">
            <div className={`w-20 h-20 rounded-[2rem] mx-auto mb-8 flex items-center justify-center ${confirmState.type === 'Approve' ? 'bg-[var(--edix-primary-surface)] text-[#004A78]' : 'bg-rose-50 text-rose-500'}`}>
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">{t.confirmTitle}</h3>
            <p className="text-[13px] text-gray-500 dark:text-slate-400 mb-10 px-6 font-medium leading-relaxed">
              {confirmState.type === 'Approve' ? t.confirmApprove : t.confirmReject}
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleDecision}
                className={`w-full py-4 rounded-2xl text-white text-xs font-black shadow-xl transition-all uppercase tracking-widest ${confirmState.type === 'Approve' ? 'bg-[#00629D] shadow-slate-900/30 hover:bg-[#004A78]' : 'bg-rose-600 shadow-rose-500/30 hover:bg-rose-500'}`}
              >
                {t.yes}
              </button>
              <button 
                onClick={() => setConfirmState({ type: null })}
                className="w-full py-4 rounded-2xl text-gray-400 dark:text-slate-500 text-xs font-black hover:bg-gray-100 dark:hover:bg-slate-800 transition-all uppercase tracking-widest"
              >
                {t.no}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
