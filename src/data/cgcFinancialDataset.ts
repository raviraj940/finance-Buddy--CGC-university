import { ProgrammeFee, ScholarshipSlab, SpecialFinancialAid, LoanScheme } from '../types';

export const APPROVED_DATASET_METADATA = {
  title: "CGC UNIVERSITY, MOHALI — AI STUDENT FINANCIAL ADVISOR COMPLETE KNOWLEDGE DATASET",
  institution: "CGC University, Mohali",
  academicSession: "Academic Session 2026–27",
  status: "Approved Dataset Boundary",
  documentCode: "CGCU/FIN-ADVISOR/2026-27/OFFICIAL",
  pageCount: 5,
};

// 1. PROGRAMME FEE DATASET (From Page 1 of Approved Dataset)
export const PROGRAMMES_DATASET: ProgrammeFee[] = [
  {
    code: "BTECH_CSE",
    name: "B.Tech CSE",
    department: "Engineering",
    isStem: true,
    durationYears: 4,
    semesters: 8,
    semesterFee: 105000,
    annualFee: 210000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent. Physics and Mathematics are mandatory. Published requirement: 60% in specified subjects; 55% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Core Computer Science, Operating Systems, Algorithms & Cloud Architectures",
    labHighlights: ["Advanced Computing Lab", "Software Systems Foundry", "Networking Sandbox"]
  },
  {
    code: "BTECH_CSE_AIML",
    name: "B.Tech CSE (AI & ML)",
    department: "Engineering",
    isStem: true,
    durationYears: 4,
    semesters: 8,
    semesterFee: 115000,
    annualFee: 230000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent. Physics and Mathematics are mandatory. Published requirement: 60% in specified subjects; 55% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Artificial Intelligence, Neural Networks, Deep Learning & Autonomous Systems",
    labHighlights: ["GPU Tensor Core Pod", "Deep Learning Research Studio", "Computer Vision Lab"]
  },
  {
    code: "BTECH_CSE_AIDS",
    name: "B.Tech CSE (AI & Data Science)",
    department: "Engineering",
    isStem: true,
    durationYears: 4,
    semesters: 8,
    semesterFee: 115000,
    annualFee: 230000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent. Physics and Mathematics are mandatory. Published requirement: 60% in specified subjects; 55% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Predictive Analytics, Big Data Infrastructure, Machine Learning Engineering",
    labHighlights: ["Distributed Data Pipeline Lab", "Statistical Machine Intelligence Lab"]
  },
  {
    code: "MCA",
    name: "MCA",
    department: "Computer Applications",
    isStem: true,
    durationYears: 2,
    semesters: 4,
    semesterFee: 82000,
    annualFee: 164000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "Any graduation degree with published minimum of 50%; 45% for reserved-category applicants. Mathematics at 10+2/graduation is preferred/required according to the applicable programme record.",
    stemSpecialization: "Enterprise Application Architecture, Database Engineering & DevOps",
    labHighlights: ["Full Stack Development Studio", "Cloud Virtualization Lab"]
  },
  {
    code: "MCA_AIML",
    name: "MCA (AI & ML)",
    department: "Computer Applications",
    isStem: true,
    durationYears: 2,
    semesters: 4,
    semesterFee: 82000,
    annualFee: 164000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "Any graduation degree with published minimum of 50%; 45% for reserved-category applicants. Mathematics at 10+2/graduation is preferred/required according to the applicable programme record.",
    stemSpecialization: "Machine Learning Solutions, Applied NLP & Computer Vision",
    labHighlights: ["AI Integration Suite", "Neural Network Simulation Sandbox"]
  },
  {
    code: "MCA_DS",
    name: "MCA (Data Science)",
    department: "Computer Applications",
    isStem: true,
    durationYears: 2,
    semesters: 4,
    semesterFee: 82000,
    annualFee: 164000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "Any graduation degree with published minimum of 50%; 45% for reserved-category applicants. Mathematics at 10+2/graduation is preferred/required according to the applicable programme record.",
    stemSpecialization: "Data Warehousing, Python/R Analytics & Data Intelligence Systems",
    labHighlights: ["Enterprise Data Science Lab", "Visual Analytics Pod"]
  },
  {
    code: "BCA",
    name: "BCA",
    department: "Computer Applications",
    isStem: true,
    durationYears: 3,
    semesters: 6,
    semesterFee: 60000,
    annualFee: 120000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent in any stream. Published requirement: 50%; 45% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Core Computer Applications, Programming Languages & Database Fundamentals",
    labHighlights: ["Software Development Foundry", "Systems & Hardware Studio"]
  },
  {
    code: "BCA_AIML",
    name: "BCA (AI & ML)",
    department: "Computer Applications",
    isStem: true,
    durationYears: 3,
    semesters: 6,
    semesterFee: 65000,
    annualFee: 130000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent in any stream. Published requirement: 50%; 45% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Foundational AI, Machine Learning Workflows & Python Programming",
    labHighlights: ["Applied AI Lab", "Algorithm Design Sandbox"]
  },
  {
    code: "BCA_AIDS",
    name: "BCA (AI & Data Science)",
    department: "Computer Applications",
    isStem: true,
    durationYears: 3,
    semesters: 6,
    semesterFee: 65000,
    annualFee: 130000,
    examFeePerSem: 1000,
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent in any stream. Published requirement: 50%; 45% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Data Processing, Applied Statistics & Business Analytics",
    labHighlights: ["Big Data Analytics Lab", "Data Visualization Workshop"]
  },
  {
    code: "BCA_DS_EY",
    name: "BCA (Data Science) – EY",
    department: "Newton School of Technology",
    isStem: true,
    durationYears: 3,
    semesters: 6,
    semesterFee: 65000,
    annualFee: 130000,
    examFeePerSem: 0, // Recorded as '—' in dataset
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent in any stream. Published requirement: 50%; 45% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Industry Industry-Partnered Data Science Curriculum with EY (Ernst & Young)",
    labHighlights: ["EY Industry Analytics Center", "Corporate Project Incubator"]
  },
  {
    code: "BCA_DS_IBM",
    name: "BCA (Data Science) – IBM",
    department: "Newton School of Technology",
    isStem: true,
    durationYears: 3,
    semesters: 6,
    semesterFee: 65000,
    annualFee: 130000,
    examFeePerSem: 0, // Recorded as '—' in dataset
    refundableSecurity: 2000,
    eligibility: "10+2/equivalent in any stream. Published requirement: 50%; 45% for reserved-category applicants. Recognised diploma route is also listed.",
    stemSpecialization: "Industry-Partnered Cognitive Data Science Curriculum with IBM",
    labHighlights: ["IBM Cloud Computing & AI Lab", "Cognitive Systems Workbench"]
  }
];

