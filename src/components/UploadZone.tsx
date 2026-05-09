"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export default function UploadZone({ onUpload, isLoading }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        {...getRootProps()} 
        className={`relative overflow-hidden glass-card p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive ? 'border-primary ring-2 ring-primary/20 scale-[1.02]' : 'border-white/10'
        }`}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <div className="scanning-line" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Scanning Truth...</h3>
                <p className="text-muted-foreground">Extracting and verifying claims against live data.</p>
              </div>
            </motion.div>
          ) : file ? (
            <motion.div 
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-2xl bg-primary/10">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{file.name}</h3>
                <p className="text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button className="btn-primary mt-2">
                Re-upload
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Drop your PDF here</h3>
                <p className="text-muted-foreground">Upload marketing content or reports to fact-check</p>
              </div>
              <p className="text-xs text-muted-foreground/50 mt-4 uppercase tracking-widest font-bold">
                Supported format: PDF
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
