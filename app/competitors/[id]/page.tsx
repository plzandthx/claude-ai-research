import { notFound } from 'next/navigation';
import { competitors } from '@/data/competitors';
import { CompetitorHeader } from '@/components/competitors/detail/CompetitorHeader';
import { CompetitorOverview } from '@/components/competitors/detail/CompetitorOverview';
import { FinancialsSection } from '@/components/competitors/detail/FinancialsSection';
import { MilestonesSection } from '@/components/competitors/detail/MilestonesSection';
import { ProductsSection } from '@/components/competitors/detail/ProductsSection';
import { PricingSection } from '@/components/competitors/detail/PricingSection';
import { TechnologySection } from '@/components/competitors/detail/TechnologySection';
import { MarketingSection } from '@/components/competitors/detail/MarketingSection';
import { ClaimsSection } from '@/components/competitors/detail/ClaimsSection';
import { ReviewsSection } from '@/components/competitors/detail/ReviewsSection';

export async function generateStaticParams() {
  return competitors.map((competitor) => ({
    id: competitor.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function CompetitorDetailPage({ params }: PageProps) {
  const competitor = competitors.find((c) => c.id === params.id);

  if (!competitor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <CompetitorHeader competitor={competitor} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <CompetitorOverview competitor={competitor} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProductsSection competitor={competitor} />
            <PricingSection competitor={competitor} />
            <MilestonesSection competitor={competitor} />
            <MarketingSection competitor={competitor} />
          </div>

          <div className="space-y-8">
            <FinancialsSection competitor={competitor} />
            <TechnologySection competitor={competitor} />
            <ClaimsSection competitor={competitor} />
          </div>
        </div>

        <ReviewsSection competitor={competitor} />
      </div>
    </div>
  );
}
