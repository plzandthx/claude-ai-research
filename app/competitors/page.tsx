'use client';

import { useState, useMemo } from 'react';
import { competitors } from '@/data/competitors';
import { CompetitorCard } from '@/components/competitors/CompetitorCard';
import { Search } from 'lucide-react';

export default function CompetitorsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter competitors based on search query
  const filteredCompetitors = useMemo(() => {
    if (!searchQuery.trim()) {
      return competitors;
    }

    const query = searchQuery.toLowerCase();
    return competitors.filter((competitor) => {
      // Search in name
      if (competitor.basics.name.toLowerCase().includes(query)) {
        return true;
      }
      // Search in industry
      if (competitor.basics.industry.value?.toString().toLowerCase().includes(query)) {
        return true;
      }
      // Search in description
      if (competitor.basics.description.value?.toString().toLowerCase().includes(query)) {
        return true;
      }
      // Search in headquarters location
      if (competitor.basics.headquarters.value?.toString().toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
  }, [searchQuery]);

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

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-muted-foreground">
              Found {filteredCompetitors.length} competitor{filteredCompetitors.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>

        {/* Grid */}
        {filteredCompetitors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitors.map((competitor) => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No competitors found matching "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching for a company name, industry, or location
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
