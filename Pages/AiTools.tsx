import React, { useState } from 'react';
import { Wand2, Video, RefreshCw, Image as ImageIcon, Loader2 } from 'lucide-react';
import { generateVideo, editImage, fileToBase64 } from '../services/geminiService';
import { FileUploader } from '../components/FileUploader';
import { UploadedFile } from '../types';

export const AiTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  
  // Image State
  const [sourceImage, setSourceImage] = useState<UploadedFile | null>(null);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState('');

  // Video State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState('');

  const handleImageEdit = async () => {
    if (!sourceImage || !imagePrompt) return;
    setIsImageLoading(true);
    setImageError('');
    try {
      const base64 = await fileToBase64(sourceImage.file);
      const result = await editImage(base64, imagePrompt);
      setGeneratedImage(result);
    } catch (e: any) {
      console.error(e);
      setImageError(e.message || "Failed to edit image");
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleVideoGen = async () => {
    if (!videoPrompt) return;
    setIsVideoLoading(true);
    setVideoError('');
    try {
      const videoUrl = await generateVideo(videoPrompt);
      setGeneratedVideo(videoUrl);
    } catch (e: any) {
      console.error(e);
      setVideoError(e.message || "Failed to generate video");
    } finally {
      setIsVideoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-10 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">AI Creative Suite</h1>
          <p className="text-slate-400">Powered by Google Gemini & Veo Models</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-900 p-1 rounded-lg inline-flex border border-slate-800">
            <button 
              onClick={() => setActiveTab('image')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all flex items-center gap-2
                ${activeTab === 'image' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}
              `}
            >
              <ImageIcon size={16} /> Magic Face Editor
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all flex items-center gap-2
                ${activeTab === 'video' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}
              `}
            >
              <Video size={16} /> Text-to-Video
            </button>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-10 min-h-[600px]">
          
          {/* IMAGE EDITING TAB */}
          {activeTab === 'image' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Source Image</h3>
                    <p className="text-sm text-slate-400 mb-4">Upload a portrait to modify with AI.</p>
                    <FileUploader 
                       label="Upload Portrait"
                       accept="image/*"
                       onFileSelect={(f) => { setSourceImage(f); setGeneratedImage(null); }}
                       currentFile={sourceImage}
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Magic Prompt</label>
                    <textarea 
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="E.g., Make the person smile, add glasses, change background to a beach..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 outline-none resize-none h-32"
                    />
                 </div>

                 <button 
                   onClick={handleImageEdit}
                   disabled={!sourceImage || !imagePrompt || isImageLoading}
                   className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                     ${(!sourceImage || !imagePrompt || isImageLoading)
                       ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                       : 'bg-gradient-to-r from-accent-600 to-brand-600 hover:scale-[1.02] text-white shadow-lg shadow-accent-500/25'}
                   `}
                 >
                   {isImageLoading ? <Loader2 className="animate-spin" /> : <Wand2 />} 
                   {isImageLoading ? 'Processing with Gemini...' : 'Generate Edit'}
                 </button>
                 
                 {imageError && (
                   <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                     Error: {imageError}
                   </div>
                 )}
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative min-h-[400px]">
                  {generatedImage ? (
                    <img src={generatedImage} alt="Generated" className="max-w-full max-h-full rounded-xl" />
                  ) : (
                    <div className="text-center text-slate-600 p-8">
                      {isImageLoading ? (
                         <div className="flex flex-col items-center gap-4">
                           <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                           <p className="animate-pulse">Gemini is reimagining your image...</p>
                         </div>
                      ) : (
                         <>
                           <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                           <p>Generated result will appear here</p>
                         </>
                      )}
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* VIDEO GENERATION TAB */}
          {activeTab === 'video' && (
             <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                   <h3 className="text-2xl font-bold text-white mb-2">Veo Video Generator</h3>
                   <p className="text-slate-400">Generate high-fidelity 720p videos from text descriptions.</p>
                </div>

                <div className="space-y-4">
                   <textarea 
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                      placeholder="Describe the video you want to create in detail. E.g., A cinematic drone shot of a futuristic cyberpunk city at night with neon lights..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-6 text-white text-lg placeholder-slate-500 focus:ring-2 focus:ring-brand-500 outline-none resize-none h-40"
                    />
                    
                    <button 
                      onClick={handleVideoGen}
                      disabled={!videoPrompt || isVideoLoading}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                        ${(!videoPrompt || isVideoLoading)
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-brand-600 to-accent-600 hover:scale-[1.02] text-white shadow-lg shadow-brand-500/25'}
                      `}
                    >
                      {isVideoLoading ? <Loader2 className="animate-spin" /> : <Video />} 
                      {isVideoLoading ? 'Generating with Veo (This takes ~1-2 mins)...' : 'Generate Video'}
                    </button>

                    {videoError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                        Error: {videoError}
                      </div>
                    )}
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 aspect-video flex items-center justify-center overflow-hidden relative">
                   {generatedVideo ? (
                     <video src={generatedVideo} controls className="w-full h-full object-contain" autoPlay loop />
                   ) : (
                     <div className="text-center text-slate-600">
                        {isVideoLoading ? (
                           <div className="flex flex-col items-center gap-4">
                             <div className="w-16 h-16 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                             <p className="animate-pulse">Creating your video frame by frame...</p>
                           </div>
                        ) : (
                           <>
                             <Video size={48} className="mx-auto mb-4 opacity-50" />
                             <p>Your AI masterpiece will play here</p>
                           </>
                        )}
                     </div>
                   )}
                </div>
                
                <p className="text-center text-xs text-slate-500">
                  Note: Video generation requires a paid Google Cloud Project API Key.
                </p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};
