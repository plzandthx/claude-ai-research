import { Competitor } from '@/lib/types';
import { Megaphone } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';

interface MarketingSectionProps {
  competitor: Competitor;
}

export function MarketingSection({ competitor }: MarketingSectionProps) {
  const marketing = competitor.marketing;

  if (!marketing) return null;

  return (
    <Section
      title="Marketing & Positioning"
      subtitle="Brand identity and market strategy"
      icon={<Megaphone className="w-5 h-5" />}
    >
      <div className="space-y-5 pt-4">
        {/* Brand Identity */}
        <div>
          <p className="font-medium mb-3">Brand Identity</p>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tagline</p>
                <p className="text-base italic">"{marketing.brandIdentity.tagline.value}"</p>
              </div>
              <ConfidenceBadge confidence={marketing.brandIdentity.tagline.confidence} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Brand Colors</p>
              <div className="flex gap-2">
                {marketing.brandIdentity.colors.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-lg border border-border/50 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-muted-foreground">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tone</p>
                <p className="text-sm">{marketing.brandIdentity.tone.value}</p>
              </div>
              <ConfidenceBadge confidence={marketing.brandIdentity.tone.confidence} />
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        {marketing.valuePropositions && marketing.valuePropositions.length > 0 && (
          <div className="pt-3 border-t border-border/30">
            <p className="font-medium mb-3">Value Propositions</p>
            <div className="space-y-2">
              {marketing.valuePropositions.map((vp, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-lg">✓</span>
                  <div className="flex-1">
                    <p className="text-sm">{vp.value}</p>
                  </div>
                  <ConfidenceBadge confidence={vp.confidence} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Differentiators */}
        {marketing.differentiators && marketing.differentiators.length > 0 && (
          <div className="pt-3 border-t border-border/30">
            <p className="font-medium mb-3">Key Differentiators</p>
            <div className="space-y-2">
              {marketing.differentiators.map((diff, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <span className="text-lg">⭐</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{diff.value}</p>
                  </div>
                  <ConfidenceBadge confidence={diff.confidence} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO & Content Strategy */}
        <div className="pt-3 border-t border-border/30 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">SEO Strategy</p>
              <p className="text-sm text-muted-foreground mt-1">
                {marketing.seoStrategy.value}
              </p>
            </div>
            <ConfidenceBadge confidence={marketing.seoStrategy.confidence} />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">Content Strategy</p>
              <p className="text-sm text-muted-foreground mt-1">
                {marketing.contentStrategy.value}
              </p>
            </div>
            <ConfidenceBadge confidence={marketing.contentStrategy.confidence} />
          </div>
        </div>
      </div>
    </Section>
  );
}
