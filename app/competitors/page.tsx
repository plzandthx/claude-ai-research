'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { competitors } from '@/data/competitors';
import { CompetitorCard } from '@/components/competitors/CompetitorCard';
import { Search, ArrowRight } from 'lucide-react';

export default function CompetitorsPage() {
  const router = useRouter();
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);

  const handleToggleCompetitor = (competitorId: string) => {
    setSelectedCompetitors((prev) => {
      if (prev.includes(competitorId)) {
        return prev.filter((id) => id !== competitorId);
      } else {
        // Limit to 4 competitors
        if (prev.length >= 4) {
          return prev;
        }
        return [...prev, competitorId];
      }
    });
  };

  const handleCompare = () => {
    if (selectedCompetitors.length > 0) {
      // Navigate to comparison page with selected competitor IDs
      const ids = selectedCompetitors.join(',');
      router.push(`/competitors/compare?ids=${ids}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Competitors
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive intelligence on {competitors.length} competitors in the survey and forms market.
            Explore detailed profiles, pricing, technology stacks, and market positioning.
          </p>
        </div>

        {/* Search and Compare Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search competitors..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Compare Button */}
          {selectedCompetitors.length > 0 && (
            <button
              onClick={handleCompare}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Compare {selectedCompetitors.length} {selectedCompetitors.length === 1 ? 'Competitor' : 'Competitors'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Selection Info */}
        {selectedCompetitors.length > 0 && (
          <div className="mb-6 glass rounded-lg px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {selectedCompetitors.length} of 4 competitors selected
              {selectedCompetitors.length >= 4 && ' (maximum reached)'}
            </p>
            <button
              onClick={() => setSelectedCompetitors([])}
              className="text-sm text-primary hover:underline"
            >
              Clear selection
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((competitor) => (
            <CompetitorCard
              key={competitor.id}
              competitor={competitor}
              isSelected={selectedCompetitors.includes(competitor.id)}
              onToggleSelect={handleToggleCompetitor}
              isSelectionMode={true}
              isMaxSelected={selectedCompetitors.length >= 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
