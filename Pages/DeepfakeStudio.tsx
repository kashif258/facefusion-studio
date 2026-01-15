import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Download, Terminal, Settings, Activity } from 'lucide-react';
import { FileUploader } from '../components/FileUploader';
import { UploadedFile, JobStatus, LogEntry } from '../types';

export const DeepfakeStudio: React.FC = () => {
  const [sourceFile, setSourceFile] = useState<UploadedFile | null>(null);
  const [targetFile, setTargetFile] = useState<UploadedFile | null>(null);
  const [status, setStatus] = useState<JobStatus>(JobStatus.IDLE);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, level: LogEntry['level'] = 'INFO') => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message
    }]);
  };

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleStart = () => {
    if (!sourceFile || !targetFile) return;
    setStatus(JobStatus.PROCESSING);
    setProgress(0);
    setLogs([]);
    
    addLog(`Initialized session ${Math.random().toString(36).substring(7)}`, 'INFO');
    addLog('Allocating GPU resources (Tesla T4)...', 'INFO');
    
    // Simulation Sequence
    let step = 0;
    const interval = setInterval(() => {
      step++;
      
      // Progress simulation logic
      if (step === 5) {
        addLog('Resource allocation complete.', 'SUCCESS');
        addLog('Analyzing Source Face...', 'INFO');
        setStatus(JobStatus.TRAINING);
      }
      if (step === 15) {
        addLog('Detected 1 face in source image.', 'INFO');
        addLog('Extracting landmarks (68 points)...', 'INFO');
      }
      if (step === 30) {
        addLog('Analyzing Target Video frames...', 'INFO');
      }
      if (step === 45) {
         addLog('Starting Model Training (10,000 iterations)...', 'INFO');
      }
      
      // Update progress bar
      if (status !== JobStatus.COMPLETED) {
         setProgress(old => {
           const increment = Math.random() * 2;
           return Math.min(old + increment, 99);
         });
      }

      // Random "training" logs
      if (step > 50 && step < 150 && step % 10 === 0) {
        const loss = (Math.random() * 0.5).toFixed(4);
        addLog(`Training... Iteration ${step * 100} | Loss: ${loss}`, 'INFO');
      }

      if (step === 150) {
        addLog('Training converged.', 'SUCCESS');
        addLog('Starting Face Swap Generation...', 'INFO');
        setStatus(JobStatus.GENERATING);
      }
      
      if (step === 180) {
        addLog('Rendering final frames...', 'INFO');
        addLog('Applying color correction...', 'INFO');
      }

      if (step >= 200) {
        clearInterval(interval);
        setProgress(100);
        setStatus(JobStatus.COMPLETED);
        addLog('Job Completed Successfully. Video ready for download.', 'SUCCESS');
      }
    }, 100);
  };

  const reset = () => {
    setStatus(JobStatus.IDLE);
    setProgress(0);
    setLogs([]);
    setSourceFile(null);
    setTargetFile(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Activity className="text-brand-400" /> Deepfake Studio
                </h1>
                <p className="text-slate-400 text-sm">Upload your assets to begin the face swapping process.</p>
            </div>
            
            <div className="flex gap-3">
                <button 
                  onClick={reset}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition flex items-center gap-2 text-sm font-medium"
                >
                  <RotateCcw size={16} /> Reset
                </button>
                <button 
                    disabled={!sourceFile || !targetFile || status !== JobStatus.IDLE}
                    onClick={handleStart}
                    className={`px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition shadow-lg
                      ${(!sourceFile || !targetFile || status !== JobStatus.IDLE) 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 shadow-brand-500/20'}
                    `}
                >
                    {status === JobStatus.IDLE ? (
                         <><Play size={18} fill="currentColor" /> Start Generation</>
                    ) : (
                         <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Processing...</>
                    )}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Source Face</h3>
                  <span className="text-xs text-brand-400 bg-brand-400/10 px-2 py-1 rounded">Image or Video</span>
                </div>
                <FileUploader 
                  label="Upload the face you want to swap IN"
                  accept="image/*,video/*"
                  onFileSelect={setSourceFile}
                  currentFile={sourceFile}
                />
              </div>

              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Target Media</h3>
                  <span className="text-xs text-accent-400 bg-accent-400/10 px-2 py-1 rounded">Video</span>
                </div>
                <FileUploader 
                  label="Upload the video you want to modify"
                  accept="video/*"
                  onFileSelect={setTargetFile}
                  currentFile={targetFile}
                />
              </div>
            </div>

            {/* Preview/Output Area */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-1 min-h-[400px] flex items-center justify-center relative overflow-hidden">
               {status === JobStatus.COMPLETED && targetFile ? (
                   <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                       <div className="relative rounded-xl overflow-hidden shadow-2xl border border-brand-500/30 max-w-2xl w-full aspect-video bg-black">
                           <video src={targetFile.url} className="w-full h-full object-cover" controls autoPlay loop />
                           <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg animate-pulse">
                               GENERATED
                           </div>
                       </div>
                       <button className="mt-8 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold flex items-center gap-2 transition shadow-lg shadow-brand-500/20">
                           <Download size={20} /> Download Result
                       </button>
                   </div>
               ) : (
                   <div className="text-center">
                       {status === JobStatus.IDLE ? (
                           <div className="text-slate-600">
                               <div className="w-20 h-20 border-2 border-slate-800 border-dashed rounded-full mx-auto mb-4 flex items-center justify-center">
                                   <Play className="text-slate-700 ml-1" size={32} />
                               </div>
                               <p>Preview will appear here after processing</p>
                           </div>
                       ) : (
                           <div className="w-full max-w-md mx-auto px-6">
                               <div className="mb-4 flex justify-between text-sm text-slate-300 font-medium">
                                   <span>{status === JobStatus.TRAINING ? 'Training Model...' : 'Processing...'}</span>
                                   <span>{Math.round(progress)}%</span>
                               </div>
                               <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                   <div 
                                     className="h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300 ease-out"
                                     style={{ width: `${progress}%` }}
                                   />
                               </div>
                               <p className="mt-4 text-xs text-slate-500 animate-pulse text-center">
                                   Running on Cloud Node US-EAST-4 (NVIDIA A100)
                               </p>
                           </div>
                       )}
                   </div>
               )}
            </div>
          </div>

          {/* Right Panel: Settings & Logs */}
          <div className="flex flex-col gap-6">
             {/* Settings Mock */}
             <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <h3 className="text-white font-semibold flex items-center gap-2 mb-6">
                    <Settings size={18} className="text-slate-400" /> Configuration
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Model Architecture</label>
                        <select className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg p-2.5 focus:ring-1 focus:ring-brand-500 outline-none">
                            <option>DF-UDT (Ultra High Res)</option>
                            <option>QuickSwap (Fast)</option>
                            <option>SimSwap V2</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Output Quality</label>
                        <div className="flex gap-2">
                             <button className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs rounded hover:bg-slate-700">720p</button>
                             <button className="flex-1 py-2 bg-brand-600 text-white text-xs rounded shadow-lg shadow-brand-500/20">1080p</button>
                             <button className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs rounded hover:bg-slate-700">4K</button>
                        </div>
                    </div>
                    <div>
                         <label className="block text-xs font-medium text-slate-400 mb-1">Face Enhancement</label>
                         <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                             <span className="text-sm text-slate-300">GPEN-BFR</span>
                             <div className="w-10 h-5 bg-brand-600 rounded-full relative cursor-pointer">
                                 <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1"></div>
                             </div>
                         </div>
                    </div>
                </div>
             </div>

             {/* Terminal Logs */}
             <div className="flex-1 bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden flex flex-col min-h-[300px]">
                <div className="bg-slate-900/80 p-3 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                        <Terminal size={14} /> SYSTEM LOGS
                    </span>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto terminal-scroll font-mono text-xs space-y-1.5">
                    {logs.length === 0 && (
                        <div className="text-slate-600 italic">Waiting for job to start...</div>
                    )}
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="text-slate-600">[{log.timestamp}]</span>
                            <span className={
                                log.level === 'INFO' ? 'text-blue-400' :
                                log.level === 'SUCCESS' ? 'text-green-400' :
                                log.level === 'WARN' ? 'text-yellow-400' : 'text-red-400'
                            }>{log.message}</span>
                        </div>
                    ))}
                    <div ref={logsEndRef} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