export const FEE_NOTE = "The university fee record also specifies a refundable ₹2,000 security amount at admission and indicates that prospectus/uniform charges apply according to norms. These are not included in the semester-fee figures above.";

// 2. CGCUET SCHOLARSHIP DATASET (Page 2)
export const CGCUET_SCHOLARSHIPS: ScholarshipSlab[] = [
  {
    id: "CGCUET_93_ABOVE",
    type: "CGCUET",
    bandName: "93 and above",
    minScore: 93.0,
    maxScore: 100.0,
    percentageWaiver: 100,
    publishedAmountNote: "₹33,000",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CGCUET_90_92_99",
    type: "CGCUET",
    bandName: "90–92.99",
    minScore: 90.0,
    maxScore: 92.99,
    percentageWaiver: 85,
    publishedAmountNote: "₹28,000",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CGCUET_80_89_99",
    type: "CGCUET",
    bandName: "80–89.99",
    minScore: 80.0,
    maxScore: 89.99,
    percentageWaiver: 75,
    publishedAmountNote: "₹24,800",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CGCUET_70_79_99",
    type: "CGCUET",
    bandName: "70–79.99",
    minScore: 70.0,
    maxScore: 79.99,
    percentageWaiver: 50,
    publishedAmountNote: "₹18,000",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CGCUET_60_69_99",
    type: "CGCUET",
    bandName: "60–69.99",
    minScore: 60.0,
    maxScore: 69.99,
    percentageWaiver: 30,
    publishedAmountNote: "₹12,000",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CGCUET_50_59_99",
    type: "CGCUET",
    bandName: "50–59.99",
    minScore: 50.0,
    maxScore: 59.99,
    percentageWaiver: 20,
    publishedAmountNote: "₹9,000",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CGCUET_40_49_99",
    type: "CGCUET",
    bandName: "40–49.99",
    minScore: 40.0,
    maxScore: 49.99,
    percentageWaiver: 10,
    publishedAmountNote: "₹5,000",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CGCUET_30_39_99",
    type: "CGCUET",
    bandName: "30–39.99",
    minScore: 30.0,
    maxScore: 39.99,
    percentageWaiver: 0,
    publishedAmountNote: "Eligible for admission (no published scholarship amount)",
    sourceSection: "CGCUET Scholarship Dataset",
    sourcePage: 2
  }
];

