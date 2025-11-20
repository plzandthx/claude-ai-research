import { Competitor } from '@/lib/types';
import { Milestone as MilestoneIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatDate } from '@/lib/utils';

interface MilestonesSectionProps {
  competitor: Competitor;
}

const milestoneIcons: Record<string, string> = {
  ipo: '📈',
  funding: '💰',
  product: '🚀',
  partnership: '🤝',
  acquisition: '🏢',
  'strategic-shift': '🎯',
  other: '📌',
};

const impactColors: Record<string, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-blue-500',
};

export function MilestonesSection({ competitor }: MilestonesSectionProps) {
  const milestones = competitor.milestones.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Section
      title="Milestones"
      subtitle="Key events and strategic moments"
      icon={<MilestoneIcon className="w-5 h-5" />}
    >
      <div className="space-y-4 pt-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`border-l-4 ${impactColors[milestone.impact]} pl-4 py-2`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{milestoneIcons[milestone.category]}</span>
                  <h4 className="font-semibold">{milestone.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {milestone.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-muted-foreground">
                    {formatDate(milestone.date)}
                  </span>
                  <span className="px-2 py-0.5 bg-muted rounded-full capitalize">
                    {milestone.category.replace('-', ' ')}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full capitalize ${
                      milestone.impact === 'high'
                        ? 'bg-red-100 text-red-700'
                        : milestone.impact === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {milestone.impact} impact
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <ConfidenceBadge confidence={milestone.confidence} showLabel />
                <a
                  href={milestone.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Source
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
