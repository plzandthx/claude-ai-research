'use client';

import { Competitor } from '@/lib/types';
import { X, Lock, Unlock, Users, TrendingUp, Star, Globe, MapPin, Calendar, DollarSign } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatNumber, formatCurrency } from '@/lib/utils';

interface CompareColumnProps {
  competitor: Competitor;
  isLocked: boolean;
  onRemove: (id: string) => void;
  onToggleLock: (id: string) => void;
}

export function CompareColumn({
  competitor,
  isLocked,
  onRemove,
  onToggleLock,
}: CompareColumnProps) {
  const { basics, financials, products, pricing, technology, marketing, reviews } = competitor;

  return (
    <div className={`w-80 ${isLocked ? 'shadow-xl' : ''}`}>
      <div className="glass rounded-2xl overflow-hidden border border-border/40">
        {/* Header */}
        <div className={`p-6 ${isLocked ? 'bg-gradient-to-br from-blue-500/10 to-purple-600/10' : 'bg-white/50'}`}>
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
                <h3 className="font-bold text-lg">{basics.name}</h3>
                <p className="text-xs text-muted-foreground">{basics.industry.value}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onToggleLock(competitor.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isLocked
                  ? 'bg-primary text-white'
                  : 'bg-white/80 hover:bg-white text-gray-700 border border-border'
              }`}
            >
              {isLocked ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Locked
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  Lock
                </>
              )}
            </button>
            <button
              onClick={() => onRemove(competitor.id)}
              className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto p-6 space-y-6">
          {/* Company Basics */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Overview</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Headquarters</p>
                  <p className="text-sm text-muted-foreground break-words">{basics.headquarters.value}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Founded</p>
                  <p className="text-sm text-muted-foreground">{basics.foundedYear.value}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Employees</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(basics.numberOfEmployees.value)}
                    </p>
                    <ConfidenceBadge confidence={basics.numberOfEmployees.confidence} />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Website</p>
                  <a
                    href={basics.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate block"
                  >
                    {basics.website.replace('https://', '').replace('www.', '')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Description</h4>
            <p className="text-sm text-gray-700">{basics.description.value}</p>
          </div>

          {/* Financials */}
          {financials && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Financials</h4>
              <div className="space-y-3">
                {financials.valuation && (
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Valuation</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(financials.valuation.value)}
                        </p>
                        <ConfidenceBadge confidence={financials.valuation.confidence} />
                      </div>
                    </div>
                  </div>
                )}
                {financials.totalFunding && (
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Total Funding</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(financials.totalFunding.value)}
                        </p>
                        <ConfidenceBadge confidence={financials.totalFunding.confidence} />
                      </div>
                    </div>
                  </div>
                )}
                {financials.isPublic && (
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-sm text-muted-foreground">
                        {financials.isPublic.value ? 'Public' : 'Private'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Reviews</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-lg font-bold">{reviews.aggregatedRating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">/ 5.0</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(reviews.totalReviewsAcrossPlatforms)} reviews
                </p>
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs font-medium mb-2">Top Praises:</p>
                  <ul className="space-y-1">
                    {reviews.reviews[0]?.commonPraises.slice(0, 3).map((praise, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{praise}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Pricing */}
          {pricing && pricing.tiers && pricing.tiers.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Pricing</h4>
              <div className="space-y-2">
                {pricing.tiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      tier.popular
                        ? 'border-primary bg-primary/5'
                        : 'border-border/50 bg-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold">{tier.name}</p>
                      {tier.popular && (
                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-bold">
                      {tier.price.value === 0 ? 'Free' : `$${tier.price.value}`}
                      {tier.price.value > 0 && (
                        <span className="text-xs text-muted-foreground font-normal">
                          /{tier.billingCycle}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology */}
          {technology && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Technology</h4>
              <div className="space-y-3">
                {technology.frontend && technology.frontend.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Frontend</p>
                    <p className="text-sm">{technology.frontend[0].value}</p>
                  </div>
                )}
                {technology.backend && technology.backend.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Backend</p>
                    <p className="text-sm">{technology.backend[0].value}</p>
                  </div>
                )}
                {technology.infrastructure && technology.infrastructure.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Infrastructure</p>
                    <p className="text-sm">{technology.infrastructure[0].value}</p>
                  </div>
                )}
                {technology.mobileApps && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Mobile Apps</p>
                    <div className="flex gap-2">
                      {technology.mobileApps.ios?.value && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">iOS</span>
                      )}
                      {technology.mobileApps.android?.value && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Android</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Marketing */}
          {marketing && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Marketing</h4>
              <div className="space-y-3">
                {marketing.brandIdentity?.tagline && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Tagline</p>
                    <p className="text-sm italic">&ldquo;{marketing.brandIdentity.tagline.value}&rdquo;</p>
                  </div>
                )}
                {marketing.valuePropositions && marketing.valuePropositions.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Value Propositions</p>
                    <ul className="space-y-1">
                      {marketing.valuePropositions.map((vp, i) => (
                        <li key={i} className="text-sm flex items-start gap-1">
                          <span className="text-primary mt-1">•</span>
                          <span>{vp.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Products */}
          {products && products.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Products</h4>
              <div className="space-y-2">
                {products.map((product, index) => (
                  <div key={index} className="p-3 bg-white/50 rounded-lg border border-border/50">
                    <p className="text-sm font-semibold mb-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.description.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
