import React from 'react';
import {
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  HelpCircle,
  FileText,
  Calendar,
  Award,
  DollarSign,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  recentQuestions: string[];
  onSelectQuestion: (question: string) => void;
  onOpenSection: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onNewChat,
  recentQuestions,
  onSelectQuestion,
  onOpenSection,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-16 bottom-0 left-0 z-40 w-72 bg-slate-50/95 lg:bg-slate-50/70 border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-blue-700 font-semibold text-sm shadow-xs transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>New Chat</span>
          </button>

          {/* Recent Questions */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Recent Questions
              </span>
            </div>
            <div className="space-y-1">
              {recentQuestions.length > 0 ? (
                recentQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectQuestion(q);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className="w-full text-left flex items-center space-x-2 px-2.5 py-2 rounded-lg text-xs text-slate-700 hover:bg-white hover:text-blue-700 hover:shadow-xs transition-colors group"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                    <span className="truncate">{q}</span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 px-2.5 py-2 italic">
                  No questions asked yet in this session.
                </p>
              )}
            </div>
          </div>

          {/* Approved Dataset Explorer */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Approved Dataset Sections
              </span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectQuestion("What are the tuition fees?");
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Programme Fees (Pg 4)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  onSelectQuestion("What CGCUET scholarships are available?");
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>CGCUET Scholarships (Pg 8)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  onSelectQuestion("What are the JEE Main scholarships?");
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  <span>JEE Main Bands (Pg 10)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  onSelectQuestion("What education loan assistance is provided?");
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Education Loans (Pg 18)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  onSelectQuestion("What documents are required?");
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Documents Required (Pg 22)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  onSelectQuestion("What are the scholarship deadlines?");
                  if (window.innerWidth < 1024) onClose();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  <span>Dates & Deadlines (Pg 24)</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* How Finance Buddy Works Card */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>How Finance Buddy works</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Finance Buddy answers questions using the approved university financial assistance dataset.
            </p>
            <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span>Session:</span>
                <span className="font-semibold text-slate-700">2026–27</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Campus:</span>
                <span className="font-semibold text-slate-700">Mohali, Punjab</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicator at Bottom */}
        <div className="p-4 border-t border-slate-200/80 bg-white/70">
          <div className="flex items-start space-x-2 text-[11px] font-medium text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">
              Answers are based only on the approved Finance Buddy dataset.
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
