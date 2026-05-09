"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ShieldCheck, BarChart3, ArrowRight, Zap, CheckCircle2, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "1. Upload & Parse",
      description: "Our proprietary PDF parser breaks down complex documents into logical segments, preserving tables, charts, and fine-print references that standard OCR often misses.",
      color: "from-blue-500 to-cyan-500",
      highlight: "Supports PDF, DOCX, & Web URLs"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "2. Claim Extraction",
      description: "Powered by Gemini 1.5 Flash, our AI identifies high-impact claims—focusing on statistical figures, financial projections, and technical specifications that require validation.",
      color: "from-purple-500 to-pink-500",
      highlight: "Context-Aware Identification"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "3. Live Web Sync",
      description: "We don't rely on static training data. Truth Layer performs real-time web searches via Tavily to cross-reference claims against the most current information available online.",
      color: "from-emerald-500 to-teal-500",
      highlight: "Real-Time Search Integration"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "4. Verification & Source Map",
      description: "Every claim is assigned a truth status. We provide a detailed evidence summary and direct links to primary sources, allowing you to audit the audit.",
      color: "from-amber-500 to-orange-500",
      highlight: "Direct Evidence Linking"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="container mx-auto px-6 py-12 min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-20 animate-pulse" />
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-white/10 text-xs font-bold tracking-widest text-primary mb-8">
            <Zap className="w-3 h-3 fill-current" />
            <span>OUR PROCESS REVEALED</span>
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent leading-[1.05]"
        >
          How we ensure <br /> <span className="text-primary italic">Absolute Truth.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
        >
          We've built a multi-stage verification pipeline that bridges the gap between static documents and the ever-changing web. No more hallucinations, just data-backed certainty.
        </motion.p>
      </section>

      {/* Detailed Steps */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-16 mb-40"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            <div className="glass p-[1px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
              <div className="bg-[#080808] p-10 md:p-16 rounded-[3rem] flex flex-col md:flex-row gap-16 items-start">
                {/* Icon Circle */}
                <div className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative group-hover:scale-110 transition-transform duration-500`}>
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-white relative z-10">{step.icon}</div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-6">
                    {step.highlight}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-primary transition-colors tracking-tight">{step.title}</h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>

                {/* Illustration Placeholder */}
                <div className="hidden lg:block w-72 h-48 rounded-[2rem] border border-white/5 bg-white/[0.02] relative overflow-hidden shrink-0 mt-4">
                  <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${step.color} opacity-5`} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/10 rounded-full animate-ping opacity-20" />
                </div>
              </div>
            </div>
            
            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute left-12 top-full h-12 w-[2px] bg-gradient-to-b from-primary/30 to-transparent z-0" />
            )}
          </motion.div>
        ))}
      </motion.section>

      {/* Why Choose Us - Bento Grid */}
      <section className="mb-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Reliability.</h2>
          <p className="text-muted-foreground">Why companies trust Truth Layer for their most critical content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-10 md:p-12 rounded-3xl md:col-span-2 flex flex-col justify-between group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">Zero-Hallucination Policy</h4>
              <p className="text-muted-foreground leading-relaxed">Unlike standard AI assistants, Truth Layer is strictly grounded in search results. If we can't find a source, we flag it.</p>
            </div>
          </div>
          
          <div className="glass p-10 md:p-12 rounded-3xl flex flex-col justify-center text-center bg-primary/5 border-primary/20">
            <h4 className="text-5xl font-bold text-primary mb-2">300ms</h4>
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">Avg. Response Time</p>
          </div>

          <div className="glass p-10 md:p-12 rounded-3xl flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Enterprise Security</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">SOC2 compliant data handling for your sensitive documents.</p>
            </div>
          </div>

          <div className="glass p-10 md:p-12 rounded-3xl md:col-span-2 flex flex-col justify-between overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Globe className="w-32 h-32" />
             </div>
             <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-2">Global Data Sources</h4>
                <p className="text-muted-foreground max-w-md leading-relaxed">We aggregate data from over 500,000+ verified news outlets, journals, and financial databases daily.</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mb-20">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
        <div className="glass p-16 rounded-[3rem] text-center relative overflow-hidden border border-primary/30">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to verify your content?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 1,000+ teams using Truth Layer to ensure their reports are 100% accurate.
          </p>
          <Link href="/" className="btn-primary py-4 px-10 text-lg">
            Start Fact-Checking Now <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="font-bold tracking-tighter text-foreground">TRUTH LAYER</span>
        </div>
        <p>© 2026 Truth Layer AI. Built for accuracy, backed by real-time data.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </main>
  );
}
