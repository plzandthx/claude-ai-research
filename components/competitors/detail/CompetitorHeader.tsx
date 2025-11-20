'use client';

import { Competitor } from '@/lib/types';
import { ExternalLink, Calendar, MapPin, Users } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge';
import { formatNumber } from '@/lib/utils';

interface CompetitorHeaderProps {
  competitor: Competitor;
}

export function CompetitorHeader({ competitor }: CompetitorHeaderProps) {
  const { basics } = competitor;

  return (
    <div className="border-b border-border/40 bg-gradient-to-br from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden border border-border/20">
            <img
              src={basics.logo}
              alt={basics.name}
              className="w-20 h-20 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${basics.name}&background=random&size=200`;
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{basics.name}</h1>
              <div className="flex items-center gap-2">
                <p className="text-lg text-muted-foreground">{basics.industry.value}</p>
                <ConfidenceBadge confidence={basics.industry.confidence} />
              </div>
            </div>

            <p className="text-muted-foreground max-w-3xl">
              {basics.description.value}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{basics.headquarters.value}</span>
                <ConfidenceBadge confidence={basics.headquarters.confidence} />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Founded {basics.foundedYear.value}</span>
                <ConfidenceBadge confidence={basics.foundedYear.confidence} />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{formatNumber(basics.numberOfEmployees.value)} employees</span>
                <ConfidenceBadge confidence={basics.numberOfEmployees.confidence} />
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2">
              <a
                href={basics.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 text-sm font-medium"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>

              {basics.socialMedia?.linkedin && (
                <a
                  href={basics.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium"
                >
                  LinkedIn
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