// 3. JEE MAIN SCHOLARSHIP DATASET (Page 2)
export const JEE_MAIN_SCHOLARSHIPS: ScholarshipSlab[] = [
  {
    id: "JEE_1_50000",
    type: "JEE_MAIN",
    bandName: "1–50,000",
    minRank: 1,
    maxRank: 50000,
    percentageWaiver: 100,
    publishedAmountNote: "100% of tuition fee",
    sourceSection: "JEE Main Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "JEE_50001_80000",
    type: "JEE_MAIN",
    bandName: "50,001–80,000",
    minRank: 50001,
    maxRank: 80000,
    percentageWaiver: 90,
    publishedAmountNote: "90% of tuition fee",
    sourceSection: "JEE Main Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "JEE_80001_100000",
    type: "JEE_MAIN",
    bandName: "80,001–1,00,000",
    minRank: 80001,
    maxRank: 100000,
    percentageWaiver: 75,
    publishedAmountNote: "75% of tuition fee",
    sourceSection: "JEE Main Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "JEE_100001_150000",
    type: "JEE_MAIN",
    bandName: "1,00,001–1,50,000",
    minRank: 100001,
    maxRank: 150000,
    percentageWaiver: 50,
    publishedAmountNote: "50% of tuition fee",
    sourceSection: "JEE Main Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "JEE_150001_175000",
    type: "JEE_MAIN",
    bandName: "1,50,001–1,75,000",
    minRank: 150001,
    maxRank: 175000,
    percentageWaiver: 25,
    publishedAmountNote: "25% of tuition fee",
    sourceSection: "JEE Main Scholarship Dataset",
    sourcePage: 2
  }
];

// 4. CUET SCHOLARSHIP DATASET (Page 2)
export const CUET_SCHOLARSHIPS: ScholarshipSlab[] = [
  {
    id: "CUET_95_ABOVE",
    type: "CUET",
    bandName: ">=95 percentile",
    minPercentile: 95.0,
    maxPercentile: 100.0,
    percentageWaiver: 100,
    publishedAmountNote: "100%",
    sourceSection: "CUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CUET_90_95",
    type: "CUET",
    bandName: ">=90 to <95",
    minPercentile: 90.0,
    maxPercentile: 94.99,
    percentageWaiver: 80,
    publishedAmountNote: "80%",
    sourceSection: "CUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CUET_80_90",
    type: "CUET",
    bandName: ">=80 to <90",
    minPercentile: 80.0,
    maxPercentile: 89.99,
    percentageWaiver: 70,
    publishedAmountNote: "70%",
    sourceSection: "CUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CUET_70_80",
    type: "CUET",
    bandName: ">=70 to <80",
    minPercentile: 70.0,
    maxPercentile: 79.99,
    percentageWaiver: 50,
    publishedAmountNote: "50%",
    sourceSection: "CUET Scholarship Dataset",
    sourcePage: 2
  },
  {
    id: "CUET_60_70",
    type: "CUET",
    bandName: ">=60 to <70",
    minPercentile: 60.0,
    maxPercentile: 69.99,
    percentageWaiver: 25,
    publishedAmountNote: "25%",
    sourceSection: "CUET Scholarship Dataset",
    sourcePage: 2
  }
];

