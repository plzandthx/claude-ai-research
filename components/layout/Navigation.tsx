'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MessageSquare, Menu, X } from 'lucide-react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-semibold">
                SurveyMonkey <span className="text-muted-foreground">Intelligence</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Overview
            </Link>
            <Link href="/competitors" className="text-sm font-medium hover:text-primary">
              Competitors
            </Link>
            <Link href="/chat" className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">AI Assistant</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Overview
            </Link>
            <Link
              href="/competitors"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Competitors
            </Link>
            <Link
              href="/chat"
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">AI Assistant</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
