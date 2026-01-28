
import React, { useState } from 'react';
import { Moon, Sun, ChevronDown, Globe, LayoutDashboard, BarChart3 } from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  language, 
  onLanguageChange, 
  currentView, 
  onViewChange 
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = translations[language];

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-[#0f172a] border-b border-gray-100 dark:border-slate-800 sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/10">
            <span className="font-black text-lg">RE</span>
          </div>
          <div className="hidden md:block">
            <h1 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight leading-none uppercase">{t.brand}</h1>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-[0.15em] mt-1">{t.assistant}</p>
          </div>
        </div>

        {/* Navigation Tabs - Moved to Top Nav Bar */}
        <nav className="flex items-center bg-gray-50 dark:bg-slate-900/50 p-1 rounded-xl border border-gray-100 dark:border-slate-800">
          <button 
            onClick={() => onViewChange('dashboard')}
            className={`flex items-center gap-2 px-6 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              currentView === 'dashboard' || currentView === 'review'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <LayoutDashboard size={14} />
            {language === 'ar' ? 'الطلبات' : 'Submissions'}
          </button>
          <button 
            onClick={() => onViewChange('analytics')}
            className={`flex items-center gap-2 px-6 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              currentView === 'analytics' 
                ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <BarChart3 size={14} />
            {t.analytics}
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all"
          >
            <Globe size={14} className="text-emerald-600" />
            <span className="uppercase">{language}</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showLangMenu && (
            <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-32 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50 animate-universal`}>
              <div className="p-1.5 space-y-1">
                <button 
                  onClick={() => { onLanguageChange('en'); setShowLangMenu(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${language === 'en' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                >
                  <span>ENGLISH</span>
                  <img src="https://flagcdn.com/us.svg" className="w-4 h-3 rounded-[2px]" alt="US" />
                </button>
                <button 
                  onClick={() => { onLanguageChange('ar'); setShowLangMenu(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${language === 'ar' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20' : 'text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                >
                  <span>العربية</span>
                  <img src="https://flagcdn.com/sa.svg" className="w-4 h-3 rounded-[2px]" alt="SA" />
                </button>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 dark:text-slate-400 transition-all"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-px h-6 bg-gray-100 dark:bg-slate-800 mx-2"></div>

        <button 
          onClick={() => setShowProfile(!showProfile)}
          className={`flex items-center gap-3 ${language === 'ar' ? 'pr-2 pl-1' : 'pl-2 pr-1'} py-1.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all`}
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 font-extrabold text-xs shadow-inner">
            YA
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
