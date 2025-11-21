'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Competitor } from '@/lib/types';
import { Star, TrendingUp, Users, ExternalLink, Check } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatNumber } from '@/lib/utils';

interface CompetitorCardProps {
  competitor: Competitor;
  isSelected?: boolean;
  onToggleSelect?: (competitorId: string) => void;
  isSelectionMode?: boolean;
  isMaxSelected?: boolean;
}

export function CompetitorCard({
  competitor,
  isSelected = false,
  onToggleSelect,
  isSelectionMode = false,
  isMaxSelected = false
}: CompetitorCardProps) {
  const { basics, reviews, financials } = competitor;

  const handleClick = (e: React.MouseEvent) => {
    if (isSelectionMode && onToggleSelect) {
      e.preventDefault();
      // Only allow selection if not at max or if deselecting
      if (!isMaxSelected || isSelected) {
        onToggleSelect(competitor.id);
      }
    }
  };

  return (
    <div className="group relative transition-all hover:-translate-y-1"
    >
      <Link href={`/competitors/${competitor.id}`} onClick={handleClick}>
        <div className={`glass rounded-2xl p-6 h-full hover:shadow-lg transition-all border ${
          isSelected
            ? 'border-primary/50 ring-2 ring-primary/20'
            : 'border-transparent hover:border-primary/20'
        } ${isSelectionMode && isMaxSelected && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}>

          {/* Selection Checkbox */}
          {isSelectionMode && (
            <div className="absolute top-4 right-4 z-10">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-primary border-primary'
                  : 'border-muted-foreground/30 bg-white'
              }`}>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>
          )}
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img
                  src={basics.logo}
                  alt={basics.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${basics.name}&background=random`;
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {basics.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {basics.industry.value}
                </p>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          {isMaxSelected && !isSelected && (
            <span className="text-xs text-muted-foreground">Max reached</span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src={basics.logo}
              alt={basics.name}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${basics.name}&background=random`;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {basics.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {basics.industry.value}
            </p>
          </div>
        </div>
        {!isSelectionMode && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {basics.description.value}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs">Employees</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">
              {formatNumber(basics.numberOfEmployees.value)}
            </p>
            <ConfidenceBadge confidence={basics.numberOfEmployees.confidence} />
          </div>
        </div>

        {reviews && (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-3.5 h-3.5" />
              <span className="text-xs">Rating</span>
            </div>
            <p className="text-sm font-semibold">
              {reviews.aggregatedRating.toFixed(1)} / 5.0
            </p>
          </div>
        )}
      </div>

      {/* Valuation if available */}
      {financials?.valuation && (
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-xs">Valuation</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                ${(financials.valuation.value / 1000000000).toFixed(1)}B
              </p>
              <ConfidenceBadge confidence={financials.valuation.confidence} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
