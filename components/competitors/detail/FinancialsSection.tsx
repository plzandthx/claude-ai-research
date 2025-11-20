import { Competitor } from '@/lib/types';
import { DollarSign, TrendingUp, Building2 } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatCurrency, formatDate } from '@/lib/utils';

interface FinancialsSectionProps {
  competitor: Competitor;
}

export function FinancialsSection({ competitor }: FinancialsSectionProps) {
  const { financials } = competitor;

  if (!financials) return null;

  return (
    <Section
      title="Financials"
      subtitle="Funding, revenue, and financial metrics"
      icon={<DollarSign className="w-5 h-5" />}
    >
      <div className="space-y-6 pt-4">
        {/* Public Status */}
        <div className="flex items-start justify-between py-3 border-b border-border/30">
          <div>
            <p className="font-medium">Public Status</p>
            <p className="text-sm text-muted-foreground mt-1">
              {financials.isPublic.value ? 'Publicly Traded' : 'Private Company'}
            </p>
            {financials.stockSymbol && (
              <p className="text-sm text-muted-foreground mt-1">
                Symbol: {financials.stockSymbol.value}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <ConfidenceBadge confidence={financials.isPublic.confidence} showLabel />
            {financials.isPublic.sourceUrl && (
              <a
                href={financials.isPublic.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Source
              </a>
            )}
          </div>
        </div>

        {/* Valuation */}
        {financials.valuation && (
          <div className="flex items-start justify-between py-3 border-b border-border/30">
            <div>
              <p className="font-medium">Valuation</p>
              <p className="text-2xl font-bold mt-1">
                {formatCurrency(financials.valuation.value)}
              </p>
              {financials.valuation.notes && (
                <p className="text-xs text-muted-foreground mt-1">
                  {financials.valuation.notes}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <ConfidenceBadge confidence={financials.valuation.confidence} showLabel />
              <a
                href={financials.valuation.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Source
              </a>
            </div>
          </div>
        )}

        {/* Total Funding */}
        {financials.totalFunding && (
          <div className="flex items-start justify-between py-3 border-b border-border/30">
            <div>
              <p className="font-medium">Total Funding</p>
              <p className="text-2xl font-bold mt-1">
                {formatCurrency(financials.totalFunding.value)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <ConfidenceBadge confidence={financials.totalFunding.confidence} showLabel />
              <a
                href={financials.totalFunding.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Source
              </a>
            </div>
          </div>
        )}

        {/* Quarterly Earnings */}
        {financials.quarterlyEarnings && financials.quarterlyEarnings.length > 0 && (
          <div>
            <p className="font-medium mb-3">Recent Earnings</p>
            <div className="space-y-2">
              {financials.quarterlyEarnings.map((earnings, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {earnings.quarter} {earnings.year}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold">
                      {formatCurrency(earnings.revenue.value)}
                    </p>
                    <ConfidenceBadge confidence={earnings.revenue.confidence} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
