import { GoogleGenAI } from "@google/genai";

// Helpers for base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const ensureApiKey = async () => {
  if (!window.aistudio) return;
  const hasKey = await window.aistudio.hasSelectedApiKey();
  if (!hasKey) {
    await window.aistudio.openSelectKey();
  }
}

// Veo Video Generation
export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9'): Promise<string> => {
  await ensureApiKey();
  // Always create new instance to pick up key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  // Polling loop
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5s poll
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) throw new Error("No video generated");

  // Append key for fetching
  return `${videoUri}&key=${process.env.API_KEY}`;
};

// Image Editing (Magic Editor)
export const editImage = async (base64Image: string, prompt: string): Promise<string> => {
   // Use gemini-2.5-flash-image for editing/generation
   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
   
   const response = await ai.models.generateContent({
     model: 'gemini-2.5-flash-image',
     contents: {
       parts: [
         {
           inlineData: {
             mimeType: 'image/png', // Assuming PNG or JPEG, model is flexible
             data: base64Image
           }
         },
         {
           text: prompt
         }
       ]
     }
   });

   // Extract image
   for (const part of response.candidates?.[0]?.content?.parts || []) {
     if (part.inlineData) {
       return `data:image/png;base64,${part.inlineData.data}`;
     }
   }
   
   throw new Error("No image generated from edit request");
};
