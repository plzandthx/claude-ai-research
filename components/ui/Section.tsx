'use client';

import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  collapsible?: boolean;
}

export function Section({
  title,
  subtitle,
  icon,
  children,
  defaultExpanded = true,
  collapsible = true,
}: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
        className={`w-full px-6 py-5 flex items-center justify-between ${
          collapsible ? 'hover:bg-muted/50 cursor-pointer' : 'cursor-default'
        }`}
        disabled={!collapsible}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div className="text-left">
            <h2 className="text-xl font-semibold">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {collapsible && (
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-6 border-t border-border/40">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
