import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">FaceFusion Studio</h3>
            <p className="text-slate-400 max-w-sm">
              The leading cloud-based platform for professional AI media manipulation and deepfake generation. 
              Ethical use policy applies.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-brand-400 transition">Features</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-400 transition">Pricing</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-400 transition">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-500 hover:text-brand-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-400 transition">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 hover:text-brand-400 transition">Ethical Guidelines</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-900 text-center text-slate-600">
          &copy; {new Date().getFullYear()} FaceFusion Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
