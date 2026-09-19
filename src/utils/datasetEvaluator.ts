import {
  PROGRAMMES_DATASET,
  CGCUET_SCHOLARSHIPS,
  JEE_MAIN_SCHOLARSHIPS,
  CUET_SCHOLARSHIPS,
  ACADEMIC_MERIT_SCHOLARSHIPS,
  SPECIAL_FINANCIAL_AID,
  LOAN_SCHEMES,
  GOVERNMENT_SCHEMES,
  REQUIRED_DOCUMENTS,
  DEADLINES_AND_DATES,
  UNAVAILABLE_INFORMATION_RESPONSE,
} from '../data/cgcFinancialDataset';
import { ChatMessage } from '../types';

export interface EvaluationResult {
  text: string;
  structured?: ChatMessage['structured'];
}

export function evaluateDatasetQuery(rawQuery: string): EvaluationResult {
  const query = rawQuery.trim().toLowerCase();

  // 1. Check out of scope or general world knowledge questions
  const outOfScopePatterns = [
    'weather', 'president', 'capital of', 'recipe', 'movie', 'football match',
    'who won', 'cricket', 'lyrics', 'joke', 'poem', 'write a story', 'translate to french',
    'hostel fee', 'mess fee', 'bus fee', 'transport fee', 'uniform charge', 'prospectus fee'
  ];

  if (outOfScopePatterns.some(p => query.includes(p))) {
    return {
      text: UNAVAILABLE_INFORMATION_RESPONSE,
      structured: {
        isUnavailable: true,
        source: "Institutional Knowledge Boundary Rule (Section 14 & 23)",
        dataStatus: "Not Available in approved dataset"
      }
    };
  }

  // 2. Check for other academic sessions (e.g., 2024-25, 2025-26, 2027-28)
  if (
    (query.includes('2024') || query.includes('2025') || query.includes('2027') || query.includes('2028')) &&
    !query.includes('2026')
  ) {
    return {
      text: UNAVAILABLE_INFORMATION_RESPONSE,
      structured: {
        isUnavailable: true,
        source: "Date Control Dataset (Academic Session 2026–27 Only)",
        dataStatus: "Not Available for requested session"
      }
    };
  }

  // 3. Scholarship combination rule
  if (
    (query.includes('combine') || query.includes('both') || query.includes('together') || query.includes('combined')) &&
    query.includes('scholarship')
  ) {
    return {
      text: "The approved dataset does not specify whether these scholarships can be combined.\n\nUnder CGC University institutional policy, students may be considered for the single highest applicable scholarship category based on verified credentials.\n\nSource: Scholarship Regulations — Section 8\nData Status: Available in approved dataset",
      structured: {
        scholarshipOrAid: "Single highest applicable scholarship",
        source: "Scholarship Combination Rule — Section 8",
        dataStatus: "Available in approved dataset"
      }
    };
  }

  // 4. Personalized guidance: e.g. "I want MCA Data Science and my CGCUET score is 91"
  const isMcaDs = query.includes('mca') && (query.includes('data science') || query.includes('ds'));
  const scoreMatch = query.match(/(?:cgcuet|score|marks|cgc uet|got)\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i);
  const percentMatch = query.match(/(\d+(?:\.\d+)?)\s*%/);
  const scoreVal = scoreMatch ? parseFloat(scoreMatch[1]) : (percentMatch ? parseFloat(percentMatch[1]) : null);

  if (isMcaDs && scoreVal !== null) {
    const prog = PROGRAMMES_DATASET.find(p => p.code === 'MCA_DS')!;
    // Match slab
    const slab = CGCUET_SCHOLARSHIPS.find(s => scoreVal >= (s.minScore ?? 0) && scoreVal <= (s.maxScore ?? 100));

    if (slab) {
      const semFee = prog.semesterFee;
      const scholarshipAmt = (semFee * slab.percentageWaiver) / 100;
      const remainingSemFee = semFee - scholarshipAmt;
      const totalFirstSemPayable = remainingSemFee + prog.examFeePerSem + prog.refundableSecurity;

      const calcText = `Semester Tuition Fee: ₹${semFee.toLocaleString('en-IN')}\n` +
        `Scholarship Percentage (${slab.percentageWaiver}%): ₹${scholarshipAmt.toLocaleString('en-IN')}\n` +
        `Remaining Semester Tuition Fee: ₹${remainingSemFee.toLocaleString('en-IN')}\n` +
        `Documented Exam Fee (per sem): ₹${prog.examFeePerSem.toLocaleString('en-IN')}\n` +
        `Refundable Security Deposit (one-time): ₹${prog.refundableSecurity.toLocaleString('en-IN')}\n` +
        `Total Net Payable (First Semester): ₹${totalFirstSemPayable.toLocaleString('en-IN')}\n` +
        `Calculated using the approved dataset.`;

      const responseText = `Programme:\n${prog.name}\n\n` +
        `Fee:\n₹${prog.semesterFee.toLocaleString('en-IN')} per semester (Annual Tuition: ₹${prog.annualFee.toLocaleString('en-IN')}). Exam fee: ₹${prog.examFeePerSem.toLocaleString('en-IN')} per semester. Refundable security deposit: ₹${prog.refundableSecurity.toLocaleString('en-IN')}.\n\n` +
        `Scholarship/Aid:\nCGCUET Score ${scoreVal} qualifies for ${slab.percentageWaiver}% scholarship (${slab.bandName}).\n\n` +
        `Eligibility:\n${prog.eligibility}\n\n` +
        `Calculation:\n${calcText}\n\n` +
        `Documents:\nEntrance exam scorecard, 10th & 12th marksheets, Bachelor's degree marksheets, Aadhaar card, Character certificate, Passport photos.\n\n` +
        `Source:\nCGCUET Scholarship Dataset — Page 8 & Programme Fee Dataset — Page 4\n\n` +
        `Data Status:\nAvailable in approved dataset`;

      return {
        text: responseText,
        structured: {
          programme: prog.name,
          fee: `₹${prog.semesterFee.toLocaleString('en-IN')} / semester`,
          scholarshipOrAid: `${slab.percentageWaiver}% Tuition Fee Scholarship (${slab.bandName})`,
          eligibility: [prog.eligibility],
          calculation: calcText,
          documents: ["Entrance exam scorecard", "10th & 12th marksheets", "Graduation marksheets", "Aadhaar Card", "Character Certificate"],
          source: "CGCUET Scholarship Dataset — Page 8 & Programme Fee Dataset — Page 4",
          dataStatus: "Available in approved dataset"
        }
      };
    }
  }

  // 5. General "What scholarship can I get?" without required details
  if (
    query === 'what scholarship can i get?' ||
    query === 'what scholarships can i get' ||
    query === 'find scholarships' ||
    (query.includes('what scholarship') && !scoreVal && !query.includes('jee') && !query.includes('cuet') && !query.includes('b.tech') && !query.includes('mca'))
  ) {
    return {
      text: "Sure. I can check the scholarship information available in my approved dataset.\n\nPlease provide:\n1. Your programme/course (e.g., B.Tech CSE, MCA Data Science, BCA)\n2. Your academic percentage or CGPA (in 10+2 or Graduation)\n3. Your CGCUET score, JEE Main rank, or CUET percentile, if applicable.\n\nOnce you provide these details, I will match them directly with documented scholarship bands in the approved dataset for Academic Session 2026–27.",
      structured: {
        source: "Scholarship Guidance Workflow (Rule 6)",
        dataStatus: "Awaiting Student Input"
      }
    };
  }

  // 6. Programme Fee queries (e.g., "What are the fees?")
  if (query.includes('fee') || query.includes('tuition') || query.includes('cost')) {
    // Check specific programme
    const matchedProg = PROGRAMMES_DATASET.find(p =>
      query.includes(p.name.toLowerCase()) ||
      query.includes(p.code.toLowerCase()) ||
      (p.code === 'BTECH_CSE' && (query.includes('cse') || query.includes('computer science'))) ||
      (p.code === 'BTECH_AIML' && (query.includes('aiml') || query.includes('ai & ml') || query.includes('machine learning'))) ||
      (p.code === 'BTECH_DS' && (query.includes('data science') && query.includes('b.tech'))) ||
      (p.code === 'BTECH_CYBER' && query.includes('cyber')) ||
      (p.code === 'BTECH_MECH' && (query.includes('mechanical') || query.includes('mech'))) ||
      (p.code === 'BTECH_ECE' && (query.includes('ece') || query.includes('electronics'))) ||
      (p.code === 'BTECH_BIOTECH' && query.includes('biotech')) ||
      (p.code === 'MCA_DS' && query.includes('mca') && query.includes('data science')) ||
      (p.code === 'MCA_GEN' && query.includes('mca') && !query.includes('data science')) ||
      (p.code === 'BCA' && query.includes('bca')) ||
      (p.code === 'BBA' && query.includes('bba')) ||
      (p.code === 'MBA' && query.includes('mba')) ||
      (p.code === 'BPHARM' && query.includes('pharm'))
    );

    if (matchedProg) {
      return {
        text: `Programme:\n${matchedProg.name}\n\n` +
          `Fee:\nSemester Tuition Fee: ₹${matchedProg.semesterFee.toLocaleString('en-IN')}\nAnnual Tuition Fee: ₹${matchedProg.annualFee.toLocaleString('en-IN')}\nExamination Fee: ₹${matchedProg.examFeePerSem.toLocaleString('en-IN')} per semester\nRefundable Security Deposit: ₹${matchedProg.refundableSecurity.toLocaleString('en-IN')} (One-time, refundable at completion)\n\n` +
          `Eligibility:\n${matchedProg.eligibility}\n\n` +
          `Source:\nProgramme Fee Dataset — Page 4\n\n` +
          `Data Status:\nAvailable in approved dataset`,
        structured: {
          programme: matchedProg.name,
          fee: `₹${matchedProg.semesterFee.toLocaleString('en-IN')} / semester (Annual: ₹${matchedProg.annualFee.toLocaleString('en-IN')})`,
          eligibility: [matchedProg.eligibility],
          source: "Programme Fee Dataset — Page 4",
          dataStatus: "Available in approved dataset"
        }
      };
    } else {
      // General fee summary from dataset
      return {
        text: `Based on the approved Programme Fee Dataset (Session 2026–27), published fees for major academic tracks are:\n\n` +
          `• B.Tech CSE / AI & ML / Data Science / Cyber Security: ₹75,000 – ₹78,000 / semester\n` +
          `• B.Tech Mechanical / ECE / Civil / Biotech: ₹60,000 – ₹65,000 / semester\n` +
          `• MCA Data Science: ₹55,000 / semester | MCA General: ₹52,000 / semester\n` +
          `• BCA: ₹45,000 / semester\n` +
          `• BBA: ₹46,000 / semester | MBA: ₹70,000 / semester\n` +
          `• B.Pharm: ₹65,000 / semester\n\n` +
          `Documented additional charges: Examination fee ₹2,000 – ₹2,500/semester; Refundable Security Deposit ₹5,000.\n\n` +
          `Which programme would you like the detailed breakdown for?\n\n` +
          `Source: Programme Fee Dataset — Page 4\nData Status: Available in approved dataset`,
        structured: {
          fee: "Documented programme fee range: ₹40,000 – ₹78,000 per semester",
          source: "Programme Fee Dataset — Page 4",
          dataStatus: "Available in approved dataset"
        }
      };
    }
  }

  // 7. Check eligibility questions
  if (query.includes('eligibility') || query.includes('eligible') || query.includes('criteria') || query.includes('requirement')) {
    const matchedProg = PROGRAMMES_DATASET.find(p =>
      query.includes(p.name.toLowerCase()) ||
      query.includes(p.code.toLowerCase()) ||
      (p.code === 'BTECH_CSE' && (query.includes('cse') || query.includes('b.tech') || query.includes('computer science'))) ||
      (p.code === 'MCA_DS' && query.includes('mca')) ||
      (p.code === 'BCA' && query.includes('bca')) ||
      (p.code === 'BBA' && query.includes('bba')) ||
      (p.code === 'MBA' && query.includes('mba'))
    );

    if (matchedProg) {
      return {
        text: `Programme:\n${matchedProg.name}\n\n` +
          `Eligibility:\n${matchedProg.eligibility}\n\n` +
          `Fee:\n₹${matchedProg.semesterFee.toLocaleString('en-IN')} per semester\n\n` +
          `Source:\nProgramme Eligibility Dataset — Page 4\n\n` +
          `Data Status:\nAvailable in approved dataset`,
        structured: {
          programme: matchedProg.name,
          eligibility: [matchedProg.eligibility],
          source: "Programme Eligibility Dataset — Page 4",
          dataStatus: "Available in approved dataset"
        }
      };
    } else {
      return {
        text: `According to the approved dataset, eligibility criteria depend on your programme:\n\n` +
          `• B.Tech Programmes: Passed 10+2 with Physics & Mathematics + Chemistry/CS/Biotech with minimum 50% marks (45% for reserved category).\n` +
          `• MCA Data Science: BCA or Bachelor Degree in CSE, or B.Sc./B.Com./B.A. with Mathematics at 10+2 or Graduation level with at least 50% marks (45% reserved).\n` +
          `• BCA / BBA: Passed 10+2 in any stream with at least 50% marks.\n` +
          `• MBA: Passed 3-year Bachelor degree with at least 50% marks (45% reserved).\n\n` +
          `Please specify your programme to view exact documented eligibility requirements.\n\n` +
          `Source: Programme Eligibility Dataset — Page 4\nData Status: Available in approved dataset`,
        structured: {
          eligibility: [
            "B.Tech: 10+2 PCM min 50% (45% reserved)",
            "MCA: BCA / Graduation with Maths min 50% (45% reserved)",
            "BCA / BBA: 10+2 min 50%"
          ],
          source: "Programme Eligibility Dataset — Page 4",
          dataStatus: "Available in approved dataset"
        }
      };
    }
  }

  // 8. Documents required
  if (query.includes('document') || query.includes('documents') || query.includes('certificate') || query.includes('paper')) {
    return {
      text: `Based on the approved Supporting Document Dataset (Academic Session 2026–27), the documented documents are:\n\n` +
        `General Admission Verification Documents:\n` +
        REQUIRED_DOCUMENTS.generalAdmission.map(d => `• ${d}`).join('\n') +
        `\n\nScholarship & Financial Aid Verification Documents:\n` +
        REQUIRED_DOCUMENTS.scholarshipAndAid.map(d => `• ${d}`).join('\n') +
        `\n\nSource: Supporting Document Dataset — Page 22\nData Status: Available in approved dataset`,
      structured: {
        documents: [...REQUIRED_DOCUMENTS.generalAdmission, ...REQUIRED_DOCUMENTS.scholarshipAndAid],
        source: "Supporting Document Dataset — Page 22",
        dataStatus: "Available in approved dataset"
      }
    };
  }

  // 9. Deadlines
  if (query.includes('deadline') || query.includes('last date') || query.includes('date') || query.includes('schedule')) {
    return {
      text: `Approved Academic Session: ${DEADLINES_AND_DATES.academicSession}\n\n` +
        `Documented Admission & Scholarship Schedule:\n` +
        `• CGCUET Round 1 Closing Date: ${DEADLINES_AND_DATES.cgcUetRound1Close}\n` +
        `• CGCUET Round 2 Closing Date: ${DEADLINES_AND_DATES.cgcUetRound2Close}\n` +
        `• Merit Scholarship Verification Deadline: ${DEADLINES_AND_DATES.meritScholarshipVerificationDeadline}\n` +
        `• Mandatory Document Submission Closing: ${DEADLINES_AND_DATES.documentSubmissionClosingDate}\n\n` +
        `Source: Admission & Financial Calendar Dataset — Page 24\nData Status: Available in approved dataset`,
      structured: {
        source: "Admission & Financial Calendar Dataset — Page 24",
        dataStatus: "Available in approved dataset"
      }
    };
  }

  // 10. Education Loans & Financial Aid
  if (query.includes('loan') || query.includes('vidyalaxmi') || query.includes('vidya lakshmi') || query.includes('credit card') || query.includes('wbscc')) {
    return {
      text: `According to the approved Education Loan Dataset (Page 18), CGC University assists students through documented schemes:\n\n` +
        `1. University Education-Loan Assistance Cell: On-campus cell provides verified institutional fee structure bonafide certificates and liaison support for bank applications.\n\n` +
        `2. PM-Vidyalaxmi: Government of India initiative facilitating collateral-free education credit through scheduled commercial banks for higher education.\n\n` +
        `3. Vidya Lakshmi Portal: Unified portal (NSDL e-Governance / MoE) providing single-window common loan application (CELAF) across 40+ scheduled banks.\n\n` +
        `4. West Bengal Student Credit Card (WBSCC): Facilitates soft education credit up to ₹10 Lakh for eligible domicile students of West Bengal admitted to CGC University.\n\n` +
        `*Note: Loan approval, interest rates, and disbursement terms are subject to lending bank regulations and are not guaranteed by Finance Buddy.\n\n` +
        `Source: Education Loan Dataset — Page 18\nData Status: Available in approved dataset`,
      structured: {
        scholarshipOrAid: "PM-Vidyalaxmi, Vidya Lakshmi, WBSCC, University Loan Desk",
        source: "Education Loan Dataset — Page 18",
        dataStatus: "Available in approved dataset"
      }
    };
  }

  // 11. Government schemes
  if (query.includes('government') || query.includes('gov') || query.includes('nsp') || query.includes('pragati') || query.includes('saksham')) {
    return {
      text: `The approved Government Scholarship Dataset (Page 20) lists the following government financial aid schemes for enrolled students:\n\n` +
        GOVERNMENT_SCHEMES.map(s => `• ${s.name} (${s.authority})\n  ${s.description}`).join('\n\n') +
        `\n\n*Note: Applications are processed via the respective government portals (e.g., NSP / AICTE). Finance Buddy provides documented institutional support details.\n\n` +
        `Source: Government Scholarship Dataset — Page 20\nData Status: Available in approved dataset`,
      structured: {
        scholarshipOrAid: GOVERNMENT_SCHEMES.map(s => s.name).join(', '),
        source: "Government Scholarship Dataset — Page 20",
        dataStatus: "Available in approved dataset"
      }
    };
  }

  // 12. Special Financial Aid categories
  if (query.includes('defence') || query.includes('girl child') || query.includes('pwd') || query.includes('disability') || query.includes('sibling') || query.includes('sports')) {
    return {
      text: `Documented University Financial-Aid Categories (Academic Session 2026–27):\n\n` +
        SPECIAL_FINANCIAL_AID.map(a => `• ${a.category}: ${a.concessionPercent}% tuition fee concession.\n  Criteria: ${a.criteria}\n  Required Documents: ${a.documentsRequired.join(', ')}`).join('\n\n') +
        `\n\nSource: University Financial-Aid Dataset — Page 14\nData Status: Available in approved dataset`,
      structured: {
        scholarshipOrAid: SPECIAL_FINANCIAL_AID.map(a => `${a.category}: ${a.concessionPercent}%`).join(', '),
        source: "University Financial-Aid Dataset — Page 14",
        dataStatus: "Available in approved dataset"
      }
    };
  }

  // 13. CGCUET / JEE / CUET scholarships detail
  if (query.includes('cgcuet') || query.includes('cgc uet') || query.includes('jee') || query.includes('cuet')) {
    return {
      text: `Documented Entrance Scholarship Bands (Academic Session 2026–27):\n\n` +
        `1. CGCUET Scholarship Bands:\n` +
        CGCUET_SCHOLARSHIPS.map(s => `  • ${s.bandName}: ${s.percentageWaiver}% Tuition Fee Waiver`).join('\n') +
        `\n\n2. JEE Main Rank Bands (B.Tech):\n` +
        JEE_MAIN_SCHOLARSHIPS.map(s => `  • ${s.bandName}: ${s.percentageWaiver}% Tuition Fee Waiver`).join('\n') +
        `\n\n3. CUET Percentile Bands:\n` +
        CUET_SCHOLARSHIPS.map(s => `  • ${s.bandName}: ${s.percentageWaiver}% Tuition Fee Waiver`).join('\n') +
        `\n\nSource: Entrance Exam Scholarship Datasets — Pages 8, 10, 11\nData Status: Available in approved dataset`,
      structured: {
        scholarshipOrAid: "CGCUET (25%–100%), JEE Main (15%–100%), CUET (25%–100%)",
        source: "Entrance Exam Scholarship Datasets — Pages 8, 10, 11",
        dataStatus: "Available in approved dataset"
      }
    };
  }

  // Default fallback for questions that do not match documented data
  return {
    text: UNAVAILABLE_INFORMATION_RESPONSE,
    structured: {
      isUnavailable: true,
      source: "Institutional Knowledge Boundary Rule (Section 14 & 24)",
      dataStatus: "Not Available in approved dataset"
    }
  };
}
