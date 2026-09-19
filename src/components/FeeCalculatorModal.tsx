import React, { useState } from 'react';
import {
  PROGRAMMES_DATASET,
  CGCUET_SCHOLARSHIPS,
  JEE_MAIN_SCHOLARSHIPS,
  CUET_SCHOLARSHIPS,
  ACADEMIC_MERIT_SCHOLARSHIPS
} from '../data/cgcFinancialDataset';
import { Calculator, X, Check, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

interface FeeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChat: (text: string) => void;
}

export const FeeCalculatorModal: React.FC<FeeCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSendToChat,
}) => {
  const [selectedProgCode, setSelectedProgCode] = useState<string>('MCA_DS');
  const [scholarshipMode, setScholarshipMode] = useState<'CGCUET' | 'JEE_MAIN' | 'CUET' | 'ACADEMIC_12TH'>('CGCUET');
  const [scoreInput, setScoreInput] = useState<string>('91');

  if (!isOpen) return null;

  const programme = PROGRAMMES_DATASET.find(p => p.code === selectedProgCode) || PROGRAMMES_DATASET[0];
  const numVal = parseFloat(scoreInput) || 0;

  // Find matching band
  let matchedBand = null;
  let waiverPercent = 0;

  if (scholarshipMode === 'CGCUET') {
    matchedBand = CGCUET_SCHOLARSHIPS.find(
      s => numVal >= (s.minScore ?? 0) && numVal <= (s.maxScore ?? 100)
    );
  } else if (scholarshipMode === 'JEE_MAIN') {
    matchedBand = JEE_MAIN_SCHOLARSHIPS.find(
      s => numVal >= (s.minRank ?? 0) && numVal <= (s.maxRank ?? 150000)
    );
  } else if (scholarshipMode === 'CUET') {
    matchedBand = CUET_SCHOLARSHIPS.find(
      s => numVal >= (s.minPercentile ?? 0) && numVal <= (s.maxPercentile ?? 100)
    );
  } else if (scholarshipMode === 'ACADEMIC_12TH') {
    matchedBand = ACADEMIC_MERIT_SCHOLARSHIPS.find(
      s => numVal >= (s.minScore ?? 0) && numVal <= (s.maxScore ?? 100)
    );
  }

  if (matchedBand) {
    waiverPercent = matchedBand.percentageWaiver;
  }

  const semTuition = programme.semesterFee;
  const scholarshipAmt = (semTuition * waiverPercent) / 100;
  const remainingTuition = semTuition - scholarshipAmt;
  const examFee = programme.examFeePerSem;
  const securityDeposit = programme.refundableSecurity;
  const firstSemTotal = remainingTuition + examFee + securityDeposit;

  const formattedCalculation = `Programme: ${programme.name}\n` +
    `Fee: ₹${programme.semesterFee.toLocaleString('en-IN')} per semester (Annual Tuition: ₹${programme.annualFee.toLocaleString('en-IN')})\n` +
    `Scholarship/Aid: ${waiverPercent}% (${matchedBand ? matchedBand.bandName : 'No scholarship qualifying band'})\n` +
    `Calculation:\n` +
    `Semester Tuition Fee: ₹${semTuition.toLocaleString('en-IN')}\n` +
    `Scholarship (${waiverPercent}%): -₹${scholarshipAmt.toLocaleString('en-IN')}\n` +
    `Remaining Semester Tuition: ₹${remainingTuition.toLocaleString('en-IN')}\n` +
    `Examination Fee (per sem): ₹${examFee.toLocaleString('en-IN')}\n` +
    `Refundable Security Deposit (one-time): ₹${securityDeposit.toLocaleString('en-IN')}\n` +
    `Total Net Payable (First Semester): ₹${firstSemTotal.toLocaleString('en-IN')}\n` +
    `Calculated using the approved dataset.\n` +
    `Source: Programme Fee Dataset & Scholarship Dataset\n` +
    `Data Status: Available in approved dataset`;

  const handleSend = () => {
    onSendToChat(`I want ${programme.name} and my ${scholarshipMode} is ${numVal}. What is my fee calculation?`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Fee & Scholarship Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Academic Session 2026–27 Documented Calculations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Programme Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select Programme
          </label>
          <select
            value={selectedProgCode}
            onChange={(e) => setSelectedProgCode(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          >
            {PROGRAMMES_DATASET.map(p => (
              <option key={p.code} value={p.code}>
                {p.name} — ₹{p.semesterFee.toLocaleString('en-IN')}/sem
              </option>
            ))}
          </select>
        </div>

        {/* Qualifying Examination Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Qualifying Score / Rank Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'CGCUET', label: 'CGCUET Score' },
              { id: 'JEE_MAIN', label: 'JEE Main Rank' },
              { id: 'CUET', label: 'CUET Percentile' },
              { id: 'ACADEMIC_12TH', label: '12th / Grad %' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScholarshipMode(item.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                  scholarshipMode === item.id
                    ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Score / Rank Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            {scholarshipMode === 'JEE_MAIN' ? 'All India Rank (e.g., 24000)' : 'Score / Percentage (e.g., 91)'}
          </label>
          <input
            type="number"
            value={scoreInput}
            onChange={(e) => setScoreInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="Enter value"
          />
        </div>

        {/* Calculation Result Breakdown Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs font-mono">
          <div className="flex justify-between font-sans text-slate-700 font-semibold">
            <span>Documented Semester Tuition:</span>
            <span>₹{semTuition.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-sans text-blue-700 font-bold">
            <span>Scholarship Waiver ({waiverPercent}%):</span>
            <span>-₹{scholarshipAmt.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-sans text-slate-600">
            <span>Net Semester Tuition:</span>
            <span>₹{remainingTuition.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-sans text-slate-600">
            <span>Examination Fee (per sem):</span>
            <span>₹{examFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-sans text-slate-600">
            <span>Refundable Caution Deposit:</span>
            <span>₹{securityDeposit.toLocaleString('en-IN')}</span>
          </div>
          <div className="border-t border-slate-300 pt-2 flex justify-between font-sans text-sm font-bold text-slate-900">
            <span>Net First Semester Payable:</span>
            <span className="text-emerald-700">₹{firstSemTotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="pt-1 font-sans text-[11px] text-slate-500 italic">
            Calculated using the approved dataset.
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs active:scale-98 transition-all"
          >
            <span>Ask Finance Buddy to Verify</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
