'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Competitor } from '@/lib/types';
import { Star, TrendingUp, Users, ExternalLink, Check } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatNumber } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CompetitorCardProps {
  competitor: Competitor;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
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
      // Only prevent selection if max is reached and this item is not already selected
      if (!isMaxSelected || isSelected) {
        onToggleSelect(competitor.id);
      }
    }
  };

  const cardContent = (
    <div
      className={`glass rounded-2xl p-6 h-full transition-all border ${
        isSelected
          ? 'border-primary shadow-lg ring-2 ring-primary/20'
          : 'border-transparent hover:border-primary/20'
      } ${
        isSelectionMode && !isSelected && isMaxSelected
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:shadow-lg'
      }`}
    >
      {/* Selection Checkbox */}
      {isSelectionMode && (
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
              isSelected
                ? 'bg-primary border-primary'
                : isMaxSelected
                  ? 'border-gray-300 bg-gray-100'
                  : 'border-gray-400 hover:border-primary'
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
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
      )}

      {/* Completeness */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Data Completeness</span>
          <span className="font-medium">{competitor.completeness}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all"
            style={{ width: `${competitor.completeness}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: isSelectionMode && !isSelected && isMaxSelected ? 0 : -4 }}
      className="group"
      onClick={handleClick}
    >
      {isSelectionMode ? (
        <div className="cursor-pointer">
          {cardContent}
        </div>
      ) : (
        <Link href={`/competitors/${competitor.id}`}>
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}
