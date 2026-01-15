import React from 'react';
import { Layers, Zap, Image, Video, Menu, X } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  currentNav: NavItem;
  onNavigate: (nav: NavItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentNav, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navClasses = (item: NavItem) => `
    px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-2
    ${currentNav === item 
      ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' 
      : 'text-slate-300 hover:text-white hover:bg-slate-800'}
  `;

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(NavItem.HOME)}>
            <div className="bg-gradient-to-tr from-brand-500 to-accent-500 p-2 rounded-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              FaceFusion
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => onNavigate(NavItem.HOME)} className={navClasses(NavItem.HOME)}>
                Home
              </button>
              <button onClick={() => onNavigate(NavItem.STUDIO)} className={navClasses(NavItem.STUDIO)}>
                <Video size={16} /> Deepfake Studio
              </button>
              <button onClick={() => onNavigate(NavItem.TOOLS)} className={navClasses(NavItem.TOOLS)}>
                <Zap size={16} /> AI Tools
              </button>
              <button onClick={() => onNavigate(NavItem.PRICING)} className={navClasses(NavItem.PRICING)}>
                Pricing
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button onClick={() => {onNavigate(NavItem.HOME); setIsOpen(false)}} className={`block w-full text-left ${navClasses(NavItem.HOME)}`}>Home</button>
             <button onClick={() => {onNavigate(NavItem.STUDIO); setIsOpen(false)}} className={`block w-full text-left ${navClasses(NavItem.STUDIO)}`}>Deepfake Studio</button>
             <button onClick={() => {onNavigate(NavItem.TOOLS); setIsOpen(false)}} className={`block w-full text-left ${navClasses(NavItem.TOOLS)}`}>AI Tools</button>
             <button onClick={() => {onNavigate(NavItem.PRICING); setIsOpen(false)}} className={`block w-full text-left ${navClasses(NavItem.PRICING)}`}>Pricing</button>
          </div>
        </div>
      )}
    </nav>
  );
};