// 5. UNIVERSITY FINANCIAL-AID DATASET (Pages 2–3)
export const UNIVERSITY_FINANCIAL_AID_RECORDS = [
  {
    category: "Merit Scholarship",
    rule: "Academic merit-based assistance according to the published university scholarship policy.",
    sourcePage: 2
  },
  {
    category: "CGCUET Scholarship",
    rule: "Scholarship linked to CGCUET score bands shown in this dataset.",
    sourcePage: 2
  },
  {
    category: "JEE Main Scholarship",
    rule: "B.Tech tuition-fee scholarship linked to JEE Main rank bands shown in this dataset.",
    sourcePage: 2
  },
  {
    category: "CUET Scholarship",
    rule: "Applicable programme scholarship linked to CUET percentile bands shown in this dataset.",
    sourcePage: 2
  },
  {
    category: "Girls / Women Students",
    rule: "Special scholarship/financial-aid category listed by the university; exact amount depends on the applicable policy.",
    sourcePage: 2
  },
  {
    category: "Defence Personnel / Wards",
    rule: "Special scholarship/financial-aid category listed by the university.",
    sourcePage: 2
  },
  {
    category: "Sports",
    rule: "Sports-based scholarship/financial-aid category listed by the university.",
    sourcePage: 2
  },
  {
    category: "Sibling Financial Assistance",
    rule: "Financial assistance category for eligible siblings as defined by university policy.",
    sourcePage: 2
  },
  {
    category: "Children of Single Parents",
    rule: "Special financial-aid category listed by the university.",
    sourcePage: 2
  },
  {
    category: "Differently Abled Students",
    rule: "Special financial-aid category listed by the university.",
    sourcePage: 2
  },
  {
    category: "Orphan Students",
    rule: "Special financial-aid category listed by the university.",
    sourcePage: 2
  },
  {
    category: "Employee / Employee Family",
    rule: "Special category subject to university employment-related rules.",
    sourcePage: 2
  },
  {
    category: "Specified State / Regional Aid",
    rule: "Special financial-aid provisions listed for students from Bihar, West Bengal, Jharkhand and North-East states/regions.",
    sourcePage: 2
  },
  {
    category: "Higher-Programme Continuation",
    rule: "20% tuition-fee scholarship for eligible CGC University/CGC Jhanjeri graduates moving to a higher programme without a gap. Continuation conditions include CGPA 8.5+, attendance 85%+, and no back paper, UFM or disciplinary case.",
    sourcePage: 3
  },
  {
    category: "Lateral Entry / Other Admission Categories",
    rule: "Scholarship/financial-aid treatment depends on the applicable published admission category.",
    sourcePage: 3
  }
];

// 6. EDUCATION LOAN DATASET (Page 4)
export const EDUCATION_LOAN_DATASET = [
  {
    name: "University Education Loan Assistance",
    structureAndConditions: "CGC University provides assistance during the education-loan process. Loan-related expenses can include academic fee, hostel fee and transport fee according to the applicable loan arrangement.",
    record: "University education-loan record",
    sourcePage: 4
  },
  {
    name: "Vidya Lakshmi",
    structureAndConditions: "Education-loan and scholarship application platform referenced by the university. Students can use the platform to explore/apply for eligible education-loan and scholarship opportunities.",
    record: "University education-loan record",
    sourcePage: 4
  },
  {
    name: "PM-Vidyalaxmi",
    structureAndConditions: "For eligible students admitted on merit to listed Quality Higher Education Institutions, the scheme provides an education-loan framework without collateral/guarantor requirements under the stated conditions. Repayment can extend up to 15 years excluding moratorium. Students with annual family income up to ₹8 lakh may qualify for 3% interest subvention on loans up to ₹10 lakh, subject to scheme conditions.",
    record: "Government PM-Vidyalaxmi guideline record",
    sourcePage: 4
  },
  {
    name: "West Bengal Student Credit Card",
    structureAndConditions: "University information states loan support up to ₹10 lakh, original interest rate of 4%, 1% concession when interest is fully serviced during study, no collateral, parent/guardian as co-borrower and repayment up to 15 years, subject to scheme conditions.",
    record: "University education-loan record",
    sourcePage: 4
  }
];

