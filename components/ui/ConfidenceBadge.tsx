import { Check } from 'lucide-react';
import { ConfidenceLevel } from '@/lib/types';
import { getConfidenceBgColor } from '@/lib/utils';

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel;
  showLabel?: boolean;
}

export function ConfidenceBadge({ confidence, showLabel = false }: ConfidenceBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      {confidence === 'high' ? (
        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      ) : (
        <div className={`w-2 h-2 rounded-full ${getConfidenceBgColor(confidence)}`} />
      )}
      {showLabel && (
        <span className={`text-xs font-medium ${
          confidence === 'high' ? 'text-green-600' :
          confidence === 'medium' ? 'text-yellow-600' :
          'text-red-600'
        }`}>
          {confidence === 'high' ? 'High confidence' :
           confidence === 'medium' ? 'Medium confidence' :
           'Low confidence'}
        </span>
      )}
    </div>
  );
}
