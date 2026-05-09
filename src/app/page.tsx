"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Activity, ChevronRight } from 'lucide-react';
import UploadZone from '@/components/UploadZone';
import ClaimCard from '@/components/ClaimCard';
import Navbar from '@/components/Navbar';
import { Claim } from '@/lib/fact-checker';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setClaims([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/fact-check', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDF');
      }

      const data = await response.json();
      setClaims(data.claims);
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    verified: claims.filter(c => c.status === 'Verified').length,
    inaccurate: claims.filter(c => c.status === 'Inaccurate').length,
    false: claims.filter(c => c.status === 'False').length,
  };

  return (
    <main className="container mx-auto px-6 py-12 min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
            <Activity className="w-3 h-3" />
            <span>LIVE WEB DATA ENABLED</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.1]">
            Automated <span className="text-primary">Fact-Checking</span> <br /> for Modern Content.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Marketing content often contains outdated or hallucinated stats. 
            Truth Layer acts as a "Truth Layer" reading your PDFs and cross-referencing claims against real-time data.
          </p>
        </motion.div>
      </section>

      {/* Upload Area */}
      <section className="mb-24">
        <UploadZone onUpload={handleUpload} isLoading={isLoading} />
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-red-500 text-center mt-4 font-medium"
          >
            {error}
          </motion.p>
        )}
      </section>

      {/* Results Dashboard */}
      <AnimatePresence>
        {claims.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Verification Report</h2>
                <p className="text-muted-foreground">Found {claims.length} claims in the document.</p>
              </div>
              
              <div className="flex gap-4">
                <div className="glass p-3 px-6 text-center">
                  <div className="text-2xl font-bold text-green-500">{stats.verified}</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Verified</div>
                </div>
                <div className="glass p-3 px-6 text-center">
                  <div className="text-2xl font-bold text-amber-500">{stats.inaccurate}</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Inaccurate</div>
                </div>
                <div className="glass p-3 px-6 text-center">
                  <div className="text-2xl font-bold text-red-500">{stats.false}</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">False</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {claims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="font-bold tracking-tighter text-foreground">TRUTH LAYER</span>
        </div>
        <p>© 2026 Truth Layer AI. Built for accuracy, backed by real-time data.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors"><Activity className="w-5 h-5" /></a>
        </div>
      </footer>
    </main>
  );
}
