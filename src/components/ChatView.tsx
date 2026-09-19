import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  HelpCircle,
  Calculator,
  Calendar,
  FileText,
  DollarSign,
  Award,
  ListCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatViewProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onRetry: () => void;
  onOpenCalculator: () => void;
}

const QUICK_QUESTIONS = [
  { icon: Award, label: "Find scholarships", text: "What scholarships can I get?" },
  { icon: DollarSign, label: "What are the fees?", text: "What are the tuition fees for B.Tech CSE and MCA?" },
  { icon: ListCheck, label: "Check eligibility", text: "What are the programme eligibility criteria?" },
  { icon: FileText, label: "Required documents", text: "What documents are required for admission and scholarships?" },
  { icon: Calendar, label: "Scholarship deadlines", text: "What are the scholarship deadlines for 2026–27?" },
  { icon: Calculator, label: "Calculate my remaining fee", text: "I want MCA Data Science and my CGCUET score is 91. What is my fee?" },
];

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onRetry,
  onOpenCalculator,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputMessage.trim() || isLoading) return;
    onSendMessage(inputMessage);
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 overflow-hidden relative">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome Banner (shown if first or only message is greeting) */}
        {messages.length <= 1 && (
          <div className="max-w-3xl mx-auto mb-6 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
                <Bot className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Hello! I'm Finance Buddy.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  I can help you find information about scholarships, fees, eligibility, financial assistance, and other information available in the approved university dataset.
                </p>
                <p className="text-sm font-semibold text-blue-700 pt-1">
                  What would you like to know?
                </p>
              </div>
            </div>

            {/* Quick Question Buttons */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                Quick Questions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {QUICK_QUESTIONS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => onSendMessage(item.text)}
                      className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-left text-xs font-semibold text-slate-700 hover:text-blue-700 transition-all shadow-2xs hover:shadow-xs active:scale-[0.98]"
                    >
                      <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Message Stream */}
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((msg) => {
            const isStudent = msg.sender === 'student';

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  isStudent ? 'justify-end' : 'justify-start'
                }`}
              >
                {!isStudent && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative group max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3.5 text-sm leading-relaxed transition-all ${
                    isStudent
                      ? 'bg-blue-600 text-white shadow-xs rounded-tr-xs'
                      : msg.isError
                      ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-xs'
                      : 'bg-white border border-slate-200/90 text-slate-800 shadow-xs rounded-tl-xs'
                  }`}
                >
                  {/* Student Message */}
                  {isStudent && (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}

                  {/* Finance Buddy Message */}
                  {!isStudent && !msg.isError && (
                    <div className="space-y-3">
                      {/* Body text with styled headers if raw formatted */}
                      <div className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed text-slate-800">
                        {msg.text}
                      </div>

                      {/* Structured breakdown card if available */}
                      {msg.structured && !msg.structured.isUnavailable && (
                        <div className="mt-3 pt-3 border-t border-slate-100/90 space-y-2 text-xs">
                          {msg.structured.programme && (
                            <div className="flex items-start space-x-2">
                              <span className="font-bold text-slate-600 min-w-[80px]">Programme:</span>
                              <span className="font-semibold text-slate-900">{msg.structured.programme}</span>
                            </div>
                          )}

                          {msg.structured.fee && (
                            <div className="flex items-start space-x-2">
                              <span className="font-bold text-slate-600 min-w-[80px]">Fee:</span>
                              <span className="font-semibold text-emerald-700">{msg.structured.fee}</span>
                            </div>
                          )}

                          {msg.structured.scholarshipOrAid && (
                            <div className="flex items-start space-x-2">
                              <span className="font-bold text-slate-600 min-w-[80px]">Scholarship/Aid:</span>
                              <span className="font-semibold text-blue-700">{msg.structured.scholarshipOrAid}</span>
                            </div>
                          )}

                          {msg.structured.eligibility && msg.structured.eligibility.length > 0 && (
                            <div className="flex items-start space-x-2">
                              <span className="font-bold text-slate-600 min-w-[80px]">Eligibility:</span>
                              <div className="space-y-0.5 text-slate-700">
                                {msg.structured.eligibility.map((el, i) => (
                                  <p key={i}>• {el}</p>
                                ))}
                              </div>
                            </div>
                          )}

                          {msg.structured.calculation && (
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-[11px] text-slate-800">
                              <span className="font-bold block text-slate-700 mb-1 font-sans">Fee Calculation:</span>
                              <pre className="whitespace-pre-wrap">{msg.structured.calculation}</pre>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Document Source Transparency Badge */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <div className="flex items-center space-x-1.5 text-slate-500">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-semibold text-slate-700">
                            {msg.structured?.source || "Source: Finance Buddy Dataset (Session 2026–27)"}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {msg.structured?.dataStatus || "Verified Institutional Data"}
                          </span>

                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="inline-flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition-colors"
                            title="Copy answer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {msg.isError && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-rose-800 font-medium">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Finance Buddy is temporarily unable to respond. Please try again.</span>
                      </div>
                      <button
                        onClick={onRetry}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shadow-2xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </button>
                    </div>
                  )}
                </div>

                {isStudent && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 shadow-xs shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking / Loading State */}
          {isLoading && (
            <div className="flex items-start space-x-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center space-x-3">
                <span className="text-xs font-medium text-slate-600">
                  Finance Buddy is checking the approved dataset...
                </span>
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Trust & Knowledge Banner */}
      <div className="bg-slate-100/70 border-t border-slate-200/60 py-1.5 px-4 text-center">
        <p className="text-[11px] font-medium text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 inline-block text-emerald-600 mr-1 -mt-0.5" />
          Answers are based only on the approved Finance Buddy dataset for Academic Session 2026–27
        </p>
      </div>

      {/* Fixed Chat Input */}
      <div className="bg-white border-t border-slate-200/80 p-3 sm:p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl shadow-inner focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Finance Buddy anything about scholarships, fees or financial assistance..."
              rows={1}
              className="w-full pl-4 pr-24 py-3 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-none max-h-32"
            />
            <div className="absolute right-2 flex items-center space-x-1">
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-xl text-white font-semibold transition-all ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-xs active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed text-slate-100'
                }`}
                title="Send Message (Enter)"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-400">
            <span>Press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">Shift+Enter</kbd> for new line</span>
            <button
              onClick={onOpenCalculator}
              className="hidden sm:inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
            >
              <Calculator className="w-3 h-3" />
              <span>Direct Fee Calculator</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
