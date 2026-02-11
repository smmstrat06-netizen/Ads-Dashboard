
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, BrainCircuit, AlertCircle, TrendingUp, Zap, Loader2, MessageSquare } from 'lucide-react';
import { CampaignMetric, ChatMessage } from '../types';
import { analyzeAdsData, chatWithAIExpert } from '../geminiService';

interface AIInsightsPanelProps {
  campaigns: CampaignMetric[];
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ campaigns }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeAdsData(campaigns);
    setAnalysis(result || '');
    setIsAnalyzing(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setChatHistory(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const response = await chatWithAIExpert([...chatHistory, userMsg], campaigns);
    setChatHistory(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsTyping(false);
  };

  useEffect(() => {
    generateAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
        {/* Background Sparkles Simulation */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">AI Ads Expert Analysis</h2>
              <p className="text-slate-400 text-sm">Real-time performance audit and optimization strategy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setChatOpen(!chatOpen)}
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Ask AI Agent
            </button>
            <button 
              onClick={generateAnalysis}
              disabled={isAnalyzing}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
              Refresh Insights
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 relative z-10">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
              <div className="relative">
                <BrainCircuit className="w-12 h-12 text-blue-500 animate-pulse" />
                <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse"></div>
              </div>
              <p className="text-lg animate-pulse">AI Agent is auditing your campaigns...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed">
                    {analysis || "Click 'Refresh Insights' to start auditing your account performance."}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" /> Quick Wins
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Reallocate $1,200 from underperforming Google PMax to Meta US Summer Sale.",
                        "Increase target CPA on Brand Terms by 10% to capture high-intent traffic.",
                        "Refresh creatives for 'Retargeting - Catalog' - frequency reaching 3.5."
                      ].map((win, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs bg-slate-700/30 p-3 rounded-xl border border-white/5">
                          <span className="flex-shrink-0 w-5 h-5 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-full font-bold">{i+1}</span>
                          <span className="text-slate-300">{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Chat Interface */}
      {chatOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-[100] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">AI Media Buyer</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <Zap className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {chatHistory.length === 0 && (
              <div className="text-center py-10 px-6">
                <BrainCircuit className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h4 className="text-slate-900 font-bold mb-2">How can I help you grow today?</h4>
                <p className="text-slate-500 text-sm">Ask about ROAS drops, CPA optimization, or platform comparisons.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["Why is ROAS down?", "Which campaign to scale?", "Meta vs Google?"].map(q => (
                    <button 
                      key={q} 
                      onClick={() => {
                        setInputValue(q);
                      }}
                      className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10 rounded-br-none' 
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
            <div className="relative group">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message your AI Expert..." 
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors disabled:bg-slate-300 shadow-lg shadow-blue-600/10"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPanel;
