import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Award,
  DollarSign,
  FileText,
  Landmark,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import {
  PROGRAMMES_DATASET,
  CGCUET_SCHOLARSHIPS,
  JEE_MAIN_SCHOLARSHIPS,
  LOAN_SCHEMES,
  REQUIRED_DOCUMENTS
} from '../data/cgcFinancialDataset';

interface FinancialDiagramViewProps {
  onAskQuestion: (query: string) => void;
}

export const FinancialDiagramView: React.FC<FinancialDiagramViewProps> = ({ onAskQuestion }) => {
  const [activeDiagram, setActiveDiagram] = useState<'pipeline' | 'feeStack' | 'loans'>('pipeline');
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const PIPELINE_STEPS = [
    {
      step: 1,
      title: "Score & Rank Evaluation",
      category: "Entrance / Merit Qualifying",
      description: "Student takes CGCUET or qualifies through national entrance examinations (JEE Main / CUET) or 10+2 / Graduation board scores.",
      details: [
        "CGCUET (93%+ for 100%, 90–92.99% for 85%, etc.)",
        "JEE Main All India Rank for B.Tech (Rank 1–25k for 100%)",
        "CUET Percentile (95%+ for 100%)",
        "Merit in Qualifying Exam (95%+ for 50%)"
      ],
      source: "Scholarship Dataset — Pages 8–12",
      promptToAsk: "How do CGCUET and JEE Main scholarship bands work?"
    },
    {
      step: 2,
      title: "Document Verification",
      category: "Institutional Scrutiny",
      description: "University verification desk verifies authentic marksheets, scorecards, category certificates, or special concessions.",
      details: [
        "Entrance examination official scorecard",
        "10th & 12th authentic passing certificates",
        "State/central income certificate (if need-based)",
        "Armed forces / PwD / Single Girl Child affidavits (if applicable)"
      ],
      source: "Supporting Document Dataset — Page 22",
      promptToAsk: "What documents are required for scholarship verification?"
    },
    {
      step: 3,
      title: "Calculated Fee Deduction",
      category: "Documented Institutional Waiver",
      description: "The percentage waiver is applied solely to the Semester Tuition Fee. Mandatory exam fee and refundable caution deposit remain separate.",
      details: [
        "Tuition Waiver = Documented Fee × Slab %",
        "Net Tuition = Documented Fee − Waiver",
        "Examination Fee (₹2,000–₹2,500) added",
        "Refundable Caution Deposit (₹5,000) added in 1st semester"
      ],
      source: "Fee Calculation Rules (Section 10)",
      promptToAsk: "Calculate my remaining fee for B.Tech CSE with 91% in CGCUET"
    },
    {
      step: 4,
      title: "Loan & Disbursement Assistance",
      category: "Financial Support & Banking",
      description: "For remaining payable balance, students can avail university loan desk assistance, PM-Vidyalaxmi, or Vidya Lakshmi portal integration.",
      details: [
        "University bonafide fee estimate certificate issued",
        "Application through Vidya Lakshmi / PM-Vidyalaxmi",
        "West Bengal Student Credit Card (WBSCC) processing up to ₹10 Lakh",
        "Direct university fee disbursement"
      ],
      source: "Education Loan Dataset — Page 18",
      promptToAsk: "How does PM-Vidyalaxmi and Vidya Lakshmi loan assistance work?"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/60 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Banner */}
      <div className="max-w-5xl mx-auto w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Financial Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Financial & STEM Scholarship Pathways
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Interactive diagrams mapping institutional fee breakdowns, scholarship workflows, and educational credit mechanisms grounded in the approved 2026–27 dataset.
          </p>
        </div>

        {/* Diagram Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
          <button
            onClick={() => setActiveDiagram('pipeline')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeDiagram === 'pipeline'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Aid Pipeline
          </button>
          <button
            onClick={() => setActiveDiagram('feeStack')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeDiagram === 'feeStack'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fee Stack
          </button>
          <button
            onClick={() => setActiveDiagram('loans')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeDiagram === 'loans'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Loan Channels
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="max-w-5xl mx-auto w-full">
        {/* DIAGRAM 1: 4-Step Pipeline */}
        {activeDiagram === 'pipeline' && (
          <div className="space-y-6">
            {/* Interactive Step Cards Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PIPELINE_STEPS.map((item, idx) => {
                const isSelected = selectedStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedStep(idx)}
                    className={`p-4 rounded-xl text-left border transition-all relative ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 shadow-sm ring-2 ring-blue-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.step}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.category}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Step Detailed Inspection Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Step {PIPELINE_STEPS[selectedStep].step} Detailed Institutional Flow
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {PIPELINE_STEPS[selectedStep].title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {PIPELINE_STEPS[selectedStep].source}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {PIPELINE_STEPS[selectedStep].description}
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Documented Provisions & Criteria:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PIPELINE_STEPS[selectedStep].details.map((d, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 italic">
                  Grounded in CGC University Academic Session 2026–27 Rules.
                </span>
                <button
                  onClick={() => onAskQuestion(PIPELINE_STEPS[selectedStep].promptToAsk)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-98"
                >
                  <span>Ask Finance Buddy about this step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DIAGRAM 2: Fee Structure Decomposition Stack */}
        {activeDiagram === 'feeStack' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Institutional Fee Structure Decomposition
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Visualizing how institutional charges are segmented according to university policy. Only Tuition Fee is eligible for scholarships.
              </p>
            </div>

            {/* Visual Stack Layers */}
            <div className="space-y-3">
              {/* Layer 1: Tuition Fee */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">
                      Component A
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Semester Tuition Fee (₹40,000 – ₹78,000)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    Primary academic instruction & laboratory charge. Fully eligible for up to 100% scholarship reduction.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                    Scholarship Eligible (25% – 100%)
                  </span>
                </div>
              </div>

              {/* Layer 2: Examination Fee */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-600 text-white uppercase">
                      Component B
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Semester Examination Fee (₹2,000 – ₹2,500)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    Documented university examination evaluation & controller fee per semester. Billed separately.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-slate-600">
                    Fixed Mandatory Fee
                  </span>
                </div>
              </div>

              {/* Layer 3: Caution Security Deposit */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white uppercase">
                      Component C
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Refundable Security Deposit (₹5,000)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    One-time institutional caution deposit payable during initial admission. 100% refundable upon course completion.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-amber-800">
                    100% Refundable
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onAskQuestion("What are the tuition fees and additional charges?")}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
              >
                <span>Ask about Programme Fees in Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* DIAGRAM 3: Loan & Credit Pathways */}
        {activeDiagram === 'loans' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Documented Education Credit & Loan Architecture
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                University institutional desk and government-approved portal schemes for student financial assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LOAN_SCHEMES.map((scheme, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {scheme.authority}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {scheme.name}
                      </h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 font-semibold text-slate-700">
                      Pg {scheme.sourcePage}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="space-y-1 pt-1 border-t border-slate-200/60">
                    {scheme.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onAskQuestion(`Explain how ${scheme.name} works for CGC University students.`)}
                    className="w-full text-center py-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-semibold text-blue-700 transition-colors"
                  >
                    Ask about {scheme.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
