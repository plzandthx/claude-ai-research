import { competitors } from '@/data/competitors';
import { CompetitorCard } from '@/components/competitors/CompetitorCard';
import { Search } from 'lucide-react';

export default function CompetitorsPage() {
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

        {/* Search (placeholder for now) */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search competitors..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((competitor) => (
            <CompetitorCard key={competitor.id} competitor={competitor} />
          ))}
        </div>
      </div>
    </div>
  );
}
