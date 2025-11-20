import { Competitor } from '@/lib/types';
import { Package } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';

interface ProductsSectionProps {
  competitor: Competitor;
}

export function ProductsSection({ competitor }: ProductsSectionProps) {
  const products = competitor.products;

  return (
    <Section
      title="Products & Features"
      subtitle="Core offerings and capabilities"
      icon={<Package className="w-5 h-5" />}
    >
      <div className="space-y-6 pt-4">
        {products.map((product, index) => (
          <div key={index} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-start gap-2">
                <p className="text-sm text-muted-foreground flex-1">
                  {product.description.value}
                </p>
                <ConfidenceBadge confidence={product.description.confidence} />
              </div>
            </div>

            {/* Target Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  TARGET AUDIENCE
                </p>
                <div className="flex items-start gap-2">
                  <p className="text-sm flex-1">{product.targetAudience.value}</p>
                  <ConfidenceBadge confidence={product.targetAudience.confidence} />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">POSITIONING</p>
                <div className="flex items-start gap-2">
                  <p className="text-sm flex-1">{product.positioning.value}</p>
                  <ConfidenceBadge confidence={product.positioning.confidence} />
                </div>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Key Features</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="p-3 border border-border/50 rounded-lg">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium text-sm">{feature.name}</p>
                        <ConfidenceBadge confidence={feature.description.confidence} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {feature.description.value}
                      </p>
                      <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-muted rounded-full">
                        {feature.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {index < products.length - 1 && <div className="border-t border-border/30 pt-4" />}
          </div>
        ))}
      </div>
    </Section>
  );
}
