import { Competitor } from '@/lib/types';
import { Code2, Server, Shield, Smartphone } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';

interface TechnologySectionProps {
  competitor: Competitor;
}

export function TechnologySection({ competitor }: TechnologySectionProps) {
  const tech = competitor.technology;

  if (!tech) return null;

  return (
    <Section
      title="Technology"
      subtitle="Tech stack and infrastructure"
      icon={<Code2 className="w-5 h-5" />}
    >
      <div className="space-y-5 pt-4">
        {/* Frontend */}
        {tech.frontend && tech.frontend.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Frontend</p>
            </div>
            <div className="space-y-2">
              {tech.frontend.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2">
                  <p className="text-sm">{item.value}</p>
                  <ConfidenceBadge confidence={item.confidence} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backend */}
        {tech.backend && tech.backend.length > 0 && (
          <div className="pt-3 border-t border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Backend</p>
            </div>
            <div className="space-y-2">
              {tech.backend.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2">
                  <p className="text-sm">{item.value}</p>
                  <ConfidenceBadge confidence={item.confidence} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Infrastructure */}
        {tech.infrastructure && tech.infrastructure.length > 0 && (
          <div className="pt-3 border-t border-border/30">
            <p className="text-sm font-medium mb-2">Infrastructure</p>
            <div className="space-y-2">
              {tech.infrastructure.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2">
                  <p className="text-sm">{item.value}</p>
                  <ConfidenceBadge confidence={item.confidence} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security */}
        {tech.security && tech.security.length > 0 && (
          <div className="pt-3 border-t border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Security & Compliance</p>
            </div>
            <div className="space-y-2">
              {tech.security.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2">
                  <p className="text-sm">{item.value}</p>
                  <ConfidenceBadge confidence={item.confidence} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Apps */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium">Mobile Apps</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-muted/50 rounded">
              <p className="text-xs text-muted-foreground">iOS</p>
              <p className="text-sm font-semibold">
                {tech.mobileApps.ios.value ? 'Available' : 'Not Available'}
              </p>
            </div>
            <div className="p-2 bg-muted/50 rounded">
              <p className="text-xs text-muted-foreground">Android</p>
              <p className="text-sm font-semibold">
                {tech.mobileApps.android.value ? 'Available' : 'Not Available'}
              </p>
            </div>
          </div>
        </div>

        {/* API */}
        <div className="pt-3 border-t border-border/30">
          <p className="text-sm font-medium mb-2">API Availability</p>
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm">{tech.apiAvailability.value}</p>
            <ConfidenceBadge confidence={tech.apiAvailability.confidence} />
          </div>
        </div>
      </div>
    </Section>
  );
}
