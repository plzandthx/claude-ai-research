'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { competitors } from '@/data/competitors';
import { Competitor } from '@/lib/types';
import { X, Lock, Unlock, Plus, ArrowLeft } from 'lucide-react';
import { CompareColumn } from '@/components/competitors/compare/CompareColumn';
import { AddCompetitorDialog } from '@/components/competitors/compare/AddCompetitorDialog';

function ComparePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCompetitors, setSelectedCompetitors] = useState<Competitor[]>([]);
  const [lockedColumnId, setLockedColumnId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      const idArray = ids.split(',');
      const selected = competitors.filter((c) => idArray.includes(c.id));
      setSelectedCompetitors(selected);
    }
  }, [searchParams]);

  const handleRemoveCompetitor = (competitorId: string) => {
    setSelectedCompetitors((prev) => prev.filter((c) => c.id !== competitorId));
    if (lockedColumnId === competitorId) {
      setLockedColumnId(null);
    }
  };

  const handleToggleLock = (competitorId: string) => {
    setLockedColumnId((prev) => (prev === competitorId ? null : competitorId));
  };

  const handleAddCompetitor = (competitor: Competitor) => {
    if (selectedCompetitors.length < 4 && !selectedCompetitors.find((c) => c.id === competitor.id)) {
      setSelectedCompetitors((prev) => [...prev, competitor]);
    }
    setIsAddDialogOpen(false);
  };

  const availableCompetitors = competitors.filter(
    (c) => !selectedCompetitors.find((sc) => sc.id === c.id)
  );

  const emptySlots = Math.max(0, 4 - selectedCompetitors.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="glass border-b border-border/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/competitors')}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Competitors</span>
              </button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold">Compare Competitors</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedCompetitors.length} of 4 selected
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* Locked Column (if any) */}
          {lockedColumnId && selectedCompetitors.find((c) => c.id === lockedColumnId) && (
            <div className="flex-shrink-0 sticky left-0 z-30 bg-gradient-to-br from-slate-50 via-white to-slate-100 pr-4">
              <CompareColumn
                competitor={selectedCompetitors.find((c) => c.id === lockedColumnId)!}
                isLocked={true}
                onRemove={handleRemoveCompetitor}
                onToggleLock={handleToggleLock}
              />
            </div>
          )}

          {/* Scrollable Columns */}
          <div className="flex gap-4">
            {selectedCompetitors
              .filter((c) => c.id !== lockedColumnId)
              .map((competitor) => (
                <div
                  key={competitor.id}
                  className="flex-shrink-0 transition-all duration-200"
                >
                  <CompareColumn
                    competitor={competitor}
                    isLocked={false}
                    onRemove={handleRemoveCompetitor}
                    onToggleLock={handleToggleLock}
                  />
                </div>
              ))}

            {/* Empty Slots */}
            {Array.from({ length: emptySlots }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="flex-shrink-0 w-80 transition-all duration-200"
              >
                <div className="glass rounded-2xl border-2 border-dashed border-border/50 h-full min-h-[600px] flex items-center justify-center">
                  <button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="flex flex-col items-center gap-3 p-8 hover:scale-105 transition-transform"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <Plus className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-lg mb-1">Add Competitor</p>
                      <p className="text-sm text-muted-foreground">
                        Compare up to 4 competitors
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Competitor Dialog */}
      <AddCompetitorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        availableCompetitors={availableCompetitors}
        onAddCompetitor={handleAddCompetitor}
      />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}
