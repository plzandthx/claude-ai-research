import { Competitor } from '@/lib/types';
import { DollarSign, Check } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';

interface PricingSectionProps {
  competitor: Competitor;
}

export function PricingSection({ competitor }: PricingSectionProps) {
  const pricing = competitor.pricing;

  if (!pricing) return null;

  return (
    <Section
      title="Pricing"
      subtitle="Pricing model and tiers"
      icon={<DollarSign className="w-5 h-5" />}
    >
      <div className="space-y-6 pt-4">
        {/* Pricing Model */}
        <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">PRICING MODEL</p>
            <p className="font-semibold">{pricing.model.value}</p>
          </div>
          <ConfidenceBadge confidence={pricing.model.confidence} showLabel />
        </div>

        {/* Pricing Tiers */}
        <div>
          <p className="font-medium mb-3">Available Tiers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricing.tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative p-5 border-2 rounded-xl ${
                  tier.popular
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-border/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="font-semibold text-lg mb-1">{tier.name}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      {typeof tier.price.value === 'number'
                        ? `$${tier.price.value}`
                        : tier.price.value}
                    </span>
                    {typeof tier.price.value === 'number' && (
                      <span className="text-sm text-muted-foreground">
                        /{tier.billingCycle}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <ConfidenceBadge confidence={tier.price.confidence} showLabel />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {tier.limitations && tier.limitations.length > 0 && (
                  <div className="pt-3 border-t border-border/30">
                    <p className="text-xs text-muted-foreground mb-1">Limitations:</p>
                    {tier.limitations.map((limitation, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">
                        • {limitation}
                      </p>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">{tier.targetCustomer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">FREE TRIAL</p>
            <p className="text-sm font-semibold">
              {pricing.freeTrialAvailable.value ? 'Available' : 'Not Available'}
            </p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">CUSTOM PRICING</p>
            <p className="text-sm font-semibold">
              {pricing.customPricing ? 'Available' : 'Not Available'}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
