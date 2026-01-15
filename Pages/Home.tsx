import React from 'react';
import { ArrowRight, Cpu, Lock, Zap, MousePointer } from 'lucide-react';
import { NavItem } from '../types';

interface HomeProps {
  onNavigate: (nav: NavItem) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="absolute inset-0">
           <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 to-slate-950" />
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-accent-600/10 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8">
            <span className="block">Next Gen AI</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent-400">
              Media Synthesis
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
            Create professional deepfakes, swap faces, and generate AI videos directly in your browser using our powerful cloud GPU clusters. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => onNavigate(NavItem.STUDIO)}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-full text-lg transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
            >
              Start Creating <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => onNavigate(NavItem.TOOLS)}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-full text-lg transition-all border border-slate-700"
            >
              Explore AI Tools
            </button>
          </div>
          
          <div className="mt-16 relative">
             <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-800"></div>
             </div>
             <div className="relative flex justify-center">
                <span className="px-4 bg-slate-950 text-sm text-slate-500 font-medium uppercase tracking-wider">Trusted by creators worldwide</span>
             </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why FaceFusion?</h2>
            <p className="mt-4 text-slate-400">Enterprise-grade technology made accessible for everyone.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500/50 transition-all group">
              <div className="bg-brand-500/10 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="h-8 w-8 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cloud GPU Power</h3>
              <p className="text-slate-400 leading-relaxed">
                Don't melt your laptop. Our H100 GPU clusters handle the heavy lifting for training models and rendering videos in record time.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-accent-500/50 transition-all group">
              <div className="bg-accent-500/10 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                <MousePointer className="h-8 w-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One-Click Workflow</h3>
              <p className="text-slate-400 leading-relaxed">
                Forget command lines and Python scripts. Our intuitive drag-and-drop interface makes complex AI synthesis simple.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-green-500/50 transition-all group">
              <div className="bg-green-500/10 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                <Lock className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Private & Secure</h3>
              <p className="text-slate-400 leading-relaxed">
                Your data is encrypted at rest and in transit. Files are automatically deleted 24 hours after processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
