import { Competitor } from '@/lib/types';
import { TrendingUp, Users, DollarSign, Star, BarChart } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface CompetitorOverviewProps {
  competitor: Competitor;
}

export function CompetitorOverview({ competitor }: CompetitorOverviewProps) {
  const { financials, reviews, basics } = competitor;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Employees */}
      <div className="glass rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <ConfidenceBadge confidence={basics.numberOfEmployees.confidence} showLabel />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Employees</p>
          <p className="text-2xl font-bold">{formatNumber(basics.numberOfEmployees.value)}</p>
        </div>
      </div>

      {/* Valuation */}
      {financials?.valuation && (
        <div className="glass rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <ConfidenceBadge confidence={financials.valuation.confidence} showLabel />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valuation</p>
            <p className="text-2xl font-bold">
              {formatCurrency(financials.valuation.value)}
            </p>
          </div>
        </div>
      )}

      {/* Rating */}
      {reviews && (
        <div className="glass rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Overall Rating</p>
            <p className="text-2xl font-bold">{reviews.aggregatedRating.toFixed(1)}/5.0</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber(reviews.totalReviewsAcrossPlatforms)} reviews
            </p>
          </div>
        </div>
      )}

      {/* Completeness */}
      <div className="glass rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <BarChart className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Data Completeness</p>
          <p className="text-2xl font-bold">{competitor.completeness}%</p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: `${competitor.completeness}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
