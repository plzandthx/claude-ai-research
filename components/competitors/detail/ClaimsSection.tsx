import { Competitor } from '@/lib/types';
import { TrendingUp } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatNumber } from '@/lib/utils';

interface ClaimsSectionProps {
  competitor: Competitor;
}

export function ClaimsSection({ competitor }: ClaimsSectionProps) {
  const claims = competitor.claims;

  if (!claims || claims.length === 0) return null;

  return (
    <Section
      title="Claims & Statistics"
      subtitle="Company-stated metrics"
      icon={<TrendingUp className="w-5 h-5" />}
    >
      <div className="space-y-3 pt-4">
        {claims.map((claim) => (
          <div key={claim.id} className="p-4 border border-border/50 rounded-lg space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-sm mb-1">{claim.claim}</p>
                <p className="text-xs text-muted-foreground">{claim.metric}</p>
              </div>
              <ConfidenceBadge confidence={claim.value.confidence} showLabel />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {typeof claim.value.value === 'number'
                  ? formatNumber(claim.value.value)
                  : claim.value.value}
              </span>
              {claim.context && (
                <span className="text-xs text-muted-foreground">{claim.context}</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-border/30">
              <span className="text-muted-foreground">
                Stated: {new Date(claim.dateStated).getFullYear()}
              </span>
              <a
                href={claim.value.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Source
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
