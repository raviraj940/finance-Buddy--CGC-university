import React from 'react';
import { Bot, Sparkles, BookOpen, Layers, Calculator, ShieldCheck, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'stem3d' | 'diagrams' | 'calculator';
  setActiveTab: (tab: 'chat' | 'stem3d' | 'diagrams' | 'calculator') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity & Subtitle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                    Finance Buddy
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    CGC Mohali • 2026–27
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500">
                  Student Financial Assistance Advisor
                </p>
              </div>
            </div>
          </div>

          {/* Center / Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Advisor Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('stem3d')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'stem3d'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D STEM Canvas</span>
            </button>

            <button
              onClick={() => setActiveTab('diagrams')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'diagrams'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Diagrams</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Fee Calculator</span>
            </button>
          </div>

          {/* Right: Dataset Connected Status */}
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Dataset Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200/70 px-2 py-1.5 bg-slate-50/80 text-xs font-medium">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-2 py-1 rounded-md ${activeTab === 'chat' ? 'bg-white font-bold text-blue-700 shadow-xs' : 'text-slate-600'}`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('stem3d')}
          className={`px-2 py-1 rounded-md ${activeTab === 'stem3d' ? 'bg-white font-bold text-blue-700 shadow-xs' : 'text-slate-600'}`}
        >
          3D Canvas
        </button>
        <button
          onClick={() => setActiveTab('diagrams')}
          className={`px-2 py-1 rounded-md ${activeTab === 'diagrams' ? 'bg-white font-bold text-blue-700 shadow-xs' : 'text-slate-600'}`}
        >
          Diagrams
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2 py-1 rounded-md ${activeTab === 'calculator' ? 'bg-white font-bold text-blue-700 shadow-xs' : 'text-slate-600'}`}
        >
          Calculator
        </button>
      </div>
    </header>
  );
};
