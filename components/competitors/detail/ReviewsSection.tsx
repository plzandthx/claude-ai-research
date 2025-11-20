import { Competitor } from '@/lib/types';
import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatNumber } from '@/lib/utils';

interface ReviewsSectionProps {
  competitor: Competitor;
}

const trendIcons = {
  improving: <TrendingUp className="w-4 h-4 text-green-600" />,
  declining: <TrendingDown className="w-4 h-4 text-red-600" />,
  stable: <Minus className="w-4 h-4 text-yellow-600" />,
};

export function ReviewsSection({ competitor }: ReviewsSectionProps) {
  const reviews = competitor.reviews;

  if (!reviews) return null;

  return (
    <Section
      title="Reviews & Ratings"
      subtitle="Customer feedback across platforms"
      icon={<Star className="w-5 h-5" />}
    >
      <div className="space-y-6 pt-4">
        {/* Overall Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{reviews.aggregatedRating.toFixed(1)}</span>
              <span className="text-lg text-muted-foreground">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-4 h-4 ${
                    idx < Math.round(reviews.aggregatedRating)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total Reviews</p>
            <p className="text-4xl font-bold">
              {formatNumber(reviews.totalReviewsAcrossPlatforms)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Across all platforms</p>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Sentiment</p>
            <p className="text-2xl font-bold capitalize">{reviews.overallSentiment}</p>
            <p className="text-xs text-muted-foreground mt-2">Overall feedback tone</p>
          </div>
        </div>

        {/* Platform Reviews */}
        <div className="space-y-4">
          <h3 className="font-medium">Reviews by Platform</h3>
          {reviews.reviews.map((review, idx) => (
            <div key={idx} className="p-5 border border-border/50 rounded-xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{review.platform}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{review.rating.value}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatNumber(review.totalReviews.value)} reviews
                    </span>
                    <div className="flex items-center gap-1">
                      {trendIcons[review.recentTrend]}
                      <span className="text-xs capitalize">{review.recentTrend}</span>
                    </div>
                  </div>
                </div>
                <ConfidenceBadge confidence={review.rating.confidence} showLabel />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">
                    ✓ Common Praises
                  </p>
                  <ul className="space-y-1">
                    {review.commonPraises.map((praise, pIdx) => (
                      <li key={pIdx} className="text-sm text-muted-foreground">
                        • {praise}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-700 mb-2">
                    ✗ Common Complaints
                  </p>
                  <ul className="space-y-1">
                    {review.commonComplaints.map((complaint, cIdx) => (
                      <li key={cIdx} className="text-sm text-muted-foreground">
                        • {complaint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-border/30">
                <span className="text-muted-foreground">
                  Last updated: {review.lastUpdated}
                </span>
                <a
                  href={review.rating.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View on {review.platform}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights */}
        {reviews.keyInsights && reviews.keyInsights.length > 0 && (
          <div className="pt-3 border-t border-border/30">
            <h3 className="font-medium mb-3">Key Insights</h3>
            <div className="space-y-2">
              {reviews.keyInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-lg">💡</span>
                  <div className="flex-1">
                    <p className="text-sm">{insight.value}</p>
                  </div>
                  <ConfidenceBadge confidence={insight.confidence} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
