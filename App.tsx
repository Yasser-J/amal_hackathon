
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import SubmissionsTable from './components/SubmissionsTable';
import AIChat from './components/AIChat';
import ProductReview from './components/ProductReview';
import AnalyticsView from './components/AnalyticsView';
import { ChevronDown, Calendar, Filter, ArrowLeft } from 'lucide-react';
import { TimeFilter, Language, Sector, AppView, Submission } from './types';
import { translations } from './translations';
import { SECTORS } from './constants';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('All Time');
  const [sectorFilter, setSectorFilter] = useState<Sector | 'All'>('All');
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isChatFolded, setIsChatFolded] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const handleReview = (sub: Submission) => {
    setSelectedSubmission(sub);
    setCurrentView('review');
  };

  return (
    <div className={`flex h-screen bg-[#f8fafc] dark:bg-[#020617] overflow-hidden transition-colors duration-500 ${language === 'ar' ? 'font-arabic' : ''}`}>
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
          language={language}
          onLanguageChange={setLanguage}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            
            {currentView === 'dashboard' ? (
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-end gap-5">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="flex items-center gap-3 px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-all hover:border-emerald-500/50">
                        <Calendar size={18} className="text-emerald-500 shrink-0" />
                        <select 
                          value={timeFilter}
                          onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                          className="bg-transparent text-[11px] font-black uppercase tracking-widest dark:text-slate-300 focus:outline-none appearance-none px-2 cursor-pointer"
                        >
                          {['Today', 'Last Week', 'Last Month', 'Last Year', 'All Time'].map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="flex items-center gap-3 px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-all hover:border-emerald-500/50">
                        <Filter size={18} className="text-emerald-500 shrink-0" />
                        <select 
                          value={sectorFilter}
                          onChange={(e) => setSectorFilter(e.target.value as Sector | 'All')}
                          className="bg-transparent text-[11px] font-black uppercase tracking-widest dark:text-slate-300 focus:outline-none appearance-none px-2 cursor-pointer"
                        >
                          <option value="All">{t.allSectors}</option>
                          {SECTORS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <KPICards timeFilter={timeFilter} sectorFilter={sectorFilter} language={language} />
                <SubmissionsTable 
                  sectorFilter={sectorFilter} 
                  language={language} 
                  onReviewClick={handleReview}
                />
              </div>
            ) : currentView === 'analytics' ? (
              <AnalyticsView language={language} />
            ) : currentView === 'review' && selectedSubmission ? (
              <div className="space-y-8">
                <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-600 transition-all group">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                    <ArrowLeft size={18} />
                  </div>
                  {t.back}
                </button>
                <ProductReview 
                  submission={selectedSubmission} 
                  language={language} 
                  onActionComplete={() => setCurrentView('dashboard')}
                />
              </div>
            ) : null}
          </div>
        </main>
      </div>

      <AIChat 
        isFolded={isChatFolded} 
        onToggle={() => setIsChatFolded(!isChatFolded)} 
        language={language}
        activeContext={currentView === 'review' ? selectedSubmission : null}
      />
    </div>
  );
};

export default App;
