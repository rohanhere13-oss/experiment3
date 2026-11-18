import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatCards from './components/StatCards';
import NewsAndPrograms from './components/NewsAndPrograms';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton';
import ChatbotView from './components/ChatbotView';
import AdminDashboard from './components/AdminDashboard';
import ApplyModal from './components/ApplyModal';
import VisitModal from './components/VisitModal';
import ContactModal from './components/ContactModal';
import ProgramsModal from './components/ProgramsModal';
import SearchModal from './components/SearchModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'chatbot' | 'admin'
  const [initialChatQuery, setInitialChatQuery] = useState('');

  // Modals state
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Jump to chatbot with a pre-filled query
  const handleOpenChatWithQuery = (query) => {
    setInitialChatQuery(query);
    setCurrentView('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <div className="fade-in">
            <HeroSection
              onExplorePrograms={() => setIsProgramsOpen(true)}
              onVisitCampus={() => setIsVisitOpen(true)}
            />
            <StatCards onSelectTopic={handleOpenChatWithQuery} />
            <NewsAndPrograms
              onSelectTopic={handleOpenChatWithQuery}
              onOpenProgramsModal={() => setIsProgramsOpen(true)}
            />
            <Footer
              onOpenApply={() => setIsApplyOpen(true)}
              onOpenChatbot={() => setCurrentView('chatbot')}
            />
            <FloatingChatButton
              onClick={() => setCurrentView('chatbot')}
              isOpen={false}
              unreadCount={1}
            />
          </div>
        )}

        {currentView === 'chatbot' && (
          <div className="fade-in">
            <ChatbotView
              initialQuery={initialChatQuery}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="fade-in">
            <AdminDashboard
              onClose={() => setCurrentView('home')}
              onSwitchToChat={() => setCurrentView('chatbot')}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onAskAboutCourse={handleOpenChatWithQuery}
      />

      <VisitModal
        isOpen={isVisitOpen}
        onClose={() => setIsVisitOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ProgramsModal
        isOpen={isProgramsOpen}
        onClose={() => setIsProgramsOpen(false)}
        onAskAboutCourse={handleOpenChatWithQuery}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTopic={handleOpenChatWithQuery}
      />
    </div>
  );
}
