import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Database } from 'lucide-react';
import { competitors } from '@/data/competitors';
import { CompetitorCard } from '@/components/competitors/CompetitorCard';

export default function HomePage() {
  // Calculate aggregate metrics
  const avgCompleteness = competitors.reduce((acc, c) => acc + c.completeness, 0) / competitors.length;

  // Calculate total insights (data points) from the database
  const totalInsights = competitors.reduce((total, competitor) => {
    let insights = 0;

    // Count basic data points
    insights += 1; // name
    insights += competitor.basics.website ? 1 : 0;
    insights += competitor.basics.description ? 1 : 0;
    insights += competitor.basics.headquarters ? 1 : 0;
    insights += competitor.basics.foundedYear ? 1 : 0;
    insights += competitor.basics.numberOfEmployees.value ? 1 : 0;
    insights += competitor.basics.industry ? 1 : 0;

    // Count social media links
    if (competitor.basics.socialMedia) {
      insights += competitor.basics.socialMedia.linkedin ? 1 : 0;
      insights += competitor.basics.socialMedia.twitter ? 1 : 0;
      insights += competitor.basics.socialMedia.facebook ? 1 : 0;
      insights += competitor.basics.socialMedia.instagram ? 1 : 0;
    }

    // Count financial data points
    if (competitor.financials) {
      insights += competitor.financials.isPublic ? 1 : 0;
      insights += competitor.financials.stockSymbol ? 1 : 0;
      insights += competitor.financials.valuation?.value ? 1 : 0;
      insights += competitor.financials.totalFunding?.value ? 1 : 0;
      insights += competitor.financials.fundingRounds?.length || 0;
      insights += competitor.financials.quarterlyEarnings?.length || 0;
      insights += competitor.financials.revenueHistory?.length || 0;
    }

    // Count products
    insights += competitor.products?.length || 0;

    // Count pricing tiers
    insights += competitor.pricing?.tiers?.length || 0;

    // Count milestones
    insights += competitor.milestones?.length || 0;

    // Count technology stack items
    if (competitor.technology) {
      insights += competitor.technology.frontend ? 1 : 0;
      insights += competitor.technology.backend ? 1 : 0;
      insights += competitor.technology.infrastructure ? 1 : 0;
      insights += competitor.technology.security ? 1 : 0;
      insights += competitor.technology.integrations?.length || 0;
      insights += competitor.technology.mobileApps?.ios ? 1 : 0;
      insights += competitor.technology.mobileApps?.android ? 1 : 0;
    }

    // Count marketing insights
    if (competitor.marketing) {
      insights += competitor.marketing.brandIdentity ? 1 : 0;
      insights += competitor.marketing.valuePropositions?.length || 0;
      insights += competitor.marketing.targetMarkets?.length || 0;
      insights += competitor.marketing.differentiators?.length || 0;
      insights += competitor.marketing.marketingChannels?.length || 0;
      insights += competitor.marketing.seoStrategy ? 1 : 0;
    }

    // Count claims
    insights += competitor.claims?.length || 0;

    // Count review platforms
    insights += competitor.reviews?.reviews?.length || 0;

    return total + insights;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Live Competitor Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Competitive
              <br />
              <span className="gradient-text">Intelligence Hub</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive research and insights on SurveyMonkey's competitive landscape.
              Explore data across {competitors.length} competitors with AI-powered analysis.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                href="/competitors"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium"
              >
                Explore Competitors
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted font-medium"
              >
                Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Competitors</p>
                <p className="text-2xl font-bold">{competitors.length}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Insights</p>
                <p className="text-2xl font-bold">{totalInsights.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Completeness</p>
                <p className="text-2xl font-bold">{avgCompleteness.toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Competitors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Key Competitors</h2>
            <p className="text-muted-foreground mt-1">
              In-depth analysis of major players in the survey and forms market
            </p>
          </div>
          <Link
            href="/competitors"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.slice(0, 6).map((competitor) => (
            <CompetitorCard key={competitor.id} competitor={competitor} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/competitors"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
          >
            View All Competitors
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass rounded-3xl p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Get Instant Insights with AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask our AI assistant anything about the competitive landscape.
            Get data-driven answers instantly.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium text-lg"
          >
            Start Conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
