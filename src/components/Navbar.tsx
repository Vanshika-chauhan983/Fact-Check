"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How it works", href: "/how-it-works" },
  ];

  return (
    <nav className="flex justify-between items-center mb-16 relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity relative z-50">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-primary">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tighter">TRUTH LAYER</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-foreground/80 hover:text-primary transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
        <button className="btn-primary py-2 px-6 ml-4">
          Get Started <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-foreground p-2 relative z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 glass p-6 rounded-2xl flex flex-col gap-6 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="btn-primary py-3 px-6 w-full justify-center">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
