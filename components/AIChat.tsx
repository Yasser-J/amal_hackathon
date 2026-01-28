
import React, { useState, useEffect, useRef } from 'react';
import { Send, PanelRightClose, PanelRightOpen, MessageSquareText, Sparkles } from 'lucide-react';
import { ChatMessage, Language, Submission } from '../types';
import { getRegulatoryResponse } from '../geminiService';
import { MOCK_SUBMISSIONS } from '../constants';
import { translations } from '../translations';

interface AIChatProps {
  isFolded: boolean;
  onToggle: () => void;
  language: Language;
  activeContext: Submission | null;
}

const AIChat: React.FC<AIChatProps> = ({ isFolded, onToggle, language, activeContext }) => {
  const t = translations[language];
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: 'model',
        text: activeContext 
          ? `I'm now monitoring ${activeContext.reference}. I can explain the AI-Assessment or details for this specific product. ${t.amalGreeting}`
          : t.amalGreeting,
        timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language, t.amalGreeting, activeContext?.reference]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isFolded) scrollToBottom();
  }, [messages, isFolded]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getRegulatoryResponse(input, MOCK_SUBMISSIONS, activeContext);
      const botMessage: ChatMessage = {
        role: 'model',
        text: response,
        timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = activeContext 
    ? ["Clarify assessment", "Show timeline", "Check attachments"]
    : [t.quickStatus, t.quickHighRisk];

  if (isFolded) {
    return (
      <div className={`w-14 h-full bg-white dark:bg-[#0f172a] ${language === 'ar' ? 'border-r' : 'border-l'} border-gray-100 dark:border-slate-800 flex flex-col items-center py-6 transition-all`}>
        <button onClick={onToggle} className="p-3 rounded-2xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-8 shadow-sm">
          {language === 'ar' ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
        </button>
        <div className="flex-1 flex items-center justify-center">
          <span className={`${language === 'ar' ? '-rotate-90' : 'rotate-90'} whitespace-nowrap text-[11px] font-black text-slate-300 dark:text-slate-600 tracking-[0.2em] uppercase`}>
            {t.amalAssistant}
          </span>
        </div>
        <button onClick={onToggle} className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-900/20 hover:scale-110 transition-transform mt-auto mb-2">
          <MessageSquareText size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className={`w-85 lg:w-96 flex-shrink-0 bg-white dark:bg-[#0f172a] ${language === 'ar' ? 'border-r' : 'border-l'} border-gray-100 dark:border-slate-800 flex flex-col h-full overflow-hidden transition-all relative ${language === 'ar' ? 'font-arabic' : ''}`}>
      <div className="p-5 border-b border-gray-50 dark:border-slate-800 flex flex-col gap-2 bg-white dark:bg-[#0f172a] z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">{language === 'ar' ? 'أمل' : 'Amal Assistant'}</h3>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-wider">Expert Specialist</p>
            </div>
          </div>
          <button onClick={onToggle} className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-all">
            {language === 'ar' ? <PanelRightOpen size={18} /> : <PanelRightClose size={18}/>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-900/10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-universal`}>
            <div className={`max-w-[85%] rounded-[1.25rem] p-4 text-[13px] leading-relaxed shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] text-start ${
              msg.role === 'user' 
                ? 'bg-emerald-700 text-white ' + (language === 'ar' ? 'rounded-tl-none' : 'rounded-tr-none')
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 ' + (language === 'ar' ? 'rounded-tr-none' : 'rounded-tl-none') + ' border border-gray-50 dark:border-slate-700'
            }`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-2 mx-2 font-bold uppercase tracking-tighter opacity-70">{msg.timestamp}</span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2 animate-pulse">
            <div className={`p-4 bg-white dark:bg-slate-800 rounded-2xl ${language === 'ar' ? 'rounded-tr-none' : 'rounded-tl-none'} border border-gray-50 dark:border-slate-700 flex gap-1.5`}>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-white dark:bg-[#0f172a] border-t border-gray-50 dark:border-slate-800">
        <div className="flex flex-wrap gap-1.5 mb-5">
          {quickActions.map(action => (
            <button 
              key={action}
              onClick={() => setInput(action)}
              className="text-[10px] font-bold px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm"
            >
              {action}
            </button>
          ))}
        </div>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={t.askAnything}
            className={`w-full ${language === 'ar' ? 'pr-5 pl-12' : 'pl-5 pr-12'} py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[1.25rem] text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 resize-none max-h-32 transition-all dark:text-white`}
            rows={1}
          />
          <button onClick={handleSend} disabled={!input.trim() || isLoading} className={`absolute ${language === 'ar' ? 'left-2.5' : 'right-2.5'} bottom-2.5 p-2.5 rounded-xl transition-all ${input.trim() && !isLoading ? 'bg-emerald-700 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
            <Send size={16} className={language === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;