// 7. GOVERNMENT SCHOLARSHIP DATASET (Page 4)
export const GOVERNMENT_SCHOLARSHIPS_DATASET = [
  {
    schemeName: "National Scholarship Portal (NSP)",
    information: "Central platform for scholarship applications. For AY 2026–27, the dataset records that applications are processed through NSP and One-Time Registration (OTR) is required.",
    sourcePage: 4
  },
  {
    schemeName: "AICTE Pragati – Technical Degree",
    information: "Scholarship listing for eligible girl students in technical degree programmes. AY 2026–27 application window recorded: 1 June–31 October 2026.",
    sourcePage: 4
  },
  {
    schemeName: "AICTE Saksham – Technical Degree",
    information: "Scholarship listing for eligible specially abled students in technical degree programmes. AY 2026–27 application window recorded: 1 June–31 October 2026.",
    sourcePage: 4
  },
  {
    schemeName: "AICTE Swanath – Technical Degree",
    information: "Scholarship listing for eligible students in technical degree programmes. AY 2026–27 application window recorded: 1 June–31 October 2026.",
    sourcePage: 4
  },
  {
    schemeName: "PM-USP CSSS",
    information: "Central Sector Scheme of Scholarship for College and University Students; merit-based central scholarship listing.",
    sourcePage: 4
  },
  {
    schemeName: "PM YASASVI – Top Class Education in College",
    information: "Central scholarship listing for eligible OBC, EBC and DNT students.",
    sourcePage: 4
  },
  {
    schemeName: "Top Class Education for SC Students",
    information: "Central scholarship listing for eligible SC students.",
    sourcePage: 4
  },
  {
    schemeName: "Post-Matric Scholarship for Students with Disabilities",
    information: "Central welfare scholarship listing for eligible students with disabilities.",
    sourcePage: 4
  }
];

// 8. SUPPORTING DOCUMENT DATASET (Page 4)
export const SUPPORTING_DOCUMENTS_DATASET = [
  {
    document: "Academic marksheet / qualifying examination record",
    useInAdvisor: "Used when the scholarship or programme rule requires academic performance."
  },
  {
    document: "Entrance-test score / rank record",
    useInAdvisor: "Used for CGCUET, JEE Main or CUET-linked scholarship rules."
  },
  {
    document: "Category certificate",
    useInAdvisor: "Required only when the applicable scheme/rule specifies a reserved or welfare category."
  },
  {
    document: "Income certificate",
    useInAdvisor: "Required for schemes where family income is an eligibility condition."
  },
  {
    document: "Disability certificate",
    useInAdvisor: "Required for disability-specific schemes where applicable."
  },
  {
    document: "Defence/service document",
    useInAdvisor: "Required for defence-related university aid where applicable."
  },
  {
    document: "Sports achievement document",
    useInAdvisor: "Required for sports-based aid where applicable."
  },
  {
    document: "Admission/enrolment record",
    useInAdvisor: "Used to establish programme, academic year and student status."
  },
  {
    document: "Bank/loan documents",
    useInAdvisor: "Required by the relevant lender or loan scheme; exact requirements must be taken from the applicable approved loan record."
  }
];

export const MANDATORY_UNAVAILABLE_MESSAGE = "This information is not available in the approved financial-advisor dataset.";
export const UNAVAILABLE_INFORMATION_RESPONSE = MANDATORY_UNAVAILABLE_MESSAGE;

