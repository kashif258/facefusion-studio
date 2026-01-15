import React, { useRef, useState } from 'react';
import { UploadCloud, FileType, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadedFile } from '../types';

interface FileUploaderProps {
  label: string;
  accept: string;
  onFileSelect: (file: UploadedFile) => void;
  currentFile?: UploadedFile | null;
  description?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ label, accept, onFileSelect, currentFile, description }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const isVideo = file.type.startsWith('video');
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      url: URL.createObjectURL(file),
      type: isVideo ? 'video' : 'image',
      file: file
    };
    onFileSelect(uploadedFile);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out cursor-pointer group
          ${isDragging ? 'border-brand-500 bg-brand-500/10' : 'border-slate-700 hover:border-brand-400 hover:bg-slate-800'}
          ${currentFile ? 'bg-slate-800 border-green-500/50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          {currentFile ? (
            <>
              <CheckCircle className="h-10 w-10 text-green-500 mb-3" />
              <p className="text-sm font-medium text-white truncate max-w-[200px]">{currentFile.name}</p>
              <p className="text-xs text-green-400 mt-1">Ready for processing</p>
            </>
          ) : (
            <>
              <div className="bg-slate-900 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="h-6 w-6 text-brand-400" />
              </div>
              <p className="text-sm font-medium text-slate-200">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {description || "Supports high resolution files"}
              </p>
            </>
          )}
        </div>
      </div>
      
      {/* Preview if Image */}
      {currentFile && currentFile.type === 'image' && (
        <div className="mt-2 w-full h-24 rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
            <img src={currentFile.url} alt="Preview" className="w-full h-full object-cover opacity-70" />
        </div>
      )}
      {/* Preview if Video */}
      {currentFile && currentFile.type === 'video' && (
         <div className="mt-2 w-full h-24 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 relative">
            <video src={currentFile.url} className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
                <FileType className="h-8 w-8 text-white/50" />
            </div>
         </div>
      )}

    </div>
  );
};
