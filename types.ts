export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  file: File;
}

export enum JobStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  TRAINING = 'TRAINING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

export enum NavItem {
  HOME = 'home',
  STUDIO = 'studio',
  TOOLS = 'tools',
  PRICING = 'pricing',
}

export interface VeoGenerationConfig {
  prompt: string;
  aspectRatio: string;
  resolution: string;
}

export interface ImageEditConfig {
  prompt: string;
  sourceImage: string | null; // base64
}