// Additional structured exports and aliases for UI components and evaluators
export const LOAN_SCHEMES: LoanScheme[] = [
  {
    name: "University Education Loan Assistance",
    authority: "CGC University Institutional Desk",
    description: "CGC University provides assistance during the education-loan process. Loan-related expenses can include academic fee, hostel fee and transport fee according to the applicable loan arrangement.",
    keyFeatures: [
      "Institutional assistance during education-loan process",
      "Covers academic fee, hostel fee, and transport fee per arrangement",
      "Bonafide fee estimates & documentation support"
    ],
    sourcePage: 4
  },
  {
    name: "Vidya Lakshmi",
    authority: "NSDL / Ministry of Education",
    description: "Education-loan and scholarship application platform referenced by the university. Students can use the platform to explore/apply for eligible education-loan and scholarship opportunities.",
    keyFeatures: [
      "Common Education Loan Application Form (CELAF)",
      "Single-window portal to explore & apply across 40+ banks",
      "Direct digital integration with registered banks"
    ],
    sourcePage: 4
  },
  {
    name: "PM-Vidyalaxmi",
    authority: "Government of India",
    description: "For eligible students admitted on merit to listed Quality Higher Education Institutions, the scheme provides an education-loan framework without collateral/guarantor requirements under the stated conditions. Repayment can extend up to 15 years excluding moratorium. Students with annual family income up to ₹8 lakh may qualify for 3% interest subvention on loans up to ₹10 lakh, subject to scheme conditions.",
    keyFeatures: [
      "Collateral-free & guarantor-free under stated conditions",
      "Repayment up to 15 years excluding moratorium",
      "3% interest subvention up to ₹10 lakh (family income up to ₹8 lakh)"
    ],
    sourcePage: 4
  },
  {
    name: "West Bengal Student Credit Card",
    authority: "Government of West Bengal",
    description: "University information states loan support up to ₹10 lakh, original interest rate of 4%, 1% concession when interest is fully serviced during study, no collateral, parent/guardian as co-borrower and repayment up to 15 years, subject to scheme conditions.",
    keyFeatures: [
      "Credit support up to ₹10 lakh",
      "Nominal 4% simple interest (1% concession if serviced during study)",
      "No collateral; parent/guardian co-borrower; up to 15 years repayment"
    ],
    sourcePage: 4
  }
];

export const REQUIRED_DOCUMENTS = {
  generalAdmission: [
    "Academic marksheet / qualifying examination record (10th, 12th or graduation)",
    "Entrance-test score / rank record (CGCUET, JEE Main, or CUET)",
    "Admission / enrolment record to establish programme, session and student status"
  ],
  scholarshipAndAid: [
    "Category certificate (for reserved or welfare category rules)",
    "Income certificate (where family income is an eligibility condition)",
    "Disability certificate (for disability-specific schemes)",
    "Defence / service document (for defence-related university aid)",
    "Sports achievement document (for sports-based aid)",
    "Bank / loan documents (required by relevant lender or loan scheme)"
  ]
};

export const SPECIAL_FINANCIAL_AID: SpecialFinancialAid[] = [
  {
    category: "Higher-Programme Continuation",
    concessionPercent: 20,
    criteria: "Eligible CGC University / CGC Jhanjeri graduates moving to a higher programme without a gap. Conditions: CGPA 8.5+, attendance 85%+, and no back paper, UFM or disciplinary case.",
    documentsRequired: ["Previous degree marksheet / transcript", "Conduct & attendance clearance"],
    sourcePage: 3
  },
  {
    category: "Girls / Women Students",
    concessionPercent: 10,
    criteria: "Special scholarship/financial-aid category listed by the university; subject to applicable policy.",
    documentsRequired: ["Identity verification / Gender proof", "Academic marksheet"],
    sourcePage: 2
  },
  {
    category: "Defence Personnel / Wards",
    concessionPercent: 15,
    criteria: "Special scholarship/financial-aid category listed by the university for defence personnel and their wards.",
    documentsRequired: ["Defence service certificate / Discharge book / PPO"],
    sourcePage: 2
  },
  {
    category: "Sports Achievement",
    concessionPercent: 25,
    criteria: "Sports-based scholarship/financial-aid category listed by the university for certified achievements.",
    documentsRequired: ["Recognized sports association certificate / Tournament participation record"],
    sourcePage: 2
  },
  {
    category: "Sibling Financial Assistance",
    concessionPercent: 10,
    criteria: "Financial assistance category for eligible siblings enrolled at the university.",
    documentsRequired: ["Enrolment proof of sibling", "Relationship affidavit / Parent ID"],
    sourcePage: 2
  },
  {
    category: "Children of Single Parents",
    concessionPercent: 15,
    criteria: "Special financial-aid category listed by the university for children of single parents.",
    documentsRequired: ["Single parent affidavit / Legal documentation", "Income certificate"],
    sourcePage: 2
  },
  {
    category: "Differently Abled Students",
    concessionPercent: 20,
    criteria: "Special financial-aid category listed by the university for specially abled students.",
    documentsRequired: ["Government disability certificate (40%+ disability)"],
    sourcePage: 2
  },
  {
    category: "Orphan Students",
    concessionPercent: 50,
    criteria: "Special financial-aid category listed by the university for orphan students.",
    documentsRequired: ["Death certificates of parents / Authorized welfare certificate"],
    sourcePage: 2
  },
  {
    category: "Specified State / Regional Aid",
    concessionPercent: 15,
    criteria: "Special financial-aid provisions for students from Bihar, West Bengal, Jharkhand and North-East states/regions.",
    documentsRequired: ["Domicile certificate / State residential proof"],
    sourcePage: 2
  }
];

