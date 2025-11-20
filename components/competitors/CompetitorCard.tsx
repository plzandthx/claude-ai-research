'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Competitor } from '@/lib/types';
import { Star, TrendingUp, Users, ExternalLink } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatNumber } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CompetitorCardProps {
  competitor: Competitor;
}

export function CompetitorCard({ competitor }: CompetitorCardProps) {
  const { basics, reviews, financials } = competitor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/competitors/${competitor.id}`}>
        <div className="glass rounded-2xl p-6 h-full hover:shadow-lg transition-all border border-transparent hover:border-primary/20">
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
      </Link>
    </motion.div>
  );
}
