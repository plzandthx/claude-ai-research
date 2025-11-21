'use client';

import { useState } from 'react';
import { Competitor } from '@/lib/types';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddCompetitorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  availableCompetitors: Competitor[];
  onAddCompetitor: (competitor: Competitor) => void;
}

export function AddCompetitorDialog({
  isOpen,
  onClose,
  availableCompetitors,
  onAddCompetitor,
}: AddCompetitorDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompetitors = availableCompetitors.filter((competitor) =>
    competitor.basics.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    competitor.basics.industry.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (competitor: Competitor) => {
    onAddCompetitor(competitor);
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-border/40 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Add Competitor</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-border/40">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search competitors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                </div>
              </div>

              {/* Competitor List */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {filteredCompetitors.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg mb-2">No competitors found</p>
                    <p className="text-sm">Try adjusting your search query</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredCompetitors.map((competitor) => (
                      <motion.button
                        key={competitor.id}
                        onClick={() => handleSelect(competitor)}
                        className="glass rounded-xl p-4 text-left hover:shadow-lg hover:border-primary/20 transition-all border border-transparent"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={competitor.basics.logo}
                              alt={competitor.basics.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${competitor.basics.name}&background=random`;
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-0.5">
                              {competitor.basics.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {competitor.basics.industry.value}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                              Add
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
