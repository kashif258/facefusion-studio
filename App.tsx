import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DeepfakeStudio } from './pages/DeepfakeStudio';
import { AiTools } from './pages/AiTools';
import { Pricing } from './components/Pricing';
import { NavItem } from './types';

function App() {
  const [currentNav, setCurrentNav] = useState<NavItem>(NavItem.HOME);

  const renderContent = () => {
    switch (currentNav) {
      case NavItem.HOME:
        return <Home onNavigate={setCurrentNav} />;
      case NavItem.STUDIO:
        return <DeepfakeStudio />;
      case NavItem.TOOLS:
        return <AiTools />;
      case NavItem.PRICING:
        return <Pricing />;
      default:
        return <Home onNavigate={setCurrentNav} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-brand-500/30">
      <Navbar currentNav={currentNav} onNavigate={setCurrentNav} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
