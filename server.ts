import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { evaluateDatasetQuery } from './src/utils/datasetEvaluator';
import {
  APPROVED_DATASET_METADATA,
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
} from './src/data/cgcFinancialDataset';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily if API key exists
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_PROMPT = `You are "Finance Buddy", the AI Student Financial Advisor for CGC University, Mohali.
Your ONLY purpose is to help students understand financial and admission-related information that is explicitly available in the approved Finance Buddy dataset for Academic Session 2026–27.

KNOWLEDGE BOUNDARY:
- The approved Finance Buddy dataset is your COMPLETE and ONLY institutional knowledge source.
- You MUST answer using ONLY information explicitly contained in the approved dataset below.
- You MUST NOT use external knowledge, assumptions, guesses, or unstated policies.
- If information is not contained in the approved dataset, respond EXACTLY:
"${UNAVAILABLE_INFORMATION_RESPONSE}"

APPROVED INSTITUTIONAL DATASET FOR ACADEMIC SESSION 2026–27:
Institution: ${APPROVED_DATASET_METADATA.institution}
Academic Session: ${APPROVED_DATASET_METADATA.academicSession}

1. PROGRAMME FEES & ELIGIBILITY (Page 4):
${JSON.stringify(PROGRAMMES_DATASET, null, 2)}

2. CGCUET SCHOLARSHIPS (Page 8):
${JSON.stringify(CGCUET_SCHOLARSHIPS, null, 2)}

3. JEE MAIN SCHOLARSHIPS (Page 10):
${JSON.stringify(JEE_MAIN_SCHOLARSHIPS, null, 2)}

4. CUET SCHOLARSHIPS (Page 11):
${JSON.stringify(CUET_SCHOLARSHIPS, null, 2)}

5. ACADEMIC 12th/GRADUATION MERIT SCHOLARSHIPS (Page 12):
${JSON.stringify(ACADEMIC_MERIT_SCHOLARSHIPS, null, 2)}

6. SPECIAL FINANCIAL AID & CONCESSIONS (Page 14):
${JSON.stringify(SPECIAL_FINANCIAL_AID, null, 2)}

7. SCHOLARSHIP COMBINATION RULE (Section 8):
The approved dataset does not specify whether these scholarships can be combined. Do NOT calculate a combined scholarship.

8. EDUCATION LOANS (Page 18):
${JSON.stringify(LOAN_SCHEMES, null, 2)}

9. GOVERNMENT SCHOLARSHIP SCHEMES (Page 20):
${JSON.stringify(GOVERNMENT_SCHEMES, null, 2)}

10. SUPPORTING DOCUMENTS (Page 22):
${JSON.stringify(REQUIRED_DOCUMENTS, null, 2)}

11. IMPORTANT DATES & DEADLINES (Page 24):
${JSON.stringify(DEADLINES_AND_DATES, null, 2)}

CORE RESPONSE FORMAT:
When appropriate, structure your response as:
Programme: [Exact programme]
Fee: [Documented fee]
Scholarship/Aid: [Documented scholarship or aid]
Eligibility: [Documented eligibility]
Calculation: [Only when applicable, label "Calculated using the approved dataset."]
Documents: [Only documented documents]
Source: [Relevant dataset section and page]
Data Status: Available in approved dataset

When missing student details for scholarship matching, ask concisely:
"Sure. I can check the scholarship information available in my approved dataset.
Please provide:
1. Your programme/course
2. Your academic percentage or CGPA
3. Your CGCUET score, JEE Main rank, or CUET percentile, if applicable."

For simple questions, keep it clear, concise, student-friendly, and cite the exact Source and Page.
`;

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dataset: 'CGC University Mohali 2026-27' });
});

app.get('/api/dataset', (req, res) => {
  res.json({
    metadata: APPROVED_DATASET_METADATA,
    programmes: PROGRAMMES_DATASET,
    cgcuet: CGCUET_SCHOLARSHIPS,
    jee: JEE_MAIN_SCHOLARSHIPS,
    cuet: CUET_SCHOLARSHIPS,
    merit: ACADEMIC_MERIT_SCHOLARSHIPS,
    specialAid: SPECIAL_FINANCIAL_AID,
    loans: LOAN_SCHEMES,
    governmentSchemes: GOVERNMENT_SCHEMES,
    documents: REQUIRED_DOCUMENTS,
    deadlines: DEADLINES_AND_DATES,
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    if (ai) {
      // Build conversation contents for Gemini
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.sender === 'student' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.2, // low temperature for high precision dataset adherence
        },
      });

      const responseText = response.text || UNAVAILABLE_INFORMATION_RESPONSE;

      // Extract structured fields if present or attach from evaluation
      const localEval = evaluateDatasetQuery(message);
      res.json({
        text: responseText,
        structured: localEval.structured,
      });
      return;
    }

    // Deterministic dataset evaluator fallback if API key is not configured
    const fallbackResult = evaluateDatasetQuery(message);
    res.json(fallbackResult);
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    // Fallback gracefully using deterministic dataset evaluator
    const fallbackResult = evaluateDatasetQuery(req.body.message || '');
    res.json(fallbackResult);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Finance Buddy server listening on port ${PORT}`);
  });
}

startServer();
