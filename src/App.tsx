import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { Stem3DDiagram } from './components/Stem3DDiagram';
import { FinancialDiagramView } from './components/FinancialDiagramView';
import { FeeCalculatorModal } from './components/FeeCalculatorModal';
import { ChatMessage } from './types';
import { evaluateDatasetQuery } from './utils/datasetEvaluator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'stem3d' | 'diagrams' | 'calculator'>('chat');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [calculatorOpen, setCalculatorOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recentQuestions, setRecentQuestions] = useState<string[]>([
    "What scholarships are available?",
    "What are the tuition fees?",
    "What documents are required?",
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'buddy',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Hello! I'm Finance Buddy.\n\nI can help you find information about scholarships, fees, eligibility, financial assistance, and other information available in the approved university dataset.\n\nWhat would you like to know?",
      structured: {
        source: "CGC University Finance Buddy Dataset — Academic Session 2026–27",
        dataStatus: "Institutional Dataset Connected",
      },
    },
  ]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const trimmed = userText.trim();
    const studentMsg: ChatMessage = {
      id: `student-${Date.now()}`,
      sender: 'student',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: trimmed,
    };

    setMessages((prev) => [...prev, studentMsg]);
    setIsLoading(true);

    // Track recent questions
    setRecentQuestions((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 8);
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const buddyMsg: ChatMessage = {
        id: `buddy-${Date.now()}`,
        sender: 'buddy',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.text,
        structured: data.structured,
      };

      setMessages((prev) => [...prev, buddyMsg]);
    } catch (err) {
      console.warn('API error, using grounded local dataset evaluator fallback:', err);
      // Seamless grounded fallback to preserve dataset adherence
      const fallbackResult = evaluateDatasetQuery(trimmed);
      const fallbackMsg: ChatMessage = {
        id: `buddy-${Date.now()}`,
        sender: 'buddy',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: fallbackResult.text,
        structured: fallbackResult.structured,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const lastStudentMessage = [...messages].reverse().find((m) => m.sender === 'student');
    if (lastStudentMessage) {
      handleSendMessage(lastStudentMessage.text);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'buddy',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Hello! I'm Finance Buddy.\n\nI can help you find information about scholarships, fees, eligibility, financial assistance, and other information available in the approved university dataset.\n\nWhat would you like to know?",
        structured: {
          source: "CGC University Finance Buddy Dataset — Academic Session 2026–27",
          dataStatus: "Institutional Dataset Connected",
        },
      },
    ]);
    setActiveTab('chat');
  };

  const handleAskQuestionFromTab = (question: string) => {
    setActiveTab('chat');
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white font-sans text-slate-900">
      {/* Universal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'calculator') {
            setCalculatorOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Collapsible Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
          recentQuestions={recentQuestions}
          onSelectQuestion={handleAskQuestionFromTab}
          onOpenSection={(sec) => handleAskQuestionFromTab(`Show me ${sec}`)}
        />

        {/* Dynamic Center View */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {activeTab === 'chat' && (
            <ChatView
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onRetry={handleRetry}
              onOpenCalculator={() => setCalculatorOpen(true)}
            />
          )}

          {activeTab === 'stem3d' && (
            <Stem3DDiagram onAskAboutProgramme={handleAskQuestionFromTab} />
          )}

          {activeTab === 'diagrams' && (
            <FinancialDiagramView onAskQuestion={handleAskQuestionFromTab} />
          )}
        </main>
      </div>

      {/* Direct Fee Calculator Modal */}
      <FeeCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onSendToChat={handleAskQuestionFromTab}
      />
    </div>
  );
}
