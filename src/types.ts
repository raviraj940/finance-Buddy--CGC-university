export interface ChatMessage {
  id: string;
  sender: 'student' | 'buddy';
  timestamp: string;
  text: string;
  isError?: boolean;
  structured?: {
    programme?: string;
    fee?: string;
    scholarshipOrAid?: string;
    eligibility?: string[];
    calculation?: string;
    documents?: string[];
    source?: string;
    dataStatus?: string;
    isUnavailable?: boolean;
  };
}

export interface ProgrammeFee {
  code: string;
  name: string;
  department: string;
  isStem: boolean;
  durationYears: number;
  semesters: number;
  semesterFee: number;
  annualFee: number;
  examFeePerSem: number;
  refundableSecurity: number;
  eligibility: string;
  stemSpecialization?: string;
  labHighlights?: string[];
}

export interface ScholarshipSlab {
  id: string;
  type: 'CGCUET' | 'JEE_MAIN' | 'CUET' | 'ACADEMIC_12TH';
  bandName: string;
  minScore?: number;
  maxScore?: number;
  minRank?: number;
  maxRank?: number;
  minPercentile?: number;
  maxPercentile?: number;
  percentageWaiver: number;
  publishedAmountNote?: string;
  sourceSection: string;
  sourcePage: number;
}

export interface SpecialFinancialAid {
  category: string;
  concessionPercent: number;
  criteria: string;
  documentsRequired: string[];
  sourcePage: number;
}

export interface LoanScheme {
  name: string;
  authority: string;
  description: string;
  keyFeatures: string[];
  sourcePage: number;
}
