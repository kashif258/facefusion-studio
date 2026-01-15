import React from 'react';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-xl text-slate-400">
          Choose the plan that fits your creative needs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
        {/* Basic */}
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-all">
          <h3 className="text-lg font-medium text-white">Starter</h3>
          <p className="mt-4 text-slate-400 text-sm">Perfect for hobbyists and experimentation.</p>
          <div className="mt-6 flex items-baseline text-white">
            <span className="text-5xl font-extrabold tracking-tight">$0</span>
            <span className="ml-1 text-xl font-semibold text-slate-400">/mo</span>
          </div>
          <ul className="mt-6 space-y-4">
            {['SD Quality (720p)', 'Slow Processing Queue', 'Watermarked Results', 'Public Models Only'].map((feat) => (
              <li key={feat} className="flex">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-slate-300">{feat}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 block w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-6 text-center font-medium text-white hover:bg-slate-700">
            Get Started
          </button>
        </div>

        {/* Pro */}
        <div className="bg-slate-900 rounded-2xl p-8 border-2 border-brand-500 relative transform scale-105 shadow-2xl shadow-brand-900/50">
          <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full text-xs font-bold text-white uppercase tracking-wide">
            Popular
          </div>
          <h3 className="text-lg font-medium text-white">Professional</h3>
          <p className="mt-4 text-slate-400 text-sm">For content creators and professionals.</p>
          <div className="mt-6 flex items-baseline text-white">
            <span className="text-5xl font-extrabold tracking-tight">$29</span>
            <span className="ml-1 text-xl font-semibold text-slate-400">/mo</span>
          </div>
          <ul className="mt-6 space-y-4">
            {['HD Quality (1080p)', 'Priority GPU Access', 'No Watermark', 'Private Models', 'Face Enhancement Tools'].map((feat) => (
              <li key={feat} className="flex">
                <Check className="flex-shrink-0 h-5 w-5 text-brand-400" />
                <span className="ml-3 text-white">{feat}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 block w-full bg-gradient-to-r from-brand-600 to-accent-600 rounded-lg py-3 px-6 text-center font-bold text-white hover:from-brand-500 hover:to-accent-500 shadow-lg shadow-brand-500/25">
            Upgrade Now
          </button>
        </div>

        {/* Enterprise */}
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-all">
          <h3 className="text-lg font-medium text-white">Studio</h3>
          <p className="mt-4 text-slate-400 text-sm">Maximum power for production houses.</p>
          <div className="mt-6 flex items-baseline text-white">
            <span className="text-5xl font-extrabold tracking-tight">$99</span>
            <span className="ml-1 text-xl font-semibold text-slate-400">/mo</span>
          </div>
          <ul className="mt-6 space-y-4">
            {['4K Ultra HD', 'Dedicated H100 Nodes', 'API Access', 'Custom Model Training', '24/7 Support'].map((feat) => (
              <li key={feat} className="flex">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-slate-300">{feat}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 block w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-6 text-center font-medium text-white hover:bg-slate-700">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};
