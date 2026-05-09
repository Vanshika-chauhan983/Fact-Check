"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Link as LinkIcon, Info } from 'lucide-react';
import { Claim } from '@/lib/fact-checker';

interface ClaimCardProps {
  claim: Claim;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const statusStyles = {
    Verified: {
      icon: CheckCircle2,
      badge: 'badge-verified',
      border: 'border-green-500/20',
      bg: 'bg-green-500/5'
    },
    Inaccurate: {
      icon: AlertTriangle,
      badge: 'badge-inaccurate',
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/5'
    },
    False: {
      icon: XCircle,
      badge: 'badge-false',
      border: 'border-red-500/20',
      bg: 'bg-red-500/5'
    },
    Processing: {
      icon: Info,
      badge: 'badge-processing',
      border: 'border-blue-500/20',
      bg: 'bg-blue-500/5'
    }
  };

  const currentStatus = statusStyles[claim.status];
  const Icon = currentStatus.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 mb-4 border ${currentStatus.border} ${currentStatus.bg} transition-all hover:scale-[1.01]`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`badge ${currentStatus.badge}`}>
              {claim.status}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
              {claim.category}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">"{claim.claim}"</h3>
          <p className="text-sm text-muted-foreground mb-4 italic">
            Context: {claim.context}
          </p>
          
          {claim.evidence && (
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm font-medium flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" /> Evidence
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {claim.evidence}
              </p>
            </div>
          )}
        </div>
        
        {claim.sourceUrl && (
          <a 
            href={claim.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            title="View Source"
          >
            <LinkIcon className="w-5 h-5 text-primary" />
          </a>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {claim.figures.map((fig, i) => (
          <span key={i} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono">
            {fig}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