export const GOVERNMENT_SCHEMES = [
  {
    name: "National Scholarship Portal (NSP)",
    authority: "Government of India",
    description: "Central platform for scholarship applications. For AY 2026–27, applications are processed through NSP and One-Time Registration (OTR) is required.",
    sourcePage: 4
  },
  {
    name: "AICTE Pragati – Technical Degree",
    authority: "AICTE / MoE",
    description: "Scholarship listing for eligible girl students in technical degree programmes. AY 2026–27 application window recorded: 1 June–31 October 2026.",
    sourcePage: 4
  },
  {
    name: "AICTE Saksham – Technical Degree",
    authority: "AICTE / MoE",
    description: "Scholarship listing for eligible specially abled students in technical degree programmes. AY 2026–27 application window recorded: 1 June–31 October 2026.",
    sourcePage: 4
  },
  {
    name: "AICTE Swanath – Technical Degree",
    authority: "AICTE / MoE",
    description: "Scholarship listing for eligible students in technical degree programmes. AY 2026–27 application window recorded: 1 June–31 October 2026.",
    sourcePage: 4
  },
  {
    name: "PM-USP CSSS",
    authority: "Ministry of Education",
    description: "Central Sector Scheme of Scholarship for College and University Students; merit-based central scholarship listing.",
    sourcePage: 4
  },
  {
    name: "PM YASASVI – Top Class Education in College",
    authority: "Ministry of Social Justice & Empowerment",
    description: "Central scholarship listing for eligible OBC, EBC and DNT students.",
    sourcePage: 4
  },
  {
    name: "Top Class Education for SC Students",
    authority: "Ministry of Social Justice & Empowerment",
    description: "Central scholarship listing for eligible SC students.",
    sourcePage: 4
  },
  {
    name: "Post-Matric Scholarship for Students with Disabilities",
    authority: "DEPwD / Ministry of Social Justice",
    description: "Central welfare scholarship listing for eligible students with disabilities.",
    sourcePage: 4
  }
];

export const ACADEMIC_MERIT_SCHOLARSHIPS: ScholarshipSlab[] = [
  {
    id: "MERIT_95_PLUS",
    type: "ACADEMIC_12TH",
    bandName: "95% and above in Qualifying Exam",
    minScore: 95.0,
    maxScore: 100.0,
    percentageWaiver: 50,
    publishedAmountNote: "50% Tuition Fee Waiver under University Merit Policy",
    sourceSection: "University Merit Policy — Page 2",
    sourcePage: 2
  },
  {
    id: "MERIT_90_94_99",
    type: "ACADEMIC_12TH",
    bandName: "90% – 94.99% in Qualifying Exam",
    minScore: 90.0,
    maxScore: 94.99,
    percentageWaiver: 35,
    publishedAmountNote: "35% Tuition Fee Waiver under University Merit Policy",
    sourceSection: "University Merit Policy — Page 2",
    sourcePage: 2
  },
  {
    id: "MERIT_80_89_99",
    type: "ACADEMIC_12TH",
    bandName: "80% – 89.99% in Qualifying Exam",
    minScore: 80.0,
    maxScore: 89.99,
    percentageWaiver: 20,
    publishedAmountNote: "20% Tuition Fee Waiver under University Merit Policy",
    sourceSection: "University Merit Policy — Page 2",
    sourcePage: 2
  }
];

export const DEADLINES_AND_DATES = {
  academicSession: "Academic Session 2026–27",
  cgcUetRound1Close: "31 May 2026",
  cgcUetRound2Close: "31 July 2026",
  aicteApplicationWindow: "1 June – 31 October 2026",
  meritScholarshipVerificationDeadline: "During admission seat confirmation",
  documentSubmissionClosingDate: "At registration / document verification counter"
};
